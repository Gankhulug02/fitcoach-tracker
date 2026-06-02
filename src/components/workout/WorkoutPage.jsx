import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../layout/PageWrapper";
import WorkoutCard from "./WorkoutCard";
import EmptyState from "../ui/EmptyState";
import Spinner from "../ui/Spinner";
import Button from "../ui/Button";
import { useWorkouts } from "../../hooks/useWorkouts";

export default function WorkoutPage() {
  const navigate = useNavigate();
  const { workouts, loading, fetchWorkouts } = useWorkouts();

  useEffect(() => { fetchWorkouts(); }, [fetchWorkouts]);

  return (
    <PageWrapper>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold">Workouts</h1>
        <Button onClick={() => navigate("/workouts/log")} size="sm">+ Log</Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Spinner size="lg" /></div>
      ) : workouts.length === 0 ? (
        <EmptyState
          icon="🏋️"
          title="No workouts yet"
          description="Log your first session to start tracking progress."
          actionLabel="Log workout"
          onAction={() => navigate("/workouts/log")}
        />
      ) : (
        <div className="flex flex-col gap-3">
          {workouts.map((w) => <WorkoutCard key={w.id} workout={w} />)}
        </div>
      )}
    </PageWrapper>
  );
}
