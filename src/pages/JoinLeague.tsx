import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Users, Calendar, ArrowRight, KeyRound } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const publicLeagues = [
  { name: "Cricket Masters League", tournament: "IPL 2026", members: 6, max: 8, startDate: "Mar 22, 2026", type: "Head to Head" },
  { name: "Fantasy Champions", tournament: "IPL 2026", members: 3, max: 6, startDate: "Mar 22, 2026", type: "Open" },
  { name: "T20 Warriors", tournament: "BBL 2026", members: 8, max: 10, startDate: "May 1, 2026", type: "Head to Head" },
  { name: "Global Cricket Club", tournament: "Champions Trophy", members: 2, max: 4, startDate: "Apr 10, 2026", type: "Open" },
  { name: "Weekend Warriors", tournament: "County Championship", members: 5, max: 8, startDate: "Apr 5, 2026", type: "Head to Head" },
];

const JoinLeague = () => {
  const [inviteCode, setInviteCode] = useState("");
  const [search, setSearch] = useState("");

  const filtered = publicLeagues.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.tournament.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-xl font-bold mb-6">Join League</h1>

          {/* Invite Code */}
          <div className="bg-card rounded-lg shadow-card p-6 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <KeyRound size={16} className="text-primary" />
              <h2 className="text-sm font-bold">Join with Invite Code</h2>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Enter invite code (e.g. IPL2026-7XHJ8)"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                className="bg-background font-mono uppercase tracking-wider"
              />
              <Button disabled={!inviteCode.trim()} className="px-6 gap-1.5">
                Join <ArrowRight size={14} />
              </Button>
            </div>
          </div>

          {/* Public Leagues */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold">Public Leagues</h2>
              <div className="relative w-56">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search leagues..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 text-sm bg-card shadow-card border-0 h-9"
                />
              </div>
            </div>

            <div className="space-y-3">
              {filtered.map((league, i) => (
                <motion.div
                  key={league.name}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card rounded-lg shadow-card p-4 flex items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-bold truncate">{league.name}</h3>
                      <Badge variant="secondary" className="text-[10px]">{league.type}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{league.tournament}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users size={12} /> {league.members}/{league.max}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {league.startDate}
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    disabled={league.members >= league.max}
                    className="text-xs gap-1"
                  >
                    {league.members >= league.max ? "Full" : "Join"}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default JoinLeague;
