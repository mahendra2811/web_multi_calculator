# All Calculators — Inputs & Formula Structure

Quick reference for all 65 calculators across 6 categories.

---

## Finance (24)

### 1. SIP Calculator

- **Inputs:** monthly amount (P), annual rate (r%), years (n)
- **Formula:** `FV = P × [((1+i)^N − 1) / i] × (1+i)` where `i = r/12/100`, `N = n×12`

### 2. Lumpsum

- **Inputs:** principal (P), rate (r%), years (n)
- **Formula:** `FV = P × (1 + r/100)^n`

### 3. EMI Calculator

- **Inputs:** loan (P), annual rate (r%), tenure months (n)
- **Formula:** `EMI = P × i × (1+i)^n / ((1+i)^n − 1)` where `i = r/12/100`

### 4. Simple Interest

- **Inputs:** principal (P), rate (r%), time (t years)
- **Formula:** `SI = P × r × t / 100`; Total = P + SI

### 5. Compound Interest

- **Inputs:** P, rate (r%), time (t), compounds/year (n)
- **Formula:** `A = P × (1 + r/(n×100))^(n×t)`

### 6. FD / RD

- **Inputs:** deposit, rate, tenure, compounding (FD) or monthly deposit (RD)
- **Formula:** FD → `A = P(1 + r/n)^(nt)`; RD → `A = Σ P(1+i)^(N−k)` quarterly compound

### 7. PPF

- **Inputs:** yearly deposit, tenure (15y), rate (~7.1%)
- **Formula:** `A = Σ yearlyDeposit × (1+r)^(15−k)` for k = 1..15

### 8. Currency Converter

- **Inputs:** amount, fromCurrency, toCurrency, live rate
- **Formula:** `result = amount × rate(from→to)`

### 9. GST

- **Inputs:** amount, GST%, mode (inclusive/exclusive)
- **Formula:** Exclusive → `GST = amt × r/100`; Inclusive → `GST = amt − amt/(1+r/100)`

### 10. Profit & Loss

- **Inputs:** cost price, selling price
- **Formula:** `P/L = SP − CP`; `% = (P/L)/CP × 100`

### 11. Discount

- **Inputs:** MRP, discount%
- **Formula:** `Saving = MRP × d/100`; `Final = MRP − Saving`

### 12. Salary

- **Inputs:** CTC, basic%, HRA, deductions
- **Formula:** `In-hand = CTC − (PF + tax + professional tax + ...)`

### 13. Income Tax

- **Inputs:** gross income, regime (old/new), deductions
- **Formula:** Slab-based: `tax = Σ (slab_amount × slab_rate)` + cess 4%

### 14. Mortgage

- **Inputs:** loan amount, rate, tenure
- **Formula:** Same as EMI; Total interest = `EMI × n − P`

### 15. Retirement Planner

- **Inputs:** current age, retire age, monthly expense, inflation, return%
- **Formula:** `Corpus = futureExpense × 12 × yearsAfterRetire / (return − infl)`

### 16. ROI

- **Inputs:** invested amount, final value, years
- **Formula:** `ROI% = ((final − invested)/invested) × 100`; annualized = CAGR

### 17. NPS

- **Inputs:** monthly contribution, age, retire age, return%
- **Formula:** SIP formula → corpus; 60% lump + 40% annuity payout

### 18. CAGR

- **Inputs:** begin value, end value, years (n)
- **Formula:** `CAGR = (end/begin)^(1/n) − 1`

### 19. HRA

- **Inputs:** basic, HRA received, rent paid, metro/non-metro
- **Formula:** `Exempt = min(HRA, rent − 10% basic, 50%/40% basic)`

### 20. Gratuity

- **Inputs:** last salary, years of service
- **Formula:** `Gratuity = (last_salary × 15 × years) / 26`

### 21. EPF

- **Inputs:** basic salary, employee%, employer%, rate, years
- **Formula:** Monthly contribution compounded → `FV = Σ contrib × (1+i)^(N−k)`

### 22. Home Loan vs Rent

- **Inputs:** home price, loan tenure, rate, rent, appreciation
- **Formula:** Compare `Σ EMI + maintenance − appreciation` vs `Σ rent + invested savings`

### 23. Net Worth

- **Inputs:** assets list, liabilities list
- **Formula:** `Net Worth = Σ assets − Σ liabilities`

### 24. Break-Even

- **Inputs:** fixed cost, variable cost/unit, selling price/unit
- **Formula:** `BEP units = FC / (SP − VC)`

---

## Math (12)

### 25. Basic

- **Inputs:** two numbers, operator
- **Formula:** `a + b`, `a − b`, `a × b`, `a / b`

### 26. Scientific

- **Inputs:** expression string
- **Formula:** evaluates with trig/log/exp via mathjs

### 27. Percentage

- **Inputs:** value, percent
- **Formula:** `(p/100) × v`; change = `((new−old)/old)×100`

### 28. Fraction

- **Inputs:** two fractions, operator
- **Formula:** `a/b ± c/d = (ad ± bc)/bd`; simplify via GCD

### 29. Number System

- **Inputs:** number, from base, to base
- **Formula:** `parseInt(n, from).toString(to)` (bin/oct/dec/hex)

### 30. Prime Checker

- **Inputs:** integer N
- **Formula:** check `i² ≤ N` for divisors; factorize via trial division

