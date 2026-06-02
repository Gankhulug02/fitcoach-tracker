import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, AlertTriangle, Target, Zap, ChevronDown, ChevronUp } from "lucide-react";
import PageWrapper from "../layout/PageWrapper";

// ─── Data ────────────────────────────────────────────────────────────────────

const STATS = [
  { label: "Weight", current: "78.8 kg", target: "72–74 kg" },
  { label: "Body Fat", current: "22.6%", target: "15%" },
  { label: "VO₂ Max", current: "41.6", target: "48+" },
  { label: "Resting HR", current: "70 BPM", target: "<60 BPM" },
];

const INJURIES = [
  { title: "Shoulder (Latarjet, ~1 yr post-op)", text: "No overhead press, dips, skull crushers, or overhead tricep extensions. Face pulls every Pull session — non-negotiable." },
  { title: "Ankle sprain (current)", text: "No barbell squats, lunges, box jumps, or standing plyometrics. Leg press replaces squats. Seated calf raises only." },
];

const NUTRITION = [
  { label: "Calories", value: "2,200–2,300 kcal/day" },
  { label: "Protein", value: "140–155 g/day" },
  { label: "Carbs", value: "220–250 g/day" },
  { label: "Fat", value: "60–70 g/day" },
];

const PHASES = [
  {
    id: 1, label: "Phase 1", title: "Foundation", months: "Jun–Jul 2026",
    goal: "Establish movement patterns, shoulder-safe pressing habits, and aerobic base. Body recomp begins.",
    changes: null,
    push: [
      ["Flat DB Bench Press",     "4 × 8–10",  "90s", "Elbows at 45°, controlled descent"],
      ["Incline DB Press (30°)",  "3 × 10–12", "90s", "Low incline protects shoulder"],
      ["Cable Chest Fly",         "3 × 12–15", "60s", "Full stretch, squeeze at peak"],
      ["DB Lateral Raise",        "3 × 15",    "60s", "Light weight, stop at shoulder height"],
      ["Cable Tricep Pushdown",   "3 × 12–15", "60s", "Elbows pinned at sides"],
      ["DB Tricep Kickback",      "3 × 12",    "60s", "Replaces overhead extension"],
    ],
    pull: [
      ["Lat Pulldown (wide grip)", "4 × 8–10",  "90s", "Pull to upper chest, don't lean back"],
      ["Seated Cable Row",         "4 × 10–12", "90s", "Chest up, full stretch forward"],
      ["Single-arm DB Row",        "3 × 10–12", "90s", "Brace on bench, big pull"],
      ["Face Pulls (cable) 🔑",    "3 × 15",    "60s", "Essential for shoulder health"],
      ["DB Hammer Curl",           "3 × 10–12", "60s", "Neutral grip, no swinging"],
      ["Rear Delt Fly",            "3 × 15",    "60s", "Light, squeeze shoulder blades"],
    ],
    legs: [
      ["Leg Press",          "4 × 10–12", "90s", "Full ROM, don't lock knees"],
      ["Romanian Deadlift",  "4 × 8–10",  "90s", "Hinge hips, soft knee, feel hamstrings"],
      ["Leg Extension",      "3 × 12–15", "60s", "Controlled, no jerking"],
      ["Lying Leg Curl",     "3 × 12–15", "60s", "Full extension at bottom"],
      ["Hip Thrust",         "3 × 12–15", "60s", "Drive heels, squeeze glutes at top"],
      ["Seated Calf Raise",  "3 × 15–20", "60s", "Seated only — ankle safe"],
    ],
    runs: [
      ["Tuesday", "Easy Run",   "5–6 km",  "~7:30–8:00/km", "Zone 2, aerobic base"],
      ["Thursday", "Tempo Run", "4–5 km",  "~6:15–6:30/km", "VO₂ max stimulus"],
      ["Saturday", "Long Run",  "10–11 km","~7:00–7:30/km", "Endurance base"],
    ],
    mileage: "~19–22 km/week",
  },
  {
    id: 2, label: "Phase 2", title: "Build", months: "Aug–Sep 2026",
    goal: "Add load to compounds, increase running volume, start seeing body composition shift.",
    changes: [
      "Add 2.5–5 kg to all compound lifts",
      "Add 1 set to Bench Press (5 × 8–10) and Leg Press (5 × 10–12)",
      "Introduce Pull-ups / Assisted Pull-ups — replace lat pulldown 2× per month",
    ],
    push: [
      ["Flat DB Bench Press",    "5 × 8–10",  "90s", "+2.5 kg from Phase 1"],
      ["Incline DB Press (30°)", "3 × 10–12", "90s", "—"],
      ["Cable Chest Fly",        "3 × 12–15", "60s", "—"],
      ["DB Lateral Raise",       "4 × 15",    "60s", "Add 1 set"],
      ["Cable Tricep Pushdown",  "3 × 12–15", "60s", "—"],
      ["DB Tricep Kickback",     "3 × 12",    "60s", "—"],
    ],
    pull: [
      ["Pull-ups / Lat Pulldown", "4 × 6–8",  "90s", "Use assist machine if needed"],
      ["Seated Cable Row",        "4 × 10–12", "90s", "+2.5–5 kg from Phase 1"],
      ["Single-arm DB Row",       "4 × 10–12", "90s", "Add 1 set"],
      ["Face Pulls (cable) 🔑",   "3 × 15",    "60s", "Keep every session"],
      ["DB Hammer Curl",          "3 × 10–12", "60s", "—"],
      ["Rear Delt Fly",           "3 × 15",    "60s", "—"],
    ],
    legs: [
      ["Leg Press",         "5 × 10–12", "90s", "+10 kg from Phase 1"],
      ["Romanian Deadlift", "4 × 8–10",  "90s", "+5 kg from Phase 1"],
      ["Leg Extension",     "3 × 12–15", "60s", "—"],
      ["Lying Leg Curl",    "3 × 12–15", "60s", "—"],
      ["Hip Thrust",        "4 × 12–15", "60s", "Add 1 set, add load if comfortable"],
      ["Seated Calf Raise", "3 × 15–20", "60s", "—"],
    ],
    runs: [
      ["Tuesday", "Easy Run",   "6–7 km",   "~7:15–7:45/km", "Zone 2"],
      ["Thursday", "Tempo Run", "5–6 km",   "~6:00–6:20/km", "Push VO₂ max toward 45"],
      ["Saturday", "Long Run",  "12–14 km", "~7:00–7:30/km", "Approaching 21K base"],
    ],
    mileage: "~23–27 km/week",
  },
  {
    id: 3, label: "Phase 3", title: "Strength + Run Base", months: "Oct–Nov 2026",
    goal: "Peak gym strength phase. Consolidate running to 3×/week with long run building to 16 km.",
    changes: [
      "Shift Push/Pull compounds to 5 × 5 (heavier, lower reps) for 4 weeks, then deload",
      "If ankle is healed: introduce Goblet Squat (lighter, controlled) to assess",
      "Add 1 bodyweight finisher at end of each gym session",
    ],
    push: [
      ["Flat DB Bench Press",    "5 × 5",     "2 min", "Heavy — leave 1 rep in tank"],
      ["Incline DB Press (30°)", "3 × 8–10",  "90s",   "Slightly heavier than Phase 2"],
      ["Cable Chest Fly",        "3 × 12–15", "60s",   "—"],
      ["DB Lateral Raise",       "4 × 15",    "60s",   "—"],
      ["Cable Tricep Pushdown",  "3 × 10–12", "60s",   "Heavier — drop reps"],
      ["DB Tricep Kickback",     "3 × 12",    "60s",   "—"],
      ["Plank",                  "3 × 45 sec","30s",   "Core finisher"],
    ],
    pull: [
      ["Pull-ups",             "5 × 5",     "2 min", "Add weight if bodyweight is easy"],
      ["Seated Cable Row",     "5 × 5",     "2 min", "Heavy, full ROM"],
      ["Single-arm DB Row",    "3 × 10–12", "90s",   "—"],
      ["Face Pulls (cable) 🔑","3 × 15",    "60s",   "Non-negotiable"],
      ["DB Hammer Curl",       "3 × 10–12", "60s",   "—"],
      ["Rear Delt Fly",        "3 × 15",    "60s",   "—"],
      ["Dead Bug",             "3 × 10/side","30s",  "Core finisher"],
    ],
    legs: [
      ["Leg Press",                      "5 × 6–8",   "2 min", "Heavy"],
      ["Romanian Deadlift",              "5 × 5",     "2 min", "Heavy hinge"],
      ["Goblet Squat (if ankle OK)",     "3 × 10",    "90s",   "Light, assess ankle"],
      ["Leg Extension",                  "3 × 12–15", "60s",   "—"],
      ["Lying Leg Curl",                 "3 × 12–15", "60s",   "—"],
      ["Hip Thrust",                     "4 × 10–12", "60s",   "Heavy, drive glutes"],
      ["Seated Calf Raise",              "3 × 15–20", "60s",   "—"],
    ],
    runs: [
      ["Tuesday", "Easy Run",     "7–8 km",  "~7:00–7:30/km",          "Zone 2"],
      ["Thursday", "Intervals",   "6×800m",  "~5:45/km + warm-up/cool", "VO₂ max boost"],
      ["Saturday", "Long Run",    "14–16 km","~7:00–7:30/km",           "Half marathon base"],
    ],
    mileage: "~28–34 km/week",
  },
  {
    id: 4, label: "Phase 4", title: "Endurance Build", months: "Dec 2026–Feb 2027",
    goal: "Shift priority to half marathon training. Maintain gym gains — volume drops, quality stays. Long run reaches 18–19 km.",
    changes: [
      "Gym drops to 3 × 8–10 (maintenance volume)",
      "Running becomes primary focus — 3 runs + optional 4th easy run",
      "Track VO₂ max monthly — target 45+ by Feb 2027",
    ],
    push: [
      ["Flat DB Bench Press",    "3 × 8–10",  "90s", "—"],
      ["Incline DB Press",       "3 × 10–12", "90s", "—"],
      ["Cable Chest Fly",        "3 × 12–15", "60s", "—"],
      ["DB Lateral Raise",       "3 × 15",    "60s", "—"],
      ["Cable Tricep Pushdown",  "3 × 12–15", "60s", "—"],
    ],
    pull: [
      ["Pull-ups",           "3 × 6–8",   "90s", "—"],
      ["Seated Cable Row",   "3 × 10–12", "90s", "—"],
      ["Face Pulls 🔑",      "3 × 15",    "60s", "—"],
      ["DB Hammer Curl",     "3 × 10–12", "60s", "—"],
      ["Rear Delt Fly",      "3 × 15",    "60s", "—"],
    ],
    legs: [
      ["Leg Press",         "3 × 10–12", "90s", "—"],
      ["Romanian Deadlift", "3 × 10–12", "90s", "—"],
      ["Leg Extension",     "3 × 12–15", "60s", "—"],
      ["Lying Leg Curl",    "3 × 12–15", "60s", "—"],
      ["Hip Thrust",        "3 × 12–15", "60s", "—"],
    ],
    runs: [
      ["Tuesday",  "Easy Run",        "8–9 km",   "~7:00/km",      "Zone 2"],
      ["Thursday", "Tempo Run",       "7–8 km",   "~6:00/km",      "Lactate threshold"],
      ["Saturday", "Long Run",        "16–19 km", "~7:00–7:30/km", "Half marathon prep"],
      ["Sunday",   "Optional Easy",   "5–6 km",   "Very easy",     "Active recovery"],
    ],
    mileage: "~32–42 km/week",
  },
  {
    id: 5, label: "Phase 5", title: "Race Prep + Taper", months: "Mar–May 2027",
    goal: "Peak for 21K in June 2027. Two quality runs per week. Long run peaks at 19–20 km in April. Taper May.",
    changes: [
      "Drop Legs day — keep Push + Pull only (2×/week)",
      "Running is the priority — everything else supports it",
    ],
    push: [
      ["Flat DB Bench Press",   "3 × 10–12", "90s", "—"],
      ["Incline DB Press",      "3 × 10–12", "90s", "—"],
      ["DB Lateral Raise",      "3 × 10–12", "60s", "—"],
      ["Cable Tricep Pushdown", "3 × 10–12", "60s", "—"],
    ],
    pull: [
      ["Pull-ups",         "3 × 10–12", "90s", "—"],
      ["Cable Row",        "3 × 10–12", "90s", "—"],
      ["Face Pulls 🔑",    "3 × 10–12", "60s", "—"],
      ["DB Hammer Curl",   "3 × 10–12", "60s", "—"],
    ],
    legs: null,
    runs: [
      ["March",       "Long Run",  "19 km",            "—",            "38–42 km/week"],
      ["April",       "Long Run",  "20 km (peak)",      "—",            "40–44 km/week"],
      ["May (Taper)", "Long Run",  "15 → 12 → 8 km",  "—",            "30 → 22 → 16 km"],
      ["June (Race)", "RACE 🏁",   "21.1 km",           "6:30–7:00/km", "Finish ~2:17–2:28"],
    ],
    mileage: "~38–44 km/week (peak)",
  },
];

