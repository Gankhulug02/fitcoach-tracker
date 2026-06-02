import { currentGoalWeek, totalGoalWeeks } from "../../utils/weekUtils";

export default function GreetingCard({ name }) {
  const firstName = name?.split(" ")[0] || "there";
  const week = currentGoalWeek();
  const total = totalGoalWeeks();

  return (
    <div className="mb-5">
      <h1 className="text-2xl font-bold text-white">Hey {firstName} 👋</h1>
      <p className="text-sm text-zinc-500 mt-0.5">Week {week} of {total} toward your 21K goal</p>
    </div>
  );
}
