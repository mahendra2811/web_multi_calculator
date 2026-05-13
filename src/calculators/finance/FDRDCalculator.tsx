"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Stat } from "@/components/calculator/Stat";
import { GrowthChart } from "@/components/charts/GrowthChart";
import { calculateFD, calculateRD } from "@/lib/calculators/finance";
import { formatINR } from "@/lib/format";
import type { CalculatorRuntimeProps } from "@/types/calculator";

function FDRDCalculator({ meta }: CalculatorRuntimeProps) {
  const [mode, setMode] = useState<"fd" | "rd">("fd");
  const [principal, setPrincipal] = useState(100000);
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(5);

  const r = useMemo(() => {
    if (mode === "fd") return calculateFD({ principal, ratePct: rate, years, compoundsPerYear: 4 });
    return calculateRD({ monthly, ratePct: rate, months: years * 12 });
  }, [mode, principal, monthly, rate, years]);

  const chart = useMemo(() => {
    const out: Array<{ year: number; invested: number; total: number }> = [];
    for (let y = 1; y <= years; y++) {
      const v =
        mode === "fd"
          ? calculateFD({ principal, ratePct: rate, years: y, compoundsPerYear: 4 })
          : calculateRD({ monthly, ratePct: rate, months: y * 12 });
      out.push({ year: y, invested: v.invested, total: Math.round(v.total) });
    }
    return out;
  }, [mode, principal, monthly, rate, years]);

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setPrincipal(100000);
        setMonthly(5000);
        setRate(7);
        setYears(5);
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>FD or RD</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={mode === "fd" ? "primary" : "secondary"}
                onClick={() => setMode("fd")}
                className="flex-1"
              >
                Fixed Deposit
              </Button>
              <Button
                size="sm"
                variant={mode === "rd" ? "primary" : "secondary"}
                onClick={() => setMode("rd")}
                className="flex-1"
              >
                Recurring Deposit
              </Button>
            </div>
            {mode === "fd" ? (
              <Input
                type="number"
                label="Principal"
                prefix="₹"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value) || 0)}
              />
            ) : (
              <Input
                type="number"
                label="Monthly deposit"
                prefix="₹"
                value={monthly}
                onChange={(e) => setMonthly(Number(e.target.value) || 0)}
              />
            )}
            <Input
              type="number"
              label="Interest rate"
              suffix="%"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              label="Tenure"
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
              <Stat label="Maturity" value={formatINR(r.total)} tone="primary" />
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

export default memo(FDRDCalculator);
