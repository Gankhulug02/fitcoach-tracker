const TYPES = ["Push", "Pull", "Legs", "Full Body", "Custom"];

const TYPE_EMOJI = {
  Push:       "💪",
  Pull:       "🤜",
  Legs:       "🦵",
  "Full Body":"⚡",
  Custom:     "✨",
};

export default function WorkoutTypeSelector({ onSelect }) {
  return (
    <div className="flex flex-col gap-3 py-2">
      {TYPES.map((type) => (
        <button
          key={type}
          onClick={() => onSelect(type)}
          className="flex items-center gap-4 bg-zinc-800 hover:bg-zinc-700 rounded-2xl px-5 py-4 text-left transition tap-target active:scale-95"
        >
          <span className="text-2xl">{TYPE_EMOJI[type]}</span>
          <span className="font-semibold text-white text-base">{type}</span>
        </button>
      ))}
    </div>
  );
}
