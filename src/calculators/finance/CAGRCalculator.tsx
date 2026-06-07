"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { NumberInput } from "@/components/ui/NumberInput";
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
            <NumberInput
              label="Initial value"
              prefix="₹"
              value={initial}
              onValueChange={setInitial}
              allowNegative={false}
            />
            <NumberInput
              label="Final value"
              prefix="₹"
              value={final}
              onValueChange={setFinal}
              allowNegative={false}
            />
            <NumberInput
              label="Period"
              suffix="yr"
              value={years}
              onValueChange={setYears}
              allowNegative={false}
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
