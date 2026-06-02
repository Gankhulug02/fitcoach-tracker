import { subMonths } from "date-fns";

const RANGES = [
  { label: "1M", months: 1 },
  { label: "3M", months: 3 },
  { label: "6M", months: 6 },
  { label: "All", months: null },
];

export default function TimeRangeToggle({ value, onChange }) {
  return (
    <div className="flex gap-1 bg-zinc-800 rounded-xl p-1">
      {RANGES.map(({ label, months }) => {
        const active = value === label;
        return (
          <button
            key={label}
            onClick={() => onChange(label, months ? subMonths(new Date(), months) : null)}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition tap-target ${
              active ? "bg-accent text-zinc-950" : "text-zinc-400 hover:text-white"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