### 31. GCD / LCM

- **Inputs:** two integers
- **Formula:** GCD via Euclidean `gcd(a,b)=gcd(b, a%b)`; `LCM = a×b/GCD`

### 32. Statistics

- **Inputs:** number list
- **Formula:** mean=Σx/n, median=middle, σ=√(Σ(x−μ)²/n)

### 33. Matrix

- **Inputs:** two matrices, op (add/mul/det)
- **Formula:** add/mul element-wise / row×col; det via cofactor expansion

### 34. Quadratic

- **Inputs:** a, b, c
- **Formula:** `x = (−b ± √(b² − 4ac)) / 2a`

### 35. Logarithm

- **Inputs:** value, base
- **Formula:** `log_b(x) = ln(x)/ln(b)`

### 36. Permutation & Combination

- **Inputs:** n, r
- **Formula:** `nPr = n!/(n−r)!`; `nCr = n!/(r!(n−r)!)`

---

## Health (8)

### 37. BMI

- **Inputs:** weight (kg), height (m)
- **Formula:** `BMI = w / h²`

### 38. BMR

- **Inputs:** gender, age, weight, height
- **Formula (Mifflin-St Jeor):** `M: 10w + 6.25h − 5a + 5`; `F: 10w + 6.25h − 5a − 161`

### 39. Calorie Needs (TDEE)

- **Inputs:** BMR, activity factor
- **Formula:** `TDEE = BMR × activityMultiplier (1.2–1.9)`

### 40. Body Fat %

- **Inputs:** gender, height, neck, waist, hip (F)
- **Formula:** US Navy log-based equation using circumferences

### 41. Ideal Weight

- **Inputs:** height, gender
- **Formula (Devine):** `M: 50 + 2.3×(inches−60)`; `F: 45.5 + 2.3×(inches−60)`

### 42. Water Intake

- **Inputs:** weight, activity level
- **Formula:** `L/day ≈ weight(kg) × 0.033 + activity bonus`

### 43. Pregnancy Due Date

- **Inputs:** LMP date, cycle length
- **Formula (Naegele's rule):** `EDD = LMP + 280 days`

### 44. Macro Splitter

- **Inputs:** total calories, %P / %C / %F
- **Formula:** `P_g = cal×%P/4`, `C_g = cal×%C/4`, `F_g = cal×%F/9`

---

## Converters (10)

All converters: **Inputs:** value, fromUnit, toUnit. **Formula:** `result = value × (factor_from / factor_to)` relative to SI base.

### 45. Length

- Base: meter (m, km, ft, in, mi, yd...)

### 46. Mass / Weight

- Base: kg (kg, g, lb, oz, ton...)

### 47. Temperature (non-linear)

- **Formula:** `°F = °C×9/5+32`; `K = °C+273.15`

### 48. Area

- Base: m² (m², ft², acre, hectare...)

### 49. Volume

- Base: liter (L, mL, gal, m³...)

### 50. Speed

- Base: m/s (km/h, mph, m/s, knot...)

### 51. Time Units

- Base: second (s, min, hr, day, week...)

### 52. Data Storage

- Base: byte (B, KB, MB, GB, TB; binary 1024)

### 53. Energy

- Base: joule (J, kJ, kWh, cal, kcal...)

### 54. Pressure

- Base: Pa (Pa, bar, psi, atm, mmHg...)

---

## Date & Time (5)

### 55. Age

- **Inputs:** birth date, today
- **Formula:** diff in years/months/days using calendar math

### 56. Date Difference

- **Inputs:** date1, date2
- **Formula:** `|date2 − date1| / msPerDay`

### 57. Add / Subtract Days

- **Inputs:** date, days/months/years, op
- **Formula:** `new Date(d.setDate(d.getDate() ± n))`

### 58. Working Days

- **Inputs:** start, end, holidays[]
- **Formula:** total days − weekends − holidays

### 59. Time Zone Converter

- **Inputs:** datetime, fromTZ, toTZ
- **Formula:** offset diff via `Intl.DateTimeFormat`

---

## Crypto & Stock (6)

### 60. Crypto Profit

- **Inputs:** entry price, exit price, quantity, fees
- **Formula:** `PnL = (exit−entry)×qty − fees`; `% = PnL/(entry×qty)×100`

### 61. Staking Yield

- **Inputs:** principal, APY%, days
- **Formula:** `Reward = P × (1+APY/100)^(days/365) − P`

### 62. DCA (Dollar-Cost Averaging)

- **Inputs:** per-period amount, frequency, prices[]
- **Formula:** `avg = Σ(amt)/Σ(amt/price)`; PnL = (current − avg)×totalQty

### 63. Stock Average

- **Inputs:** existing qty/price, new qty/price
- **Formula:** `avg = (q1×p1 + q2×p2)/(q1+q2)`

### 64. P/E Ratio

- **Inputs:** price/share, EPS
- **Formula:** `P/E = price / EPS`

### 65. Position Size

- **Inputs:** account size, risk%, entry, stop loss
- **Formula:** `units = (account × risk%) / |entry − stop|`

---

## Summary

| Category   | Count  |
| ---------- | ------ |
| Finance    | 24     |
| Math       | 12     |
| Health     | 8      |
| Converters | 10     |
| Date/Time  | 5      |
| Crypto     | 6      |
| **Total**  | **65** |
