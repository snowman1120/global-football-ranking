export class League {
  currentLeagueName!: string;
  leagueName!: string;
  lowercaseLeagueName!: string;
  leagueCountry!: string;
  flag!: string;
  uniqueID!: string;

  constructor(leagueName: string) {
    const isInternational = (league: string): Boolean => {
      const leagues = ["CONMEBOL", "UEFA", "CAF", "CONCACAF", "AFC", "OFC"];
      return leagues.some(item => item.toUpperCase() === league.toUpperCase());
    }
    const leagueData = League.getLeagueData(leagueName);
    if (leagueData) {
      this.currentLeagueName = leagueName;
      this.leagueName = leagueData.leagueName;
      this.leagueCountry = leagueData.leagueCountry;
      this.flag = leagueData.flag;
    } else {
        this.currentLeagueName = leagueName;
        this.leagueName = leagueName;
        this.leagueCountry = "Unknown";
        this.flag = isInternational(leagueName) ? "" : "🏳️";
    }
    
    // Replace spaces in leagueName with an empty string
    const leagueIdentifier = leagueName.replace(/ /g, "");
    
    // Set the uniqueID using the UTF-8 representation of leagueIdentifier
    this.uniqueID = Buffer.from(leagueIdentifier, 'utf-8').toString('utf-8');
    
    // Convert leagueName to lowercase and assign it to lowercaseLeagueName
    this.lowercaseLeagueName = this.leagueName.toLowerCase();
  }

  public displayName(): string {
    return this.leagueName;
  }

  private static getLeagueData(leagueName: string) {
    return this.leaguesData[leagueName];
  }
  static leaguesData: { [key: string]: {leagueName: string, leagueCountry: string, flag: string} } = {
    "Barclays Premier League": { leagueName: "Premier League", leagueCountry: "England", flag: "🇬🇧"},
    "German Bundesliga": { leagueName: "Bundesliga", leagueCountry: "Germany", flag: "🇩🇪"},
    "Spanish Primera Division": { leagueName: "LaLiga", leagueCountry: "Spain", flag: "🇪🇸"},
    "Italy Serie A": { leagueName: "Serie A", leagueCountry: "Italy", flag: "🇮🇹"},
    "French Ligue 1": { leagueName: "Ligue 1", leagueCountry: "France", flag: "🇫🇷"},
    "Dutch Eredivisie": { leagueName: "Eredivisie", leagueCountry: "Netherlands", flag: "🇳🇱"},
    "Portuguese Liga": { leagueName: "Primeira Liga", leagueCountry: "Portugal", flag: "🇵🇹"},
    "Brasileiro Série A": { leagueName: "Brasileiro", leagueCountry: "Brazil", flag: "🇧🇷"},
    "Mexican Primera Division Torneo Clausura": { leagueName: "Liga MX", leagueCountry: "Mexico", flag: "🇲🇽"},
    "English League Championship": { leagueName: "Championship", leagueCountry: "England", flag: "🇬🇧"},
    "Belgian Jupiler League": { leagueName: "First Division A", leagueCountry: "Belgium", flag: "🇧🇪"},
    "Turkish Turkcell Super Lig": { leagueName: "Super Lig", leagueCountry: "Turkey", flag: "🇹🇷"},
    "Austrian T-Mobile Bundesliga": { leagueName: "Bundesliga", leagueCountry: "Austria", flag: "🇦🇹"},
    "Major League Soccer": { leagueName: "MLS", leagueCountry: "USA", flag: "🇺🇸"},
    "Danish SAS-Ligaen": { leagueName: "Superliga", leagueCountry: "Denmark", flag: "🇩🇰"},
    "Scottish Premiership": { leagueName: "Premiership", leagueCountry: "Scotland", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿"},
    "Russian Premier Liga": { leagueName: "Premier League", leagueCountry: "Russia", flag: "🇷🇺"},
    "Argentina Primera Division": { leagueName: "Primera Divison", leagueCountry: "Argentina", flag: "🇦🇷"},
    "Swiss Raiffeisen Super League": { leagueName: "Super League", leagueCountry: "Switzerland", flag: "🇨🇭"},
    "Japanese J League": { leagueName: "J1 League", leagueCountry: "Japan", flag: "🇯🇵"},
    "French Ligue 2": { leagueName: "Ligue 2", leagueCountry: "France", flag: "🇫🇷"},
    "Norwegian Tippeligaen": { leagueName: "Eliteserien", leagueCountry: "Norway", flag: "🇳🇴"},
    "Spanish Segunda Division": { leagueName: "LaLiga 2", leagueCountry: "Spain", flag: "🇪🇸"},
    "Italy Serie B": { leagueName: "Serie B", leagueCountry: "Italy", flag: "🇮🇹"},
    "Greek Super League": { leagueName: "Super League", leagueCountry: "Greece", flag: "🇬🇷"},
    "German 2. Bundesliga": { leagueName: "2. Bundesliga", leagueCountry: "Germany", flag: "🇩🇪"},
    "Swedish Allsvenskan": { leagueName: "Allsvenskan", leagueCountry: "Sweden", flag: "🇸🇪"},
    "English League One": { leagueName: "League One", leagueCountry: "England", flag: "🇬🇧"},
    "United Soccer League": { leagueName: "USL", leagueCountry: "USA", flag: "🇺🇸"},
    "Australian A-League": { leagueName: "A-League", leagueCountry: "Australia", flag: "🇦🇺"},
    "South African ABSA Premier League": { leagueName: "Premier Division", leagueCountry: "South Africa", flag: "🇿🇦"},
    "Chinese Super League": { leagueName: "CSL", leagueCountry: "China", flag: "🇨🇳"},
    "English League Two": { leagueName: "League Two", leagueCountry: "England", flag: "🇬🇧"}}
};
