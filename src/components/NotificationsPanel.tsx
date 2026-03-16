import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, ArrowLeftRight, Clock, Trophy, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Notification {
  id: string;
  type: "draft" | "trade" | "modification" | "points" | "league";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const notifications: Notification[] = [
  { id: "1", type: "draft", title: "Your Turn to Pick!", message: "Round 3 — 90 seconds remaining to pick a player.", time: "Just now", read: false },
  { id: "2", type: "trade", title: "Trade Request", message: "Raj P. wants to trade P. Cummins for J. Bumrah.", time: "5 min ago", read: false },
  { id: "3", type: "modification", title: "Transfer Window Open", message: "Weekly modification window is now open. Closes in 12 hours.", time: "1 hour ago", read: false },
  { id: "4", type: "points", title: "Points Updated", message: "Your team scored 156 points in Round 5. You're now #1!", time: "3 hours ago", read: true },
  { id: "5", type: "league", title: "New Member Joined", message: "Priya M. joined Office Premier League.", time: "Yesterday", read: true },
  { id: "6", type: "draft", title: "Player Auto-Picked", message: "Time expired. Rashid Khan was auto-picked from your Star list.", time: "Yesterday", read: true },
  { id: "7", type: "trade", title: "Trade Approved", message: "Your trade of V. Kohli for K. Williamson was approved by the league.", time: "2 days ago", read: true },
];

const iconMap = {
  draft: { icon: Clock, color: "text-primary" },
  trade: { icon: ArrowLeftRight, color: "text-accent" },
  modification: { icon: Zap, color: "text-warning" },
  points: { icon: Trophy, color: "text-primary" },
  league: { icon: Bell, color: "text-muted-foreground" },
};

interface NotificationsPanelProps {
  open: boolean;
  onClose: () => void;
}

const NotificationsPanel = ({ open, onClose }: NotificationsPanelProps) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/20 z-50"
            onClick={onClose}
          />
          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-card shadow-elevated z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-sm">Notifications</h2>
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="text-[10px] h-5 px-1.5">{unreadCount}</Badge>
                )}
              </div>
              <button onClick={onClose} className="p-1.5 rounded-md hover:bg-secondary fc-transition">
                <X size={16} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {notifications.map((notif, i) => {
                const { icon: Icon, color } = iconMap[notif.type];
                return (
                  <motion.div
                    key={notif.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className={`p-4 border-b border-border fc-transition hover:bg-secondary/50 cursor-pointer ${
                      !notif.read ? "bg-primary/[0.02]" : ""
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className={`mt-0.5 ${color}`}>
                        <Icon size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold truncate">{notif.title}</p>
                          {!notif.read && (
                            <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{notif.message}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">{notif.time}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationsPanel;
