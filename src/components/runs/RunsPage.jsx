import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PageWrapper from "../layout/PageWrapper";
import GoalTrackerCard from "./GoalTrackerCard";
import RunCard from "./RunCard";
import RunEntryForm from "./RunEntryForm";
import BottomSheet from "../ui/BottomSheet";
import EmptyState from "../ui/EmptyState";
import Spinner from "../ui/Spinner";
import { useRuns } from "../../hooks/useRuns";

export default function RunsPage() {
  const { runs, loading, fetchRuns, longestRun } = useRuns();
  const [searchParams, setSearchParams] = useSearchParams();
  const showForm = searchParams.get("log") === "1";

  useEffect(() => { fetchRuns(); }, [fetchRuns]);

  function closeForm() {
    setSearchParams({});
    fetchRuns();
  }

  return (
    <PageWrapper>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Runs</h1>
      </div>

      <GoalTrackerCard longestRun={longestRun} />

      {loading ? (
        <div className="flex justify-center py-10"><Spinner size="lg" /></div>
      ) : runs.length === 0 ? (
        <EmptyState
          icon="🏃"
          title="No runs yet"
          description="Log your first run to track progress toward 21K."
          actionLabel="Log run"
          onAction={() => setSearchParams({ log: "1" })}
        />
      ) : (
        <div className="flex flex-col gap-3">
          {runs.map((r) => <RunCard key={r.id} run={r} />)}
        </div>
      )}

      <BottomSheet open={showForm} onClose={closeForm} title="Log a run" fullHeight>
        <RunEntryForm onSaved={closeForm} />
      </BottomSheet>
    </PageWrapper>
  );
}
