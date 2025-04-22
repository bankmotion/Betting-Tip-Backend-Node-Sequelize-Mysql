import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes";
import {
  getBets,
  getCountriesData,
  getFixturesByID,
  getFixturesEventsByID,
  getLeaguesData,
  getMappingList,
  getOddsByFixture,
  getPredicitonsByFixture,
  getTeamStatistic,
} from "./services/sports.api.services";
import { eventBettingTip } from "./module/tip.create.module";
const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

eventBettingTip();
// getBets()

export default app;
