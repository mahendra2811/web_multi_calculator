"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { NumberInput } from "@/components/ui/NumberInput";
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
            <NumberInput
              label="Fixed costs"
              prefix="₹"
              value={fixed}
              onValueChange={setFixed}
              allowNegative={false}
            />
            <NumberInput
              label="Price per unit"
              prefix="₹"
              value={price}
              onValueChange={setPrice}
              allowNegative={false}
            />
            <NumberInput
              label="Variable cost per unit"
              prefix="₹"
              value={variable}
              onValueChange={setVariable}
              allowNegative={false}
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
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
