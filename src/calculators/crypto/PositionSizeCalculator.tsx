"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { BigStat, Stat } from "@/components/calculator/Stat";
import { positionSize } from "@/lib/calculators/crypto";
import { formatNumber } from "@/lib/format";
import type { CalculatorRuntimeProps } from "@/types/calculator";

function PositionSizeCalculator({ meta }: CalculatorRuntimeProps) {
  const [acct, setAcct] = useState(100000);
  const [risk, setRisk] = useState(1);
  const [entry, setEntry] = useState(100);
  const [stop, setStop] = useState(95);

  const r = useMemo(
    () => positionSize({ accountSize: acct, riskPct: risk, entry, stop }),
    [acct, risk, entry, stop],
  );

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setAcct(100000);
        setRisk(1);
        setEntry(100);
        setStop(95);
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Risk parameters</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Input
              type="number"
              label="Account size"
              value={acct}
              onChange={(e) => setAcct(Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              label="Risk per trade"
              suffix="%"
              value={risk}
              onChange={(e) => setRisk(Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              label="Entry price"
              value={entry}
              onChange={(e) => setEntry(Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              label="Stop price"
              value={stop}
              onChange={(e) => setStop(Number(e.target.value) || 0)}
            />
          </CardContent>
        </Card>
      }
      result={
        <Card>
          <CardHeader>
            <CardTitle>Position</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 py-4">
            <BigStat label="Quantity" value={formatNumber(r.qty, "en-IN", 4)} />
            <div className="grid grid-cols-2 gap-4">
              <Stat label="Max risk" value={formatNumber(r.riskAmount, "en-IN", 2)} tone="error" />
              <Stat
                label="Position value"
                value={formatNumber(r.positionValue, "en-IN", 2)}
                tone="primary"
              />
            </div>
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(PositionSizeCalculator);
