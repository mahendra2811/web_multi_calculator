"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Stat } from "@/components/calculator/Stat";
import { macroSplit } from "@/lib/calculators/health";
import type { CalculatorRuntimeProps } from "@/types/calculator";

const PRESETS = [
  { id: "balanced", label: "Balanced 30/40/30", split: { protein: 30, carbs: 40, fats: 30 } },
  { id: "lowcarb", label: "Low-carb 40/20/40", split: { protein: 40, carbs: 20, fats: 40 } },
  { id: "keto", label: "Keto 25/5/70", split: { protein: 25, carbs: 5, fats: 70 } },
  { id: "endurance", label: "Endurance 20/60/20", split: { protein: 20, carbs: 60, fats: 20 } },
];

function MacroCalculator({ meta }: CalculatorRuntimeProps) {
  const [calories, setCalories] = useState(2200);
  const [split, setSplit] = useState(PRESETS[0].split);

  const grams = useMemo(() => macroSplit(calories, split), [calories, split]);

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setCalories(2200);
        setSplit(PRESETS[0].split);
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Daily calories + split</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Input
              type="number"
              label="Daily calories"
              suffix="kcal"
              value={calories}
              onChange={(e) => setCalories(Number(e.target.value) || 0)}
            />
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <Button
                  key={p.id}
                  size="sm"
                  variant={
                    JSON.stringify(p.split) === JSON.stringify(split) ? "primary" : "secondary"
                  }
                  onClick={() => setSplit(p.split)}
                >
                  {p.label}
                </Button>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Input
                type="number"
                label="Protein %"
                value={split.protein}
                onChange={(e) => setSplit({ ...split, protein: Number(e.target.value) || 0 })}
              />
              <Input
                type="number"
                label="Carbs %"
                value={split.carbs}
                onChange={(e) => setSplit({ ...split, carbs: Number(e.target.value) || 0 })}
              />
              <Input
                type="number"
                label="Fats %"
                value={split.fats}
                onChange={(e) => setSplit({ ...split, fats: Number(e.target.value) || 0 })}
              />
            </div>
          </CardContent>
        </Card>
      }
      result={
        <Card>
          <CardHeader>
            <CardTitle>Daily grams</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4">
            <Stat label="Protein" value={`${grams.protein.toFixed(0)} g`} tone="primary" />
            <Stat label="Carbs" value={`${grams.carbs.toFixed(0)} g`} tone="secondary" />
            <Stat label="Fats" value={`${grams.fats.toFixed(0)} g`} tone="accent" />
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(MacroCalculator);
