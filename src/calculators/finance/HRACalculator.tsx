"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { BigStat, Stat } from "@/components/calculator/Stat";
import { calculateHRA } from "@/lib/calculators/finance";
import { formatINR } from "@/lib/format";
import type { CalculatorRuntimeProps } from "@/types/calculator";

function HRACalculator({ meta }: CalculatorRuntimeProps) {
  const [basic, setBasic] = useState(50000);
  const [hra, setHra] = useState(20000);
  const [rent, setRent] = useState(18000);
  const [isMetro, setIsMetro] = useState(true);

  const r = useMemo(
    () => calculateHRA({ basicMonthly: basic, hraMonthly: hra, rentMonthly: rent, isMetro }),
    [basic, hra, rent, isMetro],
  );

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setBasic(50000);
        setHra(20000);
        setRent(18000);
        setIsMetro(true);
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Monthly amounts</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Input
              type="number"
              label="Basic salary"
              prefix="₹"
              value={basic}
              onChange={(e) => setBasic(Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              label="HRA received"
              prefix="₹"
              value={hra}
              onChange={(e) => setHra(Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              label="Rent paid"
              prefix="₹"
              value={rent}
              onChange={(e) => setRent(Number(e.target.value) || 0)}
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={isMetro ? "primary" : "secondary"}
                onClick={() => setIsMetro(true)}
                className="flex-1"
              >
                Metro (50%)
              </Button>
              <Button
                size="sm"
                variant={!isMetro ? "primary" : "secondary"}
                onClick={() => setIsMetro(false)}
                className="flex-1"
              >
                Non-metro (40%)
              </Button>
            </div>
          </CardContent>
        </Card>
      }
      result={
        <Card>
          <CardHeader>
            <CardTitle>Annual exemption</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 py-4">
            <BigStat label="Exempt HRA" value={formatINR(r.exempt)} tone="success" />
            <div className="grid grid-cols-2 gap-3">
              <Stat label="Taxable HRA" value={formatINR(r.taxable)} tone="error" />
              <Stat label="Actual HRA" value={formatINR(r.actual)} />
              <Stat
                label={isMetro ? "50% of basic" : "40% of basic"}
                value={formatINR(r.pctBasic)}
              />
              <Stat label="Rent − 10% basic" value={formatINR(r.rentMinusBasic)} />
            </div>
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(HRACalculator);
