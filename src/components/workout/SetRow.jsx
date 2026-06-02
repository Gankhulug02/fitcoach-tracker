import { Trash2 } from "lucide-react";

export default function SetRow({ set, index, onChange, onDelete }) {
  function update(field, value) {
    onChange(index, field, value);
  }

  return (
    <div className="flex items-center gap-2 py-2">
      <span className="text-xs text-zinc-500 w-5 text-center flex-shrink-0">
        {set.set_number}
      </span>
      <input
        type="number"
        placeholder="Reps"
        value={set.reps}
        min="1"
        onChange={(e) => update("reps", e.target.value)}
        className="flex-1 bg-zinc-800 rounded-lg px-2 py-2 text-center text-sm text-white focus:outline-none focus:ring-1 focus:ring-accent/50 tap-target"
      />
      <input
        type="number"
        placeholder="kg"
        step="0.5"
        value={set.weight_kg}
        min="0"
        onChange={(e) => update("weight_kg", e.target.value)}
        className="flex-1 bg-zinc-800 rounded-lg px-2 py-2 text-center text-sm text-white focus:outline-none focus:ring-1 focus:ring-accent/50 tap-target"
      />
      <input
        type="number"
        placeholder="RPE"
        value={set.rpe}
        min="1"
        max="10"
        onChange={(e) => update("rpe", e.target.value)}
        className="w-14 bg-zinc-800 rounded-lg px-2 py-2 text-center text-sm text-zinc-400 focus:outline-none focus:ring-1 focus:ring-accent/50 tap-target"
      />
      <button
        onClick={() => onDelete(index)}
        className="text-zinc-600 hover:text-red-400 transition p-1.5 tap-target"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
