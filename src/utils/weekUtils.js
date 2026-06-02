import { differenceInWeeks } from "date-fns";

const GOAL_DATE = new Date("2027-06-01");
const APP_START_DATE = new Date("2026-06-02");

export function weeksToGoal() {
  return Math.max(0, differenceInWeeks(GOAL_DATE, new Date()));
}

export function currentGoalWeek() {
  const elapsed = differenceInWeeks(new Date(), APP_START_DATE);
  return Math.max(1, elapsed + 1);
}

export function totalGoalWeeks() {
  return differenceInWeeks(GOAL_DATE, APP_START_DATE);
}

export function suggestedWeeklyMileage(longestRunKm) {
  if (!longestRunKm || longestRunKm < 1) return 5;
  return Math.min(Math.round(longestRunKm * 1.1 * 10) / 10, 32);
}
