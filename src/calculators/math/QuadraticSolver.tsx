"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { NumberInput } from "@/components/ui/NumberInput";
import { Stat, BigStat } from "@/components/calculator/Stat";
import { quadraticRoots } from "@/lib/calculators/math";
import type { CalculatorRuntimeProps } from "@/types/calculator";

function QuadraticSolver({ meta }: CalculatorRuntimeProps) {
  const [a, setA] = useState(1);
  const [b, setB] = useState(-5);
  const [c, setC] = useState(6);

  const result = useMemo(() => quadraticRoots(a, b, c), [a, b, c]);

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setA(1);
        setB(0);
        setC(0);
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>ax² + bx + c = 0</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <NumberInput label="a" value={a} onValueChange={setA} />
            <NumberInput label="b" value={b} onValueChange={setB} />
            <NumberInput label="c" value={c} onValueChange={setC} />
          </CardContent>
        </Card>
      }
      result={
        <Card>
          <CardHeader>
            <CardTitle>Roots</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 py-4">
            <BigStat
              label={
                result.kind === "complex"
                  ? "Complex"
                  : result.kind === "real-equal"
                    ? "Repeated root"
                    : result.kind === "linear"
                      ? "Linear"
                      : "Real roots"
              }
              value={
                result.kind === "complex"
                  ? `${result.roots[0].re.toFixed(2)} ± ${Math.abs(result.roots[0].im).toFixed(2)}i`
                  : result.kind === "invalid"
                    ? "—"
                    : (result.roots as number[]).map((r) => r.toFixed(2)).join(", ")
              }
              tone={result.kind === "complex" ? "secondary" : "primary"}
            />
            {result.kind !== "invalid" && "discriminant" in result && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Stat label="Discriminant" value={String(result.discriminant)} />
                <Stat label="Type" value={result.kind} />
              </div>
            )}
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(QuadraticSolver);
