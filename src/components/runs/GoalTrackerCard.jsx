import ProgressBar from "../ui/ProgressBar";
import MilestoneBadges from "./MilestoneBadge";
import { weeksToGoal, suggestedWeeklyMileage } from "../../utils/weekUtils";

const GOAL_KM = 21.1;

export default function GoalTrackerCard({ longestRun = 0 }) {
  const pct = Math.min(100, (longestRun / GOAL_KM) * 100);
  const weeks = weeksToGoal();
  const suggested = suggestedWeeklyMileage(longestRun);

  return (
    <div className="bg-zinc-900 rounded-2xl p-5 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-white">🎯 Half-Marathon Goal</h3>
        <span className="text-xs text-zinc-500">{weeks} weeks left</span>
      </div>

      <div className="flex items-center justify-between text-sm mb-2">
        <span className="text-zinc-400">Longest run</span>
        <span className="font-bold text-white">{longestRun.toFixed(1)} / {GOAL_KM} km</span>
      </div>

      <ProgressBar value={longestRun} max={GOAL_KM} className="mb-1" />
      <div className="text-right text-xs text-zinc-500 mb-4">{pct.toFixed(0)}%</div>

      <div className="bg-zinc-800 rounded-xl px-4 py-2.5 flex items-center justify-between mb-4">
        <span className="text-xs text-zinc-400">Suggested weekly mileage</span>
        <span className="text-sm font-bold text-accent">{suggested} km</span>
      </div>

      <MilestoneBadges longestRun={longestRun} />
    </div>
  );
}
