import test from "node:test";
import assert from "node:assert/strict";
import Shipment from "../models/shipment.model.js";
import User from "../models/user.model.js";
import { authorize, protect } from "../middlewares/auth.middleware.js";
import {
  addressSchema,
  createShipmentSchema,
  allowedStatusTransitions,
} from "../validators/shipment.validation.js";

const address = (label, city, country, coordinates = []) => ({
  label,
  street: label,
  city,
  state: "",
  country,
  postalCode: "",
  placeId: "",
  coordinates,
});
const shipmentPayload = (coordinates = []) => ({
  sender: {
    name: "Sender Person",
    email: "sender@example.test",
    phone: "+2348012345678",
    address: address("Oron Road", "Uyo", "Nigeria", coordinates),
  },
  recipient: {
    name: "Receiver Person",
    email: "receiver@example.test",
    phone: "+442012345678",
    address: address("High Street", "London", "United Kingdom", [-0.12, 51.5]),
  },
  shippingMode: "air",
  paymentMethod: "prepaid",
  serviceMode: "express",
  package: {
    description: "Books",
    weightKg: 2.5,
    lengthCm: 30,
    widthCm: 20,
    heightCm: 15,
    quantity: 1,
    declaredValue: 25000,
    shippingCost: 7000,
    currency: "NGN",
  },
});

test("shipment creation schema accepts selected international and manual addresses", () => {
  assert.equal(
    createShipmentSchema.safeParse(shipmentPayload([7.93, 5.05])).success,
    true,
  );
  assert.equal(createShipmentSchema.safeParse(shipmentPayload()).success, true);
  assert.equal(
    addressSchema.safeParse(address("x", "", "", [7.93, 5.05])).success,
    false,
  );
});

test("new user records default to the non-admin role", () => {
  const user = new User({
    fullName: "New User",
    email: "new-user@example.test",
    userName: "new-user",
    password: "hashed",
  });
  assert.equal(user.role, "user");
});

test("shipment schema supports status history and the initial pending state", async () => {
  const doc = new Shipment({
    trackingNumber: "TRC1234567890",
    ...shipmentPayload(),
    status: "pending",
    currentLocation: { label: "Uyo, Nigeria", coordinates: [] },
    trackingEvents: [
      {
        previousStatus: null,
        status: "pending",
        message: "Shipment created",
        location: { label: "Uyo, Nigeria", coordinates: [] },
      },
    ],
  });
  await assert.doesNotReject(() => doc.validate());
});

test("shipment lifecycle allows expected transitions and blocks terminal transitions", () => {
  assert.ok(allowedStatusTransitions.pending.includes("confirmed"));
  assert.ok(!allowedStatusTransitions.pending.includes("in_transit"));
  assert.ok(allowedStatusTransitions.in_transit.includes("out_for_delivery"));
  assert.deepEqual(allowedStatusTransitions.delivered, []);
  assert.deepEqual(allowedStatusTransitions.cancelled, []);
});

test("admin authorization rejects non-admin users and accepts admins", () => {
  let denied;
  authorize("admin")({ user: { role: "user" } }, {}, (error) => {
    denied = error;
  });
  assert.equal(denied.statusCode, 403);
  let passed = false;
  authorize("admin")({ user: { role: "admin" } }, {}, (error) => {
    assert.equal(error, undefined);
    passed = true;
  });
  assert.equal(passed, true);
});

test("authentication rejects a missing bearer token", async () => {
  let failure;
  await protect({ headers: {} }, {}, (error) => {
    failure = error;
  });
  assert.equal(failure.statusCode, 401);
});
