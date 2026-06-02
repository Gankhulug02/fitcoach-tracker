import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import PageWrapper from "../layout/PageWrapper";
import GoalTrackerCard from "./GoalTrackerCard";
import RunCard from "./RunCard";
import RunEntryForm from "./RunEntryForm";
import BottomSheet from "../ui/BottomSheet";
import FilterBar from "../ui/FilterBar";
import EmptyState from "../ui/EmptyState";
import Spinner from "../ui/Spinner";
import { useRuns } from "../../hooks/useRuns";
import { DATE_FILTERS, getDateCutoff } from "../../utils/dateFilters";

const DIST_FILTERS = [
  { label: "Any dist",  value: "all" },
  { label: "< 5 km",   value: "lt5" },
  { label: "5–10 km",  value: "5to10" },
  { label: "> 10 km",  value: "gt10" },
];

export default function RunsPage() {
  const { runs, loading, fetchRuns, longestRun } = useRuns();
  const [searchParams, setSearchParams] = useSearchParams();
  const showForm = searchParams.get("log") === "1";
  const [dateFilter, setDateFilter] = useState("all");
  const [distFilter, setDistFilter] = useState("all");

  useEffect(() => { fetchRuns(); }, [fetchRuns]);

  function closeForm() {
    setSearchParams({});
    fetchRuns();
  }

  const filtered = useMemo(() => {
    const cutoff = getDateCutoff(dateFilter);
    return runs.filter((r) => {
      const dist = parseFloat(r.distance_km);
      const matchDate = !cutoff || new Date(r.date) >= cutoff;
      const matchDist =
        distFilter === "all"   ? true :
        distFilter === "lt5"   ? dist < 5 :
        distFilter === "5to10" ? dist >= 5 && dist <= 10 :
        distFilter === "gt10"  ? dist > 10 : true;
      return matchDate && matchDist;
    });
  }, [runs, dateFilter, distFilter]);

  return (
    <PageWrapper>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Runs</h1>
      </div>

      <GoalTrackerCard longestRun={longestRun} />

      <FilterBar options={DATE_FILTERS} value={dateFilter} onChange={setDateFilter} className="mb-2" />
      <FilterBar options={DIST_FILTERS} value={distFilter} onChange={setDistFilter} className="mb-4" />

      {loading ? (
        <div className="flex justify-center py-10"><Spinner size="lg" /></div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon="🏃"
          title={runs.length === 0 ? "No runs yet" : "No matching runs"}
          description={runs.length === 0 ? "Log your first run to track progress toward 21K." : "Try adjusting the filters above."}
          actionLabel={runs.length === 0 ? "Log run" : undefined}
          onAction={runs.length === 0 ? () => setSearchParams({ log: "1" }) : undefined}
        />
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((r) => <RunCard key={r.id} run={r} />)}
        </div>
      )}

      <BottomSheet open={showForm} onClose={closeForm} title="Log a run" fullHeight>
        <RunEntryForm onSaved={closeForm} />
      </BottomSheet>
    </PageWrapper>
  );
}
