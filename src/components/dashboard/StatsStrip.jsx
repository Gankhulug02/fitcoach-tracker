import { fmtWeight, fmtPct, fmtNumber } from "../../utils/formatters";

export default function StatsStrip({ latestStat }) {
  const metrics = [
    { label: "Weight",    value: latestStat ? fmtWeight(latestStat.weight_kg)    : "—" },
    { label: "Body Fat",  value: latestStat ? fmtPct(latestStat.body_fat_pct)    : "—" },
    { label: "VO2 Max",   value: latestStat ? fmtNumber(latestStat.vo2_max) + " ml/kg/min" : "—" },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 mb-5">
      {metrics.map(({ label, value }) => (
        <div key={label} className="bg-zinc-900 rounded-2xl px-3 py-3 text-center">
          <p className="text-base font-bold text-white truncate">{value}</p>
          <p className="text-[10px] text-zinc-500 mt-0.5 uppercase tracking-wide">{label}</p>
        </div>
      ))}
    </div>
  );
}
