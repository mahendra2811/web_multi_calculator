"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Stat, BigStat } from "@/components/calculator/Stat";
import { dateDifference } from "@/lib/calculators/datetime";
import { formatNumber } from "@/lib/format";
import type { CalculatorRuntimeProps } from "@/types/calculator";

function DateDiffCalculator({ meta }: CalculatorRuntimeProps) {
  const today = new Date().toISOString().slice(0, 10);
  const [start, setStart] = useState("2025-01-01");
  const [end, setEnd] = useState(today);
  const [include, setInclude] = useState(false);

  const r = useMemo(() => dateDifference(start, end, include), [start, end, include]);

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setStart("");
        setEnd("");
        setInclude(false);
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Two dates</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Input
              type="date"
              label="Start"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
            <Input type="date" label="End" value={end} onChange={(e) => setEnd(e.target.value)} />
            <label className="text-text-secondary flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={include}
                onChange={(e) => setInclude(e.target.checked)}
              />
              Include end date
            </label>
          </CardContent>
        </Card>
      }
      result={
        <Card>
          <CardHeader>
            <CardTitle>Difference</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 py-4">
            {r ? (
              <>
                <BigStat label="Days" value={formatNumber(r.days, "en-IN", 0)} />
                <div className="grid grid-cols-2 gap-4">
                  <Stat label="Weeks" value={formatNumber(r.weeks, "en-IN", 2)} />
                  <Stat label="Months" value={formatNumber(r.months, "en-IN", 2)} />
                  <Stat label="Years" value={formatNumber(r.years, "en-IN", 3)} />
                </div>
              </>
            ) : (
              <p className="text-text-secondary">Enter valid dates.</p>
            )}
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(DateDiffCalculator);
