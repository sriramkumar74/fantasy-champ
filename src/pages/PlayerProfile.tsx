import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, Users, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const player = {
  name: "Virat Kohli",
  team: "Royal Challengers Bangalore",
  role: "Batter",
  country: "India",
  price: 15,
  totalPoints: 312,
  matchesPlayed: 12,
  average: 52.3,
  strikeRate: 148.6,
  selectionPct: 78,
};

const pointsHistory = [
  { round: "R1", points: 28 },
  { round: "R2", points: 45 },
  { round: "R3", points: 12 },
  { round: "R4", points: 67 },
  { round: "R5", points: 34 },
  { round: "R6", points: 52 },
  { round: "R7", points: 18 },
  { round: "R8", points: 56 },
];

const priceHistory = [
  { round: "R1", price: 14 },
  { round: "R2", price: 14.5 },
  { round: "R3", price: 14.2 },
  { round: "R4", price: 15 },
  { round: "R5", price: 15 },
  { round: "R6", price: 15.5 },
  { round: "R7", price: 15.2 },
  { round: "R8", price: 15 },
];

const maxPts = Math.max(...pointsHistory.map((p) => p.points));

const PlayerProfile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4 gap-1 text-xs">
          <ArrowLeft size={14} /> Back
        </Button>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {/* Player Header */}
          <div className="bg-card rounded-lg shadow-card p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                VK
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-xl font-bold">{player.name}</h1>
                  <Badge variant="default" className="text-[10px]">{player.role}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{player.team} • {player.country}</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                  {[
                    { label: "Price", value: `$${player.price}M`, icon: DollarSign },
                    { label: "Points", value: player.totalPoints, icon: TrendingUp },
                    { label: "Avg", value: player.average },
                    { label: "SR", value: player.strikeRate },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-secondary rounded-md p-3">
                      <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                      <p className="text-lg font-bold tabular-nums">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Points History */}
            <div className="bg-card rounded-lg shadow-card p-6">
              <h3 className="text-sm font-bold mb-1">Points History</h3>
              <p className="text-xs text-muted-foreground mb-4">Performance per round</p>
              <div className="flex items-end gap-2 h-40">
                {pointsHistory.map((p, i) => (
                  <motion.div
                    key={p.round}
                    initial={{ height: 0 }}
                    animate={{ height: `${(p.points / maxPts) * 100}%` }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="flex-1 relative group"
                  >
                    <div className="absolute inset-0 bg-primary/80 rounded-t-sm fc-transition group-hover:bg-primary" />
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-bold tabular-nums opacity-0 group-hover:opacity-100 fc-transition">
                      {p.points}
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                {pointsHistory.map((p) => (
                  <div key={p.round} className="flex-1 text-center text-[10px] text-muted-foreground">{p.round}</div>
                ))}
              </div>
            </div>

            {/* Selection & Price */}
            <div className="space-y-6">
              {/* Selection % */}
              <div className="bg-card rounded-lg shadow-card p-6">
                <h3 className="text-sm font-bold mb-1 flex items-center gap-1.5">
                  <Users size={14} className="text-primary" /> League Selection
                </h3>
                <p className="text-xs text-muted-foreground mb-4">Selected by {player.selectionPct}% of teams</p>
                <div className="w-full bg-secondary rounded-full h-4 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${player.selectionPct}%` }}
                    transition={{ duration: 0.6 }}
                    className="h-full bg-accent rounded-full"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">{player.selectionPct}% selection rate across all leagues</p>
              </div>

              {/* Price History */}
              <div className="bg-card rounded-lg shadow-card p-6">
                <h3 className="text-sm font-bold mb-1">Price Trend</h3>
                <p className="text-xs text-muted-foreground mb-4">Value over time</p>
                <div className="flex items-end gap-2 h-24">
                  {priceHistory.map((p, i) => (
                    <motion.div
                      key={p.round}
                      initial={{ height: 0 }}
                      animate={{ height: `${((p.price - 13) / 3) * 100}%` }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                      className="flex-1 relative group"
                    >
                      <div className="absolute inset-0 bg-accent/80 rounded-t-sm fc-transition group-hover:bg-accent" />
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-bold tabular-nums opacity-0 group-hover:opacity-100 fc-transition">
                        ${p.price}M
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  {priceHistory.map((p) => (
                    <div key={p.round} className="flex-1 text-center text-[10px] text-muted-foreground">{p.round}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default PlayerProfile;
