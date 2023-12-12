import { SuperTeam } from "./SuperTeam";
export interface Group {
  title: string;
  teams: SuperTeam[];
  avgSPI: number;
  _avgSPI: string;
  // Add other properties as needed
}