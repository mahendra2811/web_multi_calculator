"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { NumberInput } from "@/components/ui/NumberInput";
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
          <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <NumberInput
              label="Current age"
              value={currentAge}
              onValueChange={setCurrentAge}
              allowNegative={false}
            />
            <NumberInput
              label="Retire age"
              value={retireAge}
              onValueChange={setRetireAge}
              allowNegative={false}
            />
            <NumberInput
              label="Life expectancy"
              value={lifeExp}
              onValueChange={setLifeExp}
              allowNegative={false}
            />
            <NumberInput
              label="Monthly exp (today)"
              prefix="₹"
              value={monthlyExp}
              onValueChange={setMonthlyExp}
              allowNegative={false}
            />
            <NumberInput
              label="Inflation"
              suffix="%"
              value={inflation}
              onValueChange={setInflation}
              allowNegative={false}
            />
            <NumberInput
              label="Pre-retire return"
              suffix="%"
              value={preReturn}
              onValueChange={setPreReturn}
              allowNegative={false}
            />
            <NumberInput
              label="Post-retire return"
              suffix="%"
              value={postReturn}
              onValueChange={setPostReturn}
              allowNegative={false}
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
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
