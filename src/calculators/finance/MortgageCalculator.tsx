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

function MortgageCalculator({ meta }: CalculatorRuntimeProps) {
  const [price, setPrice] = useState(7500000);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(25);

  const principal = (price * (100 - downPct)) / 100;
  const r = useMemo(
    () => calculateEMI({ principal, annualRatePct: rate, years }),
    [principal, rate, years],
  );

  const chart = useMemo(() => {
    const out: Array<{ year: number; invested: number; total: number }> = [];
    for (let y = 1; y <= years; y++) {
      const idx = y * 12 - 1;
      const m = r.schedule[idx];
      if (!m) break;
      out.push({ year: y, invested: principal - m.balance, total: Math.round(r.emi * y * 12) });
    }
    return out;
  }, [r.schedule, r.emi, principal, years]);

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setPrice(7500000);
        setDownPct(20);
        setRate(8.5);
        setYears(25);
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Home loan</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div>
              <Input
                type="number"
                label="House price"
                prefix="₹"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value) || 0)}
              />
              <Slider
                className="mt-2"
                min={1000000}
                max={100000000}
                step={100000}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <Input
                type="number"
                label="Down payment"
                suffix="%"
                value={downPct}
                onChange={(e) => setDownPct(Number(e.target.value) || 0)}
                hint={`Down: ${formatINR((price * downPct) / 100)}`}
              />
              <Slider
                className="mt-2"
                min={0}
                max={80}
                step={1}
                value={downPct}
                onChange={(e) => setDownPct(Number(e.target.value))}
              />
            </div>
            <div>
              <Input
                type="number"
                label="Rate"
                suffix="%"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value) || 0)}
              />
              <Slider
                className="mt-2"
                min={4}
                max={15}
                step={0.1}
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
              />
            </div>
            <div>
              <Input
                type="number"
                label="Tenure"
                suffix="yr"
                value={years}
                onChange={(e) => setYears(Number(e.target.value) || 0)}
              />
              <Slider
                className="mt-2"
                min={5}
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
            <CardContent className="grid grid-cols-2 gap-3 pt-6 sm:grid-cols-4">
              <Stat label="EMI" value={formatINR(r.emi)} tone="primary" />
              <Stat label="Principal" value={formatINR(principal)} />
              <Stat label="Total interest" value={formatINR(r.totalInterest)} tone="error" />
              <Stat label="Total paid" value={formatINR(r.totalPayment)} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Equity build-up</CardTitle>
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

export default memo(MortgageCalculator);
