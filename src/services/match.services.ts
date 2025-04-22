import { CreationAttributes } from "sequelize";
import { Match } from "../models/Match";

export const getMatchDataService = async (where: CreationAttributes<Match>) => {
  const data = await Match.findOne({ where });
  return data;
};

export const createMatchDataService = async (
  data: CreationAttributes<Match>
) => {
  const match = await Match.create(data);
  return match;
};
