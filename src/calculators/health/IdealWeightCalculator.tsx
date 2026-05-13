"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Stat } from "@/components/calculator/Stat";
import { calculateIdealWeight } from "@/lib/calculators/health";
import type { CalculatorRuntimeProps } from "@/types/calculator";

function IdealWeightCalculator({ meta }: CalculatorRuntimeProps) {
  const [sex, setSex] = useState<"male" | "female">("male");
  const [height, setHeight] = useState(175);

  const r = useMemo(() => calculateIdealWeight({ sex, heightCm: height }), [sex, height]);

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => setHeight(175)}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
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
            <Input
              type="number"
              label="Height"
              suffix="cm"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value) || 0)}
            />
          </CardContent>
        </Card>
      }
      result={
        <Card>
          <CardHeader>
            <CardTitle>Estimates (kg)</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Stat label="Robinson" value={r.robinson.toFixed(1)} tone="primary" />
            <Stat label="Miller" value={r.miller.toFixed(1)} />
            <Stat label="Devine" value={r.devine.toFixed(1)} />
            <Stat label="Hamwi" value={r.hamwi.toFixed(1)} />
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(IdealWeightCalculator);
