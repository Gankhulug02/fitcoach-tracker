import { Dumbbell, Clock, ChevronRight } from "lucide-react";
import { fmtDateFull } from "../../utils/formatters";
import Badge from "../ui/Badge";

const TYPE_COLORS = {
  Push: "blue",
  Pull: "green",
  Legs: "yellow",
  "Full Body": "accent",
  Custom: "default",
};

export default function WorkoutCard({ workout }) {
  const sets = workout.workout_sets || [];
  const exerciseCount = [...new Set(sets.map((s) => s.exercise_name))].length;

  return (
    <div className="bg-zinc-900 rounded-2xl p-4 flex items-center gap-3">
      <div className="bg-zinc-800 rounded-xl p-3 flex-shrink-0">
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
      <ChevronRight size={16} className="text-zinc-600 flex-shrink-0" />
    </div>
  );
}
