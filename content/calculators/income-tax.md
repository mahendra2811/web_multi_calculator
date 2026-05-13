## What is Income Tax?

**Income tax** is the slice of your annual earnings that goes to the Government of India. It funds defence, infrastructure, healthcare, education, and everything else the state runs. Every working adult earning above the basic exemption pays it; the rate increases progressively as your income grows.

Since FY 2020-21, India has had **two parallel tax regimes** — and choosing the right one for your specific deductions can swing your tax bill by ₹50,000 to ₹2 lakh per year. This calculator computes both and tells you which wins.

## How is Income Tax calculated?

The general flow:

```
1. Start with Gross Annual Income
2. Subtract Standard Deduction (₹75,000 in new regime, ₹50,000 in old)
3. Subtract eligible deductions (80C, 80D, HRA, home-loan interest, etc — old regime only)
4. Apply slab rates to compute base tax
5. Apply Section 87A rebate if eligible (income ≤ ₹7L new / ₹5L old → tax = 0)
6. Add 4% Health & Education Cess on the tax
7. Add surcharge if income > ₹50L
8. The result is your final tax liability for the year
```

CalcMaster does all this for both regimes and shows you both numbers side by side.

## Slabs for FY 2024-25 (AY 2025-26)

### New regime (default for new taxpayers)

| Annual income           | Tax rate |
| ----------------------- | -------- |
| Up to ₹3,00,000         | Nil      |
| ₹3,00,001 – ₹7,00,000   | 5%       |
| ₹7,00,001 – ₹10,00,000  | 10%      |
| ₹10,00,001 – ₹12,00,000 | 15%      |
| ₹12,00,001 – ₹15,00,000 | 20%      |
| Above ₹15,00,000        | 30%      |

Standard deduction: ₹75,000. Rebate u/s 87A: full tax waived if taxable income ≤ ₹7,00,000.

### Old regime

| Annual income          | Tax rate |
| ---------------------- | -------- |
| Up to ₹2,50,000        | Nil      |
| ₹2,50,001 – ₹5,00,000  | 5%       |
| ₹5,00,001 – ₹10,00,000 | 20%      |
| Above ₹10,00,000       | 30%      |

Standard deduction: ₹50,000. Rebate u/s 87A: full tax waived if taxable income ≤ ₹5,00,000. Various 80C / 80D / HRA / home loan deductions also apply.

Both regimes add **4% Health & Education Cess** on top of the computed tax.

## Worked example

Software engineer in Mumbai, **₹18 lakh annual CTC**, eligible deductions:

| Deduction                | Amount                        |
| ------------------------ | ----------------------------- |
| 80C (PPF + ELSS + EPF)   | ₹1,50,000                     |
| 80D (health insurance)   | ₹25,000                       |
| HRA exemption            | ₹1,20,000                     |
| Home loan interest (24b) | ₹2,00,000                     |
| Standard deduction       | ₹50,000 (old) / ₹75,000 (new) |

**Old regime calculation:**

```
Taxable income = 18,00,000 − 50,000 − 1,50,000 − 25,000 − 1,20,000 − 2,00,000
                = 12,55,000

Tax = 0 (first 2.5L) + 12,500 (5% of 2.5–5L) + 1,00,000 (20% of 5–10L)
    + 76,500 (30% of 10–12.55L)
    = 1,89,000

+ 4% cess = 1,89,000 × 1.04 = ₹1,96,560
```

**New regime calculation:**

```
Taxable income = 18,00,000 − 75,000 = 17,25,000

Tax = 0 (first 3L) + 20,000 (5% of 3–7L) + 30,000 (10% of 7–10L)
    + 30,000 (15% of 10–12L) + 60,000 (20% of 12–15L) + 67,500 (30% of 15–17.25L)
    = 2,07,500

+ 4% cess = 2,07,500 × 1.04 = ₹2,15,800
```

**Verdict**: Old regime saves you ₹19,240 in this scenario. Even though new regime has lower rates and bigger standard deduction, the ₹4.95L of additional deductions in old regime tips the balance.

_The break-even point is around ₹3.5–4 lakh of combined deductions. Below that, new regime wins; above, old wins. **Always run both numbers — don't assume.**_

## Components and inputs explained

