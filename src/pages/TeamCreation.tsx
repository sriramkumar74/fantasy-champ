import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Shield, ArrowLeftRight, Check, Star, X, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface Player {
  name: string;
  role: string;
  team: string;
  iccRank: number;
  points: number;
  imageInitial?: string;
}

const totalWeeks = 14;

const weeklySquads: Record<string, { mainXI: Player[]; bench: Player[] }> = {
  week1: {
    mainXI: [
      { name: "V. Kohli", role: "Batter", team: "RCB", iccRank: 2, points: 312 },
      { name: "R. Sharma", role: "Batter", team: "MI", iccRank: 5, points: 287 },
      { name: "S. Gill", role: "Batter", team: "GT", iccRank: 8, points: 178 },
      { name: "B. Stokes", role: "All-Rounder", team: "CSK", iccRank: 3, points: 256 },
      { name: "R. Jadeja", role: "All-Rounder", team: "CSK", iccRank: 12, points: 198 },
      { name: "R. Pant", role: "WK", team: "DC", iccRank: 15, points: 210 },
      { name: "J. Bumrah", role: "Bowler", team: "MI", iccRank: 1, points: 275 },
      { name: "R. Khan", role: "Bowler", team: "GT", iccRank: 4, points: 220 },
      { name: "K. Yadav", role: "Bowler", team: "DC", iccRank: 9, points: 165 },
      { name: "M. Shami", role: "Bowler", team: "GT", iccRank: 7, points: 190 },
      { name: "Y. Chahal", role: "Bowler", team: "RR", iccRank: 11, points: 138 },
    ],
    bench: [
      { name: "D. Conway", role: "Batter", team: "CSK", iccRank: 14, points: 155 },
      { name: "M. Stoinis", role: "All-Rounder", team: "LSG", iccRank: 20, points: 148 },
      { name: "I. Kishan", role: "WK-Batter", team: "MI", iccRank: 25, points: 130 },
    ],
  },
  week2: {
    mainXI: [
      { name: "V. Kohli", role: "Batter", team: "RCB", iccRank: 2, points: 312 },
      { name: "R. Sharma", role: "Batter", team: "MI", iccRank: 5, points: 287 },
      { name: "D. Conway", role: "Batter", team: "CSK", iccRank: 14, points: 155 },
      { name: "B. Stokes", role: "All-Rounder", team: "CSK", iccRank: 3, points: 256 },
      { name: "M. Stoinis", role: "All-Rounder", team: "LSG", iccRank: 20, points: 148 },
      { name: "R. Pant", role: "WK", team: "DC", iccRank: 15, points: 210 },
      { name: "J. Bumrah", role: "Bowler", team: "MI", iccRank: 1, points: 275 },
      { name: "R. Khan", role: "Bowler", team: "GT", iccRank: 4, points: 220 },
      { name: "K. Yadav", role: "Bowler", team: "DC", iccRank: 9, points: 165 },
      { name: "M. Shami", role: "Bowler", team: "GT", iccRank: 7, points: 190 },
      { name: "Y. Chahal", role: "Bowler", team: "RR", iccRank: 11, points: 138 },
    ],
    bench: [
      { name: "S. Gill", role: "Batter", team: "GT", iccRank: 8, points: 178 },
      { name: "R. Jadeja", role: "All-Rounder", team: "CSK", iccRank: 12, points: 198 },
      { name: "I. Kishan", role: "WK-Batter", team: "MI", iccRank: 25, points: 130 },
    ],
  },
};

// Available players from transfer pool
const transferPool: Player[] = [
  { name: "Suryakumar Yadav", role: "Batter", team: "MI", iccRank: 1, points: 245 },
  { name: "Jos Buttler", role: "WK-Batter", team: "RR", iccRank: 6, points: 198 },
  { name: "Kagiso Rabada", role: "Bowler", team: "PBKS", iccRank: 3, points: 185 },
  { name: "T. Boult", role: "Bowler", team: "RR", iccRank: 10, points: 142 },
  { name: "Pat Cummins", role: "Bowler", team: "SRH", iccRank: 2, points: 210 },
  { name: "G. Maxwell", role: "All-Rounder", team: "RCB", iccRank: 18, points: 160 },
  { name: "K.L. Rahul", role: "WK-Batter", team: "LSG", iccRank: 13, points: 175 },
  { name: "H. Pandya", role: "All-Rounder", team: "MI", iccRank: 16, points: 168 },
];

