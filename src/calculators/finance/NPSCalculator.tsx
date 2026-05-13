"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Stat } from "@/components/calculator/Stat";
import { GrowthChart } from "@/components/charts/GrowthChart";
import { calculateNPS, NPS_RETIREMENT_AGE } from "@/lib/calculators/finance";
import { formatINR } from "@/lib/format";
import type { CalculatorRuntimeProps } from "@/types/calculator";

function NPSCalculator({ meta }: CalculatorRuntimeProps) {
  const [monthly, setMonthly] = useState(5000);
  const [age, setAge] = useState(30);
  const [rate, setRate] = useState(10);

  const r = useMemo(
    () => calculateNPS({ monthly, currentAge: age, expectedReturnPct: rate }),
    [monthly, age, rate],
  );

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setMonthly(5000);
        setAge(30);
        setRate(10);
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>NPS plan</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Input
              type="number"
              label="Monthly contribution"
              prefix="₹"
              value={monthly}
              onChange={(e) => setMonthly(Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              label="Current age"
              value={age}
              onChange={(e) => setAge(Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              label="Expected return"
              suffix="%"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value) || 0)}
            />
            <p className="text-text-tertiary text-xs">Maturity at age {NPS_RETIREMENT_AGE}.</p>
          </CardContent>
        </Card>
      }
      result={
        <div className="flex flex-col gap-4">
          <Card>
            <CardContent className="grid grid-cols-3 gap-3 pt-6">
              <Stat label="Invested" value={formatINR(r.invested)} tone="secondary" />
              <Stat label="Interest" value={formatINR(r.interest)} tone="accent" />
              <Stat label="Maturity" value={formatINR(r.total)} tone="primary" />
            </CardContent>
          </Card>
          {r.schedule.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Corpus growth</CardTitle>
              </CardHeader>
              <CardContent>
                <GrowthChart data={r.schedule} />
              </CardContent>
            </Card>
          )}
        </div>
      }
    />
  );
}

export default memo(NPSCalculator);
