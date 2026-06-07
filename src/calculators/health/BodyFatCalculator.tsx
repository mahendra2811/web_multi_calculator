"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { NumberInput } from "@/components/ui/NumberInput";
import { Button } from "@/components/ui/Button";
import { BigStat } from "@/components/calculator/Stat";
import { calculateBodyFat } from "@/lib/calculators/health";
import type { CalculatorRuntimeProps } from "@/types/calculator";

function BodyFatCalculator({ meta }: CalculatorRuntimeProps) {
  const [sex, setSex] = useState<"male" | "female">("male");
  const [height, setHeight] = useState(175);
  const [neck, setNeck] = useState(38);
  const [waist, setWaist] = useState(85);
  const [hip, setHip] = useState(95);

  const bf = useMemo(
    () => calculateBodyFat({ sex, heightCm: height, neckCm: neck, waistCm: waist, hipCm: hip }),
    [sex, height, neck, waist, hip],
  );

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setHeight(175);
        setNeck(38);
        setWaist(85);
        setHip(95);
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Measurements (US Navy)</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={sex === "male" ? "primary" : "secondary"}
                onClick={() => setSex("male")}
                className="flex-1"
              >
                Male
              </Button>
              <Button
                size="sm"
                variant={sex === "female" ? "primary" : "secondary"}
                onClick={() => setSex("female")}
                className="flex-1"
              >
                Female
              </Button>
            </div>
            <NumberInput
              label="Height"
              suffix="cm"
              value={height}
              onValueChange={setHeight}
              allowNegative={false}
            />
            <NumberInput
              label="Neck"
              suffix="cm"
              value={neck}
              onValueChange={setNeck}
              allowNegative={false}
            />
            <NumberInput
              label="Waist"
              suffix="cm"
              value={waist}
              onValueChange={setWaist}
              allowNegative={false}
            />
            {sex === "female" && (
              <NumberInput
                label="Hip"
                suffix="cm"
                value={hip}
                onValueChange={setHip}
                allowNegative={false}
              />
            )}
          </CardContent>
        </Card>
      }
      result={
        <Card>
          <CardHeader>
            <CardTitle>Body fat</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center py-12">
            <BigStat
              label="Estimated"
              value={Number.isFinite(bf) ? `${bf.toFixed(1)}%` : "—"}
              tone="primary"
            />
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(BodyFatCalculator);
