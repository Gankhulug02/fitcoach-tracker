import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { fmtDate } from "../../utils/formatters";
import { computeRollingAverage } from "../../utils/rollingAverage";

export default function WeightChart({ data }) {
  if (!data?.length) return (
    <div className="h-40 flex items-center justify-center text-zinc-600 text-sm">No data yet</div>
  );

  const rawPoints = data.map((d) => ({ date: d.logged_at, value: parseFloat(d.weight_kg) })).filter((d) => !isNaN(d.value));
  const avgPoints = computeRollingAverage(rawPoints, 7);

  const chartData = rawPoints.map((p, i) => ({
    date: fmtDate(p.date),
    raw: p.value,
    avg: avgPoints[i]?.value,
  }));

  return (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <XAxis dataKey="date" tick={{ fill: "#71717a", fontSize: 10 }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fill: "#71717a", fontSize: 10 }} tickLine={false} axisLine={false} domain={["auto", "auto"]} />
        <Tooltip
          contentStyle={{ background: "#18181b", border: "1px solid #3f3f46", borderRadius: 12, fontSize: 12 }}
          labelStyle={{ color: "#a1a1aa" }}
          formatter={(v, name) => [`${v} kg`, name === "avg" ? "7-day avg" : "Weight"]}
        />
        <Line type="monotone" dataKey="raw" stroke="#52525b" strokeWidth={1.5} dot={false} name="raw" />
        <Line type="monotone" dataKey="avg" stroke="#00FF87" strokeWidth={2.5} dot={false} name="avg" activeDot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
