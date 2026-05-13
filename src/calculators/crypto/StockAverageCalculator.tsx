"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { BigStat, Stat } from "@/components/calculator/Stat";
import { stockAverage } from "@/lib/calculators/crypto";
import { formatNumber } from "@/lib/format";
import type { CalculatorRuntimeProps } from "@/types/calculator";

interface Buy {
  price: number;
  qty: number;
}

function StockAverageCalculator({ meta }: CalculatorRuntimeProps) {
  const [buys, setBuys] = useState<Buy[]>([
    { price: 500, qty: 100 },
    { price: 400, qty: 50 },
  ]);

  const r = useMemo(() => stockAverage(buys), [buys]);

  const addBuy = () => setBuys([...buys, { price: 0, qty: 0 }]);
  const removeBuy = (i: number) => setBuys(buys.filter((_, idx) => idx !== i));
  const updateBuy = (i: number, field: keyof Buy, value: number) =>
    setBuys(buys.map((b, idx) => (idx === i ? { ...b, [field]: value } : b)));

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => setBuys([{ price: 0, qty: 0 }])}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Purchases</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {buys.map((b, i) => (
              <div key={i} className="flex items-end gap-2">
                <Input
                  type="number"
                  label={`#${i + 1} price`}
                  value={b.price}
                  onChange={(e) => updateBuy(i, "price", Number(e.target.value) || 0)}
                />
                <Input
                  type="number"
                  label="qty"
                  value={b.qty}
                  onChange={(e) => updateBuy(i, "qty", Number(e.target.value) || 0)}
                />
                {buys.length > 1 && (
                  <Button variant="ghost" size="sm" onClick={() => removeBuy(i)}>
                    ×
                  </Button>
                )}
              </div>
            ))}
            <Button variant="secondary" size="sm" onClick={addBuy}>
              + Add buy
            </Button>
          </CardContent>
        </Card>
      }
      result={
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 py-4">
            <BigStat label="Avg price" value={formatNumber(r.avgPrice, "en-IN", 2)} />
            <div className="grid grid-cols-2 gap-4">
              <Stat label="Total quantity" value={formatNumber(r.totalQty, "en-IN", 4)} />
              <Stat label="Total cost" value={formatNumber(r.totalCost, "en-IN", 2)} />
            </div>
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(StockAverageCalculator);
