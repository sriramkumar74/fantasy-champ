export interface MatchInfo {
  id: string;
  label: string;
  venue: string;
  date: string;
  time: string;
  teamA: { short: string; name: string; score?: string; overs?: string };
  teamB: { short: string; name: string; score?: string; overs?: string };
  result?: string;
  status: "completed" | "upcoming" | "live";
  pitch: string;
  supports: string;
  headToHead: string;
}

export interface SquadPlayer {
  name: string;
  role: "Batter" | "Bowler" | "Wicket Keeper" | "All Rounder";
  country: string;
}

export interface StatLeader {
  name: string;
  team: string;
  matches: number;
  innings: number;
  value: number;
  average: string;
}

export interface TournamentDetail {
  slug: string;
  name: string;
  format: string;
  country: string;
  startDate: string;
  status: "upcoming" | "live" | "completed";
  matches: MatchInfo[];
  squads: { team: string; short: string; players: SquadPlayer[] }[];
  stats: {
    batting: { key: string; label: string; leaders: StatLeader[] }[];
    bowling: { key: string; label: string; leaders: StatLeader[] }[];
  };
}

const indiaSquad: SquadPlayer[] = [
  { name: "Shreyas Iyer", role: "Batter", country: "India" },
  { name: "Tilak Varma", role: "Batter", country: "India" },
  { name: "Nitish K Reddy", role: "All Rounder", country: "India" },
  { name: "Vaibhav Sooryavanshi", role: "Batter", country: "India" },
  { name: "Arshdeep Singh", role: "Bowler", country: "India" },
  { name: "Yash Thakur", role: "Bowler", country: "India" },
  { name: "Jasprit Bumrah", role: "Bowler", country: "India" },
  { name: "Varun Chakravarthy", role: "Bowler", country: "India" },
  { name: "Harshit Rana", role: "Bowler", country: "India" },
  { name: "Sanju Samson", role: "Wicket Keeper", country: "India" },
  { name: "Ishan Kishan", role: "Wicket Keeper", country: "India" },
  { name: "Abhishek Sharma", role: "All Rounder", country: "India" },
];

const afgSquad: SquadPlayer[] = [
  { name: "Azmatullah Omarzai", role: "All Rounder", country: "Afghanistan" },
  { name: "Mohammad Nabi", role: "All Rounder", country: "Afghanistan" },
  { name: "Sediqullah Atal", role: "Batter", country: "Afghanistan" },
  { name: "Ibrahim Zadran", role: "Batter", country: "Afghanistan" },
  { name: "Darwish Rasooli", role: "Batter", country: "Afghanistan" },
  { name: "Rashid Khan", role: "Bowler", country: "Afghanistan" },
  { name: "Mujeeb Ur Rahman", role: "Bowler", country: "Afghanistan" },
  { name: "Naveen-ul-Haq", role: "Bowler", country: "Afghanistan" },
  { name: "Noor Ahmad", role: "Bowler", country: "Afghanistan" },
  { name: "Gulbadin Naib", role: "All Rounder", country: "Afghanistan" },
  { name: "Rahmanullah Gurbaz", role: "Wicket Keeper", country: "Afghanistan" },
];

const mostRuns: StatLeader[] = [
  { name: "Abhishek Sharma", team: "IND", matches: 1, innings: 1, value: 82, average: "82" },
  { name: "Azmatullah Omarzai", team: "AFG", matches: 1, innings: 1, value: 64, average: "-" },
  { name: "Ishan Kishan", team: "IND", matches: 1, innings: 1, value: 42, average: "42" },
  { name: "Mohammad Nabi", team: "AFG", matches: 1, innings: 1, value: 33, average: "33" },
  { name: "Sediqullah Atal", team: "AFG", matches: 1, innings: 1, value: 13, average: "13" },
  { name: "Ibrahim Zadran", team: "AFG", matches: 1, innings: 1, value: 11, average: "11" },
  { name: "Sanju Samson", team: "IND", matches: 1, innings: 1, value: 10, average: "10" },
  { name: "Mujeeb Ur Rahman", team: "AFG", matches: 1, innings: 1, value: 9, average: "-" },
  { name: "Shreyas Iyer", team: "IND", matches: 1, innings: 1, value: 8, average: "-" },
  { name: "Tilak Varma", team: "IND", matches: 1, innings: 1, value: 3, average: "-" },
];

const mostWickets: StatLeader[] = [
  { name: "Jasprit Bumrah", team: "IND", matches: 1, innings: 1, value: 4, average: "6.2" },
  { name: "Rashid Khan", team: "AFG", matches: 1, innings: 1, value: 3, average: "9.0" },
  { name: "Varun Chakravarthy", team: "IND", matches: 1, innings: 1, value: 2, average: "12.5" },
  { name: "Noor Ahmad", team: "AFG", matches: 1, innings: 1, value: 2, average: "14.0" },
  { name: "Arshdeep Singh", team: "IND", matches: 1, innings: 1, value: 1, average: "28.0" },
];

