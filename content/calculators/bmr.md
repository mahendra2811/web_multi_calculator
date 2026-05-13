## What is a BMR calculator?

**BMR** stands for **Basal Metabolic Rate** — the calories your body burns at complete rest, just keeping you alive. Heart beating, lungs breathing, brain thinking, organs maintaining temperature: all of that needs energy, even if you spend the entire day in bed.

BMR is the **baseline floor** for daily calorie needs. To get your **total daily energy expenditure (TDEE)** — the actual calories you burn per day — multiply BMR by an activity factor. See the [Calorie Calculator](/calculator/calorie) for TDEE.

## How is BMR calculated?

Several formulas exist. The most accurate for the general population is the **Mifflin-St Jeor equation** (1990):

```
Men:    BMR = (10 × weight kg) + (6.25 × height cm) − (5 × age) + 5
Women:  BMR = (10 × weight kg) + (6.25 × height cm) − (5 × age) − 161
```

Older formulas like **Harris-Benedict** (1919) tend to overestimate by 5%. **Katch-McArdle** uses lean body mass and is more accurate for athletic individuals — but requires body fat % measurement.

This calculator uses Mifflin-St Jeor by default and offers Harris-Benedict and Katch-McArdle as alternates.

## Worked example

A **30-year-old man, 175 cm tall, 75 kg**:

```
BMR = (10 × 75) + (6.25 × 175) − (5 × 30) + 5
    = 750 + 1,093.75 − 150 + 5
    = 1,698.75 kcal/day
```

A **30-year-old woman, 162 cm tall, 60 kg**:

```
BMR = (10 × 60) + (6.25 × 162) − (5 × 30) − 161
    = 600 + 1,012.5 − 150 − 161
    = 1,301.5 kcal/day
```

Even at complete rest, the man burns ~1,700 kcal/day; the woman ~1,300. Most diet plans should never go below BMR for sustained periods.

## Why men burn more than women

The formula difference (−161 vs +5) reflects body composition:

- Men typically have higher muscle mass (more metabolic activity)
- Women have higher essential fat (less metabolic activity)
- Hormonal differences (testosterone vs estrogen)

This is averaged into the formula. Individuals vary by ±10% from the predicted value.

## Components and inputs

### Sex (biological)

Male or female. The formula offset differs.

### Age

In years. BMR decreases by ~5 kcal/day for each year of age, as lean mass tends to decline.

### Height

In cm or feet/inches. Affects body surface area.

### Weight

In kg or lb. Affects metabolic mass.

### Optional — body fat %

Switches to **Katch-McArdle**:

```
BMR = 370 + (21.6 × lean body mass kg)
where lean body mass = weight × (1 − body fat fraction)
```

This is more accurate for **athletes** (high muscle, low fat) and **obese individuals** (muscle metabolizes; fat barely does).

## Variants of the formula

| Formula                   | Year | Best for                                       |
| ------------------------- | ---- | ---------------------------------------------- |
| Mifflin-St Jeor           | 1990 | General population (default)                   |
| Harris-Benedict (revised) | 1984 | Backward compatibility                         |
| Katch-McArdle             | 1975 | Athletes / lean body mass known                |
| Cunningham                | 1980 | Athletes (similar to Katch-McArdle)            |
| Schofield                 | 1985 | WHO / public health (uses height, weight, age) |

For most people, **Mifflin-St Jeor is accurate within ±10%**.

## What BMR is NOT

- It's NOT your daily calorie need (multiply by activity factor for that)
- It's NOT a weight-loss prescription
- It's NOT what you burn during exercise (that's _exercise expenditure_, separate)
- It's NOT a substitute for measured RMR (indirect calorimetry in a clinical setting is more accurate)

## What affects BMR

| Factor              | Effect          | Notes                                   |
| ------------------- | --------------- | --------------------------------------- |
| Lean muscle mass    | Increases       | Muscle burns 13 kcal/kg/day at rest     |
| Fat mass            | Slight increase | Fat burns 4.5 kcal/kg/day at rest       |
| Age                 | Decreases       | ~5 kcal/year decline after age 30       |
| Sex (male)          | Higher          | Due to muscle mass                      |
| Body temperature    | Increases       | Fever raises BMR ~7% per °C             |
| Thyroid             | Major           | Hyperthyroid raises BMR; hypo lowers it |
| Pregnancy           | Increases       | Up to 20% in third trimester            |
| Caffeine / nicotine | Slight increase | Temporary                               |
| Crash dieting       | Decreases       | Body conserves energy when starved      |
| Sleep               | Slightly lower  | BMR is measured awake but inactive      |

## Worked example: weight loss math

A 70 kg woman, 30 y, 165 cm has BMR ≈ 1,400 kcal. Her TDEE (light activity) is **1,400 × 1.375 = 1,925 kcal**.

To lose 0.5 kg/week (~3,500 kcal deficit):

```
Daily deficit = 3,500 / 7 = 500 kcal
Target intake = 1,925 − 500 = 1,425 kcal/day
```

That's at BMR — sustainable for weeks, not months. For longer-term sustainable loss, consider a smaller deficit (300 kcal/day → ~1.5 kg/month).

**Never** drop intake significantly below BMR. The body downregulates metabolism and you regain rapidly when you stop.

## Considerations

- **BMR is a prediction, not a measurement.** Real RMR (resting metabolic rate, measured via indirect calorimetry) is the gold standard but requires lab equipment.
- **±10% accuracy.** Two people with identical inputs can have 200 kcal different actual BMR.
- **Day-to-day variation.** Even your own BMR varies by 5-10% based on sleep, stress, hormones, hydration.
- **Don't measure body composition with bathroom scales.** Bioimpedance scales are noisy; DEXA / hydrostatic weighing / skinfold calipers are more accurate.

## Limitations

- Doesn't account for **medical conditions** (thyroid disease, diabetes, PCOS) that shift BMR by 10-30%.
- Doesn't apply to **children** — separate growth-adjusted equations exist.
- Doesn't predict the **adaptive thermogenesis** drop after sustained dieting (BMR can drop 15-25% with severe caloric restriction).
- Not a substitute for medical advice — see a doctor or registered dietitian for individualized planning.

## Related calculators

- **[Calorie / TDEE](/calculator/calorie)** — BMR × activity factor
- **[BMI](/calculator/bmi)** — weight categorization
- **[Body Fat](/calculator/body-fat)** — % composition
- **[Ideal Weight](/calculator/ideal-weight)** — target weight range
- **[Macro Split](/calculator/macros)** — protein/carbs/fat breakdown
- **[Water Intake](/calculator/water-intake)** — daily hydration

---

**Final note.** BMR is the **calorie floor** — what your body needs to stay alive at rest. Multiply by activity factor to get TDEE; eat above TDEE to gain, below to lose. Don't dip too far below BMR for sustained periods — your metabolism rebels. For most people, **Mifflin-St Jeor + activity multiplier** gets within ±10% of reality, which is enough for practical diet planning.
