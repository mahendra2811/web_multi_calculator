"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { NumberInput } from "@/components/ui/NumberInput";
import { Button } from "@/components/ui/Button";
import { BigStat } from "@/components/calculator/Stat";
import {
  fractionAdd,
  fractionDivide,
  fractionMultiply,
  fractionSubtract,
} from "@/lib/calculators/math";
import type { CalculatorRuntimeProps } from "@/types/calculator";

const OPS = ["+", "−", "×", "÷"] as const;
type Op = (typeof OPS)[number];

function FractionCalculator({ meta }: CalculatorRuntimeProps) {
  const [a1, setA1] = useState(1);
  const [a2, setA2] = useState(2);
  const [b1, setB1] = useState(1);
  const [b2, setB2] = useState(3);
  const [op, setOp] = useState<Op>("+");

  const result = useMemo(() => {
    const a = { num: a1, den: a2 || 1 };
    const b = { num: b1, den: b2 || 1 };
    if (op === "+") return fractionAdd(a, b);
    if (op === "−") return fractionSubtract(a, b);
    if (op === "×") return fractionMultiply(a, b);
    return fractionDivide(a, b);
  }, [a1, a2, b1, b2, op]);

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setA1(1);
        setA2(2);
        setB1(1);
        setB2(3);
        setOp("+");
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Fractions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-1">
                <NumberInput value={a1} onValueChange={setA1} />
                <div className="border-border border-t" />
                <NumberInput value={a2} onValueChange={setA2} />
              </div>
              <div className="flex flex-wrap gap-1">
                {OPS.map((o) => (
                  <Button
                    key={o}
                    size="sm"
                    variant={op === o ? "primary" : "secondary"}
                    onClick={() => setOp(o)}
                  >
                    {o}
                  </Button>
                ))}
              </div>
              <div className="flex flex-col gap-1">
                <NumberInput value={b1} onValueChange={setB1} />
                <div className="border-border border-t" />
                <NumberInput value={b2} onValueChange={setB2} />
              </div>
            </div>
          </CardContent>
        </Card>
      }
      result={
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4 py-8">
            <BigStat label="Reduced fraction" value={`${result.num} / ${result.den}`} />
            <p className="text-text-secondary text-sm">
              Decimal: {(result.num / result.den).toFixed(4)}
            </p>
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(FractionCalculator);
