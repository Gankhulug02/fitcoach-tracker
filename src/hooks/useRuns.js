import { useState, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export function useRuns() {
  const { session } = useAuth();
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRuns = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("runs")
      .select("*")
      .order("date", { ascending: false });
    if (!error) setRuns(data || []);
    setLoading(false);
  }, []);

  async function addRun(runData) {
    const tempId = crypto.randomUUID();
    const optimistic = { ...runData, id: tempId };
    setRuns((prev) => [optimistic, ...prev]);

    try {
      const { data, error } = await supabase
        .from("runs")
        .insert({
          user_id: session.user.id,
          date: runData.date,
          distance_km: runData.distance_km,
          duration_sec: runData.duration_sec,
          elevation_gain_m: runData.elevation_gain_m || null,
          avg_hr: runData.avg_hr || null,
          notes: runData.notes || null,
        })
        .select()
        .single();
      if (error) throw error;
      setRuns((prev) => prev.map((r) => (r.id === tempId ? data : r)));
      return { run: data };
    } catch (err) {
      setRuns((prev) => prev.filter((r) => r.id !== tempId));
      toast.error("Failed to save run.");
      return { error: err };
    }
  }

  async function deleteRun(id) {
    setRuns((prev) => prev.filter((r) => r.id !== id));
    const { error } = await supabase.from("runs").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete run.");
      fetchRuns();
    }
  }

  const longestRun = runs.reduce((max, r) => Math.max(max, parseFloat(r.distance_km) || 0), 0);

  const thisWeekRuns = runs.filter((r) => {
    const d = new Date(r.date);
    const now = new Date();
    const mon = new Date(now);
    mon.setDate(now.getDate() - ((now.getDay() + 6) % 7));
    mon.setHours(0, 0, 0, 0);
    return d >= mon;
  });

  return { runs, loading, fetchRuns, addRun, deleteRun, longestRun, thisWeekRuns };
}
