import { useState, useEffect } from "react";
import { format, startOfMonth } from "date-fns";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabaseClient";
import Button from "../ui/Button";
import toast from "react-hot-toast";

const GOALS = [
  { key: "weekly_gym_goal",       label: "Gym sessions / week",    min: 1, max: 7,   step: 1,   unit: "sessions" },
  { key: "weekly_run_goal",       label: "Runs / week",            min: 1, max: 7,   step: 1,   unit: "runs"     },
  { key: "monthly_workout_goal",  label: "Workouts / month",       min: 1, max: 31,  step: 1,   unit: "workouts" },
  { key: "monthly_run_goal",      label: "Runs / month",           min: 1, max: 31,  step: 1,   unit: "runs"     },
  { key: "monthly_distance_goal", label: "Running distance / month", min: 5, max: 500, step: 5, unit: "km"       },
];

const DEFAULTS = {
  weekly_gym_goal: 3,
  weekly_run_goal: 3,
  monthly_workout_goal: 12,
  monthly_run_goal: 12,
  monthly_distance_goal: 50,
};

export default function GoalsSection() {
  const { profile, updateProfile } = useAuth();
  const [values, setValues] = useState(DEFAULTS);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setValues({
        weekly_gym_goal:       profile.weekly_gym_goal       ?? DEFAULTS.weekly_gym_goal,
        weekly_run_goal:       profile.weekly_run_goal       ?? DEFAULTS.weekly_run_goal,
        monthly_workout_goal:  profile.monthly_workout_goal  ?? DEFAULTS.monthly_workout_goal,
        monthly_run_goal:      profile.monthly_run_goal      ?? DEFAULTS.monthly_run_goal,
        monthly_distance_goal: profile.monthly_distance_goal ?? DEFAULTS.monthly_distance_goal,
      });
    }
  }, [profile]);

  async function handleSave() {
    setSaving(true);
    // 1. Save to user profile (current goals)
    const { error } = await updateProfile(values);

    // 2. Snapshot goals for the current month
    const monthKey = format(startOfMonth(new Date()), "yyyy-MM-dd");
    await supabase.from("monthly_goals").upsert(
      { ...values, month: monthKey },
      { onConflict: "user_id,month" }
    );

    setSaving(false);
    if (!error) toast.success("Goals saved!");
    else toast.error("Failed to save goals.");
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-3">Weekly</p>
        <div className="flex flex-col gap-4">
          {GOALS.filter(g => g.key.startsWith("weekly")).map(({ key, label, min, max, step, unit }) => (
            <GoalSlider
              key={key}
              label={label}
              value={values[key]}
              min={min}
              max={max}
              step={step}
              unit={unit}
              onChange={(v) => setValues(prev => ({ ...prev, [key]: v }))}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-3">Monthly</p>
        <div className="flex flex-col gap-4">
          {GOALS.filter(g => g.key.startsWith("monthly")).map(({ key, label, min, max, step, unit }) => (
            <GoalSlider
              key={key}
              label={label}
              value={values[key]}
              min={min}
              max={max}
              step={step}
              unit={unit}
              onChange={(v) => setValues(prev => ({ ...prev, [key]: v }))}
            />
          ))}
        </div>
      </div>

      <Button onClick={handleSave} disabled={saving} className="w-full">
        {saving ? "Saving…" : "Save goals"}
      </Button>
    </div>
  );
}

function GoalSlider({ label, value, min, max, step, unit, onChange }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm text-zinc-300">{label}</span>
        <span className="text-sm font-bold text-accent">{value} <span className="text-zinc-500 font-normal text-xs">{unit}</span></span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(step < 1 ? parseFloat(e.target.value) : parseInt(e.target.value))}
        className="w-full h-2 bg-zinc-700 rounded-full appearance-none cursor-pointer accent-accent"
      />
      <div className="flex justify-between text-xs text-zinc-600 mt-1">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
