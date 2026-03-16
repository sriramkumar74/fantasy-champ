import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, ArrowDown, ArrowUp, Shield, Search, AlertTriangle } from "lucide-react";
import Navbar from "@/components/Navbar";
import CountdownTimer from "@/components/CountdownTimer";
import PlayerCard from "@/components/PlayerCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const currentTeam = [
  { name: "V. Kohli", role: "Batter", team: "RCB", price: 15, points: 312 },
  { name: "R. Sharma", role: "Batter", team: "MI", price: 14, points: 287 },
  { name: "S. Gill", role: "Batter", team: "GT", price: 9, points: 178 },
  { name: "B. Stokes", role: "All-Rounder", team: "CSK", price: 13, points: 256 },
  { name: "R. Jadeja", role: "All-Rounder", team: "CSK", price: 10, points: 198 },
  { name: "R. Pant", role: "WK", team: "DC", price: 12, points: 210 },
  { name: "J. Bumrah", role: "Bowler", team: "MI", price: 14, points: 275 },
  { name: "R. Khan", role: "Bowler", team: "GT", price: 11, points: 220 },
  { name: "K. Yadav", role: "Bowler", team: "DC", price: 8.5, points: 165 },
];

const availablePlayers = [
  { name: "M. Stoinis", role: "All-Rounder", team: "LSG", price: 7.5, points: 148 },
  { name: "T. Boult", role: "Bowler", team: "RR", price: 7, points: 142 },
  { name: "D. Conway", role: "Batter", team: "CSK", price: 8, points: 155 },
  { name: "I. Kishan", role: "WK-Batter", team: "MI", price: 6.5, points: 130 },
  { name: "Y. Chahal", role: "Bowler", team: "RR", price: 7.5, points: 138 },
];

const priorityOrder = [
  { position: 1, user: "You", used: false },
  { position: 2, user: "Sarah K.", used: true },
  { position: 3, user: "Raj P.", used: false },
  { position: 4, user: "Amit S.", used: false },
  { position: 5, user: "Priya M.", used: false },
  { position: 6, user: "Dev L.", used: false },
];

const WeeklyModification = () => {
  const [search, setSearch] = useState("");
  const [droppingPlayer, setDroppingPlayer] = useState<string | null>(null);

  const filtered = availablePlayers.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header Banner */}
      <div className="bg-card shadow-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-bold">Weekly Transfer Window</h1>
            <p className="text-xs text-muted-foreground">Round 6 • IPL 2026</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-warning/10 rounded-md px-3 py-1.5">
              <Clock size={14} className="text-warning" />
              <span className="text-xs font-medium">Closes in</span>
              <CountdownTimer targetSeconds={43200} />
            </div>
            <div className="text-right">
              <p className="text-[10px] text-muted-foreground">Your Priority</p>
              <Badge variant="default" className="text-xs">#1</Badge>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid lg:grid-cols-[1fr_350px] gap-6">
          {/* Current Team */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold flex items-center gap-1.5">
                <Shield size={14} className="text-primary" /> Your Team
              </h2>
              <p className="text-xs text-muted-foreground">Tap a player to drop</p>
            </div>

            <div className="space-y-2">
              {currentTeam.map((player, i) => (
                <motion.div
                  key={player.name}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => setDroppingPlayer(droppingPlayer === player.name ? null : player.name)}
                  className={`bg-card rounded-lg shadow-card p-3 flex items-center gap-3 cursor-pointer fc-transition ${
                    droppingPlayer === player.name ? "ring-2 ring-destructive" : "hover:shadow-card-hover"
                  }`}
                >
                  <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-sm font-bold text-muted-foreground">
                    {player.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate">{player.name}</p>
                    <p className="text-xs text-muted-foreground">{player.role} • {player.team}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-mono tabular-nums">{player.points} pts</p>
                    <p className="text-[10px] text-muted-foreground">${player.price}M</p>
                  </div>
                  {droppingPlayer === player.name && (
                    <Button size="sm" variant="destructive" className="text-xs gap-1" onClick={(e) => { e.stopPropagation(); }}>
                      <ArrowDown size={12} /> Drop
                    </Button>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Priority Order */}
            <div className="mt-6">
              <h3 className="text-sm font-bold mb-3">Round Robin Priority</h3>
              <div className="flex gap-2 flex-wrap">
                {priorityOrder.map((p) => (
                  <div
                    key={p.position}
                    className={`px-3 py-2 rounded-lg text-xs font-medium ${
                      p.user === "You"
                        ? "bg-primary text-primary-foreground"
                        : p.used
                        ? "bg-muted text-muted-foreground line-through"
                        : "bg-card shadow-card"
                    }`}
                  >
                    #{p.position} {p.user}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Available Players */}
          <div>
            <h2 className="text-sm font-bold mb-3 flex items-center gap-1.5">
              <ArrowUp size={14} className="text-accent" /> Available Players
            </h2>
            <div className="relative mb-3">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 text-sm bg-card shadow-card border-0 h-9"
              />
            </div>

            <div className="bg-warning/10 rounded-md px-3 py-2 mb-3 flex items-start gap-2">
              <AlertTriangle size={14} className="text-warning mt-0.5" />
              <p className="text-[11px] text-muted-foreground">
                Dropped players are locked for 1 week and become available during the next weekly modification.
              </p>
            </div>

            <div className="space-y-2">
              {filtered.map((player, i) => (
                <motion.div
                  key={player.name}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <PlayerCard {...player} onAdd={() => {}} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WeeklyModification;
