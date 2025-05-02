import { Request, Response } from "express";
import {
  getMatchesListService,
  getMatchesByOddStatusService,
} from "../services/match.services";
import { getSettings } from "../services/setting.service";
import { sortOddsListByScore } from "../helper/match.helper";

export const getMatchesController = async (req: Request, res: Response) => {
  const matches = await getMatchesListService({});
  const settings = await getSettings();
  res.status(200).json(matches);
};

export const getMatchesByOddStatusController = async (
  req: Request,
  res: Response
) => {
  const tipValid = Boolean(req.query.tipValid);

  const matches = await getMatchesByOddStatusService({ tipValid });
  const odds = matches.flatMap((match) => match.odds);
  const settings = await getSettings();
  const sortedOdds = sortOddsListByScore(odds, settings);
  res.status(200).json({ matches, odds: sortedOdds });
};
