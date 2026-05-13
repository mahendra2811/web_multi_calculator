# All Calculators — Inputs & Formula Structure

Complete reference for every calculator in the project, grouped by category.

Two implementation styles exist:

- **[Component]** — full custom React component (rich UI, charts, 3D)
- **[Schema]** — schema-driven calculator generated from a declarative spec

---

## 1. Finance — Core (24) [Component]

### 1. SIP Calculator

- **Inputs:** monthly amount, annual rate%, years
- **Formula:** `FV = P × [((1+i)^N − 1)/i] × (1+i)` where `i = r/12/100`, `N = n×12`

### 2. Lumpsum

- **Inputs:** principal, rate%, years
- **Formula:** `FV = P × (1 + r/100)^n`

### 3. EMI Calculator

- **Inputs:** loan, annual rate%, tenure months
- **Formula:** `EMI = P × i × (1+i)^n / ((1+i)^n − 1)`

### 4. Simple Interest

- **Inputs:** principal, rate%, years
- **Formula:** `SI = P × r × t / 100`

### 5. Compound Interest

- **Inputs:** P, rate%, time, compounds/year
- **Formula:** `A = P × (1 + r/(n×100))^(n×t)`

### 6. FD / RD

- **Inputs:** deposit, rate, tenure, compounding (FD) or monthly deposit (RD)
- **Formula:** FD → `A = P(1+r/n)^(nt)`; RD → `A = Σ P(1+i)^(N−k)`

### 7. PPF

- **Inputs:** yearly deposit, tenure (15y), rate (~7.1%)
- **Formula:** `A = Σ yearlyDeposit × (1+r)^(15−k)`

### 8. Currency Converter

- **Inputs:** amount, fromCurrency, toCurrency
- **Formula:** `result = amount × rate(from→to)` (live FX)

### 9. GST

- **Inputs:** amount, GST%, inclusive/exclusive
- **Formula:** Exclusive → `GST = amt × r/100`; Inclusive → `GST = amt − amt/(1+r/100)`

### 10. Profit & Loss

- **Inputs:** cost price, selling price
- **Formula:** `P/L = SP − CP`; `% = (P/L)/CP × 100`

### 11. Discount

- **Inputs:** MRP, discount%
- **Formula:** `Saving = MRP × d/100`; `Final = MRP − Saving`

### 12. Salary

- **Inputs:** CTC, basic%, HRA, deductions
- **Formula:** `In-hand = CTC − (PF + tax + professional tax + …)`

### 13. Income Tax

- **Inputs:** gross income, regime (old/new), deductions
- **Formula:** Slab-based: `tax = Σ slab_amount × slab_rate + 4% cess`

### 14. Mortgage

- **Inputs:** loan, rate, tenure
- **Formula:** Same as EMI; `Total interest = EMI × n − P`

### 15. Retirement Planner

- **Inputs:** current age, retire age, monthly expense, inflation, return%
- **Formula:** `Corpus = futureExpense × 12 × yearsAfterRetire / (return − infl)`

### 16. ROI

- **Inputs:** invested amount, final value, years
- **Formula:** `ROI% = ((final − invested)/invested) × 100`

### 17. NPS

- **Inputs:** monthly contribution, age, retire age, return%
- **Formula:** SIP corpus → 60% lump + 40% annuity

### 18. CAGR

- **Inputs:** begin value, end value, years
- **Formula:** `CAGR = (end/begin)^(1/n) − 1`

### 19. HRA

- **Inputs:** basic, HRA received, rent paid, metro/non-metro
- **Formula:** `Exempt = min(HRA, rent − 10% basic, 50%/40% basic)`

### 20. Gratuity

- **Inputs:** last salary, years of service
- **Formula:** `Gratuity = (last_salary × 15 × years) / 26`

### 21. EPF

- **Inputs:** basic salary, employee%, employer%, rate, years
- **Formula:** `FV = Σ contrib × (1+i)^(N−k)`

### 22. Home Loan vs Rent

- **Inputs:** home price, tenure, rate, rent, appreciation
- **Formula:** Compare `Σ EMI + maintenance − appreciation` vs `Σ rent + invested savings`

### 23. Net Worth

- **Inputs:** assets list, liabilities list
- **Formula:** `Net Worth = Σ assets − Σ liabilities`

### 24. Break-Even

- **Inputs:** fixed cost, variable cost/unit, selling price/unit
- **Formula:** `BEP units = FC / (SP − VC)`

---

## 2. Finance — Global (42) [Schema]

### 25. Amortization

- **Inputs:** loan, rate, years
- **Formula:** `EMI = P·r·(1+r)^n / ((1+r)^n − 1)` + month-1 schedule

### 26. Mortgage Payoff

- **Inputs:** balance, rate, current EMI, extra monthly
- **Formula:** Iterate `bal = bal·(1+r) − pay` until 0; compare with baseline

### 27. Refinance

- **Inputs:** balance, old rate, new rate, years, fees
- **Formula:** Compute EMI old/new; `break-even = fees / monthlySaving`

### 28. House Affordability

- **Inputs:** income, debt, DTI%, rate, years, down%
- **Formula:** `maxEMI = income×DTI − debt`; back-solve max loan via EMI formula

### 29. Rent Affordability

- **Inputs:** income, other debt, max rent %
- **Formula:** `maxRent = income × rentPct/100`

### 30. Down Payment

- **Inputs:** price, down%
- **Formula:** `down = price × down%/100`; `loan = price − down`; `LTV = 100 − down%`

### 31. Rent vs Buy

- **Inputs:** price, down%, loan rate, tenure, rent, growth, return, appreciation
- **Formula:** Simulate monthly EMI vs rent + invested-difference; compare net worth

### 32. APR (with fees)

- **Inputs:** loan, fees, nominal rate, years
- **Formula:** Bisection to find rate where `PV(EMIs) = loan − fees`

### 33. Auto Loan

- **Inputs:** vehicle price, down, trade-in, rate, years
- **Formula:** `loan = price − down − tradeIn`; standard EMI

### 34. Auto Lease

- **Inputs:** MSRP, residual, money factor, months
- **Formula:** `payment = (MSRP−residual)/months + (MSRP+residual)×MF`

### 35. Credit Card Payoff

- **Inputs:** balance, APR, monthly payment
- **Formula:** Iterate `bal = bal(1+r) − pay` until 0

### 36. Credit Card Min Payment

- **Inputs:** balance, APR, min payment %
- **Formula:** Iterate with `pay = max(bal × minPct%, interest+100)`

### 37. Debt Snowball

- **Inputs:** total debt, avg APR, monthly payment
- **Formula:** Iterate until balance = 0; track interest

### 38. Debt Consolidation

- **Inputs:** current debt, old APR, new APR, years
- **Formula:** Old EMI vs new EMI; monthly saving

