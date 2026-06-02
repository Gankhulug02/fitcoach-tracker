import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../layout/PageWrapper";
import WorkoutCard from "./WorkoutCard";
import FilterBar from "../ui/FilterBar";
import EmptyState from "../ui/EmptyState";
import Spinner from "../ui/Spinner";
import Button from "../ui/Button";
import { useWorkouts } from "../../hooks/useWorkouts";
import { WORKOUT_TYPES } from "../../constants/activities";
import { DATE_FILTERS, getDateCutoff } from "../../utils/dateFilters";

const TYPE_FILTERS = [
  { label: "All", value: "All" },
  ...WORKOUT_TYPES.map((t) => ({ label: t, value: t })),
];

export default function WorkoutPage() {
  const navigate = useNavigate();
  const { workouts, loading, fetchWorkouts, deleteWorkout } = useWorkouts();
  const [typeFilter, setTypeFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("all");

  useEffect(() => { fetchWorkouts(); }, [fetchWorkouts]);

  const filtered = useMemo(() => {
    const cutoff = getDateCutoff(dateFilter);
    return workouts.filter((w) => {
      const matchType = typeFilter === "All" || w.workout_type === typeFilter;
      const matchDate = !cutoff || new Date(w.date) >= cutoff;
      return matchType && matchDate;
    });
  }, [workouts, typeFilter, dateFilter]);

  return (
    <PageWrapper>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Workouts</h1>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => navigate("/plans")} size="sm">Plans</Button>
          <Button onClick={() => navigate("/workouts/log")} size="sm">+ Log</Button>
        </div>
      </div>

      <FilterBar options={TYPE_FILTERS} value={typeFilter} onChange={setTypeFilter} className="mb-2" />
      <FilterBar options={DATE_FILTERS} value={dateFilter} onChange={setDateFilter} className="mb-4" />

      {loading ? (
        <div className="flex justify-center py-16"><Spinner size="lg" /></div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon="🏋️"
          title={workouts.length === 0 ? "No workouts yet" : "No matching workouts"}
          description={workouts.length === 0 ? "Log your first session to start tracking progress." : "Try adjusting the filters above."}
          actionLabel={workouts.length === 0 ? "Log workout" : undefined}
          onAction={workouts.length === 0 ? () => navigate("/workouts/log") : undefined}
        />
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((w) => (
            <WorkoutCard
              key={w.id}
              workout={w}
              onClick={() => navigate(`/workouts/edit/${w.id}`, { state: { workout: w } })}
              onDelete={() => deleteWorkout(w.id)}
            />
          ))}
        </div>
      )}
    </PageWrapper>
  );
}
