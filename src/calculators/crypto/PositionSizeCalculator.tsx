"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { NumberInput } from "@/components/ui/NumberInput";
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
            <NumberInput
              label="Account size"
              value={acct}
              onValueChange={setAcct}
              allowNegative={false}
            />
            <NumberInput
              label="Risk per trade"
              suffix="%"
              value={risk}
              onValueChange={setRisk}
              allowNegative={false}
            />
            <NumberInput
              label="Entry price"
              value={entry}
              onValueChange={setEntry}
              allowNegative={false}
            />
            <NumberInput
              label="Stop price"
              value={stop}
              onValueChange={setStop}
              allowNegative={false}
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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
