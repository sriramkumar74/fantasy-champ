import { motion } from "framer-motion";
import { useState } from "react";
import { Trophy, TrendingUp, Medal } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";

const leaderboardData = [
  { rank: 1, team: "Delhi Destroyers", owner: "John D.", matches: 12, wins: 9, points: 1847, nrr: "+1.245" },
  { rank: 2, team: "Mumbai Mavericks", owner: "Sarah K.", matches: 12, wins: 8, points: 1723, nrr: "+0.982" },
  { rank: 3, team: "Kolkata Knights", owner: "Raj P.", matches: 12, wins: 8, points: 1698, nrr: "+0.756" },
  { rank: 4, team: "Chennai Chargers", owner: "Amit S.", matches: 12, wins: 7, points: 1556, nrr: "+0.432" },
  { rank: 5, team: "Bangalore Blasters", owner: "Priya M.", matches: 12, wins: 6, points: 1445, nrr: "+0.198" },
  { rank: 6, team: "Hyderabad Hawks", owner: "Vikram R.", matches: 12, wins: 5, points: 1332, nrr: "-0.125" },
  { rank: 7, team: "Punjab Panthers", owner: "Dev L.", matches: 12, wins: 4, points: 1198, nrr: "-0.456" },
  { rank: 8, team: "Rajasthan Royals", owner: "Neha T.", matches: 12, wins: 3, points: 1045, nrr: "-0.789" },
];

const weeklyPoints = [
  { week: "W1", points: 145 },
  { week: "W2", points: 167 },
  { week: "W3", points: 132 },
  { week: "W4", points: 189 },
  { week: "W5", points: 156 },
  { week: "W6", points: 201 },
  { week: "W7", points: 178 },
  { week: "W8", points: 195 },
  { week: "W9", points: 163 },
  { week: "W10", points: 184 },
  { week: "W11", points: 172 },
  { week: "W12", points: 165 },
];

const maxPoints = Math.max(...weeklyPoints.map((w) => w.points));

const Leaderboard = () => {
  const [tab, setTab] = useState<"table" | "chart">("table");

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy size={16} className="text-warning" />;
    if (rank === 2) return <Medal size={16} className="text-muted-foreground" />;
    if (rank === 3) return <Medal size={16} className="text-warning/60" />;
    return <span className="text-xs tabular-nums font-medium text-muted-foreground w-4 text-center">{rank}</span>;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold">Leaderboard</h1>
            <p className="text-sm text-muted-foreground">Office Premier League • Season 2026</p>
          </div>
          <div className="flex gap-1 bg-secondary rounded-lg p-1">
            <button
              onClick={() => setTab("table")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium fc-transition ${
                tab === "table" ? "bg-card shadow-card" : "text-muted-foreground"
              }`}
            >
              Table
            </button>
            <button
              onClick={() => setTab("chart")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium fc-transition ${
                tab === "chart" ? "bg-card shadow-card" : "text-muted-foreground"
              }`}
            >
              <TrendingUp size={14} className="inline mr-1" /> Performance
            </button>
          </div>
        </div>

        {tab === "table" ? (
          <div className="bg-card rounded-lg shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary text-xs text-muted-foreground">
                    <th className="text-left px-4 py-3 font-medium w-12">#</th>
                    <th className="text-left px-4 py-3 font-medium">Team</th>
                    <th className="text-center px-3 py-3 font-medium hidden sm:table-cell">M</th>
                    <th className="text-center px-3 py-3 font-medium hidden sm:table-cell">W</th>
                    <th className="text-center px-3 py-3 font-medium">Pts</th>
                    <th className="text-right px-4 py-3 font-medium hidden md:table-cell">NRR</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((row, i) => (
                    <motion.tr
                      key={row.rank}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className={`border-t border-border fc-transition hover:bg-secondary/50 ${
                        row.rank <= 3 ? "bg-primary/[0.02]" : ""
                      }`}
                    >
                      <td className="px-4 py-3">{getRankIcon(row.rank)}</td>
                      <td className="px-4 py-3">
                        <div>
                          <span className="font-bold text-sm">{row.team}</span>
                          <p className="text-xs text-muted-foreground">{row.owner}</p>
                        </div>
                      </td>
                      <td className="text-center px-3 py-3 tabular-nums hidden sm:table-cell">{row.matches}</td>
                      <td className="text-center px-3 py-3 tabular-nums hidden sm:table-cell">{row.wins}</td>
                      <td className="text-center px-3 py-3 font-bold tabular-nums">{row.points}</td>
                      <td className={`text-right px-4 py-3 tabular-nums font-mono text-xs hidden md:table-cell ${
                        row.nrr.startsWith("+") ? "text-accent" : "text-destructive"
                      }`}>
                        {row.nrr}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-card rounded-lg shadow-card p-6">
            <h3 className="text-sm font-bold mb-1">Your Points Per Week</h3>
            <p className="text-xs text-muted-foreground mb-6">Delhi Destroyers performance over the season</p>
            <div className="flex items-end gap-2 h-48">
              {weeklyPoints.map((w, i) => (
                <motion.div
                  key={w.week}
                  initial={{ height: 0 }}
                  animate={{ height: `${(w.points / maxPoints) * 100}%` }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="flex-1 relative group"
                >
                  <div className="absolute inset-0 bg-primary/80 rounded-t-sm fc-transition group-hover:bg-primary" />
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold tabular-nums opacity-0 group-hover:opacity-100 fc-transition">
                    {w.points}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              {weeklyPoints.map((w) => (
                <div key={w.week} className="flex-1 text-center text-[10px] text-muted-foreground">
                  {w.week}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Leaderboard;
