import jwt from "jsonwebtoken";
import CustomError from "../utils/custom.error.js";

class JwtService {
  secretKey = process.env.JWT_KEY;
  generateToken(id, role) {
    try {
      const token = jwt.sign({ userId: id, userRole: role }, this.secretKey, {
        expiresIn: "1h",
      });
      return token;
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }

  verifyToken(token) {
    try {
      const payload = jwt.verify(token, this.secretKey);
      return payload;
    } catch (error) {
      throw new CustomError("Token is invalid", 401);
    }
  }
}

export default JwtService;
