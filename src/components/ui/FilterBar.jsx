export default function FilterBar({ options, value, onChange, className = "" }) {
  return (
    <div className={`flex gap-2 overflow-x-auto scrollbar-hide pb-1 ${className}`}>
      {options.map((opt) => {
        const label = typeof opt === "string" ? opt : opt.label;
        const val   = typeof opt === "string" ? opt : opt.value;
        const active = value === val;
        return (
          <button
            key={val}
            onClick={() => onChange(val)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition tap-target ${
              active
                ? "bg-accent text-zinc-950"
                : "bg-zinc-800 text-zinc-400 hover:text-white"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
