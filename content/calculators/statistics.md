## What is a statistics calculator?

A **statistics calculator** computes summary statistics — **mean, median, mode, variance, standard deviation, range, quartiles** — from a list of numbers. It also produces a **histogram** so you can see the distribution at a glance.

This is the workhorse for data analysis: descriptive statistics that summarize "what is the typical value, how spread out is it, are there outliers?"

## Common statistics defined

### Mean (average)

```
mean = sum of values / count of values
```

The center of mass. Sensitive to outliers — one ₹10 crore salary in a list of ₹5 lakh salaries skews the mean.

### Median

The **middle value** when sorted. If even count, average of two middles. Robust to outliers — a CEO's salary doesn't move the median.

### Mode

The **most frequently occurring** value. Useful for categorical data ("most common shoe size sold"). Can be multiple (bimodal) or absent.

### Range

```
range = max − min
```

Simplest spread metric.

### Variance

```
variance = sum((value - mean)²) / N
```

Mean of squared deviations from the mean. In units squared (so ₹² for incomes — awkward).

### Standard deviation (σ)

```
σ = sqrt(variance)
```

The "typical distance from the mean", in the original units. Most useful spread metric.

### Quartiles (Q1, Q2, Q3)

- **Q1** = 25th percentile (lowest 25% are below this)
- **Q2** = median (50th)
- **Q3** = 75th percentile
- **IQR** = Q3 − Q1 (interquartile range — robust spread measure)

## Worked example

Dataset: **monthly salaries (₹ thousands)**:

```
45, 55, 60, 60, 65, 70, 75, 80, 90, 200
```

Sorted (already done).

```
Count (N) = 10
Sum = 800
Mean = 800 / 10 = ₹80,000

Median = (5th + 6th) / 2 = (65 + 70) / 2 = ₹67,500
Mode = 60 (appears twice)
Range = 200 − 45 = 155
Min = 45, Max = 200
Q1 = ₹60,000 (between 2nd and 3rd values)
Q3 = ₹80,000 (between 7th and 8th values)
IQR = 80 − 60 = ₹20,000
```

Variance (population):

```
Deviations²: (45-80)², (55-80)², ..., (200-80)²
           = 1225, 625, 400, 400, 225, 100, 25, 0, 100, 14400
Sum = 17500
Variance = 17500 / 10 = 1750
σ = sqrt(1750) ≈ 41.83 (₹41,830)
```

The **mean (₹80k) is misleading** — the ₹2,00,000 outlier inflates it. The **median (₹67.5k) is more representative** of a "typical" person. σ of ~42 says the spread is large, dominated by that one outlier.

## Population vs sample statistics

When data is a **complete population**: divide variance by **N**.

