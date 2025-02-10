import { Router } from "express";
import { AlertController } from "src/controllers/AlertControllers";

const alertRouter = Router();
const alertController = new AlertController();

alertRouter.get("/", async (_, res) => {
    await alertController.findAll(res);
});

alertRouter.get("/:id", async (req, res) => {
    await alertController.findOne(req, res);
});

export default alertRouter;