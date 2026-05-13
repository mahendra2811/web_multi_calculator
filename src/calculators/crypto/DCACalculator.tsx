"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { BigStat, Stat } from "@/components/calculator/Stat";
import { calculateDCA } from "@/lib/calculators/crypto";
import { GrowthChart } from "@/components/charts/GrowthChart";
import { formatNumber } from "@/lib/format";
import type { CalculatorRuntimeProps } from "@/types/calculator";

function DCACalculator({ meta }: CalculatorRuntimeProps) {
  const [perBuy, setPerBuy] = useState(100);
  const [pricesRaw, setPricesRaw] = useState("100, 80, 60, 90, 120, 150");

  const prices = useMemo(
    () =>
      pricesRaw
        .split(/[,\s]+/)
        .map((s) => parseFloat(s))
        .filter((n) => Number.isFinite(n) && n > 0),
    [pricesRaw],
  );

  const r = useMemo(() => calculateDCA({ perBuy, prices }), [perBuy, prices]);
  const chart = r.schedule.map((s) => ({
    year: s.step,
    invested: s.step * perBuy,
    total: Math.round(s.value),
  }));

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setPerBuy(100);
        setPricesRaw("");
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Input
              type="number"
              label="Per-buy amount"
              value={perBuy}
              onChange={(e) => setPerBuy(Number(e.target.value) || 0)}
            />
            <label className="text-text-secondary text-sm font-medium">
              Prices at each buy (comma-separated)
            </label>
            <textarea
              value={pricesRaw}
              onChange={(e) => setPricesRaw(e.target.value)}
              className="bg-surface-elevated text-text border-border min-h-[120px] w-full rounded-lg border p-3 text-sm outline-none"
            />
          </CardContent>
        </Card>
      }
      result={
        <div className="flex flex-col gap-4">
          <Card>
            <CardContent className="grid grid-cols-2 gap-3 pt-6 sm:grid-cols-4">
              <Stat label="Units" value={r.units.toFixed(4)} tone="primary" />
              <Stat label="Avg cost" value={formatNumber(r.avg, "en-IN", 2)} tone="secondary" />
              <Stat label="Invested" value={formatNumber(r.invested, "en-IN", 2)} />
              <Stat label="Current value" value={formatNumber(r.currentValue, "en-IN", 2)} />
              <div className="col-span-full">
                <BigStat
                  label="Net P/L"
                  value={formatNumber(r.netProfit, "en-IN", 2)}
                  tone={r.netProfit >= 0 ? "success" : "error"}
                />
              </div>
            </CardContent>
          </Card>
          {chart.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">DCA accumulation</CardTitle>
              </CardHeader>
              <CardContent>
                <GrowthChart data={chart} />
              </CardContent>
            </Card>
          )}
        </div>
      }
    />
  );
}

export default memo(DCACalculator);
