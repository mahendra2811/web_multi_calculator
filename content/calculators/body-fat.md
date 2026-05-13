## What is a body fat calculator?

A **body fat calculator** estimates the percentage of your body weight that comes from fat (as opposed to muscle, bone, water, organs). It's a far better health metric than weight alone — a 70 kg lean person with 12% body fat is very different from a 70 kg sedentary person with 28% body fat.

The calculator uses **circumference measurements** (US Navy method) — neck, waist, and hip — which require only a tape measure. It's not as accurate as DEXA or hydrostatic weighing but is **good enough for tracking changes over time**.

## Formula — US Navy method

**For men:**

```
Body fat % = 86.010 × log10(waist − neck) − 70.041 × log10(height) + 36.76
```

**For women:**

```
Body fat % = 163.205 × log10(waist + hip − neck) − 97.684 × log10(height) − 78.387
```

All measurements in inches (or convert from cm using cm / 2.54).

## Worked example

A man, 175 cm (68.9 inches) tall, with waist 88 cm (34.6 inches) and neck 38 cm (15 inches):

```
log10(34.6 − 15) = log10(19.6) = 1.292
log10(68.9) = 1.838

Body fat = 86.01 × 1.292 − 70.041 × 1.838 + 36.76
        = 111.1 − 128.7 + 36.76
        = 19.16%
```

That's **average for a 30-year-old man** — not lean, not fat.

For a woman, same height, waist 75 cm (29.5"), hip 95 cm (37.4"), neck 33 cm (13"):

```
log10(29.5 + 37.4 − 13) = log10(53.9) = 1.732
log10(68.9) = 1.838

Body fat = 163.205 × 1.732 − 97.684 × 1.838 − 78.387
        = 282.7 − 179.5 − 78.4
        = 24.8%
```

That's **healthy-range** for a woman of average activity.

## Body fat categories

### Men

| Category                     | Body fat % |
| ---------------------------- | ---------- |
| Essential (minimum survival) | 2-5%       |
| Athlete                      | 6-13%      |
| Fitness                      | 14-17%     |
| Average                      | 18-24%     |
| Obese                        | 25%+       |

### Women

| Category                     | Body fat % |
| ---------------------------- | ---------- |
| Essential (minimum survival) | 10-13%     |
| Athlete                      | 14-20%     |
| Fitness                      | 21-24%     |
| Average                      | 25-31%     |
| Obese                        | 32%+       |

Women have **~10% more essential body fat** than men, due to reproductive biology (breast tissue, hormones). A 12% body fat man = a 22% body fat woman in terms of leanness.

## How to measure correctly

Tape measure tips:

- **Neck**: just below the larynx (Adam's apple), tape horizontal
- **Waist**: at the **navel** (men) or **narrowest point** (women). Don't suck in.
- **Hip**: at the **widest point** of the buttocks (women only)
- Tape should be snug against skin, NOT compressing it
- Measure 2-3 times, take the average

Measurement errors compound. **A 1 cm error in waist can shift body fat by 1-2%.** Be consistent — same time of day, same tape, same posture.

## Methods compared

| Method                     | Accuracy      | Cost                | Notes                                    |
| -------------------------- | ------------- | ------------------- | ---------------------------------------- |
| DEXA scan                  | ±1%           | ₹3,000-5,000 / scan | Gold standard, radiation exposure low    |
| Hydrostatic weighing       | ±1.5%         | Lab only            | Requires being submerged                 |
| Air displacement (Bod Pod) | ±2%           | Rare in India       |                                          |
| Skinfold calipers (7-site) | ±3% (skilled) | ₹500-1,500 calipers | Operator-dependent                       |
| US Navy circumference      | ±3-4%         | Free with tape      | Practical for tracking                   |
| Bioimpedance (smart scale) | ±5-8%         | ₹2,000-5,000 scale  | Hydration-sensitive; can be very wrong   |
| Visual estimation          | ±5% (trained) | Free                | Try comparing to body fat % photo charts |

**For tracking changes over time, all are useful — pick one and stick to it.** Don't compare DEXA reading to scale reading; the systematic error differs.

## Body fat vs BMI

BMI is weight/height². Body fat % is more informative because:

- A 90 kg bodybuilder might be BMI 28 ("overweight") but 8% body fat (lean)
- An 80 kg sedentary office worker might be BMI 25 ("normal") but 30% body fat ("skinny fat")

**Body fat % cuts through that ambiguity.** Two people with identical BMI can have very different metabolic risk.

## Visceral vs subcutaneous fat

Body fat is two types:

- **Subcutaneous** (under skin): visible, less metabolically harmful
- **Visceral** (around organs): hidden, drives insulin resistance, heart disease, diabetes

The Navy formula estimates **total** body fat. **Waist circumference alone** is a good proxy for visceral fat:

- Men: visceral risk if waist > 102 cm (40")
- Women: visceral risk if waist > 88 cm (35")
- Indians: lower thresholds — Men > 90 cm, Women > 80 cm (per Indian Diabetes Federation)

## Indian-specific considerations

South Asians have **higher body fat at the same BMI** than Europeans (~3-5% higher). The "Indian phenotype" means:

- Higher visceral fat at lower BMI
- Earlier onset of type 2 diabetes
- WHO adjusted BMI thresholds for Asians: overweight ≥ 23, obese ≥ 25

Translating this: an Indian with **BMI 25 and waist >90 cm (men) / 80 cm (women)** should be concerned even if not classically "obese" by Western standards.

## Considerations

- **Day-to-day fluctuation.** Hydration alone shifts measurements 1-2 cm and body fat estimate by 1-2%.
- **Time of day.** Measure first thing in the morning, post-bathroom, before food/water.
- **Female cycle.** Body fat estimates can vary ±3% across the menstrual cycle.
- **Aging.** Body fat % naturally rises 0.5-1% per decade after age 30 even at same weight (muscle loss).

## Limitations

- ±3-4% accuracy with proper measurement; worse with sloppy measurement.
- Doesn't distinguish visceral vs subcutaneous fat directly.
- Less accurate at extremes (very lean or very obese).
- Doesn't replace medical assessment for obesity-related disease risk.

## Related calculators

- **[BMI](/calculator/bmi)** — weight category
- **[BMR](/calculator/bmr)** — metabolic floor
- **[Calorie](/calculator/calorie)** — TDEE for goals
- **[Ideal Weight](/calculator/ideal-weight)** — healthy range
- **[Lean Body Mass](/calculator/lean-body-mass)** — muscle + bone + organ mass
- **[Waist-Hip Ratio](/calculator/whr)** — visceral fat proxy

---

**Final note.** Body fat percentage is the **single most informative composition metric** for most people — better than weight, better than BMI alone. Use the tape-measure method consistently over weeks/months; track the trend, not the single number. **For Indians, watch the waist** — visceral fat is the actionable health risk and starts at lower thresholds than Western guidelines suggest.
