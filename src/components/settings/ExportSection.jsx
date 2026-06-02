import { supabase } from "../../lib/supabaseClient";
import { exportToCsv } from "../../utils/csvExport";
import Button from "../ui/Button";
import toast from "react-hot-toast";

const EXPORTS = [
  { label: "Body Stats",    table: "body_stats" },
  { label: "Workouts",      table: "workouts"   },
  { label: "Workout Sets",  table: "workout_sets" },
  { label: "Runs",          table: "runs"       },
];

export default function ExportSection() {
  async function handleExport(table, label) {
    const { data, error } = await supabase.from(table).select("*");
    if (error) { toast.error("Export failed."); return; }
    exportToCsv(data, `fitcoach_${table}_${new Date().toISOString().slice(0, 10)}.csv`);
    toast.success(`Exported ${label}`);
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {EXPORTS.map(({ label, table }) => (
        <Button key={table} variant="secondary" size="sm" onClick={() => handleExport(table, label)} className="w-full">
          {label}
        </Button>
      ))}
    </div>
  );
}
