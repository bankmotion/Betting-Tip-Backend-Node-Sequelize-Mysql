export interface MappingListType {
  league: {
    id: number;
    season: number;
  };
  fixture: {
    id: number;
    date: string;
    timestamp: number;
  };
  update: string;
}

export interface CountryType {
  name: string;
  code: string;
  flag: string;
}

export interface LeagueType {
  league: {
    id: number;
    name: string;
    type: string;
    logo: string;
  };
  country: {
    name: string;
    code: string;
    flag: string;
  };
  seasons: SeasonType[];
}

export interface SeasonType {
  year: number;
  start: string;
  end: string;
  current: boolean;
  coverage: {
    fixtures: {
      events: boolean;
      lineups: boolean;
      statistics_fixtures: boolean;
      statistics_players: boolean;
    };
    standings: boolean;
    players: boolean;
    top_scorers: boolean;
    top_assists: boolean;
    top_cards: boolean;
    injuries: boolean;
    predictions: boolean;
    odds: boolean;
  };
}

export interface PredictionType {
  predictions: {
    winner: {
      id: number;
      name: number;
      comment: string;
    };
    win_or_draw: boolean;
    under_over: string;
    goals: {
      home: string;
      away: string;
    };
    advice: string;
    percent: {
      home: string;
      draw: string;
      away: string;
    };
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
  };
  teams: {
    home: PredictionTeamType;
    away: PredictionTeamType;
  };
  comparison: {
    form: HomeAwayType;
    att: HomeAwayType;
    def: HomeAwayType;
    poisson_distribution: HomeAwayType;
    h2h: HomeAwayType;
    goals: HomeAwayType;
    total: HomeAwayType;
  };
}

export interface HomeAwayType {
  home: string;
  away: string;
}

export interface TimePercentType {
  total: number;
  percentage: string;
}

export interface OverUnderType {
  over: number;
  under: number;
}

export interface FixtureSmallType {
  home: number;
  away: number;
  total: number;
}

export interface PredictionTeamType {
  id: number;
  name: string;
  logo: string;
  last_5: {
    played: number;
    form: string;
    att: string;
    def: string;
    goals: {
      for: {
        total: number;
        average: string;
      };
      against: {
        total: number;
        average: string;
      };
    };
  };
  league: {
    form: string;
    fixtures: {
      played: FixtureSmallType;
      wins: FixtureSmallType;
      draws: FixtureSmallType;
      loses: FixtureSmallType;
    };
    goals: {
      for: {
        total: HomeAwayType;
        average: HomeAwayType;
        minute: {
          "0-15": TimePercentType;
          "16-30": TimePercentType;
          "31-45": TimePercentType;
          "46-60": TimePercentType;
          "61-75": TimePercentType;
          "76-90": TimePercentType;
          "91-105": TimePercentType;
          "106-120": TimePercentType;
        };
        under_over: {
          "0.5": OverUnderType;
          "1.5": OverUnderType;
          "2.5": OverUnderType;
          "3.5": OverUnderType;
          "4.5": OverUnderType;
        };
      };
      against: {
        total: HomeAwayType;
        average: HomeAwayType;
        minute: {
          "0-15": TimePercentType;
          "16-30": TimePercentType;
          "31-45": TimePercentType;
          "46-60": TimePercentType;
          "61-75": TimePercentType;
          "76-90": TimePercentType;
          "91-105": TimePercentType;
          "106-120": TimePercentType;
        };
        under_over: {
          "0.5": OverUnderType;
          "1.5": OverUnderType;
          "2.5": OverUnderType;
          "3.5": OverUnderType;
          "4.5": OverUnderType;
        };
      };
    };
    biggest: {
      streak: {
        wins: number;
        draws: number;
        loses: number;
      };
      wins: {
        home: string;
        away: string;
      };
      loses: {
        home: string;
        away: string;
      };
      goals: {
        for: HomeAwayType;
        against: HomeAwayType;
      };
    };
    clean_sheet: {
      home: number;
      away: number;
      total: number;
    };
    failed_to_score: {
      home: number;
      away: number;
      total: number;
    };
    penalty: {
      scored: TimePercentType;
      missed: TimePercentType;
      total: number;
    };
    lineups: {
      formation: string;
      played: number;
    }[];
    cards: {
      yellow: {
        "0-15": TimePercentType;
        "16-30": TimePercentType;
        "31-45": TimePercentType;
        "46-60": TimePercentType;
        "61-75": TimePercentType;
        "76-90": TimePercentType;
        "91-105": TimePercentType;
        "106-120": TimePercentType;
        "": TimePercentType;
      };
      red: {
        "0-15": TimePercentType;
        "16-30": TimePercentType;
        "31-45": TimePercentType;
        "46-60": TimePercentType;
        "61-75": TimePercentType;
        "76-90": TimePercentType;
        "91-105": TimePercentType;
        "106-120": TimePercentType;
      };
    };
  };
}
