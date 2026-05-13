## What is a calorie calculator?

A **calorie calculator** estimates your **Total Daily Energy Expenditure (TDEE)** — the total kilocalories your body burns in 24 hours, including basal metabolism, daily activity, and exercise. It's the foundation for any weight management plan: **eat below TDEE to lose**, **above TDEE to gain**, **at TDEE to maintain**.

This calculator starts with your **BMR** (basal metabolic rate, see [BMR Calculator](/calculator/bmr)) and multiplies by an **activity factor** that accounts for your typical daily movement and exercise.

## How is TDEE calculated?

```
TDEE = BMR × Activity Factor
```

Where BMR uses Mifflin-St Jeor:

```
Men:    BMR = (10 × kg) + (6.25 × cm) − (5 × age) + 5
Women:  BMR = (10 × kg) + (6.25 × cm) − (5 × age) − 161
```

And activity factor depends on lifestyle:

| Activity level    | Factor | Typical person                            |
| ----------------- | ------ | ----------------------------------------- |
| Sedentary         | 1.2    | Desk job, no exercise                     |
| Lightly active    | 1.375  | Light exercise 1-3 days/week              |
| Moderately active | 1.55   | Moderate exercise 3-5 days/week           |
| Very active       | 1.725  | Hard exercise 6-7 days/week               |
| Extra active      | 1.9    | Athletes, manual labor, 2x daily training |

## Worked example

A **30-year-old woman, 165 cm, 60 kg, lightly active**:

```
BMR = (10 × 60) + (6.25 × 165) − (5 × 30) − 161
    = 600 + 1,031 − 150 − 161
    = 1,320 kcal/day
TDEE = 1,320 × 1.375 = 1,815 kcal/day
```

To **maintain weight**: eat ~1,815 kcal/day.

To **lose 0.5 kg/week**:

```
3,500 kcal per 0.5 kg / 7 days = 500 kcal/day deficit
Target intake = 1,815 − 500 = 1,315 kcal/day
```

To **gain muscle** (lean bulk):

```
Surplus = 300-500 kcal/day
Target = 1,815 + 300 = 2,115 kcal/day
```

## The 3,500 kcal per pound rule (qualified)

Classic guidance: 3,500 kcal deficit = 0.45 kg (1 lb) of fat loss. **It's roughly right but not exact**:

- Early loss includes water weight (1-2 kg in week 1) — not pure fat
- Body adapts: after weeks of deficit, BMR drops 10-15% (adaptive thermogenesis), slowing further loss
- Muscle loss happens too in aggressive deficits — protein intake protects against this
- Long-term, expect ~0.5 kg/week max sustainable fat loss for most people

A better rule for sustainable loss: **deficit of 300-500 kcal/day → 0.25-0.5 kg/week**.

## Activity factor — choose carefully

The biggest source of error in TDEE is **overestimating activity**:

- "Lightly active" doesn't mean you walk to the kitchen sometimes. It means deliberate exercise 1-3 days/week.
- "Moderately active" includes gym sessions of 30-60 minutes, 3-5 times/week.
- "Very active" is for serious gym-goers / endurance athletes.

**If you sit at a desk all day and walk for 20 min after dinner, you're sedentary or lightly active — not moderately.** Most calculator users overestimate by 1 tier, leading to 200-400 kcal of error.

When in doubt: pick **one tier lower** than feels right. If weight doesn't change in 2-3 weeks at that intake, recalibrate.

## Macronutrient split

TDEE tells you calories. **Macros** (protein/carbs/fat) tell you composition:

| Macro   | kcal/g | Typical % | Notes                                       |
| ------- | ------ | --------- | ------------------------------------------- |
| Protein | 4      | 25-35%    | Higher when losing weight or gaining muscle |
| Carbs   | 4      | 40-55%    | Endurance athletes higher                   |
| Fat     | 9      | 20-35%    | Hormone health requires minimum 0.5 g/kg    |

For our example (1,815 kcal at 30% P / 40% C / 30% F):

