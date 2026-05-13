"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Stat } from "@/components/calculator/Stat";
import { convertFactorBased, type Unit } from "@/lib/calculators/converter";
import { formatNumber } from "@/lib/format";
import type { CalculatorRuntimeProps } from "@/types/calculator";

interface Props extends CalculatorRuntimeProps {
  units: Unit[];
}

function UnitConverter({ meta, units }: Props) {
  const [value, setValue] = useState(1);
  const [fromId, setFromId] = useState(units[0].id);

  const from = units.find((u) => u.id === fromId) ?? units[0];
  const conversions = useMemo(() => {
    return units.map((u) => ({ unit: u, value: convertFactorBased(value, from, u) }));
  }, [value, from, units]);

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setValue(1);
        setFromId(units[0].id);
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
              suffix={from.id}
            />
            <label className="text-text-secondary text-sm font-medium">From unit</label>
            <select
              value={fromId}
              onChange={(e) => setFromId(e.target.value)}
              className="bg-surface-elevated text-text border-border focus:border-primary h-11 w-full rounded-lg border px-3 text-sm outline-none"
            >
              {units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.label}
                </option>
              ))}
            </select>
          </CardContent>
        </Card>
      }
      result={
        <Card>
          <CardHeader>
            <CardTitle>All units</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {conversions.map(({ unit, value: v }) => (
              <Stat
                key={unit.id}
                label={unit.label}
                value={formatNumber(v, "en-IN", Math.abs(v) < 1 ? 6 : 4)}
                tone={unit.id === fromId ? "primary" : "default"}
              />
            ))}
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(UnitConverter);
