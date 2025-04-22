import UserService from "../services/user.service.js";

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async getAllUsersController(req, res, next) {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json({
        message: "Success",
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }

  async getOneUserController(req, res, next) {
    try {
      const { id } = req.params;
      const user = await this.userService.getOneUser(id);
      res.status(200).json({
        message: "Success",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUserController(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedUSer = await this.userService.updateUser(id, data);
      res.status(201).json({
        message: "User updated",
        data: updatedUSer,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteUserController(req, res, next) {
    try {
      const id = req.params;
      const deletedUSer = await this.userService.deleteUser(id);
      res.status(200).json({
        message: "User deleted",
        data: deletedUSer,
      });
    } catch (error) {
      next(error);
    }
  }
}
export default UserController;
