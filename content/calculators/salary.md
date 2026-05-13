## What is a salary calculator?

A **salary calculator** translates the headline number on your offer letter — the **CTC (Cost to Company)** — into the number that actually shows up in your bank account every month, your **in-hand salary**. The two numbers can differ by 20–35% depending on your tax regime, EPF, gratuity, professional tax, and other deductions.

If you've ever signed an offer for "₹18 lakh CTC" and been surprised when your first salary credit was ₹1.12 lakh (not ₹1.50 lakh), this calculator is for you.

## How is in-hand salary calculated?

The flow:

```
1. Start with annual CTC
2. Subtract employer contributions (NOT paid to you):
     - Employer's EPF (12% of Basic + DA)
     - Employer's gratuity provision
     - Group insurance, ESOPs vesting, etc.
   →  Gives you "Gross Salary"
3. Subtract employee-deductible items:
     - Employee's EPF (12% of Basic + DA)
     - Professional Tax (state-dependent, ~₹2,400/year)
     - Income tax (based on regime + deductions)
   →  Gives you "In-hand Salary"
4. Divide annual in-hand by 12 for monthly take-home
```

CalcMaster applies the **new tax regime** by default (no major deductions, ₹75,000 standard deduction) — this matches the default for most new hires post-2024. If your structure favours old regime (HRA + 80C + home loan interest), switch in the Income Tax calculator and re-run.

## Worked example

You join a Bangalore IT company on **₹18 lakh CTC**. Standard private-sector structure:

| Component                                                  | Annual amount  | Notes                                   |
| ---------------------------------------------------------- | -------------- | --------------------------------------- |
| Basic (40% of CTC)                                         | ₹7,20,000      | EPF, gratuity, HRA all based on this    |
| HRA (40% of Basic)                                         | ₹2,88,000      | Only matters in old regime              |
| EPF — employer (12% of Basic)                              | ₹86,400        | Part of CTC, paid to your EPF, NOT cash |
| EPF — employee (12% of Basic)                              | ₹86,400        | Deducted from your gross                |
| Gratuity (4.81% of Basic)                                  | ₹34,600        | Part of CTC, paid on exit (5+ yrs)      |
| Special allowance (balance)                                | ₹6,71,000      | Fully taxable                           |
| **Total CTC**                                              | **₹18,00,000** | What the offer letter says              |
| **Gross (CTC − employer EPF − gratuity)**                  | **₹16,79,000** | What you "earn" pre-tax                 |
| Income tax (new regime, no deductions on ₹16.04 L taxable) | ~₹1,95,000     | After ₹75k standard deduction           |
| Professional tax (Karnataka)                               | ₹2,400         | Flat                                    |
| **Annual in-hand**                                         | **₹12,95,200** |                                         |
| **Monthly in-hand**                                        | **₹1,07,933**  |                                         |

The difference: **CTC ₹18 L → In-hand ₹12.95 L = ₹5.05 L gap (28% of CTC)**. Half of that is income tax, half is forced retirement savings (EPF + gratuity).

## CTC vs Gross vs In-hand — what's the difference?

| Term                      | What it includes                                                                                                               | Where you see it      |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | --------------------- |
| **CTC (Cost to Company)** | Everything the company spends on you: cash + EPF (both sides) + gratuity + insurance + ESOP value + sometimes laptop allowance | Offer letter headline |
| **Gross Salary**          | What you "earn" pre-tax: CTC minus employer's contributions (which never touch your bank)                                      | Salary slip top       |
| **Net / In-hand Salary**  | What hits your bank: Gross − employee EPF − Professional Tax − Income Tax                                                      | Bank statement        |

A **₹20 L CTC** offer is roughly equivalent to a **₹16 L gross** and a **~₹13–14 L in-hand** for a typical Indian private employee. **Always negotiate in CTC** but **plan your budget on in-hand**.

## Components and inputs explained

### Annual CTC

The headline number from your offer letter. Use the total, including any signing bonus / joining bonus if it's promised annually.

### Tax regime

Choose old or new. Defaults to **new regime** since 2024 (Indian government default for non-declaring employees).

### Basic + HRA + EPF assumptions

CalcMaster uses **40% of CTC as Basic, 12% EPF on Basic, ₹75,000 standard deduction**. Your actual structure may differ — verify with HR. The math directionally holds for any reasonable structure.

## Components of a typical CTC breakdown

