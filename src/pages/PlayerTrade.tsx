import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight, Check, X, Clock, Vote, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const myPlayers = [
  { name: "V. Kohli", role: "Batter", team: "RCB", price: 15 },
  { name: "R. Sharma", role: "Batter", team: "MI", price: 14 },
  { name: "B. Stokes", role: "All-Rounder", team: "CSK", price: 13 },
  { name: "J. Bumrah", role: "Bowler", team: "MI", price: 14 },
];

const leagueMembers = [
  { name: "Sarah K.", team: "Mumbai Mavericks" },
  { name: "Raj P.", team: "Kolkata Knights" },
  { name: "Amit S.", team: "Chennai Chargers" },
];

const otherPlayers: Record<string, { name: string; role: string; team: string; price: number }[]> = {
  "Sarah K.": [
    { name: "R. Jadeja", role: "All-Rounder", team: "CSK", price: 10 },
    { name: "K. Williamson", role: "Batter", team: "GT", price: 11 },
  ],
  "Raj P.": [
    { name: "R. Pant", role: "WK", team: "DC", price: 12 },
    { name: "P. Cummins", role: "Bowler", team: "SRH", price: 12 },
  ],
  "Amit S.": [
    { name: "S. Gill", role: "Batter", team: "GT", price: 9 },
    { name: "M. Shami", role: "Bowler", team: "GT", price: 9.5 },
  ],
};

interface TradeRequest {
  id: string;
  from: string;
  to: string;
  give: { name: string; role: string; team: string; price: number };
  receive: { name: string; role: string; team: string; price: number };
  status: "pending" | "accepted" | "voting" | "approved" | "rejected";
  votes: { user: string; vote: "approve" | "reject" | null }[];
}

const existingTrades: TradeRequest[] = [
  {
    id: "1",
    from: "You",
    to: "Sarah K.",
    give: { name: "V. Kohli", role: "Batter", team: "RCB", price: 15 },
    receive: { name: "K. Williamson", role: "Batter", team: "GT", price: 11 },
    status: "voting",
    votes: [
      { user: "Raj P.", vote: "approve" },
      { user: "Amit S.", vote: null },
      { user: "Priya M.", vote: "approve" },
      { user: "Dev L.", vote: null },
    ],
  },
  {
    id: "2",
    from: "Raj P.",
    to: "You",
    give: { name: "P. Cummins", role: "Bowler", team: "SRH", price: 12 },
    receive: { name: "J. Bumrah", role: "Bowler", team: "MI", price: 14 },
    status: "pending",
    votes: [],
  },
  {
    id: "3",
    from: "Amit S.",
    to: "Sarah K.",
    give: { name: "S. Gill", role: "Batter", team: "GT", price: 9 },
    receive: { name: "R. Jadeja", role: "All-Rounder", team: "CSK", price: 10 },
    status: "rejected",
    votes: [
      { user: "You", vote: "reject" },
      { user: "Raj P.", vote: "reject" },
      { user: "Priya M.", vote: "approve" },
      { user: "Dev L.", vote: "reject" },
    ],
  },
];

