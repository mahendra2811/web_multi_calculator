## What are FD and RD?

**Fixed Deposit (FD)** is a lump-sum savings instrument: deposit ₹X today, earn interest for a fixed tenure (7 days to 10 years), get your money back with interest at maturity. **Recurring Deposit (RD)** is the monthly-installment cousin: deposit ₹Y every month for a fixed tenure, get your accumulated amount at maturity.

Both are the most-trusted savings vehicles in India — sovereign-adjacent safety (DICGC insurance up to ₹5 L per bank), predictable returns, no NAV volatility. The trade-off: lower returns than equity mutual funds, and interest is taxable at your slab rate.

## How is FD interest calculated?

Most Indian banks compound FD interest **quarterly**:

```
A = P × (1 + r/n)^(n × t)
```

where:

- `P` = principal
- `r` = annual interest rate (decimal)
- `n` = compounding periods per year (4 for quarterly)
- `t` = tenure in years
- `A` = maturity amount

Example: **₹1,00,000 FD at 7% for 5 years**, quarterly compounded:

```
A = 100000 × (1 + 0.07/4)^(4×5)
  = 100000 × (1.0175)^20
  = 100000 × 1.41478
  = ₹1,41,478
```

Interest earned: ₹41,478.

## How is RD interest calculated?

RD math is messier because each monthly installment earns interest for a different period. The bank uses **quarterly compounding** on the running balance:

```
For each month:
  balance(m) = balance(m-1) + monthly_deposit
  balance compounds at quarterly rate
```

CalcMaster iterates this month-by-month so the output matches your bank's certificate.

**RD returns are slightly lower than FD** for the same rate and tenure — because RD installments are staggered (the last installment earns interest for only one month).

## Worked example: FD vs RD

