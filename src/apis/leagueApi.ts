import { Router } from "express";
import {
  getLeaguesController,
  updateLeagueController,
} from "../controllers/leagues.controller";

const router = Router();

router.get("/", getLeaguesController);

router.put("/:id", updateLeagueController);

export default router;