### 39. DTI Ratio

- **Inputs:** monthly debt, monthly income
- **Formula:** `DTI = debt/income × 100`; verdict by bands

### 40. Student Loan

- **Inputs:** loan, rate, years
- **Formula:** Standard EMI

### 41. College Cost

- **Inputs:** annual cost, inflation%, years away, duration
- **Formula:** Inflate by `(1+r)^yearsAway`; sum across duration

### 42. Payback Period

- **Inputs:** invested, annual cash flow
- **Formula:** `years = invested / cashFlow`

### 43. NPV

- **Inputs:** initial outflow, discount rate, cash flows[]
- **Formula:** `NPV = −C₀ + Σ CFₜ / (1+r)^t`

### 44. IRR

- **Inputs:** initial outflow, cash flows[]
- **Formula:** Bisection: find r where NPV = 0

### 45. Present Value

- **Inputs:** FV, rate, years
- **Formula:** `PV = FV / (1+r)^n`

### 46. Future Value

- **Inputs:** PV, rate, years
- **Formula:** `FV = PV × (1+r)^n`

### 47. Annuity FV

- **Inputs:** payment, rate/period, periods
- **Formula:** `FV = PMT × ((1+r)^n − 1)/r`

### 48. Annuity Payout

- **Inputs:** corpus, annual return, payout years
- **Formula:** `PMT = corpus×r / (1−(1+r)^−n)`

### 49. Bond

- **Inputs:** face, coupon%, YTM%, years
- **Formula:** `Price = Σ C/(1+y)^t + F/(1+y)^n`

### 50. Mutual Fund Returns

- **Inputs:** invested, NAV start, NAV now, years
- **Formula:** `units = inv/NAVstart`; `current = units × NAVnow`; CAGR

### 51. Inflation

- **Inputs:** today's amount, inflation rate, years
- **Formula:** `future = amount × (1+r)^n`

### 52. Sales Tax

- **Inputs:** amount, tax%
- **Formula:** `tax = amt × r/100`; `total = amt + tax`

### 53. VAT

- **Inputs:** amount, VAT%, inclusive toggle
- **Formula:** Exclusive: `tax = amt × r%`; Inclusive: `base = amt/(1+r%)`

### 54. Tip

- **Inputs:** bill, tip%, people
- **Formula:** `tip = bill × tip%`; `per person = (bill+tip)/people`

### 55. Commission

- **Inputs:** sale, rate%
- **Formula:** `commission = sale × rate/100`

### 56. Margin / Markup

- **Inputs:** cost, selling price
- **Formula:** `margin% = (SP−CP)/SP × 100`; `markup% = (SP−CP)/CP × 100`

### 57. Depreciation (SL / DDB / SYD)

- **Inputs:** cost, salvage, life, method
- **Formula:** SL: `(cost−salvage)/life`; DDB: `2/life × cost`; SYD: `(cost−salvage)×life/(life(life+1)/2)`

### 58. Budget

- **Inputs:** income, rent, food, transport, utilities, other
- **Formula:** `savings = income − Σ expenses`; `rate = savings/income`

### 59. Pension

- **Inputs:** monthly contribution, rate, years to retire, payout years
- **Formula:** Annuity FV → corpus; then annuity payout

### 60. Social Security

- **Inputs:** average salary, years worked
- **Formula:** `monthly = (salary × 1.5% × years) / 12`

### 61. Equipment Lease

- **Inputs:** cost, residual, term months, money factor
- **Formula:** `payment = (cost−residual)/months + (cost+residual)×MF`

### 62. Business Loan

- **Inputs:** loan, rate, years
- **Formula:** Standard EMI

### 63. Personal Loan

- **Inputs:** loan, rate, years
- **Formula:** Standard EMI

### 64. Bike Loan

- **Inputs:** loan, rate, years
- **Formula:** Standard EMI

### 65. Savings Goal

- **Inputs:** target, current, rate, years
- **Formula:** Required `monthly = (target − current·(1+r)^n) × r / ((1+r)^n − 1)`

### 66. Interest Rate Solver

- **Inputs:** loan, EMI, years
- **Formula:** Bisection on EMI formula

### 67. Tenure Solver

- **Inputs:** loan, rate, EMI
- **Formula:** `n = ln(EMI/(EMI − r·P)) / ln(1+r)`

---

## 3. Finance — India Specific (24) [Schema]

### 68. NSC

- **Inputs:** investment, rate, tenure (5/10y)
- **Formula:** `maturity = P × (1+r)^t`

### 69. KVP

- **Inputs:** investment, rate
- **Formula:** Doubling time = `72/r` (Rule of 72)

### 70. SSY (Sukanya Samriddhi)

- **Inputs:** yearly deposit, rate, deposit years
- **Formula:** Compound yearly for 21 years (deposit only first 15)

### 71. APY (Atal Pension)

- **Inputs:** age, desired pension/mo
- **Formula:** Table-based monthly contribution lookup

### 72. SCSS

- **Inputs:** investment, rate
- **Formula:** `annual = P × r/100`; quarterly = annual/4

### 73. POMIS

- **Inputs:** investment, rate
- **Formula:** `monthly = P × r/100/12`

### 74. EPF Final

- **Inputs:** basic+DA, balance, current age, retire age, growth%
- **Formula:** Monthly contribution (12%+3.67%) compounded at 8.15% with salary growth

### 75. NPS Withdrawal

- **Inputs:** corpus at 60, annuity rate
- **Formula:** `lump = 60%`; `pension = 40% × rate/12`

### 76. LTCG Equity

- **Inputs:** buy, sell, qty
- **Formula:** `gain − ₹1.25L exempt`; tax @ 12.5%

### 77. STCG Equity

- **Inputs:** buy, sell, qty
- **Formula:** `tax = gain × 20%`

### 78. Property Gains (indexed)

- **Inputs:** buy, sell, buy year, sell year
- **Formula:** `indexed = buy × 1.06^years`; tax @ 20% on `(sell − indexed)`

### 79. Advance Tax

- **Inputs:** income, deduction, regime
- **Formula:** Slab tax × {15%, 45%, 75%, 100%} due dates

### 80. TDS

- **Inputs:** amount, TDS rate
- **Formula:** `tds = amount × rate/100`

### 81. Section 80C

- **Inputs:** PPF, ELSS, EPF, life insurance, home principal
- **Formula:** `min(total, ₹1.5L) × slab%`

### 82. Regime Compare (Old vs New)

- **Inputs:** income, old-regime deductions
- **Formula:** Compute both regimes' tax; pick lower

### 83. Form 16 / In-hand

- **Inputs:** CTC, regime
- **Formula:** `in-hand = CTC − employer EPF − employee EPF − tax`

### 84. XIRR

- **Inputs:** cash flows, years per step
- **Formula:** Bisection: rate where NPV(irregular CF) = 0

