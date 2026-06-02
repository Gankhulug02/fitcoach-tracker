import { addDays, parseISO } from "date-fns";

export function computeRollingAverage(dataPoints, windowDays = 7) {
  if (!dataPoints?.length) return [];
  const sorted = [...dataPoints].sort((a, b) => new Date(a.date) - new Date(b.date));
  return sorted.map((point, i) => {
    const cutoff = addDays(parseISO(point.date), -(windowDays - 1));
    const window = sorted.slice(0, i + 1).filter((p) => parseISO(p.date) >= cutoff);
    const avg = window.reduce((sum, p) => sum + p.value, 0) / window.length;
    return { date: point.date, value: Math.round(avg * 10) / 10 };
  });
}
