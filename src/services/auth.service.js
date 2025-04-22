import { prisma } from "../app.js";
import CustomError from "../utils/custom.error.js";
import JwtService from "./jwt.service.js";
import ValidationService from "./validate.service.js";
import bcrypt from "bcrypt";

class AuthService {
  constructor() {
    this.prisma = prisma;
    this.validationService = new ValidationService();
    this.jwtService = new JwtService();
  }

  async register(data) {
    try {
      await this.validationService.createUserValidation(data);
      const { first_name, last_name, email, password, role } = data;
      const checkUser = await prisma.user.findUnique({
        where: { email },
      });
      if (checkUser) {
        throw new CustomError("User already exists", 401);
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: {
          first_name,
          last_name,
          email,
          password: hashedPassword,
          role,
        },
      });
      const token = this.jwtService.generateToken(newUser.id, newUser.role);
      return { token, newUser };
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }

  async login(email, password) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        throw new CustomError("Email or password incorrect", 401);
      }
      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        throw new CustomError("Email or password incorrect", 401);
      }
      const token = this.jwtService.generateToken(user.id, user.role);
      return { token, user };
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }
}
export default AuthService;
