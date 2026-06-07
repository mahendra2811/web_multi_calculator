"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { NumberInput } from "@/components/ui/NumberInput";
import { BigStat } from "@/components/calculator/Stat";
import { calculateGratuity } from "@/lib/calculators/finance";
import { formatINR } from "@/lib/format";
import type { CalculatorRuntimeProps } from "@/types/calculator";

function GratuityCalculator({ meta }: CalculatorRuntimeProps) {
  const [salary, setSalary] = useState(50000);
  const [years, setYears] = useState(10);
  const { gratuity } = useMemo(() => calculateGratuity(salary, years), [salary, years]);

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setSalary(50000);
        setYears(5);
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <NumberInput
              label="Last drawn salary (basic + DA)"
              prefix="₹"
              value={salary}
              onValueChange={setSalary}
              allowNegative={false}
            />
            <NumberInput
              label="Years of service"
              value={years}
              onValueChange={setYears}
              allowNegative={false}
            />
            <p className="text-text-tertiary text-xs">Formula: (salary × 15 × years) / 26</p>
          </CardContent>
        </Card>
      }
      result={
        <Card>
          <CardHeader>
            <CardTitle>Gratuity</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center py-12">
            <BigStat label="Amount" value={formatINR(gratuity)} tone="primary" />
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(GratuityCalculator);
