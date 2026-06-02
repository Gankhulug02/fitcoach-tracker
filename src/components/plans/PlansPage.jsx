import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Plus, ChevronRight } from "lucide-react";
import PageWrapper from "../layout/PageWrapper";
import PlanCard from "./PlanCard";
import PlanForm from "./PlanForm";
import BottomSheet from "../ui/BottomSheet";
import EmptyState from "../ui/EmptyState";
import Spinner from "../ui/Spinner";
import { usePlans } from "../../hooks/usePlans";

export default function PlansPage() {
  const navigate = useNavigate();
  const { plans, loading, fetchPlans } = usePlans();
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => { fetchPlans(); }, [fetchPlans]);

  return (
    <PageWrapper>
      <div className="flex items-center gap-3 mb-5">
        <button onClick={() => navigate("/workouts")} className="text-zinc-400 hover:text-white tap-target p-1">
          <ChevronLeft size={22} />
        </button>
        <h1 className="text-2xl font-bold flex-1">Training Plans</h1>
        <button
          onClick={() => setShowCreate(true)}
          className="bg-accent text-zinc-950 rounded-xl px-4 py-2 text-sm font-bold flex items-center gap-1.5 tap-target"
        >
          <Plus size={16} /> New
        </button>
      </div>

      {/* Etoyaa 12-month plan shortcut */}
      <button
        onClick={() => navigate("/plans/etoyaa")}
        className="w-full flex items-center gap-3 bg-accent/10 border border-accent/20 rounded-2xl px-4 py-3 mb-4 text-left tap-target hover:bg-accent/15 transition"
      >
        <span className="text-xl">🏃</span>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-accent uppercase tracking-wide">12-Month Plan</p>
          <p className="text-sm font-bold text-white">Etoyaa — Half Marathon 2027</p>
        </div>
        <ChevronRight size={16} className="text-zinc-500 shrink-0" />
      </button>

      {loading ? (
        <div className="flex justify-center py-16"><Spinner size="lg" /></div>
      ) : plans.length === 0 ? (
        <EmptyState
          icon="📋"
          title="No plans yet"
          description="Create a training plan to structure your weekly workouts."
          actionLabel="Create plan"
          onAction={() => setShowCreate(true)}
        />
      ) : (
        <div className="flex flex-col gap-3">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} onRefresh={fetchPlans} />
          ))}
        </div>
      )}

      <BottomSheet open={showCreate} onClose={() => setShowCreate(false)} title="New training plan" fullHeight>
        <PlanForm onSaved={() => { setShowCreate(false); fetchPlans(); }} />
      </BottomSheet>
    </PageWrapper>
  );
}
