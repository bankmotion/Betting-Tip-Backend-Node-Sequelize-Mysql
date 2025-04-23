import { User } from "../../models/User";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = "bearer ";

export const registerController = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    const user = await User.create({ email, password, name });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
    console.error(error);
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({ status: 401, error: "Invalid credentials" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ status: 401, error: "Invalid credentials" });
      return;
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).json({ status: 200, token });
  } catch (error) {
    res.status(500).json({ status: 500, error: "Login failed" });
    console.error(error);
  }
};

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ status: 401, error: "Unauthorized" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ status: 401, error: "Unauthorized" });
    }
    (req as any).user = decoded;
    next();
  });
};
