"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { NumberInput } from "@/components/ui/NumberInput";
import { Stat } from "@/components/calculator/Stat";
import { combinations, factorial, permutations } from "@/lib/calculators/math";
import { formatNumber } from "@/lib/format";
import type { CalculatorRuntimeProps } from "@/types/calculator";

function PermutationCombination({ meta }: CalculatorRuntimeProps) {
  const [n, setN] = useState(5);
  const [r, setR] = useState(2);

  const result = useMemo(
    () => ({
      perm: permutations(n, r),
      comb: combinations(n, r),
      nFact: factorial(n),
      rFact: factorial(r),
    }),
    [n, r],
  );

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setN(5);
        setR(2);
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>n and r</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <NumberInput label="n (total)" value={n} onValueChange={setN} allowNegative={false} />
            <NumberInput label="r (chosen)" value={r} onValueChange={setR} allowNegative={false} />
          </CardContent>
        </Card>
      }
      result={
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Stat
              label={`P(${n},${r})`}
              value={formatNumber(result.perm, "en-IN", 0)}
              tone="primary"
            />
            <Stat
              label={`C(${n},${r})`}
              value={formatNumber(result.comb, "en-IN", 0)}
              tone="secondary"
            />
            <Stat
              label={`${n}!`}
              value={Number.isFinite(result.nFact) ? formatNumber(result.nFact, "en-IN", 0) : "∞"}
            />
            <Stat
              label={`${r}!`}
              value={Number.isFinite(result.rFact) ? formatNumber(result.rFact, "en-IN", 0) : "∞"}
            />
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(PermutationCombination);
