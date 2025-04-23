import { Sequelize } from "sequelize-typescript";
import { config } from "dotenv";
import { Country } from "./models/Country";
import { League } from "./models/League";
import { Team } from "./models/Team";
import { Match } from "./models/Match";
import { User } from "./models/User";
import { Odd } from "./models/Odd";
config();

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
  models: [Country, League, Team, Match, User],
});

export default sequelize;
