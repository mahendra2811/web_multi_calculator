"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { BigStat, Stat } from "@/components/calculator/Stat";
import { calculateWaterIntake } from "@/lib/calculators/health";
import type { CalculatorRuntimeProps } from "@/types/calculator";

function WaterIntakeCalculator({ meta }: CalculatorRuntimeProps) {
  const [weight, setWeight] = useState(70);
  const [hours, setHours] = useState(1);
  const ml = useMemo(() => calculateWaterIntake(weight, hours), [weight, hours]);

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setWeight(70);
        setHours(1);
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Input
              type="number"
              label="Weight"
              suffix="kg"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              label="Daily exercise"
              suffix="hr"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value) || 0)}
            />
          </CardContent>
        </Card>
      }
      result={
        <Card>
          <CardHeader>
            <CardTitle>Daily target</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6 py-6">
            <BigStat label="Water" value={`${(ml / 1000).toFixed(2)} L`} />
            <div className="grid w-full grid-cols-2 gap-4">
              <Stat label="In milliliters" value={`${Math.round(ml)} ml`} />
              <Stat label="In 250 ml glasses" value={`${Math.round(ml / 250)} glasses`} />
            </div>
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(WaterIntakeCalculator);
