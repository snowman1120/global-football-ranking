import { League } from "./League";
import { SuperTeam } from "./SuperTeam";

export class Ranking {
  league!: string;
  leagueModel!: League | any;
  average!: number;
  stdDev!: number;
  SPIAverage!: string;
  SPIStdDev!: string;
  offensiveAverage!: string;
  defensiveAverage!: string;
  topTenAverage!: number;
  topTenStdDev!: number;
  topTenSPIAverage!: string;
  topTenSPIStdDev!: string;
  bestTeam!: SuperTeam;
  worstTeam!: SuperTeam;
  teams!: SuperTeam[];
  reversedTeams!: SuperTeam[];
  distributions!: number[];
  uniqueID!: string;

  constructor(league: string, average: number, stdDev: number, SPIAverage: string, SPIStdDev: string, offensiveAverage: string, defensiveAverage: string, topTenAverage: number, topTenStdDev: number, topTenSPIAverage: string, topTenSPIStdDev: string, bestTeam: SuperTeam, worstTeam: SuperTeam, teams: SuperTeam[], reversedTeams: SuperTeam[], distributions: number[]) {
    this.league = league;
    this.leagueModel = new League(league);
    this.average = average;
    this.stdDev = stdDev;
    this.SPIAverage = SPIAverage;
    this.SPIStdDev = SPIStdDev;
    this.offensiveAverage = offensiveAverage;
    this.defensiveAverage = defensiveAverage;
    this.topTenAverage = topTenAverage;
    this.topTenStdDev = topTenStdDev;
    this.topTenSPIAverage = topTenSPIAverage;
    this.topTenSPIStdDev = topTenSPIStdDev;
    this.bestTeam = bestTeam;
    this.worstTeam = worstTeam;
    this.teams = teams;
    this.reversedTeams = reversedTeams;
    this.distributions = distributions;
    this.uniqueID = this.leagueModel.uniqueID;
  }
}