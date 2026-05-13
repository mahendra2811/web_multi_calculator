## What is ROI?

**Return on Investment (ROI)** is the simplest measure of how much money an investment made (or lost) relative to what you put in. It's used everywhere: stock trading, real estate, marketing campaigns, business ventures, equipment purchases.

ROI is intuitive but flat — it doesn't account for time. A 100% ROI in 2 years and a 100% ROI in 20 years are wildly different investments. For time-aware comparisons, use **CAGR** or **IRR** alongside ROI.

## How is ROI calculated?

```
ROI % = ((Final value − Initial investment) / Initial investment) × 100
```

If you invested ₹1 L and it's worth ₹1.5 L today, ROI = 50%.

For annualized version (CAGR-equivalent):

```
Annualized ROI = (Final / Initial)^(1/n) − 1
```

CalcMaster outputs both — total ROI and annualized — so you can interpret correctly.

## Worked example

You bought a property for **₹40 L in 2015**. Sold it for **₹65 L in 2025**:

```
Total ROI = (65 − 40) / 40 × 100 = 62.5%
Annualized = (65/40)^(1/10) − 1 = 4.97% per year
```

The 62.5% headline looks impressive — but **4.97% annualized** is barely matching FD returns and definitely losing to inflation (6%+) over the same decade.

This is why annualized ROI matters more than total ROI for long-period investments.

## ROI for different scenarios

| Investment           | Typical ROI calc                                                                                                       |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Stock trade**      | (Sell price − Buy price − Fees) / Buy price × 100                                                                      |
| **Real estate**      | (Sale − Purchase − Costs − Improvements) / Purchase × 100                                                              |
| **Mutual fund**      | (Current value − Invested) / Invested × 100 — use [Mutual Fund Returns](/calculator/mutual-fund-returns) for NAV-based |
| **Marketing spend**  | (Revenue attributed − Cost of campaign) / Cost × 100                                                                   |
| **Business project** | (Project profit / Project cost) × 100                                                                                  |
| **Education**        | (Lifetime income gain / Education cost) × 100 — long-term proxy                                                        |

## Components and inputs explained

### Initial investment

Total money committed — including fees, taxes, and acquisition costs.

### Final value

What it's worth now (for ongoing investments) or sale proceeds (for closed positions). Subtract any exit fees / taxes for net ROI.

### Time horizon

Optional but recommended for the annualized number. Use calendar years between entry and exit/today.

## ROI is incomplete — what to pair it with

- **Risk-adjusted return** — Sharpe Ratio, Sortino Ratio (not in this calculator)
- **CAGR** — time-adjusted ROI ([CAGR Calculator](/calculator/cagr))
- **IRR** — if there were intermediate cash flows ([IRR Calculator](/calculator/irr))
- **Max drawdown** — biggest peak-to-trough loss during holding period
- **Opportunity cost** — what your money could've earned elsewhere

## Common ROI calculation mistakes

- **Ignoring fees/taxes**. A 10% ROI before 0.5% brokerage + 12.5% LTCG isn't a real 10%.
- **Including unrealized gains as ROI**. For real estate or stocks held long, "paper ROI" isn't realized until you sell.
- **Forgetting time**. 50% ROI over 1 year is great; over 10 years it's mediocre.
- **Comparing apples and oranges**. ROI on a stock isn't directly comparable to ROI on a marketing campaign — the latter excludes opportunity cost of the campaign-team's time.

## Considerations

- **Negative ROI is real.** A -20% ROI means you lost a fifth of your principal.
- **Hold time matters.** A 15% ROI on a 6-month trade beats a 15% ROI on a 5-year hold — annualized.
- **Reinvestment changes math.** ROI on a stock you held vs. one you sold and re-bought differ due to compounding and transaction costs.

## Limitations

- The calculator outputs total ROI + annualized. It doesn't account for fees/taxes — subtract these from the final value for accurate net ROI.
- Doesn't handle multiple cash flows mid-investment (use [IRR](/calculator/irr)).
- Doesn't model holding-period risk or volatility.

## Related calculators

- **[CAGR](/calculator/cagr)** — annualized growth rate (cleaner for long periods)
- **[IRR](/calculator/irr)** — for investments with multiple cash flows
- **[Mutual Fund Returns](/calculator/mutual-fund-returns)** — NAV-based
- **[Compound Interest](/calculator/compound-interest)** — for projected future returns
- **[SIP](/calculator/sip)** — for monthly investment returns
- **[Stock Profit](/calculator/stock-profit)** — for stock trades

---

**Final note.** ROI is the fastest sanity check on whether an investment was worthwhile — but it's also the easiest metric to spin. **Always look at annualized ROI for anything held longer than a year, and always subtract taxes and fees.** A "20% ROI" sounds great until you realize it took 5 years (4% annualized = worse than FD).
