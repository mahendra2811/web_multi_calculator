"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Stat } from "@/components/calculator/Stat";
import type { CalculatorRuntimeProps } from "@/types/calculator";

// Offline approximation rates (USD = 1). Live rates plug-in TODO.
const RATES: Record<string, number> = {
  USD: 1,
  INR: 83.2,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 153,
  AUD: 1.51,
  CAD: 1.36,
  SGD: 1.34,
  AED: 3.67,
  CNY: 7.24,
};

function CurrencyConverter({ meta }: CalculatorRuntimeProps) {
  const [amount, setAmount] = useState(100);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");

  const allRows = useMemo(
    () =>
      Object.keys(RATES).map((code) => ({
        code,
        value: (amount / RATES[from]) * RATES[code],
      })),
    [amount, from],
  );

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setAmount(100);
        setFrom("USD");
        setTo("INR");
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Convert</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Input
              type="number"
              label="Amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value) || 0)}
            />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-text-secondary text-sm font-medium">From</label>
                <select
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="bg-surface-elevated text-text border-border mt-1 h-11 w-full rounded-lg border px-3 text-sm"
                >
                  {Object.keys(RATES).map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-text-secondary text-sm font-medium">To</label>
                <select
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="bg-surface-elevated text-text border-border mt-1 h-11 w-full rounded-lg border px-3 text-sm"
                >
                  {Object.keys(RATES).map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
            <p className="text-text-tertiary text-xs">
              Offline approximation. Verify with your bank or a live provider for transactions.
            </p>
          </CardContent>
        </Card>
      }
      result={
        <Card>
          <CardHeader>
            <CardTitle>Result · {to}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            {allRows.map((r) => (
              <Stat
                key={r.code}
                label={r.code}
                value={r.value.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                tone={r.code === to ? "primary" : "default"}
              />
            ))}
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(CurrencyConverter);
