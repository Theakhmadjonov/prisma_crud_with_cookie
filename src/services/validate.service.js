import Joi from "joi";
import CustomError from "../utils/custom.error.js";

class ValidationService {
  async createUserValidation(data) {
    try {
      const schema = Joi.object({
        first_name: Joi.string().min(2).max(30).required(),
        last_name: Joi.string().min(2).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
      });
      await schema.validateAsync(data);
    } catch (error) {
      throw new CustomError(error.message, 400);
    }
  }

  async updateUserValidation(id, data) {
    if (typeof id !== "number") {
      throw new CustomError("Invalid user Id", 400);
    }
    try {
      const schema = Joi.object({
        first_name: Joi.string().min(2).max(30),
        last_name: Joi.string().min(2).max(30),
        email: Joi.string().email(),
        password: Joi.string().min(6),
      });
      await schema.validateAsync(data);
    } catch (error) {
      throw new CustomError(error.message, 400);
    }
  }

  async validateUserId(id) {
    if (!id || typeof id !== "string") {
      throw new CustomError("Invalid user ID", 400);
    }
  }
}

export default ValidationService;
