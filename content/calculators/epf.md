## What is EPF?

**Employees' Provident Fund (EPF)** is India's mandatory retirement scheme for salaried employees in organizations with 20+ employees. Both you and your employer contribute **12% of your Basic + DA** every month. The accumulated corpus earns interest declared annually (currently **8.15% for FY 2024-25**) and is paid out tax-free at retirement (after 5+ years of continuous service).

For most Indian middle-class earners, EPF is the **single largest forced savings instrument** in their working life — accumulating to ₹50 lakh to ₹2 crore by retirement depending on salary growth and tenure.

## How is EPF calculated?

Monthly contribution breakdown:

```
Employee's 12% of Basic + DA  →  EPF account (your share)
Employer's 12% of Basic + DA  →  split into:
  - 8.33% → EPS (Employees' Pension Scheme)
  - 3.67% → EPF account (employer's share)
```

So your **EPF account receives 12% + 3.67% = 15.67%** of Basic + DA every month. The 8.33% EPS portion is a separate scheme that provides a small monthly pension at age 58.

Interest is **compounded annually** at the declared rate (8.15% for FY 2024-25), credited at year-end but accumulating monthly.

```
EPF maturity ≈ sum of (monthly_contributions × (1 + monthly_rate)^months)
```

CalcMaster simulates the month-by-month accrual including expected salary growth (default 8%/year) so the output matches your UAN passbook trajectory.

## Worked example

You're **30 years old**, currently earning **Basic + DA = ₹30,000/month**, expecting to retire at **58**. Salary growth 8%/year, EPF rate stable at 8.15%.

| Year                 | Basic + DA | Monthly EPF (employee 12%) | Cumulative balance |
| -------------------- | ---------- | -------------------------- | ------------------ |
| Year 1               | ₹30,000    | ₹3,600                     | ₹0.93 L            |
| Year 10              | ₹64,000    | ₹7,680                     | ₹16 L              |
| Year 20              | ₹1,38,000  | ₹16,560                    | ₹76 L              |
| Year 28 (retirement) | ₹2,56,000  | ₹30,720                    | **₹2.16 cr**       |

Your **total contribution** over 28 years: ₹54 L
Your **employer's total contribution** (3.67% to EPF): ₹16 L
**Interest accumulated**: ₹1.46 cr (~67% of the corpus)

EPF's quiet 8.15% tax-free is mathematically equivalent to ~11.6% pre-tax for someone in the 30% bracket. Compounded over 28 years, it produces a corpus equivalent to a strong equity SIP — without the volatility.

## EPF rules you must know

| Rule                      | Detail                                                                                                                       |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Eligibility               | Employees in firms with 20+ employees, monthly salary ≤ ₹15,000 (mandatory). Above that, voluntary but most employers offer. |
| Monthly contribution      | Employee 12%, employer 12% (8.33% EPS + 3.67% EPF) of Basic + DA                                                             |
| Statutory ceiling         | Employer's contribution capped at 12% of ₹15,000 = ₹1,800 in some legacy setups — most modern employers waive this           |
| Interest rate             | Declared annually by EPFO; currently 8.15% (FY 2024-25)                                                                      |
| Withdrawal at retirement  | Tax-free if 5+ years of continuous service                                                                                   |
| Withdrawal before 5 years | Taxable; 10% TDS if withdrawal > ₹50,000                                                                                     |
| Loan against EPF          | Not available; use partial withdrawal instead                                                                                |

## Partial withdrawal: when allowed

You can dip into your EPF for specific life events without retiring:

| Reason                               | When eligible                  | Max %                  |
| ------------------------------------ | ------------------------------ | ---------------------- |
| Marriage (self / child / sibling)    | 7+ years of service            | 50% of employee share  |
| Higher education (self / child)      | 7+ years of service            | 50% of employee share  |
| Home purchase / construction         | 5+ years of service            | Up to 24× monthly wage |
| Home renovation                      | 5+ years of service            | 12× monthly wage       |
| Home loan repayment                  | 10+ years of service           | Up to 90% of balance   |
| Medical treatment (self / family)    | Anytime (no service condition) | 6× monthly wage        |
| Pre-retirement (within 1 year of 58) | 57+ years old                  | 90% of balance         |
| COVID / pandemic                     | Specific notifications         | Up to 75% of balance   |

For most reasons, the withdrawn amount is tax-free if 5+ years of continuous service. Cumulative service across employers counts if you've transferred EPF (not withdrawn) between jobs.

## What happens when you switch jobs

**Transfer, don't withdraw.** When you change employers:

- ✅ **Transfer**: file Form 13 (or use UAN portal) to merge EPF balances. Service continuity preserved.
- ❌ **Withdraw**: get the money, but reset service clock. Withdrawals before 5 years are taxable + TDS.

