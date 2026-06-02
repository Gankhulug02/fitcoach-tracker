import { LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine, ResponsiveContainer } from "recharts";
import { fmtDate } from "../../utils/formatters";

export default function BodyFatChart({ data }) {
  if (!data?.length) return (
    <div className="h-40 flex items-center justify-center text-zinc-600 text-sm">No data yet</div>
  );

  const chartData = data.map((d) => ({ date: fmtDate(d.logged_at), value: parseFloat(d.body_fat_pct) })).filter((d) => !isNaN(d.value));

  return (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <XAxis dataKey="date" tick={{ fill: "#71717a", fontSize: 10 }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fill: "#71717a", fontSize: 10 }} tickLine={false} axisLine={false} domain={["auto", "auto"]} />
        <Tooltip
          contentStyle={{ background: "#18181b", border: "1px solid #3f3f46", borderRadius: 12, fontSize: 12 }}
          labelStyle={{ color: "#a1a1aa" }}
          formatter={(v) => [`${v}%`, "Body Fat"]}
        />
        <ReferenceLine y={15} stroke="#00FF87" strokeDasharray="4 4" label={{ value: "15% target", fill: "#00FF87", fontSize: 10, position: "right" }} />
        <Line type="monotone" dataKey="value" stroke="#00FF87" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
