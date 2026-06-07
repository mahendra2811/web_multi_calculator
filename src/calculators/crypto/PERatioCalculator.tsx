"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { NumberInput } from "@/components/ui/NumberInput";
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
            <NumberInput
              label="Stock price"
              value={price}
              onValueChange={setPrice}
              allowNegative={false}
            />
            <NumberInput label="EPS (annual)" value={eps} onValueChange={setEps} />
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
