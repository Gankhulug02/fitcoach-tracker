import { Plus, X } from "lucide-react";
import SetRow from "./SetRow";
import InjuryWarning from "./InjuryWarning";
import Badge from "../ui/Badge";

export default function ExerciseBlock({ exercise, sets, onChange, onAddSet, onRemove, prs = [] }) {
  function handleSetChange(index, field, value) {
    const updated = sets.map((s, i) => (i === index ? { ...s, [field]: value } : s));
    onChange(updated);
  }

  function handleDeleteSet(index) {
    onChange(sets.filter((_, i) => i !== index));
  }

  const hasPR = prs.includes(exercise.name);

  return (
    <div className="bg-zinc-900 rounded-2xl p-4 mb-3">
      <div className="flex items-start justify-between mb-1">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-white text-sm">{exercise.name}</span>
            {hasPR && <span className="text-xs bg-yellow-500/20 text-yellow-400 font-bold px-2 py-0.5 rounded-full">🏆 PR</span>}
          </div>
          <span className="text-xs text-zinc-500">{exercise.muscle_group}</span>
        </div>
        <button onClick={onRemove} className="text-zinc-600 hover:text-red-400 transition p-1 tap-target">
          <X size={16} />
        </button>
      </div>

      <InjuryWarning exercise={exercise} />

      <div className="mt-3">
        <div className="flex items-center gap-2 px-1 mb-1">
          <span className="text-xs text-zinc-500 w-5" />
          <span className="flex-1 text-xs text-zinc-500 text-center">Reps</span>
          <span className="flex-1 text-xs text-zinc-500 text-center">kg</span>
          <span className="w-14 text-xs text-zinc-500 text-center">RPE</span>
          <span className="w-8" />
        </div>
        {sets.map((set, i) => (
          <SetRow
            key={i}
            set={set}
            index={i}
            onChange={handleSetChange}
            onDelete={handleDeleteSet}
          />
        ))}
      </div>

      <button
        onClick={onAddSet}
        className="mt-2 flex items-center gap-1.5 text-accent text-xs font-semibold hover:text-accent/80 transition tap-target"
      >
        <Plus size={14} /> Add set
      </button>
    </div>
  );
}
