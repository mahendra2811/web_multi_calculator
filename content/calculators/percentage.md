## What is a percentage?

A **percentage** is a way of expressing a number as a fraction of 100. "25%" literally means "25 out of 100". It's one of the most-used pieces of math in everyday life — discounts, taxes, exam scores, growth rates, tips, EMI breakups, return on investment, weight loss progress.

Percentage looks simple but trips most people up under pressure. This calculator handles the **five common percentage operations** so you don't have to remember which formula goes where.

## How are percentages calculated?

The five operations and their formulas:

### 1. "X% of Y"

```
result = (X / 100) × Y
```

Example: 15% of 2,400 = 360. _Used for tax, tip, commission._

### 2. "X is what % of Y"

```
result = (X / Y) × 100
```

Example: 300 is what % of 2,400 = 12.5%. _Used for "what's my share / contribution / weight of this item"._

### 3. "Percentage change from A to B"

```
result = ((B − A) / A) × 100
```

Example: from 80 to 96 = +20%. _Used for growth rates, returns, weight changes._

### 4. "Add X% to Y"

```
result = Y × (1 + X / 100)
```

Example: ₹500 + 12% GST = ₹560. _Used for markups, taxes, premiums._

### 5. "Subtract X% from Y"

```
result = Y × (1 − X / 100)
```

Example: ₹2,000 with 25% discount = ₹1,500. _Used for discounts, depreciation, decrements._

## Worked example: stacked discount

A "70% off + extra 20% off" deal on a ₹2,000 jacket:

```
Sticker math (wrong):    70% + 20% = 90% off  → ₹200
Actual math:             1 − (1 − 0.70) × (1 − 0.20) = 1 − 0.30 × 0.80 = 0.76
                         → 76% off → ₹480
```

That extra 20% applies to the _already-discounted_ price, not the original. _Retailers know stacking math is opaque to most shoppers — which is exactly why they stack._

For multi-stage discounts: multiply `(1 − each discount fraction)`, then subtract from 1.

| Stacked %    | Wrong intuition | Actual effective % |
| ------------ | --------------- | ------------------ |
| 70 + 20      | 90%             | 76%                |
| 50 + 50      | 100%            | 75%                |
| 30 + 30 + 10 | 70%             | 56%                |
| 80 + 80      | 160% (?!)       | 96%                |

If you stack two 50% discounts, the second 50% only saves you another 25 percentage points — not 50.

## Components and inputs explained

### Mode

Pick one of the five operations above. The mode determines what "X" and "Y" mean.

### X and Y

Two numbers. For percentage operations they have specific roles depending on mode — labels in the calculator update to match.

## The asymmetry trap

People intuit percentages as if up and down are symmetric. They're not.

| Move                | Going back to start needs |
| ------------------- | ------------------------- |
| Up 10% (100 → 110)  | Down 9.1%                 |
| Up 50% (100 → 150)  | Down 33.3%                |
| Up 100% (100 → 200) | Down 50%                  |
| Down 50% (100 → 50) | **Up 100%**               |
| Down 80% (100 → 20) | **Up 400%**               |

This is why **stock market losses hurt more than equal-magnitude gains help**. A portfolio that drops 30% needs to rise 43% just to break even. It's also why "losing 50% twice" doesn't equal "losing 100%" — first 50% loss leaves 50, second leaves 25 (a 75% total loss, not 100).

_The math of "down X%" is `÷ (1 − X/100)` — never `× (1 + X/100)`._

## Common real-world uses

| Situation               | Operation             | Why                                                                    |
| ----------------------- | --------------------- | ---------------------------------------------------------------------- |
| GST on bill             | Add X% to Y           | Inclusive vs exclusive matters — see [GST calculator](/calculator/gst) |
| Discount on MRP         | Subtract X% from Y    | Stacked discounts are not additive                                     |
| Tip on restaurant bill  | X% of Y               | Use 10% in India, 18-20% in US                                         |
| Salary hike             | Percentage change A→B | Old vs new gross                                                       |
| Exam marks              | X is what % of Y      | Scored / total × 100                                                   |
| Mortgage interest share | X is what % of Y      | Interest paid / total payment × 100                                    |
| Stock return            | Percentage change A→B | (Sell − Buy) / Buy × 100                                               |
| Body weight loss        | Percentage change A→B | (Current − Start) / Start × 100                                        |

## Considerations

- **Percentage of a percentage** is multiplicative, not additive. 20% of 30% = 6%, not 50%.
- **Percentages above 100% are real.** A 200% increase means tripling. Don't dismiss them as nonsense.
- **Percentage points vs percentages.** "Rates went from 5% to 7%" is a 2 _percentage point_ increase but a _40 percent_ increase in the rate itself. Both are correct; conflating them is a journalism crime.
- **Rounding matters with money.** ₹100 × 18% GST = ₹118. ₹118 / 1.18 = ₹100 exactly. But ₹100 × 18.5% = ₹118.50; ₹118.50 / 1.185 = ₹100.0000... watch for floating-point rounding in spreadsheets.

## Limitations

- The calculator handles single-operation cases. For sequential operations (stack 4 discounts then add GST), chain them yourself or use the [Discount calculator](/calculator/discount) which supports stacking.
- Doesn't handle percentages with units (kPa, °C/min, etc.) — those are rate calculations, not percentages.
- Doesn't visualize the calculation. For a graphical view, use the underlying [Discount](/calculator/discount) or [GST](/calculator/gst) calculators which have chart breakdowns.

## Related calculators

- **[Discount Calculator](/calculator/discount)** — stacked discount handling
- **[GST Calculator](/calculator/gst)** — Indian tax with add/remove modes
- **[Percent Change](/calculator/percent-change)** — focused single-operation tool
- **[Percent Error](/calculator/percent-error)** — for expected vs actual measurements
- **[Tip Calculator](/calculator/tip)** — for restaurant bills
- **[ROI Calculator](/calculator/roi)** — for investment returns expressed as %

---

**Final note.** Percentages are deceptively simple. Most adults confidently get them wrong under pressure — especially stacked discounts and recoveries from losses. **The single mental discipline that separates careful from sloppy thinking with percentages is asking: "of what base?"** Always specify the base before computing the percentage.
