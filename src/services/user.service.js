import CustomError from "../utils/custom.error.js";
import bcrypt from "bcrypt";
import ValidationService from "./validate.service.js";
import { prisma } from "../app.js";

class UserService {
  constructor() {
    this.prisma = prisma;
    this.validationService = new ValidationService();
  }

  async createUser(data) {
    try {
      await this.validationService.createUserValidation(data);
      const { first_name, last_name, email, password } = data;
      const checkUser = await this.prisma.user.findUnique({ where: { email } });
      if (checkUser) throw new CustomError("User already exists", 401);
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await this.prisma.user.create({
        data: { first_name, last_name, email, password: hashedPassword },
      });
      return user;
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }

  async getAllUsers() {
    try {
      const users = await this.prisma.user.findMany();
      return users;
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }

  async getOneUser(id) {
    await this.validationService.validateUserId(id);
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new CustomError("User not found", 404);
    return user;
  }

  async updateUser(id, data) {
    try {
      await this.validationService.updateUserValidation(id, data);
      const checkUser = await this.prisma.user.findUnique({ where: { id } });
      if (!checkUser) throw new CustomError("User not found", 404);
      const updateData = { ...data };
      if (data.password) {
        updateData.password = await bcrypt.hash(data.password, 12);
      }
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return updatedUser;
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }

  async deleteUser(id) {
    try {
      await this.validationService.validateUserId(id);
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) throw new CustomError("User not found", 404);
      const deletedUser = await this.prisma.user.delete({
        where: { id },
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          createdAt: true,
        },
      });
      return deletedUser;
    } catch (error) {
      throw new CustomError(error?.message || "Failed to delete user", 500);
    }
  }
}
export default UserService;
