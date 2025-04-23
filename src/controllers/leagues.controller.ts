import { Request, Response } from "express";
import { League } from "../models/League";
import { Country } from "../models/Country";

export const getLeaguesController = async (req: Request, res: Response) => {
  const leagues = await League.findAll({
    include: [{ model: Country, as: "country" }],
  });
  res.status(200).json(leagues);
};
