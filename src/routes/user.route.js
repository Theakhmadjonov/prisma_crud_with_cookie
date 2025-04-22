import { Router } from "express";
import UserController from "../controllers/user.controller.js";

const userRouter = Router();

const controller = new UserController();

userRouter.get("/user", controller.getAllUsersController.bind(controller));
userRouter.get("/user/:id", controller.getOneUserController.bind(controller));
userRouter.put("/user:id", controller.updateUserController.bind(controller));
userRouter.delete(
  "/user/:id",
  controller.deleteUserController.bind(controller)
);

export default userRouter;
