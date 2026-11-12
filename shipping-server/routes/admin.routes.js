import express from "express";
import { protect, authorize } from "../middlewares/auth.middleware.js";
import * as adminController from "../controllers/admin.controller.js";

const router = express.Router();
router.use(protect, authorize("admin"));
router.get("/dashboard", adminController.getDashboard);
router.get("/shipments", adminController.listShipments);
router.get("/shipments/:id", adminController.getShipment);
router.delete("/shipments/:id", adminController.deleteShipment);
router.get("/address-suggestions", adminController.suggestAddresses);

export default router;
