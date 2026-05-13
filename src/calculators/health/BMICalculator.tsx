"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Slider } from "@/components/ui/Slider";
import { calculateBMI, type BMICategory } from "@/lib/calculators/health";
import { useHistory } from "@/lib/storage/stores";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { CalculatorRuntimeProps } from "@/types/calculator";

const CATEGORY_COLOR: Record<BMICategory, string> = {
  underweight: "bg-datetime text-white",
  normal: "bg-success text-white",
  overweight: "bg-accent text-white",
  obese: "bg-error text-white",
};

function BMICalculator({ meta }: CalculatorRuntimeProps) {
  const t = useTranslations("calculators.bmi");
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const push = useHistory((s) => s.push);

  const result = useMemo(() => calculateBMI(weight, height), [weight, height]);

  useEffect(() => {
    const tid = setTimeout(() => {
      if (result.bmi > 0) {
        push({
          calculatorId: meta.id,
          inputs: { weight, height },
          result: { bmi: result.bmi, category: result.category },
        });
      }
    }, 800);
    return () => clearTimeout(tid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.bmi]);

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setHeight(170);
        setWeight(70);
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <Input
              label={t("height")}
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value) || 0)}
              suffix="cm"
            />
            <Slider
              label={t("height")}
              valueLabel={`${height} cm`}
              min={100}
              max={220}
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
            />
            <Input
              label={t("weight")}
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value) || 0)}
              suffix="kg"
            />
            <Slider
              label={t("weight")}
              valueLabel={`${weight} kg`}
              min={20}
              max={200}
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
            />
          </CardContent>
        </Card>
      }
      result={
        <Card>
          <CardHeader>
            <CardTitle>{t("bmi")}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6 py-6">
            <div className="text-text text-7xl font-bold tabular-nums">{result.bmi.toFixed(1)}</div>
            <span
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-semibold tracking-wide uppercase",
                CATEGORY_COLOR[result.category],
              )}
            >
              {t(result.category)}
            </span>
            <div className="grid w-full grid-cols-4 gap-1 text-center text-xs">
              <Range
                from={0}
                to={18.5}
                label={t("underweight")}
                active={result.category === "underweight"}
                color="bg-datetime"
              />
              <Range
                from={18.5}
                to={25}
                label={t("normal")}
                active={result.category === "normal"}
                color="bg-success"
              />
              <Range
                from={25}
                to={30}
                label={t("overweight")}
                active={result.category === "overweight"}
                color="bg-accent"
              />
              <Range
                from={30}
                to={40}
                label={t("obese")}
                active={result.category === "obese"}
                color="bg-error"
              />
            </div>
          </CardContent>
        </Card>
      }
    />
  );
}

function Range({
  from,
  to,
  label,
  active,
  color,
}: {
  from: number;
  to: number;
  label: string;
  active: boolean;
  color: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1 rounded-lg p-2", active && "ring-primary ring-2")}>
      <div className={cn("h-1.5 rounded-full", color, active ? "opacity-100" : "opacity-50")} />
      <span className="text-text-secondary">{label}</span>
      <span className="text-text-tertiary">
        {from}–{to}
      </span>
    </div>
  );
}

export default memo(BMICalculator);
