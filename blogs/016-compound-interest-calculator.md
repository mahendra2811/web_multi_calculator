---
title: "Compound interest calculator: the formula that runs the world"
excerpt: "The math behind the eighth wonder of the world — how compounding works, why frequency matters, and the rule of 72 that estimates everything in your head."
kind: calculator
category: finance
calculatorSlug: compound-interest
tags: [compound-interest, investing, returns]
publishedAt: "2026-05-13"
---

> "Compound interest is the eighth wonder of the world. He who understands it, earns it; he who doesn't, pays it." — _(attributed, probably wrongly, to Einstein)_

Whether or not Einstein said it, the underlying point is correct. Almost every financial decision — savings, loans, investments, retirement — is governed by the compound-interest formula in some form. Here's how it works.

> [Open the Compound Interest Calculator](/calculator/compound-interest) and run your scenarios.

## The formula

`A = P × (1 + r/n)^(n×t)`

where:

- `A` = final amount
- `P` = principal (initial investment)
- `r` = annual interest rate (decimal — 12% = 0.12)
- `n` = compounding periods per year
- `t` = time in years

## Compounding frequency moves the needle

₹1,00,000 at 10% for 10 years:

| Compounding          | Final amount |
| -------------------- | ------------ |
| Annually (n=1)       | ₹2,59,374    |
| Semi-annually (n=2)  | ₹2,65,330    |
| Quarterly (n=4)      | ₹2,68,506    |
| Monthly (n=12)       | ₹2,70,704    |
| Daily (n=365)        | ₹2,71,791    |
| Continuously (limit) | ₹2,71,828    |

The jump from annual → quarterly is meaningful (~₹9k extra). The jump from monthly → daily is tiny (~₹1k). Beyond daily, you've hit the asymptotic limit of `e^(r×t)` — the famous mathematical constant e shows up here naturally.

## The Rule of 72

To estimate how long money takes to double at a given rate, divide 72 by the rate:

| Rate | Doubles in |
| ---- | ---------- |
| 4%   | 18 years   |
| 6%   | 12 years   |
| 8%   | 9 years    |
| 12%  | 6 years    |
| 18%  | 4 years    |

Useful for mental math on car loans (12% double in 6 years means your interest alone could equal the car price if the loan stretched that long), credit cards (36% double in 2 years — that's why credit-card debt destroys finances), and equity returns.

## What separates simple from compound interest

**Simple interest** earns interest only on the principal:

`A = P × (1 + r × t)`

₹100,000 at 10% simple for 10 years = ₹200,000. Compound version = ₹259,374. The gap (~₹60k) is the compounding magic — interest earning interest.

For very short periods (a few months), the difference is negligible. For 10+ years, it's transformative.

## Where compounding lives in your life

- **For you**: SIPs, lumpsums, FDs, PPF, NPS, savings accounts (yes, even savings).
- **Against you**: credit cards, EMIs (the math is the same compound formula, just paid to the bank).

The most important investment habit is _consistency_ with _time_, because the compound formula multiplies them. CalcMaster's [SIP calculator](/calculator/sip) is essentially this formula iterated for monthly contributions.

## Run yours

Open the [Compound Interest Calculator](/calculator/compound-interest). Try moving just the time slider while keeping rate constant — see what 10 years vs 30 years does to the same monthly contribution. That's the lesson.