| Component                    | % of CTC (typical) | Tax-favoured?                                                |
| ---------------------------- | ------------------ | ------------------------------------------------------------ |
| Basic + DA                   | 30–50%             | Fully taxable                                                |
| HRA                          | 30–50% of Basic    | Partly exempt (old regime only)                              |
| Special allowance            | 10–30%             | Fully taxable                                                |
| EPF (employer)               | 12% of Basic       | Tax-free at retirement (5+ yrs)                              |
| EPF (employee)               | 12% of Basic       | 80C deductible (old regime); ₹2.5 L cap on tax-free interest |
| Gratuity                     | 4.81% of Basic     | Tax-free up to ₹20 L on exit (5+ yrs)                        |
| Leave travel allowance (LTA) | Variable           | Exempt for 2 trips per 4-yr block (old regime)               |
| Medical allowance            | ₹15,000            | Tax-free up to ₹15,000 with bills                            |
| Professional tax             | Negative ₹2,400    | Not deductible elsewhere                                     |
| Food coupons / meal vouchers | ₹15,000–₹30,000    | Tax-free up to ₹50/meal × 264 days                           |
| ESOPs / RSUs                 | Variable           | Taxable as perquisite + capital gains on sale                |
| Company car / lease          | Variable           | Perquisite valuation rules apply                             |

The composition matters — a high-Basic structure means higher EPF (good for retirement, bad for in-hand). A high-Special-Allowance structure means more in-hand cash now (less retirement savings).

## Tax-saving levers (old regime only)

If you're in the old regime, these reduce your taxable income:

| Lever                                                     | Cap                           | Notes                                 |
| --------------------------------------------------------- | ----------------------------- | ------------------------------------- |
| 80C (PPF, ELSS, EPF, life insurance, home loan principal) | ₹1.5 L                        | Already includes EPF                  |
| 80CCD(1B)                                                 | Additional ₹50,000            | NPS Tier-1 only                       |
| 80D (health insurance)                                    | ₹25,000 (₹50K seniors)        | Self/family; another ₹25K for parents |
| HRA exemption                                             | Variable                      | See [HRA Calculator](/calculator/hra) |
| Home loan interest (24b)                                  | ₹2 L (self-occupied)          | Uncapped for let-out                  |
| Standard deduction                                        | ₹50,000 (old) / ₹75,000 (new) | Automatic                             |
| LTA                                                       | 2 trips per 4-yr block        | Domestic travel only                  |
| Food coupons                                              | ₹50/meal × working days       | Through Sodexo / Zeta / etc.          |

Use [Regime Compare](/calculator/regime-compare) to see if old beats new with these.

## Considerations

- **CTC inflation tricks.** Some employers pump up CTC with low-value perks (free meals, company gym, unlimited leave). These don't increase in-hand.
- **ESOPs are not cash.** A "₹2 L worth of ESOPs" in your CTC is an option grant that vests over 4 years. Tax-treated as salary on exercise + capital gains on sale.
- **Bonus vs guaranteed.** "₹2 L performance bonus" in CTC is often non-guaranteed. Plan in-hand on Basic + guaranteed comp only.
- **Professional tax varies by state.** Karnataka: ₹2,400/yr. Maharashtra: ₹2,500/yr. Some states have no PT.
- **Gratuity isn't received until 5+ years of service.** It's in your CTC every year but you only see the cash on exit.

## Limitations

- The calculator uses default structural assumptions (40% Basic, 12% EPF, ₹75k std deduction). Your actual structure may differ — verify with HR.
- Doesn't compute HRA exemption automatically — use the [HRA Calculator](/calculator/hra) and pass the exempt amount as a deduction to the [Income Tax](/calculator/income-tax) calculator.
- Doesn't model ESOPs / RSUs / sign-on bonuses with vesting schedules.
- Doesn't apply surcharge above ₹50 L (high earners need CA review).
- Doesn't account for perquisite valuations (company car, employer-provided housing).

## Related calculators

- **[Income Tax](/calculator/income-tax)** — old vs new regime
- **[HRA Calculator](/calculator/hra)** — exempt vs taxable HRA
- **[EPF Calculator](/calculator/epf)** — retirement corpus
- **[Gratuity](/calculator/gratuity)** — end-of-service payout
- **[Section 80C](/calculator/section-80c)** — tax-saver investment tracker
- **[Form 16 Take-Home](/calculator/form-16)** — alternative angle on in-hand
- **[Regime Compare](/calculator/regime-compare)** — which regime wins for you

---

**Final note.** Your offer letter's CTC is a marketing number. Your in-hand salary is the planning number. **Always compute in-hand before committing to rent, EMI, or recurring expenses.** A 25% in-hand-to-CTC ratio is normal in India; 35%+ means very tax-aggressive structuring (and possible perks-heavy comp); below 20% means very high tax bracket or unusual deductions. This calculator just gives you the honest number.