If you withdraw after 3 years and rejoin EPF later, you start fresh from 0 years of service — that means partial withdrawals require waiting another 5 years before resetting.

**Always transfer if you might need partial withdrawal in the next 5–7 years** (home purchase, marriage). Withdraw only if you're permanently leaving employment.

## Components and inputs explained

### Basic + DA (current)

Your current month's Basic salary + Dearness Allowance. This is the base for EPF computation. Not gross salary, not CTC, not in-hand.

### Current age

Your age today. Used to compute years remaining till retirement.

### Retirement age

Default 58 (standard government / corporate retirement). Adjust if your employer has different policy.

### Salary growth %

Expected annual hike. CalcMaster defaults to 8%, which is the long-term India IT/services average. Use 6–7% for safer estimate.

### Interest rate %

Defaults to 8.15% (FY 2024-25). Historical EPF rates: 12% (1989), 10.5% (1999), 8.5% (2018), 8.1% (2022), 8.25% (2023), 8.15% (2024).

### Current EPF balance (optional)

If you have existing EPF balance from previous employment, add it. The calculator includes it from day 1 of the simulation.

## EPF vs alternatives

| Instrument   | Net return       | Risk                        | Liquidity                  |
| ------------ | ---------------- | --------------------------- | -------------------------- |
| **EPF**      | 8.15% (tax-free) | Very low (sovereign-backed) | Low (5-yr lock)            |
| PPF          | 7.1% (tax-free)  | Very low                    | Very low (15-yr lock)      |
| NPS Tier-1   | 9–12% expected   | Low (mostly govt bonds)     | Very low (till 60)         |
| Tax-saver FD | 6.5–7.5%         | Very low                    | Low (5-yr lock)            |
| ELSS         | 11–14% expected  | High                        | Medium (3-yr lock per SIP) |

EPF's 8.15% beats most safe instruments after tax adjustment. Treat it as the **anchor** of your fixed-income allocation, then build equity SIP / NPS Tier-1 / ELSS on top.

## Tax implications

- **Withdrawal after 5 years of continuous service**: tax-free.
- **Withdrawal before 5 years**:
  - If total taxable income includes the withdrawal: taxed at slab rate
  - Plus 10% TDS deducted by EPFO (claim back in ITR)
  - If withdrawal < ₹50,000: no TDS
- **Employer's contribution >12% of basic, in your own EPF**: the excess is taxable as perquisite (rare scenario)
- **Excess interest on contributions > ₹2.5 L/yr** (from your share): the interest on the excess is taxable (2021 budget rule, affects high earners only)

## Considerations

- **Continuous service is sacred.** Don't withdraw between jobs; always transfer via Form 13 or UAN portal.
- **EPS pension is tiny.** The 8.33% to EPS yields ~₹1,500–3,500/month pension at 58. Don't rely on it as primary retirement income.
- **VPF (Voluntary PF) is a quiet gem.** You can voluntarily contribute _more than_ 12% to your EPF — earns the same 8.15% tax-free interest. Cap your VPF + EPF combined contribution at ₹2.5 L/yr (interest above that is taxable).
- **Check UAN annually.** Mismatched UAN-Aadhaar links delay withdrawal by months. Verify at unifiedportal-mem.epfindia.gov.in.

## Limitations

- The calculator assumes constant 8.15% rate over 28+ years. Historical EPF rate has varied from 12% to 8% — for retrospective accuracy, model multiple rate scenarios.
- It doesn't model the EPS pension (8.33% employer share) separately — that ₹/month at 58 is calculated under a different EPS formula.
- It assumes constant 8% salary growth — real careers have bigger jumps in early years, plateaus later.
- It doesn't model VPF additional contributions.
- Statutory ceiling (₹15,000 basic for legacy setups) isn't modelled — assumes full 12% on actual basic.

## Related calculators

- **[PPF Calculator](/calculator/ppf)** — voluntary 15-yr alternative
- **[NPS Calculator](/calculator/nps)** — market-linked retirement
- **[Retirement Planner](/calculator/retirement)** — total corpus needed
- **[Gratuity Calculator](/calculator/gratuity)** — end-of-service one-time payout
- **[EPF Final Settlement](/calculator/epf-final)** — exact retirement balance
- **[Section 80C](/calculator/section-80c)** — overall tax-saver tracker

---

**Final note.** EPF is the most underrated retirement vehicle in India. Every salaried employee is enrolled by default; very few open the UAN portal to actually look at the balance. **Do these three things today**: (1) verify UAN-Aadhaar link, (2) project your retirement corpus with this calculator and check if it's enough, (3) consider VPF top-ups if your effective tax rate is 30%+. EPF doesn't ask for attention — but giving it some attention compounds for the next 25 years.
