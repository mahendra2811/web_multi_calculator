"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { BigStat, Stat } from "@/components/calculator/Stat";
import { applyDiscount, stackedDiscounts } from "@/lib/calculators/finance";
import { formatINR } from "@/lib/format";
import type { CalculatorRuntimeProps } from "@/types/calculator";

function DiscountCalculator({ meta }: CalculatorRuntimeProps) {
  const [price, setPrice] = useState(2000);
  const [discounts, setDiscounts] = useState<number[]>([20]);

  const single = useMemo(() => applyDiscount(price, discounts[0] ?? 0), [price, discounts]);
  const stacked = useMemo(() => stackedDiscounts(price, discounts), [price, discounts]);

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setPrice(2000);
        setDiscounts([20]);
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Input
              type="number"
              label="Original price"
              prefix="₹"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value) || 0)}
            />
            {discounts.map((d, i) => (
              <div key={i} className="flex items-end gap-2">
                <Input
                  type="number"
                  label={`Discount ${i + 1}`}
                  suffix="%"
                  value={d}
                  onChange={(e) =>
                    setDiscounts(
                      discounts.map((x, idx) => (idx === i ? Number(e.target.value) || 0 : x)),
                    )
                  }
                />
                {discounts.length > 1 && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setDiscounts(discounts.filter((_, idx) => idx !== i))}
                  >
                    ×
                  </Button>
                )}
              </div>
            ))}
            <Button size="sm" variant="secondary" onClick={() => setDiscounts([...discounts, 0])}>
              + Stack another discount
            </Button>
          </CardContent>
        </Card>
      }
      result={
        <Card>
          <CardHeader>
            <CardTitle>Savings</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 py-4">
            <BigStat label="You pay" value={formatINR(stacked.final)} tone="primary" />
            <div className="grid grid-cols-2 gap-3">
              <Stat label="Saved" value={formatINR(stacked.saved)} tone="success" />
              <Stat
                label="Effective discount"
                value={`${stacked.effectivePct.toFixed(2)}%`}
                tone="accent"
              />
              {discounts.length === 1 && (
                <Stat label="Single mode final" value={formatINR(single.final)} />
              )}
            </div>
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(DiscountCalculator);
