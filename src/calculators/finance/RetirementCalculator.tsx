"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { BigStat, Stat } from "@/components/calculator/Stat";
import { calculateRetirement } from "@/lib/calculators/finance";
import { formatINR } from "@/lib/format";
import type { CalculatorRuntimeProps } from "@/types/calculator";

function RetirementCalculator({ meta }: CalculatorRuntimeProps) {
  const [currentAge, setCurrentAge] = useState(30);
  const [retireAge, setRetireAge] = useState(60);
  const [lifeExp, setLifeExp] = useState(85);
  const [monthlyExp, setMonthlyExp] = useState(50000);
  const [inflation, setInflation] = useState(6);
  const [preReturn, setPreReturn] = useState(12);
  const [postReturn, setPostReturn] = useState(8);

  const r = useMemo(
    () =>
      calculateRetirement({
        currentAge,
        retirementAge: retireAge,
        lifeExpectancy: lifeExp,
        monthlyExpense: monthlyExp,
        inflationPct: inflation,
        preReturnPct: preReturn,
        postReturnPct: postReturn,
      }),
    [currentAge, retireAge, lifeExp, monthlyExp, inflation, preReturn, postReturn],
  );

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setCurrentAge(30);
        setRetireAge(60);
        setLifeExp(85);
        setMonthlyExp(50000);
        setInflation(6);
        setPreReturn(12);
        setPostReturn(8);
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Retirement plan</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              label="Current age"
              value={currentAge}
              onChange={(e) => setCurrentAge(Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              label="Retire age"
              value={retireAge}
              onChange={(e) => setRetireAge(Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              label="Life expectancy"
              value={lifeExp}
              onChange={(e) => setLifeExp(Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              label="Monthly exp (today)"
              prefix="₹"
              value={monthlyExp}
              onChange={(e) => setMonthlyExp(Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              label="Inflation"
              suffix="%"
              value={inflation}
              onChange={(e) => setInflation(Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              label="Pre-retire return"
              suffix="%"
              value={preReturn}
              onChange={(e) => setPreReturn(Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              label="Post-retire return"
              suffix="%"
              value={postReturn}
              onChange={(e) => setPostReturn(Number(e.target.value) || 0)}
            />
          </CardContent>
        </Card>
      }
      result={
        <Card>
          <CardHeader>
            <CardTitle>You will need</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 py-4">
            <BigStat label="Corpus at retirement" value={formatINR(r.corpus)} tone="primary" />
            <div className="grid grid-cols-2 gap-3">
              <Stat label="Monthly SIP needed" value={formatINR(r.monthlySip)} tone="secondary" />
              <Stat label="Monthly expense @ retirement" value={formatINR(r.expenseAtRetirement)} />
              <Stat label="Years to retire" value={`${r.yrsTo}`} />
              <Stat label="Years in retirement" value={`${r.yrsAfter}`} />
            </div>
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(RetirementCalculator);
