"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Stat } from "@/components/calculator/Stat";
import { convertBase, type NumberBase } from "@/lib/calculators/math";
import type { CalculatorRuntimeProps } from "@/types/calculator";

const BASES: { id: NumberBase; label: string }[] = [
  { id: "bin", label: "Binary" },
  { id: "oct", label: "Octal" },
  { id: "dec", label: "Decimal" },
  { id: "hex", label: "Hex" },
];

function NumberSystemConverter({ meta }: CalculatorRuntimeProps) {
  const [from, setFrom] = useState<NumberBase>("dec");
  const [value, setValue] = useState("255");

  const conv = useMemo(() => {
    return {
      bin: convertBase(value, from, "bin"),
      oct: convertBase(value, from, "oct"),
      dec: convertBase(value, from, "dec"),
      hex: convertBase(value, from, "hex"),
    };
  }, [value, from]);

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setFrom("dec");
        setValue("");
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Input
              label={`Value (${from})`}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <div>
              <span className="text-text-secondary mb-2 block text-sm font-medium">From base</span>
              <div className="flex flex-wrap gap-2">
                {BASES.map((b) => (
                  <Button
                    key={b.id}
                    size="sm"
                    variant={from === b.id ? "primary" : "secondary"}
                    onClick={() => setFrom(b.id)}
                  >
                    {b.label}
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
            <CardTitle>All bases</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Stat label="Binary" value={conv.bin || "—"} />
            <Stat label="Octal" value={conv.oct || "—"} />
            <Stat label="Decimal" value={conv.dec || "—"} tone="primary" />
            <Stat label="Hex" value={conv.hex || "—"} />
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(NumberSystemConverter);
