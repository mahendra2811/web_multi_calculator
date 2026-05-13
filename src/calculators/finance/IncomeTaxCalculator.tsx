"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
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
            <Input
              type="number"
              label="Gross annual income"
              prefix="₹"
              value={gross}
              onChange={(e) => setGross(Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              label="80C deduction (PPF, ELSS, EPF...)"
              prefix="₹"
              value={d80C}
              onChange={(e) => setD80C(Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              label="80D deduction (health insurance)"
              prefix="₹"
              value={d80D}
              onChange={(e) => setD80D(Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              label="HRA exemption"
              prefix="₹"
              value={hraEx}
              onChange={(e) => setHraEx(Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              label="Other deductions"
              prefix="₹"
              value={other}
              onChange={(e) => setOther(Number(e.target.value) || 0)}
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
            <div className="grid grid-cols-2 gap-3">
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
