import { Request, Response } from "express";

export const login = (req: Request, res: Response) => {
  // Logic login
  res
    .status(200)
    .json({ status: "success", message: "Login successful", data: {} });
};

export const register = (req: Request, res: Response) => {
  // Logic register
  res
    .status(201)
    .json({ status: "success", message: "Registration successful", data: {} });
};
