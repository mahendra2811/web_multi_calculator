## What is a lumpsum investment?

A **lumpsum** is a one-time deposit into an investment vehicle — mutual fund, FD, bond, stock, gold — where future growth is driven entirely by the rate of return, not additional deposits. It's the opposite of a SIP: instead of putting in ₹10,000/month for 20 years, you put in ₹24 lakh today and let it sit.

If you got a bonus, sold a property, inherited money, or finally cashed out an FD, the lumpsum calculator answers the one question that matters: **what will this become if I leave it alone?**

## How is lumpsum return calculated?

The compound-interest formula:

```
FV = P × (1 + r/100)^n
```

where:

- `P` = principal (initial investment)
- `r` = annual return %
- `n` = years held
- `FV` = future value

CalcMaster also produces a year-by-year schedule so you can see the compounding curve, not just the endpoint. The curve is exponential — boring for the first 5 years, then it accelerates dramatically.

## Worked example

**₹10,00,000 invested today at 12% annual return for 20 years**:

| Year   | Value          |
| ------ | -------------- |
| 0      | ₹10,00,000     |
| 5      | ₹17,62,342     |
| 10     | ₹31,05,848     |
| 15     | ₹54,73,565     |
| **20** | **₹96,46,293** |

You roughly **10× your money** in 20 years at 12%. Two-thirds of the final amount is gain, one-third is your contribution.

Same investment at lower / higher returns:

| Annual return           | 20-year FV |
| ----------------------- | ---------- |
| 8% (debt fund)          | ₹46.6 L    |
| 10% (balanced)          | ₹67.3 L    |
| 12% (equity)            | ₹96.5 L    |
| 14% (aggressive equity) | ₹1.37 cr   |

A 2% rate difference doubles your wealth over 20 years. **The return rate matters more than the timing, and timing matters more than people think.**

## Components and inputs explained

### Principal

The one-time amount you're investing. Use the actual rupee figure — don't gross it up for tax, don't subtract entry fees (lumpsum mutual fund entries have no entry load).

### Expected annual return

Use a defensible long-term average:

- **Index equity funds**: 10–13%
- **Active equity funds**: 11–14% (top quartile)
- **Hybrid / balanced**: 9–11%
- **Debt funds / FDs**: 6–8%
- **Gold (long term)**: 8–10%
- **Real estate (long term, India urban)**: 6–9% appreciation + 2–3% rental yield

Don't extrapolate from one good year. Use the 15-year rolling average.

### Tenure

How long you'll leave it alone. The first 5 years are mostly proportional growth; the magic kicks in after 10+ years.

## SIP vs Lumpsum — which to choose?

This is the most common dinner-table investing debate. The honest answer:

- **In a rising market**, lumpsum wins. Money invested earlier compounds longer.
- **In a flat or declining market**, SIP wins via rupee-cost averaging.
- **Historically (Indian equities), markets rise in ~70% of calendar years**, so lumpsum wins the math battle most of the time.

But math isn't the whole story:

| Situation                                                | Choice                                                                           |
| -------------------------------------------------------- | -------------------------------------------------------------------------------- |
| You got a windfall, no debt, comfortable with volatility | **Lumpsum**, all at once                                                         |
| You got a windfall but markets are at all-time highs     | **STP** — lumpsum into liquid fund, transfer ₹X/month to equity over 6–12 months |
| You're investing from monthly salary                     | **SIP** — you don't have a lumpsum                                               |
| You're emotionally rattled by drops                      | **STP or SIP** — the math gap is smaller than the panic-quit cost                |

For most retail investors, the _behavioural_ benefit of staggering (SIP / STP) outweighs the math edge of lumpsum.

## Common variants

| Variant             | What changes                                          |
| ------------------- | ----------------------------------------------------- |
| **Pure lumpsum**    | Single deposit, no further contributions              |
| **Lumpsum + SIP**   | Lumpsum now, top up monthly. Best of both.            |
| **STP**             | Lumpsum parked in debt, transferred monthly to equity |
| **Tranche lumpsum** | Split into 2–4 deposits across months. Manual STP.    |

## Considerations

- **Don't lumpsum at all-time market highs.** STP over 6–12 months instead. Historical data: lumpsums made at the top of a bubble (2000, 2008, 2018) took 3–7 years just to break even nominally.
- **Inflation eats half your nominal return.** A 12% nominal return at 6% inflation = ~6% real return. ₹96 lakh in 20 years buys ~₹30 lakh of today's purchasing power.
- **Sequence-of-returns risk** is higher than SIP. A bad first year hurts more for lumpsum than for staggered investment.
- **Diversify the lumpsum.** A ₹10 L lumpsum into one stock is a bet; into a 4-fund equity/debt portfolio is an investment.
- **Avoid emotional triggers.** People who lumpsum at the top often panic-sell at the next 20% drop. If you can't sleep through a 30% paper loss, use STP.

## Tax implications (India, FY 2024-25)

| Holding period | Equity MF                | Debt MF   | Real estate              |
| -------------- | ------------------------ | --------- | ------------------------ |
| < 12 months    | STCG 20%                 | Slab rate | STCG slab rate           |
| 12–24 months   | LTCG 12.5% above ₹1.25 L | Slab rate | STCG slab rate           |
| > 24 months    | LTCG 12.5% above ₹1.25 L | Slab rate | LTCG 20% with indexation |

For a 20-year equity lumpsum, you'll mostly pay LTCG at 12.5% on gains above ₹1.25 L annually. Harvest the exemption every year for compounding tax savings.

## Limitations

- The calculator assumes a smooth annualized return. Real returns are bumpy. Actual lumpsum experiences include 30%+ drawdowns en route.
- It doesn't model expense ratios (subtract 0.5–1.5% from your expected return).
- It doesn't model taxes (subtract 8–15% from the final corpus for post-tax estimate).
- It doesn't model partial withdrawals or rebalancing. Use [SWP](/calculator/swp) for the withdrawal phase.

## Related calculators

- **[SIP Calculator](/calculator/sip)** — monthly investments instead of lumpsum
- **[Compound Interest](/calculator/compound-interest)** — the math, generalized
- **[CAGR](/calculator/cagr)** — back-solve the return you earned
- **[Future Value](/calculator/future-value)** — generic FV for any deposit
- **[STP](/calculator/stp)** — staged transfer from debt to equity
- **[SWP](/calculator/swp)** — withdrawal phase

---

**Final note.** Lumpsum investing is a single decision with a 20-year consequence. The decision rules in order of importance: (1) pay off all > 10% debt first, (2) keep 6 months of expenses in emergency, (3) diversify across asset classes, (4) STP if markets feel toppy, (5) leave it alone for 15+ years. This calculator answers question 5 in advance — what will it become if you don't touch it.
