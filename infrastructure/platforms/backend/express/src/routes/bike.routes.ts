import { Router } from "express";
import { BikeController } from "../controllers/BikeController";

const router = Router();
const bikeController = new BikeController();

router.get("/", async (req, res) => {
    await bikeController.getBikes(req, res);
    console.log("GET /bikes");
});

router.get("/:vin", async (req, res) => {
    await bikeController.getBike(req, res);
    console.log(`GET /bikes/${req.params.vin}`);
});

router.post("/", async (req, res) => {
    await bikeController.createBike(req, res);
    console.log("POST /bikes");
});

router.put("/:vin", async (req, res) => {
    await bikeController.updateBike(req, res);
    console.log(`PUT /bikes/${req.params.vin}`);
});

router.delete("/:vin", async (req, res) => {
    await bikeController.removeBike(req, res);
    console.log(`DELETE /bikes/${req.params.vin}`);
});



export default router;
