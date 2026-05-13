## What is a speed converter?

A **speed converter** translates between units of velocity — kilometers per hour (km/h), miles per hour (mph), meters per second (m/s), knots, feet per second (ft/s). Different industries use different units: road traffic in km/h or mph, aviation and shipping in knots, physics in m/s, athletics in m/s or min/km.

In India: road speeds are **km/h**. In the US and UK: **mph**. Pilots and sailors: **knots**. Physicists: **m/s**.

## Conversion table

| Unit   | km/h  | mph   | m/s   | knots |
| ------ | ----- | ----- | ----- | ----- |
| 1 km/h | 1     | 0.621 | 0.278 | 0.540 |
| 1 mph  | 1.609 | 1     | 0.447 | 0.869 |
| 1 m/s  | 3.6   | 2.237 | 1     | 1.944 |
| 1 knot | 1.852 | 1.151 | 0.514 | 1     |

**Easy mental conversions:**

- km/h → mph: multiply by 0.6 (roughly). 100 km/h ≈ 60 mph.
- km/h → m/s: divide by 3.6. 36 km/h = 10 m/s.
- m/s → km/h: multiply by 3.6. 10 m/s = 36 km/h.
- knots → km/h: multiply by 1.85. 10 knots ≈ 18.5 km/h.

## Worked example

A car is traveling at **80 km/h**. Convert to other units:

```
80 km/h × 0.621 = 49.7 mph
80 km/h / 3.6 = 22.2 m/s
80 km/h × 0.54 = 43.2 knots
```

A 100-meter sprinter finishes in 10 seconds. Speed?

```
100 m / 10 s = 10 m/s
10 × 3.6 = 36 km/h
```

Usain Bolt's peak: ~12.4 m/s ≈ 44.6 km/h ≈ 27.7 mph.

## Common speeds reference

| Activity             | Typical speed                  |
| -------------------- | ------------------------------ |
| Walking              | 5 km/h (1.4 m/s)               |
| Brisk walking        | 6.5 km/h                       |
| Jogging              | 8–10 km/h                      |
| Running (5k pace)    | 12 km/h                        |
| Cycling (casual)     | 15–20 km/h                     |
| Cycling (sport)      | 25–35 km/h                     |
| Car (city)           | 40–60 km/h                     |
| Car (highway, India) | 80–100 km/h                    |
| Car (expressway)     | 100–120 km/h                   |
| High-speed rail      | 250–350 km/h                   |
| Airliner cruise      | 900 km/h (480 knots / 250 m/s) |
| Sound at sea level   | 1,235 km/h (343 m/s)           |
| Light in vacuum      | 299,792 km/s                   |

## Why so many units exist

- **km/h** — most countries (metric system); intuitive for road travel because most distances are in km.
- **mph** — US, UK, some Caribbean islands. Same intuition for miles-based road signs.
- **m/s** — SI standard; physics, engineering, biomechanics. Easier for calculations with seconds.
- **Knots** — aviation and shipping. 1 knot = 1 nautical mile per hour. Nautical miles correspond directly to lines of latitude (1 nm = 1 arc-minute of latitude), making navigation simpler.
- **ft/s** — US engineering. Bullet speeds, fluid dynamics in imperial units.

## Practical applications

### Driving in India

Speed limits in India (post-2018 expressway changes):

- Expressways: 120 km/h (cars)
- National highways: 100 km/h
- State highways: 80 km/h
- Urban roads: 50–70 km/h (varies)
- School zones / hospital zones: 25 km/h

### Aviation

Airliner speed quoted in knots (true airspeed) and Mach (fraction of speed of sound). A Boeing 737 cruise: ~450 knots ≈ 833 km/h ≈ Mach 0.78.

### Running and athletics

Athletes track in **min/km** (pace) — see the Pace Calculator. 5:00 min/km = 12 km/h = 3.33 m/s. Conversion:

```
pace (min/km) = 60 / speed (km/h)
```

### Wind speed

Reported variously:

- Indian weather: km/h
- Aviation METAR: knots
- US weather: mph
- Beaufort scale: descriptive (gentle breeze, gale, hurricane)

Cyclone categories (India Meteorological Department):

- Cyclonic storm: 62–88 km/h
- Severe cyclonic storm: 89–117 km/h
- Very severe: 118–166 km/h
- Extremely severe: 167–221 km/h
- Super cyclonic: 222+ km/h

## Worked example: stopping distance

A car at 80 km/h has stopping distance ≈ 56 m. At 100 km/h ≈ 88 m. Stopping distance grows roughly with **speed squared** — doubling speed quadruples the stopping distance. This is why expressway speed enforcement matters more than urban.

Convert 80 km/h to m/s for physics:

```
80 km/h ÷ 3.6 = 22.2 m/s
Reaction distance (1 second reaction) = 22.2 m
Braking distance (0.7g deceleration) = 22.2² / (2 × 6.86) = 36 m
Total stopping = 22.2 + 36 = 58 m
```

## Considerations

- **Speed vs velocity.** In physics, speed is a scalar (just magnitude); velocity includes direction. Speed converters handle scalars only.
- **True speed vs ground speed (aviation).** A plane has airspeed (relative to air) and ground speed (relative to ground). Wind makes them differ.
- **Mach number.** Speed / speed of sound at altitude. Speed of sound varies with temperature (343 m/s at 20°C, less at altitude).
- **Light speed (c).** ~3 × 10⁸ m/s. Nothing with rest mass can reach it. Most everyday speeds are << c so Newtonian physics applies.

## Limitations

- Doesn't compute average speed over a journey (use distance / time math, or a Pace Calculator for running).
- Doesn't convert acceleration units (m/s² vs g).
- Doesn't account for relativistic effects (only matters at >10% of light speed).
- Wind / current adjustments must be done separately.

## Related calculators

- **[Pace Calculator](/calculator/pace)** — min/km running pace ↔ speed
- **[Length](/calculator/length)** — distance unit conversion
- **[Time](/calculator/time-units)** — time unit conversion
- **[Fuel Efficiency](/calculator/fuel-efficiency)** — km/L, mpg
- **[Travel Time](/calculator/travel-time)** — distance ÷ speed

---

**Final note.** Speed conversions matter most in three places: **road driving** (km/h ↔ mph for travel abroad), **fitness** (m/s ↔ min/km for runners), and **aviation/marine** (knots, the global standard). Pick the unit your audience uses — Indian readers prefer km/h, US readers mph, runners min/km, pilots knots. The math is identical; the convention is what changes.
