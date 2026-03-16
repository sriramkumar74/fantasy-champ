import { motion } from "framer-motion";
import { Plus, Star } from "lucide-react";

interface PlayerCardProps {
  name: string;
  role: string;
  team: string;
  price: number;
  points?: number;
  imageUrl?: string;
  onAdd?: () => void;
  disabled?: boolean;
}

const PlayerCard = ({ name, role, team, price, points, imageUrl, onAdd, disabled }: PlayerCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`bg-card p-3 rounded-lg shadow-card flex items-center gap-3 fc-transition ${disabled ? 'opacity-50' : ''}`}
    >
      <div className="relative flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-sm font-bold text-muted-foreground">{name.charAt(0)}</span>
          )}
        </div>
        {points !== undefined && (
          <span className="absolute -bottom-1 -right-1 bg-accent text-accent-foreground text-[10px] px-1 rounded-sm font-bold">
            {points}
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold leading-none truncate">{name}</h4>
        <p className="text-xs text-muted-foreground mt-1">{role} • {team}</p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-xs font-mono font-medium tabular-nums">${price}M</p>
        {onAdd && (
          <button
            onClick={onAdd}
            disabled={disabled}
            className="text-primary hover:bg-primary/5 p-1 rounded-md fc-transition disabled:opacity-50"
          >
            <Plus size={16} />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default PlayerCard;
