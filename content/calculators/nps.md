## What is NPS?

**National Pension System (NPS)** is a market-linked retirement scheme administered by PFRDA. You contribute monthly during your working years; the money is invested across **equity (E), corporate debt (C), government bonds (G), and alternates (A)** according to your chosen allocation. At age 60, you withdraw **60% as a tax-free lumpsum** and use the remaining **40% to buy an annuity** that pays monthly pension for life.

For salaried earners in the 30% tax slab, NPS offers an additional **₹50,000 deduction under Section 80CCD(1B)** — above and beyond the regular ₹1.5 L 80C limit. That's roughly ₹15,000/year of tax saved, on top of the long-term equity-driven growth.

## How is NPS maturity calculated?

NPS uses market-linked compounding, so the maturity formula is a future-value-of-annuity:

```
Maturity = monthly_contribution × [((1 + r/12)^n − 1) / (r/12)] × (1 + r/12)
```

where `r` is the annualized return and `n` is total months till age 60. CalcMaster iterates month-by-month for accuracy.

## Worked example

**Age 30, ₹5,000/month contribution till 60, expected 10% annualized return**:

- Months: 360
- Total invested: ₹18 L
- Maturity corpus: **~₹1.13 cr**
- 60% lumpsum (tax-free): ₹68 L
- 40% annuity: ₹45 L → ~₹22,500/month pension at 6% annuity rate

## Tax benefits

| Section                          | Cap                     |
| -------------------------------- | ----------------------- |
| 80CCD(1) — your contribution     | ₹1.5 L (within 80C)     |
| 80CCD(1B) — additional NPS       | **₹50,000 above 80C**   |
| 80CCD(2) — employer contribution | 10% of basic (uncapped) |

The ₹50,000 80CCD(1B) is the single best NPS feature — pure additional deduction that no other instrument offers.

## Tier-1 vs Tier-2

- **Tier-1**: locked till 60 (with restrictions). Gets all tax benefits.
- **Tier-2**: fully liquid (withdraw anytime). No tax benefits, no lock-in.

Most subscribers use Tier-1 only.

## Considerations

- Annuity pension is **taxable at slab rate** (the 60% lumpsum is tax-free).
- Choose **active vs auto choice** for allocation. Auto reduces equity exposure as you age; active lets you set it manually.
- Premature exit after 5 years allowed: 20% lumpsum (taxable), 80% buys annuity.

## Limitations

- The calculator assumes constant return over 30+ years. Real NPS returns have varied 8–13%.
- Doesn't model the annuity purchase math (which depends on annuity provider's rates at retirement).
- Doesn't model employer's 80CCD(2) contributions separately.

## Related calculators

- **[PPF](/calculator/ppf)** — tax-free 15-year alternative
- **[EPF](/calculator/epf)** — mandatory workplace retirement
- **[Retirement Planner](/calculator/retirement)** — total corpus needed
- **[NPS Withdrawal](/calculator/nps-withdraw)** — 60% lumpsum + 40% annuity math
- **[Section 80C](/calculator/section-80c)** — tax-saver tracker
- **[Regime Compare](/calculator/regime-compare)** — old vs new

---

**Final note.** NPS is the most tax-advantaged retirement vehicle for high earners after EPF. The extra ₹50,000 deduction under 80CCD(1B) is free money if you're in the 30% slab. **Start at 30, stop checking the balance, and let it compound till 60.**
