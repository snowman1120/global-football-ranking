import { Team } from "./Team";
import { SuperTeam } from "./SuperTeam";
import { Group } from "./Group";

export class WorldCupGroupMappings {
  filter(allTeams: Team[]): Group[] {
    const groups: [string, string[]][] = [
      ["Group A", ["Qatar", "Ecuador", "Senegal", "Netherlands"]],
      ["Group B", ["England", "USA", "Wales", "Iran"]],
      ["Group C", ["Argentina", "Saudi Arabia", "Mexico", "Poland"]],
      ["Group D", ["France", "Australia", "Denmark", "Tunisia"]],
      ["Group E", ["Spain", "Costa Rica", "Germany", "Japan"]],
      ["Group F", ["Belgium", "Canada", "Morocco", "Croatia"]],
      ["Group G", ["Brazil", "Serbia", "Switzerland", "Cameroon"]],
      ["Group H", ["Portugal", "Ghana", "Uruguay", "South Korea"]],
    ];

    const worldCupGroups: Group[] = groups.map((group) => { 
      const teams = group[1]
        .map((teamName: string) => {
          const team = allTeams.find((team: Team) => team.name === teamName);
          return team;
        })
        .filter(team => team !== null)
        .sort((a: any, b: any) => b.SPI - a.SPI)
        .map((team: any) => new SuperTeam(team));

      const avg = teams.reduce((sum, t) => sum + t.team.SPI, 0) / teams.length;
    
      return {
        title: group[0],
        teams,
        avgSPI: avg,
        _avgSPI: avg.toFixed(1),
      };
    });

    return worldCupGroups.sort((a, b) => b.avgSPI - a.avgSPI);
  }
}