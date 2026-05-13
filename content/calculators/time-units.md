## What is a time units converter?

A **time units converter** translates between units of duration — seconds, minutes, hours, days, weeks, months, years, decades, centuries. It also handles smaller units (milliseconds, microseconds, nanoseconds) for software, physics, and electronics work.

Most time conversions are straightforward arithmetic (60 seconds = 1 minute), but the larger units carry **traps**: months have 28-31 days, years have 365 or 366, "business days" exclude weekends and holidays. This calculator handles fixed conversions; for date arithmetic ("how many days between two dates"), use the [Date Difference calculator](/calculator/date-diff).

## Unit conversion table

| Unit               | In seconds     | Notes             |
| ------------------ | -------------- | ----------------- |
| 1 nanosecond (ns)  | 10⁻⁹ s         | CPU clock cycles  |
| 1 microsecond (μs) | 10⁻⁶ s         | Network latency   |
| 1 millisecond (ms) | 10⁻³ s         | Web request times |
| 1 second (s)       | 1              | SI base unit      |
| 1 minute           | 60             |                   |
| 1 hour             | 3,600          |                   |
| 1 day              | 86,400         | 24 × 3,600        |
| 1 week             | 604,800        | 7 days            |
| 1 month (avg)      | ~2,629,800     | 30.44 days        |
| 1 year (Julian)    | 31,557,600     | 365.25 days       |
| 1 year (common)    | 31,536,000     | 365 days          |
| 1 decade           | ~315,576,000   | 10 years          |
| 1 century          | ~3,155,760,000 | 100 years         |

## Worked example

Convert **2 hours 45 minutes** to seconds:

```
2 hours × 3,600 = 7,200 seconds
45 minutes × 60 = 2,700 seconds
Total = 7,200 + 2,700 = 9,900 seconds
```

Convert **86,400 seconds** to days:

```
86,400 / 86,400 = 1 day
```

Convert **1 year** to minutes:

```
365 × 24 × 60 = 525,600 minutes
```

(Yes — the "525,600 minutes" from the musical _Rent_ counts a non-leap year.)

## Common conversions

| Conversion       | Result        | Use case                             |
| ---------------- | ------------- | ------------------------------------ |
| 1 day → hours    | 24            | Daily planning                       |
| 1 week → hours   | 168           | Working hours per week               |
| 1 month → hours  | ~730          | Salary hourly conversion             |
| 1 year → hours   | 8,760         | Annual energy bills                  |
| 1 year → seconds | ~31.5 million | Roughly π × 10⁷ — a physics mnemonic |
| 1 century → days | 36,525        | Includes leap years                  |

## Components and inputs

### Source unit and target unit

Select what you have and what you want. The calculator does the conversion factor lookup automatically.

### Value

The number in the source unit. Decimals are allowed (e.g., 2.5 hours = 9,000 seconds).

### Result

Displayed in the target unit, with full precision and rounded display.

## Variants and edge cases

### Month — variable definition

- **30.44 days (avg)** — used by financial calculations, Excel
- **30 days** — used by simple-interest day-count conventions
- **30 or 31 days (actual)** — for calendar-based date math
- **28 or 29 days (Feb)** — leap year handling

When precision matters (interest accrual, contract durations), use **actual days** not average months. The [Date Difference](/calculator/date-diff) calculator handles that.

### Year — variable definition

- **365 days** — common year (most calculations)
- **365.25 days (Julian)** — astronomy and physics
- **365.2422 days (tropical)** — astronomy / Earth's orbit
- **365 or 366 days (Gregorian)** — calendar reality

### Working time

- **Business day** = 8 hours (typical) but varies by jurisdiction
- **Working week** = 40 hours (US), 48 hours (India statutory cap), 35 hours (France)
- **Working month** = ~22 business days (excluding weekends)
- **Working year** = ~250–260 business days (excluding weekends + public holidays)

For salary-to-hourly conversion: annual salary / (52 weeks × hours-per-week) = hourly rate. ₹6 lakh / (52 × 40) = ₹288/hour. Or use the [Salary Calculator](/calculator/salary).

## Common applications

| Use case                 | Conversion                              |
| ------------------------ | --------------------------------------- |
| Annual salary → hourly   | Salary / (52 weeks × hrs/week)          |
| Software request latency | ms or μs                                |
| Project duration         | Days or weeks                           |
| Loan tenure              | Months or years                         |
| Childcare / leave        | Weeks or months                         |
| Cosmic timescales        | Millions of years (Myr), billions (Gyr) |
| CPU clock                | GHz = 10⁹ Hz → 1 cycle = 1 ns           |

## Worked example: project planning

A project is estimated at **6 weeks of work for 3 engineers (full-time)**. What's the total person-hours?

```
6 weeks × 5 working days × 8 hours = 240 hours per person
240 hours × 3 engineers = 720 person-hours
```

If you're billing at ₹2,000/hour for outsourced contractors:

```
720 hours × ₹2,000 = ₹14.4 lakh
```

This is why estimates compound — multiplying out weeks → hours → cost surfaces the magnitude quickly.

## Software engineering specifics

Latency units developers care about:

| Operation                            | Typical time |
| ------------------------------------ | ------------ |
| L1 cache hit                         | 1 ns         |
| L2 cache hit                         | 4 ns         |
| Main memory access                   | 100 ns       |
| SSD read (4 KB)                      | 150 μs       |
| HDD seek                             | 10 ms        |
| Network round-trip (same region)     | 1–5 ms       |
| Network round-trip (cross-continent) | 100–200 ms   |
| Disk read (sequential, 1 MB)         | 1 ms         |

Remember: humans perceive **>100 ms** as laggy. Web pages should respond to interactions in <100 ms. Page loads should be <3 seconds. Anything in **microseconds or nanoseconds** is invisible to users — that's CPU / memory territory.

## Considerations

- **Leap seconds.** UTC has had 27 leap seconds inserted since 1972. Most code ignores them; high-precision astronomy does not.
- **Time zones don't affect duration.** "2 hours from now" is 2 hours regardless of timezone. Time zones only affect _clock readings_ (date and time-of-day).
- **Calendar months ≠ 30 days.** If a contract says "delivery in 3 months", that's ~91 days, not 90.
- **Year start.** Financial year in India is April 1 – March 31. Calendar year is January 1 – December 31. Contracts must specify.

## Limitations

- The calculator handles **fixed-factor conversions** only. For "how many days from 1 Jan 2026 to 1 Jul 2026" — use the [Date Difference Calculator](/calculator/date-diff).
- No business-day awareness — weekends and holidays are not excluded.
- No timezone arithmetic — use a dedicated [Timezone Converter](/calculator/timezone-converter).
- "Light-year" is a distance, not a time (about 9.46 × 10¹⁵ m). It's frequently confused; the converter doesn't handle it.

## Related calculators

- **[Date Difference](/calculator/date-diff)** — calendar-aware days between two dates
- **[Age Calculator](/calculator/age)** — years/months/days from a birth date
- **[Working Days](/calculator/working-days)** — excludes weekends and holidays
- **[Timezone Converter](/calculator/timezone-converter)** — UTC offsets
- **[Salary](/calculator/salary)** — annual ↔ monthly ↔ hourly
- **[Pace](/calculator/pace)** — running time-per-distance

---

**Final note.** Time arithmetic looks trivial but has hidden complexity in larger units (months, years) and contexts (business days, leap years). When precision matters — contracts, payroll, interest — always use **actual calendar days** via the Date Difference calculator. This time-units converter handles fixed factors; the calendar calculator handles real-world dates.
