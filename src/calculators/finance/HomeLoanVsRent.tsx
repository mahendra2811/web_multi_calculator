"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { NumberInput } from "@/components/ui/NumberInput";
import { BigStat, Stat } from "@/components/calculator/Stat";
import { homeVsRent } from "@/lib/calculators/finance";
import { formatINR } from "@/lib/format";
import type { CalculatorRuntimeProps } from "@/types/calculator";

function HomeLoanVsRent({ meta }: CalculatorRuntimeProps) {
  const [price, setPrice] = useState(7500000);
  const [downPct, setDownPct] = useState(20);
  const [loanRate, setLoanRate] = useState(8.5);
  const [years, setYears] = useState(20);
  const [rent, setRent] = useState(25000);
  const [rentGrowth, setRentGrowth] = useState(7);
  const [invest, setInvest] = useState(12);

  const r = useMemo(
    () =>
      homeVsRent({
        housePrice: price,
        downPaymentPct: downPct,
        loanRatePct: loanRate,
        tenureYears: years,
        monthlyRent: rent,
        rentGrowthPct: rentGrowth,
        investReturnPct: invest,
      }),
    [price, downPct, loanRate, years, rent, rentGrowth, invest],
  );

  const buyWins = r.totalBuy - r.renterFinalCorpus < r.totalRent;
  // Simple verdict: which side spent less net over the horizon
  const buyerNet = r.totalBuy; // owns house at end, net cost
  const renterNet = r.totalRent - r.renterFinalCorpus; // net spend minus invested corpus
  const better = buyerNet < renterNet ? "buy" : "rent";

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => {
        setPrice(7500000);
        setDownPct(20);
        setLoanRate(8.5);
        setYears(20);
        setRent(25000);
        setRentGrowth(7);
        setInvest(12);
      }}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <NumberInput
              label="House price"
              prefix="₹"
              value={price}
              onValueChange={setPrice}
              allowNegative={false}
            />
            <NumberInput
              label="Down %"
              suffix="%"
              value={downPct}
              onValueChange={setDownPct}
              allowNegative={false}
            />
            <NumberInput
              label="Loan rate"
              suffix="%"
              value={loanRate}
              onValueChange={setLoanRate}
              allowNegative={false}
            />
            <NumberInput
              label="Tenure"
              suffix="yr"
              value={years}
              onValueChange={setYears}
              allowNegative={false}
            />
            <NumberInput
              label="Monthly rent"
              prefix="₹"
              value={rent}
              onValueChange={setRent}
              allowNegative={false}
            />
            <NumberInput
              label="Rent growth"
              suffix="%"
              value={rentGrowth}
              onValueChange={setRentGrowth}
              allowNegative={false}
            />
            <NumberInput
              label="Invest return"
              suffix="%"
              value={invest}
              onValueChange={setInvest}
              allowNegative={false}
            />
          </CardContent>
        </Card>
      }
      result={
        <Card>
          <CardHeader>
            <CardTitle>Verdict</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 py-4">
            <BigStat
              label="Recommended"
              value={better === "buy" ? "Buy" : "Rent + invest"}
              tone="primary"
            />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Stat label="EMI" value={formatINR(r.emi)} />
              <Stat label="Total rent paid" value={formatINR(r.totalRent)} tone="error" />
              <Stat label="Total buying cost" value={formatINR(r.totalBuy)} tone="error" />
              <Stat
                label="Renter's invested corpus"
                value={formatINR(r.renterFinalCorpus)}
                tone="success"
              />
            </div>
            <p className="text-text-tertiary text-xs">
              {buyWins
                ? "Buying tends to win on net cost."
                : "Renting + investing tends to win on net cost."}
            </p>
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(HomeLoanVsRent);
