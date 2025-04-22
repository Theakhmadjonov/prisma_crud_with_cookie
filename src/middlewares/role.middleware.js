import CustomError from "../utils/custom.error.js";

const RoleMiddleware = (...roles) => {
  return async (req, res, next) => {
    try {
      const userId = req.userId;
      const userRole = req.userRole;
      if (roles.includes(userRole)) {
        return next();
      }
      throw new CustomError("Forbidden resource", 403);
    } catch (error) {
      throw new CustomError(error.message, 401);
    }
  };
};

export default RoleMiddleware;
