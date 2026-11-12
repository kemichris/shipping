import api from "../utils/axios";

export const createShipment = async (shipment) =>
  (await api.post("/shipment/create", shipment)).data.data;
export const getShipments = async (params) =>
  (await api.get("/admin/shipments", { params })).data.data;
export const getShipment = async (id) =>
  (await api.get(`/admin/shipments/${encodeURIComponent(id)}`)).data.data;
export const updateShipment = async (id, updates) =>
  (await api.patch(`/shipment/update/${encodeURIComponent(id)}`, updates)).data
    .data;
export const updateShipmentStatus = async (id, update) =>
  (await api.patch(`/shipment/update/status/${encodeURIComponent(id)}`, update))
    .data.data;
export const updateShipmentLocation = async (id, location) =>
  (
    await api.patch(
      `/shipment/update/location/${encodeURIComponent(id)}`,
      location,
    )
  ).data.data;
export const deleteShipment = async (id) =>
  (await api.delete(`/admin/shipments/${encodeURIComponent(id)}`)).data.data;
export const suggestAddresses = async (query, signal) =>
  (
    await api.get("/admin/address-suggestions", {
      params: { q: query },
      signal,
    })
  ).data.data;

export const shipmentStatusLabels = {
  pending: "Pending",
  pending_payment: "Pending payment",
  confirmed: "Confirmed",
  picked_up: "Picked up",
  processing: "Processing",
  in_transit: "In transit",
  out_for_delivery: "Out for delivery",
  delivered: "Delivered",
  failed_delivery: "Failed delivery",
  returned: "Returned",
  cancelled: "Cancelled",
};
export const shipmentStatuses = Object.keys(shipmentStatusLabels);
export const shipmentTransitions = {
  pending: ["pending_payment", "confirmed", "cancelled"],
  pending_payment: ["confirmed", "cancelled"],
  confirmed: ["picked_up", "cancelled"],
  picked_up: ["processing", "in_transit", "failed_delivery", "returned"],
  processing: ["in_transit", "failed_delivery", "returned"],
  in_transit: ["out_for_delivery", "failed_delivery", "returned"],
  out_for_delivery: ["delivered", "failed_delivery", "returned"],
  failed_delivery: ["out_for_delivery", "returned"],
  delivered: [], returned: [], cancelled: [],
};
