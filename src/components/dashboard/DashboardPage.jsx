import { useEffect } from "react";
import PageWrapper from "../layout/PageWrapper";
import GreetingCard from "./GreetingCard";
import StatsStrip from "./StatsStrip";
import WeeklyRings from "./WeeklyRings";
import MonthlyProgress from "./MonthlyProgress";
import LastActivityCard from "./LastActivityCard";
import ActivePlanCard from "./ActivePlanCard";
import { useAuth } from "../../context/AuthContext";
import { useWorkouts } from "../../hooks/useWorkouts";
import { useRuns } from "../../hooks/useRuns";
import { useBodyStats } from "../../hooks/useBodyStats";
import { useMonthlyGoals } from "../../hooks/useMonthlyGoals";
import { usePlans } from "../../hooks/usePlans";

export default function DashboardPage() {
  const { profile } = useAuth();
  const { workouts, fetchWorkouts, thisWeekWorkouts } = useWorkouts();
  const { runs, fetchRuns, thisWeekRuns } = useRuns();
  const { stats, fetchBodyStats, latestStat } = useBodyStats();
  const { fetchMonthlyGoals, getGoalsForMonth } = useMonthlyGoals();
  const { activePlan, fetchPlans } = usePlans();

  useEffect(() => {
    fetchWorkouts();
    fetchRuns();
    fetchBodyStats();
    fetchMonthlyGoals();
    fetchPlans();
  }, [fetchWorkouts, fetchRuns, fetchBodyStats, fetchMonthlyGoals, fetchPlans]);

  const lastWorkout = workouts[0] || null;
  const lastRun = runs[0] || null;

  return (
    <PageWrapper>
      <GreetingCard name={profile?.name} />
      <StatsStrip latestStat={latestStat} />
      <WeeklyRings
        gymCount={thisWeekWorkouts.length}
        runCount={thisWeekRuns.length}
        gymTarget={profile?.weekly_gym_goal ?? 3}
        runTarget={profile?.weekly_run_goal ?? 1}
      />
      <ActivePlanCard plan={activePlan} />
      <MonthlyProgress
        workouts={workouts}
        runs={runs}
        currentGoals={profile}
        getGoalsForMonth={getGoalsForMonth}
      />
      <LastActivityCard lastWorkout={lastWorkout} lastRun={lastRun} />

      {workouts.length === 0 && runs.length === 0 && stats.length === 0 && (
        <div className="bg-zinc-900 rounded-2xl p-5 text-center">
          <p className="text-2xl mb-2">🚀</p>
          <p className="font-semibold text-white mb-1">Ready to start?</p>
          <p className="text-sm text-zinc-500">
            Tap the <span className="text-accent font-semibold">+</span> button
            to log your first workout, run, or body stats.
          </p>
        </div>
      )}
    </PageWrapper>
  );
}
