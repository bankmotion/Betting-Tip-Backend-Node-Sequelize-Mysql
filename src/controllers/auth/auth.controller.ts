import { User } from "../../models/User";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    const user = await User.create({ email, password, name });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
};
