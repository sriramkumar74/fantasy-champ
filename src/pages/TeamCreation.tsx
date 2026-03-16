import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ArrowUpDown, X, Star, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import PlayerCard from "@/components/PlayerCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TeamSlot {
  role: string;
  player: { name: string; team: string; price: number } | null;
  isCaptain?: boolean;
  isStar?: boolean;
}

const initialSlots: TeamSlot[] = [
  { role: "Batter", player: { name: "V. Kohli", team: "RCB", price: 15 }, isCaptain: true },
  { role: "Batter", player: { name: "R. Sharma", team: "MI", price: 14 } },
  { role: "Batter", player: null },
  { role: "All-Rounder", player: { name: "B. Stokes", team: "CSK", price: 13 }, isStar: true },
  { role: "All-Rounder", player: null },
  { role: "Wicketkeeper", player: { name: "R. Pant", team: "DC", price: 12 } },
  { role: "Bowler", player: { name: "J. Bumrah", team: "MI", price: 14 } },
  { role: "Bowler", player: null },
  { role: "Bowler", player: null },
  { role: "Emergency", player: null },
  { role: "Emergency", player: null },
];

const marketPlayers = [
  { name: "Suryakumar Yadav", role: "Batter", team: "MI", price: 12.5, points: 245 },
  { name: "Rashid Khan", role: "Bowler", team: "GT", price: 11.0, points: 220 },
  { name: "Jos Buttler", role: "WK-Batter", team: "RR", price: 10.5, points: 198 },
  { name: "Kagiso Rabada", role: "Bowler", team: "PBKS", price: 9.5, points: 185 },
  { name: "Shubman Gill", role: "Batter", team: "GT", price: 9.0, points: 178 },
  { name: "Kuldeep Yadav", role: "Bowler", team: "DC", price: 8.5, points: 165 },
  { name: "Devon Conway", role: "Batter", team: "CSK", price: 8.0, points: 155 },
  { name: "Marcus Stoinis", role: "All-Rounder", team: "LSG", price: 7.5, points: 148 },
  { name: "Trent Boult", role: "Bowler", team: "RR", price: 7.0, points: 142 },
  { name: "Ishan Kishan", role: "WK-Batter", team: "MI", price: 6.5, points: 130 },
];

const TeamCreation = () => {
  const [slots] = useState(initialSlots);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const filtered = marketPlayers.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "All" || p.role.includes(roleFilter);
    return matchSearch && matchRole;
  });

  const filledCount = slots.filter((s) => s.player).length;
  const budget = 100 - slots.reduce((acc, s) => acc + (s.player?.price || 0), 0);

  const groupedSlots: Record<string, TeamSlot[]> = {};
  slots.forEach((s) => {
    if (!groupedSlots[s.role]) groupedSlots[s.role] = [];
    groupedSlots[s.role].push(s);
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold">Create Your Team</h1>
            <p className="text-sm text-muted-foreground">Draft Preparation • IPL 2026</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Budget</p>
              <p className="text-lg font-bold tabular-nums">${budget.toFixed(1)}M</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Players</p>
              <p className="text-lg font-bold tabular-nums">{filledCount}/11</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-6">
          {/* Your Team */}
          <div>
            <h2 className="text-sm font-bold mb-3 flex items-center gap-1.5">
              <Shield size={14} className="text-primary" /> Your Team
            </h2>
            <div className="space-y-4">
              {Object.entries(groupedSlots).map(([role, roleSlots]) => (
                <div key={role}>
                  <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    {role}s
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {roleSlots.map((slot, i) => (
                      <motion.div
                        key={`${role}-${i}`}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`rounded-lg p-3 flex items-center gap-3 ${
                          slot.player
                            ? "bg-card shadow-card"
                            : "border border-dashed border-border bg-secondary/30"
                        }`}
                      >
                        {slot.player ? (
                          <>
                            <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-sm font-bold text-muted-foreground">
                              {slot.player.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-sm font-bold truncate">{slot.player.name}</span>
                                {slot.isCaptain && (
                                  <Badge variant="default" className="text-[10px] px-1 py-0">C</Badge>
                                )}
                                {slot.isStar && (
                                  <Star size={12} className="text-warning fill-warning" />
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">{slot.player.team} • ${slot.player.price}M</p>
                            </div>
                            <button className="p-1 text-muted-foreground hover:text-destructive fc-transition">
                              <X size={14} />
                            </button>
                          </>
                        ) : (
                          <div className="flex-1 text-center py-1">
                            <p className="text-xs text-muted-foreground">Empty {role} Slot</p>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Player Market */}
          <div>
            <h2 className="text-sm font-bold mb-3">Player Market</h2>
            <div className="flex gap-2 mb-3">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 text-sm bg-card shadow-card border-0 h-9"
                />
              </div>
            </div>
            <div className="flex gap-1.5 mb-3 flex-wrap">
              {["All", "Batter", "Bowler", "All-Rounder", "WK"].map((r) => (
                <button
                  key={r}
                  onClick={() => setRoleFilter(r)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium fc-transition ${
                    roleFilter === r
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            <div className="space-y-2 max-h-[calc(100vh-320px)] overflow-y-auto pr-1">
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

export default TeamCreation;
