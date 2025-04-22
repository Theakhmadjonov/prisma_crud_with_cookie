import JwtService from "../services/jwt.service.js";
import CustomError from "../utils/custom.error.js";

const jwtService = new JwtService();

const AuthMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : undefined;
    const payloadData = jwtService.verifyToken(token);
    req.userId = payloadData.userId;
    req.userRole = payloadData.userRole;
    return next();
  } catch (error) {
    throw new CustomError("Token invalid", 401);
  }
};
export default AuthMiddleware;
