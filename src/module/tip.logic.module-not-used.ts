import { TeamStatisticType } from "../types/ThiridPartAPIType";

export const getTipChances = (
  homeStat: TeamStatisticType,
  awayStat: TeamStatisticType
) => {
  console.log(
    homeStat.goals.for.average.total,
    homeStat.goals.against.average.total,
    awayStat.goals.for.average.total,
    awayStat.goals.against.average.total
  );
  const matchResult = getMatchResult(homeStat, awayStat);
  const BTTS = getBTTS(homeStat, awayStat);
  const doubleChance = getDoubleChance(homeStat, awayStat);
  const overUnderTotalGoal = getOverUnderTotalGoalChance(homeStat, awayStat);
  const overUnderTeam = getOverUnderTeamChance(homeStat, awayStat);
  const asianHandicap = getAsianHandicapChance(homeStat, awayStat);
  const HTFT = getHTFTChance(homeStat, awayStat);
  const goalInBothHalves = getGoalInBothHalves(homeStat, awayStat);

  return {
    matchResult,
    BTTS,
    doubleChance,
    overUnderTotalGoal,
    overUnderTeam,
    asianHandicap,
    HTFT,
    goalInBothHalves,
  };
};

export const getBTTS = (
  homeStat: TeamStatisticType,
  awayStat: TeamStatisticType
) => {
  const oneTeamBtts = (stat: TeamStatisticType) => {
    const homeGoalsFor = Number(stat.goals.for.average.total) || 0;
    const awayGoalsFor = Number(stat.goals.for.average.total) || 0;
    const homeGoalsAgainst = Number(stat.goals.against.average.total) || 0;
    const awayGoalsAgainst = Number(stat.goals.against.average.total) || 0;

    const attackingStrength = (homeGoalsFor + awayGoalsFor) / 2;
    const defensiveWeakness = (homeGoalsAgainst + awayGoalsAgainst) / 2;

    const BTTSProbability = Math.min(
      1,
      (attackingStrength * 0.6 + defensiveWeakness * 0.4) / 2
    );

    return BTTSProbability;
  };

  const homeTeamBTTS = oneTeamBtts(homeStat);
  const awayTeamBTTS = oneTeamBtts(awayStat);

  const bttsYes =
    Number(Math.min(1, (homeTeamBTTS + awayTeamBTTS) / 2).toFixed(2)) || 0;

  const bttsNo = Number((1 - bttsYes).toFixed(2));

  return { yes: bttsYes, no: bttsNo };
};

export const getMatchResult = (
  homeStat: TeamStatisticType,
  awayStat: TeamStatisticType
) => {
  const homeAttack = Number(homeStat.goals.for.average.total) || 0;
  const homeDefense = Number(homeStat.goals.against.average.total) || 0;
  const awayAttack = Number(awayStat.goals.for.average.total) || 0;
  const awayDefense = Number(awayStat.goals.for.average.total) || 0;

  const homeStrength = homeAttack / awayDefense;
  const awayStrength = awayAttack / homeDefense;

  const homeWinChance = Number(
    (homeStrength / (homeStrength + awayStrength + 0.7)).toFixed(2)
  );
  const awayWinChance = Number(
    (awayStrength / (homeStrength + awayStrength + 0.7)).toFixed(2)
  );
  const drawChance = Number((1 - homeWinChance - awayWinChance).toFixed(2));

  return {
    homeWin: homeWinChance,
    awayWin: awayWinChance,
    drawWin: drawChance,
  };
};

export const getDoubleChance = (
  homeStat: TeamStatisticType,
  awayStat: TeamStatisticType
) => {
  const homeAttack = Number(homeStat.goals.for.average.total) || 0;
  const homeDefense = Number(homeStat.goals.against.average.total) || 0;
  const awayAttack = Number(awayStat.goals.for.average.total) || 0;
  const awayDefense = Number(awayStat.goals.for.average.total) || 0;

  const homeStrength = homeAttack / (awayDefense || 1);
  const awayStrength = awayAttack / (homeDefense || 1);

  const totalStrength = homeStrength + awayStrength + 0.7;

  const homeWin = homeStrength / totalStrength;
  const awayWin = awayStrength / totalStrength;
  const draw = 1 - homeWin - awayWin;

  return {
    HD: homeWin + draw,
    AD: awayWin + draw,
    HA: homeWin + awayWin,
  };
};

export const getOverUnderTotalGoalChance = (
  homeStat: TeamStatisticType,
  awayStat: TeamStatisticType
) => {
  const homeFor = Number(homeStat.goals.for.average.total) || 0;
  const awayFor = Number(awayStat.goals.for.average.total) || 0;
  const homeAgainst = Number(homeStat.goals.against.average.total) || 0;
  const awayAgainst = Number(awayStat.goals.against.average.total) || 0;

  const avgGoalsPerMatch = (homeFor + awayFor + homeAgainst + awayAgainst) / 4;

  const calculateOverUnder = (line: number, type = "over") => {
    let rawProb = (avgGoalsPerMatch - (line - 1)) / 2;
    rawProb = Math.max(0.1, Math.min(1, rawProb));

    return type === "over" ? rawProb : 1 - rawProb;
  };

  const results = {
    over1_5: calculateOverUnder(1.5, "over"),
    under1_5: calculateOverUnder(1.5, "under"),

    over2_5: calculateOverUnder(2.5, "over"),
    under2_5: calculateOverUnder(2.5, "under"),

    over3_5: calculateOverUnder(3.5, "over"),
    under3_5: calculateOverUnder(3.5, "under"),

    over4_5: calculateOverUnder(4.5, "over"),
    under4_5: calculateOverUnder(4.5, "under"),
  };

  return results;
};

