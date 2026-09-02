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


export default router