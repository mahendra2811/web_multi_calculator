"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { BigStat, Stat } from "@/components/calculator/Stat";
import { netWorth } from "@/lib/calculators/finance";
import { formatINR } from "@/lib/format";
import type { CalculatorRuntimeProps } from "@/types/calculator";

interface Item {
  label: string;
  value: number;
}

function NetWorthCalculator({ meta }: CalculatorRuntimeProps) {
  const [assets, setAssets] = useState<Item[]>([
    { label: "Bank savings", value: 200000 },
    { label: "Investments", value: 800000 },
    { label: "Property", value: 5000000 },
  ]);
  const [liabilities, setLiabilities] = useState<Item[]>([
    { label: "Home loan", value: 3500000 },
    { label: "Credit card", value: 50000 },
  ]);

  const r = useMemo(
    () =>
      netWorth(
        assets.map((a) => a.value),
        liabilities.map((l) => l.value),
      ),
    [assets, liabilities],
  );

  const updateItem = (kind: "a" | "l", i: number, field: keyof Item, value: string | number) => {
    const list = kind === "a" ? assets : liabilities;
    const setter = kind === "a" ? setAssets : setLiabilities;
    setter(
      list.map((x, idx) =>
        idx === i ? { ...x, [field]: field === "value" ? Number(value) || 0 : value } : x,
      ),
    );
  };

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setAssets([{ label: "Asset", value: 0 }]);
        setLiabilities([{ label: "Liability", value: 0 }]);
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Assets & liabilities</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div>
              <p className="text-success mb-2 text-xs font-semibold tracking-wide uppercase">
                Assets
              </p>
              <div className="flex flex-col gap-2">
                {assets.map((a, i) => (
                  <div key={i} className="flex items-end gap-2">
                    <Input
                      label={a.label || "Item"}
                      value={a.label}
                      onChange={(e) => updateItem("a", i, "label", e.target.value)}
                    />
                    <Input
                      type="number"
                      prefix="₹"
                      value={a.value}
                      onChange={(e) => updateItem("a", i, "value", e.target.value)}
                    />
                  </div>
                ))}
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setAssets([...assets, { label: "", value: 0 }])}
                >
                  + Add asset
                </Button>
              </div>
            </div>
            <div>
              <p className="text-error mb-2 text-xs font-semibold tracking-wide uppercase">
                Liabilities
              </p>
              <div className="flex flex-col gap-2">
                {liabilities.map((l, i) => (
                  <div key={i} className="flex items-end gap-2">
                    <Input
                      label={l.label || "Item"}
                      value={l.label}
                      onChange={(e) => updateItem("l", i, "label", e.target.value)}
                    />
                    <Input
                      type="number"
                      prefix="₹"
                      value={l.value}
                      onChange={(e) => updateItem("l", i, "value", e.target.value)}
                    />
                  </div>
                ))}
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setLiabilities([...liabilities, { label: "", value: 0 }])}
                >
                  + Add liability
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      }
      result={
        <Card>
          <CardHeader>
            <CardTitle>Net worth</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 py-4">
            <BigStat
              label="Net worth"
              value={formatINR(r.netWorth)}
              tone={r.netWorth >= 0 ? "success" : "error"}
            />
            <div className="grid grid-cols-2 gap-3">
              <Stat label="Total assets" value={formatINR(r.totalAssets)} tone="success" />
              <Stat label="Total liabilities" value={formatINR(r.totalLiabilities)} tone="error" />
            </div>
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(NetWorthCalculator);
