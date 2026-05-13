"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { BigStat, Stat } from "@/components/calculator/Stat";
import { breakEven } from "@/lib/calculators/finance";
import { formatINR } from "@/lib/format";
import type { CalculatorRuntimeProps } from "@/types/calculator";

function BreakEvenCalculator({ meta }: CalculatorRuntimeProps) {
  const [fixed, setFixed] = useState(100000);
  const [price, setPrice] = useState(50);
  const [variable, setVariable] = useState(30);

  const r = useMemo(() => breakEven(fixed, price, variable), [fixed, price, variable]);

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setFixed(100000);
        setPrice(50);
        setVariable(30);
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Cost & price</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Input
              type="number"
              label="Fixed costs"
              prefix="₹"
              value={fixed}
              onChange={(e) => setFixed(Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              label="Price per unit"
              prefix="₹"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              label="Variable cost per unit"
              prefix="₹"
              value={variable}
              onChange={(e) => setVariable(Number(e.target.value) || 0)}
            />
          </CardContent>
        </Card>
      }
      result={
        <Card>
          <CardHeader>
            <CardTitle>Break-even</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 py-4">
            <BigStat
              label="Units to sell"
              value={Number.isFinite(r.units) ? Math.ceil(r.units).toLocaleString() : "∞"}
              tone="primary"
            />
            <div className="grid grid-cols-2 gap-3">
              <Stat
                label="Break-even revenue"
                value={Number.isFinite(r.revenue) ? formatINR(r.revenue) : "—"}
              />
              <Stat
                label="Contribution / unit"
                value={formatINR(r.contribution)}
                tone={r.contribution > 0 ? "success" : "error"}
              />
            </div>
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(BreakEvenCalculator);
