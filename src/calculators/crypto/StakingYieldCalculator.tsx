"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Stat } from "@/components/calculator/Stat";
import { calculateStakingYield } from "@/lib/calculators/crypto";
import { GrowthChart } from "@/components/charts/GrowthChart";
import { formatNumber } from "@/lib/format";
import type { CalculatorRuntimeProps } from "@/types/calculator";

const FREQ = [
  { id: 1, label: "Annual" },
  { id: 4, label: "Quarterly" },
  { id: 12, label: "Monthly" },
  { id: 52, label: "Weekly" },
  { id: 365, label: "Daily" },
];

function StakingYieldCalculator({ meta }: CalculatorRuntimeProps) {
  const [principal, setPrincipal] = useState(1000);
  const [apy, setApy] = useState(5);
  const [days, setDays] = useState(365);
  const [freq, setFreq] = useState(365);

  const r = useMemo(
    () => calculateStakingYield({ principal, apyPct: apy, days, compoundFrequencyPerYear: freq }),
    [principal, apy, days, freq],
  );

  const schedule = useMemo(() => {
    const arr: Array<{ year: number; invested: number; total: number }> = [];
    const years = Math.max(1, Math.round(days / 365));
    for (let y = 1; y <= years; y++) {
      const v = calculateStakingYield({
        principal,
        apyPct: apy,
        days: y * 365,
        compoundFrequencyPerYear: freq,
      });
      arr.push({ year: y, invested: principal, total: Math.round(v.total) });
    }
    return arr;
  }, [principal, apy, days, freq]);

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setPrincipal(1000);
        setApy(5);
        setDays(365);
        setFreq(365);
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Stake</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Input
              type="number"
              label="Principal"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              label="APY"
              suffix="%"
              value={apy}
              onChange={(e) => setApy(Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              label="Duration"
              suffix="d"
              value={days}
              onChange={(e) => setDays(Number(e.target.value) || 0)}
            />
            <div>
              <span className="text-text-secondary mb-2 block text-sm font-medium">Compound</span>
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
              <Stat label="Final" value={formatNumber(r.total, "en-IN", 2)} tone="primary" />
              <Stat label="Interest" value={formatNumber(r.interest, "en-IN", 2)} tone="success" />
              <Stat label="Principal" value={formatNumber(r.principal, "en-IN", 2)} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <GrowthChart data={schedule} />
            </CardContent>
          </Card>
        </div>
      }
    />
  );
}

export default memo(StakingYieldCalculator);
