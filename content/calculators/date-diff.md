## What is a date difference calculator?

A **date difference calculator** computes the number of days, weeks, months, or years between two calendar dates. It accounts for **leap years**, **different month lengths**, and calendar reality — unlike a fixed-factor time unit converter which assumes "1 month = 30.44 days".

Use cases include:

- Days remaining until a deadline
- Age in days
- Duration of an event
- Notice period or contract length
- Loan tenure
- Travel itinerary length

## How is the difference calculated?

The calculator uses each date's absolute day count (epoch-based) and subtracts:

```
diff_in_days = abs(date_2 - date_1) / 86,400,000   (in JS)
```

For months and years, it walks the calendar:

- **Years between**: full years that have elapsed (birthday-style)
- **Months remainder**: full months past the last year boundary
- **Days remainder**: full days past the last month boundary

Result example for 15 Jan 2020 → 1 Jul 2026:

```
6 years, 5 months, 16 days
or 2,358 days
or ~336.9 weeks
or ~77.5 months
```

## Worked example

How many days is **2 March 2026 to 31 December 2026**?

```
March (29 remaining) + April (30) + May (31) + June (30) +
July (31) + August (31) + September (30) + October (31) +
November (30) + December (31) = 304 days
```

In our calculator: pick the two dates → result is **304 days, ~43 weeks, ~10 months**.

## Leap year handling

Years divisible by 4 are leap years, with an exception:

- Divisible by 100 → NOT a leap year
- UNLESS divisible by 400 → IS a leap year

Examples:

- 2024 → leap (÷ 4, not ÷ 100)
- 2100 → not leap (÷ 100, not ÷ 400)
- 2000 → leap (÷ 400)

This matters for date math around 29 February. If you compute "days from 29 Feb 2024 to 28 Feb 2025", you get 365 (a year minus one day, since 2024 is the leap and 2025 isn't).

## Business days vs calendar days

Many contracts and payment terms are quoted in **business days** (Monday-Friday, excluding holidays):

```
T+1 settlement (Indian stock market) — next business day
Net 30 — invoice due in 30 calendar days
30 business days — about 6 weeks (excluding weekends)
```

Approximation: **5 business days = 7 calendar days** (a week). So 60 business days ≈ 84 calendar days ≈ 12 weeks.

For exact business-day math (excluding public holidays), use the [Working Days](/calculator/working-days) calculator.

## Common use cases

### Notice periods

Indian IT typically has 60-90 days notice. If you resign on 1 June 2026 with a 60-day notice:

```
1 June + 60 days = 31 July 2026
```

### Project deadlines

A 6-month project starting 15 March 2026:

```
15 March + 6 months = 15 September 2026
```

### Pregnancy due date

Last menstrual period (LMP) + 280 days (40 weeks). Or LMP + 9 months + 7 days (Naegele's rule).

### Travel itineraries

A trip from 5 April to 14 April:

```
14 April - 5 April = 9 days
But that's 10 nights / 10 days inclusive — depends on convention
```

This is a common bug: "trip duration" can mean nights, days inclusive, or days exclusive of return.

### Loan tenure

A 20-year home loan starting 1 January 2020:

```
20 years from 1 Jan 2020 = 1 Jan 2040
Monthly EMI for 240 months
```

## Components and inputs

### Start date and end date

Pick from the calendar widget. The calculator handles any order — it always returns the absolute difference.

### Output formats

- **Days** — most precise
- **Weeks** — days / 7
- **Months** — calendar months (variable length)
- **Years, months, days** — breakdown (most useful for ages and durations)
- **Total business days** _(optional)_ — excluding weekends only

### Include or exclude end date

Convention varies:

- **Inclusive** — count both start and end (e.g., "from Monday to Wednesday is 3 days")
- **Exclusive of end** — start counts, end doesn't (e.g., "Wednesday - Monday = 2 days")

For loan tenure, durations, and most contracts: use **calendar difference** (end - start), which counts neither inclusively.

For event counts (e.g., "how many days am I on holiday"): **inclusive** is usually what people mean.

## Variants by region and use case

### Indian financial year

April 1 to March 31. Years are referenced as "FY 2025-26" (April 2025 to March 2026). If a tax provision says "180 days in a financial year", it means within that April–March window.

### Calendar year

January 1 to December 31. Used for tax assessment year (AY 2026-27 corresponds to FY 2025-26).

### Academic year

Variable by country. India: typically April–March (school), August–July (university). Different from financial year by school district.

### Visa overstays

Calculated in calendar days from visa expiry to departure date. **Day 1 of overstay = day after visa expiry**, not the expiry date itself.

## Worked example: 90-day visa

You arrive on 10 February 2026 on a 90-day tourist visa. When must you leave?

```
10 February + 90 days = 11 May 2026
But day 1 is 10 February (entry day counts) → must leave by 10 May 2026
```

Always check the exact rule for the specific visa; some count "from the day after arrival".

## Considerations

- **Inclusive vs exclusive matters.** Always check whether the rule counts start day, end day, or both.
- **Leap year complications.** A "year" added to 29 February becomes 28 February in non-leap years.
- **DST does not affect calendar days.** Daylight Saving Time changes clock-time but not the day count.
- **Timezone caveat.** If the two dates are in different time zones, fix the timezone first (use UTC for unambiguous math).

## Limitations

- Doesn't exclude public holidays automatically (use [Working Days](/calculator/working-days) for that).
- Doesn't handle BC dates (Gregorian calendar only; pre-1582 dates use Julian which the calculator doesn't model).
- Doesn't add a duration to a date (use the [Date Add Calculator](/calculator/date-add) for "X days from today").
- Doesn't compute "calendar months" the way some accounting systems do (e.g., "30 days = 1 month" in some interest calculations).

## Related calculators

- **[Age Calculator](/calculator/age)** — years/months/days since birth
- **[Working Days](/calculator/working-days)** — excludes weekends and holidays
- **[Date Add](/calculator/date-add)** — date + duration → new date
- **[Time Units](/calculator/time-units)** — fixed-factor time unit conversion
- **[Time Between Cities](/calculator/timezone-converter)** — timezone-aware

---

**Final note.** Date math is full of small traps: leap years, end-day inclusivity, time zones. For any **contract**, **tax**, or **immigration** calculation, double-check the wording of the rule — "within 180 days" and "for 180 days" can mean different things. When precision matters, use this calculator alongside the source document, not as a substitute for legal advice.
