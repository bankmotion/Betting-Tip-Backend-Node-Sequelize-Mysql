import { Router } from "express";

import authRoutes from "./apis/authApis";
import countryRoutes from "./apis/countryApis";
import leagueRoutes from "./apis/leagueApi";
import teamRoutes from "./apis/teamApi";
import matchRoutes from "./apis/matchApis";
import settingRoutes from "./apis/settingApi";

const router = Router();

router.use("/auth", authRoutes);

router.use("/countries", countryRoutes);

router.use("/leagues", leagueRoutes);

router.use("/teams", teamRoutes);

router.use("/matches", matchRoutes);

router.use("/settings", settingRoutes);

export default router;
