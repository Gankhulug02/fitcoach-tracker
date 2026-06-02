import { format, parseISO } from "date-fns";

export const fmtWeight = (kg) => (kg != null ? `${parseFloat(kg).toFixed(1)} kg` : "—");
export const fmtPct = (pct) => (pct != null ? `${parseFloat(pct).toFixed(1)}%` : "—");
export const fmtDate = (dateStr) => {
  try { return format(parseISO(dateStr), "MMM d"); }
  catch { return dateStr; }
};
export const fmtDateFull = (dateStr) => {
  try { return format(parseISO(dateStr), "MMM d, yyyy"); }
  catch { return dateStr; }
};
export const fmtDelta = (delta) => (delta > 0 ? `+${delta.toFixed(1)}` : delta.toFixed(1));
export const fmtNumber = (n, decimals = 1) => (n != null ? parseFloat(n).toFixed(decimals) : "—");
