import { config } from "dotenv";
config();
import axios from "axios";
import {
  CountryType,
  LeagueType,
  PredictionType,
} from "../types/ThiridPartAPIType";

export const getSportsAPIData = async (url: string) => {
  const options = {
    method: "GET",
    url: `https://v3.football.api-sports.io${url}`,
    headers: {
      "x-rapidapi-host": "v3.football.api-sports.io",
      "x-rapidapi-key": process.env.SPORTS_API_KEY,
    },
  };

  const response = await axios(options);
  // console.log(response.data);
  if (
    response.data.errors?.requests?.includes(
      "You have reached the request limit for the day"
    )
  ) {
    throw "You have reached the request limit for the day";
  } else if (
    response.data.errors?.token?.includes("Missing application key.")
  ) {
    throw "Missing application key.";
  }

  return response.data;
};

export const getCountriesData = async () => {
  const url = "/countries";
  const data = await getSportsAPIData(url);
  return data.response as CountryType[];
};

export const getLeaguesData = async ({ league }: { league: number }) => {
  const url = `/leagues?id=${league}`;
  const data = await getSportsAPIData(url); // uefa.json
  return data.response![0] as LeagueType;
};

export const getTeamsDataByLeagueAndSeason = async () => {
  const leagueId = 2;
  const season = 2023;
  const url = `/teams?league=${leagueId}&season=${season}`;
  const data = await getSportsAPIData(url); // teams.json
  return data;
};

export const getTeamDataByID = async (id: number) => {
  const url = `/teams?id=${id}`;
  const data = await getSportsAPIData(url);
  return data;
};

export const getTeamStatistic = async () => {
  const league = 2;
  const season = 2023;
  const team = 529;
  const url = `/teams/statistics?league=${league}&season=${season}&team=${team}`;
  const data = await getSportsAPIData(url); // team-stat.json
  return data;
};

export const getFixturesHeadToHead = async () => {
  const team1 = 529; // barca
  const team2 = 541; // real
  const url = `/fixtures/headtohead?h2h=${team1}-${team2}`;
  const data = await getSportsAPIData(url); // head-to-head.json
  return data;
};

export const getFixturesByID = async () => {
  const fixture = 1212943;
  const url = `/fixtures/statistics?fixture=${fixture}`;
  const data = await getSportsAPIData(url); // fixtures-by-id.json
  return data;
};

export const getFixturesEventsByID = async () => {
  const fixture = 1212943;
  const url = `/fixtures/events?fixture=${fixture}`;
  const data = await getSportsAPIData(url); // fixtures-events-by-id.json
  return data;
};

export const getPredicitonsByFixture = async ({
  fixture,
}: {
  fixture: number;
}) => {
  const url = `/predictions?fixture=${fixture}`;
  const data = await getSportsAPIData(url); // predictions.json
  return data.response![0] as PredictionType;
};

export const getOddsByFixture = async ({ fixture }: { fixture: number }) => {
  const bookmaker = 3;
  const betId = 5;
  const url = `/odds?fixture=${fixture}`; // odds.json
  const data = await getSportsAPIData(url);
  return data.response![0];
};

export const getMappingList = async (page: number) => {
  const url = `/odds/mapping?page=${page}`;
  const data = await getSportsAPIData(url); // mapping-list.json
  return data;
};

export const getBets = async () => {
  const url = `/odds/bets`;
  const data = await getSportsAPIData(url); // bets.json
  return data;
};
