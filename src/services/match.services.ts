import { CreationAttributes } from "sequelize";
import { Match } from "../models/Match";
import { League } from "../models/League";
import { Team } from "../models/Team";
import { Odd } from "../models/Odd";

export const getMatchDataService = async (where: CreationAttributes<Match>) => {
  const data = await Match.findOne({
    where,
    include: [
      { model: Odd, as: "odds" },
      { model: League, as: "league" },
      { model: Team, as: "homeTeam" },
      { model: Team, as: "awayTeam" },
    ],
  });
  return data;
};

export const createMatchDataService = async (
  data: CreationAttributes<Match>
) => {
  const match = await Match.create(data);
  return await getMatchDataService({ id: match.id });
};

export const updateMatchDataService = async (
  data: CreationAttributes<Match>
) => {
  await Match.update(data, { where: { id: data.id } });
  return await getMatchDataService({ id: data.id });
};

export const getMatchesListService = async (
  where: CreationAttributes<Match>
) => {
  const matches = await Match.findAll({
    where,
    include: [
      { model: League, as: "league" },
      { model: Team, as: "homeTeam" },
      { model: Team, as: "awayTeam" },
      { model: Odd, as: "odds" },
    ],
    order: [["matchTimestamp", "ASC"]],
  });
  return matches;
};

export const getMatchesByOddStatusService = async (
  oddWhere: CreationAttributes<Odd>
) => {
  console.log("oddWhere", oddWhere);
  const matches = await Match.findAll({
    include: [
      {
        model: Odd,
        as: "odds",
        where: oddWhere,
        required: true,
        separate: true,
      },
      { model: League, as: "league" },
      { model: Team, as: "homeTeam" },
      { model: Team, as: "awayTeam" },
    ],
  });
  return matches;
};
