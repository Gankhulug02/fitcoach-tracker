import { useState, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export function usePlans() {
  const { session } = useAuth();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPlans = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("plans")
      .select("*, plan_days(*)")
      .order("created_at", { ascending: false });
    setPlans(data || []);
    setLoading(false);
  }, []);

  async function createPlan({ name, description, start_date, end_date, schedule }) {
    // schedule: [{ day_of_week: 0..6, activity_type, notes }]
    const { data: plan, error } = await supabase
      .from("plans")
      .insert({ user_id: session.user.id, name, description, start_date, end_date })
      .select()
      .single();
    if (error) { toast.error("Failed to create plan."); return { error }; }

    const days = schedule.map((d) => ({ ...d, plan_id: plan.id }));
    const { error: dErr } = await supabase.from("plan_days").insert(days);
    if (dErr) { toast.error("Failed to save schedule."); return { error: dErr }; }

    toast.success("Plan created!");
    await fetchPlans();
    return { plan };
  }

  async function updatePlan(id, updates, newSchedule = null) {
    const { error } = await supabase.from("plans").update(updates).eq("id", id);
    if (error) { toast.error("Failed to update plan."); return { error }; }

    if (newSchedule) {
      await supabase.from("plan_days").delete().eq("plan_id", id);
      await supabase.from("plan_days").insert(newSchedule.map((d) => ({ ...d, plan_id: id })));
    }

    await fetchPlans();
    return {};
  }

  async function setActivePlan(id) {
    // Deactivate all first, then activate the selected one
    await supabase.from("plans").update({ is_active: false }).eq("user_id", session.user.id);
    await supabase.from("plans").update({ is_active: true }).eq("id", id);
    setPlans((prev) => prev.map((p) => ({ ...p, is_active: p.id === id })));
    toast.success("Plan activated!");
  }

  async function deactivatePlan(id) {
    await supabase.from("plans").update({ is_active: false }).eq("id", id);
    setPlans((prev) => prev.map((p) => p.id === id ? { ...p, is_active: false } : p));
  }

  async function deletePlan(id) {
    setPlans((prev) => prev.filter((p) => p.id !== id));
    const { error } = await supabase.from("plans").delete().eq("id", id);
    if (error) { toast.error("Failed to delete plan."); fetchPlans(); }
    else toast.success("Plan deleted.");
  }

  const activePlan = plans.find((p) => p.is_active) || null;

  return { plans, loading, fetchPlans, createPlan, updatePlan, setActivePlan, deactivatePlan, deletePlan, activePlan };
}
