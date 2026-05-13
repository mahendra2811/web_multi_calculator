## What is a mass converter?

A **mass converter** translates between units of weight — kilograms, grams, pounds, ounces, tons. Different countries use different defaults: India and most of the world use metric (kg, g); the US/UK use pounds and ounces; jewelers use troy ounces (subtly different from regular ounces).

## Supported units

| Unit         | Symbol | Equivalent     |
| ------------ | ------ | -------------- |
| Kilogram     | kg     | Base unit (SI) |
| Gram         | g      | 0.001 kg       |
| Milligram    | mg     | 10⁻⁶ kg        |
| Microgram    | µg     | 10⁻⁹ kg        |
| Pound        | lb     | 0.45359237 kg  |
| Ounce        | oz     | 0.0283495 kg   |
| Stone        | st     | 6.35029 kg     |
| Metric ton   | t      | 1,000 kg       |
| US short ton | —      | 907.185 kg     |
| UK long ton  | —      | 1,016.05 kg    |

## How conversion works

```
target_value = source_value × source_factor / target_factor
```

Each unit has a factor in kg. The calculator routes all conversions through kg internally.

## Worked example

**Convert 165 lb (US body weight) to kg**:

```
165 × 0.45359 = 74.84 kg
```

**Convert 5 oz (recipe ingredient) to grams**:

```
5 × 28.3495 = 141.75 g
```

## Mental math shortcuts

| Approximation                            | Use when                 |
| ---------------------------------------- | ------------------------ |
| 1 kg ≈ 2.2 lb                            | Body weight, gym weights |
| 1 lb ≈ 0.45 kg                           | Imperial to metric       |
| 1 oz ≈ 28 g                              | Cooking, small weights   |
| 1 stone = 14 lb = 6.35 kg                | UK body weight           |
| 1 ton (metric) = 1,000 kg                | Bulk shipping            |
| Body weight: divide pounds by 2.2 for kg | Quick mental conversion  |

## Common pitfalls

- **Mass vs weight.** Mass is the amount of matter (constant). Weight is force = mass × gravity (varies by planet). On Earth, 1 kg "weighs" 9.81 N. Casually, "weight" = "mass" but in physics they're distinct. See [Weight Calculator](/calculator/weight).
- **Troy ounce ≠ regular ounce.** Jewelry / precious metals use **troy ounce** = 31.1035 g. Cooking / postal uses **regular (avoirdupois) ounce** = 28.3495 g. A "10-ounce gold bar" weighs 311 g (troy), not 283 g (avoirdupois).
- **Ton variants.** Metric ton = 1,000 kg. US short ton = 907 kg. UK long ton = 1,016 kg. Always specify which.

## Considerations

- **Body weight in different cultures.** US/UK: pounds. India: kg. Some UK forms: stones + pounds. Most modern Indian doctors use kg exclusively.
- **Postage and shipping.** International couriers often quote both kg and lb. Customs use kg.
- **Precision matters in pharmacy.** Drug dosages in mg or µg — getting the factor of 1000 wrong is a medical error.

## Limitations

- The calculator doesn't auto-detect troy vs avoirdupois ounce — pick "ounce" for the standard (cooking/postal) version. For troy ounce, multiply weight by 31.1035 / 28.3495 = 1.097 manually.
- Floating-point precision may show trailing decimals; take 3-4 decimals for practical use.

## Related calculators

- **[Length](/calculator/length)** — distance conversions
- **[Volume](/calculator/volume)** — liquid measurements
- **[BMI](/calculator/bmi)** — uses kg for body weight
- **[Density](/calculator/density)** — mass / volume
- **[Weight (physics)](/calculator/weight)** — mass × gravity = force
- **[Force](/calculator/force)** — Newtons

---

**Final note.** Mass conversions trip up cooks (oz vs g recipes), travelers (luggage weight limits in kg vs lb), and jewelers (troy vs avoirdupois). The fix: **always confirm which unit system applies, then convert once with this tool rather than juggling mental approximations.**
