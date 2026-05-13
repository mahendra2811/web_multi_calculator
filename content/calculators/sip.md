## What is a SIP?

A **Systematic Investment Plan** is the most boring way to build serious wealth, which is also why it works. You commit a fixed amount each month — usually ₹1,000 to ₹50,000 — and the fund house auto-debits it on a fixed date. Three things happen automatically: your money buys more units when prices are low, you stop trying to time the market, and compounding does its thing in the background while you live your life.

If you've ever wondered "what would I have today if I'd put ₹10,000/month into a Nifty index fund for the last 15 years?", the SIP calculator is your answer. _Spoiler: it's a number that will make you slightly emotional._

## How is SIP return calculated?

The standard annuity-due formula:

```
FV = P × [((1 + i)^N − 1) / i] × (1 + i)
```

where:

- `P` = monthly investment (₹)
- `i` = monthly rate = (annual return % / 12 / 100)
- `N` = total number of months = years × 12
- `FV` = future value at the end of the tenure

CalcMaster iterates this month-by-month so the output matches your fund-house statement to within a rupee. It also generates a year-by-year schedule so you can see the curve, not just the endpoint.

## Worked example

You invest **₹10,000/month for 20 years** at an assumed annual return of **12%**.

| Step                               | Value           |
| ---------------------------------- | --------------- |
| Monthly investment                 | ₹10,000         |
| Monthly rate `i`                   | 0.01 (12% / 12) |
| Number of months `N`               | 240             |
| Total invested                     | ₹24,00,000      |
| `(1 + i)^N`                        | 10.8926         |
| Annuity factor `((1+i)^N − 1) / i` | 989.26          |
| Future value (× monthly × (1+i))   | ₹99.9 lakh      |

You put in **₹24 lakh** over 20 years. The market gives you back **₹76 lakh** in gains. Total corpus: **~₹1 crore**.

_Three-quarters of the final amount is gain, not your contribution. That's the entire point of long-horizon SIP._

## Components and inputs explained

### Monthly investment

The amount you commit per month. Most fund houses allow ₹100 minimum, ₹50 lakh maximum. Pick an amount you can sustain through good years and bad — quitting during a market crash undoes years of compounding.

### Expected annual return

Indian equity mutual funds have averaged **11–14%** over rolling 15-year windows historically. We default to 12% as a reasonable middle estimate. For projection purposes:

- Conservative: 10%
- Realistic: 12%
- Optimistic: 14%

Hybrid funds: 9–11%. Pure debt funds: 7–8%. Don't use equity returns to project debt SIPs.

### Tenure

How long you'll stay invested. The compounding magic kicks in after ~10 years; before that, gains are mostly proportional to contributions. SIPs of 5 years or less are technically allowed but don't capture the asset class's full edge.

## Common variants

| Variant                            | What changes                                               | When to use                                                         |
| ---------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------- |
| **Flat SIP**                       | Same amount every month, no change                         | Default. You set it and forget it.                                  |
| **Step-up SIP**                    | Amount auto-increases by X% each year (e.g. 10%)           | When your income grows. Roughly doubles the 25-year corpus vs flat. |
| **Top-up SIP**                     | One-off lump additions on bonus months                     | When you get an annual bonus and want it invested immediately.      |
| **STP** (Systematic Transfer Plan) | Lumpsum parked in debt fund, transferred monthly to equity | When you have a windfall but want SIP-style rupee-cost averaging.   |

For the step-up version, use the dedicated [Step-up SIP calculator](/calculator/step-up-sip) which models annual hikes accurately.

## Considerations

- **Inflation eats half your nominal return.** A 12% nominal return at 6% inflation is a ~6% real return. ₹1 crore in 25 years is roughly ₹23 lakh of today's purchasing power. Plan in real terms; budget conservatively.
- **Don't quit during corrections.** SIPs are _designed_ to buy more units when prices fall. The 2020 COVID crash was the best time in a decade to keep SIPing.
- **Pick growth, not dividend (IDCW).** Dividend option distributes gains as taxable income; growth lets the corpus compound.
- **Choose direct plans, not regular.** Saves you 0.5–1% in expense ratio per year — which is **₹30 lakh+ over 25 years** on a ₹10k/month SIP.

## Tax implications (India, FY 2024-25)

- **Equity SIPs** held >12 months: LTCG at **12.5%** above a **₹1.25 lakh** annual exemption per FY. Harvest this exemption every March.
- **Equity SIPs** held <12 months: STCG at **20%** flat (raised in Budget 2024).
- **Debt SIPs**: gains taxed at your **slab rate** regardless of holding period (post-April 2023 rule change). Indexation benefit removed.
- **ELSS SIPs**: deduction up to ₹1.5 lakh under Section 80C, 3-year lock-in per installment.

## Limitations

- The calculator assumes a smooth annualized return. Real returns are bumpy — single years can be −25% to +50%.
- It doesn't model fund expense ratios. Subtract ~0.5% (direct) to ~1.5% (regular) from your expected return for a more honest projection.
- It doesn't model tax. Outputs are pre-tax. Subtract 5–12% from the corpus for a post-tax estimate, depending on your harvesting discipline.
- It doesn't model fund changes mid-stream. If you switch funds, your XIRR is closer to the answer than the simple SIP formula. Use the [XIRR calculator](/calculator/xirr) instead.

## Related calculators

- **[Lumpsum Calculator](/calculator/lumpsum)** — for one-time investments instead of monthly contributions
- **[Compound Interest](/calculator/compound-interest)** — the math behind SIP, generalized
- **[CAGR Calculator](/calculator/cagr)** — to reverse-engineer the return you actually earned
- **[Step-up SIP](/calculator/step-up-sip)** — model annual increases
- **[Retirement Planner](/calculator/retirement)** — figure out what monthly SIP you need for a target corpus
- **[ELSS Calculator](/calculator/elss)** — tax-saving variant with 80C deduction

---

**Final note.** SIPs are simple, slow, and emotionally boring. They're also the highest-yielding habit available to the average Indian salaried investor with a 15+ year horizon. The single most underrated finance move you can make is to **set up the SIP, set up the annual step-up, and not touch the app for 25 years.** This calculator just tells you what your future self will thank you for.
