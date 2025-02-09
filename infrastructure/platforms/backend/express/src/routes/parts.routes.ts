import { Router } from "express";
import { PartsController } from "../controllers/PartsController";

const router = Router();
const controller = new PartsController();

router.post("/", (req, res) => controller.createPart(req, res));
router.get("/", (req, res) => controller.getParts(req, res));
router.get("/:id", (req, res) => controller.getPart(req, res));
router.put("/:id", (req, res) => controller.updatePart(req, res));
router.delete("/:id", (req, res) => controller.removePart(req, res));
router.get("/low-stock", (req, res) => controller.getLowStockParts(req, res));

export default router;