```
Protein: 1,815 × 0.30 / 4 = 136 g
Carbs:   1,815 × 0.40 / 4 = 182 g
Fat:     1,815 × 0.30 / 9 = 61 g
```

See the [Macro Calculator](/calculator/macros) for split presets.

## Calorie content of common Indian foods

| Food                     | Serving        | Calories |
| ------------------------ | -------------- | -------- |
| Roti (medium)            | 1 piece        | 70-100   |
| Rice (cooked)            | 1 cup          | 200      |
| Dal (tadka)              | 1 cup          | 200      |
| Paneer (50g)             | 1 small piece  | 130      |
| Curd                     | 1 cup (200g)   | 100      |
| Banana                   | 1 medium       | 100      |
| Samosa                   | 1 piece        | 250-300  |
| Chai (with milk + sugar) | 1 cup          | 80-100   |
| Pizza slice              | 1 medium slice | 250-350  |
| Idli                     | 1 piece        | 50-60    |
| Dosa (plain)             | 1 piece        | 150      |
| Vada pav                 | 1 piece        | 290      |
| Biryani                  | 1 plate        | 600-800  |

Notable: a single **gulab jamun ≈ 150 kcal**, a **Coca-Cola can ≈ 140 kcal**. Liquid calories are easy to miss.

## Components and inputs

### Sex, age, height, weight

Used to compute BMR. See [BMR Calculator](/calculator/bmr) for details.

### Activity level

The big multiplier. Be honest.

### Goal _(optional)_

The calculator can adjust for:

- **Maintain** — eat at TDEE
- **Lose** — TDEE − 500 kcal (moderate) or TDEE − 750 kcal (aggressive)
- **Gain** — TDEE + 250 (lean bulk) or TDEE + 500 (aggressive bulk)

## Considerations

- **±10% accuracy on TDEE.** Two people with identical inputs can have 200-400 kcal different actual needs.
- **Adaptive thermogenesis** is real. After weeks of deficit, BMR drops 10-25%. You may need to drop intake further to keep losing.
- **NEAT (non-exercise activity thermogenesis)** matters. Fidgeting, standing meetings, walking around — can vary by 300-500 kcal/day between two people.
- **Track for 2 weeks before adjusting.** Daily weight fluctuates ±1 kg from water/glycogen. Use 7-day rolling average.

## Common pitfalls

- **Underestimating intake.** Studies show people under-report calorie intake by 20-40%, especially overweight individuals. Use a food scale for the first 2 weeks.
- **Overestimating exercise burn.** Fitness trackers overestimate calorie burn by 30-90% (a recent study found smartwatch error >25% in ~93% of cases).
- **Liquid calories blind spot.** Sugary drinks, juices, alcohol — easily 500-800 kcal/day if unmonitored.
- **"Cheat day" math.** A 2,000 kcal surplus on weekend cancels 5 days of 400-kcal deficit.

## Limitations

- Not a substitute for working with a registered dietitian or doctor, especially for medical conditions (diabetes, PCOS, thyroid).
- Doesn't account for genetic differences in metabolism.
- Pregnancy / breastfeeding require additional calories (300-500 kcal/day) — see prenatal calculators.
- Children and adolescents have different formulas — don't apply adult equations.

## Related calculators

- **[BMR](/calculator/bmr)** — baseline metabolic rate
- **[Macros](/calculator/macros)** — protein/carbs/fat split
- **[BMI](/calculator/bmi)** — weight category
- **[Body Fat](/calculator/body-fat)** — % composition
- **[Ideal Weight](/calculator/ideal-weight)** — target range
- **[Water Intake](/calculator/water-intake)** — daily hydration

---

**Final note.** Calorie counting works when done honestly. The single biggest predictor of fat loss success is **measured intake** (food scale or app) for 2-4 weeks until you internalize portion sizes. After that, you can eyeball it. **Don't undereat by more than 500 kcal/day** for sustained periods — your metabolism slows and you regain. Slow and steady (0.5 kg/week) wins this race.
