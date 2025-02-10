import { Router } from "express";
import { MaintenanceController } from "../controllers/MaintenanceController";

const router = Router();
const controller = new MaintenanceController();

router.post("/", (req, res) => controller.createMaintenance(req, res));
router.get("/", (req, res) => controller.getAllMaintenance(req, res));
router.get("/:id", (req, res) => controller.getMaintenance(req, res));
router.patch("/:id", (req, res) => controller.updateMaintenance(req, res));
router.delete("/:id", (req, res) => controller.removeMaintenance(req, res));
router.get("/bike/:bikeId", (req, res) =>
  controller.getMaintenanceByBike(req, res),
);

export default router;
