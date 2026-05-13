"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
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
          <CardContent className="grid grid-cols-3 gap-3">
            <Input
              label="a"
              type="number"
              value={a}
              onChange={(e) => setA(Number(e.target.value) || 0)}
            />
            <Input
              label="b"
              type="number"
              value={b}
              onChange={(e) => setB(Number(e.target.value) || 0)}
            />
            <Input
              label="c"
              type="number"
              value={c}
              onChange={(e) => setC(Number(e.target.value) || 0)}
            />
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
              <div className="grid grid-cols-2 gap-3">
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
