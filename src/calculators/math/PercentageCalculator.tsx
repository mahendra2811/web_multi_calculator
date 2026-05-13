"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { BigStat, Stat } from "@/components/calculator/Stat";
import { formatNumber } from "@/lib/format";
import {
  addPercent,
  percentageChange,
  percentageOf,
  percentageWhatPercent,
  subtractPercent,
} from "@/lib/calculators/math";
import type { CalculatorRuntimeProps } from "@/types/calculator";

const MODES = [
  { id: "of", label: "X% of Y" },
  { id: "whatPct", label: "X is what % of Y" },
  { id: "change", label: "% change A → B" },
  { id: "add", label: "Add X% to Y" },
  { id: "subtract", label: "Subtract X% from Y" },
] as const;
type Mode = (typeof MODES)[number]["id"];

function PercentageCalculator({ meta }: CalculatorRuntimeProps) {
  const [mode, setMode] = useState<Mode>("of");
  const [a, setA] = useState(20);
  const [b, setB] = useState(250);

  const result = useMemo(() => {
    switch (mode) {
      case "of":
        return percentageOf(a, b);
      case "whatPct":
        return percentageWhatPercent(a, b);
      case "change":
        return percentageChange(a, b);
      case "add":
        return addPercent(b, a);
      case "subtract":
        return subtractPercent(b, a);
    }
  }, [mode, a, b]);

  const labelA = mode === "change" ? "From (A)" : mode === "whatPct" ? "Part (X)" : "Percent (X)";
  const labelB = mode === "change" ? "To (B)" : mode === "whatPct" ? "Whole (Y)" : "Value (Y)";
  const suffixA = mode === "change" || mode === "whatPct" ? "" : "%";
  const isPercentResult = mode === "whatPct" || mode === "change";

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setA(20);
        setB(250);
        setMode("of");
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Mode</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {MODES.map((m) => (
                <Button
                  key={m.id}
                  size="sm"
                  variant={mode === m.id ? "primary" : "secondary"}
                  onClick={() => setMode(m.id)}
                >
                  {m.label}
                </Button>
              ))}
            </div>
            <Input
              label={labelA}
              type="number"
              value={a}
              onChange={(e) => setA(Number(e.target.value) || 0)}
              suffix={suffixA}
            />
            <Input
              label={labelB}
              type="number"
              value={b}
              onChange={(e) => setB(Number(e.target.value) || 0)}
            />
          </CardContent>
        </Card>
      }
      result={
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6 py-8">
            <BigStat
              label="Answer"
              value={
                isPercentResult
                  ? `${formatNumber(result, "en-IN", 2)}%`
                  : formatNumber(result, "en-IN", 2)
              }
            />
            <div className="grid w-full grid-cols-2 gap-4">
              <Stat label="A" value={formatNumber(a, "en-IN", 2)} />
              <Stat label="B" value={formatNumber(b, "en-IN", 2)} />
            </div>
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(PercentageCalculator);