const strikeRates: StatLeader[] = [
  { name: "Abhishek Sharma", team: "IND", matches: 1, innings: 1, value: 205, average: "82" },
  { name: "Ishan Kishan", team: "IND", matches: 1, innings: 1, value: 168, average: "42" },
  { name: "Azmatullah Omarzai", team: "AFG", matches: 1, innings: 1, value: 152, average: "64" },
];

const baseStats = {
  batting: [
    { key: "runs", label: "Most Runs", leaders: mostRuns },
    { key: "sr", label: "Best Batting Strike Rate", leaders: strikeRates },
    { key: "hs", label: "Highest Scores", leaders: mostRuns.slice(0, 5) },
  ],
  bowling: [
    { key: "wkts", label: "Most Wickets", leaders: mostWickets },
    { key: "eco", label: "Best Bowling Economy", leaders: mostWickets.slice(0, 3) },
  ],
};

export const tournamentDetails: TournamentDetail[] = [
  {
    slug: "indian-premier-league-2026",
    name: "Indian Premier League 2026",
    format: "T20",
    country: "India",
    startDate: "Mar 22, 2026",
    status: "live",
    matches: [
      {
        id: "m1",
        label: "1st Match",
        venue: "Wankhede Stadium, Mumbai",
        date: "Mar 22, 2026",
        time: "07:30 PM IST",
        teamA: { short: "MI", name: "Mumbai Indians", score: "189/6", overs: "20.0 over" },
        teamB: { short: "CSK", name: "Chennai Super Kings", score: "172/9", overs: "20.0 over" },
        result: "MI won by 17 runs",
        status: "completed",
        pitch: "Balanced",
        supports: "Pacers",
        headToHead: "MI 3 : 2 CSK",
      },
      {
        id: "m2",
        label: "2nd Match",
        venue: "M. Chinnaswamy Stadium, Bengaluru",
        date: "Mar 24, 2026",
        time: "07:30 PM IST",
        teamA: { short: "RCB", name: "Royal Challengers Bengaluru" },
        teamB: { short: "KKR", name: "Kolkata Knight Riders" },
        status: "upcoming",
        pitch: "Batting friendly",
        supports: "Spinners",
        headToHead: "RCB 2 : 3 KKR",
      },
    ],
    squads: [
      { team: "Mumbai Indians", short: "MI", players: indiaSquad.slice(0, 8) },
      { team: "Chennai Super Kings", short: "CSK", players: indiaSquad.slice(4) },
    ],
    stats: baseStats,
  },
  {
    slug: "icc-champions-trophy",
    name: "ICC Champions Trophy",
    format: "ODI",
    country: "Pakistan",
    startDate: "Apr 10, 2026",
    status: "upcoming",
    matches: [
      {
        id: "m1",
        label: "1st Match",
        venue: "Gaddafi Stadium, Lahore",
        date: "Apr 10, 2026",
        time: "02:30 PM IST",
        teamA: { short: "IND", name: "India" },
        teamB: { short: "AFG", name: "Afghanistan" },
        status: "upcoming",
        pitch: "Balanced",
        supports: "Pacers",
        headToHead: "IND 1 : 0 AFG",
      },
      {
        id: "m2",
        label: "2nd Match",
        venue: "National Stadium, Karachi",
        date: "Apr 13, 2026",
        time: "02:30 PM IST",
        teamA: { short: "AFG", name: "Afghanistan" },
        teamB: { short: "IND", name: "India" },
        status: "upcoming",
        pitch: "Slow",
        supports: "Spinners",
        headToHead: "IND 1 : 0 AFG",
      },
    ],
    squads: [
      { team: "India", short: "IND", players: indiaSquad },
      { team: "Afghanistan", short: "AFG", players: afgSquad },
    ],
    stats: baseStats,
  },
  {
    slug: "big-bash-league",
    name: "Big Bash League",
    format: "T20",
    country: "Australia",
    startDate: "May 1, 2026",
    status: "upcoming",
    matches: [
      {
        id: "m1",
        label: "1st Match",
        venue: "MCG, Melbourne",
        date: "May 1, 2026",
        time: "01:45 PM IST",
        teamA: { short: "MLS", name: "Melbourne Stars" },
        teamB: { short: "SYS", name: "Sydney Sixers" },
        status: "upcoming",
        pitch: "Bouncy",
        supports: "Pacers",
        headToHead: "MLS 2 : 2 SYS",
      },
    ],
    squads: [
      { team: "Melbourne Stars", short: "MLS", players: indiaSquad.slice(0, 6) },
      { team: "Sydney Sixers", short: "SYS", players: afgSquad.slice(0, 6) },
    ],
    stats: baseStats,
  },
];

export const slugify = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const getTournament = (slug?: string) =>
  tournamentDetails.find((t) => t.slug === slug);
