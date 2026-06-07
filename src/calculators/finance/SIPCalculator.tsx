"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { NumberInput } from "@/components/ui/NumberInput";
import { Slider } from "@/components/ui/Slider";
import { Stat } from "@/components/calculator/Stat";
import { GrowthChart } from "@/components/charts/GrowthChart";
import { calculateSIP } from "@/lib/calculators/finance";
import { formatINR } from "@/lib/format";
import { useHistory } from "@/lib/storage/stores";
import { useTranslations } from "next-intl";
import type { CalculatorRuntimeProps } from "@/types/calculator";
import { track } from "@/lib/analytics/events";

const DEFAULTS = { monthly: 10000, rate: 12, years: 10 };

function SIPCalculator({ meta }: CalculatorRuntimeProps) {
  const t = useTranslations("calculators.sip");
  const tCommon = useTranslations("common");
  const [monthly, setMonthly] = useState(DEFAULTS.monthly);
  const [rate, setRate] = useState(DEFAULTS.rate);
  const [years, setYears] = useState(DEFAULTS.years);
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
              <NumberInput
                label={t("monthlyInvestment")}
                value={monthly}
                onValueChange={setMonthly}
                min={500}
                max={200000}
                allowNegative={false}
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
              <NumberInput
                label={t("annualReturn")}
                value={rate}
                onValueChange={setRate}
                min={1}
                max={30}
                allowNegative={false}
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
              <NumberInput
                label={t("duration")}
                value={years}
                onValueChange={setYears}
                min={1}
                max={40}
                allowNegative={false}
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
            <CardContent className="grid grid-cols-1 gap-3 pt-6 sm:grid-cols-3">
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
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Growth over time</CardTitle>
            </CardHeader>
            <CardContent>
              <GrowthChart data={result.schedule} />
            </CardContent>
          </Card>
        </div>
      }
    />
  );
}

export default memo(SIPCalculator);
