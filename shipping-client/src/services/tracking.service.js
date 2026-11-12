import api from "../utils/axios";

const progressByStatus = { pending: 5, pending_payment: 10, confirmed: 20, picked_up: 30, processing: 45, in_transit: 65, out_for_delivery: 85, delivered: 100, failed_delivery: 80, returned: 100, cancelled: 0 };
const compactAddress = (address, fallback) => {
  const parts = [address?.city, address?.state, address?.country].filter(Boolean);
  return { ...address, label: parts.join(", ") || fallback };
};

export async function getShipmentByTrackingNumber(trackingNumber, signal) {
  const response = await api.get(`/shipment/status/${encodeURIComponent(trackingNumber)}`, { signal });
  const shipment = response.data.data;
  return {
    ...shipment,
    progress: progressByStatus[shipment.status] ?? 0,
    origin: { ...compactAddress(shipment.sender?.address, "Origin"), city: shipment.sender?.address?.city || "Origin" },
    destination: { ...compactAddress(shipment.recipient?.address, "Destination"), city: shipment.recipient?.address?.city || "Destination" },
    currentLocation: shipment.currentLocation?.label || "Location update unavailable",
    sender: { name: "Sender", address: compactAddress(shipment.sender?.address, "Origin").label },
    recipient: { name: "Recipient", address: compactAddress(shipment.recipient?.address, "Destination").label },
    package: { description: shipment.package?.description || "Package", quantity: shipment.package?.quantity || 1, weight: shipment.package?.weightKg ? `${shipment.package.weightKg} kg` : "Not provided" },
    events: (shipment.trackingEvents || []).slice().sort((a, b) => new Date(b.occurredAt) - new Date(a.occurredAt)).map((event) => ({ date: event.occurredAt, location: event.location?.label || "Location unavailable", status: event.status, message: event.message })),
  };
}
