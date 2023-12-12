import { League } from "./League";
export class Team {
  SPI!: number;
  offense!: number;
  defense!: number;
  name!: string;
  league!: string;
  leagueModel!: League;
  stringSPI!: string;

  constructor(SPI: number, offense: number, defense: number, name: string, league: string) {
    this.SPI = SPI;
    this.offense = offense;
    this.defense = defense;
    this.name = name;
    this.league = league;
    this.stringSPI = SPI.toFixed(2);
    this.leagueModel = new League(league);
  }

  public equals(rhs: Team) {
    return this.league === rhs.league && this.name === rhs.name && this.stringSPI === rhs.stringSPI;
  }
}
