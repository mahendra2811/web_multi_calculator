---
title: "EMI calculator: the only loan number you actually need"
excerpt: "How the EMI formula works, what 'reducing balance' means, and why your total interest is often more than the principal you borrowed."
kind: calculator
category: finance
calculatorSlug: emi
tags: [emi, loan, finance]
publishedAt: "2026-05-13"
---

EMI — _Equated Monthly Installment_ — is the fixed amount you pay every month against a loan. Same number, every month, for the entire loan tenure. What changes month to month is the _split_ between interest and principal: early on, almost all of it is interest; near the end, almost all of it is principal.

> [Open the EMI calculator](/calculator/emi) and follow along — punch in your own numbers as you read.

## The formula

`EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)`

where:

- `P` = principal (loan amount)
- `r` = monthly interest rate (annual rate / 12 / 100)
- `n` = total number of months

This is the **reducing-balance** EMI, which is what every Indian bank uses for home, car, and personal loans. It assumes interest accrues each month on the _remaining_ balance — so as you pay down the principal, the interest portion of each EMI shrinks.

## A concrete example

Loan: **₹50,00,000** at **9% per annum** for **20 years**.

- `r = 0.09 / 12 = 0.0075`
- `n = 240`
- `EMI = ₹44,986`
- **Total paid over 20 years: ₹1.08 crore**
- **Total interest: ₹57,99,536** — yes, more than the principal

That last number is the one most calculators bury. CalcMaster shows it as the first stat after the EMI itself, because it's the number that should drive your decisions.

## What the calculator gives you that a number alone doesn't

1. **Amortization schedule** — month-by-month split of EMI into principal and interest. Year 1 of the example above: ~₹45k EMI × 12 = ₹5.4 lakh paid, but only ₹0.9 lakh of that was principal.
2. **Prepayment scenarios** — what if you pay an extra ₹1 lakh every year? CalcMaster lets you simulate this and shows the months saved and interest saved.
3. **Tenure vs interest tradeoff** — the 30-year EMI looks lower than the 20-year, but the total interest paid is ~50% higher. The chart makes this visual instantly.

## Three rules of thumb

1. **Total EMI commitments should stay under 40% of net monthly income.** Banks will approve more; don't take it.
2. **Prepay early, not late.** A ₹1 lakh prepayment in year 2 saves ~₹3 lakh of interest. The same prepayment in year 18 saves almost nothing.
3. **Lower rate beats lower tenure.** Refinancing from 9.5% → 8.5% on a ₹50 lakh / 20-year loan saves ~₹7 lakh of interest. Worth the paperwork.

## Common questions

**Is "EMI" the same as "monthly payment" in the US?** Mostly, yes. The US uses the same reducing-balance formula. The acronym just isn't used there.

**Why does my bank's EMI sometimes differ by ₹1-2?** Banks round to the nearest rupee and may use slightly different day-count conventions. Anything within ₹5 is normal.

**Is flat-rate EMI the same?** No — and it's nearly always a worse deal. Flat-rate computes interest on the _original_ principal for the entire tenure, which roughly _doubles_ the effective interest rate. Avoid.

## Calculate your EMI now

Head to the [EMI Calculator](/calculator/emi). Adjust the sliders, watch the chart, and see exactly what your loan will cost over its lifetime.