**Scenario A**: ₹1 L FD for 5 years at 7%
**Scenario B**: ₹5,000/month RD for 60 months at 7% (also totals ₹3 L over 5 years, but you'd have to invest ₹5 L FD to equal it)

Comparing same-investment cases:

| Instrument                         | Monthly invested | Total invested | 5-yr maturity | Interest earned |
| ---------------------------------- | ---------------- | -------------- | ------------- | --------------- |
| **FD** ₹3 L lumpsum                | —                | ₹3,00,000      | ₹4,24,434     | ₹1,24,434       |
| **RD** ₹5,000/month                | ₹5,000           | ₹3,00,000      | ₹3,59,000     | ₹59,000         |
| **SIP** ₹5,000/month at 12% equity | ₹5,000           | ₹3,00,000      | ₹4,12,432     | ₹1,12,432       |

For the same ₹3 L total invested over 5 years:

- FD ₹3 L lumpsum on day 1 wins on raw return (~₹1.24 L interest)
- RD ₹5,000/month earns less (~₹59 k) because money is staggered
- SIP in equity ~doubles RD's return at higher volatility

_FD beats RD if you have the lump-sum upfront; RD beats nothing if you don't._

## When to use FD vs RD

| Situation                                     | Pick                                                                 |
| --------------------------------------------- | -------------------------------------------------------------------- |
| Lump sum from bonus, sale, gift               | **FD** (deploys all the money instantly)                             |
| Monthly surplus you want to save without risk | **RD** (forced saving discipline)                                    |
| Short-term goal (6 months – 3 years)          | **FD or RD** (capital protection wins)                               |
| Long-term goal (5+ years)                     | **SIP in equity / hybrid funds** (much higher expected return)       |
| Emergency fund                                | **FD with sweep-in or auto-renew** (instant liquidity)               |
| Senior citizen wanting regular income         | **Senior FD + SCSS + POMIS** (higher rate, quarterly/monthly payout) |

## Indian FD landscape (mid-2025)

| Tenure            | Typical bank rate | Sweet spot             |
| ----------------- | ----------------- | ---------------------- |
| 7 days – 6 months | 3–5%              | Don't bother           |
| 6 months – 1 year | 5–6.5%            | Short-term parking     |
| 1–2 years         | 6.5–7%            | Liquidity + return     |
| 3–5 years         | 7–7.5%            | **Best risk-adjusted** |
| 5–10 years        | 6.5–7%            | Long-term lock         |

Senior citizens get **0.25–0.5% extra** on most bank FDs. Senior-specific schemes (SCSS, POMIS) pay 7.4%–8.2% — even better.

## Components and inputs explained

### Principal (FD) or monthly deposit (RD)

The amount you're committing. FD has a single deposit; RD has monthly installments.

### Interest rate

The annual rate quoted by your bank. Get it from the FD/RD certificate or your bank's website — rates change frequently.

### Tenure

How long you'll hold the deposit. FDs: 7 days to 10 years (longer for senior schemes). RDs: 6 months to 10 years.

### Compounding frequency

Most Indian banks: quarterly. Some corporate FDs: monthly. NRE/NRO FDs: usually annual. Check the certificate.

## Tax implications

FD and RD interest is **fully taxable at your slab rate** in the year it's accrued (not received). For most middle-income earners in the 20–30% slab, this drags effective post-tax return below 5%:

| Headline rate | Slab | Post-tax rate |
| ------------- | ---- | ------------- |
| 7.0%          | 5%   | 6.6%          |
| 7.0%          | 20%  | 5.6%          |
| 7.0%          | 30%  | 4.9%          |

In the 30% slab, FD returns barely beat inflation. That's why high earners prefer debt funds (only taxed on redemption, indexation removed but still slightly better than FD for tax timing).

**TDS rules**:

- Banks deduct 10% TDS on FD interest if total bank interest > **₹40,000/year** (₹50,000 for senior citizens)
- Submit Form 15G (non-senior, income below taxable) or 15H (senior) to avoid TDS if eligible
- TDS is claimable as tax credit in your ITR

**Section 80TTB** (senior citizens only): ₹50,000 deduction on bank interest. Section 80TTA (non-senior): ₹10,000 deduction but on savings interest, not FD.

## Tax-saver 5-year FD

Under Section 80C, you can claim deduction up to ₹1.5 L for a **5-year tax-saver FD**:

- Lock-in: 5 years (cannot be broken)
- Interest is still taxable (only the principal deduction is 80C-eligible)
- Premature withdrawal not allowed
- Loan against FD not allowed (regular FDs do allow it)

Tax-saver FDs are a poor 80C choice for most people — ELSS gives 12% expected return with 3-year lock-in vs FD's 7% with 5-year lock-in. Use tax-saver FD only if you're very risk-averse.

## Considerations

- **Diversify across banks if FD > ₹5 lakh per bank.** DICGC insurance caps at ₹5 L per depositor per bank.
- **Premature withdrawal penalty**: 0.5–1% deducted from applicable rate. Sometimes the bank pays only the rate for the _actual held period_, not the contracted tenure.
- **Auto-renewal**: most banks auto-renew at the prevailing rate. Watch for rate drops; you may want to switch banks.
- **Senior citizen schemes (SCSS, POMIS)** beat regular FDs for the 60+ cohort. Use the [SCSS](/calculator/scss) and [POMIS](/calculator/pomis) calculators.
- **NRE FDs are tax-free** for NRIs — the rate also tends to be higher than NRO.
- **Don't break an FD just because rates went up.** Compute: (new rate × remaining tenure) − (premature withdrawal penalty) − (old rate × remaining tenure). Often the math doesn't justify breaking.

## Limitations

- The calculator assumes constant rate over tenure. Real cumulative FDs lock in at booking; floating-rate FDs (rare in India) would shift.
- It doesn't model TDS deduction (interest accrued is shown gross; TDS is deducted quarterly and refunded in ITR).
- It doesn't model premature withdrawal penalties.
- It assumes quarterly compounding for FDs. Some corporate FDs use monthly — adjust the compounding parameter.
- RD math assumes installments on the 1st of each month. Banks vary; small differences in actual maturity.

## Related calculators

- **[PPF Calculator](/calculator/ppf)** — tax-free alternative for 15-yr lock
- **[NPS](/calculator/nps)** — long-term market-linked retirement
- **[SCSS](/calculator/scss)** — for senior citizens
- **[POMIS](/calculator/pomis)** — post office monthly income
- **[Simple Interest](/calculator/simple-interest)** — for non-compounding cases
- **[Compound Interest](/calculator/compound-interest)** — generalized
- **[Tax-saver FD vs ELSS](/calculator/elss)** — for 80C comparison

---

**Final note.** FDs and RDs are the most-used, least-optimized investment in Indian households. The default assumption that they're "safe and good" hides the fact that **30% slab tax + 6% inflation makes most FDs lose purchasing power over 10 years.** Use FD/RD for short-term goals (< 3 years) and emergency funds. For long-term wealth, equity SIPs and PPF/NPS combinations beat FDs handily. This calculator gives you the honest number — and the honest number is the _pre-tax_ one; subtract your slab rate to see what you actually keep.
