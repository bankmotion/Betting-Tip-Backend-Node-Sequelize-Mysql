import { CreationAttributes, Optional } from "sequelize";
import { Country } from "../models/Country";

export const getCountryData = async (where: CreationAttributes<Country>) => {
  const data = await Country.findOne({ where });
  return data;
};

export const createCountryData = async (data: CreationAttributes<Country>) => {
  const country = await Country.create(data);
  return country;
};
