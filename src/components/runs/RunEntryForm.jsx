import { useState, useMemo } from "react";
import { format } from "date-fns";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useRuns } from "../../hooks/useRuns";
import { parseDuration, formatPace } from "../../utils/paceUtils";
import toast from "react-hot-toast";

export default function RunEntryForm({ onSaved }) {
  const { addRun } = useRuns();
  const [form, setForm] = useState({
    date: format(new Date(), "yyyy-MM-dd"),
    distance_km: "",
    duration: "",
    elevation_gain_m: "",
    avg_hr: "",
    notes: "",
  });
  const [saving, setSaving] = useState(false);

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  const livePace = useMemo(() => {
    const dur = parseDuration(form.duration);
    const dist = parseFloat(form.distance_km);
    if (dur && dist > 0) return formatPace(dur / dist);
    return null;
  }, [form.duration, form.distance_km]);

  async function handleSubmit(e) {
    e.preventDefault();
    const dur = parseDuration(form.duration);
    if (!dur) { toast.error("Invalid duration format. Use MM:SS"); return; }
    const dist = parseFloat(form.distance_km);
    if (!dist || dist <= 0) { toast.error("Enter a valid distance"); return; }

    setSaving(true);
    const { error } = await addRun({
      date: form.date,
      distance_km: dist,
      duration_sec: dur,
      elevation_gain_m: form.elevation_gain_m ? parseInt(form.elevation_gain_m) : null,
      avg_hr: form.avg_hr ? parseInt(form.avg_hr) : null,
      notes: form.notes || null,
    });
    setSaving(false);
    if (!error) {
      toast.success("Run saved!");
      onSaved?.();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input label="Date" type="date" value={form.date} onChange={(e) => set("date", e.target.value)} />
      <Input label="Distance (km)" type="number" step="0.01" placeholder="5.00" value={form.distance_km} onChange={(e) => set("distance_km", e.target.value)} />
      <div className="flex flex-col gap-1">
        <Input label="Duration (MM:SS)" type="text" placeholder="25:30" value={form.duration} onChange={(e) => set("duration", e.target.value)} />
        {livePace && (
          <p className="text-xs text-accent pl-1">Pace: {livePace}</p>
        )}
      </div>
      <Input label="Elevation gain (m) — optional" type="number" placeholder="50" value={form.elevation_gain_m} onChange={(e) => set("elevation_gain_m", e.target.value)} />
      <Input label="Avg heart rate (bpm) — optional" type="number" placeholder="155" value={form.avg_hr} onChange={(e) => set("avg_hr", e.target.value)} />
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide">Notes (optional)</label>
        <textarea value={form.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Route, conditions…" rows={2}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-accent/60 text-sm resize-none" />
      </div>
      <Button type="submit" disabled={saving} className="w-full">{saving ? "Saving…" : "Save run"}</Button>
    </form>
  );
}