### 85. SWP

- **Inputs:** corpus, monthly withdrawal, return%
- **Formula:** Iterate `bal = bal(1+r) − w` until exhausted

### 86. STP

- **Inputs:** source corpus, monthly transfer, equity growth, months
- **Formula:** Each month: `equity = (equity + transfer)(1+r)`

### 87. ELSS

- **Inputs:** annual invest, return%, years, slab
- **Formula:** Annual compound + tax saved on first ₹1.5L

### 88. Step-up SIP

- **Inputs:** initial monthly, step-up%, return%, years
- **Formula:** SIP with annual step-up multiplier

### 89. SGB

- **Inputs:** grams, price/g, tenure, growth%
- **Formula:** Maturity = `grams × price × (1+g)^t` + 2.5% yearly interest

### 90. Stamp Duty

- **Inputs:** price, stamp%, registration%
- **Formula:** `stamp + reg = price × (stampPct + regPct)/100`

### 91. Brokerage (India)

- **Inputs:** buy value, sell value, brokerage%, segment
- **Formula:** Brokerage (capped ₹40) + STT + GST 18% + misc

---

## 4. Math — Core (12) [Component]

### 92. Basic

- **Inputs:** two numbers, operator
- **Formula:** `a + b`, `a − b`, `a × b`, `a / b`

### 93. Scientific

- **Inputs:** expression
- **Formula:** Evaluated via mathjs (trig/log/exp/etc.)

### 94. Percentage

- **Inputs:** value, percent
- **Formula:** `(p/100) × v`; change = `((new−old)/old)×100`

### 95. Fraction

- **Inputs:** two fractions, operator
- **Formula:** `a/b ± c/d = (ad ± bc)/bd`; simplify via GCD

### 96. Number System

- **Inputs:** number, from base, to base
- **Formula:** `parseInt(n, from).toString(to)`

### 97. Prime Checker

- **Inputs:** integer N
- **Formula:** Trial division to `√N`; factorize

### 98. GCD / LCM

- **Inputs:** two integers
- **Formula:** Euclidean GCD; `LCM = a·b/GCD`

### 99. Statistics

- **Inputs:** number list
- **Formula:** mean, median, mode, range, σ = √(Σ(x−μ)²/n)

### 100. Matrix

- **Inputs:** two matrices, operation
- **Formula:** Element-wise add; row×col multiply; det via cofactor

### 101. Quadratic

- **Inputs:** a, b, c
- **Formula:** `x = (−b ± √(b² − 4ac))/2a`

### 102. Logarithm

- **Inputs:** value, base
- **Formula:** `log_b(x) = ln(x)/ln(b)`

### 103. Permutation & Combination

- **Inputs:** n, r
- **Formula:** `nPr = n!/(n−r)!`; `nCr = n!/(r!(n−r)!)`

---

## 5. Math — Advanced (28) [Schema]

### 104. Standard Deviation

- **Inputs:** numbers list
- **Formula:** `σ = √(Σ(x−μ)²/n)`; variance = σ²

### 105. Variance

- **Inputs:** numbers list
- **Formula:** `σ² = Σ(x−μ)²/n`

### 106. Mean / Median / Mode

- **Inputs:** numbers list
- **Formula:** Standard descriptive stats

### 107. Z-score

- **Inputs:** x, mean, σ
- **Formula:** `z = (x − μ)/σ`

### 108. Confidence Interval

- **Inputs:** sample mean, σ, n, confidence%
- **Formula:** `CI = x̄ ± z·σ/√n`

### 109. Sample Size

- **Inputs:** margin%, confidence%, proportion
- **Formula:** `n = z²·p(1−p)/E²`

### 110. Probability

- **Inputs:** favorable, total
- **Formula:** `P = favorable/total × 100`

### 111. AP / GP / Fibonacci

- **Inputs:** type, a, d/r, n
- **Formula:** AP: `aₙ = a+(n−1)d`; GP: `aₙ = a·r^(n−1)`; Fib: `Fₙ = Fₙ₋₁ + Fₙ₋₂`

### 112. Percent Error

- **Inputs:** expected, actual
- **Formula:** `|E−A|/|A| × 100`

### 113. Percent Change

- **Inputs:** original, new
- **Formula:** `(new − old)/|old| × 100`

### 114. Exponent

- **Inputs:** base, exponent
- **Formula:** `base^exp`

### 115. Root

- **Inputs:** number, degree
- **Formula:** `x^(1/n)`

### 116. Scientific Notation

- **Inputs:** number
- **Formula:** `value.toExponential(4)`

### 117. Rounding

- **Inputs:** value, decimal places
- **Formula:** round, floor, ceil

### 118. Half-Life

- **Inputs:** initial, half-life, elapsed time
- **Formula:** `A = A₀ × (1/2)^(t/T)`

### 119. Pythagorean

- **Inputs:** a, b
- **Formula:** `c = √(a² + b²)`

### 120. Right Triangle

- **Inputs:** a, b
- **Formula:** Hypotenuse, angles via atan, area = ab/2

### 121. Triangle (Heron)

- **Inputs:** a, b, c
- **Formula:** `s = (a+b+c)/2`; `area = √(s(s−a)(s−b)(s−c))`

### 122. Slope

- **Inputs:** x1, y1, x2, y2
- **Formula:** `m = (y₂−y₁)/(x₂−x₁)`; intercept = y₁ − m·x₁

### 123. Distance 2D

- **Inputs:** x1, y1, x2, y2
- **Formula:** `d = √((x₂−x₁)² + (y₂−y₁)²)`

### 124. Circle

- **Inputs:** radius
- **Formula:** `area = π·r²`; `C = 2π·r`

### 125. Shape Area

- **Inputs:** shape, dimensions
- **Formula:** Rectangle/triangle/circle/trapezoid

### 126. Shape Volume

- **Inputs:** shape, dimensions
- **Formula:** Cube/cuboid/sphere/cylinder/cone

### 127. Shape Surface

- **Inputs:** shape, dimensions
- **Formula:** Cube/cuboid/sphere/cylinder surface area

### 128. Ratio Simplifier

- **Inputs:** ratio string (a:b:c)
- **Formula:** Divide each by GCD of all parts

### 129. Proportion Solver

- **Inputs:** a, b, c
- **Formula:** Solve `a/b = c/x` → `x = b·c/a`

### 130. Random Number

- **Inputs:** min, max, count
- **Formula:** `floor(random()·(max−min+1)) + min`

### 131. Dice Roller

- **Inputs:** sides, count
- **Formula:** Sum of `floor(random()·sides)+1` per die

---

## 6. Health — Core (8) [Component]

### 132. BMI

- **Inputs:** weight (kg), height (m)
- **Formula:** `BMI = w/h²`

### 133. BMR