### Gross income

Your total annual taxable income — salary, business income, rental, capital gains, interest, dividends. Use Form 16's "Income from Salary" line if you're a salaried employee.

### 80C deductions (old regime only, max ₹1.5 lakh)

PPF, ELSS, EPF, NPS Tier-1, life insurance premium, ULIP, home loan principal, child's tuition, NSC, KVP, SSY. Combined cap of ₹1.5 lakh.

### 80D deductions (old regime only)

Health insurance premium. Self + family ₹25,000 (₹50,000 if senior); parents additional ₹25,000 (₹50,000 if senior). Max ₹1 lakh.

### HRA exemption (old regime, salaried with rent)

Minimum of: actual HRA received, 50% of basic (metro) / 40% (non-metro), rent paid minus 10% of basic. Use the [HRA Calculator](/calculator/hra) for the exact number.

### Home loan interest (Section 24b, old regime)

Up to ₹2 lakh/year for self-occupied home. Uncapped for let-out property (offset against rental income).

### Other deductions (old regime)

NPS additional ₹50K under 80CCD(1B); donations under 80G; education loan interest under 80E; savings interest under 80TTA/80TTB; disability under 80U; medical insurance for parents.

## Surcharge for higher incomes

| Income        | Surcharge (old) | Surcharge (new, capped) |
| ------------- | --------------- | ----------------------- |
| ₹50 L – ₹1 cr | 10%             | 10%                     |
| ₹1 cr – ₹2 cr | 15%             | 15%                     |
| ₹2 cr – ₹5 cr | 25%             | 25%                     |
| > ₹5 cr       | 37%             | 25% (Budget 2023 cap)   |

Marginal relief applies near the cut-offs to prevent unfair jumps. CalcMaster currently doesn't compute surcharge for income > ₹50L — talk to a CA for high-income returns.

## Considerations

- **Choose your regime each year.** You can switch every assessment year as a salaried employee. Business / professional income lets you switch once.
- **The new regime is the default.** If you don't explicitly opt for old, new applies automatically.
- **The break-even on deductions** is roughly ₹3.5–4 lakh combined. Below that, new wins on most slabs.
- **Surcharge changes the math** above ₹50 L — for very high incomes, both regimes converge.
- **Capital gains are taxed separately** at fixed rates regardless of regime (LTCG equity 12.5%, debt slab rate, property 20%-with-indexation).

## Filing and deadlines

| Event                    | Deadline                                                |
| ------------------------ | ------------------------------------------------------- |
| Advance tax instalments  | 15 Jun (15%), 15 Sep (45%), 15 Dec (75%), 15 Mar (100%) |
| ITR filing — non-audit   | 31 July                                                 |
| ITR filing — audit cases | 30 September                                            |
| Revised return           | 31 December of AY                                       |

Use the [Advance Tax calculator](/calculator/advance-tax) to compute quarterly payments.

## Limitations

- Doesn't compute surcharge above ₹50 L.
- Doesn't model salary structure optimization (food coupons, NPS employer contribution, professional tax).
- Doesn't handle capital gains tax separately (use the [LTCG](/calculator/ltcg-equity), [STCG](/calculator/stcg-equity), and [Property Gains](/calculator/property-gains) calculators).
- Treats foreign income simplistically — DTAA scenarios need a CA.
- Doesn't apply marginal relief at surcharge break-points.

## Related calculators

- **[Regime Compare](/calculator/regime-compare)** — fast side-by-side
- **[HRA Calculator](/calculator/hra)** — exempt vs taxable HRA
- **[Advance Tax](/calculator/advance-tax)** — quarterly instalments
- **[TDS Calculator](/calculator/tds)** — per-payment deduction
- **[Section 80C](/calculator/section-80c)** — tax-saver investment summary
- **[Form 16 Take-Home](/calculator/form-16)** — annual + monthly net pay
- **[Salary Calculator](/calculator/salary)** — CTC to in-hand

---

**Final note.** Income tax planning has two compounding errors: people underestimate the math (the old-vs-new gap is real money), and they overestimate the timing (planning in February doesn't beat planning in April). **Run both regimes in April, set up your 80C SIPs in May, and forget about tax until next April.** This calculator is the first input to that habit.
