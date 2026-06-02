function Ring({ count, target, label, color }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const filled = Math.min(count / target, 1);
  const dash = filled * circ;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <svg width="72" height="72" viewBox="0 0 72 72">
          <circle
            cx="36"
            cy="36"
            r={r}
            fill="none"
            stroke="#27272a"
            strokeWidth="6"
          />
          <circle
            cx="36"
            cy="36"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeDasharray={`${dash} ${circ}`}
            strokeLinecap="round"
            transform="rotate(-90 36 36)"
            style={{ transition: "stroke-dasharray 0.5s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-base font-bold text-white">
            {count}
            <span className="text-xs text-zinc-500">/{target}</span>
          </span>
        </div>
      </div>
      <p className="text-xs text-zinc-500 font-medium">{label}</p>
    </div>
  );
}

export default function WeeklyRings({
  gymCount,
  runCount,
  gymTarget = 3,
  runTarget = 1,
}) {
  return (
    <div className="bg-zinc-900 rounded-2xl p-4 mb-5">
      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-4">
        This week
      </p>
      <div className="flex justify-around">
        <Ring
          count={gymCount}
          target={gymTarget}
          label="Gym sessions"
          color="#00FF87"
        />
        <Ring
          count={runCount}
          target={runTarget}
          label="Runs"
          color="#f97316"
        />
      </div>
    </div>
  );
}
