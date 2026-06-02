import ProgressBar from "../ui/ProgressBar";
import { format } from "date-fns";

export default function MonthlyProgress({ workoutCount, runCount, runDistance, goals }) {
  const month = format(new Date(), "MMMM");

  const items = [
    {
      label: "Workouts",
      value: workoutCount,
      target: goals?.monthly_workout_goal ?? 12,
      unit: "sessions",
      color: "bg-accent",
    },
    {
      label: "Runs",
      value: runCount,
      target: goals?.monthly_run_goal ?? 12,
      unit: "runs",
      color: "bg-orange-500",
    },
    {
      label: "Distance",
      value: parseFloat(runDistance.toFixed(1)),
      target: goals?.monthly_distance_goal ?? 50,
      unit: "km",
      color: "bg-blue-500",
    },
  ];

  return (
    <div className="bg-zinc-900 rounded-2xl p-4 mb-5">
      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-4">{month} progress</p>
      <div className="flex flex-col gap-4">
        {items.map(({ label, value, target, unit, color }) => (
          <div key={label}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-zinc-400">{label}</span>
              <span className="text-sm font-bold text-white">
                {value} <span className="text-zinc-500 font-normal text-xs">/ {target} {unit}</span>
              </span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full ${color} rounded-full transition-all duration-500`}
                style={{ width: `${Math.min(100, (value / target) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
