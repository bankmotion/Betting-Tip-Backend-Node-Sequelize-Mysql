import { Op } from "sequelize";
import { BetType } from "../const/bet.const";
import { MatchStatus } from "../const/match.const";
import { SettingID } from "../const/setting.const";
import { Match } from "../models/Match";
import { Odd } from "../models/Odd";
import { Setting } from "../models/Setting";
import {
  getMatchesListService,
  updateMatchDataService,
} from "../services/match.services";
import { getSettings } from "../services/setting.service";

export const getFactorsFromOdds = ({
  oddsArr,
  betType,
  betSubType,
  enableHighOddAdjust,
  highOddSthreshold,
  extraProbBoost,
}: {
  oddsArr: number[];
  betType: number;
  betSubType: number;
  enableHighOddAdjust: boolean;
  highOddSthreshold: number;
  extraProbBoost: number;
}) => {
  const getBias = (betType: number, odd: number) => {
    const rule = BetType.find((bet) => bet.id === betType)?.bias;
    if (!rule) {
      return 0;
    }

    const bias = rule.find((r) => odd >= r.oddsMin && odd <= r.oddsMax)?.bias;
    if (!bias) {
      return 0;
    }

    return bias;
  };

  if (oddsArr.length === 0) {
    return {
      probability: 0,
      roi: 0,
      ev: 0,
      odd: 0,
    };
  }

  const odd = Math.max(...oddsArr);

  const bias = getBias(betType, odd);

  const trueProbability = 1 / (odd * (1 + bias));
  const extraProbability =
    enableHighOddAdjust && odd > highOddSthreshold ? extraProbBoost : 0;
  const boostedProbability = Math.min(trueProbability + extraProbability, 1);

  const adjustedEV = boostedProbability * odd - 1;

  const roi = adjustedEV * 100;

  console.log({
    probability: boostedProbability * 100,
    roi,
    ev: adjustedEV,
    odd,
    extraProbBoost,
    enableHighOddAdjust,
    highOddSthreshold,
    bias,
    trueProbability,
    boostedProbability,
    adjustedEV,
  });

  return {
    probability: boostedProbability * 100,
    roi,
    ev: adjustedEV,
    odd,
  };
};

export const isValidTip = (
  odd: number,
  probability: number,
  roi: number,
  ev: number,
  settings: Setting[],
  betType: number
) => {
  const minOdd =
    Number(
      settings.find((setting) => setting.id === SettingID.minOdds)?.value
    ) || 0;
  const maxOdd =
    Number(
      settings.find((setting) => setting.id === SettingID.maxOdds)?.value
    ) || 0;
  const minProbability =
    Number(
      settings.find((setting) => setting.id === SettingID.minProbability)?.value
    ) || 0;
  const minEV =
    Number(settings.find((setting) => setting.id === SettingID.minEV)?.value) ||
    0;

  const availableBetIDs = settings
    .find((setting) => setting.id === SettingID.allowedBetTypes)
    ?.value.split(",")
    .map((id) => Number(id));

  return (
    odd >= minOdd &&
    odd <= maxOdd &&
    probability >= minProbability &&
    roi >= 0 &&
    ev >= minEV &&
    availableBetIDs?.includes(betType)
  );
};

export const filterTips = async () => {
  const settings = await getSettings();
  const minTimeBeforeMatch = Number(
    settings.find((setting) => setting.id === SettingID.minTimeBeforeMatch)
      ?.value
  );

  const curTime = new Date().getTime() / 1000;

  const upcomingMatches = await getMatchesListService({
    matchStatus: MatchStatus.Upcoming,
    matchTimestamp: {
      [Op.gte]: curTime + minTimeBeforeMatch * 60,
    },
  });

  // valid tip with one array
  const validOdds = upcomingMatches
    .flatMap((match) => {
      return match.odds.filter((odd) => {
        return odd.tipValid;
      });
    })
    .filter((odd) => {
      return odd.tipValid;
    });

  console.log(`validOdds.length: ${validOdds.length}`);

  // get all match's bettypes odds and get probability and ROI and then filter with setting value
  // record's frist param is combination of match id and bettype id
  // const filteredMatches: { id: number; oddIds: number[] }[] = [];

  // for (const match of upcomingMatches) {
  //   if (
  //     match.matchStatus !== MatchStatus.Upcoming ||
  //     curTime > match.matchTimestamp - minTimeBeforeMatch * 60
  //   ) {
  //     continue;
  //   }

  //   const updatedOddUIds: number[] = [];
  //   for (const odd of match.odds) {
  //     const oddData = odd.dataValues;
  //     const { odds, probability, roi, ev } = oddData;
  //     if (isValidTip(odds, probability, roi, ev, settings)) {
  //       updatedOddUIds.push(oddData.id);
  //     }
  //   }

  //   if (updatedOddUIds.length > 0) {
  //     filteredMatches.push({ id: match.id, oddIds: updatedOddUIds });
  //   }
  // }
  // console.log(filteredMatches);

  // return filteredMatches;
};
