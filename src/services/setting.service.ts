import { SettingID, SettingType } from "../const/setting.const";
import { Setting } from "../models/Setting";

export const getSettings = async () => {
  const setting = await Setting.findAll();
  return setting;
};

export const updateSettingService = async (setting: SettingType) => {
  await Setting.update(
    { value: setting.minEV },
    { where: { id: SettingID.minEV } }
  );
  await Setting.update(
    { value: setting.minOdds },
    { where: { id: SettingID.minOdds } }
  );
  await Setting.update(
    { value: setting.maxOdds },
    { where: { id: SettingID.maxOdds } }
  );
  await Setting.update(
    { value: setting.minProbability },
    { where: { id: SettingID.minProbability } }
  );
  await Setting.update(
    { value: setting.minTimeBeforeMatch },
    { where: { id: SettingID.minTimeBeforeMatch } }
  );
  await Setting.update(
    { value: setting.maxTipsPerDay },
    { where: { id: SettingID.maxTipsPerDay } }
  );
  await Setting.update(
    { value: setting.allowedBetTypes.join(",") },
    { where: { id: SettingID.allowedBetTypes } }
  );
  await Setting.update(
    { value: setting.lowRisk },
    { where: { id: SettingID.lowRisk } }
  );
  await Setting.update(
    { value: setting.mediumRisk },
    { where: { id: SettingID.mediumRisk } }
  );
  await Setting.update(
    { value: setting.highRisk },
    { where: { id: SettingID.highRisk } }
  );
  await Setting.update(
    { value: setting.overRound },
    { where: { id: SettingID.overRound } }
  );
  await Setting.update(
    { value: setting.enableHighOddAdjust },
    { where: { id: SettingID.enableHighOddAdjust } }
  );
  await Setting.update(
    { value: setting.highOddSthreshold },
    { where: { id: SettingID.highOddSthreshold } }
  );
  await Setting.update(
    { value: setting.extraProbBoost },
    { where: { id: SettingID.extraProbBoost } }
  );
  await Setting.update(
    { value: setting.scoreWeiPenalty },
    { where: { id: SettingID.scoreWeiPenalty } }
  );
  await Setting.update(
    { value: setting.scoreWeiEV },
    { where: { id: SettingID.scoreWeiEV } }
  );
  await Setting.update(
    { value: setting.scoreWeiProb },
    { where: { id: SettingID.scoreWeiProb } }
  );
  return await getSettings();
};
