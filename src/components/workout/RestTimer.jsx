import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function RestTimer({ defaultSeconds = 90 }) {
  const [seconds, setSeconds] = useState(defaultSeconds);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) {
            setRunning(false);
            playDone();
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  function playDone() {
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      osc.connect(ctx.destination);
      osc.frequency.value = 880;
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch (_) {}
  }

  function reset() {
    setRunning(false);
    setSeconds(defaultSeconds);
  }

  const m = Math.floor(seconds / 60);
  const s = (seconds % 60).toString().padStart(2, "0");

  return (
    <div className="flex items-center gap-3 bg-zinc-800 rounded-2xl px-4 py-3">
      <span className="text-2xl font-mono font-bold text-white tabular-nums">{m}:{s}</span>
      <span className="text-xs text-zinc-500 flex-1">rest timer</span>
      <button onClick={() => setRunning((r) => !r)} className="text-accent tap-target p-1">
        {running ? <Pause size={18} /> : <Play size={18} />}
      </button>
      <button onClick={reset} className="text-zinc-500 hover:text-white tap-target p-1">
        <RotateCcw size={16} />
      </button>
    </div>
  );
}
