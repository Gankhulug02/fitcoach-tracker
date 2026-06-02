import { useState, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";
import { detectPRs } from "../utils/prDetection";
import toast from "react-hot-toast";

export function useWorkouts() {
  const { session } = useAuth();
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWorkouts = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("workouts")
      .select("*, workout_sets(*)")
      .order("date", { ascending: false });
    if (!error) setWorkouts(data || []);
    setLoading(false);
  }, []);

  async function saveWorkout(workoutData, sets) {
    const tempId = crypto.randomUUID();
    const optimistic = { ...workoutData, id: tempId, workout_sets: sets };
    setWorkouts((prev) => [optimistic, ...prev]);

    try {
      const { data: savedWorkout, error: wErr } = await supabase
        .from("workouts")
        .insert({
          user_id: session.user.id,
          date: workoutData.date,
          workout_type: workoutData.workout_type,
          duration_min: workoutData.duration_min,
          notes: workoutData.notes,
        })
        .select()
        .single();
      if (wErr) throw wErr;

      const setsToInsert = sets.map((s) => ({ ...s, workout_id: savedWorkout.id }));
      const { error: sErr } = await supabase.from("workout_sets").insert(setsToInsert);
      if (sErr) throw sErr;

      // PR detection
      const { data: allSets } = await supabase
        .from("workout_sets")
        .select("*")
        .not("workout_id", "eq", savedWorkout.id);
      const prs = detectPRs(sets, allSets || []);

      const saved = { ...savedWorkout, workout_sets: sets };
      setWorkouts((prev) => prev.map((w) => (w.id === tempId ? saved : w)));
      return { workout: saved, prs };
    } catch (err) {
      setWorkouts((prev) => prev.filter((w) => w.id !== tempId));
      toast.error("Failed to save workout.");
      return { error: err };
    }
  }

  async function deleteWorkout(id) {
    setWorkouts((prev) => prev.filter((w) => w.id !== id));
    const { error } = await supabase.from("workouts").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete workout.");
      fetchWorkouts();
    }
  }

  const thisWeekWorkouts = workouts.filter((w) => {
    const d = new Date(w.date);
    const now = new Date();
    const mon = new Date(now);
    mon.setDate(now.getDate() - ((now.getDay() + 6) % 7));
    mon.setHours(0, 0, 0, 0);
    return d >= mon;
  });

  return { workouts, loading, fetchWorkouts, saveWorkout, deleteWorkout, thisWeekWorkouts };
}