- **Inputs:** gender, age, weight, height
- **Formula (Mifflin-St Jeor):** M: `10w+6.25h−5a+5`; F: `10w+6.25h−5a−161`

### 134. Calorie Needs (TDEE)

- **Inputs:** BMR, activity factor
- **Formula:** `TDEE = BMR × activityMultiplier`

### 135. Body Fat %

- **Inputs:** gender, height, neck, waist, hip
- **Formula:** US Navy log-based equation

### 136. Ideal Weight

- **Inputs:** height, gender
- **Formula (Devine):** M: `50 + 2.3·(in−60)`; F: `45.5 + 2.3·(in−60)`

### 137. Water Intake

- **Inputs:** weight, activity
- **Formula:** `L/day ≈ weight × 0.033 + activity bonus`

### 138. Pregnancy Due Date

- **Inputs:** LMP, cycle length
- **Formula:** `EDD = LMP + 280 days` (Naegele's rule)

### 139. Macro Splitter

- **Inputs:** calories, %P/%C/%F
- **Formula:** `P_g = cal·%P/4`; `C_g = cal·%C/4`; `F_g = cal·%F/9`

---

## 7. Health — Advanced (24) [Schema]

### 140. Healthy Weight Range

- **Inputs:** height, frame
- **Formula:** `BMI 18.5–25 × h²`

### 141. Lean Body Mass

- **Inputs:** weight, height, sex
- **Formula (Boer):** M: `0.407w + 0.267h − 19.2`; F: `0.252w + 0.473h − 48.3`

### 142. Army Body Fat

- **Inputs:** sex, height, neck, waist, hip(F)
- **Formula:** US-Army log-based body-fat equation

### 143. One Rep Max

- **Inputs:** weight lifted, reps
- **Formula:** Epley: `w(1+r/30)`; Brzycki: `w·36/(37−r)`; Lombardi: `w·r^0.1`

### 144. Target Heart Rate

- **Inputs:** age, resting HR
- **Formula (Karvonen):** `((220−age) − rest)·pct + rest`

### 145. Max Heart Rate

- **Inputs:** age
- **Formula:** `220 − age`

### 146. Calories Burned

- **Inputs:** weight, minutes, activity (MET)
- **Formula:** `cal = MET × weight × min/60`

### 147. Pace

- **Inputs:** distance km, time min
- **Formula:** `pace = time/distance`; speed = `distance·60/time`

### 148. Pace Predictor (Riegel)

- **Inputs:** recent distance, recent time, target distance
- **Formula:** `T₂ = T₁·(D₂/D₁)^1.06`

### 149. VO₂ Max (Cooper test)

- **Inputs:** distance run in 12 min
- **Formula:** `VO₂ = (d − 504.9)/44.73`

### 150. Body Surface Area (Du Bois)

- **Inputs:** height, weight
- **Formula:** `BSA = 0.007184 × h^0.725 × w^0.425`

### 151. Body Type (somatotype)

- **Inputs:** wrist circumference, height
- **Formula:** Height/wrist ratio bands → ecto/meso/endo

### 152. Carb Intake

- **Inputs:** calories, carbs%
- **Formula:** `grams = (cal × %)/100/4`

### 153. Protein Intake

- **Inputs:** body weight, activity level
- **Formula:** `weight × {0.8/1.4/1.8/2.2} g/kg`

### 154. Fat Intake

- **Inputs:** calories, fat%
- **Formula:** `grams = (cal × %)/100/9`

### 155. TDEE

- **Inputs:** BMR, activity
- **Formula:** `TDEE = BMR × {1.2…1.9}`

### 156. Calorie Goal

- **Inputs:** TDEE, goal (cut/maintain/bulk)
- **Formula:** `TDEE ± 500`

### 157. Pregnancy Weight Gain

- **Inputs:** pre-BMI, weeks
- **Formula:** IOM bands by BMI category

### 158. Ovulation

- **Inputs:** LMP, cycle length
- **Formula:** `ovulation = LMP + (cycle − 14)`; fertile window ±5/+1

### 159. Period Tracker

- **Inputs:** last period, cycle
- **Formula:** Next = LMP + cycle

### 160. Sleep (90-min cycles)

- **Inputs:** wake time
- **Formula:** Bedtime = wake − 90 min × n − 14 min fall-asleep

### 161. BAC

- **Inputs:** drinks, weight, hours, sex
- **Formula:** Widmark: `(grams)/(weight·1000·r)·100 − 0.015·hours`

### 162. GFR (MDRD)

- **Inputs:** creatinine, age, sex
- **Formula:** `175 × Cr^−1.154 × age^−0.203 × (0.742 if F)`

### 163. Steps → Calories

- **Inputs:** steps, weight
- **Formula:** `cal = steps × 0.0005 × weight`

---

## 8. Converters — Core (10) [Component]

All: **Inputs:** value, fromUnit, toUnit. **Formula:** `result = value × (factor_from/factor_to)` via SI base.

### 164. Length — base meter

### 165. Mass / Weight — base kg

### 166. Temperature (non-linear) — `°F = °C·9/5+32`; `K = °C+273.15`

### 167. Area — base m²

### 168. Volume — base liter

### 169. Speed — base m/s

### 170. Time Units — base second

### 171. Data Storage — base byte (1024-binary)

### 172. Energy — base joule

### 173. Pressure — base Pa

---

## 9. Converters — Special (7) [Schema]

### 174. Roman Numeral

- **Inputs:** decimal or Roman
- **Formula:** Two-way conversion table I/V/X/L/C/D/M

### 175. Number to Words

- **Inputs:** number
- **Formula:** English short-scale text conversion

### 176. Indian Number System

- **Inputs:** number
- **Formula:** Lakh/crore grouping (e.g., 1,00,00,000)

### 177. Shoe Size

- **Inputs:** US men's size
- **Formula:** Tabular conversion (US/UK/EU/JP)

### 178. Clothing Size

- **Inputs:** chest cm
- **Formula:** Size chart band lookup (XS/S/M/L/XL)

### 179. Ring Size

- **Inputs:** inner diameter (mm)
- **Formula:** Diameter → US/UK/EU/JP ring scale

### 180. Bra Size

- **Inputs:** under-bust, bust (cm)
- **Formula:** Band size + cup letter from difference

---

## 10. Date & Time — Core (5) [Component]

### 181. Age

- **Inputs:** birth date
- **Formula:** Diff in years/months/days via calendar math

### 182. Date Difference

- **Inputs:** date1, date2
- **Formula:** `|d2 − d1| / msPerDay`

### 183. Add / Subtract Days

- **Inputs:** date, units, direction
- **Formula:** `d.setDate(d.getDate() ± n)`

### 184. Working Days

- **Inputs:** start, end, holidays
- **Formula:** Total − weekends − holidays

### 185. Time Zone Converter

- **Inputs:** datetime, fromTZ, toTZ
- **Formula:** Offset diff via `Intl.DateTimeFormat`

---

## 11. Date & Time — Advanced (9) [Schema]

### 186. Time Arithmetic

- **Inputs:** H/M pair, operation
- **Formula:** Add/subtract HH:MM

### 187. Timesheet

- **Inputs:** clock-in/out per day, days worked, overtime threshold
- **Formula:** Regular + overtime hours summed

### 188. Hours Between

- **Inputs:** start, end (HH:MM)
- **Formula:** End − start (handles overnight)

### 189. Day of Week

- **Inputs:** date
- **Formula:** `new Date(date).getDay()`

### 190. Day Counter

- **Inputs:** start, end
- **Formula:** Count days between

### 191. Countdown

- **Inputs:** target date
- **Formula:** Diff to now in days/hours/min

### 192. Stopwatch

- **Inputs:** elapsed ms
- **Formula:** Format `HH:MM:SS.ms`

### 193. Pomodoro

- **Inputs:** sessions, work min, short break, long break
- **Formula:** Total = sessions×(work+short) + long every 4

### 194. Gestational Age

- **Inputs:** LMP
- **Formula:** `now − LMP` in weeks/days

---

## 12. Crypto & Stock — Core (6) [Component]

### 195. Crypto Profit

- **Inputs:** entry, exit, qty, fees
- **Formula:** `PnL = (exit−entry)×qty − fees`

### 196. Staking Yield

- **Inputs:** principal, APY%, days
- **Formula:** `Reward = P·(1+APY/100)^(days/365) − P`

### 197. DCA

- **Inputs:** per-period amount, frequency, prices[]
- **Formula:** `avg = Σ amt / Σ (amt/price)`

### 198. Stock Average

- **Inputs:** q1, p1, q2, p2
- **Formula:** `avg = (q1p1 + q2p2)/(q1+q2)`

### 199. P/E Ratio

- **Inputs:** price, EPS
- **Formula:** `P/E = price/EPS`

### 200. Position Size

- **Inputs:** account, risk%, entry, stop
- **Formula:** `units = (account × risk%)/|entry − stop|`

---

## 13. Crypto & Stock — Advanced (14) [Schema]

### 201. Crypto Tax India

- **Inputs:** buy value, sell value
- **Formula:** Flat 30% on gain + 1% TDS on sell

### 202. Mining Profit

- **Inputs:** hash rate, power, electricity rate, reward/TH/day
- **Formula:** `daily = reward·hash − power·24·rate/1000`

### 203. Impermanent Loss

- **Inputs:** price ratio (new/old)
- **Formula:** `IL = 2√r/(1+r) − 1`

### 204. APY ↔ APR

- **Inputs:** rate, compounds/year, direction
- **Formula:** APY = `(1+APR/n)^n − 1`; reverse via root

### 205. Liquidation Price

- **Inputs:** entry, leverage, side, maintenance margin%
- **Formula:** Long: `entry·(1 − 1/lev + mm/100)`; Short reverse

### 206. Leverage / Margin

- **Inputs:** account, position value
- **Formula:** `leverage = pos/account`; margin = `account/pos × 100`

### 207. Risk / Reward

- **Inputs:** entry, stop, target
- **Formula:** `R:R = (target−entry)/(entry−stop)`

### 208. Pip Value (Forex)

- **Inputs:** lot size, pip size, quote→USD rate
- **Formula:** `pip$ = lot × pipSize × rate`

### 209. Forex Position

- **Inputs:** account, risk%, stop pips, pip value/lot
- **Formula:** `lots = (account × risk%)/(stop × pipValue)`

### 210. Stock Brokerage India

- **Inputs:** buy, sell, segment (delivery/intraday/F&O)
- **Formula:** Brokerage + STT + GST + exchange fee + SEBI

### 211. Stock Profit

- **Inputs:** qty, buy, sell
- **Formula:** `(sell − buy) × qty`

### 212. Stop Loss

- **Inputs:** entry, account risk%, account, qty
- **Formula:** `stopPrice = entry − (risk·account)/qty`

### 213. Take Profit

- **Inputs:** entry, stop, R:R ratio
- **Formula:** `target = entry + (entry − stop) × R:R`

### 214. EPS / Book Value

- **Inputs:** net profit, shares, total equity
- **Formula:** `EPS = profit/shares`; `BV = equity/shares`

---

## 14. Geometry (18) [Schema]

### 215. Triangle Solver (SSS)

- **Inputs:** sides a, b, c
- **Formula:** Heron's formula for area; law of cosines for angles

### 216. Right Triangle

- **Inputs:** legs a, b
- **Formula:** `c = √(a²+b²)`; angles via atan; area = ab/2

### 217. Equilateral Triangle

- **Inputs:** side
- **Formula:** `area = √3/4 · s²`; `h = √3/2 · s`

### 218. Pythagorean

- **Inputs:** a, b
- **Formula:** `c² = a² + b²`

### 219. Circle

- **Inputs:** radius
- **Formula:** `A = πr²`; `C = 2πr`

### 220. Ellipse

- **Inputs:** semi-major a, semi-minor b
- **Formula:** `A = πab`; perimeter ≈ Ramanujan approx

### 221. Square

- **Inputs:** side
- **Formula:** `A = s²`; `P = 4s`; diagonal = `s√2`

### 222. Rectangle

- **Inputs:** length, width
- **Formula:** `A = lw`; `P = 2(l+w)`; diagonal = `√(l²+w²)`

### 223. Parallelogram

- **Inputs:** base, height
- **Formula:** `A = b·h`

### 224. Trapezoid

- **Inputs:** parallel a, parallel b, height
- **Formula:** `A = (a+b)·h/2`

### 225. Regular Polygon

- **Inputs:** sides n, side length
- **Formula:** `A = (n·s²)/(4·tan(π/n))`

### 226. Cube

- **Inputs:** side
- **Formula:** `V = s³`; `SA = 6s²`

### 227. Cuboid

- **Inputs:** l, w, h
- **Formula:** `V = lwh`; `SA = 2(lw+wh+hl)`

### 228. Sphere

- **Inputs:** radius
- **Formula:** `V = 4/3·πr³`; `SA = 4πr²`

### 229. Cylinder

- **Inputs:** radius, height
- **Formula:** `V = πr²h`; `SA = 2πr(r+h)`

### 230. Cone

- **Inputs:** radius, height
- **Formula:** `V = πr²h/3`; slant = `√(r²+h²)`

### 231. Pyramid

- **Inputs:** base side, height
- **Formula:** `V = b²·h/3`

### 232. Torus

- **Inputs:** R (major), r (minor)
- **Formula:** `V = 2π²Rr²`; `SA = 4π²Rr`

---

## 15. Construction (22) [Schema]

### 233. Concrete Slab

- **Inputs:** length, width, depth (m)
- **Formula:** `V = l·w·d`; convert to bags/m³

### 234. Concrete Column

- **Inputs:** shape, dims, height
- **Formula:** Volume rect/circle × height

### 235. Cement / Sand / Aggregate

- **Inputs:** concrete volume, mix ratio (M15/M20/M25)
- **Formula:** Wet→dry × 1.54; ratio-based split

### 236. Mortar / Plaster

- **Inputs:** wall area, thickness, mix ratio
- **Formula:** `V = A·t × 1.27`; cement bags by ratio

### 237. Brick Count

- **Inputs:** wall L, H, thickness
- **Formula:** `bricks = wall_vol / brick_vol × 1.05` (mortar waste)

### 238. Block Count

- **Inputs:** wall area, block L, H
- **Formula:** `blocks = wall_area / block_area`

### 239. Tile

- **Inputs:** room area, tile L, W, waste%
- **Formula:** `tiles = ceil(room/tile × (1+waste%))`

### 240. Flooring

- **Inputs:** room area, plank area, waste%
- **Formula:** `planks = ceil(room/plank × (1+waste%))`

### 241. Carpet

- **Inputs:** room L, W, roll W, waste%
- **Formula:** Linear meters required + waste

### 242. Paint

- **Inputs:** wall area, coats, coverage
- **Formula:** `liters = area·coats/coverage`

### 243. Wallpaper

- **Inputs:** wall area, roll area, waste%
- **Formula:** `rolls = ceil(wall/roll × (1+waste%))`

### 244. Roofing

- **Inputs:** roof area, shingles/m², waste%
- **Formula:** `total = area × shingles × (1+waste%)`

### 245. Roof Pitch

- **Inputs:** rise, run
- **Formula:** `pitch = rise/run`; angle = atan(rise/run)

### 246. Drywall

- **Inputs:** wall area, sheet area
- **Formula:** `sheets = ceil(wall/sheet)`

### 247. Lumber Board Feet

- **Inputs:** qty, thickness (in), width (in), length (ft)
- **Formula:** `BF = qty × t·w·L/12`

### 248. Stud Wall

- **Inputs:** wall length, stud spacing
- **Formula:** `studs = ceil(L/spacing) + 1`

### 249. Rebar

- **Inputs:** slab L, W, spacing
- **Formula:** Bars along both axes; total length

### 250. Stair

- **Inputs:** total rise, run, riser height
- **Formula:** `steps = rise/riser`; tread depth = run/steps

### 251. Mulch / Topsoil

- **Inputs:** L, W (m), depth (cm)
- **Formula:** `V = L·W·d/100` (m³)

### 252. Gravel

- **Inputs:** area, depth, density
- **Formula:** `mass = area·depth·density`

### 253. Fence

- **Inputs:** total length, post spacing
- **Formula:** `posts = ceil(L/spacing) + 1`

### 254. Pool Volume

- **Inputs:** shape, dims, avg depth
- **Formula:** Rect: `L·W·d`; Round: `π·r²·d`; convert to liters/gallons

---

## 16. Automotive (12) [Schema]

### 255. Fuel Cost

- **Inputs:** distance (km), mileage (km/L), fuel price
- **Formula:** `cost = distance/mileage × price`

### 256. Mileage

- **Inputs:** distance, fuel used
- **Formula:** `mileage = distance/fuel`

### 257. Trip Cost

- **Inputs:** leg distances list, mileage, price
- **Formula:** `Σ legs / mileage × price`

### 258. Horsepower

- **Inputs:** torque (Nm), RPM
- **Formula:** `HP = (Torque · RPM)/9549`

### 259. Engine Displacement

- **Inputs:** bore, stroke, cylinders
- **Formula:** `V = π·(bore/2)²·stroke·cyl`

### 260. Tire Size

- **Inputs:** width, aspect ratio, rim
- **Formula:** Sidewall = `width·AR/100`; OD = `rim·25.4 + 2·sidewall`

### 261. Average Speed

- **Inputs:** distance, time
- **Formula:** `v = d/t`

### 262. Travel Time

- **Inputs:** distance, avg speed
- **Formula:** `t = d/v`

### 263. Lap Time

- **Inputs:** track length, laps, race time
- **Formula:** `lap = race/laps`; avg speed

### 264. Toll Estimate

- **Inputs:** distance, toll/km, vehicle class
- **Formula:** `total = distance × rate × class multiplier`

### 265. EV Charging Cost

- **Inputs:** battery kWh, electricity rate, efficiency%
- **Formula:** `cost = battery/eff × rate`

### 266. EV vs Petrol

- **Inputs:** annual km, petrol mileage, petrol price, EV range, charge cost
- **Formula:** Annual fuel cost vs annual charging cost

---

## 17. Physics (25) [Schema]

### 267. Force

- **Inputs:** mass, acceleration
- **Formula:** `F = m·a`

### 268. Newton's 2nd

- **Inputs:** force, mass
- **Formula:** `a = F/m`

### 269. Weight (planetary)

- **Inputs:** mass, planet (g)
- **Formula:** `W = m·g`

### 270. Kinetic Energy

- **Inputs:** mass, velocity
- **Formula:** `KE = ½mv²`

### 271. Potential Energy

- **Inputs:** mass, height
- **Formula:** `PE = mgh`

### 272. Work

- **Inputs:** force, distance, angle
- **Formula:** `W = F·d·cosθ`

### 273. Power

- **Inputs:** work, time
- **Formula:** `P = W/t`

### 274. Momentum

- **Inputs:** mass, velocity
- **Formula:** `p = mv`

### 275. Impulse

- **Inputs:** force, time
- **Formula:** `J = F·t`

### 276. Velocity (UAT)

- **Inputs:** u, a, t
- **Formula:** `v = u + at`

### 277. Acceleration

- **Inputs:** Δv, t
- **Formula:** `a = Δv/t`

### 278. Free Fall

- **Inputs:** drop height
- **Formula:** `t = √(2h/g)`; `v = √(2gh)`

### 279. Projectile Motion

- **Inputs:** velocity, angle
- **Formula:** Range = `v²·sin(2θ)/g`; height = `v²·sin²θ/(2g)`

### 280. Friction

- **Inputs:** friction force, normal force
- **Formula:** `μ = F/N`

### 281. Pressure

- **Inputs:** force, area
- **Formula:** `P = F/A`

### 282. Density

- **Inputs:** mass, volume
- **Formula:** `ρ = m/V`

### 283. Buoyancy

- **Inputs:** fluid density, volume submerged
- **Formula:** `Fb = ρ·V·g`

### 284. Ohm's Law

- **Inputs:** V, I
- **Formula:** `V = IR`

### 285. Electrical Power

- **Inputs:** V, I
- **Formula:** `P = VI`

### 286. Resistor Network

- **Inputs:** values list, series/parallel
- **Formula:** Series: `ΣR`; Parallel: `1/Σ(1/R)`

### 287. Capacitor Network

- **Inputs:** values, series/parallel
- **Formula:** Series: `1/Σ(1/C)`; Parallel: `ΣC`

### 288. Wave Equation

- **Inputs:** frequency, speed
- **Formula:** `λ = v/f`

### 289. Doppler

- **Inputs:** source freq, speed, source v, observer v
- **Formula:** `f' = f·(v+vo)/(v−vs)`

### 290. Pendulum

- **Inputs:** length
- **Formula:** `T = 2π·√(L/g)`

### 291. Hooke Spring

- **Inputs:** k, displacement
- **Formula:** `F = k·x`

---

## 18. Chemistry (15) [Schema]

### 292. Molarity

- **Inputs:** moles solute, volume L
- **Formula:** `M = n/V`

### 293. Molality

- **Inputs:** moles solute, solvent mass kg
- **Formula:** `m = n/kg`

### 294. Molar Mass

- **Inputs:** formula (e.g. H2O)
- **Formula:** Sum of element atomic masses × counts

### 295. Moles ↔ Mass ↔ Atoms

- **Inputs:** given, value, molar mass
- **Formula:** `n = m/M`; atoms = `n·Nₐ`

### 296. Mass Percent

- **Inputs:** solute mass, solution mass
- **Formula:** `% = solute/solution × 100`

### 297. Dilution

- **Inputs:** M1, V1, M2
- **Formula:** `M₁V₁ = M₂V₂`

### 298. pH

- **Inputs:** [H⁺] (mol/L)
- **Formula:** `pH = −log₁₀[H⁺]`

### 299. Buffer (Henderson-Hasselbalch)

- **Inputs:** pKa, [A⁻], [HA]
- **Formula:** `pH = pKa + log([A⁻]/[HA])`

### 300. Ideal Gas

- **Inputs:** P, V, T
- **Formula:** `PV = nRT`

### 301. Boyle / Charles

- **Inputs:** law, initial P/V, final P/V
- **Formula:** Boyle: `P₁V₁ = P₂V₂`; Charles: `V₁/T₁ = V₂/T₂`

### 302. Radioactive Half-Life

- **Inputs:** initial activity, time elapsed, half-life
- **Formula:** `A = A₀·(1/2)^(t/T)`

### 303. Empirical Formula

- **Inputs:** element:mass% list
- **Formula:** Divide by atomic mass → normalize to smallest

### 304. Avogadro

- **Inputs:** direction, value
- **Formula:** `atoms = mol × 6.022e23` and reverse

### 305. Density (chem)

- **Inputs:** mass g, volume mL
- **Formula:** `ρ = m/V`

### 306. Solution Concentration

- **Inputs:** solute mg, solution L
- **Formula:** `mg/L = solute/volume`

---

## 19. Electrical (12) [Schema]

### 307. Ohm's Law (full)

- **Inputs:** solve for V/I/R/P, inputs A and B
- **Formula:** `V = IR`; `P = VI = I²R = V²/R`

### 308. Resistor Color Code

- **Inputs:** band 1, band 2, multiplier, tolerance
- **Formula:** `R = (d₁d₂) × 10^m ± tolerance`

### 309. Resistor Color Reverse

- **Inputs:** resistance Ω
- **Formula:** Decompose to two digits + multiplier

### 310. Voltage Drop

- **Inputs:** current, length, cross-section, material
- **Formula:** `Vd = 2·I·L·ρ/A` (Cu/Al)

### 311. Wire Gauge

- **Inputs:** current, length, voltage, max drop%
- **Formula:** AWG selected so `Vd ≤ V·drop%`

### 312. LED Resistor

- **Inputs:** supply V, LED Vf, LED current mA
- **Formula:** `R = (Vs − Vf)/I`

### 313. RC Time Constant

- **Inputs:** R, C
- **Formula:** `τ = RC`

### 314. RL Time Constant

- **Inputs:** R, L
- **Formula:** `τ = L/R`

### 315. Decibel

- **Inputs:** P1/V1, P2/V2, type
- **Formula:** Power: `10·log(P₂/P₁)`; Voltage: `20·log(V₂/V₁)`

### 316. Power Factor

- **Inputs:** real W, apparent VA
- **Formula:** `PF = W/VA`

### 317. Battery Life

- **Inputs:** capacity mAh, load mA
- **Formula:** `hours = mAh/mA × 0.7` (efficiency)

### 318. Solar Panel Sizing

- **Inputs:** daily load, peak sun hours, system eff%
- **Formula:** `kW = load/(sunHours·eff)`

---

## 20. Cooking (10) [Schema]

### 319. Recipe Scaler

- **Inputs:** original servings, desired, ingredient
- **Formula:** `new = orig × (desired/original)`

### 320. Cups → Grams

- **Inputs:** cups, ingredient
- **Formula:** Per-ingredient density table

### 321. Tbsp / Tsp / mL

- **Inputs:** amount, from, to
- **Formula:** 1 tbsp = 15mL; 1 tsp = 5mL; 1 cup = 240mL

### 322. Oven Temp

- **Inputs:** temperature, from
- **Formula:** `°F = °C·9/5+32`; Gas Mark conversion

### 323. Pan Conversion

- **Inputs:** original shape/dims, new shape
- **Formula:** Match pan area; adjust depth/time

### 324. Cooking Time

- **Inputs:** weight, meat type
- **Formula:** `time = weight × min/kg` (per meat)

### 325. Yeast / Sugar (bread)

- **Inputs:** flour g
- **Formula:** Baker's % — yeast 1%, sugar 2-5%, salt 2%

### 326. Coffee Ratio

- **Inputs:** water, ratio (1:N)
- **Formula:** `coffee = water/N`

### 327. ABV (alcohol)

- **Inputs:** OG, FG
- **Formula:** `ABV = (OG − FG) × 131.25`

### 328. Macros per Recipe

- **Inputs:** servings, total P/C/F
- **Formula:** Per-serving = total/servings; cal = `4P + 4C + 9F`

---

## 21. Lifestyle (15) [Schema]

### 329. GPA

- **Inputs:** grades:credits list, scale (4.0/10.0)
- **Formula:** `GPA = Σ(grade·credits)/Σcredits`

### 330. CGPA → Percentage

- **Inputs:** CGPA, scale
- **Formula:** 10-scale: `% = CGPA·9.5`; 4-scale: `% = CGPA·25`

### 331. Exam Grade Needed

- **Inputs:** current%, weight covered, target final
- **Formula:** `needed = (target − current·w%)/(1 − w%)`

### 332. Exam Score Predictor

- **Inputs:** correct, wrong, marks/correct, neg/wrong
- **Formula:** `score = c·m − w·neg`

### 333. Tip Calculator (lifestyle)

- **Inputs:** bill, tip%
- **Formula:** `tip = bill × tip%/100`

### 334. Split Bill

- **Inputs:** bill, tip%, people
- **Formula:** `per = (bill·(1+tip%))/people`

### 335. Love Compatibility (fun)

- **Inputs:** name1, name2
- **Formula:** Hash combined letters → 0-100%

### 336. Name Numerology

- **Inputs:** full name
- **Formula:** Letter→digit sum, reduce to single digit

### 337. Age in Units

- **Inputs:** DOB
- **Formula:** Years/months/weeks/days/hours/minutes

### 338. Zodiac (Western)

- **Inputs:** DOB
- **Formula:** Month/day → 12 signs

### 339. Chinese Zodiac

- **Inputs:** birth year
- **Formula:** `year % 12` → 12 animals

### 340. Anniversary

- **Inputs:** wedding year
- **Formula:** Years married → traditional gift name

### 341. Retirement Countdown

- **Inputs:** current age, retire age
- **Formula:** Years/months/days remaining

### 342. Carbon Footprint

- **Inputs:** car km/yr, flights, diet
- **Formula:** Σ (km·0.21 kg + flights·factor + diet·factor)

### 343. Water Footprint

- **Inputs:** shower min/day, laundry/wk, diet
- **Formula:** Σ daily usage × 365 + diet baseline

---

## 22. Developer Tools (14) [Schema]

### 344. IP Subnet

- **Inputs:** CIDR (e.g. 192.168.1.0/24)
- **Formula:** Bitmask → network, broadcast, host range

### 345. Subnet Mask Converter

- **Inputs:** mask (dotted or /CIDR)
- **Formula:** Convert between forms; count usable hosts

### 346. MAC Lookup

- **Inputs:** MAC address
- **Formula:** First 3 bytes (OUI) → vendor

### 347. Base64

- **Inputs:** mode, input
- **Formula:** Encode/decode 6-bit groups

### 348. URL Encode

- **Inputs:** mode, URL
- **Formula:** `encodeURIComponent` / decode

### 349. HTML Entity

- **Inputs:** mode, HTML
- **Formula:** &amp;/&lt;/&gt; encode + decode

### 350. Hash Generator

- **Inputs:** text, algorithm
- **Formula:** SHA-1/256/384/512 via SubtleCrypto

### 351. UUID Generator

- **Inputs:** count
- **Formula:** RFC 4122 v4 random UUID

### 352. Password Generator

- **Inputs:** length, charset toggles
- **Formula:** Random pick from selected pool

### 353. Password Strength

- **Inputs:** password
- **Formula:** Length + diversity → entropy score

### 354. Random String

- **Inputs:** length, charset
- **Formula:** Random pick from alphabet/alphanumeric/hex

### 355. Bandwidth

- **Inputs:** size, unit, speed, speed unit
- **Formula:** `time = size_bits/speed_bps`

### 356. Color Converter

- **Inputs:** hex
- **Formula:** Hex ↔ RGB ↔ HSL ↔ HSV

### 357. Cron Helper

- **Inputs:** min, hr, dom, mon, dow
- **Formula:** Validate cron expression; describe next run

---

## 23. Weather (7) [Schema]

### 358. Wind Chill

- **Inputs:** temperature °C, wind km/h
- **Formula:** `Tc = 13.12 + 0.6215·T − 11.37·v^0.16 + 0.3965·T·v^0.16`

### 359. Heat Index

- **Inputs:** temperature, humidity
- **Formula:** Rothfusz regression

### 360. Dew Point

- **Inputs:** temperature, humidity
- **Formula:** Magnus formula

### 361. Humidity (Absolute / Relative)

- **Inputs:** temperature, RH%
- **Formula:** Vapor pressure × RH

### 362. UV Exposure

- **Inputs:** UV index, skin type (I–VI)
- **Formula:** Safe minutes = `200 × MED/UV`

### 363. Sunrise / Sunset

- **Inputs:** latitude, longitude, date
- **Formula:** Solar declination + hour angle

### 364. Moon Phase

- **Inputs:** date
- **Formula:** Days since known new moon mod 29.53

---

## 24. Sports (8) [Schema]

### 365. Cricket Run Rate

- **Inputs:** runs, overs
- **Formula:** `RR = runs/overs`

### 366. Cricket Required RR

- **Inputs:** target, current, overs done, total overs
- **Formula:** `RRR = (target − current)/(total − done)`

### 367. Cricket DLS

- **Inputs:** team1 score, overs lost, total overs
- **Formula:** Resource % table-based adjustment

### 368. Cricket Stats

- **Inputs:** runs, balls, wickets, runs conceded, balls bowled
- **Formula:** SR = `runs/balls·100`; econ = `runs/overs`

### 369. Golf Handicap

- **Inputs:** last 5 scores, course rating, slope
- **Formula:** `Index = avg differential × 0.96`

### 370. Bowling Score

- **Inputs:** score per frame
- **Formula:** 10-frame scoring with strike/spare bonuses

### 371. Darts Checkout

- **Inputs:** remaining score
- **Formula:** Known checkout combination lookup

### 372. Fantasy Cricket

- **Inputs:** runs, boundaries, sixes, wickets, catches
- **Formula:** Points = `runs + 4s·1 + 6s·2 + W·25 + C·8`

---

## Summary

| Category               | Component | Schema  | Total   |
| ---------------------- | --------- | ------- | ------- |
| Finance (Core)         | 24        | —       | 24      |
| Finance (Global)       | —         | 42      | 42      |
| Finance (India)        | —         | 24      | 24      |
| Math (Core)            | 12        | —       | 12      |
| Math (Advanced)        | —         | 28      | 28      |
| Health (Core)          | 8         | —       | 8       |
| Health (Advanced)      | —         | 24      | 24      |
| Converters (Core)      | 10        | —       | 10      |
| Converters (Special)   | —         | 7       | 7       |
| Date & Time (Core)     | 5         | —       | 5       |
| Date & Time (Advanced) | —         | 9       | 9       |
| Crypto (Core)          | 6         | —       | 6       |
| Crypto (Advanced)      | —         | 14      | 14      |
| Geometry               | —         | 18      | 18      |
| Construction           | —         | 22      | 22      |
| Automotive             | —         | 12      | 12      |
| Physics                | —         | 25      | 25      |
| Chemistry              | —         | 15      | 15      |
| Electrical             | —         | 12      | 12      |
| Cooking                | —         | 10      | 10      |
| Lifestyle              | —         | 15      | 15      |
| Developer              | —         | 14      | 14      |
| Weather                | —         | 7       | 7       |
| Sports                 | —         | 8       | 8       |
| **Total**              | **65**    | **306** | **371** |
