"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Stat } from "@/components/calculator/Stat";
import { GrowthChart } from "@/components/charts/GrowthChart";
import { calculateSimpleInterest } from "@/lib/calculators/finance";
import { formatINR } from "@/lib/format";
import type { CalculatorRuntimeProps } from "@/types/calculator";

function SimpleInterestCalculator({ meta }: CalculatorRuntimeProps) {
  const [principal, setPrincipal] = useState(50000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(3);

  const r = useMemo(
    () => calculateSimpleInterest(principal, rate, years),
    [principal, rate, years],
  );
  const chart = useMemo(() => {
    const out = [];
    for (let y = 1; y <= years; y++) {
      out.push({ year: y, invested: principal, total: principal + (principal * rate * y) / 100 });
    }
    return out;
  }, [principal, rate, years]);

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setPrincipal(50000);
        setRate(8);
        setYears(3);
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Loan / deposit</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Input
              type="number"
              label="Principal"
              prefix="₹"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              label="Rate"
              suffix="%"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              label="Time"
              suffix="yr"
              value={years}
              onChange={(e) => setYears(Number(e.target.value) || 0)}
            />
          </CardContent>
        </Card>
      }
      result={
        <div className="flex flex-col gap-4">
          <Card>
            <CardContent className="grid grid-cols-3 gap-3 pt-6">
              <Stat label="Invested" value={formatINR(r.invested)} tone="secondary" />
              <Stat label="Interest" value={formatINR(r.interest)} tone="accent" />
              <Stat label="Total" value={formatINR(r.total)} tone="primary" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <GrowthChart data={chart} />
            </CardContent>
          </Card>
        </div>
      }
    />
  );
}

export default memo(SimpleInterestCalculator);
