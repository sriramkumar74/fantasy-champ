import { useState } from "react";
import { motion } from "framer-motion";
import { GripVertical, Search, Star, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import PlayerCard from "@/components/PlayerCard";
import CountdownTimer from "@/components/CountdownTimer";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const draftUsers = ["You", "Player 2", "Player 3", "Player 4"];

const draftBoard = [
  ["V. Kohli", "R. Sharma", "B. Stokes", "P. Cummins"],
  ["J. Bumrah", "S. Smith", "K. Williamson", "J. Archer"],
  ["R. Jadeja", "T. Head", "—", "—"],
];

const availablePlayers = [
  { name: "Suryakumar Yadav", role: "Batter", team: "MI", price: 12.5, points: 245 },
  { name: "Rashid Khan", role: "Bowler", team: "GT", price: 11.0, points: 220 },
  { name: "Jos Buttler", role: "WK-Batter", team: "RR", price: 10.5, points: 198 },
  { name: "Kagiso Rabada", role: "Bowler", team: "PBKS", price: 9.5, points: 185 },
  { name: "Shubman Gill", role: "Batter", team: "GT", price: 9.0, points: 178 },
  { name: "Kuldeep Yadav", role: "Bowler", team: "DC", price: 8.5, points: 165 },
  { name: "Devon Conway", role: "Batter", team: "CSK", price: 8.0, points: 155 },
  { name: "Marcus Stoinis", role: "All-Rounder", team: "LSG", price: 7.5, points: 148 },
];

const starPriority = [
  { name: "Suryakumar Yadav", role: "Batter", team: "MI", price: 12.5 },
  { name: "Rashid Khan", role: "Bowler", team: "GT", price: 11.0 },
  { name: "Jos Buttler", role: "WK-Batter", team: "RR", price: 10.5 },
];

const DraftRoom = () => {
  const [search, setSearch] = useState("");
  const currentPick = { round: 3, user: 0 }; // "You"

  const filtered = availablePlayers.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Draft Header */}
      <div className="bg-card shadow-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Badge variant="default">Round 3</Badge>
            <div className="text-sm">
              <span className="text-muted-foreground">Current Turn: </span>
              <span className="font-bold text-accent">Your Pick</span>
            </div>
          </div>
          <CountdownTimer targetSeconds={90} size="lg" />
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-secondary">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 90, ease: "linear" }}
          />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr_320px] gap-4">
          {/* Left - Star Priority */}
          <div className="hidden lg:block">
            <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5">
              <Star size={14} className="text-warning" /> Star Priority
            </h3>
            <div className="space-y-2">
              {starPriority.map((player, i) => (
                <motion.div
                  key={player.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card rounded-lg shadow-card p-3 flex items-center gap-2"
                >
                  <GripVertical size={14} className="text-muted-foreground cursor-grab" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate">{player.name}</p>
                    <p className="text-[10px] text-muted-foreground">{player.role} • {player.team}</p>
                  </div>
                  <span className="text-xs font-mono tabular-nums">${player.price}M</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Center - Draft Board */}
          <div className="overflow-x-auto">
            <h3 className="text-sm font-bold mb-3">Draft Board</h3>
            <div className="bg-card rounded-lg shadow-card overflow-hidden min-w-[500px]">
              {/* Header */}
              <div className="grid grid-cols-4 bg-secondary">
                {draftUsers.map((user, i) => (
                  <div
                    key={user}
                    className={`px-3 py-2 text-xs font-bold text-center ${
                      i === currentPick.user ? "bg-primary text-primary-foreground" : ""
                    }`}
                  >
                    {user}
                  </div>
                ))}
              </div>
              {/* Rounds */}
              {draftBoard.map((round, ri) => (
                <div key={ri} className="grid grid-cols-4 border-t border-border">
                  {round.map((pick, ci) => {
                    const isCurrent = ri === currentPick.round - 1 && ci === currentPick.user;
                    const isEmpty = pick === "—";
                    return (
                      <div
                        key={ci}
                        className={`px-3 py-3 text-xs text-center fc-transition ${
                          isCurrent
                            ? "ring-2 ring-primary bg-primary/5 animate-pulse-ring font-bold"
                            : isEmpty
                            ? "text-muted-foreground"
                            : ""
                        }`}
                      >
                        {isEmpty ? (
                          <span className="text-muted-foreground/50">—</span>
                        ) : (
                          <span className="font-medium">{pick}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Right - Available Players */}
          <div>
            <h3 className="text-sm font-bold mb-3">Available Players</h3>
            <div className="relative mb-3">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search players..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 text-sm bg-card shadow-card border-0 h-9"
              />
            </div>
            <div className="space-y-2 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
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

export default DraftRoom;
