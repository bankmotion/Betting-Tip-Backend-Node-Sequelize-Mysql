import { CreationAttributes, Optional } from "sequelize";
import { League } from "../models/League";

export const getLeagueService = async (where: CreationAttributes<League>) => {
  const data = await League.findOne({ where });
  return data;
};

export const createLeagueService = async (data: CreationAttributes<League>) => {
  const league = await League.create(data);
  return league;
};
