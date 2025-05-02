import { Router } from "express";
import { getMatchesByOddStatusController, getMatchesController } from "../controllers/matches.controller";

const router = Router();

router.get("/", getMatchesController);
router.get("/odd-status", getMatchesByOddStatusController);
export default router;
