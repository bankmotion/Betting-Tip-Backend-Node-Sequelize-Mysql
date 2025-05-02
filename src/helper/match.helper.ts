import { Match } from "../models/Match";
import { Setting } from "../models/Setting";
import { SettingID } from "../const/setting.const";
import { Odd } from "../models/Odd";

export const sortOddsListByScore = (oddsList: Odd[], settings: Setting[]) => {
  const scoreWeiPenalty =
    Number(
      settings.find((setting) => setting.id === SettingID.scoreWeiPenalty)
        ?.value
    ) || 0;
  const scoreWeiEV =
    Number(
      settings.find((setting) => setting.id === SettingID.scoreWeiEV)?.value
    ) || 0;
  const scoreWeiProb =
    Number(
      settings.find((setting) => setting.id === SettingID.scoreWeiProb)?.value
    ) || 0;

  const sortedMatches = oddsList.sort((a, b) => {
    const aScore =
      (-Math.log10(Math.max(...a.odds)) * scoreWeiPenalty) / 10 +
      a.ev * scoreWeiEV +
      (a.probability * scoreWeiProb) / 100;
    const bScore =
      (-Math.log10(Math.max(...b.odds)) * scoreWeiPenalty) / 10 +
      b.ev * scoreWeiEV +
      (b.probability * scoreWeiProb) / 100;
    return bScore - aScore;
  });

  return sortedMatches;
};
