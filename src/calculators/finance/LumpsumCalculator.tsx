"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Slider } from "@/components/ui/Slider";
import { Stat } from "@/components/calculator/Stat";
import { GrowthChart } from "@/components/charts/GrowthChart";
import { calculateLumpsum } from "@/lib/calculators/finance";
import { formatINR } from "@/lib/format";
import type { CalculatorRuntimeProps } from "@/types/calculator";

function LumpsumCalculator({ meta }: CalculatorRuntimeProps) {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const r = useMemo(
    () => calculateLumpsum({ principal, annualReturnPct: rate, years }),
    [principal, rate, years],
  );
  // Year-by-year for chart (reuse SIP schedule shape)
  const chart = useMemo(() => {
    const arr: Array<{ year: number; invested: number; total: number }> = [];
    for (let y = 1; y <= years; y++) {
      arr.push({
        year: y,
        invested: principal,
        total: Math.round(principal * Math.pow(1 + rate / 100, y)),
      });
    }
    return arr;
  }, [principal, rate, years]);

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setPrincipal(100000);
        setRate(12);
        setYears(10);
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div>
              <Input
                label="Investment"
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value) || 0)}
                prefix="₹"
              />
              <Slider
                className="mt-2"
                min={1000}
                max={10000000}
                step={1000}
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
              />
            </div>
            <div>
              <Input
                label="Expected return"
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value) || 0)}
                suffix="%"
              />
              <Slider
                className="mt-2"
                min={1}
                max={30}
                step={0.5}
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
              />
            </div>
            <div>
              <Input
                label="Time period"
                type="number"
                value={years}
                onChange={(e) => setYears(Number(e.target.value) || 0)}
                suffix="yr"
              />
              <Slider
                className="mt-2"
                min={1}
                max={40}
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
              <Stat label="Invested" value={formatINR(r.invested)} tone="secondary" />
              <Stat label="Returns" value={formatINR(r.returns)} tone="accent" />
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

export default memo(LumpsumCalculator);
