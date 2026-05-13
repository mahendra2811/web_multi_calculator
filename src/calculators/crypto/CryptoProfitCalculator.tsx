"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { BigStat, Stat } from "@/components/calculator/Stat";
import { calculateCryptoProfit } from "@/lib/calculators/crypto";
import { formatNumber } from "@/lib/format";
import type { CalculatorRuntimeProps } from "@/types/calculator";

function CryptoProfitCalculator({ meta }: CalculatorRuntimeProps) {
  const [entry, setEntry] = useState(100);
  const [exit, setExit] = useState(150);
  const [qty, setQty] = useState(10);
  const [fee, setFee] = useState(0.2);

  const r = useMemo(
    () => calculateCryptoProfit({ entryPrice: entry, exitPrice: exit, quantity: qty, feePct: fee }),
    [entry, exit, qty, fee],
  );

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setEntry(100);
        setExit(150);
        setQty(10);
        setFee(0.2);
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Trade details</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Input
              type="number"
              label="Entry price"
              value={entry}
              onChange={(e) => setEntry(Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              label="Exit price"
              value={exit}
              onChange={(e) => setExit(Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              label="Quantity"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              label="Total fees"
              suffix="%"
              value={fee}
              onChange={(e) => setFee(Number(e.target.value) || 0)}
            />
          </CardContent>
        </Card>
      }
      result={
        <Card>
          <CardHeader>
            <CardTitle>Net P/L</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 py-4">
            <BigStat
              label="Net profit"
              value={formatNumber(r.netProfit, "en-IN", 2)}
              tone={r.netProfit >= 0 ? "success" : "error"}
            />
            <div className="grid grid-cols-2 gap-4">
              <Stat
                label="Net return"
                value={`${r.netReturnPct.toFixed(2)}%`}
                tone={r.netReturnPct >= 0 ? "success" : "error"}
              />
              <Stat label="Invested" value={formatNumber(r.invested, "en-IN", 2)} />
              <Stat label="Exit value" value={formatNumber(r.exitValue, "en-IN", 2)} />
              <Stat label="Total fees" value={formatNumber(r.fees, "en-IN", 2)} />
            </div>
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(CryptoProfitCalculator);
