import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageWrapper from "../layout/PageWrapper";
import BodyStatsForm from "./BodyStatsForm";
import StatsCard from "./StatsCard";
import TimeRangeToggle from "./TimeRangeToggle";
import BodyFatChart from "./BodyFatChart";
import VO2MaxChart from "./VO2MaxChart";
import WeightChart from "./WeightChart";
import BottomSheet from "../ui/BottomSheet";
import Spinner from "../ui/Spinner";
import EmptyState from "../ui/EmptyState";
import { useBodyStats } from "../../hooks/useBodyStats";
import { fmtNumber, fmtPct } from "../../utils/formatters";

export default function StatsPage() {
  const { stats, loading, fetchBodyStats, latestStat, firstStat, delta } = useBodyStats();
  const [range, setRange] = useState("All");
  const [rangeStart, setRangeStart] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const showForm = searchParams.get("log") === "1";

  useEffect(() => { fetchBodyStats(); }, [fetchBodyStats]);

  function closeForm() {
    setSearchParams({});
    fetchBodyStats();
  }

  const filteredStats = rangeStart
    ? stats.filter((s) => new Date(s.logged_at) >= rangeStart)
    : stats;

  return (
    <PageWrapper>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold">Body Stats</h1>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Spinner size="lg" /></div>
      ) : stats.length === 0 ? (
        <EmptyState
          icon="📊"
          title="No stats yet"
          description="Log your body composition to start tracking progress."
          actionLabel="Log stats"
          onAction={() => setSearchParams({ log: "1" })}
        />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 mb-5">
            <StatsCard
              label="Weight"
              current={fmtNumber(latestStat?.weight_kg)}
              starting={fmtNumber(firstStat?.weight_kg)}
              delta={delta("weight_kg")}
              unit=" kg"
              lowerIsBetter={false}
            />
            <StatsCard
              label="Body Fat"
              current={fmtPct(latestStat?.body_fat_pct)}
              starting={fmtPct(firstStat?.body_fat_pct)}
              delta={delta("body_fat_pct")}
              lowerIsBetter
              showBodyAge
              vo2Max={latestStat?.vo2_max}
              bodyFatPct={latestStat?.body_fat_pct}
            />
            <StatsCard
              label="VO2 Max"
              current={fmtNumber(latestStat?.vo2_max)}
              starting={fmtNumber(firstStat?.vo2_max)}
              delta={delta("vo2_max")}
              unit=" ml/kg/min"
            />
            <StatsCard
              label="Resting HR"
              current={latestStat?.resting_hr}
              starting={firstStat?.resting_hr}
              delta={delta("resting_hr")}
              unit=" bpm"
              lowerIsBetter
            />
          </div>

          <div className="mb-4">
            <TimeRangeToggle value={range} onChange={(label, start) => { setRange(label); setRangeStart(start); }} />
          </div>

          <div className="flex flex-col gap-4">
            {[
              { title: "Body Fat %", Chart: BodyFatChart },
              { title: "VO2 Max",    Chart: VO2MaxChart  },
              { title: "Weight",     Chart: WeightChart  },
            ].map(({ title, Chart }) => (
              <div key={title} className="bg-zinc-900 rounded-2xl p-4">
                <h3 className="text-sm font-semibold text-zinc-300 mb-3">{title}</h3>
                <Chart data={filteredStats} />
              </div>
            ))}
          </div>
        </>
      )}

      <BottomSheet open={showForm} onClose={closeForm} title="Log body stats" fullHeight>
        <BodyStatsForm onSaved={closeForm} />
      </BottomSheet>
    </PageWrapper>
  );
}