const OVERLOAD_RULES = [
  "Compound lifts: Add 2.5 kg when you complete ALL sets at top rep range for 2 consecutive sessions.",
  "Isolation exercises: Add 1 rep per session before adding weight.",
  "Running: Never increase weekly mileage by more than 10% per week.",
  "Long run: Add no more than 1.5 km every 2 weeks.",
  "Deload: Every 6 weeks, reduce gym volume by 40% for 1 week. Keep running easy.",
];

const MONTHLY_MILEAGE = [
  ["Jun 2026", "10–11 km", "19–22 km"],
  ["Jul 2026", "11–12 km", "21–24 km"],
  ["Aug 2026", "12–13 km", "23–26 km"],
  ["Sep 2026", "13–14 km", "25–28 km"],
  ["Oct 2026", "14–15 km", "28–32 km"],
  ["Nov 2026", "15–16 km", "30–34 km"],
  ["Dec 2026", "16–17 km", "32–37 km"],
  ["Jan 2027", "17–18 km", "35–40 km"],
  ["Feb 2027", "18–19 km", "37–42 km"],
  ["Mar 2027", "19 km",    "38–43 km"],
  ["Apr 2027", "20 km ★",  "40–44 km"],
  ["May 2027", "Taper",    "30 → 16 km"],
  ["Jun 2027", "RACE 🏁",  "21.1 km"],
];

