import AuthService from "../services/auth.service.js";

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  async registerController(req, res, next) {
    try {
      const data = req.body;
      const { token, newUser } = await this.authService.register(data);
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000,
      });
      res
        .status(201)
        .json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      next(error);
    }
  }

  async loginController(req, res, next) {
    try {
      const { email, password } = req.body;
      const { token, user } = await this.authService.login(email, password);
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000,
      });
      res.json({ message: "Login successful", user });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
