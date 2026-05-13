# Batch 4 — Curated Net-New Calculators (59)

> Source: your hand-written 95-calculator spec list ("95 Calculator Specs — Inputs, Formulas, Output"). Overlap notes from that doc were applied, removing 36 duplicates against the live registry, `300-new-calculators.md`, and `next-300-calculators.md`. **59 net-new entries remain** below in the standard 4-line schema format.
>
> Numbering continues from **#1101** (after batch3 ended at #1100).
>
> Skipped due to user-flagged overlap (36): #1, #2, #5, #8, #9, #13, #16, #17, #18, #20, #21, #23, #29, #31, #37, #38, #49, #50, #52, #53, #56, #57, #59, #62, #63, #65, #66, #67, #69, #70, #74, #77, #79, #80, #81, #86.

## Format reminder

```
**N. Calculator Name** | `slug` | category | LucideIcon | "shortDesc (≤80 chars)"
  in:  id:kind=default, …
  out: id:format[tone,big?], …
  f:   formula or one-line algorithm
```

---

# A. Engineering (13)

**1101. Torque** | `torque` | engineering | Wrench | "Torque from force, lever arm, and angle."
in: `force:number=100`, `armM:number=0.5`, `angleDeg:number=90`
out: `torque:number[primary,big]`
f: `τ = F·r·sin(θ)`

**1102. Safety Factor (FoS)** | `safety-factor` | engineering | Shield | "Strength vs working stress."
in: `strength:number=400`, `workingStress:number=120`
out: `fos:number[primary,big]`, `verdict:text`
f: `FoS = ultimate strength / working stress`

**1103. Column Load (Allowable)** | `column-load` | engineering | Construction | "Allowable axial load on a column."
in: `area:number=0.16`, `allowableStress:number=15000`
out: `pAllow:number[primary,big]`
f: `P_allow = σ_allow · A`

**1104. Foundation Design (Spread Footing)** | `foundation-design` | engineering | Construction | "Spread-footing sizing from load and SBC."
in: `load:number=800`, `sbc:number=200`, `fos:number=2`
out: `area:number[primary,big]`, `sideM:number`
f: `A_req = (Load·FoS)/SBC`; side = √A

**1105. Moment of Inertia (Shape Library)** | `moment-of-inertia-shape` | engineering | Square | "I for rect / circle / triangle / I-beam."
in: `shape:select=rect`, `b:number=0.1`, `h:number=0.2`, `d:number=0.1`
out: `I:number[primary,big]`, `centroidY:number`
f: Rect `I = bh³/12`; Circle `I = πd⁴/64`; Triangle `I = bh³/36`

**1106. Section Modulus** | `section-modulus` | engineering | Square | "S = I/c for bending design."
in: `I:number=1e-6`, `c:number=0.05`
out: `S:number[primary,big]`
f: `S = I/c`

**1107. Truss Load (Method of Joints — 2D)** | `truss-load` | engineering | Construction | "Solve member forces in a 2D truss."
in: `nodes:textarea`, `members:textarea`, `loads:textarea`, `supports:textarea`
out: `memberForces:text[primary,big]`
f: At each joint: `ΣFx = 0`, `ΣFy = 0`; solve member axial forces

**1108. Load Combination (ASCE / IS Code)** | `load-combination` | engineering | Activity | "Worst-case factored load per code."
in: `dl:number=10`, `ll:number=5`, `wl:number=3`, `el:number=0`, `code:select=IS875`
out: `worstCase:number[primary,big]`, `combinations:textarea`
f: e.g. `1.2DL + 1.6LL`, `1.2DL + 1.0LL + 1.0WL`, `0.9DL + 1.0WL`

**1109. Dead + Live Load (Slab / Beam)** | `dead-live-load` | engineering | LayoutGrid | "DL + LL on a member or slab."
in: `slabThicknessM:number=0.15`, `concreteDensity:number=25`, `finishThicknessM:number=0.05`, `finishDensity:number=20`, `liveKnM2:number=4`
out: `totalKnM2:number[primary,big]`, `dl:number`, `ll:number`
f: `DL = (slab_t·ρc + finish_t·ρf)`; `LL = LL_code`; total = DL+LL

