import { useState } from "react";
import { format } from "date-fns";
import Input from "../ui/Input";
import Button from "../ui/Button";
import PlanScheduleEditor, { defaultSchedule } from "./PlanScheduleEditor";
import { usePlans } from "../../hooks/usePlans";

export default function PlanForm({ onSaved, editPlan = null }) {
  const { createPlan, updatePlan } = usePlans();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: editPlan?.name ?? "",
    description: editPlan?.description ?? "",
    start_date: editPlan?.start_date ?? format(new Date(), "yyyy-MM-dd"),
    end_date: editPlan?.end_date ?? "",
  });
  const [schedule, setSchedule] = useState(() => {
    if (editPlan?.plan_days?.length) {
      const sorted = [...editPlan.plan_days].sort((a, b) => a.day_of_week - b.day_of_week);
      return sorted.map((d) => ({ day_of_week: d.day_of_week, activity_type: d.activity_type, notes: d.notes || "" }));
    }
    return defaultSchedule();
  });

  function set(field, value) { setForm((f) => ({ ...f, [field]: value })); }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSaving(true);
    if (editPlan) {
      await updatePlan(editPlan.id, { name: form.name, description: form.description, start_date: form.start_date, end_date: form.end_date || null }, schedule);
    } else {
      await createPlan({ ...form, end_date: form.end_date || null, schedule });
    }
    setSaving(false);
    onSaved?.();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Input label="Plan name" placeholder="e.g. PPL Program, 12-Week Half Marathon" value={form.name} onChange={(e) => set("name", e.target.value)} />
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide">Description (optional)</label>
        <textarea
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Goals, notes about this program…"
          rows={2}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-accent/60 text-sm resize-none"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input label="Start date" type="date" value={form.start_date} onChange={(e) => set("start_date", e.target.value)} />
        <Input label="End date (optional)" type="date" value={form.end_date} onChange={(e) => set("end_date", e.target.value)} />
      </div>
      <PlanScheduleEditor schedule={schedule} onChange={setSchedule} />
      <Button type="submit" disabled={saving || !form.name.trim()} className="w-full">
        {saving ? "Saving…" : editPlan ? "Update plan" : "Create plan"}
      </Button>
    </form>
  );
}
