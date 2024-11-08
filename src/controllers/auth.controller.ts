import AuthService from "../services/auth.service";
import handleResponse from "../common/handleResponse";
import type { Request, Response } from "express";

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const auth = await AuthService.register(req.body);

      if (!auth) {
        throw new Error("Failed to register");
      }

      const { __v, _id, password, ...userWithoutPassword } = auth.toObject();

      const response = handleResponse(
        "success",
        "User registered successfully",
        userWithoutPassword
      );

      res.status(201).json(response);
    } catch (error: any) {
      if (error.message === "Email already exists") {
        const response = handleResponse("failed", error.message, null);
        res.status(400).json(response);
      } else {
        console.log(error);
        const response = handleResponse("error", error.message, null);
        res.status(400).json(response);
      }
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new Error("Email or password is missing");
      }

      const { auth, token } = await AuthService.login({ email, password });

      const user = { username: auth.username, email: auth.email };

      const response = handleResponse("success", "Login successful", {
        user,
        token,
      });
      res.status(200).json(response);
    } catch (error: any) {
      if (error.message === "User not found") {
        const response = handleResponse("failed", error.message, null);
        res.status(400).json(response);
      } else {
        console.log(error);
        const response = handleResponse("error", error.message, null);
        res.status(400).json(response);
      }
    }
  }
}
export default new AuthController();