**1110. Pipe Friction Loss (Darcy–Weisbach)** | `pipe-friction-loss` | engineering | Activity | "Pipe friction head loss + pressure drop."
in: `f:number=0.02`, `length:number=10`, `diameter:number=0.05`, `velocity:number=2`, `density:number=1000`
out: `headLoss:number[primary,big]`, `pressureDrop:number`
f: `h_f = f·(L/D)·v²/(2g)`; `ΔP = ρ·g·h_f`

**1111. Heat Exchanger Efficiency (LMTD)** | `heat-exchanger-efficiency` | engineering | Thermometer | "Log mean temp diff + effectiveness."
in: `tHotIn:number=120`, `tHotOut:number=80`, `tColdIn:number=30`, `tColdOut:number=70`, `config:select=counter`
out: `lmtd:number[primary,big]`, `effectiveness:percent`
f: `LMTD = (ΔT1−ΔT2)/ln(ΔT1/ΔT2)`; ε = q_actual / q_max

**1112. Asphalt Quantity (Tonnage)** | `asphalt-quantity` | engineering | Construction | "Asphalt tonnage for paved area."
in: `areaM2:number=500`, `thicknessMm:number=50`, `densityKgM3:number=2400`
out: `tons:number[primary,big]`, `costEstimate:currency-inr`
f: `tons = area · (thickness/1000) · density / 1000`

**1113. Current Divider (Parallel Resistors)** | `current-divider` | engineering | Zap | "Current through each parallel branch."
in: `iTotalA:number=10`, `r1:number=100`, `r2:number=200`
out: `i1:number[primary,big]`, `i2:number`
f: `I_k = I · G_k/ΣG`; two-resistor: `I1 = I·R2/(R1+R2)`

---

# B. Physics (9)

**1114. Refractive Index** | `refractive-index` | physics | Star | "n = c/v or from refraction angles."
in: `mode:select=fromSpeed`, `v:number=2e8`, `c:number=3e8`
out: `n:number[primary,big]`
f: `n = c/v` or `n = sin(θi)/sin(θr)`

**1115. Lens Equation (Thin Lens)** | `lens-equation` | physics | Eye | "Solve image distance + magnification."
in: `objectDistance:number=0.5`, `focalLength:number=0.2`
out: `imageDistance:number[primary,big]`, `magnification:number`
f: `1/f = 1/d_o + 1/d_i`; `m = −d_i/d_o`

**1116. Snell's Law** | `snells-law` | physics | Waves | "Refraction angle at an interface."
in: `n1:number=1.0`, `n2:number=1.5`, `theta1Deg:number=30`
out: `theta2Deg:number[primary,big]`, `totalInternalReflection:text`
f: `n1·sin(θ1) = n2·sin(θ2)`

**1117. Sound Intensity (dB)** | `sound-intensity-db` | physics | Volume2 | "Sound level in decibels from intensity."
in: `intensity:number=1e-6`
out: `db:number[primary,big]`
f: `dB = 10·log10(I/I0)` where I0 = 1e−12 W/m²

**1118. Latent Heat (Phase Change)** | `latent-heat` | physics | Flame | "Energy for phase change."
in: `mass:number=1`, `latentHeat:number=334000`
out: `Q:number[primary,big]`
f: `Q = m·L`

**1119. Coulomb's Law** | `coulombs-law` | physics | Zap | "Electrostatic force between two charges."
in: `q1:number=1e-6`, `q2:number=1e-6`, `rM:number=0.1`
out: `force:number[primary,big]`, `direction:text`
f: `F = k·q1·q2/r²`, k = 8.99e9

**1120. Magnetic Field (Biot–Savart, straight wire)** | `magnetic-field-wire` | physics | Magnet | "B around a long straight current-carrying wire."
in: `currentA:number=10`, `distanceM:number=0.05`
out: `bField:number[primary,big]`
f: `B = μ0·I / (2π·r)`, μ0 = 4π·1e−7

**1121. Lorentz Force** | `lorentz-force` | physics | Zap | "Force on a moving charge in E and B fields."
in: `qC:number=1.6e-19`, `vMs:number=1e6`, `bT:number=0.01`, `eVm:number=0`, `angleDeg:number=90`
out: `force:number[primary,big]`
f: `F = qE + qv·B·sin(θ)`

**1122. Centripetal Force** | `centripetal-force-shm` | physics | Circle | "F = mv²/r and a = v²/r."
in: `mass:number=1`, `velocity:number=10`, `radius:number=5`
out: `force:number[primary,big]`, `acceleration:number`
f: `F = m·v²/r`, `a = v²/r`

