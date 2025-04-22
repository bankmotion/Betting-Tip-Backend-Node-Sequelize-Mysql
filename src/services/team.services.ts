import { CreationAttributes } from "sequelize";
import { Team } from "../models/Team";

export const getTeamDataService = async (where: CreationAttributes<Team>) => {
  const data = await Team.findOne({ where });
  return data;
};

export const createTeamDataService = async (data: CreationAttributes<Team>) => {
  const team = await Team.create(data);
  return team;
};
