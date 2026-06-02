import { useState, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";
import toast from "react-hot-toast";

export function useBodyStats() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBodyStats = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("body_stats")
      .select("*")
      .order("logged_at", { ascending: true });
    if (!error) setStats(data || []);
    setLoading(false);
  }, []);

  async function addBodyStat(statData) {
    const tempId = crypto.randomUUID();
    const optimistic = { ...statData, id: tempId };
    setStats((prev) => [...prev, optimistic].sort((a, b) => new Date(a.logged_at) - new Date(b.logged_at)));

    try {
      const { data, error } = await supabase
        .from("body_stats")
        .insert(statData)
        .select()
        .single();
      if (error) throw error;
      setStats((prev) =>
        prev.map((s) => (s.id === tempId ? data : s))
          .sort((a, b) => new Date(a.logged_at) - new Date(b.logged_at))
      );
      return { stat: data };
    } catch (err) {
      setStats((prev) => prev.filter((s) => s.id !== tempId));
      toast.error("Failed to save stats.");
      return { error: err };
    }
  }

  const latestStat = stats.length ? stats[stats.length - 1] : null;
  const firstStat = stats.length ? stats[0] : null;

  function delta(field) {
    if (!latestStat || !firstStat || latestStat === firstStat) return null;
    const latest = parseFloat(latestStat[field]);
    const first = parseFloat(firstStat[field]);
    if (isNaN(latest) || isNaN(first)) return null;
    return Math.round((latest - first) * 10) / 10;
  }

  return { stats, loading, fetchBodyStats, addBodyStat, latestStat, firstStat, delta };
}
