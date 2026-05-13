## What is PPF?

**Public Provident Fund (PPF)** is a 15-year government-backed savings scheme for Indian residents. Backed by the Government of India, it pays a tax-free interest rate (currently **7.1%** annually, reviewed quarterly by the Finance Ministry), with deposits qualifying for Section 80C deduction. Interest is exempt from tax, and the maturity amount is exempt — making PPF one of the few remaining **EEE (Exempt-Exempt-Exempt)** instruments in the Indian tax code.

For a 30-year-old earning ₹15 L/year in the 30% slab, ₹1.5 L into PPF effectively yields **10.1%-equivalent taxable return** — beating most FDs, beating most debt funds, and approaching equity-fund averages on a risk-adjusted basis.

## How is PPF interest calculated?

The math is **annual compounding** on the running balance:

```
For each year:
  balance(y) = (balance(y-1) + yearly_deposit) × (1 + r/100)
```

where `r` is the current PPF rate (7.1% in 2025).

CalcMaster iterates this 15 times to compute the maturity amount, and shows you the year-by-year growth so you can see when the curve takes off (usually around year 8–10).

## Worked example

You deposit **₹1.5 lakh every year for 15 years** at 7.1% PPF rate.

| Year | Cumulative deposit | Balance      |
| ---- | ------------------ | ------------ |
| 1    | ₹1.5 L             | ₹1.61 L      |
| 5    | ₹7.5 L             | ₹9.39 L      |
| 10   | ₹15.0 L            | ₹22.55 L     |
| 15   | ₹22.5 L            | **₹40.69 L** |

**Total deposited**: ₹22,50,000 (₹1.5 L × 15)
**Total interest earned**: ₹18,19,000
**Maturity amount**: **₹40,69,000**

Interest accounts for **~45% of the maturity amount**. _Tax-free._

## PPF rules you must know

| Rule                       | Value                                                          |
| -------------------------- | -------------------------------------------------------------- |
| Minimum yearly deposit     | ₹500                                                           |
| **Maximum yearly deposit** | **₹1,50,000**                                                  |
| Tenure                     | 15 years (extendable in 5-year blocks)                         |
| Number of accounts         | One per person; minors can have via guardian                   |
| Interest rate              | Set quarterly (currently 7.1%)                                 |
| Compounding                | Annual                                                         |
| Tax treatment              | EEE (deposit deductible, interest tax-free, maturity tax-free) |
| Section 80C limit          | Counts toward the ₹1.5 L 80C cap                               |

## When to deposit during the year

PPF interest is calculated on the **minimum balance between the 5th and the end of the month**. This has a sneaky implication:

- Depositing on **or before the 5th**: full month's interest counts
- Depositing on the **6th or later**: that month's interest is lost on the new deposit

For ₹1.5 lakh deposited annually:

| Strategy                              | Cumulative interest over 15 years |
| ------------------------------------- | --------------------------------- |
| Lump sum on **April 1** (start of FY) | ₹18.19 L                          |
| Lump sum on **March 31** (end of FY)  | ₹17.30 L (~₹90k less)             |
| Monthly on **5th** of each month      | ₹17.78 L                          |
| Monthly on **6th** of each month      | ₹17.34 L                          |

**Optimal strategy**: deposit ₹1.5 L lump-sum on **1 April** each year. Loses minimum interest, maximizes compounding time. If you split monthly, do it on or before the 5th.

## Partial withdrawal and loans

| Feature            | When available                                                 |
| ------------------ | -------------------------------------------------------------- |
| Loan against PPF   | Years 3–6 (cheap; useful as a backup credit line)              |
| Partial withdrawal | Year 7+ (max 50% of balance at end of year 4)                  |
| Premature closure  | Year 5+ (with 1% interest penalty; only for medical/education) |
| Full closure       | Year 15 (maturity)                                             |

The 15-year lock-in is real. PPF is **not liquid**. Treat it as deeply retirement-locked money.

## Components and inputs explained

### Yearly deposit

