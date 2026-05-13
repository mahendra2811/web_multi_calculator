"use client";

import { memo, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Slider } from "@/components/ui/Slider";
import { Button } from "@/components/ui/Button";
import { GrowthChart } from "@/components/charts/GrowthChart";
import { calculateSIP } from "@/lib/calculators/finance";
import { formatINR } from "@/lib/format";
import { useHistory } from "@/lib/storage/stores";
import { useTranslations } from "next-intl";
import type { CalculatorRuntimeProps } from "@/types/calculator";
import { track } from "@/lib/analytics/events";

const GrowthChart3D = dynamic(() => import("@/components/three/GrowthChart3D"), {
  ssr: false,
  loading: () => (
    <div className="bg-surface text-text-tertiary flex h-[320px] items-center justify-center rounded-xl">
      Loading 3D…
    </div>
  ),
});

const DEFAULTS = { monthly: 10000, rate: 12, years: 10 };

function SIPCalculator({ meta }: CalculatorRuntimeProps) {
  const t = useTranslations("calculators.sip");
  const tCommon = useTranslations("common");
  const [monthly, setMonthly] = useState(DEFAULTS.monthly);
  const [rate, setRate] = useState(DEFAULTS.rate);
  const [years, setYears] = useState(DEFAULTS.years);
  const [view3D, setView3D] = useState(false);
  const push = useHistory((s) => s.push);

  const result = useMemo(
    () =>
      calculateSIP({
        monthlyInvestment: monthly,
        annualReturnPct: rate,
        years,
      }),
    [monthly, rate, years],
  );

  useEffect(() => {
    const tid = setTimeout(() => {
      push({
        calculatorId: meta.id,
        inputs: { monthly, rate, years },
        result: { invested: result.invested, returns: result.returns, total: result.total },
      });
      track.calculatorCalculate(meta.id);
    }, 800);
    return () => clearTimeout(tid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthly, rate, years]);

  const reset = () => {
    setMonthly(DEFAULTS.monthly);
    setRate(DEFAULTS.rate);
    setYears(DEFAULTS.years);
  };

  return (
    <CalculatorShell
      meta={meta}
      onReset={reset}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>{tCommon("inputs")}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div>
              <Input
                label={t("monthlyInvestment")}
                type="number"
                value={monthly}
                onChange={(e) => setMonthly(Number(e.target.value) || 0)}
                prefix="₹"
              />
              <Slider
                className="mt-2"
                min={500}
                max={200000}
                step={500}
                value={monthly}
                onChange={(e) => setMonthly(Number(e.target.value))}
              />
            </div>
            <div>
              <Input
                label={t("annualReturn")}
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value) || 0)}
                suffix="%"
              />
              <Slider
                className="mt-2"
                min={1}
                max={30}
                step={0.5}
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
              />
            </div>
            <div>
              <Input
                label={t("duration")}
                type="number"
                value={years}
                onChange={(e) => setYears(Number(e.target.value) || 0)}
                suffix="yr"
              />
              <Slider
                className="mt-2"
                min={1}
                max={40}
                step={1}
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
              />
            </div>
          </CardContent>
        </Card>
      }
      result={
        <div className="flex flex-col gap-4">
          <Card>
            <CardContent className="grid grid-cols-3 gap-4 pt-6">
              <Stat
                label={t("investedAmount")}
                value={formatINR(result.invested)}
                tone="secondary"
              />
              <Stat label={t("estReturns")} value={formatINR(result.returns)} tone="accent" />
              <Stat label={t("totalValue")} value={formatINR(result.total)} tone="primary" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">Growth over time</CardTitle>
              <div className="border-border flex gap-1 rounded-lg border p-0.5">
                <Button
                  size="sm"
                  variant={view3D ? "ghost" : "primary"}
                  onClick={() => {
                    setView3D(false);
                    track.view3DToggle(meta.id, "2d");
                  }}
                >
                  {tCommon("view2D")}
                </Button>
                <Button
                  size="sm"
                  variant={view3D ? "primary" : "ghost"}
                  onClick={() => {
                    setView3D(true);
                    track.view3DToggle(meta.id, "3d");
                  }}
                >
                  {tCommon("view3D")}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {view3D ? (
                <GrowthChart3D data={result.schedule} />
              ) : (
                <GrowthChart data={result.schedule} />
              )}
            </CardContent>
          </Card>
        </div>
      }
    />
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "primary" | "secondary" | "accent";
}) {
  const colorMap = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
  };
  return (
    <div className="flex flex-col gap-1">
      <span className="text-text-tertiary text-xs tracking-wide uppercase">{label}</span>
      <span className={`text-xl font-bold tabular-nums ${colorMap[tone]}`}>{value}</span>
    </div>
  );
}

export default memo(SIPCalculator);
