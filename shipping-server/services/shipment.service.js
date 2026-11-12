import mongoose from "mongoose";
import Shipment from "../models/shipment.model.js";
import ApiError from "../utils/apiError.utils.js";
import { generateTrackingNumber } from "../utils/shipment.utils.js";
import {
  addressSchema,
  allowedStatusTransitions,
  createShipmentSchema,
  partySchema,
  statusUpdateSchema,
} from "../validators/shipment.validation.js";

const parseOrThrow = (schema, value) => {
  const result = schema.safeParse(value);
  if (!result.success)
    throw new ApiError(
      400,
      "Please review the shipment details.",
      result.error.issues,
    );
  return result.data;
};

const findShipment = async (id) => {
  if (!mongoose.isValidObjectId(id))
    throw new ApiError(400, "Invalid shipment id.");
  const shipment = await Shipment.findById(id);
  if (!shipment) throw new ApiError(404, "Shipment not found.");
  return shipment;
};

const recordEvent = (
  shipment,
  {
    previousStatus = shipment.status,
    status = shipment.status,
    message,
    location,
    coordinates,
    userId,
  },
) => {
  shipment.trackingEvents.push({
    previousStatus,
    status,
    message,
    location: {
      label:
        location ||
        shipment.currentLocation?.label ||
        shipment.sender.address.label,
      coordinates: coordinates || shipment.currentLocation?.coordinates || [],
    },
    occurredAt: new Date(),
    updatedBy: userId,
  });
};

export const createShipment = async (userId, rawData) => {
  const data = parseOrThrow(createShipmentSchema, rawData);
  const origin = data.sender.address;
  const shipment = await Shipment.create({
    trackingNumber: generateTrackingNumber(),
    sender: data.sender,
    recipient: data.recipient,
    shippingMode: data.shippingMode,
    paymentMethod: data.paymentMethod,
    serviceMode: data.serviceMode,
    package: data.package,
    status: "pending",
    currentLocation: {
      label:
        [origin.city, origin.state, origin.country]
          .filter(Boolean)
          .join(", ") || origin.label,
      type: "Point",
      coordinates: origin.coordinates,
      updatedAt: new Date(),
    },
    estimatedDeliveryDate: data.estimatedDeliveryDate,
    trackingEvents: [
      {
        previousStatus: null,
        status: "pending",
        message: "Shipment has been created",
        location: {
          label:
            [origin.city, origin.state, origin.country]
              .filter(Boolean)
              .join(", ") || origin.label,
          coordinates: origin.coordinates,
        },
        occurredAt: new Date(),
        updatedBy: userId,
      },
    ],
  });
  return shipment;
};

export const updateShipment = async (shipmentId, rawUpdates, userId) => {
  const shipment = await findShipment(shipmentId);
  if (
    Object.hasOwn(rawUpdates, "status") ||
    Object.hasOwn(rawUpdates, "trackingNumber")
  )
    throw new ApiError(
      400,
      "Use the dedicated status action; tracking numbers cannot be edited.",
    );
  const updates = {};
  for (const party of ["sender", "recipient"]) {
    if (rawUpdates[party] === undefined) continue;
    const value = rawUpdates[party];
    if (!value || typeof value !== "object")
      throw new ApiError(400, `Invalid ${party} details.`);
    const existing = shipment[party].toObject
      ? shipment[party].toObject()
      : shipment[party];
    updates[party] = { ...existing, ...value };
    if (value.address !== undefined)
      updates[party].address = parseOrThrow(addressSchema, value.address);
    updates[party] = parseOrThrow(partySchema, updates[party]);
  }
  if (rawUpdates.package !== undefined) {
    const allowed = [
      "description",
      "weightKg",
      "lengthCm",
      "widthCm",
      "heightCm",
      "quantity",
      "declaredValue",
      "shippingCost",
      "currency",
    ];
    updates.package = {
      ...shipment.package.toObject(),
      ...Object.fromEntries(
        Object.entries(rawUpdates.package || {}).filter(([key]) =>
          allowed.includes(key),
        ),
      ),
    };
  }
  if (rawUpdates.estimatedDeliveryDate !== undefined) {
    if (
      rawUpdates.estimatedDeliveryDate === null ||
      rawUpdates.estimatedDeliveryDate === ""
    )
      updates.estimatedDeliveryDate = null;
    else {
      const date = new Date(rawUpdates.estimatedDeliveryDate);
      if (Number.isNaN(date.getTime()))
        throw new ApiError(400, "Invalid estimated delivery date.");
      updates.estimatedDeliveryDate = date;
    }
  }
  if (rawUpdates.shippingMode !== undefined) {
    if (!["air", "road", "sea"].includes(rawUpdates.shippingMode))
      throw new ApiError(400, "Invalid shipping mode.");
    updates.shippingMode = rawUpdates.shippingMode;
  }
  if (rawUpdates.serviceMode !== undefined)
    updates.serviceMode = String(rawUpdates.serviceMode).slice(0, 50);
  if (rawUpdates.paymentMethod !== undefined)
    updates.paymentMethod = String(rawUpdates.paymentMethod).slice(0, 50);
  if (!Object.keys(updates).length)
    throw new ApiError(400, "No editable shipment fields were supplied.");
  Object.assign(shipment, updates);
  recordEvent(shipment, {
    message: "Shipment information updated by an administrator",
    userId,
  });
  await shipment.save();
  return shipment;
};

