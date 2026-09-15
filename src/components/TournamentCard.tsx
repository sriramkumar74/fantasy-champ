import { motion } from "framer-motion";
import { Calendar, Info, MapPin, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { slugify } from "@/data/tournamentDetails";

interface TournamentCardProps {
  name: string;
  format: string;
  country: string;
  startDate: string;
  status: "upcoming" | "live" | "completed";
  teams?: number;
}

const TournamentCard = ({ name, format, country, startDate, status, teams }: TournamentCardProps) => {
  const navigate = useNavigate();
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-card rounded-lg shadow-card p-5 fc-transition hover:shadow-card-hover"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Trophy size={18} className="text-primary" />
          <Badge variant={status === "live" ? "live" : status === "upcoming" ? "accent" : "secondary"}>
            {status === "live" ? "LIVE" : status === "upcoming" ? "Upcoming" : "Completed"}
          </Badge>
        </div>
        <div className="flex items-center gap-1.5">
          <Badge variant="outline">{format}</Badge>
          <button
            onClick={() => navigate(`/tournament/${slugify(name)}`)}
            aria-label={`View ${name} details`}
            title="Series info"
            className="p-1 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/5 fc-transition"
          >
            <Info size={16} />
          </button>
        </div>
      </div>
      <h3 className="text-base font-bold mb-2">{name}</h3>
      <div className="flex flex-col gap-1.5 text-xs text-muted-foreground mb-4">
        <span className="flex items-center gap-1.5">
          <MapPin size={12} /> {country}
        </span>
        <span className="flex items-center gap-1.5">
          <Calendar size={12} /> {startDate}
        </span>
        {teams && <span>{teams} Teams</span>}
      </div>
      {status === "upcoming" && (
        <div className="flex gap-2">
          <Button size="sm" className="flex-1 text-xs">Create Team</Button>
          <Button size="sm" variant="outline" className="flex-1 text-xs">Join League</Button>
        </div>
      )}
    </motion.div>
  );
};

export default TournamentCard;

