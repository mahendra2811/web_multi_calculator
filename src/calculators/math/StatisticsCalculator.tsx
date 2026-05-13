"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Stat } from "@/components/calculator/Stat";
import { statistics } from "@/lib/calculators/math";
import { formatNumber } from "@/lib/format";
import type { CalculatorRuntimeProps } from "@/types/calculator";

function StatisticsCalculator({ meta }: CalculatorRuntimeProps) {
  const [raw, setRaw] = useState("2, 4, 4, 4, 5, 5, 7, 9");

  const nums = useMemo(
    () =>
      raw
        .split(/[,\s]+/)
        .map((s) => parseFloat(s))
        .filter((n) => Number.isFinite(n)),
    [raw],
  );

  const r = useMemo(() => statistics(nums), [nums]);

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => setRaw("")}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Data</CardTitle>
          </CardHeader>
          <CardContent>
            <label className="text-text-secondary mb-2 block text-sm font-medium">
              Comma or space-separated numbers
            </label>
            <textarea
              value={raw}
              onChange={(e) => setRaw(e.target.value)}
              className="bg-surface-elevated text-text border-border focus:border-primary focus:ring-primary/20 min-h-[140px] w-full rounded-lg border p-3 text-sm outline-none focus:ring-2"
              placeholder="2, 4, 4, 4, 5, 5, 7, 9"
            />
            <p className="text-text-tertiary mt-2 text-xs">{r.count} numbers parsed</p>
          </CardContent>
        </Card>
      }
      result={
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Stat label="Mean" value={formatNumber(r.mean, "en-IN", 3)} tone="primary" />
            <Stat label="Median" value={formatNumber(r.median, "en-IN", 3)} />
            <Stat label="Mode" value={r.mode.length ? r.mode.join(", ") : "—"} />
            <Stat label="Std dev" value={formatNumber(r.stddev, "en-IN", 3)} />
            <Stat label="Variance" value={formatNumber(r.variance, "en-IN", 3)} />
            <Stat label="Range" value={formatNumber(r.range, "en-IN", 3)} />
            <Stat label="Min" value={formatNumber(r.min, "en-IN", 3)} />
            <Stat label="Max" value={formatNumber(r.max, "en-IN", 3)} />
            <Stat label="Sum" value={formatNumber(r.sum, "en-IN", 3)} />
            <Stat label="Count" value={String(r.count)} />
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(StatisticsCalculator);
