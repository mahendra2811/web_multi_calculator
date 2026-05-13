"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Stat } from "@/components/calculator/Stat";
import { gstAddExclusive, gstRemoveInclusive } from "@/lib/calculators/finance";
import { formatINR } from "@/lib/format";
import type { CalculatorRuntimeProps } from "@/types/calculator";

const SLABS = [0, 5, 12, 18, 28];

function GSTCalculator({ meta }: CalculatorRuntimeProps) {
  const [amount, setAmount] = useState(1000);
  const [gstPct, setGstPct] = useState(18);
  const [mode, setMode] = useState<"exclusive" | "inclusive">("exclusive");

  const r = useMemo(
    () =>
      mode === "exclusive" ? gstAddExclusive(amount, gstPct) : gstRemoveInclusive(amount, gstPct),
    [amount, gstPct, mode],
  );

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setAmount(1000);
        setGstPct(18);
        setMode("exclusive");
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>GST</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={mode === "exclusive" ? "primary" : "secondary"}
                onClick={() => setMode("exclusive")}
                className="flex-1"
              >
                Add GST
              </Button>
              <Button
                size="sm"
                variant={mode === "inclusive" ? "primary" : "secondary"}
                onClick={() => setMode("inclusive")}
                className="flex-1"
              >
                Remove GST
              </Button>
            </div>
            <Input
              type="number"
              label={mode === "exclusive" ? "Base amount" : "Inclusive total"}
              prefix="₹"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value) || 0)}
            />
            <div>
              <span className="text-text-secondary mb-2 block text-sm font-medium">GST slab</span>
              <div className="flex flex-wrap gap-2">
                {SLABS.map((s) => (
                  <Button
                    key={s}
                    size="sm"
                    variant={gstPct === s ? "primary" : "secondary"}
                    onClick={() => setGstPct(s)}
                  >
                    {s}%
                  </Button>
                ))}
                <Input
                  type="number"
                  value={gstPct}
                  onChange={(e) => setGstPct(Number(e.target.value) || 0)}
                  className="!h-9 w-20"
                />
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
          <CardContent className="grid grid-cols-3 gap-3 pt-6">
            <Stat label="Base" value={formatINR(r.base)} tone="secondary" />
            <Stat label="GST" value={formatINR(r.gst)} tone="accent" />
            <Stat label="Total" value={formatINR(r.total)} tone="primary" />
            <div className="col-span-3 mt-4 grid grid-cols-3 gap-3">
              <Stat label="CGST" value={formatINR(r.gst / 2)} />
              <Stat label="SGST" value={formatINR(r.gst / 2)} />
              <Stat label="IGST" value={formatINR(r.gst)} />
            </div>
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(GSTCalculator);
