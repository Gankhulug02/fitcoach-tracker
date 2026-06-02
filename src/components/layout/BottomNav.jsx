import { NavLink } from "react-router-dom";
import { LayoutDashboard, Dumbbell, Footprints, BarChart2, Settings } from "lucide-react";

const tabs = [
  { to: "/",        icon: LayoutDashboard, label: "Home"     },
  { to: "/workouts",icon: Dumbbell,        label: "Workouts" },
  { to: "/runs",    icon: Footprints,      label: "Runs"     },
  { to: "/stats",   icon: BarChart2,       label: "Stats"    },
  { to: "/settings",icon: Settings,        label: "Settings" },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/90 backdrop-blur border-t border-zinc-800">
      <div className="max-w-lg mx-auto flex">
        {tabs.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center justify-center gap-0.5 py-3 tap-target transition-colors ${
                isActive ? "text-accent" : "text-zinc-500 hover:text-zinc-300"
              }`
            }
          >
            <Icon size={22} strokeWidth={1.8} />
            <span className="text-[10px] font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
