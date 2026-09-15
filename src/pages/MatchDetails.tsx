import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, Clock, MapPin, Scale, Users, Zap } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getTournament } from "@/data/tournamentDetails";

const MatchDetails = () => {
  const { slug, matchId } = useParams();
  const navigate = useNavigate();
  const tournament = getTournament(slug);
  const match = tournament?.matches.find((m) => m.id === matchId);

  if (!tournament || !match) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="max-w-3xl mx-auto px-4 py-12 text-center">
          <h1 className="text-lg font-bold mb-2">Match not found</h1>
          <Button size="sm" onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4 gap-1 text-xs">
          <ArrowLeft size={14} /> Back
        </Button>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          {/* Hero */}
          <div className="bg-primary rounded-lg shadow-card p-5 text-primary-foreground">
            <div className="flex items-center justify-between mb-3">
              <span className="flex items-center gap-2 text-sm font-bold">
                {match.teamA.short}
              </span>
              <div className="text-center">
                <p className="text-xs opacity-80">{match.time}</p>
                {match.status === "upcoming" && <p className="text-xs opacity-70">Starts soon</p>}
              </div>
              <span className="text-sm font-bold">{match.teamB.short}</span>
            </div>
            <h1 className="text-lg font-bold">
              {match.teamA.name} vs {match.teamB.name}
            </h1>
            <p className="text-xs opacity-80">{match.label} • {tournament.format}</p>
          </div>

          {/* Schedule */}
          <div className="bg-card rounded-lg shadow-card p-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1.5"><CalendarDays size={12} /> Date</p>
                <p className="text-sm font-medium">{match.date}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1.5"><Clock size={12} /> Time</p>
                <p className="text-sm font-medium">{match.time}</p>
              </div>
            </div>
            <button
              onClick={() => navigate(`/tournament/${tournament.slug}`)}
              className="mt-4 text-xs font-medium text-primary hover:underline"
            >
              Check the series updates here → Schedule
            </button>
          </div>

          {/* Venue */}
          <div className="bg-card rounded-lg shadow-card p-5">
            <h2 className="text-sm font-bold mb-3">Venue Details</h2>
            <p className="text-sm flex items-center gap-2 mb-3"><MapPin size={14} className="text-primary" /> {match.venue}</p>
            <div className="flex flex-wrap gap-4 text-xs">
              <span className="flex items-center gap-1.5"><Scale size={12} className="text-muted-foreground" /> Pitch: <b>{match.pitch}</b></span>
              <span className="flex items-center gap-1.5"><Zap size={12} className="text-muted-foreground" /> Supports: <b>{match.supports}</b></span>
            </div>
          </div>

          {/* Score / Head to head */}
          <div className="bg-card rounded-lg shadow-card p-5">
            <h2 className="text-sm font-bold mb-3 text-center">
              {match.result ? "Result" : "Head-to-Head Wins"}
            </h2>
            {match.result ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{match.teamA.short}</span>
                  <span className="font-mono tabular-nums font-bold">{match.teamA.score} <span className="text-muted-foreground font-normal">({match.teamA.overs})</span></span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{match.teamB.short}</span>
                  <span className="font-mono tabular-nums font-bold">{match.teamB.score} <span className="text-muted-foreground font-normal">({match.teamB.overs})</span></span>
                </div>
                <Badge variant="accent" className="mt-2">{match.result}</Badge>
              </div>
            ) : (
              <p className="text-center text-lg font-bold tabular-nums">{match.headToHead}</p>
            )}
          </div>

          {/* Squads */}
          <div className="bg-card rounded-lg shadow-card p-5">
            <h2 className="text-sm font-bold mb-3 flex items-center gap-2"><Users size={14} className="text-primary" /> Squads</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {tournament.squads.map((s) => (
                <div key={s.short}>
                  <p className="text-sm font-bold mb-1">{s.team}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {s.players.map((p) => p.name).join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default MatchDetails;
