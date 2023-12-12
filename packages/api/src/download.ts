/**
 * 
 */
import * as https from 'https';
import * as csv from 'fast-csv';
import { URL } from 'url';

import { Team } from './model/Team';
import { Ranking } from './model/Ranking';
import { WorldCupGroupMappings } from './model/WorldCupGroupMappings';
import { WorldCupData } from './model/WorldCupData';
import { AllDataTeamType } from './model/AllDataTeamType';
import { SharedState } from './SharedState';
import { generateRanking } from './utils';

const getTeamInfoFromCSV = async (url: string | https.RequestOptions | URL, leagueKey: String): Promise<any[]> => {
  const map = (teams: any[], leagueKey: any) => teams.map(team => ({
      SPI: Number(team.spi),
      name: team.name,
      league: team[leagueKey],
      offense: Number(team.off),
      defense: Number(team.def),
    }));
  return new Promise((resolve, reject) => {
    const data: any[] = []
    https.get(url, response => {
      response
        .pipe(csv.parse({ headers: true }))
        .on('error', (error: any) => console.error(error))
        .on('data', (row: any) => data.push(row))
        .on('end', () => resolve(map(data, leagueKey)));
    }).on('error', error => reject(error));
  });
}

function generate(teams: Team[]): Ranking[] {
  const dict: { [key: string]: Team[] } = {};
  for (const team of teams) {
      if (dict[team.league]) {
          dict[team.league].push(team);
      } else {
          dict[team.league] = [team];
      }
  }
  const leagueSPIAverages: Ranking[] = [];
  for (const k in dict) {
      const ar = dict[k];
      const ranking = generateRanking(ar, k);
      leagueSPIAverages.push(ranking);
  }
  return leagueSPIAverages.sort((a, b) => b.average - a.average);
}

const downloadClubTeams = async () => {
  const teams: Team[] = await getTeamInfoFromCSV('https://projects.fivethirtyeight.com/soccer-api/club/spi_global_rankings.csv', 'league');
  const ranking = generate(teams)
    .filter(team => !team.league.includes('UEFA'));
  const allDataType: AllDataTeamType = {
    time: Date.now() / 1000, // Convert milliseconds to seconds
    teams: teams,
  };
  return { AllDataTeamType: allDataType, ranking };
}

const downloadNationalTeams = async () => {
  const teams: Team[] = await getTeamInfoFromCSV('https://projects.fivethirtyeight.com/soccer-api/international/spi_global_rankings_intl.csv', 'confed');
  const ranking = generate(teams);
  const allDataType: AllDataTeamType = {
    time: Date.now() / 1000, // Convert milliseconds to seconds
    teams: teams,
  };
    
  let worldCupData = new WorldCupGroupMappings().filter(allDataType.teams)
      
  return { AllDataTeamType: allDataType, ranking, worldCupData };
}

const download = async () => {
  const { AllDataTeamType: allDataType, ranking } = await downloadClubTeams();
  const { AllDataTeamType: allDataTypeInternational, ranking: rankingInternational, worldCupData: worldCupGroups } = await downloadNationalTeams();
  SharedState.internationalState.submitNewData(rankingInternational, allDataTypeInternational)
  SharedState.clubState.submitNewData(ranking, allDataType)
  WorldCupData.data.setWorldGroups(worldCupGroups)
}

setInterval(() => {
  download();
}, 0, 3600000);