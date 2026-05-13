"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
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
          <CardContent className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              label="House price"
              prefix="₹"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              label="Down %"
              suffix="%"
              value={downPct}
              onChange={(e) => setDownPct(Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              label="Loan rate"
              suffix="%"
              value={loanRate}
              onChange={(e) => setLoanRate(Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              label="Tenure"
              suffix="yr"
              value={years}
              onChange={(e) => setYears(Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              label="Monthly rent"
              prefix="₹"
              value={rent}
              onChange={(e) => setRent(Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              label="Rent growth"
              suffix="%"
              value={rentGrowth}
              onChange={(e) => setRentGrowth(Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              label="Invest return"
              suffix="%"
              value={invest}
              onChange={(e) => setInvest(Number(e.target.value) || 0)}
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
            <div className="grid grid-cols-2 gap-3">
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