const PlayerTrade = () => {
  const [showNewTrade, setShowNewTrade] = useState(false);
  const [selectedMember, setSelectedMember] = useState("");
  const [givePlayer, setGivePlayer] = useState("");
  const [receivePlayer, setReceivePlayer] = useState("");

  const getStatusBadge = (status: TradeRequest["status"]) => {
    const map = {
      pending: { variant: "secondary" as const, label: "Pending" },
      accepted: { variant: "default" as const, label: "Accepted" },
      voting: { variant: "default" as const, label: "Voting" },
      approved: { variant: "default" as const, label: "Approved" },
      rejected: { variant: "destructive" as const, label: "Rejected" },
    };
    const { variant, label } = map[status];
    return <Badge variant={variant} className="text-[10px]">{label}</Badge>;
  };

  const getVoteProgress = (votes: TradeRequest["votes"]) => {
    const total = votes.length;
    const approved = votes.filter((v) => v.vote === "approve").length;
    return total > 0 ? (approved / total) * 100 : 0;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold">Player Exchange</h1>
            <p className="text-sm text-muted-foreground">Office Premier League • IPL 2026</p>
          </div>
          <Button onClick={() => setShowNewTrade(true)} className="gap-1.5 text-xs">
            <ArrowLeftRight size={14} /> New Trade
          </Button>
        </div>

        {/* Trade Requests */}
        <div className="space-y-4">
          {existingTrades.map((trade, i) => (
            <motion.div
              key={trade.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-lg shadow-card p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{trade.from}</span>
                  <ArrowLeftRight size={12} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{trade.to}</span>
                </div>
                {getStatusBadge(trade.status)}
              </div>

              {/* Trade Cards */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-destructive/5 rounded-lg p-3 border border-destructive/10">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Give</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground">
                      {trade.give.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{trade.give.name}</p>
                      <p className="text-[10px] text-muted-foreground">{trade.give.role} • {trade.give.team} • ${trade.give.price}M</p>
                    </div>
                  </div>
                </div>
                <div className="bg-accent/5 rounded-lg p-3 border border-accent/10">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Receive</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground">
                      {trade.receive.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{trade.receive.name}</p>
                      <p className="text-[10px] text-muted-foreground">{trade.receive.role} • {trade.receive.team} • ${trade.receive.price}M</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pending action for incoming trades */}
              {trade.status === "pending" && trade.to === "You" && (
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 gap-1 text-xs">
                    <Check size={12} /> Accept
                  </Button>
                  <Button size="sm" variant="destructive" className="flex-1 gap-1 text-xs">
                    <X size={12} /> Reject
                  </Button>
                </div>
              )}

              {/* Voting Progress */}
              {trade.status === "voting" && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-medium flex items-center gap-1">
                      <Vote size={12} /> League Voting
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {trade.votes.filter((v) => v.vote).length}/{trade.votes.length} voted
                    </span>
                  </div>
                  <Progress value={getVoteProgress(trade.votes)} className="h-2 mb-3" />
                  <div className="flex gap-2 flex-wrap">
                    {trade.votes.map((v) => (
                      <div
                        key={v.user}
                        className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-xs ${
                          v.vote === "approve"
                            ? "bg-accent/10 text-accent"
                            : v.vote === "reject"
                            ? "bg-destructive/10 text-destructive"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold">
                          {v.user.charAt(0)}
                        </div>
                        {v.user}
                        {v.vote === "approve" && <Check size={10} />}
                        {v.vote === "reject" && <X size={10} />}
                        {!v.vote && <Clock size={10} />}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Rejected votes */}
              {trade.status === "rejected" && (
                <div className="flex gap-2 flex-wrap">
                  {trade.votes.map((v) => (
                    <div
                      key={v.user}
                      className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-xs ${
                        v.vote === "approve" ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {v.user}
                      {v.vote === "approve" ? <Check size={10} /> : <X size={10} />}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </main>

      {/* New Trade Modal */}
      <Dialog open={showNewTrade} onOpenChange={setShowNewTrade}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ArrowLeftRight size={18} className="text-primary" /> New Trade Proposal
            </DialogTitle>
            <DialogDescription>Select a player to give and one to receive</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Trade With</Label>
              <Select value={selectedMember} onValueChange={setSelectedMember}>
                <SelectTrigger><SelectValue placeholder="Select league member" /></SelectTrigger>
                <SelectContent>
                  {leagueMembers.map((m) => (
                    <SelectItem key={m.name} value={m.name}>{m.name} ({m.team})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Give Player</Label>
              <Select value={givePlayer} onValueChange={setGivePlayer}>
                <SelectTrigger><SelectValue placeholder="Select your player" /></SelectTrigger>
                <SelectContent>
                  {myPlayers.map((p) => (
                    <SelectItem key={p.name} value={p.name}>{p.name} ({p.role} • ${p.price}M)</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedMember && (
              <div className="space-y-2">
                <Label>Receive Player</Label>
                <Select value={receivePlayer} onValueChange={setReceivePlayer}>
                  <SelectTrigger><SelectValue placeholder="Select their player" /></SelectTrigger>
                  <SelectContent>
                    {(otherPlayers[selectedMember] || []).map((p) => (
                      <SelectItem key={p.name} value={p.name}>{p.name} ({p.role} • ${p.price}M)</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {givePlayer && receivePlayer && (
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-destructive/5 rounded-lg p-3 text-center">
                  <p className="text-[10px] text-muted-foreground uppercase mb-1">Give</p>
                  <p className="text-sm font-bold">{givePlayer}</p>
                </div>
                <div className="bg-accent/5 rounded-lg p-3 text-center">
                  <p className="text-[10px] text-muted-foreground uppercase mb-1">Receive</p>
                  <p className="text-sm font-bold">{receivePlayer}</p>
                </div>
              </div>
            )}

            <Button
              className="w-full gap-1.5"
              disabled={!givePlayer || !receivePlayer || !selectedMember}
            >
              <Send size={14} /> Send Trade Request
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlayerTrade;