const TeamCreation = () => {
  const [activeWeek, setActiveWeek] = useState("week1");
  const [search, setSearch] = useState("");
  const [selectedForSwap, setSelectedForSwap] = useState<string | null>(null);
  const [preChosenPlayers, setPreChosenPlayers] = useState<Player[]>([]);

  const currentSquad = weeklySquads[activeWeek] || weeklySquads.week1;
  const isCurrentWeek = activeWeek === "week1";

  const filteredPool = transferPool.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handlePreChoose = (player: Player) => {
    if (preChosenPlayers.find((p) => p.name === player.name)) {
      setPreChosenPlayers(preChosenPlayers.filter((p) => p.name !== player.name));
    } else {
      setPreChosenPlayers([...preChosenPlayers, player]);
    }
  };

  const handleSwapSelect = (playerName: string) => {
    setSelectedForSwap(selectedForSwap === playerName ? null : playerName);
  };

  const roleGroups = (players: Player[]) => {
    const groups: Record<string, Player[]> = {};
    players.forEach((p) => {
      const key = p.role.includes("WK") ? "Wicketkeepers" : `${p.role}s`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(p);
    });
    return groups;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-xl font-bold">Manage Your Team</h1>
            <p className="text-sm text-muted-foreground">Weekly XI Assignment • IPL 2026</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Players</p>
              <p className="text-lg font-bold tabular-nums">{currentSquad.mainXI.length}/11</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Bench</p>
              <p className="text-lg font-bold tabular-nums">{currentSquad.bench.length}</p>
            </div>
          </div>
        </div>

        {/* Weekly Tabs */}
        <Tabs value={activeWeek} onValueChange={setActiveWeek} className="mb-6">
          <TabsList className="h-auto flex-wrap gap-1 bg-secondary/50 p-1.5">
            {Array.from({ length: totalWeeks }, (_, i) => {
              const weekKey = `week${i + 1}`;
              const hasData = weeklySquads[weekKey];
              return (
                <TabsTrigger
                  key={weekKey}
                  value={weekKey}
                  className="text-xs px-3 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Wk {i + 1}
                  {hasData && <Check size={10} className="ml-1" />}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

        <div className="grid lg:grid-cols-[1fr_380px] gap-6">
          {/* Main XI & Bench */}
          <div>
            <h2 className="text-sm font-bold mb-3 flex items-center gap-1.5">
              <Shield size={14} className="text-primary" /> Main XI — {activeWeek.replace("week", "Week ")}
            </h2>

            {currentSquad ? (
              <div className="space-y-4">
                {Object.entries(roleGroups(currentSquad.mainXI)).map(([group, players]) => (
                  <div key={group}>
                    <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                      {group}
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {players.map((player, i) => (
                        <motion.div
                          key={player.name}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.04 }}
                          onClick={() => isCurrentWeek && handleSwapSelect(player.name)}
                          className={`rounded-lg p-3 flex items-center gap-3 cursor-pointer fc-transition ${
                            selectedForSwap === player.name
                              ? "bg-card shadow-card ring-2 ring-primary"
                              : "bg-card shadow-card hover:shadow-card-hover"
                          }`}
                        >
                          <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-sm font-bold text-muted-foreground">
                            {player.name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold truncate">{player.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {player.role} • {player.team}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-mono tabular-nums">{player.points} pts</p>
                            <p className="text-[10px] text-muted-foreground">ICC #{player.iccRank}</p>
                          </div>
                          {isCurrentWeek && (
                            <ArrowLeftRight size={14} className="text-muted-foreground" />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Bench */}
                <div>
                  <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Users size={12} /> Bench / Emergency
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {currentSquad.bench.map((player, i) => (
                      <motion.div
                        key={player.name}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                        onClick={() => isCurrentWeek && handleSwapSelect(player.name)}
                        className={`rounded-lg p-3 flex items-center gap-3 cursor-pointer fc-transition border border-dashed ${
                          selectedForSwap === player.name
                            ? "border-primary bg-primary/5"
                            : "border-border bg-secondary/30 hover:bg-secondary/50"
                        }`}
                      >
                        <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-sm font-bold text-muted-foreground">
                          {player.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold truncate">{player.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {player.role} • {player.team}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-mono tabular-nums">{player.points} pts</p>
                          <p className="text-[10px] text-muted-foreground">ICC #{player.iccRank}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-card rounded-lg shadow-card p-8 text-center">
                <p className="text-sm text-muted-foreground">No squad set for this week yet.</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Squad will be assigned during the weekly modification window.
                </p>
              </div>
            )}
          </div>

          {/* Right Panel — Transfer Pool & Pre-Chosen */}
          <div className="space-y-5">
            {/* Pre-Chosen for Next Week */}
            {preChosenPlayers.length > 0 && (
              <div>
                <h2 className="text-sm font-bold mb-3 flex items-center gap-1.5">
                  <Star size={14} className="text-warning fill-warning" /> Pre-Chosen (Next Week)
                </h2>
                <div className="space-y-2">
                  {preChosenPlayers.map((player) => (
                    <div
                      key={player.name}
                      className="bg-warning/10 rounded-lg p-3 flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-warning/20 flex items-center justify-center text-xs font-bold text-foreground">
                        {player.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">{player.name}</p>
                        <p className="text-xs text-muted-foreground">{player.role} • ICC #{player.iccRank}</p>
                      </div>
                      <button
                        onClick={() => handlePreChoose(player)}
                        className="p-1 text-muted-foreground hover:text-destructive fc-transition"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Swap Action */}
            {selectedForSwap && (
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                <p className="text-xs font-medium text-primary mb-1">Swap Selected</p>
                <p className="text-sm font-bold">{selectedForSwap}</p>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Choose a player from the pool below to swap, or pre-choose for next week.
                </p>
              </div>
            )}

            {/* Available Players */}
            <div>
              <h2 className="text-sm font-bold mb-3">Available Players (ICC Ranked)</h2>
              <div className="relative mb-3">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search players..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 text-sm bg-card shadow-card border-0 h-9"
                />
              </div>
              <div className="space-y-2 max-h-[calc(100vh-400px)] overflow-y-auto pr-1">
                {filteredPool.map((player, i) => {
                  const isPreChosen = preChosenPlayers.find((p) => p.name === player.name);
                  return (
                    <motion.div
                      key={player.name}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="bg-card p-3 rounded-lg shadow-card flex items-center gap-3"
                    >
                      <div className="relative flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                          <span className="text-sm font-bold text-muted-foreground">
                            {player.name.charAt(0)}
                          </span>
                        </div>
                        <span className="absolute -bottom-1 -right-1 bg-accent text-accent-foreground text-[10px] px-1 rounded-sm font-bold">
                          #{player.iccRank}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold leading-none truncate">{player.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {player.role} • {player.team}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0 flex items-center gap-2">
                        <p className="text-xs font-mono font-medium tabular-nums">{player.points} pts</p>
                        <div className="flex flex-col gap-1">
                          {selectedForSwap && (
                            <button
                              className="text-primary hover:bg-primary/5 p-1 rounded-md fc-transition"
                              title="Swap now"
                            >
                              <ArrowLeftRight size={14} />
                            </button>
                          )}
                          <button
                            onClick={() => handlePreChoose(player)}
                            className={`p-1 rounded-md fc-transition ${
                              isPreChosen
                                ? "text-warning bg-warning/10"
                                : "text-muted-foreground hover:text-warning hover:bg-warning/5"
                            }`}
                            title="Pre-choose for next week"
                          >
                            <Star size={14} className={isPreChosen ? "fill-warning" : ""} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeamCreation;
