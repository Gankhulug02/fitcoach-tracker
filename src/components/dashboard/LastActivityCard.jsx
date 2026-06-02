import { Dumbbell, Footprints } from "lucide-react";
import { fmtDateFull } from "../../utils/formatters";
import { formatPace } from "../../utils/paceUtils";

export default function LastActivityCard({ lastWorkout, lastRun }) {
  const workout = lastWorkout ? { ...lastWorkout, _type: "workout", _date: new Date(lastWorkout.date) } : null;
  const run = lastRun ? { ...lastRun, _type: "run", _date: new Date(lastRun.date) } : null;

  const last = !workout && !run ? null
    : !workout ? run
    : !run ? workout
    : workout._date >= run._date ? workout : run;

  if (!last) return null;

  const isWorkout = last._type === "workout";
  const sets = last.workout_sets || [];
  const exerciseCount = [...new Set(sets.map((s) => s.exercise_name))].length;

  return (
    <div className="bg-zinc-900 rounded-2xl p-4 mb-5">
      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-3">Last activity</p>
      <div className="flex items-center gap-3">
        <div className={`rounded-xl p-3 ${isWorkout ? "bg-zinc-800" : "bg-orange-500/10"}`}>
          {isWorkout
            ? <Dumbbell size={20} className="text-accent" />
            : <Footprints size={20} className="text-orange-400" />
          }
        </div>
        <div>
          {isWorkout ? (
            <>
              <p className="font-semibold text-white">{last.workout_type}</p>
              <p className="text-xs text-zinc-500">
                {fmtDateFull(last.date)}
                {exerciseCount > 0 && ` · ${exerciseCount} exercises`}
                {last.duration_min > 0 && ` · ${last.duration_min} min`}
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold text-white">{parseFloat(last.distance_km).toFixed(2)} km run</p>
              <p className="text-xs text-zinc-500">
                {fmtDateFull(last.date)} · {formatPace(last.avg_pace_sec_per_km)}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
