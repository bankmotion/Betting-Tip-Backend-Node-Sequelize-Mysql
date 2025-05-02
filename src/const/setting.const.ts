export const SettingID = {
  minEV: 1,
  minOdds: 2,
  maxOdds: 3,
  minProbability: 4,
  minTimeBeforeMatch: 5,
  maxTipsPerDay: 6,
  allowedBetTypes: 7,
  lowRisk: 8,
  mediumRisk: 9,
  highRisk: 10,
  overRound: 11,
  enableHighOddAdjust: 12,
  highOddSthreshold: 13,
  extraProbBoost: 14,
  scoreWeiPenalty: 15,
  scoreWeiEV: 16,
  scoreWeiProb: 17,
};

export interface SettingType {
  minEV: number;
  minOdds: number;
  maxOdds: number;
  minProbability: number;
  minTimeBeforeMatch: number;
  maxTipsPerDay: number;
  allowedBetTypes: number[];
  lowRisk: number;
  mediumRisk: number;
  highRisk: number;
  overRound: boolean;
  enableHighOddAdjust: boolean;
  highOddSthreshold: number;
  extraProbBoost: number;
  scoreWeiPenalty: number;
  scoreWeiEV: number;
  scoreWeiProb: number;
}
