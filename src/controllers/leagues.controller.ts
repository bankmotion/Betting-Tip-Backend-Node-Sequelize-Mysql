import { Request, Response } from "express";
import {
  getLeagueListService,
  updateLeagueService,
} from "../services/league.services";

export const getLeaguesController = async (req: Request, res: Response) => {
  const leagues = await getLeagueListService();
  res.status(200).json(leagues);
};

export const updateLeagueController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const league = await updateLeagueService(data, Number(id));
  res.status(200).json(league);
};
