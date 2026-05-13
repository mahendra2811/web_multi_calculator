---
title: "Percentage calculator: the four operations you keep mixing up"
excerpt: "% of, % change, add %, subtract % — all four modes, the formulas behind them, and the moments each one actually applies."
kind: calculator
category: math
calculatorSlug: percentage-calculator
tags: [percentage, math, basics]
publishedAt: "2026-05-13"
---

Percentages are the simplest math everyone gets wrong under pressure. Here are the four common operations, what they mean, and when to use each.

> [Open the Percentage Calculator](/calculator/percentage-calculator) and pick the mode.

## 1. "X% of Y"

`result = X / 100 × Y`

15% of 2,400 = **360**.

This is the textbook one. Use for tip calculation, "what's 20% of my salary as savings", commission cuts.

## 2. "X is what % of Y"

`result = (X / Y) × 100`

300 is what % of 2,400? = **12.5%**.

Use for: "I spent ₹3,000 on groceries this month, what's that as a % of my income?" Or "Sales of product A were ₹X, total revenue was ₹Y — what's A's share?"

## 3. "Percentage change from A to B"

`result = ((B − A) / A) × 100`

From 80 → 96 = **+20%**.
From 100 → 75 = **−25%**.

Use for: portfolio returns, sales growth quarter over quarter, weight change, price hikes.

The trap: percentage _up_ and percentage _down_ aren't symmetric. Going 100 → 150 is +50%; going back 150 → 100 is −33% (not −50%).

## 4. "Add X% to Y" / "Subtract X% from Y"

`add = Y × (1 + X/100)`  
`subtract = Y × (1 − X/100)`

Add 12% GST to ₹500 = **₹560**.
Subtract 25% discount from ₹2,000 = **₹1,500**.

For repeated operations, _multiply_ the factors. Adding 18% then subtracting 18% does **not** return you to the start:

`100 × 1.18 × 0.82 = 96.76`

(You end up 3.24% below the start.) Same logic for stacked discounts — covered in detail in the [discount calculator post](/blog/discount-calculator).

## The percentage trap most people fall into

> "Sales fell 50% this year, then rose 50% next year — back to where we started!"

**No.** Started at 100. Fell 50% → 50. Rose 50% on the new base → 75. Still 25% below the original.

To get back to 100 from 50, you need a +100% rise. The percentage that gets you back from a fall of `x%` is `x / (1 − x/100)%`. Down 20% needs +25% recovery. Down 50% needs +100%. Down 80% needs +400%.

This is why losses are mathematically asymmetric with gains, and why "don't lose money" is rule #1 of investing.

## Run yours

Open the [Percentage Calculator](/calculator/percentage-calculator). Pick mode. Get answer. Move on with your life.
