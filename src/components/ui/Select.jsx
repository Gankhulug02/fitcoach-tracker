export default function Select({ label, options, className = "", ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide">{label}</label>}
      <select
        className={`tap-target w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-2.5 text-white focus:outline-none focus:border-accent/60 transition ${className}`}
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
