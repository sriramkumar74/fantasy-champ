import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetSeconds: number;
  size?: "sm" | "lg";
  onComplete?: () => void;
}

const CountdownTimer = ({ targetSeconds, size = "sm", onComplete }: CountdownTimerProps) => {
  const [seconds, setSeconds] = useState(targetSeconds);

  useEffect(() => {
    if (seconds <= 0) {
      onComplete?.();
      return;
    }
    const timer = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [seconds, onComplete]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const hours = Math.floor(mins / 60);
  const displayMins = mins % 60;

  const isLarge = size === "lg";

  return (
    <div className={`tabular-nums font-mono font-bold ${isLarge ? 'text-4xl' : 'text-sm'} ${seconds <= 10 ? 'text-destructive' : 'text-foreground'}`}>
      {hours > 0 && <span>{String(hours).padStart(2, "0")}:</span>}
      <span>{String(displayMins).padStart(2, "0")}</span>
      <span className={seconds <= 10 ? 'animate-pulse' : ''}>:</span>
      <span>{String(secs).padStart(2, "0")}</span>
    </div>
  );
};

export default CountdownTimer;