When data is a **sample** from a larger population: divide variance by **N-1** (Bessel's correction). This gives an unbiased estimate of the population variance.

For our example:

```
Population variance = 17500 / 10 = 1750
Sample variance = 17500 / 9 ≈ 1944
σ_sample ≈ √1944 ≈ 44.1
```

Difference is small for large N, big for small N. **Use sample (N-1) unless you have the full population** — which is rare.

## Worked example: skewness and kurtosis

Beyond center and spread, you can describe shape:

- **Skewness** = asymmetry. Positive skew = long right tail (incomes, wait times). Negative = long left tail.
- **Kurtosis** = "tailedness". High kurtosis = fat tails (stock returns).

For the salary example: skewness > 0 (long right tail from the ₹2L outlier).

## When to use which average

| Statistic      | Best for                                                            | Caveat                      |
| -------------- | ------------------------------------------------------------------- | --------------------------- |
| Mean           | Symmetric distributions, sums matter (totals, averages of revenues) | Sensitive to outliers       |
| Median         | Skewed distributions (incomes, wait times)                          | Doesn't use all data        |
| Mode           | Categorical / discrete (most popular product)                       | Can be absent or non-unique |
| Geometric mean | Multiplicative things (returns, ratios)                             | Requires positive values    |
| Harmonic mean  | Rates (avg speed)                                                   | Specific use cases          |

## Common mistakes

### "Average salary at the company is ₹10 lakh"

If the CEO earns ₹2 cr and 99 employees earn ₹5 lakh, the **mean is ₹2.45 lakh**. But the **median is ₹5 lakh** — far more representative. News headlines abuse this routinely.

### "Standard deviation says we're inconsistent"

Without context, σ is meaningless. σ of 10 on a base of 100 (10%) is very different from σ of 10 on a base of 10,000 (0.1%). Always quote σ relative to mean (**coefficient of variation = σ / mean × 100%**).

### Comparing variances across different units

"Sales had σ = 50, costs had σ = 30, so sales are more volatile." Wrong if sales are 10x bigger than costs.

### Treating averages as predictions

"Average height is 170 cm" doesn't mean **every person is 170 cm**. Without σ, you have no idea if the population is 165-175 or 140-200.

## Components and inputs

### Data entry

Comma-separated, space-separated, newline-separated, or pasted from spreadsheet.

```
45, 55, 60, 60, 65, 70, 75, 80, 90, 200
```

or

```
45
55
60
...
```

### Output options

- Summary table: count, sum, mean, median, mode, min, max, range
- Spread: variance, σ (population and sample)
- Quartiles: Q1, Q2, Q3, IQR
- Outliers: > Q3 + 1.5×IQR or < Q1 - 1.5×IQR
- Histogram: visualize distribution

### Population vs sample toggle

Switch between N and N-1 divisor for variance.

## Box plot interpretation

The classic 5-number summary on a box:

```
|------ box ------|
|   |    |   |   |
min Q1  med Q3  max
```

- Box length = IQR
- Median line shows skew (off-center = skewed)
- Whiskers = 1.5×IQR from box, or actual extremes
- Dots outside whiskers = outliers

## Common real-world uses

| Context         | Statistics that matter                                |
| --------------- | ----------------------------------------------------- |
| Income data     | Median + percentiles (mean is misleading)             |
| Test scores     | Mean + σ (curving grades)                             |
| Product reviews | Mean + count (don't trust 5-star with 3 reviews)      |
| Manufacturing   | σ (six-sigma = σ tight enough that defects are rare)  |
| Stock returns   | Mean + σ + kurtosis (fat tails matter)                |
| Wait times      | Median + Q3 + P95 (averages hide bad cases)           |
| Web latency     | P50 + P95 + P99 (tail latency matters more than mean) |

## Considerations

- **Always look at the data**, not just summary stats. Anscombe's quartet shows 4 datasets with identical mean/σ/correlation but totally different shapes.
- **Outliers are signal AND noise.** A ₹2 cr salary in a list of ₹5 lakh is a real datum about the CEO; whether to include it depends on the question you're asking.
- **Bigger N = more reliable estimates.** σ of 10 from N=5 is shaky; σ of 10 from N=10,000 is solid.
- **σ is in the same units as the data.** Variance is in units squared (rarely intuitive).

## Limitations

- Doesn't fit distributions (use a fitting tool for that).
- Doesn't do hypothesis testing (t-test, chi-square — see specialized stats tools).
- Doesn't handle missing data (drop NaNs first).
- Categorical data needs frequency counts, not these tools.

## Related calculators

- **[Scientific Calculator](/calculator/scientific)** — manual computation
- **[Quadratic Solver](/calculator/quadratic)** — algebraic roots
- **[Permutation & Combination](/calculator/permutation-combination)** — nPr, nCr
- **[Percentage](/calculator/percentage)** — % changes
- **[Normal Distribution](/calculator/normal-distribution)** — z-scores, probabilities

---

**Final note.** Statistics summarize data — they don't replace looking at the data. **Always check the histogram** alongside the mean and σ. For skewed data (incomes, wait times, prices), **prefer median over mean**. For mission-critical decisions, **report percentiles** (P50, P95, P99) rather than averages — they say much more about real-world performance.
