## What is simple interest?

**Simple Interest (SI)** is the textbook introduction to interest math: a flat rate on the principal, paid out (or charged) over a period. No compounding, no reinvestment, no interest-on-interest. Just `principal × rate × time`.

Simple interest is used in short-term loans, post-dated cheque advances, some moneylender arrangements, and as the building block for understanding compound interest. For anything > 1 year, almost no modern bank product uses simple interest — they use compound. But the formula matters because **flat-rate loan quotes** sometimes still use it, and misreading them can cost real money.

## How is simple interest calculated?

```
SI = (P × R × T) / 100
Total amount = P + SI
```

where:

- `P` = principal (initial amount)
- `R` = annual interest rate (as %)
- `T` = time in years

## Worked example

**₹50,000 loan at 10% simple interest for 3 years**:

```
SI = (50,000 × 10 × 3) / 100 = ₹15,000
Total = ₹50,000 + ₹15,000 = ₹65,000
```

The borrower pays ₹65,000 total. Effective monthly cost: ₹65,000 / 36 = ₹1,806/month — which sounds small but **the implicit effective rate (when measured as a reducing-balance loan equivalent) is roughly 18% per year**.

## Simple vs Compound Interest

For ₹1,00,000 at 10% for various tenures:

| Tenure   | Simple Interest | Compound (annual) |
| -------- | --------------- | ----------------- |
| 1 year   | ₹1,10,000       | ₹1,10,000         |
| 3 years  | ₹1,30,000       | ₹1,33,100         |
| 5 years  | ₹1,50,000       | ₹1,61,051         |
| 10 years | ₹2,00,000       | ₹2,59,374         |
| 20 years | ₹3,00,000       | ₹6,72,750         |

For short tenures (< 2 years), the difference is small. For 10+ years it's dramatic. **Always prefer compound for investments** (it gives you more); **always prefer compound for loans too** (because banks quote both, and compound at the same rate is actually cheaper in reducing-balance form).

## The flat-rate trap

A money-lender or unscrupulous "BNPL" provider may quote:

> "10% flat rate for 2 years on ₹50,000"

Sounds like 10% — but **the effective reducing-balance rate is roughly 2× the flat rate** for typical tenures.

```
Flat math:    50,000 × 10% × 2 = 10,000 interest
              Total = 60,000
              Monthly EMI = 60,000 / 24 = ₹2,500

Equivalent reducing-balance rate to get ₹2,500/month: ~18.5% per annum
```

The same ₹2,500/month EMI on a 10% reducing-balance loan would mean a much smaller principal. **If a loan quote says "flat rate", divide by 0.55 to get the rough effective rate, then run it through the [EMI Calculator](/calculator/emi)** to see the real picture.

## Components and inputs explained

### Principal

The amount borrowed or invested.

### Rate

The annual interest rate as a percentage. For loans, ask: "Is this flat or reducing balance?"

### Time

In years. Use decimals for partial years (e.g. 1.5 years).

## Where simple interest still applies

- **Short-term moneylender loans** (often illegal informal lending)
- **Government bonds with simple-interest pay structure** (rare; most pay periodic coupons)
- **Some employer salary advances** (no interest, but if charged, it's typically simple)
- **Court-awarded interest** on judgements (usually simple, often at fixed rates like 9% p.a.)
- **Insurance claim delays** — IRDAI mandates simple interest at bank rate + 2% for delayed claims

## Considerations

- **Flat rate ≠ reducing balance.** A "12% flat" car loan is roughly equivalent to "20–22% reducing balance" — banks and dealers exploit this confusion regularly.
- **Simple interest is borrower-friendly only for short, single-payment loans.** For multi-instalment loans, compound (reducing balance) is cheaper at the same headline rate.
- **For investment purposes, simple interest is rare** — even savings accounts compound interest (typically quarterly).

## Limitations

- The calculator does pure SI. For EMI-based loans (most modern lending), use [EMI Calculator](/calculator/emi).
- Doesn't model partial principal repayments.
- Doesn't handle compound-frequency variations.

## Related calculators

- **[Compound Interest](/calculator/compound-interest)** — the alternative; almost always better
- **[EMI](/calculator/emi)** — reducing-balance loan math
- **[FD / RD](/calculator/fd-rd)** — quarterly-compounded bank deposits
- **[CAGR](/calculator/cagr)** — annualized growth rate
- **[ROI](/calculator/roi)** — return on investment

---

**Final note.** Simple interest is mostly a school-textbook concept and a money-lender trap. The single most important takeaway: **if anyone quotes "flat rate" on a multi-instalment loan, double the rate mentally to get the real effective rate**. Then negotiate down — or walk away.
