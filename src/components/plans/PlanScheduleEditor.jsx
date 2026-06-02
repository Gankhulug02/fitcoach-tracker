import { DAYS, ACTIVITIES, ACTIVITY_COLORS } from "../../constants/activities";

export default function PlanScheduleEditor({ schedule, onChange }) {
  function cycle(dayIndex) {
    const current = schedule[dayIndex].activity_type;
    const next = ACTIVITIES[(ACTIVITIES.indexOf(current) + 1) % ACTIVITIES.length];
    const updated = schedule.map((d, i) => i === dayIndex ? { ...d, activity_type: next } : d);
    onChange(updated);
  }

  return (
    <div>
      <p className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-3">Weekly schedule <span className="normal-case text-zinc-600 font-normal">(tap to change)</span></p>
      <div className="grid grid-cols-7 gap-1.5">
        {DAYS.map((day, i) => {
          const activity = schedule[i]?.activity_type ?? "Rest";
          return (
            <button
              type="button"
              key={day}
              onClick={() => cycle(i)}
              className={`flex flex-col items-center gap-1 rounded-xl py-2.5 px-1 transition active:scale-95 ${ACTIVITY_COLORS[activity] || ACTIVITY_COLORS.Rest}`}
            >
              <span className="text-[10px] font-semibold opacity-70">{day}</span>
              <span className="text-[9px] font-bold text-center leading-tight">{activity === "Full Body" ? "Full" : activity}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function defaultSchedule() {
  return Array.from({ length: 7 }, (_, i) => ({
    day_of_week: i,
    activity_type: i < 5 ? "Rest" : "Rest",
    notes: "",
  }));
}
