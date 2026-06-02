import { estimateBodyAge } from "../../utils/bodyAgeUtils";
import { fmtDelta } from "../../utils/formatters";
import { useAuth } from "../../context/AuthContext";

function DeltaChip({ delta, lowerIsBetter = false }) {
  if (delta === null || delta === undefined) return null;
  const isGood = lowerIsBetter ? delta < 0 : delta > 0;
  const color = delta === 0 ? "text-zinc-500" : isGood ? "text-green-400" : "text-red-400";
  return <span className={`text-xs font-semibold ${color}`}>{fmtDelta(delta)}</span>;
}

export default function StatsCard({ label, current, starting, delta, unit = "", lowerIsBetter = false, showBodyAge = false, vo2Max, bodyFatPct }) {
  const { profile } = useAuth();

  let bodyAge = null;
  if (showBodyAge && vo2Max && bodyFatPct && profile?.dob) {
    const age = Math.floor((new Date() - new Date(profile.dob)) / (365.25 * 24 * 3600 * 1000));
    bodyAge = estimateBodyAge(parseFloat(vo2Max), parseFloat(bodyFatPct), age);
  }

  return (
    <div className="bg-zinc-900 rounded-2xl p-4">
      <p className="text-xs text-zinc-500 uppercase tracking-wide font-medium mb-2">{label}</p>
      <div className="flex items-end gap-2 mb-1">
        <span className="text-3xl font-bold text-white">{current ?? "—"}</span>
        <span className="text-sm text-zinc-400 mb-1">{unit}</span>
        <div className="mb-1"><DeltaChip delta={delta} lowerIsBetter={lowerIsBetter} /></div>
      </div>
      {starting && (
        <p className="text-xs text-zinc-600">Started at {starting}{unit}</p>
      )}
      {bodyAge && (
        <div className="mt-2 pt-2 border-t border-zinc-800">
          <p className="text-xs text-zinc-400">Estimated body age: <span className="text-white font-semibold">{bodyAge} yrs</span></p>
        </div>
      )}
    </div>
  );
}
