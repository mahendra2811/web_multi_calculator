"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { BigStat } from "@/components/calculator/Stat";
import { logBase } from "@/lib/calculators/math";
import { formatNumber } from "@/lib/format";
import type { CalculatorRuntimeProps } from "@/types/calculator";

const BASES = [
  { label: "log₁₀", base: 10 },
  { label: "log₂", base: 2 },
  { label: "ln", base: Math.E },
];

function LogarithmCalculator({ meta }: CalculatorRuntimeProps) {
  const [base, setBase] = useState(10);
  const [value, setValue] = useState(1000);

  const result = useMemo(() => logBase(value, base), [value, base]);

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setBase(10);
        setValue(1);
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Logarithm</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Input
              type="number"
              label="Value"
              value={value}
              onChange={(e) => setValue(Number(e.target.value) || 0)}
            />
            <div className="flex flex-wrap gap-2">
              {BASES.map((b) => (
                <Button
                  key={b.label}
                  size="sm"
                  variant={base === b.base ? "primary" : "secondary"}
                  onClick={() => setBase(b.base)}
                >
                  {b.label}
                </Button>
              ))}
            </div>
            <Input
              type="number"
              label="Custom base"
              value={base}
              onChange={(e) => setBase(Number(e.target.value) || 0)}
            />
          </CardContent>
        </Card>
      }
      result={
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center py-12">
            <BigStat
              label={`log${base === 10 ? "₁₀" : base === 2 ? "₂" : base === Math.E ? "ₑ" : `(${base})`} (${value})`}
              value={Number.isFinite(result) ? formatNumber(result, "en-IN", 5) : "—"}
            />
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(LogarithmCalculator);
