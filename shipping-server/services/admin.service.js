import Shipment from "../models/shipment.model.js";
import ApiError from "../utils/apiError.utils.js";

export const getDashboard = async () => {
  const [totalShipment, pending, inTransit, delivered] = await Promise.all([
    Shipment.countDocuments(),
    Shipment.countDocuments({ status: "pending" }),
    Shipment.countDocuments({ status: "in_transit" }),
    Shipment.countDocuments({ status: "delivered" }),
  ]);

  return {
    totalShipment,
    pending,
    inTransit,
    delivered,
  };
};
