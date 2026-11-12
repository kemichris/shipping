import { z } from "zod";

export const shipmentStatuses = [
  "pending",
  "pending_payment",
  "confirmed",
  "picked_up",
  "processing",
  "in_transit",
  "out_for_delivery",
  "delivered",
  "failed_delivery",
  "returned",
  "cancelled",
];

export const addressSchema = z.object({
  label: z.string().trim().min(3).max(500),
  street: z.string().trim().max(200).optional().default(""),
  city: z.string().trim().max(100).optional().default(""),
  state: z.string().trim().max(100).optional().default(""),
  country: z.string().trim().max(100).optional().default(""),
  postalCode: z.string().trim().max(30).optional().default(""),
  placeId: z.string().max(200).optional().default(""),
  coordinates: z
    .array(z.number().finite())
    .refine(
      (value) =>
        value.length === 0 ||
        (value.length === 2 &&
          Math.abs(value[0]) <= 180 &&
          Math.abs(value[1]) <= 90),
      "Coordinates must be empty or a valid longitude/latitude pair.",
    )
    .optional()
    .default([]),
});

export const partySchema = z.object({
  name: z.string().trim().min(2).max(150),
  email: z.string().trim().email().max(254).optional().or(z.literal("")),
  phone: z.string().trim().min(5).max(40).optional().or(z.literal("")),
  address: addressSchema,
});

export const createShipmentSchema = z.object({
  sender: partySchema,
  recipient: partySchema,
  shippingMode: z.enum(["air", "road", "sea"]),
  paymentMethod: z.string().trim().min(2).max(50),
  serviceMode: z.string().trim().max(50).optional().default("standard"),
  package: z.object({
    description: z.string().trim().min(2).max(500),
    weightKg: z.coerce.number().positive().max(100000),
    lengthCm: z.coerce.number().positive().max(100000).optional(),
    widthCm: z.coerce.number().positive().max(100000).optional(),
    heightCm: z.coerce.number().positive().max(100000).optional(),
    quantity: z.coerce.number().int().min(1).max(10000).default(1),
    declaredValue: z.coerce.number().min(0).optional().default(0),
    shippingCost: z.coerce.number().min(0).optional().default(0),
    currency: z.string().trim().length(3).optional().default("NGN"),
  }),
  estimatedDeliveryDate: z.coerce.date().optional(),
});

export const statusUpdateSchema = z.object({
  status: z.enum(shipmentStatuses),
  message: z.string().trim().min(3).max(500),
  location: z.string().trim().max(500).optional(),
  coordinates: z
    .array(z.number().finite())
    .refine(
      (value) =>
        value.length === 2 &&
        Math.abs(value[0]) <= 180 &&
        Math.abs(value[1]) <= 90,
      "Coordinates must be a valid longitude/latitude pair.",
    )
    .optional(),
});

export const allowedStatusTransitions = {
  pending: ["pending_payment", "confirmed", "cancelled"],
  pending_payment: ["confirmed", "cancelled"],
  confirmed: ["picked_up", "cancelled"],
  picked_up: ["processing", "in_transit", "failed_delivery", "returned"],
  processing: ["in_transit", "failed_delivery", "returned"],
  in_transit: ["out_for_delivery", "failed_delivery", "returned"],
  out_for_delivery: ["delivered", "failed_delivery", "returned"],
  failed_delivery: ["out_for_delivery", "returned"],
  delivered: [],
  returned: [],
  cancelled: [],
};
