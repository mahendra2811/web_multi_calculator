## What is a temperature converter?

A **temperature converter** translates between Celsius (°C), Fahrenheit (°F), and Kelvin (K) — the three scales used worldwide. India / most of the world uses Celsius; the US uses Fahrenheit; scientists and engineers use Kelvin for absolute calculations.

Unlike length or mass, temperature scales **don't share a zero point** — they use offsets, not just multiplication factors. This is why a simple "factor lookup" doesn't work for temperature.

## How temperature conversion works

Three formulas:

```
°F = °C × 9/5 + 32
°C = (°F − 32) × 5/9
K  = °C + 273.15
°C = K − 273.15
```

The offsets are 32 (between °C and °F) and 273.15 (between °C and K).

## Worked example

| Common temperature        | °C      | °F      | K      |
| ------------------------- | ------- | ------- | ------ |
| Body temperature          | 37.0    | 98.6    | 310.15 |
| Room temperature          | 25      | 77      | 298.15 |
| Water freezing            | 0       | 32      | 273.15 |
| Water boiling (sea level) | 100     | 212     | 373.15 |
| Mumbai summer peak        | 35      | 95      | 308.15 |
| Antarctica winter         | -50     | -58     | 223.15 |
| Absolute zero             | -273.15 | -459.67 | 0      |

## Mental math shortcuts

| Approximation                   | Use when                                              |
| ------------------------------- | ----------------------------------------------------- |
| °C to °F: double and add 30     | Quick US weather chats (close to actual `× 9/5 + 32`) |
| °F to °C: subtract 30 and halve | Reverse direction                                     |
| 0°C = 32°F                      | Freezing reference                                    |
| 20°C ≈ 68°F                     | Comfortable room temperature                          |
| 100°C = 212°F                   | Boiling reference                                     |
| -40°C = -40°F                   | Both scales agree once                                |

## Why three scales

- **Celsius**: 0 = water freezes, 100 = water boils (at sea level). Designed for everyday observation.
- **Fahrenheit**: 32 = water freezes, 212 = water boils. Historical; based on Daniel Fahrenheit's brine + body-temperature reference points.
- **Kelvin**: 0 = absolute zero (no molecular motion). Used in physics, chemistry, and any calculation involving thermodynamic laws.

Engineers use **Rankine** (= Fahrenheit + absolute) in some US thermodynamics contexts. Rarely encountered today. CalcMaster doesn't include Rankine.

## Practical contexts

| Field                       | Default unit                                                        |
| --------------------------- | ------------------------------------------------------------------- |
| Indian weather forecast     | °C                                                                  |
| US weather forecast         | °F                                                                  |
| Cooking (recipes worldwide) | °C, °F, or "Gas Mark" (UK) — see [Oven Temp](/calculator/oven-temp) |
| Body temperature (clinical) | °C (India), °F (US/UK)                                              |
| Industrial heating          | °C                                                                  |
| Cryogenics / liquid gases   | K                                                                   |
| Climate science             | °C (IPCC), Kelvin (researchers)                                     |
| Astronomy                   | K                                                                   |

## Considerations

- **Negative Kelvin doesn't exist physically.** Below absolute zero (0 K) is theoretically impossible — molecular motion can't go negative.
- **Body temperature varies.** Normal range: 36.1-37.2 °C (97.0-99.0 °F). Fever begins around 38°C (100.4°F). Hyperthermia/heat stroke at 40°C+ (104°F+).
- **Boiling point varies with altitude.** At sea level, water boils at 100°C. At Mumbai sea-level: yes. At Manali (2000 m): ~93°C. At Mt. Everest base camp (5000 m): ~84°C. Recipes adjust accordingly.
- **Fahrenheit's relevance is fading.** Most countries dropped F decades ago. US is the major holdout; younger Americans increasingly use °C through phones and apps.

## Limitations

- The calculator handles °C, °F, K only. Rankine, Réaumur, and Newton scales aren't supported (very rarely used today).
- Doesn't handle temperature differences (delta-T) — but the math is simpler for those: 1°C change = 1.8°F change = 1 K change. Use for engineering rate calculations.

## Related calculators

- **[Oven Temp](/calculator/oven-temp)** — adds Gas Mark for UK cooking
- **[Heat Index](/calculator/heat-index)** — feels-like with humidity
- **[Wind Chill](/calculator/wind-chill)** — feels-like with wind
- **[Dew Point](/calculator/dew-point)** — humidity-temp relationship
- **[Energy (Conversion)](/calculator/energy)** — joules / kWh / calories

---

**Final note.** Temperature scale confusion still causes recipe disasters, weather miscommunications, and the occasional medical error. **If a recipe says "350°", check whether it's °C or °F** — that 162-degree gap is the difference between "perfect roast chicken" and "burned to charcoal". This calculator removes the doubt in 5 seconds.
