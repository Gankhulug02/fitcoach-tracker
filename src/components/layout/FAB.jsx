import { Plus, Dumbbell, Footprints, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";

const actions = [
  { label: "Body Stats", icon: Activity,   color: "bg-blue-500",  route: "/stats?log=1" },
  { label: "Run",        icon: Footprints,  color: "bg-orange-500", route: "/runs?log=1" },
  { label: "Workout",    icon: Dumbbell,    color: "bg-accent",    route: "/workouts/log" },
];

export default function FAB() {
  const { fabOpen, setFabOpen } = useApp();
  const navigate = useNavigate();

  function handleAction(route) {
    setFabOpen(false);
    navigate(route);
  }

  return (
    <>
      {fabOpen && (
        <div className="fixed inset-0 z-30" onClick={() => setFabOpen(false)} />
      )}
      <div className="fixed bottom-[5.5rem] right-4 z-40 flex flex-col items-end gap-3">
        {fabOpen && actions.map(({ label, icon: Icon, color, route }) => (
          <button
            key={label}
            onClick={() => handleAction(route)}
            className="flex items-center gap-3 tap-target"
          >
            <span className="text-sm font-semibold text-white bg-zinc-900 px-3 py-1.5 rounded-lg shadow">{label}</span>
            <div className={`${color} rounded-full p-3 shadow-lg tap-target flex items-center justify-center`}>
              <Icon size={20} className="text-zinc-950" strokeWidth={2} />
            </div>
          </button>
        ))}
        <button
          onClick={() => setFabOpen((o) => !o)}
          className="bg-accent text-zinc-950 rounded-full w-14 h-14 flex items-center justify-center shadow-xl shadow-accent/30 transition-transform active:scale-90"
        >
          <Plus size={28} strokeWidth={2.5} className={`transition-transform duration-200 ${fabOpen ? "rotate-45" : ""}`} />
        </button>
      </div>
    </>
  );
}