const CHECKPOINTS = [
  { month: "Month 3", date: "Aug 2026", bf: "~20.5%", vo2: "43+" },
  { month: "Month 6", date: "Nov 2026", bf: "~18.5%", vo2: "45+" },
  { month: "Month 9", date: "Feb 2027", bf: "~16.5%", vo2: "46+" },
  { month: "Race Day", date: "Jun 2027", bf: "~15%",  vo2: "48+" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">{children}</p>;
}

function Card({ children, className = "" }) {
  return <div className={`bg-zinc-900 rounded-2xl p-4 ${className}`}>{children}</div>;
}

function WorkoutTable({ rows }) {
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-xs min-w-[420px]">
        <thead>
          <tr className="text-zinc-500">
            <th className="text-left pb-2 pr-2 font-semibold">Exercise</th>
            <th className="text-center pb-2 px-1 font-semibold whitespace-nowrap">Sets × Reps</th>
            <th className="text-center pb-2 px-1 font-semibold">Rest</th>
            <th className="text-left pb-2 pl-2 font-semibold">Notes</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {rows.map(([name, sets, rest, note], i) => (
            <tr key={i} className="text-zinc-300">
              <td className="py-2 pr-2 font-medium leading-snug">{name}</td>
              <td className="py-2 px-1 text-center text-accent font-bold whitespace-nowrap">{sets}</td>
              <td className="py-2 px-1 text-center text-zinc-500 whitespace-nowrap">{rest}</td>
              <td className="py-2 pl-2 text-zinc-500 leading-snug">{note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RunTable({ rows, isPhase5 }) {
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-xs min-w-[360px]">
        <thead>
          <tr className="text-zinc-500">
            <th className="text-left pb-2 pr-2 font-semibold">{isPhase5 ? "Month" : "Day"}</th>
            <th className="text-left pb-2 pr-2 font-semibold">Type</th>
            <th className="text-center pb-2 px-1 font-semibold">Distance</th>
            <th className="text-center pb-2 px-1 font-semibold">Pace</th>
            <th className="text-left pb-2 pl-2 font-semibold">Purpose</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {rows.map(([day, type, dist, pace, purpose], i) => (
            <tr key={i} className="text-zinc-300">
              <td className="py-2 pr-2 font-semibold text-zinc-400 whitespace-nowrap">{day}</td>
              <td className="py-2 pr-2 font-medium">{type}</td>
              <td className="py-2 px-1 text-center text-orange-300 font-bold whitespace-nowrap">{dist}</td>
              <td className="py-2 px-1 text-center text-zinc-500 whitespace-nowrap">{pace}</td>
              <td className="py-2 pl-2 text-zinc-500 leading-snug">{purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Collapsible({ title, accent = false, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-zinc-800/50 rounded-xl overflow-hidden">
      <button
        type="button"
        className="w-full flex items-center justify-between px-4 py-3 text-left"
        onClick={() => setOpen((o) => !o)}
      >
        <span className={`text-sm font-bold ${accent ? "text-accent" : "text-white"}`}>{title}</span>
        {open ? <ChevronUp size={14} className="text-zinc-500 shrink-0" /> : <ChevronDown size={14} className="text-zinc-500 shrink-0" />}
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

function PhaseCard({ phase }) {
  const phaseColors = [
    "from-blue-500/20 to-blue-500/5 border-blue-500/20",
    "from-green-500/20 to-green-500/5 border-green-500/20",
    "from-yellow-500/20 to-yellow-500/5 border-yellow-500/20",
    "from-orange-500/20 to-orange-500/5 border-orange-500/20",
    "from-accent/20 to-accent/5 border-accent/30",
  ];
  const gradient = phaseColors[phase.id - 1];

  return (
    <div className={`bg-gradient-to-br ${gradient} border rounded-2xl p-4 mb-3`}>
      {/* Phase header */}
      <div className="flex items-start justify-between mb-1">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{phase.label}</span>
            <span className="text-[10px] text-zinc-500">{phase.months}</span>
          </div>
          <h3 className="text-base font-bold text-white">{phase.title}</h3>
        </div>
        <span className="text-lg font-black text-zinc-700">P{phase.id}</span>
      </div>

      <p className="text-xs text-zinc-400 leading-relaxed mb-3">{phase.goal}</p>

      {phase.changes && (
        <div className="mb-3">
          <SectionLabel>Changes from previous phase</SectionLabel>
          <ul className="space-y-1">
            {phase.changes.map((c, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs text-zinc-300">
                <span className="text-accent mt-0.5 shrink-0">›</span>{c}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Collapsible title="💪 Push — Chest · Shoulders · Triceps" defaultOpen={phase.id === 1}>
          <WorkoutTable rows={phase.push} />
        </Collapsible>

        <Collapsible title="🤜 Pull — Back · Biceps · Rear Delts">
          <WorkoutTable rows={phase.pull} />
        </Collapsible>

        {phase.legs ? (
          <Collapsible title="🦵 Legs — Quads · Hams · Glutes">
            <WorkoutTable rows={phase.legs} />
          </Collapsible>
        ) : (
          <div className="bg-zinc-800/50 rounded-xl px-4 py-3 text-xs text-zinc-500 italic">
            No Legs day in this phase — upper body maintenance only.
          </div>
        )}

        <Collapsible title={`🏃 Running — ${phase.mileage}`}>
          <RunTable rows={phase.runs} isPhase5={phase.id === 5} />
        </Collapsible>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function EtoyaaPlanPage() {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      {/* Back */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-zinc-400 hover:text-white text-sm mb-4 tap-target"
      >
        <ChevronLeft size={16} /> Plans
      </button>

      {/* Hero */}
      <div className="mb-5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-1">12-Month Training Plan</p>
        <h1 className="text-2xl font-black text-white mb-0.5">Etoyaa</h1>
        <p className="text-xs text-zinc-500">22M · Darhan, Mongolia · June 2026 – June 2027</p>
        <p className="text-xs text-zinc-500 mt-0.5">Strava: Etoyaa 02 · Adidas Evo SL</p>
      </div>

      {/* Stats & Goals */}
      <div className="mb-5">
        <SectionLabel>Stats & Goals</SectionLabel>
        <div className="grid grid-cols-2 gap-2">
          {STATS.map(({ label, current, target }) => (
            <Card key={label} className="flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-wide text-zinc-500">{label}</span>
              <div className="flex items-baseline justify-between gap-1">
                <span className="text-base font-black text-white">{current}</span>
                <span className="flex items-center gap-0.5 text-[11px] text-accent font-semibold">
                  <Target size={10} />{target}
                </span>
              </div>
            </Card>
          ))}
        </div>
        <Card className="mt-2 flex items-center gap-3">
          <Zap size={18} className="text-accent shrink-0" />
          <div>
            <p className="text-xs font-bold text-white">Half Marathon Goal</p>
            <p className="text-xs text-zinc-400">June 2027 · Target 6:30–7:00/km · Finish ~2:17–2:28</p>
          </div>
        </Card>
      </div>

      {/* Injury Flags */}
      <div className="mb-5">
        <SectionLabel>Injury Flags</SectionLabel>
        <div className="flex flex-col gap-2">
          {INJURIES.map(({ title, text }) => (
            <div key={title} className="bg-red-500/10 border border-red-500/20 rounded-2xl p-3 flex gap-3">
              <AlertTriangle size={15} className="text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-red-300 mb-0.5">{title}</p>
                <p className="text-xs text-zinc-400 leading-relaxed">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nutrition */}
      <div className="mb-5">
        <SectionLabel>Nutrition Targets (all phases)</SectionLabel>
        <Card>
          <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-3">
            {NUTRITION.map(({ label, value }) => (
              <div key={label}>
                <p className="text-[10px] font-bold uppercase tracking-wide text-zinc-500 mb-0.5">{label}</p>
                <p className="text-sm font-bold text-white">{value}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-zinc-800 pt-3 space-y-1.5">
            {[
              "Hit protein first — everything else follows.",
              "Eat 30–40 g protein within 1 hour post-workout.",
              "Pre-run: light carbs 60–90 min before (banana, rice, oats).",
              "Don't crash below 1,800 kcal on heavy training days.",
            ].map((rule, i) => (
              <p key={i} className="flex items-start gap-1.5 text-xs text-zinc-400">
                <span className="text-accent mt-0.5 shrink-0">·</span>{rule}
              </p>
            ))}
          </div>
        </Card>
      </div>

      {/* Weekly Template */}
      <div className="mb-5">
        <SectionLabel>Weekly Schedule Template</SectionLabel>
        <Card>
          {[
            ["Mon", "Push", "Chest · Shoulders · Triceps", "blue"],
            ["Tue", "Easy Run", "Zone 2 — conversational pace", "orange"],
            ["Wed", "Pull", "Back · Biceps · Rear Delts", "green"],
            ["Thu", "Tempo Run", "Faster effort OR rest if fatigued", "orange"],
            ["Fri", "Legs", "Quads · Hams · Glutes", "yellow"],
            ["Sat", "Long Run", "Weekly distance builder", "orange"],
            ["Sun", "Rest", "Stretch, walk, or full rest", "zinc"],
          ].map(([day, session, detail, color]) => {
            const dot = {
              blue: "bg-blue-400", green: "bg-green-400", orange: "bg-orange-400",
              yellow: "bg-yellow-400", zinc: "bg-zinc-600",
            }[color];
            return (
              <div key={day} className="flex items-center gap-3 py-2 border-b border-zinc-800 last:border-0">
                <span className="text-[10px] font-bold text-zinc-500 w-7 shrink-0">{day}</span>
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} />
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold text-white">{session}</span>
                  <span className="text-xs text-zinc-500 ml-2">{detail}</span>
                </div>
              </div>
            );
          })}
        </Card>
      </div>

      {/* Phases */}
      <div className="mb-5">
        <SectionLabel>Training Phases</SectionLabel>
        {PHASES.map((phase) => <PhaseCard key={phase.id} phase={phase} />)}
      </div>

      {/* Progressive Overload Rules */}
      <div className="mb-5">
        <SectionLabel>Progressive Overload Rules</SectionLabel>
        <Card>
          <ol className="space-y-2">
            {OVERLOAD_RULES.map((rule, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                <span className="bg-accent/20 text-accent font-bold rounded-full w-5 h-5 flex items-center justify-center shrink-0 text-[10px]">{i + 1}</span>
                {rule}
              </li>
            ))}
          </ol>
        </Card>
      </div>

      {/* Monthly Mileage */}
      <div className="mb-5">
        <SectionLabel>Monthly Mileage Progression</SectionLabel>
        <Card className="p-0 overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-zinc-800">
              <tr className="text-zinc-500">
                <th className="text-left px-4 py-2.5 font-semibold">Month</th>
                <th className="text-center px-3 py-2.5 font-semibold">Long Run</th>
                <th className="text-center px-4 py-2.5 font-semibold">Weekly KM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {MONTHLY_MILEAGE.map(([month, longRun, weeklyKm], i) => (
                <tr key={i} className={`text-zinc-300 ${month.includes("RACE") ? "bg-accent/10" : ""}`}>
                  <td className="px-4 py-2.5 font-medium">{month}</td>
                  <td className="px-3 py-2.5 text-center text-orange-300 font-bold">{longRun}</td>
                  <td className="px-4 py-2.5 text-center text-zinc-400">{weeklyKm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* Body Recomp Checkpoints */}
      <div className="mb-5">
        <SectionLabel>Body Recomp Checkpoints</SectionLabel>
        <div className="grid grid-cols-2 gap-2">
          {CHECKPOINTS.map(({ month, date, bf, vo2 }) => (
            <Card key={month} className="flex flex-col gap-1.5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-zinc-500">{month}</p>
                <p className="text-[11px] text-zinc-600">{date}</p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-zinc-500">Body Fat</p>
                  <p className="text-sm font-black text-white">{bf}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-zinc-500">VO₂ Max</p>
                  <p className="text-sm font-black text-accent">{vo2}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <p className="text-center text-[10px] text-zinc-600 pb-4">Plan created by FitCoach · June 2026</p>
    </PageWrapper>
  );
}
