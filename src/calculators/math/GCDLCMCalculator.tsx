"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Stat } from "@/components/calculator/Stat";
import { gcdMany, lcmMany } from "@/lib/calculators/math";
import type { CalculatorRuntimeProps } from "@/types/calculator";

function GCDLCMCalculator({ meta }: CalculatorRuntimeProps) {
  const [raw, setRaw] = useState("12, 18, 24");

  const nums = useMemo(
    () =>
      raw
        .split(/[,\s]+/)
        .map((s) => parseInt(s, 10))
        .filter((n) => Number.isFinite(n) && n > 0),
    [raw],
  );

  const result = useMemo(
    () => ({ gcd: nums.length > 0 ? gcdMany(nums) : 0, lcm: nums.length > 0 ? lcmMany(nums) : 0 }),
    [nums],
  );

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => setRaw("")}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Numbers</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              label="Comma-separated positive integers"
              value={raw}
              onChange={(e) => setRaw(e.target.value)}
              placeholder="12, 18, 24"
            />
          </CardContent>
        </Card>
      }
      result={
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Stat label="GCD" value={String(result.gcd)} tone="primary" />
            <Stat label="LCM" value={String(result.lcm)} tone="secondary" />
            <div className="col-span-2">
              <Stat label="Parsed" value={nums.length > 0 ? nums.join(", ") : "—"} />
            </div>
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(GCDLCMCalculator);
