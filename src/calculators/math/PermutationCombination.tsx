"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
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
            <Input
              type="number"
              label="n (total)"
              value={n}
              onChange={(e) => setN(Math.max(0, Number(e.target.value) || 0))}
            />
            <Input
              type="number"
              label="r (chosen)"
              value={r}
              onChange={(e) => setR(Math.max(0, Number(e.target.value) || 0))}
            />
          </CardContent>
        </Card>
      }
      result={
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
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
