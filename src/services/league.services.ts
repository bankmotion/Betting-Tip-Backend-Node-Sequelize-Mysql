import { CreationAttributes, Optional } from "sequelize";
import { League } from "../models/League";
import { Country } from "../models/Country";

export const getLeagueListService = async () => {
  const data = await League.findAll({
    include: [{ model: Country, as: "country" }],
    order: [["isActive", "DESC"]],
  });
  return data;
};

export const getLeagueService = async (where: CreationAttributes<League>) => {
  const data = await League.findOne({ where });
  return data;
};

export const createLeagueService = async (data: CreationAttributes<League>) => {
  const league = await League.create(data);
  return league;
};

export const updateLeagueService = async (
  data: CreationAttributes<League>,
  id: number
) => {
  const league = await League.update(data, { where: { id } });
  return league;
};
