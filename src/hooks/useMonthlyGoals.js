import { useState, useCallback } from "react";
import { format, startOfMonth } from "date-fns";
import { supabase } from "../lib/supabaseClient";

export function useMonthlyGoals() {
  const [monthlyGoals, setMonthlyGoals] = useState([]);

  const fetchMonthlyGoals = useCallback(async () => {
    const { data } = await supabase
      .from("monthly_goals")
      .select("*")
      .order("month", { ascending: false });
    setMonthlyGoals(data || []);
  }, []);

  // Returns goals for a given Date, falls back to null if no snapshot exists
  function getGoalsForMonth(date, fallback = null) {
    const key = format(startOfMonth(date), "yyyy-MM-dd");
    return monthlyGoals.find((g) => g.month === key) ?? fallback;
  }

  return { monthlyGoals, fetchMonthlyGoals, getGoalsForMonth };
}
