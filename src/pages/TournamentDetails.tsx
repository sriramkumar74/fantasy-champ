import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, MapPin, Calendar } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getTournament, type StatLeader } from "@/data/tournamentDetails";

const TeamRow = ({ short, name, score, overs }: { short: string; name: string; score?: string; overs?: string }) => (
  <div className="flex items-center justify-between py-1">
    <div className="flex items-center gap-2 min-w-0">
      <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold flex-shrink-0">
        {short.slice(0, 3)}
      </span>
      <span className="text-sm font-medium truncate">{short}</span>
    </div>
    {score ? (
      <span className="text-xs font-mono tabular-nums">
        <span className="font-bold text-sm">{score}</span>
        {overs && <span className="text-muted-foreground ml-1">({overs})</span>}
      </span>
    ) : null}
  </div>
);

const LeaderTable = ({ leaders, unitLabel }: { leaders: StatLeader[]; unitLabel: string }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-xs">
      <thead>
        <tr className="text-muted-foreground border-b border-border">
          <th className="text-left font-medium py-2 pl-2">Player</th>
          <th className="text-right font-medium py-2">M</th>
          <th className="text-right font-medium py-2">Inns</th>
          <th className="text-right font-medium py-2">{unitLabel}</th>
          <th className="text-right font-medium py-2 pr-2">Avg</th>
        </tr>
      </thead>
      <tbody>
        {leaders.map((l, i) => (
          <tr key={l.name} className="border-b border-border/50 last:border-0">
            <td className="py-2 pl-2">
              <span className="text-muted-foreground mr-2 tabular-nums">{i + 1}</span>
              <span className="font-medium text-primary">{l.name}</span>
              <span className="text-muted-foreground ml-1.5">{l.team}</span>
            </td>
            <td className="text-right tabular-nums py-2">{l.matches}</td>
            <td className="text-right tabular-nums py-2">{l.innings}</td>
            <td className="text-right tabular-nums font-bold py-2">{l.value}</td>
            <td className="text-right tabular-nums py-2 pr-2 text-muted-foreground">{l.average}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const TournamentDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const tournament = getTournament(slug);
  const [openSquad, setOpenSquad] = useState<string | null>(null);
  const [openStat, setOpenStat] = useState<string | null>("runs");

  if (!tournament) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="max-w-3xl mx-auto px-4 py-12 text-center">
          <h1 className="text-lg font-bold mb-2">Tournament not found</h1>
          <Button size="sm" onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
        </main>
      </div>
    );
  }

  const squad = tournament.squads.find((s) => s.short === openSquad);
  const roles: SquadRole[] = ["Batter", "Bowler", "All Rounder", "Wicket Keeper"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4 gap-1 text-xs">
          <ArrowLeft size={14} /> Back
        </Button>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="bg-card rounded-lg shadow-card p-5 mb-4">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h1 className="text-xl font-bold">{tournament.name}</h1>
              <Badge variant={tournament.status === "live" ? "live" : "accent"}>
                {tournament.status === "live" ? "LIVE" : "Upcoming"}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><MapPin size={12} /> {tournament.country}</span>
              <span className="flex items-center gap-1.5"><Calendar size={12} /> {tournament.startDate}</span>
              <span>{tournament.format} Series</span>
            </div>
          </div>

          <Tabs defaultValue="matches">
            <TabsList className="w-full grid grid-cols-3 mb-4">
              <TabsTrigger value="matches">Matches</TabsTrigger>
              <TabsTrigger value="squads">Squads</TabsTrigger>
              <TabsTrigger value="stats">Stats</TabsTrigger>
            </TabsList>

            {/* Matches */}
            <TabsContent value="matches" className="space-y-4">
              {tournament.matches.map((m) => (
                <div key={m.id}>
                  <p className="text-xs font-bold text-muted-foreground mb-2">{m.date}</p>
                  <button
                    onClick={() => navigate(`/tournament/${tournament.slug}/match/${m.id}`)}
                    className="w-full text-left bg-card rounded-lg shadow-card p-4 hover:shadow-card-hover fc-transition"
                  >
                    <p className="text-xs text-muted-foreground mb-2">{m.label} · {m.venue}</p>
                    <TeamRow {...m.teamA} />
                    <TeamRow {...m.teamB} />
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-xs font-medium ${m.result ? "text-accent" : "text-primary"}`}>
                        {m.result ?? m.time}
                      </span>
                      <ChevronRight size={14} className="text-muted-foreground" />
                    </div>
                  </button>
                </div>
              ))}
            </TabsContent>

            {/* Squads */}
            <TabsContent value="squads">
              <div className="bg-card rounded-lg shadow-card overflow-hidden">
                <p className="px-4 py-2 text-xs font-bold bg-secondary">{tournament.format}</p>
                {tournament.squads.map((s) => (
                  <button
                    key={s.short}
                    onClick={() => setOpenSquad(openSquad === s.short ? null : s.short)}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-secondary/50 fc-transition border-b border-border/50 last:border-0"
                  >
                    <span className="flex items-center gap-2 text-sm font-medium">
                      <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold">
                        {s.short}
                      </span>
                      {s.team}
                    </span>
                    <ChevronRight size={14} className={`text-muted-foreground fc-transition ${openSquad === s.short ? "rotate-90" : ""}`} />
                  </button>
                ))}
              </div>

              {squad && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 bg-card rounded-lg shadow-card overflow-hidden">
                  {roles.map((role) => {
                    const players = squad.players.filter((p) => p.role === role);
                    if (!players.length) return null;
                    return (
                      <div key={role}>
                        <p className="px-4 py-2 text-xs font-bold bg-secondary">{role}s</p>
                        {players.map((p) => (
                          <div key={p.name} className="flex items-center justify-between px-4 py-2.5 border-b border-border/50 last:border-0">
                            <span className="flex items-center gap-3 text-sm">
                              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                                {p.name.charAt(0)}
                              </span>
                              {p.name}
                            </span>
                            <span className="text-xs text-muted-foreground">{p.country}</span>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </TabsContent>

            {/* Stats */}
            <TabsContent value="stats">
              <div className="bg-card rounded-lg shadow-card overflow-hidden">
                <p className="px-4 py-2 text-xs font-bold bg-secondary">Batting</p>
                {tournament.stats.batting.map((c) => (
                  <div key={c.key}>
                    <button
                      onClick={() => setOpenStat(openStat === c.key ? null : c.key)}
                      className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-secondary/50 fc-transition border-b border-border/50"
                    >
                      {c.label}
                      <ChevronRight size={14} className={`text-muted-foreground fc-transition ${openStat === c.key ? "rotate-90" : ""}`} />
                    </button>
                    {openStat === c.key && (
                      <div className="px-2 py-2 border-b border-border/50">
                        <LeaderTable leaders={c.leaders} unitLabel="R" />
                      </div>
                    )}
                  </div>
                ))}
                <p className="px-4 py-2 text-xs font-bold bg-secondary">Bowling</p>
                {tournament.stats.bowling.map((c) => (
                  <div key={c.key}>
                    <button
                      onClick={() => setOpenStat(openStat === c.key ? null : c.key)}
                      className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-secondary/50 fc-transition border-b border-border/50 last:border-0"
                    >
                      {c.label}
                      <ChevronRight size={14} className={`text-muted-foreground fc-transition ${openStat === c.key ? "rotate-90" : ""}`} />
                    </button>
                    {openStat === c.key && (
                      <div className="px-2 py-2 border-b border-border/50 last:border-0">
                        <LeaderTable leaders={c.leaders} unitLabel="W" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
};

type SquadRole = "Batter" | "Bowler" | "All Rounder" | "Wicket Keeper";

export default TournamentDetails;
