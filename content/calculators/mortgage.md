## What is a mortgage?

A **mortgage** is a loan secured by real estate. You borrow most of the property's price from a bank, repay it in fixed monthly instalments over 10–30 years, and the property itself is collateral — if you default, the bank can seize and sell it. It's the single biggest loan most people will take in their lives, and the difference between a smart and a sloppy mortgage decision is often a 7-figure number over the loan's lifetime.

## How is a mortgage EMI calculated?

The reducing-balance EMI formula:

```
EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)
```

where:

- `P` = principal (loan amount, _not_ property price)
- `r` = monthly interest rate (annual rate / 12 / 100)
- `n` = total number of months (years × 12)

The principal is what you actually borrow — property price minus your down payment. _Banks calculate EMI on the principal, not the property price._

## Worked example: ₹75 lakh property in Mumbai

Buyer's situation:

- **Property price**: ₹75,00,000
- **Down payment**: 20% = ₹15,00,000
- **Loan amount**: ₹60,00,000
- **Interest rate**: 8.5% per annum (floating)
- **Tenure**: 20 years

| Step                     | Value                                           |
| ------------------------ | ----------------------------------------------- |
| Principal                | ₹60,00,000                                      |
| Monthly rate             | 0.007083 (8.5% / 12 / 100)                      |
| Months                   | 240                                             |
| **Monthly EMI**          | **₹52,068**                                     |
| Total paid over 20 years | ₹1.25 crore                                     |
| **Total interest**       | **₹65,06,259**                                  |
| Out-of-pocket total      | ₹15 L (down) + ₹1.25 cr (EMI) = **₹1.40 crore** |

To buy a ₹75 lakh property, you end up paying ₹1.40 crore. **₹65 lakh of that is just bank interest.** This is the headline number every mortgage decision should start with.

## Components and inputs explained

### Property price

The agreed sale price. Not the circle rate, not the broker's quote — the price on the registered sale agreement.

### Down payment

What you pay upfront. Standard: 10–25%. Sweet spot: 20%.

- **Below 10%**: bank may need extra fees (PMI / higher rate)
- **20–25%**: best rates, comfortable balance
- **Above 30%**: leaves cash idle; consider investing the excess instead

The [Down Payment](/calculator/down-payment) calculator helps you balance LTV (loan-to-value) against your liquidity.

### Loan amount

Property price minus down payment. The bank may add processing fees (0.5–1%) to this — usually paid separately, not added to principal.

### Interest rate

Two flavours:

- **Floating** (most common): linked to bank's MCLR or repo rate. Adjusts quarterly.
- **Fixed**: locked for 3–5 years usually, then converts to floating.

In India (mid-2025): 8.4–9.5% for prime borrowers. Government schemes (PMAY, low-income housing) may offer 0.5–1% below this.

### Tenure

Most mortgages: 15–30 years. Shorter saves interest; longer reduces monthly burden.

## Tenure tradeoff (₹60L principal at 8.5%)

| Tenure       | EMI     | Total interest | Total paid |
| ------------ | ------- | -------------- | ---------- |
| **15 years** | ₹59,083 | ₹46.4 L        | ₹1.06 cr   |
| **20 years** | ₹52,068 | ₹65.0 L        | ₹1.25 cr   |
| **25 years** | ₹48,272 | ₹84.8 L        | ₹1.45 cr   |
| **30 years** | ₹46,127 | ₹1.06 cr       | ₹1.66 cr   |

The 30-year option saves ₹13,000/month vs the 15-year — but costs **₹60 lakh more** in interest. _The shorter tenure you can comfortably afford is almost always the right choice._

## Common types

