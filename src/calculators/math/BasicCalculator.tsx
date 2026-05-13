"use client";

import { memo, useCallback, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { CalculatorRuntimeProps } from "@/types/calculator";
import { useHistory } from "@/lib/storage/stores";
import { cn } from "@/lib/utils";

type Op = "+" | "-" | "×" | "÷" | null;

interface State {
  display: string;
  prev: number | null;
  op: Op;
  resetNext: boolean;
}

const initial: State = { display: "0", prev: null, op: null, resetNext: false };

function compute(prev: number, next: number, op: Op): number {
  switch (op) {
    case "+":
      return prev + next;
    case "-":
      return prev - next;
    case "×":
      return prev * next;
    case "÷":
      return next === 0 ? NaN : prev / next;
    default:
      return next;
  }
}

const KEYS = [
  ["C", "±", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
] as const;

function BasicCalculator({ meta }: CalculatorRuntimeProps) {
  const [state, setState] = useState<State>(initial);
  const push = useHistory((s) => s.push);

  const reset = useCallback(() => setState(initial), []);

  const press = useCallback(
    (key: string) => {
      setState((s) => {
        if (key === "C") return initial;
        if (key === "±") {
          const n = parseFloat(s.display);
          return { ...s, display: String(-n) };
        }
        if (key === "%") {
          const n = parseFloat(s.display);
          return { ...s, display: String(n / 100) };
        }
        if (["+", "-", "×", "÷"].includes(key)) {
          const cur = parseFloat(s.display);
          const next = s.prev == null ? cur : compute(s.prev, cur, s.op);
          return { display: String(next), prev: next, op: key as Op, resetNext: true };
        }
        if (key === "=") {
          if (s.prev == null || s.op == null) return s;
          const cur = parseFloat(s.display);
          const next = compute(s.prev, cur, s.op);
          push({
            calculatorId: meta.id,
            inputs: { left: s.prev, op: s.op, right: cur },
            result: { value: next },
          });
          return { display: String(next), prev: null, op: null, resetNext: true };
        }
        if (key === ".") {
          if (s.resetNext) return { ...s, display: "0.", resetNext: false };
          if (s.display.includes(".")) return s;
          return { ...s, display: s.display + "." };
        }
        if (s.resetNext || s.display === "0") {
          return { ...s, display: key, resetNext: false };
        }
        return { ...s, display: s.display + key };
      });
    },
    [meta.id, push],
  );

  return (
    <CalculatorShell
      meta={meta}
      onReset={reset}
      inputs={
        <Card className="p-4">
          <div className="bg-surface text-text rounded-xl px-4 py-6 text-right text-4xl font-bold tabular-nums">
            {state.display}
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {KEYS.flat().map((k) => (
              <Button
                key={k}
                variant={
                  ["C", "±", "%"].includes(k)
                    ? "secondary"
                    : ["÷", "×", "-", "+", "="].includes(k)
                      ? "primary"
                      : "outline"
                }
                size="lg"
                onClick={() => press(k)}
                className={cn(k === "0" && "col-span-2")}
              >
                {k}
              </Button>
            ))}
          </div>
        </Card>
      }
      result={
        <Card className="flex h-full flex-col items-center justify-center p-8 text-center">
          <p className="text-text-secondary text-sm">Press = to compute</p>
          <p className="text-primary mt-2 text-5xl font-bold tabular-nums">{state.display}</p>
          {state.op && (
            <p className="text-text-tertiary mt-2 text-sm">
              {state.prev} {state.op}
            </p>
          )}
        </Card>
      }
    />
  );
}

export default memo(BasicCalculator);
