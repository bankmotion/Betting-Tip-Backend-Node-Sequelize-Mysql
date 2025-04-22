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
} from "../services/match.services";
import {
  getCountriesData,
  getLeaguesData,
  getMappingList,
  getPredicitonsByFixture
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

const createNewMatch = async () => {
  try {
    let currentPage = 1;
    let hasMore = true;

    while (hasMore) {
      await delay(1);
      // get list for upcoming matches
      const mapData = await getMappingList(currentPage);
      console.log(`mapData.length`, mapData.length);
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
        console.log(`fixtureId`, mapItem.fixture.id);
        // get league data from db
        let league = await getLeagueService({
          leagueId: mapItem.league.id,
          season: mapItem.league.season,
        });

        if (!league) {
          await delay(1);
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

        if (league) {
          // create match data
          // const oddsData = await getOddsByFixture({
          //   fixture: mapItem.fixture.id,
          // });
          // console.log(JSON.stringify(oddsData));

          const prediciton = await getPredicitonsByFixture({
            fixture: mapItem.fixture.id,
          });

          let matchData = await getMatchDataService({
            fixtureId: mapItem.fixture.id,
          });

          if (!matchData) {
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

            console.log(
              mapItem.fixture.id,
              league.id,
              homeTeamData.id,
              awayTeamData.id
            );
            matchData = await createMatchDataService({
              fixtureId: mapItem.fixture.id,
              leagueId: league.id,
              homeTeamId: homeTeamData.id,
              awayTeamId: awayTeamData.id,
            });
          }
        }
      }
      break;
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
