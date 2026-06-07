"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { NumberInput } from "@/components/ui/NumberInput";
import { Stat } from "@/components/calculator/Stat";
import { GrowthChart } from "@/components/charts/GrowthChart";
import {
  calculatePPF,
  PPF_DEFAULT_RATE,
  PPF_MAX_INVESTMENT,
  PPF_TENURE,
} from "@/lib/calculators/finance";
import { formatINR } from "@/lib/format";
import type { CalculatorRuntimeProps } from "@/types/calculator";

function PPFCalculator({ meta }: CalculatorRuntimeProps) {
  const [yearly, setYearly] = useState(150000);
  const [rate, setRate] = useState(PPF_DEFAULT_RATE);

  const r = useMemo(() => calculatePPF({ yearly, ratePct: rate }), [yearly, rate]);

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setYearly(PPF_MAX_INVESTMENT);
        setRate(PPF_DEFAULT_RATE);
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>PPF inputs</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <NumberInput
              label="Yearly investment"
              prefix="₹"
              value={yearly}
              onValueChange={setYearly}
              allowNegative={false}
              hint={`Cap: ₹${PPF_MAX_INVESTMENT.toLocaleString()}`}
            />
            <NumberInput
              label="Interest rate"
              suffix="%"
              value={rate}
              onValueChange={setRate}
              allowNegative={false}
            />
            <p className="text-text-tertiary text-xs">Tenure fixed at {PPF_TENURE} years.</p>
          </CardContent>
        </Card>
      }
      result={
        <div className="flex flex-col gap-4">
          <Card>
            <CardContent className="grid grid-cols-1 gap-3 pt-6 sm:grid-cols-3">
              <Stat label="Invested" value={formatINR(r.invested)} tone="secondary" />
              <Stat label="Interest" value={formatINR(r.interest)} tone="accent" />
              <Stat label="Maturity" value={formatINR(r.total)} tone="primary" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">15-year growth</CardTitle>
            </CardHeader>
            <CardContent>
              <GrowthChart data={r.schedule} />
            </CardContent>
          </Card>
        </div>
      }
    />
  );
}

export default memo(PPFCalculator);
