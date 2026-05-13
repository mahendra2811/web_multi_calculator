"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { BigStat, Stat } from "@/components/calculator/Stat";
import { calculateROI } from "@/lib/calculators/finance";
import { formatINR } from "@/lib/format";
import type { CalculatorRuntimeProps } from "@/types/calculator";

function ROICalculator({ meta }: CalculatorRuntimeProps) {
  const [initial, setInitial] = useState(100000);
  const [final, setFinal] = useState(180000);
  const [years, setYears] = useState(5);

  const r = useMemo(() => calculateROI(initial, final, years), [initial, final, years]);

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setInitial(100000);
        setFinal(100000);
        setYears(1);
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Investment</CardTitle>
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
            <CardTitle>Return on investment</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 py-4">
            <BigStat
              label="Total ROI"
              value={`${r.totalReturn.toFixed(2)}%`}
              tone={r.totalReturn >= 0 ? "success" : "error"}
            />
            <div className="grid grid-cols-2 gap-3">
              <Stat label="Annualized" value={`${r.annualized.toFixed(2)}%`} tone="primary" />
              <Stat label="Profit" value={formatINR(r.profit)} />
            </div>
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(ROICalculator);
