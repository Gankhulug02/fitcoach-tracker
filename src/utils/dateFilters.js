import { subWeeks, subMonths } from "date-fns";

export const DATE_FILTERS = [
  { label: "All time",   value: "all"   },
  { label: "This week",  value: "week"  },
  { label: "This month", value: "month" },
  { label: "3 months",   value: "3m"    },
];

export function getDateCutoff(range) {
  const now = new Date();
  if (range === "week")  return subWeeks(now, 1);
  if (range === "month") return subMonths(now, 1);
  if (range === "3m")    return subMonths(now, 3);
  return null;
}
