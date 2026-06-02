import { useState } from "react";
import { differenceInDays, format, parseISO } from "date-fns";
import { Edit2, Trash2, Play, Pause, ChevronDown, ChevronUp } from "lucide-react";
import Badge from "../ui/Badge";
import { usePlans } from "../../hooks/usePlans";
import BottomSheet from "../ui/BottomSheet";
import PlanForm from "./PlanForm";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const ACTIVITY_COLORS = {
  Rest:       "bg-zinc-700 text-zinc-500",
  Push:       "bg-blue-500/20 text-blue-300",
  Pull:       "bg-green-500/20 text-green-300",
  Legs:       "bg-yellow-500/20 text-yellow-300",
  "Full Body":"bg-accent/20 text-accent",
  Run:        "bg-orange-500/20 text-orange-300",
  Custom:     "bg-purple-500/20 text-purple-300",
};

export default function PlanCard({ plan, onRefresh }) {
  const { setActivePlan, deactivatePlan, deletePlan } = usePlans();
  const [expanded, setExpanded] = useState(plan.is_active);
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const sortedDays = [...(plan.plan_days || [])].sort((a, b) => a.day_of_week - b.day_of_week);

  const daysLeft = plan.end_date
    ? differenceInDays(parseISO(plan.end_date), new Date())
    : null;

  async function handleToggleActive() {
    if (plan.is_active) await deactivatePlan(plan.id);
    else await setActivePlan(plan.id);
    onRefresh?.();
  }

  async function handleDelete() {
    await deletePlan(plan.id);
    onRefresh?.();
  }

  // Today's activity
  const todayDow = (new Date().getDay() + 6) % 7; // 0=Mon
  const todayActivity = sortedDays.find((d) => d.day_of_week === todayDow);

  return (
    <>
      <div className={`bg-zinc-900 rounded-2xl p-4 border-2 transition ${plan.is_active ? "border-accent/40" : "border-transparent"}`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-white">{plan.name}</h3>
              {plan.is_active && <Badge variant="accent">Active</Badge>}
            </div>
            {plan.description && <p className="text-xs text-zinc-500 mt-0.5 line-clamp-1">{plan.description}</p>}
          </div>
          <button onClick={() => setExpanded((e) => !e)} className="text-zinc-500 tap-target p-1 ml-2">
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-3 text-xs text-zinc-500 mb-3">
          <span>Started {format(parseISO(plan.start_date), "MMM d, yyyy")}</span>
          {daysLeft !== null && (
            <span className={daysLeft < 7 ? "text-orange-400" : ""}>{daysLeft > 0 ? `${daysLeft}d left` : "Ended"}</span>
          )}
          {plan.is_active && todayActivity && todayActivity.activity_type !== "Rest" && (
            <span className="text-accent font-semibold">Today: {todayActivity.activity_type}</span>
          )}
        </div>

        {/* Schedule preview (collapsed: mini dots, expanded: full) */}
        {!expanded ? (
          <div className="flex gap-1 mb-3">
            {DAYS.map((day, i) => {
              const d = sortedDays.find((s) => s.day_of_week === i);
              const act = d?.activity_type ?? "Rest";
              return (
                <div key={day} className={`flex-1 h-1.5 rounded-full ${act === "Rest" ? "bg-zinc-700" : "bg-accent"}`} />
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-7 gap-1 mb-4">
            {DAYS.map((day, i) => {
              const d = sortedDays.find((s) => s.day_of_week === i);
              const act = d?.activity_type ?? "Rest";
              const isToday = i === todayDow;
              return (
                <div key={day} className={`flex flex-col items-center gap-1 rounded-xl py-2.5 px-0.5 ${ACTIVITY_COLORS[act] || ACTIVITY_COLORS.Rest} ${isToday ? "ring-2 ring-accent/60" : ""}`}>
                  <span className="text-[9px] font-bold opacity-60">{day}</span>
                  <span className="text-[8px] font-bold text-center leading-tight">{act === "Full Body" ? "Full" : act}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleActive}
            className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold transition tap-target ${
              plan.is_active ? "bg-zinc-800 text-zinc-400 hover:bg-zinc-700" : "bg-accent/10 text-accent hover:bg-accent/20"
            }`}
          >
            {plan.is_active ? <><Pause size={12} /> Deactivate</> : <><Play size={12} /> Set active</>}
          </button>
          <button onClick={() => setEditing(true)} className="bg-zinc-800 text-zinc-400 hover:text-white rounded-xl p-2.5 transition tap-target">
            <Edit2 size={14} />
          </button>
          {!confirmDelete ? (
            <button onClick={() => setConfirmDelete(true)} className="bg-zinc-800 text-zinc-400 hover:text-red-400 rounded-xl p-2.5 transition tap-target">
              <Trash2 size={14} />
            </button>
          ) : (
            <button onClick={handleDelete} className="bg-red-500/20 text-red-400 rounded-xl px-3 py-2 text-xs font-semibold tap-target">
              Confirm
            </button>
          )}
        </div>
      </div>

      <BottomSheet open={editing} onClose={() => setEditing(false)} title="Edit plan" fullHeight>
        <PlanForm editPlan={plan} onSaved={() => { setEditing(false); onRefresh?.(); }} />
      </BottomSheet>
    </>
  );
}
