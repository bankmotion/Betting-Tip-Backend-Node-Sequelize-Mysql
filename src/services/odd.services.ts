import { CreationAttributes } from "sequelize";
import { Odd } from "../models/Odd";

export const getOddsByFixtureService = async ({
  fixtureId,
  betType,
  betSubType,
}: {
  fixtureId: number;
  betType: number;
  betSubType: number;
}) => {
  const odds = await Odd.findOne({
    where: { fixtureId, betType, betSubType },
  });
  return odds;
};

export const createOddsDataService = async (data: CreationAttributes<Odd>) => {
  const odd = await Odd.create(data);
  return odd;
};

export const updateOddsDataService = async (data: CreationAttributes<Odd>) => {
  const odd = await Odd.update(data, { where: { id: data.id } });
  return await Odd.findOne({ where: { id: data.id } });
};
