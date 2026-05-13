"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Slider } from "@/components/ui/Slider";
import { Button } from "@/components/ui/Button";
import { Stat } from "@/components/calculator/Stat";
import { GrowthChart } from "@/components/charts/GrowthChart";
import { calculateCompoundInterest } from "@/lib/calculators/finance";
import { formatINR } from "@/lib/format";
import type { CalculatorRuntimeProps } from "@/types/calculator";

const FREQ = [
  { id: 1, label: "Annual" },
  { id: 2, label: "Semi" },
  { id: 4, label: "Quarterly" },
  { id: 12, label: "Monthly" },
  { id: 365, label: "Daily" },
];

function CompoundInterestCalculator({ meta }: CalculatorRuntimeProps) {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(10);
  const [freq, setFreq] = useState(4);

  const r = useMemo(
    () =>
      calculateCompoundInterest({ principal, annualRatePct: rate, years, compoundsPerYear: freq }),
    [principal, rate, years, freq],
  );
  const chart = useMemo(() => {
    const out = [];
    for (let y = 1; y <= years; y++) {
      const v = principal * Math.pow(1 + rate / 100 / freq, freq * y);
      out.push({ year: y, invested: principal, total: Math.round(v) });
    }
    return out;
  }, [principal, rate, years, freq]);

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setPrincipal(100000);
        setRate(10);
        setYears(10);
        setFreq(4);
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Compound interest</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div>
              <Input
                type="number"
                label="Principal"
                prefix="₹"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value) || 0)}
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
                type="number"
                label="Rate"
                suffix="%"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value) || 0)}
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
                type="number"
                label="Years"
                suffix="yr"
                value={years}
                onChange={(e) => setYears(Number(e.target.value) || 0)}
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
            <div>
              <span className="text-text-secondary mb-2 block text-sm font-medium">
                Compounding
              </span>
              <div className="flex flex-wrap gap-2">
                {FREQ.map((f) => (
                  <Button
                    key={f.id}
                    size="sm"
                    variant={freq === f.id ? "primary" : "secondary"}
                    onClick={() => setFreq(f.id)}
                  >
                    {f.label}
                  </Button>
                ))}
              </div>
            </div>
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

export default memo(CompoundInterestCalculator);
