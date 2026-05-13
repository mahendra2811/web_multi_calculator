"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { BigStat, Stat } from "@/components/calculator/Stat";
import { calculatePregnancyDueDate } from "@/lib/calculators/health";
import type { CalculatorRuntimeProps } from "@/types/calculator";

function PregnancyDueDate({ meta }: CalculatorRuntimeProps) {
  const [lmp, setLmp] = useState(() => new Date().toISOString().slice(0, 10));
  const r = useMemo(() => calculatePregnancyDueDate(lmp), [lmp]);

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => setLmp(new Date().toISOString().slice(0, 10))}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Last menstrual period</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="date"
              label="First day of LMP"
              value={lmp}
              onChange={(e) => setLmp(e.target.value)}
            />
          </CardContent>
        </Card>
      }
      result={
        <Card>
          <CardHeader>
            <CardTitle>Estimated due date</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6 py-6">
            <BigStat
              label="Due date"
              value={
                r
                  ? r.due.toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "—"
              }
            />
            {r && (
              <div className="grid w-full grid-cols-2 gap-4">
                <Stat label="Current week" value={`${r.week} weeks`} />
                <Stat label="Trimester" value={`${r.trimester}`} />
              </div>
            )}
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(PregnancyDueDate);
