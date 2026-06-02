export default function ProgressBar({ value, max = 100, className = "" }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={`w-full bg-zinc-800 rounded-full h-2.5 overflow-hidden ${className}`}>
      <div
        className="h-full bg-accent rounded-full transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
