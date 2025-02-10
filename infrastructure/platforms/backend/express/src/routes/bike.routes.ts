import { Router } from "express";
import { BikeController } from "../controllers/BikeController";

const router = Router();
const bikeController = new BikeController();

router.get("/", async (req, res) => {
  await bikeController.getBikes(req, res);
});

router.get("/:vin", async (req, res) => {
  await bikeController.getBike(req, res);
});

router.post("/", async (req, res) => {
  await bikeController.createBike(req, res);
});

router.patch("/:vin", async (req, res) => {
  await bikeController.updateBike(req, res);
});

router.delete("/:vin", async (req, res) => {
  await bikeController.removeBike(req, res);
});

export default router;
