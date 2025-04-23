import { Router } from "express";
import { getLeaguesController } from "../controllers/leagues.controller";

const router = Router();

router.get("/", getLeaguesController);

export default router;
