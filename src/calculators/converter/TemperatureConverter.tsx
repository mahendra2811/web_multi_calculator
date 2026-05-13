"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Stat } from "@/components/calculator/Stat";
import { convertTemperature, type TempUnit } from "@/lib/calculators/converter";
import { formatNumber } from "@/lib/format";
import type { CalculatorRuntimeProps } from "@/types/calculator";

const UNITS: { id: TempUnit; label: string }[] = [
  { id: "C", label: "Celsius (°C)" },
  { id: "F", label: "Fahrenheit (°F)" },
  { id: "K", label: "Kelvin (K)" },
];

function TemperatureConverter({ meta }: CalculatorRuntimeProps) {
  const [value, setValue] = useState(25);
  const [from, setFrom] = useState<TempUnit>("C");

  const result = useMemo(
    () => ({
      C: convertTemperature(value, from, "C"),
      F: convertTemperature(value, from, "F"),
      K: convertTemperature(value, from, "K"),
    }),
    [value, from],
  );

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setValue(25);
        setFrom("C");
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Convert from</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Input
              type="number"
              label="Value"
              value={value}
              onChange={(e) => setValue(Number(e.target.value) || 0)}
              suffix={`°${from}`}
            />
            <div className="flex gap-2">
              {UNITS.map((u) => (
                <Button
                  key={u.id}
                  size="sm"
                  variant={from === u.id ? "primary" : "secondary"}
                  onClick={() => setFrom(u.id)}
                  className="flex-1"
                >
                  {u.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      }
      result={
        <Card>
          <CardHeader>
            <CardTitle>All scales</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Stat
              label="Celsius"
              value={`${formatNumber(result.C, "en-IN", 2)} °C`}
              tone={from === "C" ? "primary" : "default"}
            />
            <Stat
              label="Fahrenheit"
              value={`${formatNumber(result.F, "en-IN", 2)} °F`}
              tone={from === "F" ? "primary" : "default"}
            />
            <Stat
              label="Kelvin"
              value={`${formatNumber(result.K, "en-IN", 2)} K`}
              tone={from === "K" ? "primary" : "default"}
            />
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(TemperatureConverter);
