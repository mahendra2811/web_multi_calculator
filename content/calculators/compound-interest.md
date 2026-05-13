## What is compound interest?

**Compound interest** is interest that earns interest. Each compounding period, the interest you earned is added to the principal — so the next period's interest is computed on a slightly larger base. Over decades, this snowball effect turns small consistent contributions into wealth.

Albert Einstein supposedly called it the eighth wonder of the world. He probably didn't actually say that, but the underlying point is correct: **compounding is the only financial concept that does most of its work after you've stopped paying attention.**

## How is compound interest calculated?

The standard formula:

```
A = P × (1 + r/n)^(n×t)
```

where:

- `A` = final amount
- `P` = principal (initial deposit)
- `r` = annual interest rate (as a decimal, so 8% = 0.08)
- `n` = compounding periods per year (1 = annual, 4 = quarterly, 12 = monthly, 365 = daily)
- `t` = time in years

The interest earned alone is `A − P`. For continuous compounding (the asymptotic limit as `n → ∞`):

```
A = P × e^(r × t)
```

where `e ≈ 2.71828` (Euler's number). Continuous compounding is theoretical — no real bank uses it — but it's a useful upper bound.

## Worked example

**₹1,00,000 at 10% annual rate for 10 years**, at different compounding frequencies:

| Compounding   | Periods/year (n) | Final amount A |
| ------------- | ---------------- | -------------- |
| Annually      | 1                | ₹2,59,374      |
| Semi-annually | 2                | ₹2,65,330      |
| Quarterly     | 4                | ₹2,68,506      |
| Monthly       | 12               | ₹2,70,704      |
| Daily         | 365              | ₹2,71,791      |
| Continuously  | ∞                | ₹2,71,828      |

Same rate, same period, but daily compounding gives you **₹12,000 more** than annual compounding. _Frequency matters; it just hits diminishing returns past monthly._

## The Rule of 72

A useful mental shortcut: divide **72 by the annual rate** to estimate how long it takes money to double.

| Annual rate        | Years to double |
| ------------------ | --------------- |
| 4%                 | 18 years        |
| 6%                 | 12 years        |
| 8%                 | 9 years         |
| 10%                | 7.2 years       |
| 12%                | 6 years         |
| 18%                | 4 years         |
| 36% (credit card!) | 2 years         |

The math isn't exact (it's a Taylor-series approximation), but it's accurate within a few months for rates between 6% and 12%. Use it whenever you don't have a calculator handy.

## Compound vs simple interest

**Simple interest** earns interest only on the principal:

```
SI total = P × (1 + r × t)
```

For short tenures (< 1 year), the difference is negligible. For 5+ years, it's dramatic:

| Tenure   | Simple (10%) | Compound annual (10%) |
| -------- | ------------ | --------------------- |
| 1 year   | ₹1,10,000    | ₹1,10,000             |
| 5 years  | ₹1,50,000    | ₹1,61,051             |
| 10 years | ₹2,00,000    | ₹2,59,374             |
| 20 years | ₹3,00,000    | ₹6,72,750             |
| 30 years | ₹4,00,000    | ₹17,44,940            |

At 30 years, compound interest produces **4× the result** of simple interest at the same rate. _Always prefer compound._

## Components and inputs explained

### Principal

What you start with — a one-time deposit. For monthly-contribution SIP-style problems, use the [SIP Calculator](/calculator/sip) instead.

### Rate

Annual percentage rate. Note: nominal vs effective rate matters when compounding is more frequent than annual. CalcMaster uses the **nominal annual rate** as input (the same way banks quote FD rates).

### Compounding frequency

How often interest is calculated and added to principal:

| Frequency     | n   | Typical use                                   |
| ------------- | --- | --------------------------------------------- |
| Annually      | 1   | PPF, NPS, some retail bonds                   |
| Semi-annually | 2   | Most Indian bonds                             |
| Quarterly     | 4   | Indian bank FDs, SCSS                         |
| Monthly       | 12  | Some savings accounts                         |
| Daily         | 365 | Credit card debt; high-yield savings accounts |

When unsure, ask your bank — and verify on the certificate.

## How it shows up in real life

| Product                          | Direction   | Comment                                                                                      |
| -------------------------------- | ----------- | -------------------------------------------------------------------------------------------- |
| **SIPs and equity mutual funds** | For you     | Long-term compounding magic                                                                  |
| **Lumpsum mutual funds**         | For you     | Same math, different cadence                                                                 |
| **FDs, RDs, PPF, EPF**           | For you     | Lower rate, but tax-favoured                                                                 |
| **Credit card debt**             | Against you | 36–42% APR compounded daily — destroys finances                                              |
| **EMIs / home loans**            | Against you | Compound math in the bank's favor (you're paying interest on the unpaid balance every month) |
| **Inflation**                    | Against you | Compounds annually too. 6% inflation halves purchasing power in ~12 years.                   |

## Considerations

- **Time > rate > principal**. Doubling your time matters more than doubling your rate, which matters more than doubling your principal. Start early; that's the lever you can never recover.
- **Don't withdraw to "lock in gains".** Each withdrawal pauses compounding. Take only what you need at the end.
- **Tax-favoured products amplify compounding.** ₹1 L in PPF at 7.1% tax-free is closer to ₹1 L at 10% taxable for a 30% slab investor.
- **Beware compound rates on debt.** Credit card balances at 36% APR double in 2 years. Pay them off ahead of any investment.

## Limitations

- Real returns aren't smooth. Equity averages 12% but ranges from −30% to +50% in single years.
- Doesn't model partial withdrawals, additional contributions (use SIP for that), or rate changes.
- Inflation isn't subtracted. The output is nominal; for real purchasing power, subtract ~6% inflation per year mentally.
- Tax isn't modelled — equity LTCG at 12.5%, debt at slab rate.

## Related calculators

- **[SIP Calculator](/calculator/sip)** — periodic contributions instead of lumpsum
- **[Lumpsum Calculator](/calculator/lumpsum)** — same math, mutual-fund-specific UX
- **[CAGR](/calculator/cagr)** — reverse-engineer the rate from start/end values
- **[Future Value](/calculator/future-value)** — generic compounding
- **[Simple Interest](/calculator/simple-interest)** — the alternative; almost always worse
- **[FD / RD](/calculator/fd-rd)** — Indian bank deposits with quarterly compounding

---

**Final note.** Compound interest is the only "trick" in personal finance that the rich people use and the poor people don't realize they're paying for. **Start earlier than you feel ready, in instruments that compound at a meaningful rate, and don't touch them.** Every other lever — picking funds, timing the market, tax optimization — is rounding error against the compounding curve.
