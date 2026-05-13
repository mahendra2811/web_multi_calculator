"use client";

import { memo, useState } from "react";
import { evaluate } from "mathjs";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BigStat } from "@/components/calculator/Stat";
import { Input } from "@/components/ui/Input";
import type { CalculatorRuntimeProps } from "@/types/calculator";

const FN_BUTTONS = [
  ["sin(", "cos(", "tan(", "log("],
  ["asin(", "acos(", "atan(", "ln("],
  ["sqrt(", "^", "pi", "e"],
  ["(", ")", "!", "%"],
  ["7", "8", "9", "/"],
  ["4", "5", "6", "*"],
  ["1", "2", "3", "-"],
  ["0", ".", "C", "+"],
] as const;

function ScientificCalculator({ meta }: CalculatorRuntimeProps) {
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState<string>("");

  const append = (token: string) => {
    if (token === "C") {
      setExpr("");
      setResult("");
      return;
    }
    const next = token === "ln(" ? "log(" : token === "pi" ? "pi" : token;
    setExpr((e) => e + next);
  };

  const compute = () => {
    try {
      // mathjs has ln() built-in, but the button mapped to log(. Tweak:
      const cleaned = expr.replace(/\bln\(/g, "log(").replace(/(?<![\w\d])log\(/g, "log10(");
      const v = evaluate(
        cleaned.replace(/(\d+(?:\.\d+)?)!/g, "factorial($1)").replace(/log10/g, "log10"),
      );
      setResult(String(v));
    } catch {
      setResult("Error");
    }
  };

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setExpr("");
        setResult("");
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Expression</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Input
              value={expr}
              onChange={(e) => setExpr(e.target.value)}
              placeholder="e.g. sin(45 deg)^2 + log(100, 10)"
            />
            <div className="grid grid-cols-4 gap-2">
              {FN_BUTTONS.flat().map((k, i) => (
                <Button
                  key={`${k}-${i}`}
                  size="sm"
                  variant={
                    ["C", "+", "-", "*", "/"].includes(k)
                      ? "primary"
                      : /[0-9.]/.test(k)
                        ? "outline"
                        : "secondary"
                  }
                  onClick={() => append(k)}
                >
                  {k}
                </Button>
              ))}
            </div>
            <Button onClick={compute}>=</Button>
          </CardContent>
        </Card>
      }
      result={
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent className="flex min-h-[200px] flex-col items-center justify-center gap-4">
            <BigStat label="Value" value={result || "—"} />
            {expr && <p className="text-text-tertiary text-center text-xs break-all">{expr}</p>}
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(ScientificCalculator);
