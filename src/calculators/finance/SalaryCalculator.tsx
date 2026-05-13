"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { BigStat, Stat } from "@/components/calculator/Stat";
import { salaryBreakdown } from "@/lib/calculators/finance";
import { formatINR } from "@/lib/format";
import type { CalculatorRuntimeProps } from "@/types/calculator";

function SalaryCalculator({ meta }: CalculatorRuntimeProps) {
  const [ctc, setCtc] = useState(1500000);
  const r = useMemo(() => salaryBreakdown(ctc), [ctc]);

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => setCtc(1500000)}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>CTC</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="number"
              label="Annual CTC"
              prefix="₹"
              value={ctc}
              onChange={(e) => setCtc(Number(e.target.value) || 0)}
              hint="Uses new tax regime + 12% EPF assumption"
            />
          </CardContent>
        </Card>
      }
      result={
        <Card>
          <CardHeader>
            <CardTitle>In-hand breakdown</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 py-4">
            <BigStat label="In-hand monthly" value={formatINR(r.inHandMonthly)} tone="primary" />
            <div className="grid grid-cols-2 gap-3">
              <Stat label="In-hand annual" value={formatINR(r.inHandAnnual)} tone="primary" />
              <Stat label="Gross annual" value={formatINR(r.gross)} />
              <Stat label="Basic" value={formatINR(r.basic)} />
              <Stat label="HRA" value={formatINR(r.hra)} />
              <Stat label="EPF (employee)" value={formatINR(r.epfEmployee)} />
              <Stat label="EPF (employer)" value={formatINR(r.epfEmployer)} />
              <Stat label="Tax (new regime)" value={formatINR(r.tax)} tone="error" />
            </div>
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(SalaryCalculator);
