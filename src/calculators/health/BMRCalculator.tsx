"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { BigStat, Stat } from "@/components/calculator/Stat";
import { calculateBMR, calculateTDEE, type ActivityLevel } from "@/lib/calculators/health";
import { formatNumber } from "@/lib/format";
import type { CalculatorRuntimeProps } from "@/types/calculator";

const ACTIVITIES: { id: ActivityLevel; label: string }[] = [
  { id: "sedentary", label: "Sedentary" },
  { id: "light", label: "Light" },
  { id: "moderate", label: "Moderate" },
  { id: "active", label: "Active" },
  { id: "very-active", label: "Very active" },
];

function BMRCalculator({ meta }: CalculatorRuntimeProps) {
  const [sex, setSex] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(175);
  const [age, setAge] = useState(30);
  const [activity, setActivity] = useState<ActivityLevel>("moderate");

  const bmr = useMemo(
    () => calculateBMR({ weightKg: weight, heightCm: height, ageYears: age, sex }),
    [weight, height, age, sex],
  );
  const tdee = useMemo(() => calculateTDEE(bmr, activity), [bmr, activity]);

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setSex("male");
        setWeight(70);
        setHeight(175);
        setAge(30);
        setActivity("moderate");
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={sex === "male" ? "primary" : "secondary"}
                onClick={() => setSex("male")}
                className="flex-1"
              >
                Male
              </Button>
              <Button
                size="sm"
                variant={sex === "female" ? "primary" : "secondary"}
                onClick={() => setSex("female")}
                className="flex-1"
              >
                Female
              </Button>
            </div>
            <Input
              type="number"
              label="Weight"
              suffix="kg"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              label="Height"
              suffix="cm"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              label="Age"
              suffix="yr"
              value={age}
              onChange={(e) => setAge(Number(e.target.value) || 0)}
            />
            <div>
              <span className="text-text-secondary mb-2 block text-sm font-medium">Activity</span>
              <div className="flex flex-wrap gap-2">
                {ACTIVITIES.map((a) => (
                  <Button
                    key={a.id}
                    size="sm"
                    variant={activity === a.id ? "primary" : "secondary"}
                    onClick={() => setActivity(a.id)}
                  >
                    {a.label}
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
            <CardTitle>Energy expenditure</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6 py-6">
            <BigStat label="BMR (rest)" value={`${formatNumber(bmr, "en-IN", 0)} kcal`} />
            <div className="grid w-full grid-cols-2 gap-4">
              <Stat
                label="TDEE (total daily)"
                value={`${formatNumber(tdee, "en-IN", 0)} kcal`}
                tone="primary"
              />
              <Stat label="Activity multiplier" value={(tdee / bmr).toFixed(2) + "×"} />
            </div>
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(BMRCalculator);
