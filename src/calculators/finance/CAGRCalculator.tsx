"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { BigStat } from "@/components/calculator/Stat";
import { calculateCAGR } from "@/lib/calculators/finance";
import type { CalculatorRuntimeProps } from "@/types/calculator";

function CAGRCalculator({ meta }: CalculatorRuntimeProps) {
  const [initial, setInitial] = useState(100000);
  const [final, setFinal] = useState(200000);
  const [years, setYears] = useState(6);

  const cagr = useMemo(() => calculateCAGR(initial, final, years), [initial, final, years]);

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setInitial(100000);
        setFinal(200000);
        setYears(6);
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Input
              type="number"
              label="Initial value"
              prefix="₹"
              value={initial}
              onChange={(e) => setInitial(Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              label="Final value"
              prefix="₹"
              value={final}
              onChange={(e) => setFinal(Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              label="Period"
              suffix="yr"
              value={years}
              onChange={(e) => setYears(Number(e.target.value) || 0)}
            />
          </CardContent>
        </Card>
      }
      result={
        <Card>
          <CardHeader>
            <CardTitle>CAGR</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center py-12">
            <BigStat
              label="Annualized return"
              value={`${cagr.toFixed(2)}%`}
              tone={cagr >= 0 ? "success" : "error"}
            />
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(CAGRCalculator);
