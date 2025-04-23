import { Router } from "express";
import { getTeamsController } from "../controllers/teams.controller";

const router = Router();

router.get("/", getTeamsController);

export default router;