export const updateLocation = async (shipmentId, rawLocation, userId) => {
  const shipment = await findShipment(shipmentId);
  if (
    !rawLocation ||
    typeof rawLocation.label !== "string" ||
    rawLocation.label.trim().length < 2
  )
    throw new ApiError(400, "A location description is required.");
  const locationChanged =
    rawLocation.label.trim() !== shipment.currentLocation?.label;
  const coordinates =
    rawLocation.coordinates ??
    (locationChanged ? [] : shipment.currentLocation?.coordinates || []);
  if (
    !Array.isArray(coordinates) ||
    (coordinates.length !== 0 &&
      (coordinates.length !== 2 ||
        coordinates.some((v) => !Number.isFinite(v)) ||
        Math.abs(coordinates[0]) > 180 ||
        Math.abs(coordinates[1]) > 90))
  )
    throw new ApiError(
      400,
      "Location coordinates must be a valid longitude/latitude pair.",
    );
  shipment.currentLocation = {
    label: rawLocation.label.trim(),
    type: "Point",
    coordinates,
    updatedAt: new Date(),
  };
  recordEvent(shipment, {
    message: "Shipment location updated",
    location: shipment.currentLocation.label,
    coordinates,
    userId,
  });
  await shipment.save();
  return shipment;
};

export const updateStatus = async (shipmentId, rawUpdate, userId) => {
  const shipment = await findShipment(shipmentId);
  const update = parseOrThrow(statusUpdateSchema, rawUpdate);
  const allowed = allowedStatusTransitions[shipment.status] || [];
  if (!allowed.includes(update.status))
    throw new ApiError(
      409,
      `Cannot move a ${shipment.status.replaceAll("_", " ")} shipment to ${update.status.replaceAll("_", " ")}.`,
    );
  const previousStatus = shipment.status;
  shipment.status = update.status;
  if (update.location) {
    const locationChanged = update.location !== shipment.currentLocation?.label;
    shipment.currentLocation = {
      label: update.location,
      type: "Point",
      coordinates:
        update.coordinates ||
        (locationChanged ? [] : shipment.currentLocation?.coordinates || []),
      updatedAt: new Date(),
    };
  }
  if (update.coordinates)
    shipment.currentLocation.coordinates = update.coordinates;
  if (update.status === "delivered") shipment.deliveredAt = new Date();
  recordEvent(shipment, {
    previousStatus,
    status: update.status,
    message: update.message,
    location: update.location,
    coordinates: update.coordinates,
    userId,
  });
  await shipment.save();
  return shipment;
};

export const cancelShipment = async (shipmentId, userId) =>
  updateStatus(
    shipmentId,
    { status: "cancelled", message: "Shipment cancelled by an administrator" },
    userId,
  );

export const deleteShipment = async (shipmentId) => {
  const shipment = await findShipment(shipmentId);
  if (!["cancelled", "returned"].includes(shipment.status))
    throw new ApiError(
      409,
      "Only cancelled or returned shipments can be deleted.",
    );
  await shipment.deleteOne();
  return { id: shipmentId };
};

export const getShipmentById = (id) => findShipment(id);

export const getShipmentStatus = async (trackingNumber) => {
  const shipment = await Shipment.findOne({
    trackingNumber: String(trackingNumber).trim(),
  })
    .select(
      "trackingNumber status currentLocation estimatedDeliveryDate deliveredAt trackingEvents package.description package.weightKg package.quantity sender.address recipient.address createdAt updatedAt",
    )
    .lean();
  if (!shipment) throw new ApiError(404, "Shipment not found.");
  const publicAddress = (address) => {
    const label = [address?.city, address?.state, address?.country]
      .filter(Boolean)
      .join(", ");
    const coordinates =
      Array.isArray(address?.coordinates) && address.coordinates.length === 2
        ? address.coordinates.map(
            (coordinate) => Math.round(coordinate * 100) / 100,
          )
        : [];
    return {
      label: label || "Location unavailable",
      city: address?.city || "",
      state: address?.state || "",
      country: address?.country || "",
      coordinates,
    };
  };
  const origin = publicAddress(shipment.sender?.address);
  const destination = publicAddress(shipment.recipient?.address);
  const fullOrigin = shipment.sender?.address?.label;
  const currentLocation =
    shipment.currentLocation?.label === fullOrigin
      ? { label: origin.label }
      : { label: shipment.currentLocation?.label || origin.label };
  return {
    _id: shipment._id,
    trackingNumber: shipment.trackingNumber,
    status: shipment.status,
    currentLocation,
    estimatedDeliveryDate: shipment.estimatedDeliveryDate,
    deliveredAt: shipment.deliveredAt,
    createdAt: shipment.createdAt,
    updatedAt: shipment.updatedAt,
    sender: { address: origin },
    recipient: { address: destination },
    package: shipment.package,
    trackingEvents: (shipment.trackingEvents || []).map((event) => ({
      previousStatus: event.previousStatus,
      status: event.status,
      message: event.message,
      location: {
        label:
          event.location?.label === fullOrigin
            ? origin.label
            : event.location?.label,
      },
      occurredAt: event.occurredAt,
    })),
  };
};
