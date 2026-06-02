import { useState } from "react";
import { Search } from "lucide-react";
import { searchExercises, exerciseCategories } from "../../lib/exerciseLibrary";
import { useAuth } from "../../context/AuthContext";

export default function ExerciseSearch({ onSelect }) {
  const { profile } = useAuth();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(null);

  const results = searchExercises(query, category).slice(0, 30);

  function getWarning(ex) {
    const w = [];
    if (ex.shoulder_warning && profile?.shoulder_restriction) w.push("shoulder");
    if (ex.ankle_warning && profile?.ankle_restriction) w.push("ankle");
    return w;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
        <input
          type="text"
          placeholder="Search exercises…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          className="w-full bg-zinc-800 rounded-xl pl-9 pr-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-accent/50 text-sm tap-target"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        <button
          onClick={() => setCategory(null)}
          className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition tap-target ${!category ? "bg-accent text-zinc-950" : "bg-zinc-800 text-zinc-400"}`}
        >
          All
        </button>
        {exerciseCategories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c === category ? null : c)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition tap-target ${category === c ? "bg-accent text-zinc-950" : "bg-zinc-800 text-zinc-400"}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="flex flex-col divide-y divide-zinc-800">
        {results.length === 0 && (
          <p className="text-zinc-500 text-sm py-6 text-center">No exercises found.</p>
        )}
        {results.map((ex) => {
          const warnings = getWarning(ex);
          return (
            <button
              key={ex.id}
              onClick={() => onSelect(ex)}
              className="flex items-center justify-between py-3 text-left hover:bg-zinc-800/50 transition px-1 rounded-lg"
            >
              <div>
                <div className="text-sm font-medium text-white">{ex.name}</div>
                <div className="text-xs text-zinc-500">{ex.muscle_group}</div>
                {warnings.length > 0 && (
                  <div className="text-xs text-yellow-500 mt-0.5">⚠️ {warnings.join(" & ")} warning</div>
                )}
              </div>
              <span className="text-xs text-zinc-600 flex-shrink-0 ml-2">{ex.category}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
