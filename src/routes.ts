import { Router } from "express";

import authRoutes from "./apis/authApis";
import countryRoutes from "./apis/countryApis";
import leagueRoutes from "./apis/leagueApi";
import teamRoutes from "./apis/teamApi";

const router = Router();

router.use("/auth", authRoutes);

router.use("/countries", countryRoutes);

router.use("/leagues", leagueRoutes);

router.use("/teams", teamRoutes);

export default router;