| Type                            | Where you'll see it                                            |
| ------------------------------- | -------------------------------------------------------------- |
| **Conventional home loan**      | Default; for own-use property                                  |
| **Loan against property (LAP)** | Borrow against existing property; lower rate but lower max LTV |
| **Construction loan**           | For under-construction property; pre-EMI on disbursed amount   |
| **Plot loan**                   | For buying land only (higher rate, shorter tenure)             |
| **Home renovation loan**        | Up to 70% of estimated cost                                    |
| **PMAY-CLSS** (subsidized)      | Government interest subsidy for EWS/LIG/MIG buyers             |
| **NRI home loan**               | Repaid from NRO/NRE; tighter eligibility                       |

## Prepayment — the highest-ROI move you can make

Prepaying a chunk in the early years has massive interest-saving leverage. Examples on ₹60L / 20yr / 8.5%:

- ₹1 L prepayment in year 2 → ~₹4 L interest saved + 8 months earlier payoff
- ₹5 L prepayment in year 3 → ~₹17 L interest saved + 2.5 years earlier
- Extra ₹5,000/month from year 1 → ~₹13 L interest saved + 4 years earlier payoff

On floating-rate housing loans, RBI bans prepayment penalties. **Use the [Mortgage Payoff calculator](/calculator/mortgage-payoff) to model your specific scenario.**

## Considerations

- **40% rule**: keep total EMI commitments (housing + car + other loans) under 40% of net monthly income. Banks will sanction up to 65%; that's the path to "house poor".
- **Buy or rent?** In most Indian metros, **buy if you'll stay 8+ years AND rental yield is < 3% of property value**. Use the [Home Loan vs Rent](/calculator/home-loan-vs-rent) calculator for your numbers.
- **Loan-to-value (LTV)**: stay below 80% for best rates. Above 80% is allowed but pricier.
- **Co-applicant**: adding a working spouse can increase eligibility AND give both partners separate Section 24(b) + 80C deductions.
- **Closing costs**: stamp duty + registration (4–8% of property value) is on top of the loan. Plan for this separately. Use the [Stamp Duty calculator](/calculator/stamp-duty).

## Tax benefits (India, old regime)

| Section   | Benefit                                          | Cap                              |
| --------- | ------------------------------------------------ | -------------------------------- |
| **80C**   | Principal repayment                              | ₹1.5 lakh / year                 |
| **24(b)** | Interest paid on self-occupied home              | ₹2 lakh / year                   |
| **24(b)** | Interest on let-out / rented property            | Uncapped (against rental income) |
| **80EEA** | First-time buyer, loan < ₹35 L, property < ₹45 L | Additional ₹1.5 lakh             |

**New regime: zero home-loan deductions.** If you're paying significant interest, the old regime usually wins. Confirm with the [Regime Compare](/calculator/regime-compare) calculator.

## Limitations

- The calculator uses a single fixed rate. Real floating-rate loans reset quarterly.
- It doesn't model PMI / mortgage insurance for low-LTV loans.
- It doesn't include property tax / society maintenance / home insurance (factored separately on real mortgages — Calculator.net's tool shows a combined "Total Out of Pocket" view).
- It doesn't model prepayment penalty on fixed-rate loans (typically 2–4% in early years).

## Related calculators

- **[EMI Calculator](/calculator/emi)** — same math, generalized for any loan type
- **[Amortization Schedule](/calculator/amortization)** — full month-by-month breakdown of principal vs interest
- **[Mortgage Payoff](/calculator/mortgage-payoff)** — model the impact of extra payments
- **[Refinance Calculator](/calculator/refinance)** — break-even on switching banks for a lower rate
- **[House Affordability](/calculator/house-affordability)** — work backwards from your income to a max property price
- **[Home Loan vs Rent](/calculator/home-loan-vs-rent)** — should you even buy?
- **[Down Payment](/calculator/down-payment)** — figure out your loan amount and LTV
- **[Stamp Duty](/calculator/stamp-duty)** — registration + stamp duty for your state

---

**Final note.** A mortgage isn't a financial product — it's a 20–30 year relationship with a bank. Most "mortgage advice" focuses on the monthly EMI. **The decisions that actually matter are tenure, prepayment discipline, and the buy-vs-rent baseline.** Run those three calculators before you sign the term sheet, not after.
