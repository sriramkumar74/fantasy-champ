import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Copy, Share2, Check, MessageCircle, Facebook } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const tournaments = [
  "Indian Premier League 2026",
  "County Championship 2026",
  "Big Bash League 2026",
  "ICC Champions Trophy 2026",
];

const CreateLeague = () => {
  const [leagueName, setLeagueName] = useState("");
  const [leagueType, setLeagueType] = useState("head-to-head");
  const [privacy, setPrivacy] = useState("public");
  const [leagueSize, setLeagueSize] = useState("8");
  const [ladderSort, setLadderSort] = useState("percentage");
  const [startRound, setStartRound] = useState("1");
  const [selectedRounds, setSelectedRounds] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
  const [tournament, setTournament] = useState("");
  const [team, setTeam] = useState("");
  const [showInvite, setShowInvite] = useState(false);
  const [copied, setCopied] = useState(false);

  const inviteCode = "IPL2026-7XHJ8";

  const toggleRound = (round: number) => {
    setSelectedRounds((prev) =>
      prev.includes(round) ? prev.filter((r) => r !== round) : [...prev, round]
    );
  };

  const handleCreate = () => {
    setShowInvite(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-6">
            <Trophy size={20} className="text-primary" />
            <h1 className="text-xl font-bold">Create League</h1>
          </div>

          <div className="bg-card rounded-lg shadow-card p-6 space-y-6">
            {/* Tournament */}
            <div className="space-y-2">
              <Label>Tournament</Label>
              <Select value={tournament} onValueChange={setTournament}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select tournament" />
                </SelectTrigger>
                <SelectContent>
                  {tournaments.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* League Name */}
            <div className="space-y-2">
              <Label>League Name</Label>
              <Input
                placeholder="e.g. Office Premier League"
                value={leagueName}
                onChange={(e) => setLeagueName(e.target.value)}
                className="bg-background"
              />
            </div>

            {/* League Type */}
            <div className="space-y-2">
              <Label>League Type</Label>
              <RadioGroup value={leagueType} onValueChange={setLeagueType} className="flex gap-4">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="head-to-head" id="h2h" />
                  <Label htmlFor="h2h" className="cursor-pointer font-normal">Head to Head</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="open" id="open" />
                  <Label htmlFor="open" className="cursor-pointer font-normal">Open</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Privacy */}
            <div className="space-y-2">
              <Label>Privacy</Label>
              <RadioGroup value={privacy} onValueChange={setPrivacy} className="flex gap-4">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="public" id="public" />
                  <Label htmlFor="public" className="cursor-pointer font-normal">Public</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="private" id="private" />
                  <Label htmlFor="private" className="cursor-pointer font-normal">Private</Label>
                </div>
              </RadioGroup>
            </div>

            {/* League Size */}
            <div className="space-y-2">
              <Label>League Size</Label>
              <Select value={leagueSize} onValueChange={setLeagueSize}>
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["4", "6", "8", "10"].map((s) => (
                    <SelectItem key={s} value={s}>{s} Teams</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Ladder Sort */}
            <div className="space-y-2">
              <Label>Ladder Sort</Label>
              <RadioGroup value={ladderSort} onValueChange={setLadderSort} className="flex gap-4">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="percentage" id="pct" />
                  <Label htmlFor="pct" className="cursor-pointer font-normal">Percentage</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="total-points" id="tp" />
                  <Label htmlFor="tp" className="cursor-pointer font-normal">Total Points</Label>
                </div>
              </RadioGroup>
            </div>

            {/* League Start Round */}
            <div className="space-y-2">
              <Label>League Start Round</Label>
              <Select value={startRound} onValueChange={setStartRound}>
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 18 }, (_, i) => (
                    <SelectItem key={i + 1} value={String(i + 1)}>Round {i + 1}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Rounds Selection */}
            <div className="space-y-2">
              <Label>Rounds</Label>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 18 }, (_, i) => i + 1).map((round) => (
                  <button
                    key={round}
                    onClick={() => toggleRound(round)}
                    className={`w-9 h-9 rounded-lg text-xs font-bold fc-transition ${
                      selectedRounds.includes(round)
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {round}
                  </button>
                ))}
              </div>
            </div>

            {/* Your Team */}
            <div className="space-y-2">
              <Label>Your Team</Label>
              <Select value={team} onValueChange={setTeam}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="team-a">Team A</SelectItem>
                  <SelectItem value="team-b">Team B</SelectItem>
                  <SelectItem value="create-new">+ Create New Team</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleCreate} className="w-full h-12 text-sm font-bold">
              CREATE LEAGUE
            </Button>
          </div>
        </motion.div>
      </main>

      {/* Invite Modal */}
      <Dialog open={showInvite} onOpenChange={setShowInvite}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Share2 size={18} className="text-accent" /> Invite Friends
            </DialogTitle>
            <DialogDescription>Share this code to invite players to your league</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* Confetti-style dots */}
            <div className="flex justify-center gap-1">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`w-2 h-2 rounded-full ${
                    i % 3 === 0 ? "bg-primary" : i % 3 === 1 ? "bg-accent" : "bg-warning"
                  }`}
                />
              ))}
            </div>

            <div className="bg-secondary rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">Invite Code</p>
              <p className="text-2xl font-bold tracking-widest font-mono">{inviteCode}</p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                className="gap-1.5 text-xs"
                onClick={() => window.open(`https://wa.me/?text=Join my league! Code: ${inviteCode}`, "_blank")}
              >
                <MessageCircle size={14} className="text-accent" /> WhatsApp
              </Button>
              <Button
                variant="outline"
                className="gap-1.5 text-xs"
                onClick={() => window.open(`https://www.facebook.com/sharer.php?quote=Join my league! Code: ${inviteCode}`, "_blank")}
              >
                <Facebook size={14} className="text-primary" /> Facebook
              </Button>
              <Button
                variant="outline"
                className="gap-1.5 text-xs"
                onClick={handleCopy}
              >
                {copied ? <Check size={14} className="text-accent" /> : <Copy size={14} />}
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateLeague;
