import { useState, useEffect } from "react";
import { Dumbbell, Clock, ChevronRight, Trash2 } from "lucide-react";
import { fmtDateFull } from "../../utils/formatters";
import Badge from "../ui/Badge";

const TYPE_COLORS = {
  Push: "blue",
  Pull: "green",
  Legs: "yellow",
  "Full Body": "accent",
  Custom: "default",
};

export default function WorkoutCard({ workout, onClick, onDelete }) {
  const [confirming, setConfirming] = useState(false);
  const sets = workout.workout_sets || [];
  const exerciseCount = [...new Set(sets.map((s) => s.exercise_name))].length;

  useEffect(() => {
    if (!confirming) return;
    const t = setTimeout(() => setConfirming(false), 3000);
    return () => clearTimeout(t);
  }, [confirming]);

  function handleDelete(e) {
    e.stopPropagation();
    if (confirming) {
      onDelete?.();
    } else {
      setConfirming(true);
    }
  }

  return (
    <div
      className={`bg-zinc-900 rounded-2xl p-4 flex items-center gap-3 ${onClick ? "cursor-pointer hover:bg-zinc-800 transition-colors active:bg-zinc-700" : ""}`}
      onClick={onClick}
    >
      <div className="bg-zinc-800 rounded-xl p-3 shrink-0">
        <Dumbbell size={20} className="text-accent" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <Badge variant={TYPE_COLORS[workout.workout_type] || "default"}>{workout.workout_type}</Badge>
        </div>
        <div className="text-xs text-zinc-500 flex items-center gap-3 mt-1">
          <span>{fmtDateFull(workout.date)}</span>
          {exerciseCount > 0 && <span>{exerciseCount} exercises</span>}
          {workout.duration_min > 0 && (
            <span className="flex items-center gap-1">
              <Clock size={11} />{workout.duration_min} min
            </span>
          )}
        </div>
      </div>
      {onDelete && (
        <button
          onClick={handleDelete}
          className={`shrink-0 tap-target px-2 py-1 rounded-lg transition-colors ${
            confirming ? "bg-red-500/20 text-red-400" : "text-zinc-600 hover:text-red-400"
          }`}
        >
          {confirming ? <span className="text-xs font-semibold">Sure?</span> : <Trash2 size={15} />}
        </button>
      )}
      <ChevronRight size={16} className="text-zinc-600 shrink-0" />
    </div>
  );
}
