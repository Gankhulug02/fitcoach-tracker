import { useState } from "react";
import { format } from "date-fns";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useBodyStats } from "../../hooks/useBodyStats";
import toast from "react-hot-toast";

const FIELDS = [
  { key: "weight_kg",           label: "Weight (kg)",           step: "0.1", placeholder: "78.8" },
  { key: "body_fat_pct",        label: "Body fat (%)",           step: "0.1", placeholder: "22.6" },
  { key: "skeletal_muscle_pct", label: "Skeletal muscle (%)",    step: "0.1", placeholder: "43.8" },
  { key: "visceral_fat_index",  label: "Visceral fat index",     step: "1",   placeholder: "10" },
  { key: "vo2_max",             label: "VO2 Max (ml/kg/min)",    step: "0.1", placeholder: "41.6" },
  { key: "resting_hr",          label: "Resting heart rate (bpm)", step: "1", placeholder: "70" },
];

export default function BodyStatsForm({ onSaved }) {
  const { addBodyStat } = useBodyStats();
  const [form, setForm] = useState({
    logged_at: format(new Date(), "yyyy-MM-dd"),
    weight_kg: "",
    body_fat_pct: "",
    skeletal_muscle_pct: "",
    visceral_fat_index: "",
    vo2_max: "",
    resting_hr: "",
    notes: "",
  });
  const [saving, setSaving] = useState(false);

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    const payload = { logged_at: form.logged_at, notes: form.notes || null };
    FIELDS.forEach(({ key }) => {
      if (form[key] !== "") payload[key] = parseFloat(form[key]);
    });
    const { error } = await addBodyStat(payload);
    setSaving(false);
    if (!error) {
      toast.success("Stats saved!");
      onSaved?.();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input label="Date" type="date" value={form.logged_at} onChange={(e) => set("logged_at", e.target.value)} />
      {FIELDS.map(({ key, label, step, placeholder }) => (
        <Input key={key} label={label} type="number" step={step} placeholder={placeholder} value={form[key]} onChange={(e) => set(key, e.target.value)} />
      ))}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide">Notes (optional)</label>
        <textarea
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
          placeholder="Measurement conditions, notes…"
          rows={2}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-accent/60 text-sm resize-none"
        />
      </div>
      <Button type="submit" disabled={saving} className="w-full">
        {saving ? "Saving…" : "Save stats"}
      </Button>
    </form>
  );
}
