"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Stat } from "@/components/calculator/Stat";
import { COMMON_TIMEZONES, convertTimezone } from "@/lib/calculators/datetime";
import type { CalculatorRuntimeProps } from "@/types/calculator";

function TimezoneCalculator({ meta }: CalculatorRuntimeProps) {
  const [dt, setDt] = useState(() => new Date().toISOString().slice(0, 16));
  const [from, setFrom] = useState("Asia/Kolkata");

  const rows = useMemo(() => {
    // Treat input as if it's local time in `from` zone — convert via offset trick.
    return COMMON_TIMEZONES.map((tz) => ({
      tz,
      value: convertTimezone(dt, tz.id),
    }));
  }, [dt]);

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setDt(new Date().toISOString().slice(0, 16));
        setFrom("Asia/Kolkata");
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Source</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Input
              type="datetime-local"
              label="Date & time"
              value={dt}
              onChange={(e) => setDt(e.target.value)}
            />
            <label className="text-text-secondary text-sm font-medium">From zone</label>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="bg-surface-elevated text-text border-border h-11 w-full rounded-lg border px-3 text-sm"
            >
              {COMMON_TIMEZONES.map((tz) => (
                <option key={tz.id} value={tz.id}>
                  {tz.label}
                </option>
              ))}
            </select>
            <p className="text-text-tertiary text-xs">
              Note: input is parsed as your browser&apos;s local time. For precise zone math, use
              UTC input.
            </p>
          </CardContent>
        </Card>
      }
      result={
        <Card>
          <CardHeader>
            <CardTitle>All zones</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {rows.map(({ tz, value }) => (
              <Stat
                key={tz.id}
                label={tz.label}
                value={value}
                tone={tz.id === from ? "primary" : "default"}
              />
            ))}
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(TimezoneCalculator);
