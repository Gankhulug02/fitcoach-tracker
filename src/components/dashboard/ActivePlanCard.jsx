import { useNavigate } from "react-router-dom";
import { differenceInDays, parseISO } from "date-fns";
import { ChevronRight } from "lucide-react";
import { DAYS, ACTIVITY_COLORS } from "../../constants/activities";

export default function ActivePlanCard({ plan }) {
  const navigate = useNavigate();
  if (!plan) return null;

  const sortedDays = [...(plan.plan_days || [])].sort((a, b) => a.day_of_week - b.day_of_week);
  const todayDow = (new Date().getDay() + 6) % 7;
  const todayActivity = sortedDays.find((d) => d.day_of_week === todayDow);
  const daysLeft = plan.end_date ? differenceInDays(parseISO(plan.end_date), new Date()) : null;

  return (
    <div
      className="bg-zinc-900 rounded-2xl p-4 mb-5 border border-accent/20 cursor-pointer active:scale-[0.99] transition"
      onClick={() => navigate("/plans")}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs font-semibold text-accent uppercase tracking-wide">Active plan</p>
          <h3 className="font-bold text-white">{plan.name}</h3>
        </div>
        <div className="flex items-center gap-2">
          {daysLeft !== null && (
            <span className="text-xs text-zinc-500">{daysLeft > 0 ? `${daysLeft}d left` : "Ended"}</span>
          )}
          <ChevronRight size={16} className="text-zinc-600" />
        </div>
      </div>

      {/* Weekly schedule mini-view */}
      <div className="grid grid-cols-7 gap-1 mb-3">
        {DAYS.map((day, i) => {
          const d = sortedDays.find((s) => s.day_of_week === i);
          const act = d?.activity_type ?? "Rest";
          const isToday = i === todayDow;
          return (
            <div key={day} className={`flex flex-col items-center gap-0.5 rounded-lg py-2 ${ACTIVITY_COLORS[act] || ACTIVITY_COLORS.Rest} ${isToday ? "ring-2 ring-accent/60" : ""}`}>
              <span className="text-[9px] opacity-60 font-semibold">{day}</span>
              <span className="text-[8px] font-bold text-center leading-tight">{act === "Full Body" ? "Full" : act}</span>
            </div>
          );
        })}
      </div>

      {todayActivity && todayActivity.activity_type !== "Rest" && (
        <div className="bg-zinc-800 rounded-xl px-3 py-2 flex items-center justify-between">
          <span className="text-xs text-zinc-400">Today</span>
          <span className="text-sm font-bold text-accent">{todayActivity.activity_type}</span>
        </div>
      )}
    </div>
  );
}
