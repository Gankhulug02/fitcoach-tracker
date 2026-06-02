import { useState, useMemo } from "react";
import { format, startOfMonth, endOfMonth, subMonths, addMonths, isSameMonth } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MonthlyProgress({ workouts, runs, currentGoals, getGoalsForMonth }) {
  const [offset, setOffset] = useState(0); // 0 = current, -1 = last month, etc.

  const selectedMonth = useMemo(() => {
    const base = new Date();
    base.setDate(1);
    return offset === 0 ? base : offset < 0 ? subMonths(base, Math.abs(offset)) : addMonths(base, offset);
  }, [offset]);

  const isCurrentMonth = isSameMonth(selectedMonth, new Date());

  const { workoutCount, runCount, runDistance } = useMemo(() => {
    const start = startOfMonth(selectedMonth);
    const end = endOfMonth(selectedMonth);
    const inMonth = (dateStr) => { const d = new Date(dateStr); return d >= start && d <= end; };
    const monthRuns = (runs || []).filter((r) => inMonth(r.date));
    return {
      workoutCount: (workouts || []).filter((w) => inMonth(w.date)).length,
      runCount: monthRuns.length,
      runDistance: monthRuns.reduce((sum, r) => sum + (parseFloat(r.distance_km) || 0), 0),
    };
  }, [workouts, runs, selectedMonth]);

  // Use saved snapshot for past months, fall back to current profile goals
  const goals = getGoalsForMonth(selectedMonth, currentGoals);

  const items = [
    { label: "Workouts", value: workoutCount,               target: goals?.monthly_workout_goal  ?? 12, unit: "sessions", color: "bg-accent"     },
    { label: "Runs",     value: runCount,                   target: goals?.monthly_run_goal      ?? 12, unit: "runs",     color: "bg-orange-500" },
    { label: "Distance", value: parseFloat(runDistance.toFixed(1)), target: goals?.monthly_distance_goal ?? 50, unit: "km", color: "bg-blue-500" },
  ];

  return (
    <div className="bg-zinc-900 rounded-2xl p-4 mb-5">
      {/* Header with month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setOffset((o) => o - 1)} className="text-zinc-500 hover:text-white tap-target p-1 transition">
          <ChevronLeft size={16} />
        </button>
        <div className="text-center">
          <p className="text-sm font-semibold text-white">{format(selectedMonth, "MMMM yyyy")}</p>
          {isCurrentMonth && <p className="text-xs text-zinc-500">Current month</p>}
        </div>
        <button
          onClick={() => setOffset((o) => o + 1)}
          disabled={isCurrentMonth}
          className="text-zinc-500 hover:text-white tap-target p-1 transition disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Progress bars */}
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
