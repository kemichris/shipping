import express from "express";
import { protect, authorize } from "../middlewares/auth.middleware.js";
import * as shipmentController from "../controllers/shipment.controller.js";

const router = express.Router();

router.post(
  "/create",
  protect,
  authorize("admin"),
  shipmentController.createShipment
);

router.patch(
  "/update/:id",
  protect,
  authorize("admin"),
  shipmentController.updateShipment
);

router.patch(
  "/update/location/:id",
  protect,
  authorize("admin"),
  shipmentController.updateLocation
);


export default router