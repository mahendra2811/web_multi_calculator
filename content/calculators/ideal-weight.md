## What is an ideal weight calculator?

An **ideal weight calculator** estimates a healthy weight range for your height, age, and frame. It uses one of several published formulas — there is no single universal "ideal weight" because reasonable healthy ranges span 6-10 kg for any given height.

Use this calculator as a **rough target**, not an absolute. Body composition (muscle vs fat) matters more than total weight: a 75 kg athletic person can be healthier than a 65 kg sedentary one. For composition, use the [Body Fat](/calculator/body-fat) calculator.

## Formulas used

### Devine formula (1974) — most common

```
Men:    50 kg + 2.3 kg per inch over 5 feet
Women:  45.5 kg + 2.3 kg per inch over 5 feet
```

### Robinson formula (1983)

```
Men:    52 kg + 1.9 kg per inch over 5 feet
Women:  49 kg + 1.7 kg per inch over 5 feet
```

### Miller formula (1983)

```
Men:    56.2 kg + 1.41 kg per inch over 5 feet
Women:  53.1 kg + 1.36 kg per inch over 5 feet
```

### Hamwi formula (1964)

```
Men:    48 kg + 2.7 kg per inch over 5 feet
Women:  45.5 kg + 2.2 kg per inch over 5 feet
```

### BMI range method (most defensible)

Compute weight at BMI 18.5 (low healthy) and BMI 24.9 (high healthy):

```
weight_low  = 18.5 × height² (m²)
weight_high = 24.9 × height² (m²)
```

## Worked example

A **man, 175 cm tall (5'9", 9 inches over 5 feet)**:

```
Devine:    50 + 2.3 × 9 = 70.7 kg
Robinson:  52 + 1.9 × 9 = 69.1 kg
Miller:    56.2 + 1.41 × 9 = 68.9 kg
Hamwi:     48 + 2.7 × 9 = 72.3 kg

BMI range: 1.75² × 18.5 = 56.6 kg (low)
           1.75² × 24.9 = 76.3 kg (high)
```

So a 175 cm man's "ideal" by formula sits **69-72 kg**, with the healthy BMI range being **56.6-76.3 kg**. Most men feel best toward the middle of that BMI range.

For a **woman, 162 cm (5'4", 4 inches over 5 feet)**:

```
Devine:    45.5 + 2.3 × 4 = 54.7 kg
Robinson:  49 + 1.7 × 4 = 55.8 kg
Miller:    53.1 + 1.36 × 4 = 58.5 kg
Hamwi:     45.5 + 2.2 × 4 = 54.3 kg

BMI range: 1.62² × 18.5 = 48.6 kg
           1.62² × 24.9 = 65.4 kg
```

Formulas converge around **55-58 kg**; healthy BMI range is **48.6-65.4 kg**.

## Frame size adjustment

Many formulas allow ±10% adjustment based on frame:

- **Small frame**: subtract 10%
- **Medium frame**: use formula value
- **Large frame**: add 10%

Frame size is measured by **elbow breadth** or **wrist circumference**:

### Elbow breadth (men, medium frame)

| Height     | Medium frame elbow |
| ---------- | ------------------ |
| 5'2"-5'3"  | 6.4-7.2 cm         |
| 5'4"-5'7"  | 6.7-7.4 cm         |
| 5'8"-5'11" | 6.7-7.6 cm         |
| 6'0"+      | 7.0-7.8 cm         |

Outside that range → small or large frame.

### Wrist (men)

- Small: < 16.5 cm
- Medium: 16.5-19 cm
- Large: > 19 cm

### Wrist (women)

- Small: < 14 cm
- Medium: 14-16.5 cm
- Large: > 16.5 cm

## India-specific considerations

WHO Asia-Pacific BMI thresholds are **lower than Western thresholds**:

- Underweight: < 18.5
- Normal: 18.5 - 22.9 (Asian) vs 18.5 - 24.9 (WHO global)
- Overweight: 23 - 27.4
- Obese: 27.5+

So an Indian's "ideal" using the BMI method should target **18.5-23 BMI** — about 5% lower than the global formulas suggest. For 175 cm man, that's **56.6-70.4 kg** instead of 56.6-76.3 kg.

This is because Indians develop metabolic complications (diabetes, heart disease) at lower BMIs than Europeans.

## Worked example: Indian-adjusted

Man, 175 cm tall, Indian-adjusted ideal:

```
Low:  1.75² × 18.5 = 56.6 kg
High: 1.75² × 22.9 = 70.1 kg
Mid:  ~63 kg
```

Note: this is **lower than the Devine formula** suggests for the same height. Indian guidelines aim for the **leaner end** of the global range.

## Components and inputs

### Sex (biological)

Male / female. Different baseline weights.

### Height

In cm or feet/inches. The primary driver.

### Age _(optional)_

For age-adjusted BMI thresholds. Beyond age 65, slightly higher BMI (24-27) is associated with **lower mortality** than the "young adult" range (paradoxically — see "obesity paradox" in elderly).

### Frame size _(optional)_

Small / medium / large. Adjusts ±10%.

### Region preset _(optional)_

- Global (WHO) — BMI 18.5-24.9
- India / Asia-Pacific — BMI 18.5-22.9

## Considerations

- **No single ideal weight exists.** The "right" weight depends on muscle mass, frame, age, ethnicity, and personal health markers (blood pressure, lipids, glucose).
- **Weight alone is misleading.** Two people at "ideal weight" can have very different health profiles based on body composition.
- **Older adults** can be healthier slightly above traditional ideal weight — reduced osteoporosis and sarcopenia risk.
- **Athletes** routinely exceed "ideal weight" due to muscle mass and are healthier than the formula suggests.
- **Cultural body image** varies — these formulas are based on epidemiological studies, not aesthetics.

## What ideal weight is NOT

- Not a guarantee of health
- Not a goal you must reach
- Not stable across life — natural fluctuation of 5-10 kg with age is normal
- Not based on aesthetics — these are health-oriented numbers
- Not a replacement for medical assessment (blood work, BP, lifestyle factors)

## Limitations

- Doesn't account for muscle mass (athletes always exceed "ideal")
- Doesn't account for bone density (high in some ethnicities)
- Less applicable to pregnant women, breastfeeding mothers, people with edema/ascites
- Formulas were derived from primarily Western populations; Asian/African body compositions differ
- Older adults (65+) may benefit from slightly higher weight than "ideal"

## Related calculators

- **[BMI](/calculator/bmi)** — weight category
- **[Body Fat](/calculator/body-fat)** — % composition
- **[BMR](/calculator/bmr)** — metabolic floor
- **[Calorie / TDEE](/calculator/calorie)** — daily needs
- **[Lean Body Mass](/calculator/lean-body-mass)** — muscle + bone + organ mass

---

**Final note.** Ideal weight is a **target range**, not a fixed number. Pick the BMI-range method for the most defensible answer, adjust 5% lower if you're Indian, and remember that **body composition matters more than the scale number**. A weight that lets you move freely, sleep well, and shows good lab markers is your real "ideal" — regardless of what the formula says.
