import { Team } from "./Team";
export class SuperTeam {
  team: Team;
  SPI_: string;
  offense_: string;
  defense_: string;
  leagueSearch: string;
  teamLink: string;
  teamWikipedia: string;
  teamID: string;
  // SPI!: number;

  constructor(team: Team) {
    this.team = team;
    this.SPI_ = team.SPI.toFixed(1);
    this.offense_ = team.offense.toFixed(1);
    this.defense_ = team.defense.toFixed(1);
    this.teamID = team.name.replace(/ /g, "%20");
    this.leagueSearch = "https://en.wikipedia.org/w/index.php?search=" + team.league.replace(/ /g, "%20");
    this.teamLink = "/team/" + this.teamID;
    this.teamWikipedia = "https://en.wikipedia.org/w/index.php?search=" + this.teamID;
  }
}