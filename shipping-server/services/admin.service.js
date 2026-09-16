import Shipment from "../models/shipment.model.js";
import ApiError from "../utils/apiError.utils.js";

export const getDashboard = async () => {
  const [totalShipments, pending, inTransit, delivered, recentShipments] = await Promise.all([
    Shipment.countDocuments(),
    Shipment.countDocuments({ status: "pending" }),
    Shipment.countDocuments({ status: "in_transit" }),
    Shipment.countDocuments({ status: "delivered" }),
    Shipment.find().sort({ createdAt: -1 }).limit(5)
  ]);

  return {
    totalShipments,
    pending,
    inTransit,
    delivered,
    recentShipments
  };
};
