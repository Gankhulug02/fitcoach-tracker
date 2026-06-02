import { useState } from "react";
import { Footprints, ChevronDown, ChevronUp } from "lucide-react";
import { fmtDateFull } from "../../utils/formatters";
import { formatPace, formatDuration } from "../../utils/paceUtils";

export default function RunCard({ run }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-zinc-900 rounded-2xl p-4">
      <div className="flex items-center gap-3" onClick={() => setExpanded((e) => !e)}>
        <div className="bg-zinc-800 rounded-xl p-3 flex-shrink-0">
          <Footprints size={20} className="text-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">{parseFloat(run.distance_km).toFixed(2)} km</span>
            <span className="text-xs text-zinc-500">·</span>
            <span className="text-sm text-zinc-300">{formatPace(run.avg_pace_sec_per_km)}</span>
          </div>
          <div className="text-xs text-zinc-500 flex items-center gap-2 mt-0.5">
            <span>{fmtDateFull(run.date)}</span>
            <span>·</span>
            <span>{formatDuration(run.duration_sec)}</span>
            {run.elevation_gain_m && <span>· ↑{run.elevation_gain_m}m</span>}
          </div>
        </div>
        <button className="text-zinc-500 tap-target p-1">
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {expanded && (
        <div className="mt-3 pt-3 border-t border-zinc-800 grid grid-cols-2 gap-2 text-sm">
          {run.avg_hr && (
            <div>
              <p className="text-xs text-zinc-500">Avg HR</p>
              <p className="font-semibold text-white">{run.avg_hr} bpm</p>
            </div>
          )}
          {run.elevation_gain_m && (
            <div>
              <p className="text-xs text-zinc-500">Elevation</p>
              <p className="font-semibold text-white">{run.elevation_gain_m} m</p>
            </div>
          )}
          {run.notes && (
            <div className="col-span-2">
              <p className="text-xs text-zinc-500">Notes</p>
              <p className="text-sm text-zinc-300">{run.notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
