import { trackingDemo } from "../data/trackingDemo";

// Demo lookup seam: replace this implementation with the tracking API call.
export function getShipmentByTrackingNumber(trackingNumber) {
  if (trackingNumber.trim() === trackingDemo.trackingNumber) return trackingDemo;
  return null;
}
