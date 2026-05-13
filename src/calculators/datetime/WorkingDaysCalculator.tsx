"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { BigStat, Stat } from "@/components/calculator/Stat";
import { workingDaysBetween } from "@/lib/calculators/datetime";
import type { CalculatorRuntimeProps } from "@/types/calculator";

function WorkingDaysCalculator({ meta }: CalculatorRuntimeProps) {
  const today = new Date().toISOString().slice(0, 10);
  const [start, setStart] = useState(today);
  const [end, setEnd] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().slice(0, 10);
  });
  const [holidaysRaw, setHolidaysRaw] = useState("");

  const r = useMemo(() => {
    const holidays = holidaysRaw
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    return workingDaysBetween(start, end, holidays);
  }, [start, end, holidaysRaw]);

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setStart(today);
        setEnd(today);
        setHolidaysRaw("");
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Dates + holidays</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Input
              type="date"
              label="Start"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
            <Input type="date" label="End" value={end} onChange={(e) => setEnd(e.target.value)} />
            <label className="text-text-secondary mb-1 text-sm font-medium">
              Holidays (one per line, YYYY-MM-DD)
            </label>
            <textarea
              value={holidaysRaw}
              onChange={(e) => setHolidaysRaw(e.target.value)}
              className="bg-surface-elevated text-text border-border min-h-[100px] w-full rounded-lg border p-3 text-sm outline-none"
              placeholder="2026-01-26&#10;2026-08-15"
            />
          </CardContent>
        </Card>
      }
      result={
        <Card>
          <CardHeader>
            <CardTitle>Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 py-4">
            {r ? (
              <>
                <BigStat label="Working days" value={String(r.workingDays)} />
                <div className="grid grid-cols-2 gap-4">
                  <Stat label="Weekend days" value={String(r.weekendDays)} />
                  <Stat label="Holiday days" value={String(r.holidayDays)} />
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

export default memo(WorkingDaysCalculator);
