## What is a length converter?

A **length converter** translates between different units of distance — meters, kilometers, feet, inches, miles, nautical miles, yards. Different countries and industries use different standards: India + most of the world uses SI metric; the US uses US-customary; aviation and shipping use nautical miles.

This calculator handles every common length unit with high precision, and updates all other units instantly when you change the input.

## Supported units

| Unit                | Symbol | Equivalent     |
| ------------------- | ------ | -------------- |
| Meter               | m      | Base unit (SI) |
| Kilometer           | km     | 1,000 m        |
| Centimeter          | cm     | 0.01 m         |
| Millimeter          | mm     | 0.001 m        |
| Micrometer (micron) | µm     | 10⁻⁶ m         |
| Inch                | in     | 0.0254 m       |
| Foot                | ft     | 0.3048 m       |
| Yard                | yd     | 0.9144 m       |
| Mile                | mi     | 1,609.344 m    |
| Nautical mile       | nmi    | 1,852 m        |

## How conversion works

```
target_value = source_value × source_factor / target_factor
```

where each unit's factor is its value in meters. Internally, every input is converted to meters first, then to the target unit. This avoids cumulative rounding errors when chaining conversions.

## Worked example

**Convert 5 ft 9 in to centimeters** (typical height query):

```
5 ft = 5 × 30.48 = 152.4 cm
9 in = 9 × 2.54 = 22.86 cm
Total: 152.4 + 22.86 = 175.26 cm
```

Or directly: 5'9" → 69 inches → 69 × 2.54 = **175.26 cm**.

## Common conversion shortcuts (mental math)

| Approximation                                          | Use when                        |
| ------------------------------------------------------ | ------------------------------- |
| 1 m ≈ 3.28 ft                                          | Height conversions              |
| 1 inch ≈ 2.54 cm                                       | Screen sizes, body measurements |
| 1 km ≈ 0.62 mi                                         | Distances on road maps          |
| 1 mile ≈ 1.6 km                                        | US road maps to Indian/EU       |
| 1 nautical mile = 1.85 km                              | Aviation/shipping               |
| Body height: 5 ft = 152 cm + each extra inch = 2.54 cm | Quick mental height math        |

## When precision matters

- **Engineering and physics**: use full 6+ decimal precision
- **Carpentry and construction**: 1 mm precision is typical
- **Body height / weight forms**: 1 cm precision is fine
- **Travel / casual**: nearest km / mile is enough

## Considerations

- **"Mil" ≠ millimeter.** In US engineering, "mil" = 0.001 inch = 0.0254 mm. Easily confused with millimeter (mm). In jewelry, "mil" sometimes refers to thousandths of an ounce.
- **Imperial vs US-customary** — they're 99% identical but differ for some volume units (gallon). For length, both use feet/inches consistently.
- **Nautical mile** is based on 1 minute of arc along a meridian — used for sea/air navigation because it maps to latitude.

## Limitations

- The calculator doesn't handle compound inputs like "5 ft 9 in" directly. Convert each part separately or use total inches.
- Floating-point precision shows trailing decimals (e.g. 1.6093440000000001). For real use, take 4-6 decimals.

## Related calculators

- **[Mass / Weight](/calculator/mass)** — kg / lb / oz
- **[Volume](/calculator/volume)** — cubic measurements
- **[Area](/calculator/area)** — square measurements
- **[Speed](/calculator/speed)** — distance / time
- **[Tire Size](/calculator/tire-size)** — tire-spec to overall diameter

---

**Final note.** Unit conversion errors have crashed Mars rovers (the Mars Climate Orbiter was lost in 1999 due to a pound-vs-newton mixup costing $125M). **Always confirm which unit system applies before any calculation that matters** — pilots verify altitude in feet, scientists in meters, sailors in nautical miles. This calculator removes the guesswork.
