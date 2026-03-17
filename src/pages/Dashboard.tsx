import { motion } from "framer-motion";
import { AlertTriangle, Clock, Plus, Trophy, Users, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import TournamentCard from "@/components/TournamentCard";
import CountdownTimer from "@/components/CountdownTimer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const myTeams = [
  {
    name: "Delhi Destroyers",
    league: "Office Premier League",
    round: 5,
    needsCaptain: true,
    lockoutSeconds: 172800,
  },
  {
    name: "Mumbai Mavericks",
    league: "Friends T20 League",
    round: 3,
    needsCaptain: false,
    lockoutSeconds: 86400,
  },
];

const tournaments = [
  { name: "Indian Premier League 2026", format: "T20", country: "India", startDate: "Mar 22, 2026", status: "live" as const, teams: 10 },
  { name: "ICC Champions Trophy", format: "ODI", country: "Pakistan", startDate: "Apr 10, 2026", status: "upcoming" as const, teams: 8 },
  { name: "Big Bash League", format: "T20", country: "Australia", startDate: "May 1, 2026", status: "upcoming" as const, teams: 8 },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Active Teams", value: "2", icon: Trophy, color: "text-primary" },
            { label: "Leagues", value: "3", icon: Users, color: "text-accent" },
            { label: "Total Points", value: "1,247", icon: Zap, color: "text-warning" },
            { label: "Win Rate", value: "68%", icon: Trophy, color: "text-accent" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-lg shadow-card p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">{stat.label}</span>
                <stat.icon size={14} className={stat.color} />
              </div>
              <p className="text-2xl font-bold tabular-nums">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* My Teams */}
          <div className="lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">My Teams</h2>
              <Button size="sm" variant="outline" className="text-xs gap-1">
                <Plus size={14} /> New
              </Button>
            </div>
            <div className="space-y-3">
              {myTeams.map((team, i) => (
                <motion.div
                  key={team.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card rounded-lg shadow-card p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-sm">{team.name}</h3>
                      <p className="text-xs text-muted-foreground">{team.league}</p>
                    </div>
                    <Badge variant="secondary">Round {team.round}</Badge>
                  </div>
                  {team.needsCaptain && (
                    <div className="flex items-center gap-1.5 bg-warning/10 text-warning-foreground rounded-md px-2.5 py-1.5 text-xs font-medium mb-3">
                      <AlertTriangle size={12} className="text-warning" />
                      Select Captain
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock size={12} />
                      <span>Lockout in</span>
                    </div>
                    <CountdownTimer targetSeconds={team.lockoutSeconds} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tournaments */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Active Tournaments</h2>
              <Button size="sm" variant="outline" className="text-xs gap-1">
                <Plus size={14} /> Create League
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {tournaments.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <TournamentCard {...t} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
