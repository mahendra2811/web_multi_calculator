## What is CAGR?

**Compound Annual Growth Rate (CAGR)** is the smooth annualized return that would take an initial value to a final value over a given period. It's the single most-used number for comparing investments — funds advertise it, fund houses report it, and every "best mutual fund" listicle ranks by it.

CAGR ignores year-to-year volatility — it's the _equivalent constant rate_ that produces the same start-to-end result. Two investments with identical CAGRs can have wildly different rides; CAGR alone doesn't tell you about risk.

## How is CAGR calculated?

```
CAGR = (Final / Initial)^(1/n) − 1
```

where `n` is the number of years. Expressed as %:

```
CAGR % = (Final / Initial)^(1/n) − 1) × 100
```

## Worked example

You invested **₹1 lakh** 8 years ago. Today it's worth **₹2.5 lakh**.

```
CAGR = (250000 / 100000)^(1/8) − 1
     = 2.5^0.125 − 1
     = 1.1214 − 1
     = 0.1214
     = 12.14% per year
```

Your investment grew at an annualized rate of **12.14%** — the same growth as if you'd earned exactly 12.14% every year (instead of the actual lumpy 4%, 25%, −10%, 18%, etc.).

## CAGR vs Absolute Return

| Metric          | Formula                           | Use when                                                              |
| --------------- | --------------------------------- | --------------------------------------------------------------------- |
| Absolute return | (Final − Initial) / Initial × 100 | Comparing short tenures or interpreting a single completed investment |
| **CAGR**        | Above                             | Comparing investments of **different durations**                      |

For 100% absolute return over **2 years**: CAGR = 41.42%. Over **10 years**: CAGR = 7.18%. _Same absolute return, vastly different rates._

## When CAGR misleads you

- **Two funds, same CAGR, different volatility** — Fund A goes 12, 12, 12, 12, 12; Fund B goes 50, −20, 40, −15, 8. Both have ~12% CAGR. Fund B is much riskier.
- **Single-year point measurements** — CAGR from 1 Jan 2020 to 1 Jan 2023 will look very different from 1 Mar 2020 (COVID crash) to 1 Mar 2023. Always check 3-year/5-year/10-year rolling CAGRs.
- **Excludes SIP/staggered investing** — CAGR is for lumpsum starts. For SIPs, use **XIRR** (which weights each instalment's holding period).

## Components and inputs explained

### Initial value

Your starting principal. For mutual funds, this is the amount invested (not NAV).

### Final value

What it's worth now. Use today's NAV × units (mutual funds) or current price × shares (stocks).

### Number of years

Calendar years between start and end. Fractional years allowed (e.g. 2.5 years).

## Typical Indian CAGRs by asset class (15-year rolling)

| Asset                     | Typical CAGR                         |
| ------------------------- | ------------------------------------ |
| Nifty 50 index            | 11–13%                               |
| Mid-cap mutual funds      | 12–15%                               |
| Small-cap funds           | 13–18% (with much higher volatility) |
| Hybrid balanced funds     | 9–11%                                |
| Debt funds                | 6–8%                                 |
| PPF                       | 7.1% (constant)                      |
| Gold (rupee terms)        | 8–10%                                |
| Real estate (urban India) | 6–9% appreciation                    |
| Fixed deposit             | 6–7% pre-tax                         |

## Considerations

- **CAGR ≠ average return.** Average of yearly returns will always exceed CAGR if there's any volatility (math: arithmetic mean ≥ geometric mean).
- **Don't compare CAGRs across different periods.** A fund's 3-year CAGR and another fund's 5-year CAGR aren't apples-to-apples.
- **Survivorship bias** — closed funds disappear from CAGR tables, making the surviving cohort look better than reality.
- **Currency adjustments** — international fund CAGRs in INR include FX gains/losses; in USD they're pure return. Know which one you're seeing.

## Limitations

- CAGR assumes lumpsum entry — for SIP, use [XIRR](/calculator/xirr).
- Doesn't show volatility, max drawdown, or Sharpe ratio.
- Sensitive to start/end dates — small shifts can change the answer dramatically.
- Doesn't account for taxes or fees (your effective post-tax CAGR is lower).

## Related calculators

- **[XIRR](/calculator/xirr)** — annualized return for irregular flows (SIP)
- **[Compound Interest](/calculator/compound-interest)** — going forward (FV from rate)
- **[SIP](/calculator/sip)** — projection for monthly contributions
- **[Lumpsum](/calculator/lumpsum)** — projection for one-time investments
- **[ROI](/calculator/roi)** — absolute return + annualized return together
- **[Mutual Fund Returns](/calculator/mutual-fund-returns)** — NAV-based return calculation

---

**Final note.** CAGR is a single-number summary that hides every interesting thing about an investment journey. Use it to compare and rank — but never make a buy/sell decision on CAGR alone. **Always pair CAGR with max drawdown and standard deviation to understand the ride, not just the destination.**
