"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { BigStat } from "@/components/calculator/Stat";
import { addToDate } from "@/lib/calculators/datetime";
import type { CalculatorRuntimeProps } from "@/types/calculator";

type Unit = "day" | "week" | "month" | "year";
const UNITS: { id: Unit; label: string }[] = [
  { id: "day", label: "Days" },
  { id: "week", label: "Weeks" },
  { id: "month", label: "Months" },
  { id: "year", label: "Years" },
];

function DateAddCalculator({ meta }: CalculatorRuntimeProps) {
  const today = new Date().toISOString().slice(0, 10);
  const [start, setStart] = useState(today);
  const [amount, setAmount] = useState(30);
  const [unit, setUnit] = useState<Unit>("day");

  const result = useMemo(() => addToDate(start, amount, unit), [start, amount, unit]);
  const subtract = useMemo(() => addToDate(start, -amount, unit), [start, amount, unit]);

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setStart(today);
        setAmount(30);
        setUnit("day");
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Input
              type="date"
              label="Start date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
            <Input
              type="number"
              label="Amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value) || 0)}
            />
            <div>
              <span className="text-text-secondary mb-2 block text-sm font-medium">Unit</span>
              <div className="flex flex-wrap gap-2">
                {UNITS.map((u) => (
                  <Button
                    key={u.id}
                    size="sm"
                    variant={unit === u.id ? "primary" : "secondary"}
                    onClick={() => setUnit(u.id)}
                  >
                    {u.label}
                  </Button>
                ))}
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
          <CardContent className="flex flex-col items-center gap-6 py-6">
            <BigStat
              label="After +"
              value={
                result
                  ? result.toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "—"
              }
            />
            <p className="text-text-secondary text-center text-sm">
              −{amount} {unit}s:{" "}
              <span className="text-text font-semibold">
                {subtract
                  ? subtract.toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "—"}
              </span>
            </p>
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(DateAddCalculator);
