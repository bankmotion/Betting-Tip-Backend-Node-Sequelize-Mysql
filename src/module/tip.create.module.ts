import { BetType } from "../const/bet.const";
import {
  createCountryData,
  getCountryData,
} from "../services/country.services";
import {
  createLeagueService,
  getLeagueService,
} from "../services/league.services";
import {
  createMatchDataService,
  getMatchDataService,
  updateMatchDataService,
} from "../services/match.services";
import {
  createOddsDataService,
  getOddsByFixtureService,
  updateOddsDataService,
} from "../services/odd.services";
import { getSettings } from "../services/setting.service";
import {
  getCountriesData,
  getLeaguesData,
  getMappingList,
  getOddsByFixture,
  getPredicitonsByFixture,
} from "../services/sports.api.services";
import {
  createTeamDataService,
  getTeamDataService,
} from "../services/team.services";
import {
  CountryType,
  MappingListType,
  SeasonType,
} from "../types/ThiridPartAPIType";
import { delay } from "../utils/utils";
import { getFactorsFromOdds, isValidTip } from "./tip.filter.module";

export const createNewMatch = async () => {
  try {
    let currentPage = 1;
    let hasMore = true;

    const settings = await getSettings();

    while (hasMore) {
      // await delay(1);
      // get list for upcoming matches
      const mapData = await getMappingList(currentPage);
      if (mapData.paging.current === mapData.paging.total) {
        hasMore = false;
      }
      currentPage++;

      // Filter the list for upcoming matches
      const mapList = mapData.response
        .map((item: MappingListType) => item)
        .filter(
          (item: MappingListType) =>
            item.fixture.timestamp >= new Date().getTime() / 1000
        ) as MappingListType[];
      console.log(`mapList.length`, mapList.length);

      for (const mapItem of mapList) {
        // console.log(`fixtureId`, mapItem.fixture.id);
        // get league data from db
        let league = await getLeagueService({
          leagueId: mapItem.league.id,
          season: mapItem.league.season,
        });

        if (!league) {
          // await delay(1);
          // get league data from third party api
          const newLeagueData = await getLeaguesData({
            league: mapItem.league.id,
          });

          if (newLeagueData) {
            const newSeason = newLeagueData.seasons.find(
              (item: SeasonType) => item.year === mapItem.league.season
            );

            if (newSeason) {
              let countryData = await getCountryData({
                name: newLeagueData.country.name,
              });

              if (!countryData) {
                const newCountriesData = await getCountriesData();
                const newCountry = newCountriesData.find(
                  (item: CountryType) =>
                    item.name === newLeagueData.country.name
                );

                if (newCountry) {
                  countryData = await createCountryData({
                    name: newCountry.name,
                    code: newCountry.code || "",
                    flag: newCountry.flag || "",
                  });
                }
              }

              if (countryData) {
                league = await createLeagueService({
                  leagueId: mapItem.league.id,
                  season: mapItem.league.season,
                  name: newLeagueData.league.name,
                  type: newLeagueData.league.type,
                  logo: newLeagueData.league.logo,
                  countryId: countryData.id,
                });
              }
            }
          }
        }

        if (league?.isActive) {
          let matchData = await getMatchDataService({
            fixtureId: mapItem.fixture.id,
          });

          if (!matchData) {
            const prediciton = await getPredicitonsByFixture({
              fixture: mapItem.fixture.id,
            });

            const homeTeamId = prediciton.teams.home.id;
            const awayTeamId = prediciton.teams.away.id;
            let homeTeamData = await getTeamDataService({ teamId: homeTeamId });
            let awayTeamData = await getTeamDataService({ teamId: awayTeamId });

            if (!homeTeamData) {
              homeTeamData = await createTeamDataService({
                teamId: homeTeamId,
                name: prediciton.teams.home.name,
                logo: prediciton.teams.home.logo,
              });
            }

            if (!awayTeamData) {
              awayTeamData = await createTeamDataService({
                teamId: awayTeamId,
                name: prediciton.teams.away.name,
                logo: prediciton.teams.away.logo,
              });
            }

            matchData = await createMatchDataService({
              fixtureId: mapItem.fixture.id,
              leagueId: league.id,
              homeTeamId: homeTeamData.id,
              awayTeamId: awayTeamData.id,
              matchTimestamp: mapItem.fixture.timestamp,
              dataUpdateTimestamp:
                new Date(mapItem.update).getTime() / 1000 || 0,
            });
          } else {
            if (
              matchData.dataUpdateTimestamp <
              new Date(mapItem.update).getTime() / 1000
            ) {
              matchData.dataUpdateTimestamp =
                new Date(mapItem.update).getTime() / 1000;

              matchData = await updateMatchDataService({
                id: matchData.id,
                dataUpdateTimestamp: new Date(mapItem.update).getTime() / 1000,
              });
              console.log(`matchData updated`, matchData?.id);
            }
          }

          if (matchData) {
            const oddsData = await getOddsByFixture({
              fixture: mapItem.fixture.id,
            });

            for (const bet of BetType) {
              for (const sub of bet.subTypes) {
                const oddData = oddsData?.bookmakers.flatMap((book) =>
                  book.bets
                    .filter((betItem) => betItem.id === sub.keyId)
                    .flatMap((betItem) =>
                      betItem.values
                        .filter((value) => value.value === sub.key)
                        .map((value) => parseFloat(value.odd))
                    )
                );

                const odd = await getOddsByFixtureService({
                  fixtureId: mapItem.fixture.id,
                  betType: bet.id,
                  betSubType: sub.subId,
                });

                const {
                  probability,
                  roi,
                  odd: highOdd,
                  ev,
                } = getFactorsFromOdds({
                  oddsArr: oddData,
                  betType: bet.id,
                  betSubType: sub.subId,
                  enableHighOddAdjust: false,
                  highOddSthreshold: 0,
                  extraProbBoost: 0,
                });

                const isValid = isValidTip(
                  highOdd,
                  probability,
                  roi,
                  ev,
                  settings,
                  bet.id
                );

                if (!odd) {
                  await createOddsDataService({
                    fixtureId: mapItem.fixture.id,
                    matchId: matchData.id,
                    betType: bet.id,
                    betSubType: sub.subId,
                    dataUpdateTimestamp:
                      new Date(oddsData.update).getTime() / 1000,
                    odds: oddData,
                    probability,
                    roi,
                    ev,
                    tipValid: isValid,
                  });
                } else {
                  await updateOddsDataService({
                    id: odd.id,
                    odds: oddData,
                    dataUpdateTimestamp:
                      new Date(oddsData.update).getTime() / 1000,
                    probability,
                    roi,
                    ev,
                    tipValid: isValid,
                  });
                  // console.log(`odd data updated`, odd?.id);
                }
              }
            }
          }
        }
      }
      // break;
    }

    console.log(`All matches created`);
  } catch (err) {
    console.error(`Error in createNewMatch: ${err}`);
  }
};

export const eventBettingTip = async () => {
  try {
    setInterval(() => {
      createNewMatch();
    }, 1000 * 60 * 60 * 24);
    createNewMatch();
  } catch (error) {}
};
