export const trackingDemo = {
  trackingNumber: "39439309303",
  status: "In transit",
  progress: 65,
  origin: { city: "Uyo", country: "Nigeria", coordinates: [5.0513, 7.9333] },
  destination: { city: "London", country: "United Kingdom", coordinates: [51.5074, -0.1278] },
  currentLocation: "Accra, Ghana",
  shippedAt: "2026-11-06T09:30:00Z",
  estimatedDelivery: "2026-11-13T18:00:00Z",
  sender: { name: "Amara Okafor", address: "Oron Road, Uyo, Akwa Ibom State, Nigeria" },
  recipient: { name: "Jordan Ellis", address: "Camden, London, United Kingdom" },
  package: { description: "Personal effects", quantity: 1, weight: "4.2 kg" },
  events: [
    { date: "2026-11-09T08:45:00Z", location: "Accra, Ghana", status: "In transit", message: "Departed Accra sorting facility" },
    { date: "2026-11-08T17:20:00Z", location: "Accra, Ghana", status: "Arrived at facility", message: "Shipment arrived at Accra hub" },
    { date: "2026-11-07T11:05:00Z", location: "Uyo, Nigeria", status: "In transit", message: "Departed Uyo sorting hub" },
    { date: "2026-11-06T09:30:00Z", location: "Uyo, Nigeria", status: "Shipment created", message: "Package accepted for shipping" },
  ],
};
