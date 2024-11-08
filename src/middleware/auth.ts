import handleResponse from "../common/handleResponse";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
  user?: string | jwt.JwtPayload;
}

export const authMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("No token provided");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      throw new Error("Invalid token");
    }

    req.user = decoded;
    next();
  } catch (error: any) {
    if (error.message === "invalid signature") {
      const response = handleResponse("failed", "Invalid token");
      res.status(401).json(response);
    } else {
      console.log(error);
      const response = handleResponse("error", error.message);
      res.status(401).json(response);
    }
  }
};
