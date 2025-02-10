import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();
const userController = new UserController();

router.post("/", async (req, res) => {
  await userController.signUp(req, res);
});

router.get("/", async (_, res) => {
  await userController.getUsers(res);
});

router.get("/:id", async (req, res) => {
  await userController.getUser(req, res);
});

router.patch("/:id", async (req, res) => {
  await userController.updateUser(req, res);
});

router.delete("/:id", async (req, res) => {
  await userController.removeUser(req, res);
});

export default router;
