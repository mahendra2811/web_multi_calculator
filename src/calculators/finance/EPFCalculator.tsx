"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { NumberInput } from "@/components/ui/NumberInput";
import { Stat } from "@/components/calculator/Stat";
import { calculateEPF, EPF_INTEREST_RATE } from "@/lib/calculators/finance";
import { formatINR } from "@/lib/format";
import type { CalculatorRuntimeProps } from "@/types/calculator";

function EPFCalculator({ meta }: CalculatorRuntimeProps) {
  const [basic, setBasic] = useState(30000);
  const [age, setAge] = useState(30);
  const [retire, setRetire] = useState(58);
  const [balance, setBalance] = useState(0);

  const r = useMemo(
    () =>
      calculateEPF({
        basicDA: basic,
        currentAge: age,
        retirementAge: retire,
        currentBalance: balance,
      }),
    [basic, age, retire, balance],
  );

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setBasic(30000);
        setAge(30);
        setRetire(58);
        setBalance(0);
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>EPF inputs</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <NumberInput
              label="Basic + DA (monthly)"
              prefix="₹"
              value={basic}
              onValueChange={setBasic}
              allowNegative={false}
            />
            <NumberInput
              label="Current age"
              value={age}
              onValueChange={setAge}
              allowNegative={false}
            />
            <NumberInput
              label="Retirement age"
              value={retire}
              onValueChange={setRetire}
              allowNegative={false}
            />
            <NumberInput
              label="Current EPF balance"
              prefix="₹"
              value={balance}
              onValueChange={setBalance}
              allowNegative={false}
            />
            <p className="text-text-tertiary text-xs">
              Interest rate: {EPF_INTEREST_RATE}% (FY 2024-25)
            </p>
          </CardContent>
        </Card>
      }
      result={
        <Card>
          <CardHeader>
            <CardTitle>EPF maturity</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Stat label="Employee contribution" value={formatINR(r.employee)} tone="secondary" />
            <Stat label="Employer contribution" value={formatINR(r.employer)} />
            <Stat label="Total contribution" value={formatINR(r.totalContribution)} />
            <Stat label="Interest earned" value={formatINR(r.interest)} tone="accent" />
            <div className="col-span-1 sm:col-span-2">
              <Stat label="Maturity amount" value={formatINR(r.maturity)} tone="primary" />
            </div>
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(EPFCalculator);
