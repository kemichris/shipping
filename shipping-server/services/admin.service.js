import Shipment from "../models/shipment.model.js";
import ApiError from "../utils/apiError.utils.js";
import { shipmentStatuses } from "../validators/shipment.validation.js";

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const getDashboard = async () => {
  const [totalShipments, pending, inTransit, delivered, recentShipments] =
    await Promise.all([
      Shipment.countDocuments(),
      Shipment.countDocuments({
        status: { $in: ["pending", "pending_payment", "confirmed"] },
      }),
      Shipment.countDocuments({
        status: {
          $in: ["picked_up", "processing", "in_transit", "out_for_delivery"],
        },
      }),
      Shipment.countDocuments({ status: "delivered" }),
      Shipment.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select(
          "trackingNumber sender.name recipient.name status createdAt estimatedDeliveryDate",
        ),
    ]);
  return { totalShipments, pending, inTransit, delivered, recentShipments };
};

export const listShipments = async (query = {}) => {
  const page = Math.max(1, Number.parseInt(query.page, 10) || 1);
  const limit = Math.min(
    50,
    Math.max(1, Number.parseInt(query.limit, 10) || 10),
  );
  const filter = {};
  if (query.status && shipmentStatuses.includes(query.status))
    filter.status = query.status;
  else if (query.status)
    throw new ApiError(400, "Invalid shipment status filter.");
  if (query.deliveryState === "delivered") filter.status = "delivered";
  if (query.deliveryState === "active")
    filter.status = { $nin: ["delivered", "returned", "cancelled"] };
  if (
    query.deliveryState &&
    !["delivered", "active"].includes(query.deliveryState)
  )
    throw new ApiError(400, "Invalid delivery-state filter.");
  if (query.from || query.to) {
    filter.createdAt = {};
    if (query.from && !Number.isNaN(Date.parse(query.from)))
      filter.createdAt.$gte = new Date(query.from);
    else if (query.from) throw new ApiError(400, "Invalid start date.");
    if (query.to && !Number.isNaN(Date.parse(query.to))) {
      const to = new Date(query.to);
      to.setHours(23, 59, 59, 999);
      filter.createdAt.$lte = to;
    } else if (query.to) throw new ApiError(400, "Invalid end date.");
  }
  if (query.q) {
    const term = escapeRegex(String(query.q).trim().slice(0, 100));
    if (term) {
      const rx = new RegExp(term, "i");
      filter.$or = [
        { trackingNumber: rx },
        { "sender.name": rx },
        { "recipient.name": rx },
        { "sender.address.label": rx },
        { "recipient.address.label": rx },
        { "recipient.address.city": rx },
        { "recipient.address.state": rx },
        { "recipient.address.country": rx },
      ];
    }
  }
  const sortFields = {
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    trackingNumber: "trackingNumber",
    status: "status",
  };
  const sortField = sortFields[query.sort] || "createdAt";
  const direction = query.direction === "asc" ? 1 : -1;
  const [items, total] = await Promise.all([
    Shipment.find(filter)
      .sort({ [sortField]: direction, _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select(
        "trackingNumber sender.name recipient.name recipient.address.label recipient.address.city recipient.address.country status shippingMode serviceMode createdAt estimatedDeliveryDate",
      ),
    Shipment.countDocuments(filter),
  ]);
  return {
    items,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  };
};
