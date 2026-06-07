"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { NumberInput } from "@/components/ui/NumberInput";
import { BigStat, Stat } from "@/components/calculator/Stat";
import { profitLoss } from "@/lib/calculators/finance";
import { formatINR } from "@/lib/format";
import type { CalculatorRuntimeProps } from "@/types/calculator";

function ProfitLossCalculator({ meta }: CalculatorRuntimeProps) {
  const [cost, setCost] = useState(1000);
  const [sell, setSell] = useState(1250);
  const r = useMemo(() => profitLoss(cost, sell), [cost, sell]);

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setCost(1000);
        setSell(1000);
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Cost & sell</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <NumberInput
              label="Cost price"
              prefix="₹"
              value={cost}
              onValueChange={setCost}
              allowNegative={false}
            />
            <NumberInput
              label="Sell price"
              prefix="₹"
              value={sell}
              onValueChange={setSell}
              allowNegative={false}
            />
          </CardContent>
        </Card>
      }
      result={
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 py-4">
            <BigStat
              label={r.profit > 0 ? "Profit" : r.loss > 0 ? "Loss" : "Break-even"}
              value={`${r.netPct >= 0 ? "+" : ""}${r.netPct.toFixed(2)}%`}
              tone={r.profit > 0 ? "success" : r.loss > 0 ? "error" : "default"}
            />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Stat label="Profit" value={formatINR(r.profit)} tone="success" />
              <Stat label="Loss" value={formatINR(r.loss)} tone="error" />
            </div>
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(ProfitLossCalculator);
