"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { BigStat } from "@/components/calculator/Stat";
import { peRatio } from "@/lib/calculators/crypto";
import type { CalculatorRuntimeProps } from "@/types/calculator";

function PERatioCalculator({ meta }: CalculatorRuntimeProps) {
  const [price, setPrice] = useState(200);
  const [eps, setEps] = useState(10);

  const r = useMemo(() => peRatio(price, eps), [price, eps]);

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setPrice(0);
        setEps(0);
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Input
              type="number"
              label="Stock price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              label="EPS (annual)"
              value={eps}
              onChange={(e) => setEps(Number(e.target.value) || 0)}
            />
          </CardContent>
        </Card>
      }
      result={
        <Card>
          <CardHeader>
            <CardTitle>P/E ratio</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center py-12">
            <BigStat
              label="Price-to-Earnings"
              value={Number.isFinite(r) ? r.toFixed(2) : "∞"}
              tone="primary"
            />
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(PERatioCalculator);
