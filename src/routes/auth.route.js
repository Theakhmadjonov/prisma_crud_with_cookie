import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import RoleMiddleware from "../middlewares/role.middleware.js";

const authRouter = Router();

const controller = new AuthController();

authRouter.post(
  "/auth/register",
  AuthMiddleware,
  RoleMiddleware("admin"),
  controller.registerController.bind(controller)
);
authRouter.post("/auth/login", controller.loginController.bind(controller));

export default authRouter;
