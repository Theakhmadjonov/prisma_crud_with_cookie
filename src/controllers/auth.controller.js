import AuthService from "../services/auth.service.js";

class AuthController {
    constructor() {
        this.authService = new AuthService();
    }
  async registerController(req, res) {
    try {
      const { email, password } = req.body;
      const { token, newUser } = await authService.register(email, password);
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000, // 1 soatlik cookie
      });
      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async loginController(req, res) {
    try {
      const { email, password } = req.body;
      const { token, user } = await authService.login(email, password);
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000, // 1 soatlik cookie
      });
      res.json({ message: 'Login successful', user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default AuthController;