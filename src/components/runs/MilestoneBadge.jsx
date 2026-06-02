const MILESTONES = [
  { label: "5K",   threshold: 5,    emoji: "🏅" },
  { label: "10K",  threshold: 10,   emoji: "🥈" },
  { label: "15K",  threshold: 15,   emoji: "🥇" },
  { label: "21.1K",threshold: 21.1, emoji: "🏆" },
];

export default function MilestoneBadges({ longestRun }) {
  return (
    <div className="flex justify-around mt-4">
      {MILESTONES.map(({ label, threshold, emoji }) => {
        const unlocked = longestRun >= threshold;
        return (
          <div key={label} className={`flex flex-col items-center gap-1 transition-all ${unlocked ? "scale-110" : "opacity-30"}`}>
            <span className="text-2xl">{unlocked ? emoji : "🔒"}</span>
            <span className={`text-xs font-semibold ${unlocked ? "text-accent" : "text-zinc-600"}`}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}
