"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { BigStat, Stat } from "@/components/calculator/Stat";
import { ageFrom } from "@/lib/calculators/datetime";
import { formatNumber } from "@/lib/format";
import type { CalculatorRuntimeProps } from "@/types/calculator";

function AgeCalculator({ meta }: CalculatorRuntimeProps) {
  const [dob, setDob] = useState("1995-01-01");
  const r = useMemo(() => ageFrom(dob), [dob]);

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => setDob("")}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Date of birth</CardTitle>
          </CardHeader>
          <CardContent>
            <Input type="date" label="DOB" value={dob} onChange={(e) => setDob(e.target.value)} />
          </CardContent>
        </Card>
      }
      result={
        <Card>
          <CardHeader>
            <CardTitle>Age</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 py-4">
            {r ? (
              <>
                <BigStat label="Age" value={`${r.years} yr ${r.months} mo ${r.days} d`} />
                <div className="grid grid-cols-2 gap-4">
                  <Stat label="Total months" value={formatNumber(r.totalMonths, "en-IN", 0)} />
                  <Stat label="Total weeks" value={formatNumber(r.totalWeeks, "en-IN", 0)} />
                  <Stat label="Total days" value={formatNumber(r.totalDays, "en-IN", 0)} />
                  <Stat label="Next birthday" value={`${r.daysToBirthday} days`} tone="secondary" />
                  <div className="col-span-2">
                    <Stat label="Born on" value={r.dayOfWeek} />
                  </div>
                </div>
              </>
            ) : (
              <p className="text-text-secondary">Enter a valid date.</p>
            )}
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(AgeCalculator);
