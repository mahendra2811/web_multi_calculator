"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
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
            <Input
              type="number"
              label="Last drawn salary (basic + DA)"
              prefix="₹"
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              label="Years of service"
              value={years}
              onChange={(e) => setYears(Number(e.target.value) || 0)}
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