₹500 minimum, ₹1.5 L maximum. CalcMaster caps your input at ₹1.5 L automatically — even if you type more, the calculation uses ₹1.5 L (matching real PPF rules).

### Interest rate

Defaults to the current 7.1% but you can change it — useful for projecting under different rate scenarios. Historical rate range: 7.1%–12% (1990s peak).

### Tenure

Fixed at 15 years for the maturity calculation. After 15 years you can extend in 5-year blocks (with or without further deposits) — CalcMaster doesn't model extensions yet.

## PPF vs alternatives

| Instrument           | Rate            | Tax treatment                             | Lock-in         | Liquidity |
| -------------------- | --------------- | ----------------------------------------- | --------------- | --------- |
| **PPF**              | 7.1%            | EEE                                       | 15 yr           | Low       |
| FD (5-yr tax saver)  | 6.5–7.5%        | Interest taxable; principal 80C eligible  | 5 yr            | None      |
| ELSS mutual fund     | 11–14% expected | LTCG 12.5% above ₹1.25 L                  | 3 yr            | Medium    |
| NPS Tier-1           | 9–12% expected  | Mixed (lumpsum tax-free, annuity taxable) | Till 60         | Very low  |
| EPF (auto-deduction) | 8.15%           | EEE for ≥ 5 yr service                    | Till retirement | None      |
| SSY (for girl child) | 8.2%            | EEE                                       | 21 yr           | None      |

For a 30-year-old in the 30% slab, the **tax-adjusted ranking** for the safe-allocation bucket is roughly: PPF > EPF > SSY > tax-saver FD > regular FD.

## Extending PPF after 15 years

At maturity you have three options:

1. **Withdraw fully** — tax-free maturity, principal + interest in your bank
2. **Extend without contribution** — money keeps earning interest, no further deposits required
3. **Extend with contribution** — submit Form H within 1 year; continue ₹1.5 L/yr deposits

Many Indian retirees extend PPF in option 3 (or 2) **purely to avoid the taxable alternatives**. A 60-year-old retiree's PPF extension can compound for another 10–20 years at tax-free 7%, beating most taxable retirement options on after-tax basis.

## Considerations

- **PPF is the "safe" allocation, not the growth driver.** Pair with equity SIPs for the growth bucket.
- **Don't double up on 80C.** PPF + ELSS + EPF + life insurance + home loan principal collectively cap at ₹1.5 L deduction. Track total.
- **Interest rate is reviewed quarterly.** It's been 7.1% since 2020. Long-term direction is downward as RBI's policy rates fell.
- **PPF is per-person, not per-account.** You can't open multiple PPF accounts; consolidate older accounts.
- **NRIs can't open new PPF accounts**, but existing accounts can be continued till maturity (no extension).

## Limitations

- The calculator assumes constant interest rate over 15 years. Real PPF rates vary quarterly — for retrospective accuracy, blend historical rates.
- It doesn't model the minimum-balance-between-5th-and-month-end rule precisely. Assumes annual deposit on April 1.
- It doesn't model partial withdrawals during years 7–15.
- It doesn't model account extensions beyond 15 years.

## Related calculators

- **[EPF Calculator](/calculator/epf)** — automatic deduction from salary
- **[NPS Calculator](/calculator/nps)** — market-linked retirement
- **[SSY](/calculator/ssy)** — Sukanya Samriddhi for daughters
- **[Section 80C](/calculator/section-80c)** — overall tax-saver tracker
- **[ELSS](/calculator/elss)** — equity tax saver (alternative)
- **[FD Calculator](/calculator/fd-rd)** — comparison with FDs

---

**Final note.** PPF is the most-recommended Indian retirement instrument for a reason: high tax-adjusted return, sovereign guarantee, no NAV volatility, and 30+ years of compounding if you start at 25 and extend at 40 and 55. **Set up the ₹1.5 L April-1 deposit on auto-debit, forget about it, and let it compound until you're 60.** This calculator just shows you the number that's coming.
