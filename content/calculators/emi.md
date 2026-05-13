## What is EMI?

**EMI** — Equated Monthly Installment — is the fixed amount you pay every month against a loan until it's fully repaid. Same number, every month, for the full tenure. What changes silently each month is the **split** between interest and principal: early on, almost all of it is interest; near the end, almost all of it is principal.

If you've ever signed a loan paper and wondered what the monthly damage will be on your salary, the EMI calculator is the first thing to run before you sign.

## How is EMI calculated?

The reducing-balance EMI formula — used by every Indian bank, NBFC, and most global lenders:

```
EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)
```

where:

- `P` = principal (loan amount in ₹)
- `r` = monthly interest rate = annual rate / 12 / 100
- `n` = total number of months = tenure × 12
- `EMI` = the fixed monthly payment

CalcMaster also generates the full amortization schedule — month-by-month showing how much of each EMI goes to interest vs principal, and the remaining balance.

## Worked example

A typical Indian home loan: **₹50 lakh, 9% annual rate, 20-year tenure**.

| Step                     | Value                  |
| ------------------------ | ---------------------- |
| Principal `P`            | ₹50,00,000             |
| Monthly rate `r`         | 0.0075 (9% / 12 / 100) |
| Number of months `n`     | 240                    |
| `(1 + r)^n`              | 6.0092                 |
| **Monthly EMI**          | **₹44,986**            |
| Total paid over 20 years | ₹1,07,96,711           |
| **Total interest**       | **₹57,96,711**         |

You borrowed ₹50 lakh. You'll pay back **₹1.08 crore**. The bank's profit — the interest — is **more than the principal itself**. _This is why long-tenure loans are quietly expensive even at moderate rates._

## Components and inputs explained

### Loan amount (principal)

What you're actually borrowing — _not_ the property/car price. Subtract your down payment, trade-in, and any subsidy from the asking price.

### Interest rate

The bank's annual rate. Note: banks quote **either** flat rate **or** reducing-balance — they look similar but flat rate is roughly _double_ the effective cost. Always confirm "reducing balance" before signing.

Current Indian benchmarks (mid-2025):

- Home loan: 8.4–9.5%
- Car loan: 9–11%
- Personal loan: 11–18%
- Credit card EMI (most expensive): 24–36%

### Tenure

The repayment period. Longer tenure = lower EMI but much higher total interest. See the comparison below.

## Tenure tradeoff: 20-yr vs 30-yr on ₹50L at 9%

| Tenure       | EMI     | Total interest | Total paid |
| ------------ | ------- | -------------- | ---------- |
| **15 years** | ₹50,713 | ₹41.3 L        | ₹91.3 L    |
| **20 years** | ₹44,986 | ₹58.0 L        | ₹1.08 cr   |
| **25 years** | ₹41,961 | ₹75.9 L        | ₹1.26 cr   |
| **30 years** | ₹40,232 | ₹94.8 L        | ₹1.45 cr   |

The 30-year tenure saves you ₹4,754/month on the EMI but costs you **₹37 lakh more** in total interest. _If you can afford the shorter tenure, take it._

## Common types

| Type                           | What's different                               | Where you see it                                                                |
| ------------------------------ | ---------------------------------------------- | ------------------------------------------------------------------------------- |
| **Reducing balance** (default) | Interest on remaining balance                  | All Indian bank loans, mortgages                                                |
| **Flat rate**                  | Interest on original principal for full tenure | Some money-lenders, BNPL schemes. Effective rate is ~2× the quoted rate. Avoid. |
| **Bullet payment**             | Interest-only EMI; principal at the end        | Bridge loans, some commercial loans                                             |
| **Balloon payment**            | Lower EMIs, one large payment at the end       | Auto leases, some commercial financing                                          |

## Prepayment: the most underrated EMI trick

A ₹1 lakh prepayment in **year 2** of a ₹50L / 20-yr / 9% loan saves roughly **₹3 lakh** in total interest. The same prepayment in year 18 saves almost nothing. **Prepay early, prepay often.**

On floating-rate housing loans, RBI rules ban prepayment penalties. On fixed-rate and personal loans, penalties of 2–4% may apply — still usually worth it. Use the [Mortgage Payoff calculator](/calculator/mortgage-payoff) to model the interest savings of an extra ₹X/month.

## Considerations

- **Total EMI commitments should stay under 40% of net monthly income.** Banks will approve more (up to 65%); don't take it. You need a buffer for emergencies and lifestyle.
- **Lower rate beats lower tenure** for total interest savings. Refinancing from 9.5% → 8.5% on a ₹50L loan saves ~₹7 lakh; worth the paperwork.
- **Pre-EMI period** (when the property is under construction): you pay interest-only EMIs until possession. These are non-tax-deductible until the property is yours.
- **Joint loans** improve approval odds AND can give both co-borrowers Section 24(b) and 80C tax benefits.

## Tax implications (India, old regime)

- **Section 80C**: Principal repayment up to ₹1.5 lakh/year (self-occupied home).
- **Section 24(b)**: Interest paid up to ₹2 lakh/year (self-occupied; uncapped for let-out property).
- **Section 80EEA**: Additional ₹1.5 lakh for first-time buyers on loans under ₹35 lakh (subject to conditions).
- New regime: **no home-loan deductions allowed.** If you're paying significant home loan interest, the old regime usually wins. Verify with the [Regime Compare](/calculator/regime-compare) calculator.

## Limitations

- The calculator assumes constant interest rate over the tenure. Floating-rate loans get repriced quarterly. Re-run with the new rate when your bank revises.
- It doesn't model insurance bundling (PMAY-CLSS, group life insurance riders). These add 0.5–2% to effective cost.
- It doesn't model the time value of money on prepayments. Use the [Mortgage Payoff](/calculator/mortgage-payoff) tool for that.
- Processing fees (typically 0.5–1% of loan amount) and stamp duty are excluded. The [APR calculator](/calculator/apr) accounts for these.

## Related calculators

- **[Mortgage Calculator](/calculator/mortgage)** — same math, home-loan-specific UX
- **[Amortization Schedule](/calculator/amortization)** — full month-by-month breakdown
- **[Mortgage Payoff](/calculator/mortgage-payoff)** — model extra-payment scenarios
- **[Refinance Calculator](/calculator/refinance)** — break-even on rate-change refinancing
- **[Auto Loan](/calculator/auto-loan)** — same EMI math, with down payment + trade-in
- **[DTI Ratio](/calculator/dti)** — check whether you qualify before applying

---

**Final note.** The EMI itself is the boring part of the conversation. The interesting numbers are the total interest paid and the impact of prepayment. Run the math before you sign — and run it again every year of the loan, because every prepayment opportunity is leverage you'll never have again.