export const getOverUnderTeamChance = (
  homeStat: TeamStatisticType,
  awayStat: TeamStatisticType
) => {
  const homeFor = Number(homeStat.goals.for.average.total) || 0;
  const awayFor = Number(awayStat.goals.for.average.total) || 0;

  const calOverUnder = (line: number, type = "over", teamAvgGoals: number) => {
    let rawProb = (teamAvgGoals - (line - 1)) / 2;
    rawProb = Math.max(0.1, Math.min(1, rawProb));
    return type === "over" ? rawProb : 1 - rawProb;
  };

  return {
    home: {
      over1_5: calOverUnder(1.5, "over", homeFor),
      under1_5: calOverUnder(1.5, "under", homeFor),
      over2_5: calOverUnder(2.5, "over", homeFor),
      under2_5: calOverUnder(2.5, "under", homeFor),
      over3_5: calOverUnder(3.5, "over", homeFor),
      under3_5: calOverUnder(3.5, "under", homeFor),
      over4_5: calOverUnder(4.5, "over", homeFor),
      under4_5: calOverUnder(4.5, "under", homeFor),
    },
    away: {
      over1_5: calOverUnder(1.5, "over", awayFor),
      under1_5: calOverUnder(1.5, "under", awayFor),
      over2_5: calOverUnder(2.5, "over", awayFor),
      under2_5: calOverUnder(2.5, "under", awayFor),
      over3_5: calOverUnder(3.5, "over", awayFor),
      under3_5: calOverUnder(3.5, "under", awayFor),
      over4_5: calOverUnder(4.5, "over", awayFor),
      under4_5: calOverUnder(4.5, "under", awayFor),
    },
  };
};

export const getAsianHandicapChance = (
  homeStat: TeamStatisticType,
  awayStat: TeamStatisticType
) => {
  const homeFor = Number(homeStat.goals.for.average.total) || 0;
  const homeAgainst = Number(homeStat.goals.against.average.total) || 0;
  const awayFor = Number(awayStat.goals.for.average.total) || 0;
  const awayAgainst = Number(awayStat.goals.against.average.total) || 0;

  const calculate = (
    goalsFor: number,
    defense: number,
    goalsAgainstOpponent: number,
    handicap: number
  ) => {
    // Offensive strengh (how many goals the team scores)
    const offensiveStrength = goalsFor;
    const defensiveWeakness = 1 - defense;

    let rawProb =
      (offensiveStrength -
        goalsAgainstOpponent +
        defensiveWeakness +
        Math.abs(handicap)) /
      (2 + Math.abs(handicap));
    rawProb = Math.max(0.1, Math.min(1, rawProb));
    return rawProb;
  };

  return {
    home: calculate(homeFor, homeAgainst, awayFor, -1.5),
    away: calculate(awayFor, awayAgainst, homeFor, -1.5),
  };
};

export const getHTFTChance = (
  homeStat: TeamStatisticType,
  awayStat: TeamStatisticType
) => {
  const homeFor = Number(homeStat.goals.for.average.total) || 0;
  const awayFor = Number(awayStat.goals.for.average.total) || 0;
  const homeAgainst = Number(homeStat.goals.against.average.total) || 0;
  const awayAgainst = Number(awayStat.goals.against.average.total) || 0;

  const calculate = (
    goalsFor: number,
    goalsAgainst: number,
    opponentAttack: number
  ) => {
    const halfTimeEdge = goalsFor - opponentAttack;

    const fulltimeStrength = (goalsFor - goalsAgainst) / 2;

    let rawProb = (halfTimeEdge + fulltimeStrength) / 2;
    rawProb = Math.max(0.1, Math.min(1, rawProb));

    return rawProb;
  };

  return {
    home: calculate(homeFor, homeAgainst, awayFor),
    away: calculate(awayFor, awayAgainst, homeFor),
  };
};

export const getGoalInBothHalves = (
  homeStat: TeamStatisticType,
  awayStat: TeamStatisticType
) => {
  const homeFor = Number(homeStat.goals.for.average.total) || 0;
  const awayFor = Number(awayStat.goals.for.average.total) || 0;
  const homeAgainst = Number(homeStat.goals.against.average.total) || 0;
  const awayAgainst = Number(awayStat.goals.against.average.total) || 0;

  const goalFor = homeFor + awayFor;
  const goalAgainst = homeAgainst + awayAgainst;

  const goalEnv = (goalFor + goalAgainst) / 2;

  // Heuristic normalization: higher goal environments make goals in both halves more likely
  let probability = (goalEnv - 1.8) / 1.8;
  probability = Math.max(0.1, Math.min(1, probability));

  return probability;
};
