import { Request, Response } from "express";
import { Country } from "../models/Country";

export const getCountriesController = async (req: Request, res: Response) => {
  const countries = await Country.findAll();
  res.status(200).json(countries);
};
