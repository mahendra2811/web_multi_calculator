---
title: "Goal-based SIP — reverse-engineer the number from the dream"
excerpt: "Don't pick an arbitrary monthly amount. Work backwards from the goal — house down-payment, kid's college, retirement corpus — and let the math tell you the SIP."
kind: deep-dive
category: finance
calculatorSlug: sip
tags: [sip, goals, financial-planning]
publishedAt: "2026-05-14"
---

Most people start a SIP with the question "_how much can I afford?_" and pick a round number — ₹5k, ₹10k. That's how SIPs get under-funded relative to actual needs.

The better question is: "_how much do I need, by when?_" — and let the formula solve for monthly contribution.

## The reverse-engineering formula

Starting from the SIP future-value formula:

`FV = P × [((1 + r)^n − 1) / r] × (1 + r)`

Solve for `P` (monthly contribution):

`P = FV / ([((1 + r)^n − 1) / r] × (1 + r))`

CalcMaster will ship this as a "goal calculator" mode soon. For now, you can iterate the [SIP calculator](/calculator/sip) until the future value matches your target.

## Four common goals and their reverse-engineered SIPs

Assumptions: 12% expected return.

### 1. Down-payment on a house — ₹30 lakh in 7 years

`P ≈ ₹22,500/month`

If that feels too high, the right move is to **lower the target** (₹20L house), **stretch the timeline** (10 years instead of 7), or **lower the expectation** (debt funds at 8% — needs ₹26k/month to hit the same number).

### 2. Kid's college (overseas) — ₹1 crore in 18 years

`P ≈ ₹14,000/month`

The longer horizon makes the monthly far more manageable. Note: ₹1 crore in 18 years at 6% inflation is worth ~₹35 lakh in today's money, so check whether that's actually enough.

### 3. Retirement corpus — ₹5 crore in 30 years

`P ≈ ₹16,000/month`

The 30-year horizon is the friend here. Same target at 20 years would need ~₹50k/month — a 3x jump for a 33% time reduction. **Time is the cheapest input** in this formula.

### 4. Emergency fund — ₹6 lakh in 2 years (safe instrument, 7% return)

`P ≈ ₹23,500/month`

Short-horizon goals **don't benefit from equity** (too volatile), so use debt funds / FD recurring deposit. The lower return means a higher monthly contribution. There's no shortcut.

## Inflation-adjust your goals

Most people set goals in _today's rupees_ and then evaluate them in _future rupees_. That's how a "₹1 crore" retirement plan ends up insufficient.

Rule of thumb: at 6% inflation, **money halves in real value every ~12 years**.

So ₹1 cr in 24 years ≈ ₹25 L today. ₹1 cr in 36 years ≈ ₹12 L today. Translate your target.

A more honest version: set the goal in **today's purchasing power** (e.g., "I want a corpus that supports my current ₹80k/month lifestyle"), then inflate by 6%/year for the time horizon to get the future-rupee target, then run the SIP reverse-math.

## The bucket strategy

Don't run one giant SIP for one giant goal. Split into buckets:

| Bucket           | Horizon    | Asset class | Annual return |
| ---------------- | ---------- | ----------- | ------------- |
| Emergency fund   | 0–6 months | Liquid fund | 6–7%          |
| Short-term goals | 1–3 years  | Debt fund   | 7–8%          |
| Medium-term      | 3–7 years  | Hybrid fund | 9–11%         |
| Long-term        | 7+ years   | Equity fund | 11–14%        |

Each bucket has its own SIP. The retirement bucket dominates in time but other buckets stop you from raiding equity when life happens.

## Set up the goal, not just the SIP

The most common SIP failure mode isn't market loss — it's **goal drift**. Setting up a SIP with no explicit goal makes it easy to redeem early ("I'll just take this out for a vacation"). Naming it — "Maya's college", "Goa house", "FY2055 retirement" — makes it psychologically sticky.

Many fund apps now let you tag SIPs with goal names. Use the feature.
