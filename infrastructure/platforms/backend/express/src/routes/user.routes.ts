import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();
const userController = new UserController();

router.post("/signup", async (req, res) => {
    await userController.signUp(req, res);
    console.log("POST /users/signup");
});

router.post("/signin", async (req, res) => {
    await userController.signIn(req, res);
    console.log("POST /users/signin");
});

router.get("/", async (req, res) => {
    await userController.getUsers(req, res);
    console.log("GET /users");
});

router.get("/:id", async (req, res) => {
    await userController.getUser(req, res);
    console.log(`GET /users/${req.params.id}`);
});

router.put("/:id", async (req, res) => {
    await userController.updateUser(req, res);
    console.log(`PUT /users/${req.params.id}`);
});

router.delete("/:id", async (req, res) => {
    await userController.removeUser(req, res);
    console.log(`DELETE /users/${req.params.id}`);
});

export default router;
