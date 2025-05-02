import { Router } from "express";
import {
  getSettingController,
  updateSettingController,
} from "../controllers/settings.controller";
const router = Router();

router.get("/", getSettingController);
router.put("/", updateSettingController);

export default router;
