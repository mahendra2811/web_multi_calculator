"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Slider } from "@/components/ui/Slider";
import { Stat } from "@/components/calculator/Stat";
import { GrowthChart } from "@/components/charts/GrowthChart";
import { calculateEMI } from "@/lib/calculators/finance";
import { formatINR } from "@/lib/format";
import type { CalculatorRuntimeProps } from "@/types/calculator";

function EMICalculator({ meta }: CalculatorRuntimeProps) {
  const [principal, setPrincipal] = useState(1000000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const r = useMemo(
    () => calculateEMI({ principal, annualRatePct: rate, years }),
    [principal, rate, years],
  );

  // Aggregate amortization by year for chart: total paid vs balance
  const chart = useMemo(() => {
    const out: Array<{ year: number; invested: number; total: number }> = [];
    for (let y = 1; y <= years; y++) {
      const m = r.schedule[y * 12 - 1];
      if (!m) break;
      const paid = r.emi * y * 12;
      out.push({ year: y, invested: paid - (principal - m.balance), total: Math.round(paid) });
    }
    return out;
  }, [r.schedule, r.emi, principal, years]);

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setPrincipal(1000000);
        setRate(8.5);
        setYears(20);
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Loan</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div>
              <Input
                label="Loan amount"
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value) || 0)}
                prefix="₹"
              />
              <Slider
                className="mt-2"
                min={50000}
                max={50000000}
                step={50000}
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
              />
            </div>
            <div>
              <Input
                label="Interest rate"
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value) || 0)}
                suffix="%"
              />
              <Slider
                className="mt-2"
                min={1}
                max={20}
                step={0.1}
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
              />
            </div>
            <div>
              <Input
                label="Tenure"
                type="number"
                value={years}
                onChange={(e) => setYears(Number(e.target.value) || 0)}
                suffix="yr"
              />
              <Slider
                className="mt-2"
                min={1}
                max={30}
                step={1}
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
              />
            </div>
          </CardContent>
        </Card>
      }
      result={
        <div className="flex flex-col gap-4">
          <Card>
            <CardContent className="grid grid-cols-3 gap-3 pt-6">
              <Stat label="Monthly EMI" value={formatINR(r.emi)} tone="primary" />
              <Stat label="Total interest" value={formatINR(r.totalInterest)} tone="error" />
              <Stat label="Total payment" value={formatINR(r.totalPayment)} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Cumulative payments</CardTitle>
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

export default memo(EMICalculator);