---

# C. Chemistry (7)

**1123. Reaction Yield (% Yield)** | `reaction-yield-percent` | chemistry | Beaker | "Actual / theoretical yield × 100."
in: `actualG:number=18`, `theoreticalG:number=22`
out: `percentYield:percent[primary,big]`
f: `%yield = (actual/theoretical) · 100`

**1124. Equilibrium Constant (Kc)** | `equilibrium-constant` | chemistry | Beaker | "Kc from equilibrium concentrations."
in: `products:textarea`, `reactants:textarea`
out: `kc:number[primary,big]`, `position:text`
f: `Kc = Π[products]^coeff / Π[reactants]^coeff`

**1125. Reaction Rate (Rate Law)** | `reaction-rate` | chemistry | Activity | "Instantaneous rate from rate law."
in: `k:number=0.05`, `concentrations:textarea`, `orders:textarea`
out: `rate:number[primary,big]`
f: `Rate = k · Π [A]^order`

**1126. Enthalpy Change (Hess's Law)** | `enthalpy-change-hess` | chemistry | Flame | "ΔH for an overall reaction from steps."
in: `steps:textarea`
out: `deltaH:number[primary,big]`
f: `ΔH_overall = Σ (factor · ΔH_step)`

**1127. Entropy Change (ΔS°)** | `entropy-change` | chemistry | Activity | "Standard entropy change of reaction."
in: `productsEntropy:textarea`, `reactantsEntropy:textarea`
out: `deltaS:number[primary,big]`
f: `ΔS° = Σn·S°(products) − Σn·S°(reactants)`

**1128. Gibbs Free Energy (ΔG)** | `gibbs-free-energy` | chemistry | Activity | "Spontaneity check via ΔG = ΔH − TΔS."
in: `deltaH:number=-50`, `tempK:number=298`, `deltaS:number=-0.1`
out: `deltaG:number[primary,big]`, `spontaneous:text`
f: `ΔG = ΔH − T·ΔS`

**1129. Buffer Capacity (β)** | `buffer-capacity` | chemistry | Beaker | "Resistance to pH change."
in: `weakAcidMol:number=0.1`, `conjugateBaseMol:number=0.1`, `volumeL:number=1`, `pKa:number=4.75`
out: `beta:number[primary,big]`
f: `β ≈ 2.303 · ([HA]·[A−])/([HA]+[A−])`

---

# D. Travel (6)

**1130. Walking Time** | `walking-time` | travel | Footprints | "Time to walk a distance at a chosen pace."
in: `distanceKm:number=3`, `paceKmh:number=5`
out: `minutes:number[primary,big]`, `hoursMinutes:text`
f: `time = distance/pace`

**1131. Train Journey Duration** | `train-journey-duration` | travel | Train | "Total journey time including stops."
in: `distanceKm:number=500`, `avgSpeedKmh:number=80`, `stops:number=5`, `stopMinutes:number=2`
out: `totalMinutes:number[primary,big]`
f: `time = distance/speed + stops·stopMinutes`

**1132. Bike Ride Time** | `bike-ride-time` | travel | Bike | "Cycle time at chosen pace."
in: `distanceKm:number=20`, `paceKmh:number=18`
out: `minutes:number[primary,big]`
f: `time = distance/pace`

**1133. Vehicle Range (Full Tank)** | `vehicle-range` | travel | Car | "How far you can drive on a tank."
in: `tankL:number=40`, `mileageKmpl:number=15`, `reservePct:percent=10`
out: `rangeKm:number[primary,big]`, `safeRangeKm:number`
f: `range = capacity · mileage`; safe = `range · (1 − reserve%)`

**1134. Travel Delay (Expected)** | `travel-delay-prob` | travel | Clock | "Expected delay + probability of major delay."
in: `meanDelayMin:number=20`, `stdDevMin:number=15`, `thresholdMin:number=30`
out: `expectedDelay:number[primary,big]`, `probAboveThreshold:percent`
f: Normal: `P(delay > X) = 1 − Φ((X − μ)/σ)`

**1135. Layover Time Required** | `layover-min` | travel | Plane | "Min connection buffer by airport tier and route."
in: `airportTier:select=large`, `intl:toggle=true`, `terminalChange:toggle=true`
out: `minMinutes:integer[primary,big]`
f: Table: dom-dom 45 min, intl-dom 90 min, +30 min if terminal change

---

# E. Health (3)

**1136. Macronutrient Detailed** | `macronutrient-detailed` | health | Apple | "P/C/F grams with goal-driven adjustments."
in: `tdee:number=2400`, `goal:select=maintain`, `proteinGperKg:number=1.8`, `bodyWeightKg:number=70`, `fatPct:percent=25`
out: `proteinG:integer[primary,big]`, `carbG:integer`, `fatG:integer`
f: `P_g = wt·g/kg`; `F_g = TDEE·fat%/9`; `C_g = (TDEE − 4P − 9F)/4`

**1137. Cholesterol Ratio (TC/HDL)** | `cholesterol-ratio` | health | HeartPulse | "Cardiovascular risk band from TC/HDL."
in: `totalCholesterol:number=200`, `hdl:number=50`
out: `ratio:number[primary,big]`, `riskBand:text`
f: `ratio = TC/HDL`; ideal < 3.5, borderline 3.5–5, high > 5

**1138. Iron Intake (Daily mg)** | `iron-intake` | health | Apple | "Daily iron RDA by age, sex, life stage."
in: `age:number=30`, `sex:select=female`, `pregnant:toggle=false`, `lactating:toggle=false`
out: `dailyMg:number[primary,big]`
f: Table: M19+ 8, F19–50 18, pregnant 27, lactating 9

---

# F. Education (3)

**1139. CGPA → Percentage (Custom Scale)** | `cgpa-percentage-custom` | education | GraduationCap | "Custom factor for institution-specific %."
in: `cgpa:number=8.5`, `scale:select=10`, `factor:number=9.5`
out: `percentage:percent[primary,big]`
f: 10-scale CBSE: `% = CGPA·9.5`; 4-scale: `% = CGPA·25`; custom: `% = CGPA·factor`

**1140. Cumulative Marks Predictor** | `cumulative-marks-predictor` | education | GraduationCap | "Predict final marks from completed + estimated."
in: `completed:textarea`, `pending:textarea`
out: `predictedTotal:number[primary,big]`, `predictedPct:percent`, `grade:text`
f: `total = Σ(completed) + Σ(predicted)`; `% = total/Σmax · 100`

**1141. Course Credit Hours** | `course-credit-hours` | education | GraduationCap | "Sum credits + GPA-eligibility flag."
in: `courses:textarea`, `requiredCredits:number=120`
out: `totalCredits:integer[primary,big]`, `gpaEligible:text`
f: `total = Σ credits`; eligible if `total ≥ required`

---

# G. Sports (5)

**1142. Max Heart Rate (Tanaka)** | `max-heart-rate-tanaka` | sports | Heart | "208 − 0.7·age — more accurate than 220−age."
in: `age:number=30`
out: `maxHr:integer[primary,big]`, `zones:text`
f: `MHR = 208 − 0.7·age`; zones at 50/60/70/80/90% MHR

**1143. VO₂max (Bruce Treadmill Protocol)** | `vo2max-bruce` | sports | Activity | "VO₂max from time-to-exhaustion on Bruce protocol."
in: `sex:select=male`, `timeMin:number=12`
out: `vo2max:number[primary,big]`, `percentile:percent`
f: Male: `VO2 = 14.8 − 1.379·T + 0.451·T² − 0.012·T³`; Female: `VO2 = 4.38·T − 3.9`

**1144. DOTS Score (Powerlifting)** | `dots-score` | sports | Dumbbell | "Modern Wilks replacement for powerlifting comparison."
in: `bodyKg:number=85`, `totalKg:number=500`, `sex:select=male`
out: `dots:number[primary,big]`
f: `DOTS = total · 500 / (a + b·w + c·w² + d·w³ + e·w⁴)` (DOTS coeffs by sex)

**1145. Race Time VDOT (Daniels)** | `race-time-vdot` | sports | Activity | "Equivalent race times across distances."
in: `knownDistanceKm:number=5`, `knownTimeMin:number=22`, `targetDistanceKm:number=10`
out: `vdot:number[primary,big]`, `predictedTimeMin:number`, `trainingPaces:text`
f: Empirical Daniels equation: `VDOT = f(velocity, %VO2max)` from his tables

**1146. Football xG (Expected Goals)** | `football-xg` | sports | Activity | "Logistic model xG per shot."
in: `distanceM:number=12`, `angleDeg:number=30`, `shotType:select=foot`, `assistType:select=open-play`
out: `xG:number[primary,big]`
f: `xG = 1/(1 + e^−(β0 + β·features))`; lookup table by distance + angle

---

# H. Date & Time (4)

**1147. Day of Year (1–365/366)** | `day-of-year` | datetime | Calendar | "Day number + days remaining in year."
in: `date:date`
out: `dayNumber:integer[primary,big]`, `daysRemaining:integer`
f: Gregorian day-of-year (Jan 1 = 1; Dec 31 = 365 or 366 leap)

**1148. ISO Week Number** | `iso-week-number` | datetime | Calendar | "ISO 8601 year + week number for a date."
in: `date:date`
out: `isoWeek:integer[primary,big]`, `isoYear:integer`
f: ISO 8601: week with Jan 4 = week 1; weeks start Monday

**1149. Add Business Days** | `add-business-days` | datetime | Calendar | "Skip weekends + holidays to find resulting date."
in: `startDate:date`, `daysToAdd:number=10`, `holidays:textarea`
out: `resultDate:date[primary,big]`
f: Iterate forward; skip Sat/Sun and holidays until counter reaches target

**1150. Time Until Birthday** | `time-until-birthday` | datetime | Cake | "Countdown to next birthday + age you'll turn."
in: `dob:date`
out: `countdown:text[primary,big]`, `turningAge:integer`
f: Diff between now and next birthday occurrence in d/h/m/s

---

# I. Business (4)

**1151. CAC Payback Period** | `cac-payback-period` | business | Clock | "Months to recoup customer acquisition cost."
in: `cac:currency=5000`, `arpu:currency=500`, `grossMarginPct:percent=70`
out: `paybackMonths:number[primary,big]`, `healthFlag:text`
f: `Payback = CAC / (ARPU · GM%)`; healthy if < 12 months

**1152. SaaS Quick Ratio** | `saas-quick-ratio` | business | Gauge | "Growth efficiency: new+expansion vs churn+contraction."
in: `newMrr:currency=50000`, `expansionMrr:currency=20000`, `churnedMrr:currency=10000`, `contractionMrr:currency=5000`
out: `quickRatio:number[primary,big]`, `verdict:text`
f: `QR = (new + expansion)/(churned + contraction)`; ≥ 4 = excellent

**1153. Rule of 40** | `rule-of-40` | business | Activity | "Growth + margin must clear 40%."
in: `growthPct:percent=25`, `marginPct:percent=20`
out: `sum:percent[primary,big]`, `pass:text`
f: `Rule = growth% + margin%`; pass if ≥ 40

**1154. SaaS Magic Number** | `saas-magic-number` | business | TrendingUp | "Sales efficiency on new ARR vs S&M spend."
in: `quarterNewArr:currency=2000000`, `prevQuarterSmSpend:currency=1500000`
out: `magicNumber:number[primary,big]`, `verdict:text`
f: `Magic = (Q_new_ARR · 4) / prev_quarter_SM_spend`; ≥ 1 healthy, ≥ 1.5 scale up

---

# J. Developer Tools (5)

**1155. Color Contrast (WCAG)** | `color-contrast-wcag` | developer | Palette | "WCAG contrast ratio with AA/AAA pass/fail."
in: `fg:text=#000000`, `bg:text=#ffffff`
out: `ratio:number[primary,big]`, `aaNormal:text`, `aaaLarge:text`
f: Relative luminance per WCAG; ratio = (L_lighter + 0.05)/(L_darker + 0.05)

**1156. JSON Size Estimator** | `json-size` | developer | Code | "Bytes for raw / minified / gzipped JSON."
in: `json:textarea`
out: `bytesRaw:integer[primary,big]`, `bytesMinified:integer`, `gzipEstimate:integer`
f: Byte length; gzipped ≈ raw · 0.2–0.3

**1157. Markdown Word Count** | `markdown-word-count` | developer | Type | "Words, chars, reading time after stripping MD."
in: `markdown:textarea`
out: `words:integer[primary,big]`, `chars:integer`, `readingTimeMin:number`
f: Strip MD syntax; count words; reading = words / 200

**1158. Image Aspect Resize** | `image-aspect-resize` | developer | Image | "Resize image preserving aspect ratio."
in: `origW:number=1920`, `origH:number=1080`, `targetW:number=1280`, `targetH:number=0`
out: `newW:integer[primary,big]`, `newH:integer`, `aspect:text`
f: `aspect = W/H`; if newW given → `newH = newW/aspect`; reverse for H

**1159. Cron Next Run** | `cron-next-run` | developer | Clock | "Next 5 firings of a cron expression."
in: `expression:text=0 9 * * 1-5`, `timezone:text=Asia/Kolkata`
out: `nextRuns:text[primary,big]`, `description:text`
f: Parse `min hr dom mon dow`; advance from now to next 5 matching slots

---

## Index

| #         | Section         | Count  |
| --------- | --------------- | ------ |
| A         | Engineering     | 13     |
| B         | Physics         | 9      |
| C         | Chemistry       | 7      |
| D         | Travel          | 6      |
| E         | Health          | 3      |
| F         | Education       | 3      |
| G         | Sports          | 5      |
| H         | Date & Time     | 4      |
| I         | Business        | 4      |
| J         | Developer Tools | 5      |
| **Total** |                 | **59** |

---

## Skipped — already covered elsewhere

| User # | Calculator                    | Already in                     |
| ------ | ----------------------------- | ------------------------------ |
| 1      | Thermal Expansion             | next-300 #556                  |
| 2      | Heat Transfer (basic)         | next-300 #555                  |
| 5      | Beam Deflection               | next-300 #559                  |
| 8      | Retaining Wall                | next-300 #563                  |
| 9      | Staircase                     | original #250                  |
| 13     | Column Buckling               | next-300 #560                  |
| 16     | Pulley Belt (RPM)             | next-300 #544 / #546           |
| 17     | Shaft Torque (power→torque)   | next-300 #548                  |
| 18     | Bearing Life L10              | next-300 #550                  |
| 20     | Flow Rate Q=A·v               | next-300 #552                  |
| 21     | HVAC Load BTU/h               | next-300 #537                  |
| 23     | Reynolds Number               | next-300 #554                  |
| 29     | Wave Speed v=λf               | original #288                  |
| 31     | Specific Heat Q=mcΔT          | next-300 #555                  |
| 37     | Oscillation Period (pendulum) | original #290                  |
| 38     | Avogadro Moles↔Particles      | original #304                  |
| 49     | Gasoline Cost (route)         | original #255                  |
| 50     | Miles per Liter               | original #256                  |
| 52     | Currency Exchange Fee         | next-300 #500                  |
| 53     | International Travel Cost     | next-300 #499                  |
| 56     | RMR (Mifflin-St Jeor)         | original #133 BMR              |
| 57     | LBM Boer                      | original #141                  |
| 59     | Hydration Status              | original #137 Water Intake     |
| 62     | Sleep Cycle Detailed          | original #160                  |
| 63     | VO₂max Test                   | original #149 (Cooper variant) |
| 65     | GRE Score Predictor           | next-300 #455                  |
| 66     | TOEFL Score                   | next-300 #473                  |
| 67     | IELTS Band Score              | next-300 #472                  |
| 69     | Final Exam Mark Needed        | next-300 #462                  |
| 70     | Class Rank Estimator          | next-300 #467                  |
| 74     | Wilks Coefficient             | next-300 #665-area / batch3    |
| 77     | Cricket Strike Rate           | original #368                  |
| 79     | Golf Course Handicap          | original #369                  |
| 80     | Working Hours Between         | original #188                  |
| 81     | Business Days Custom          | original #184                  |
| 86     | Burn Rate Detailed            | next-300 #398 / batch1 #92     |

---

## Additional flags I noticed (not in user notes — verify before building)

- **#1110 Pipe Friction Loss (Darcy–Weisbach)** ↔ batch1 #136 (`darcy-weisbach`) — same formula. Decide whether this batch's richer spec replaces #136, or merge.
- **#1111 Heat Exchanger LMTD** ↔ batch1 #141 (`lmtd`) — same. Merge or drop.
- **#1105 Moment of Inertia (shape library)** extends batch1 #145 (rect-only). Recommendation: supersede #145 with this multi-shape version.
- **#1130 Walking Time** vs batch2 #453 (Walk vs Drive Time) — different but overlapping. Keep both since #453 is a comparison.
- **#1138 Iron Intake** — domain matches CalcMaster style; net-new in the registry.

If you want, point me at a section and I'll generate the full TypeScript schema (`src/lib/calculators/schemas/{category}.ts` entries) so you can paste straight into the codebase.
