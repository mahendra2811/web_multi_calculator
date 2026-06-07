"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { NumberInput } from "@/components/ui/NumberInput";
import { BigStat, Stat } from "@/components/calculator/Stat";
import { calculateIncomeTax } from "@/lib/calculators/finance";
import { formatINR } from "@/lib/format";
import type { CalculatorRuntimeProps } from "@/types/calculator";

function IncomeTaxCalculator({ meta }: CalculatorRuntimeProps) {
  const [gross, setGross] = useState(1500000);
  const [d80C, setD80C] = useState(150000);
  const [d80D, setD80D] = useState(25000);
  const [hraEx, setHraEx] = useState(0);
  const [other, setOther] = useState(0);

  const r = useMemo(
    () =>
      calculateIncomeTax({
        gross,
        deduction80C: d80C,
        deduction80D: d80D,
        hraExemption: hraEx,
        other,
      }),
    [gross, d80C, d80D, hraEx, other],
  );

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setGross(1500000);
        setD80C(150000);
        setD80D(25000);
        setHraEx(0);
        setOther(0);
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Old vs New regime · FY 2024-25</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <NumberInput
              label="Gross annual income"
              prefix="₹"
              value={gross}
              onValueChange={setGross}
              allowNegative={false}
            />
            <NumberInput
              label="80C deduction (PPF, ELSS, EPF...)"
              prefix="₹"
              value={d80C}
              onValueChange={setD80C}
              allowNegative={false}
            />
            <NumberInput
              label="80D deduction (health insurance)"
              prefix="₹"
              value={d80D}
              onValueChange={setD80D}
              allowNegative={false}
            />
            <NumberInput
              label="HRA exemption"
              prefix="₹"
              value={hraEx}
              onValueChange={setHraEx}
              allowNegative={false}
            />
            <NumberInput
              label="Other deductions"
              prefix="₹"
              value={other}
              onValueChange={setOther}
              allowNegative={false}
            />
          </CardContent>
        </Card>
      }
      result={
        <Card>
          <CardHeader>
            <CardTitle>Which regime wins?</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 py-4">
            <BigStat
              label={`${r.better === "old" ? "Old" : "New"} regime saves`}
              value={formatINR(r.savings)}
              tone="success"
            />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Stat
                label="Old regime tax"
                value={formatINR(r.oldTax)}
                tone={r.better === "old" ? "success" : "default"}
              />
              <Stat
                label="New regime tax"
                value={formatINR(r.newTax)}
                tone={r.better === "new" ? "success" : "default"}
              />
              <Stat label="Old taxable" value={formatINR(r.oldTaxable)} />
              <Stat label="New taxable" value={formatINR(r.newTaxable)} />
            </div>
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(IncomeTaxCalculator);
