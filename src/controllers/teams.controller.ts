import { Request, Response } from "express";
import { Team } from "../models/Team";

export const getTeamsController = async (req: Request, res: Response) => {
  const teams = await Team.findAll();
  res.status(200).json(teams);
};
