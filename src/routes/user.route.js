import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import RoleMiddleware from "../middlewares/role.middleware.js";

const userRouter = Router();

const controller = new UserController();

userRouter.get(
  "/user",
  AuthMiddleware,
  RoleMiddleware("admin"),
  controller.getAllUsersController.bind(controller)
);
userRouter.get(
  "/user/:id",
  AuthMiddleware,
  RoleMiddleware("admin"),
  controller.getOneUserController.bind(controller)
);
userRouter.put("/user:id", controller.updateUserController.bind(controller));
userRouter.delete(
  "/user/:id",
  controller.deleteUserController.bind(controller)
);

export default userRouter;
