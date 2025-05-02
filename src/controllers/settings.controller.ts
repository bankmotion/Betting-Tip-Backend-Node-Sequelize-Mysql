import { Request, Response } from "express";
import { SettingType } from "../const/setting.const";
import { createNewMatch } from "../module/tip.create.module";
import { getSettings, updateSettingService } from "../services/setting.service";

export const getSettingController = async (req: Request, res: Response) => {
  const setting = await getSettings();
  res.status(200).json(setting);
};

export const updateSettingController = async (req: Request, res: Response) => {
  const setting = await updateSettingService(req.body as SettingType);
  await createNewMatch();
  res.status(200).json(setting);
};
