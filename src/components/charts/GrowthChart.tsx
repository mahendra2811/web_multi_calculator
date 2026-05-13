"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCompactINR } from "@/lib/format";

interface GrowthChartProps {
  data: Array<{ year: number; invested: number; total: number }>;
}

export function GrowthChart({ data }: GrowthChartProps) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
        <defs>
          <linearGradient id="totalFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="investedFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity={0.4} />
            <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
        <XAxis
          dataKey="year"
          stroke="hsl(var(--text-tertiary))"
          fontSize={12}
          tickFormatter={(v) => `Y${v}`}
        />
        <YAxis
          stroke="hsl(var(--text-tertiary))"
          fontSize={12}
          tickFormatter={(v) => formatCompactINR(v)}
        />
        <Tooltip
          contentStyle={{
            background: "hsl(var(--surface-elevated))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 12,
            fontSize: 12,
          }}
          formatter={(v) => formatCompactINR(Number(v))}
          labelFormatter={(v) => `Year ${v}`}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Area
          type="monotone"
          dataKey="invested"
          stroke="hsl(var(--secondary))"
          strokeWidth={2}
          fill="url(#investedFill)"
          name="Invested"
        />
        <Area
          type="monotone"
          dataKey="total"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          fill="url(#totalFill)"
          name="Value"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
