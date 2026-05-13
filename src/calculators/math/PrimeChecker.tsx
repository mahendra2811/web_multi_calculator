"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { BigStat } from "@/components/calculator/Stat";
import { isPrime, primeFactors } from "@/lib/calculators/math";
import type { CalculatorRuntimeProps } from "@/types/calculator";

function PrimeChecker({ meta }: CalculatorRuntimeProps) {
  const [n, setN] = useState(91);

  const result = useMemo(() => {
    const prime = isPrime(n);
    const factors = prime ? [n] : primeFactors(n);
    return { prime, factors };
  }, [n]);

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => setN(0)}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Number</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="number"
              label="N"
              value={n}
              onChange={(e) => setN(Number(e.target.value) || 0)}
            />
          </CardContent>
        </Card>
      }
      result={
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4 py-8">
            <BigStat
              label={result.prime ? "Status" : "Status"}
              value={result.prime ? "Prime ✓" : "Composite"}
              tone={result.prime ? "success" : "error"}
            />
            {!result.prime && result.factors.length > 0 && (
              <p className="text-text-secondary text-center text-sm break-words">
                Prime factors: {result.factors.join(" × ")}
              </p>
            )}
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(PrimeChecker);
