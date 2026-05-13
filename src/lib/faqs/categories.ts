import type { Category } from "@/types/calculator";
import type { FaqItem } from "./types";

/**
 * 6-10 SEO-targeted FAQs per category. Mounted on /category/[id] pages with
 * FAQPage JSON-LD so each category page is eligible for rich SERP snippets
 * independently of the calculator-level FAQs.
 */
export const CATEGORY_FAQS: Record<Category, FaqItem[]> = {
  finance: [
    {
      q: "What is a finance calculator?",
      a: "A finance calculator is any tool that computes money-related outcomes — loan EMIs, SIP returns, compound growth, taxes, retirement corpus, etc. CalcMaster's Finance category has 68 calculators covering loans, investments, taxes, business math, and personal finance, all free and instant.",
    },
    {
      q: "Which finance calculator should I use?",
      a: "Start with your question: 'What will I get back?' → SIP, Lumpsum, Compound Interest. 'What will I pay?' → EMI, Mortgage, Credit Card Payoff. 'Am I on track?' → Retirement Planner, Net Worth, DTI Ratio. The category page lists all 68 — search by name in the global ⌘K palette to jump straight to one.",
    },
    {
      q: "Are finance formulas the same worldwide?",
      a: "The pure math is — compound interest, IRR, NPV, EMI all use universal formulas. Tax slabs, retirement schemes (401K, NPS, PPF), and tenure norms differ by country. For India-specific products like PPF, NPS, EPF, SSY, GST, HRA, use the Finance (India) category which has 24 dedicated calculators.",
    },
    {
      q: "Can I trust these for real decisions?",
      a: "The math is correct and sourced from standard public formulas. For decisions involving real money, taxes, or legal commitments, always cross-check with a qualified financial advisor or CA. CalcMaster is an educational tool, not advisory.",
    },
    {
      q: "Do you account for taxes?",
      a: "Most calculators output gross numbers. The Income Tax calculator computes tax under both old and new Indian regimes. For other calcs, mentally subtract the tax applicable to your situation (e.g. ~12.5% LTCG above ₹1.25 L for equity, slab rate for debt-fund gains).",
    },
    {
      q: "Are the rates and slabs up to date?",
      a: "We use the latest published rates: PPF 7.1%, EPF 8.15% (FY 2024-25), SSY 8.2%, NPS market-linked, new-regime income-tax slabs as per FY 2024-25 Budget. Banks may quote slightly different FD/loan rates; type the rate your bank gave you for an exact answer.",
    },
    {
      q: "Can I download or print the results?",
      a: "Every calculator page supports browser-print (Ctrl/Cmd + P) — the print CSS hides nav and shows just the calculator + result + (where applicable) amortization schedule. PDF/CSV export is on the roadmap.",
    },
    {
      q: "How do I share a calculation with someone?",
      a: "Click the share icon next to the result — uses your device's native share sheet on mobile, copies the URL on desktop. Shareable pre-filled URLs (encoding the inputs) are being added across all calculators.",
    },
  ],
  "finance-india": [
    {
      q: "What's in the Finance (India) category?",
      a: "24 calculators specific to Indian tax and savings products: PPF, NPS, EPF, SSY (Sukanya Samriddhi), KVP, SCSS, POMIS, NSC, SGB (gold bonds), advance tax, TDS, regime comparison, ELSS, XIRR, SWP, STP, brokerage charges, stamp duty, LTCG / STCG / property capital gains, and step-up SIP.",
    },
    {
      q: "Should I choose the old or new tax regime?",
      a: "Use the Regime Compare calculator with your numbers. Quick rule: if your total deductions (80C + 80D + HRA + home-loan interest + other) exceed ~₹3-4 lakh, old regime wins. If you have minimal deductions, new regime's lower rates win. Most salaried people with rented housing and an active home loan are still better off in the old regime.",
    },
    {
      q: "What are the FY 2024-25 income tax slabs?",
      a: "New regime: 0% up to ₹3 L, 5% to ₹7 L, 10% to ₹10 L, 15% to ₹12 L, 20% to ₹15 L, 30% above. Plus 4% cess. Standard deduction ₹75,000. Old regime: 5% from ₹2.5 L, 20% from ₹5 L, 30% above ₹10 L. Both include rebate under 87A.",
    },
    {
      q: "What's the PPF interest rate?",
      a: "Currently 7.1% (compounded annually, tax-free under EEE). Max yearly deposit ₹1.5 L, tenure 15 years (extendable in 5-year blocks).",
    },
    {
      q: "Is SSY (Sukanya Samriddhi) still a good investment?",
      a: "Yes for parents of girls under 10. Current rate 8.2% (tax-free), 21-year maturity, deposits qualify for 80C. The Sukanya Samriddhi calculator shows the full 21-year corpus from your yearly contribution.",
    },
    {
      q: "How is LTCG on equity taxed in India?",
      a: "12.5% above ₹1.25 lakh exemption per FY (post Budget 2024). STCG (held < 12 months) is taxed at 20%. Use the LTCG (Equity) and STCG (Equity) calculators for exact post-tax returns.",
    },
    {
      q: "Why do brokerage costs matter so much?",
      a: "On a ₹1 lakh round trip in equity delivery, STT alone is ~₹100, plus GST + exchange + DP charges. The Stock Brokerage (India) calculator shows the full breakdown. Frequent trading silently eats 1-3% of capital annually.",
    },
    {
      q: "What is XIRR and when should I use it?",
      a: "XIRR is the annualized rate of return on an investment with irregular cash flows (typical for SIP redemptions across years). Use it instead of point-to-point CAGR whenever you've invested or withdrawn at different times. The XIRR calculator handles this for you.",
    },
  ],
  math: [
    {
      q: "What math calculators are available?",
      a: "41 calculators covering basic arithmetic, percentage, fractions, scientific (trig/log/exp), statistics (mean, median, mode, stddev, variance, z-score, confidence interval, sample size), algebra (quadratic, slope, distance, exponent, root), number theory (prime, GCD/LCM, factorial, perm-comb), number bases (binary/octal/hex), geometry shortcuts, and sequence math (AP/GP/Fibonacci).",
    },
    {
      q: "Is this a graphing calculator?",
      a: "Not yet — for now we render results numerically. The Quadratic Solver and Slope calculators include light visualizations. For complex graphing (function plots, derivatives), use Desmos or GeoGebra alongside. Interactive graphing is planned.",
    },
    {
      q: "Does the scientific calculator support BODMAS?",
      a: "Yes — it uses standard order of operations (parentheses, exponents, multiplication/division, addition/subtraction). The Basic Calculator does left-to-right immediate evaluation (calculator-style).",
    },
    {
      q: "Can I paste a list of numbers?",
      a: "Yes for Statistics, GCD/LCM, NPV, and IRR calculators. Paste comma- or space-separated numbers — we parse them automatically and filter out non-numeric values.",
    },
    {
      q: "How accurate is the statistics output?",
      a: "Computed in JavaScript using standard formulas. Mean / median / mode / stddev / variance match Excel and Python's `statistics` module to floating-point precision. For very large datasets (>10 000 values) the page may slow down; we recommend offline tools for that.",
    },
    {
      q: "What's the difference between permutation and combination?",
      a: "Permutation (nPr) counts arrangements where order matters (PIN codes, race positions). Combination (nCr) counts selections where order doesn't (lottery picks, team selections). Use the Permutation & Combination calculator for both.",
    },
    {
      q: "Are these aligned with school syllabus?",
      a: "The formulas follow standard ICSE / CBSE / NCERT and most international curriculums. Step-by-step reasoning isn't shown yet — we're working on a 'show working' mode for the algebra calculators.",
    },
  ],
  geometry: [
    {
      q: "What geometry calculators do you have?",
      a: "18 shapes: triangle (right, equilateral, general / Heron's), Pythagorean theorem, circle, ellipse, square, rectangle, parallelogram, trapezoid, regular polygon (n sides), cube, cuboid, sphere, cylinder, cone, pyramid, torus. Each computes area, volume, surface, perimeter, slant height as applicable.",
    },
    {
      q: "Is everything in SI units?",
      a: "Inputs are dimensionless — type 5 meters or 5 feet, the math holds. Outputs use the same unit, so a 5×5×5 cube has volume 125 (in your chosen unit cubed). For unit conversion of the result, use the Length / Area / Volume converters.",
    },
    {
      q: "Does it support coordinate geometry?",
      a: "Slope, distance (2D), and Pythagorean theorem cover the common cases. Full coordinate-geometry (line equations, conic sections, transformations) is on the roadmap.",
    },
    {
      q: "Triangle solver — what do I need to input?",
      a: "All three sides for area (Heron's formula). For the right-triangle calculator: any two sides → hypotenuse, area, perimeter, both angles. The general-triangle calculator from sides gives perimeter + area + all three interior angles.",
    },
    {
      q: "Why isn't my obtuse triangle valid?",
      a: "Triangle inequality: each side must be less than the sum of the other two. If you enter 1, 2, 5 — there's no real triangle. The calculator returns 0 area in that case.",
    },
    {
      q: "Do you have torus / dodecahedron / icosahedron?",
      a: "Torus is included. Platonic-solid calculators (dodecahedron, icosahedron, tetrahedron) are coming in the next geometry expansion. For most engineering / DIY use cases, cube / cylinder / cone / sphere cover 95% of needs.",
    },
  ],
  health: [
    {
      q: "What health calculators are here?",
      a: "32 calculators: BMI, BMR, TDEE, calorie target, body fat % (US Navy + Army), lean body mass, ideal weight (Robinson / Miller / Devine / Hamwi), healthy weight range, macro splitter, carb / protein / fat intake, body surface area, somatotype, 1RM (Epley / Brzycki / Lombardi), target heart rate, max HR, calories burned by activity, running pace + predictor, VO₂ max, pregnancy due date + weight gain, ovulation, period tracker, sleep cycle, BAC, GFR (kidney function), and steps-to-calories.",
    },
    {
      q: "Should I trust BMI?",
      a: "BMI is a screening tool, not a diagnosis. It doesn't distinguish muscle from fat. South Asians develop metabolic risk at lower BMIs than Europeans — ICMR recommends 23 (overweight) and 25 (obese) cut-offs instead of WHO's 25 and 30. Pair BMI with Body Fat % and waist-to-height ratio for a fuller picture.",
    },
    {
      q: "Is this medical advice?",
      a: "No. CalcMaster's health calculators are educational. For any actionable health concern — weight loss, fertility planning, alcohol-related driving decisions, kidney function — talk to a doctor. We share the math behind the numbers; we don't replace clinical judgment.",
    },
    {
      q: "Which calorie calculator is most accurate?",
      a: "We use Mifflin-St Jeor for BMR (the modern standard, more accurate than older Harris-Benedict). TDEE = BMR × activity multiplier (1.2–1.9). Real-world variation is ±10% from genetics and muscle mass. Direct measurement (indirect calorimetry) is more accurate but only available in labs.",
    },
    {
      q: "What's the difference between BMR and TDEE?",
      a: "BMR = calories burned at complete rest (organs, breathing). TDEE = total daily expenditure = BMR × activity. Eat at TDEE to maintain weight; subtract 500 kcal/day for ~0.5 kg/week loss.",
    },
    {
      q: "Are the macro splits right for me?",
      a: "We offer 4 presets (balanced 30/40/30, low-carb 40/20/40, keto 25/5/70, endurance 20/60/20). Bodybuilders need higher protein (2-2.2 g/kg); endurance athletes need higher carbs. Talk to a registered dietitian for personalised macros.",
    },
    {
      q: "Can pregnant or nursing women use these?",
      a: "The Pregnancy Due Date and Pregnancy Weight Gain calculators are designed for pregnancy. Other health calculators (BMI, calorie, alcohol BAC) should NOT be used during pregnancy without medical supervision — your metabolism and tolerance differ.",
    },
  ],
  converter: [
    {
      q: "How many unit converters are available?",
      a: "30 converters: length, mass, temperature, area, volume, speed, time, data storage, energy, pressure, angle, force, torque, power, frequency, fuel economy, density, acceleration, magnetic flux, current, voltage, resistance, capacitance, plus formatted converters (Roman numerals, number-to-words, Indian number system, shoe / clothing / ring / bra sizes).",
    },
    {
      q: "Why is temperature different from the others?",
      a: "Temperature uses offsets, not just factors. 0°C ≠ 0°F (their zero points are different). The Temperature converter uses the correct linear formula T_K = T_C + 273.15, T_F = T_C × 9/5 + 32. Every other unit converter uses pure ratios.",
    },
    {
      q: "What's the difference between KB (1000) and KiB (1024)?",
      a: "SI uses 1000-based prefixes (KB = 1000 bytes). Binary uses 1024-based (KiB = 1024 bytes). Hard drives are sold in KB/MB/GB (1000-based); operating systems often show 1024-based with the same labels — which is why a '500 GB' drive shows ~465 GB on Windows. The Data Storage converter supports both.",
    },
    {
      q: "Are the conversion factors official?",
      a: "Yes — sourced from NIST and ISO standards. 1 mile = 1.609344 km exactly. 1 lb = 0.45359237 kg exactly. Floating-point precision means results may show e.g. 1.6093440000000001 — for typical use, three decimals is enough.",
    },
    {
      q: "How accurate is currency conversion?",
      a: "Currently using approximate offline rates updated periodically. For mission-critical transfers, check Wise, Revolut, or your bank's live rate. The displayed rate is mid-market; banks typically subtract 1–3% spread.",
    },
    {
      q: "Do you have cooking unit conversion?",
      a: "Yes — see the Cooking category for tbsp ↔ tsp ↔ ml, cups ↔ grams (ingredient-aware: flour, sugar, butter, etc. have different densities), oven temperature (°C ↔ °F ↔ Gas Mark), and recipe scaling.",
    },
  ],
  datetime: [
    {
      q: "What date/time calculators are here?",
      a: "14 calculators: age (years + months + days + total days/weeks), date difference, add/subtract days, working days (with custom holidays), time-zone converter (10 zones), time add/subtract (hh:mm), timesheet (weekly hours + overtime), hours between times, day-of-week for a date, day counter, countdown to a future date, stopwatch formatter, Pomodoro timer planner, and gestational age (LMP → weeks pregnant + due date).",
    },
    {
      q: "Do calculators handle leap years correctly?",
      a: "Yes — every date calculator uses the native JavaScript Date object which handles leap years (every 4, except century, except every 400). Feb 29 birthdays show 'next birthday' correctly.",
    },
    {
      q: "How does the working-days calculator handle holidays?",
      a: "Excludes weekends by default. Paste your country's or company's holidays (one per line, YYYY-MM-DD) and they're excluded too. The output shows working days, weekend days, and holiday days separately.",
    },
    {
      q: "Is the time-zone converter DST-aware?",
      a: "Yes. Uses the IANA tz database via the browser's `Intl.DateTimeFormat`. London shifts from GMT to BST in March; the converter follows the rule automatically.",
    },
    {
      q: "Can I calculate age in months or weeks specifically?",
      a: "Yes — the Age calculator outputs years, months, days, total months, total weeks, and total days simultaneously. It also shows your next birthday and the day-of-week you were born.",
    },
    {
      q: "What's gestational age vs pregnancy due date?",
      a: "Gestational age = weeks since LMP (last menstrual period). Due date = LMP + 280 days. Both calculators are separate so you can use whichever input you have.",
    },
  ],
  crypto: [
    {
      q: "What crypto and stock calculators are here?",
      a: "20 calculators: crypto profit (with fees), staking yield (APY compounding), DCA simulation, stock average price (multi-buy), P/E ratio, position size (risk-based), India crypto tax (30% + 1% TDS), mining profit, impermanent loss, APY↔APR conversion, liquidation price (margin), leverage/margin, risk:reward, forex pip value + position size, India stock brokerage breakdown, stock profit, stop-loss / take-profit, and EPS / book value.",
    },
    {
      q: "How is Indian crypto tax calculated?",
      a: "Profits are taxed at flat 30% (no slab, no deduction). Plus 1% TDS on every transaction. Losses can't be offset against gains in other assets. The Crypto Tax India calculator shows the bite on your specific trade.",
    },
    {
      q: "What is impermanent loss?",
      a: "When you provide liquidity to an AMM (Uniswap, Pancakeswap), price divergence between the two assets in the pool causes your share to be worth less than just holding the assets. The IL calculator shows the % loss at any given price ratio. Earned trading fees offset this — the question is whether fees > IL.",
    },
    {
      q: "How do I size a trade safely?",
      a: "Use the Position Size calculator: (account size × risk % per trade) / (entry − stop) = quantity. Risk 1% per trade and you can be wrong 100 times consecutively before going to zero. Risk 5% and you're out in 20 wrong trades.",
    },
    {
      q: "What's the difference between APY and APR?",
      a: "APY = annualized rate with compounding effect. APR = annualized rate without. APY > APR. Most staking platforms quote one as the other. Use the APY↔APR calculator to convert based on the compounding frequency (daily, weekly, monthly).",
    },
    {
      q: "Can I track multiple trades?",
      a: "Each calculator handles one trade at a time. Use the Stock Average calculator with multiple buys to compute an averaged-down cost basis. Portfolio tracking is on the roadmap.",
    },
  ],
  construction: [
    {
      q: "What can I plan with the construction calculators?",
      a: "22 calculators: concrete (slab + column + cement/sand/aggregate by mix ratio), mortar/plaster, brick + block counting, tile + flooring + carpet + wallpaper estimation, paint coverage, roofing + roof pitch, drywall, lumber (board feet), stud-wall framing, rebar, stairs, mulch/topsoil, gravel (volume + weight), fencing, and pool volume.",
    },
    {
      q: "Do these match Indian / IS / BIS standards?",
      a: "We use IS-456 (concrete) mix ratios — M15 (1:2:4), M20 (1:1.5:3), M25 (1:1:2). Brick math assumes standard 230×110×75 mm modular brick. For project-grade quotes, always confirm with your contractor's site measurements.",
    },
    {
      q: "How many bags of cement do I need?",
      a: "Use the Concrete Slab calculator → multiplies volume × 6.4 bags/m³ (M20). Round up. The Cement / Sand / Aggregate calculator gives precise totals for any mix and shows separate quantities for cement, sand, and aggregate.",
    },
    {
      q: "What's a reasonable waste-percent for tiles and paint?",
      a: "Default is 10% — covers cuts at edges, breakage, and pattern alignment. For complex layouts (herringbone, intricate borders), bump to 15%. Paint coverage is ~10 m²/L for typical interior walls per coat.",
    },
    {
      q: "How accurate is the stair calculator?",
      a: "Steps = total rise ÷ riser height (round up). Tread depth = total run ÷ steps. Indian Building Code recommends riser 150–175 mm and tread 250–300 mm. The calculator validates the riser height and warns if it's outside the safe range.",
    },
    {
      q: "Pool volume — square or oval?",
      a: "The pool calculator supports rectangular and round shapes. For free-form / kidney pools, approximate as a rectangle with the equivalent surface area. Output is in m³ and litres — enough to size the heater and pump.",
    },
  ],
  automotive: [
    {
      q: "What automotive calculators do you have?",
      a: "12 calculators: fuel cost, mileage (km/L ↔ MPG ↔ L/100km), multi-leg trip cost, horsepower (from torque + RPM), engine displacement (bore × stroke × cylinders), tire size (205/55R16 → diameter), average speed, travel time, lap time / race pace, India toll estimator (FASTag), EV charging cost, and EV-vs-petrol annual cost.",
    },
    {
      q: "Is the mileage calculator MPG or km/L?",
      a: "Both, in real-time. Enter distance and fuel used — get km/L, MPG (US), and L/100km simultaneously. India quotes km/L; US uses MPG; Europe uses L/100km.",
    },
    {
      q: "How do I read a tire size like 205/55R16?",
      a: "205 = section width in mm. 55 = aspect ratio (sidewall = 55% of width). R = radial construction. 16 = rim diameter in inches. The Tire Size calculator computes overall tire diameter, circumference, and revolutions per km.",
    },
    {
      q: "Is the EV-vs-petrol calculator accurate for India?",
      a: "Inputs are your annual km, petrol mileage, current fuel price, EV range per full charge, and electricity rate. Output is annual savings. Excludes resale value, battery degradation, and service costs — for those, talk to a dealer.",
    },
    {
      q: "What's the toll estimator based on?",
      a: "Approximate ₹/km × distance × vehicle class multiplier. Actual tolls vary by stretch (FASTag rates published on NHAI). For exact tolls, use the official NHAI route planner.",
    },
    {
      q: "How does engine horsepower calculate?",
      a: "HP = torque (Nm) × RPM / 9549 × 1.341. The calculator outputs both kW and HP. Real-world peak HP depends on the dyno method and altitude — manufacturer specs are SAE-Net or DIN-rated for consistency.",
    },
  ],
  physics: [
    {
      q: "What physics topics are covered?",
      a: "25 calculators: Newton's 2nd law (F = ma + solvers), weight on different planets, kinetic and potential energy, work, power, momentum, impulse, kinematics (v = u + at, free fall, projectile motion), friction coefficient, pressure (F/A), density, buoyancy, Ohm's law (V, I, R, P), resistor/capacitor networks (series + parallel), wave equation, Doppler effect, pendulum period, and Hooke's spring law.",
    },
    {
      q: "Is this for high-school physics?",
      a: "Mostly yes — covers Class 9-12 (ICSE / CBSE) and AP Physics 1/2 topics. Each calculator shows the formula so you can verify against your textbook.",
    },
    {
      q: "Why isn't relativity / quantum here?",
      a: "We focus on classical mechanics + basic electromagnetism, which cover school + undergraduate engineering needs. Relativity and quantum involve too many edge cases for a single-input form. Use Wolfram Alpha for those.",
    },
    {
      q: "Free fall and projectile — what assumptions?",
      a: "Vacuum (no air resistance). Constant gravity g = 9.81 m/s². For real-world fall (with drag), values are 10-20% off depending on object shape and altitude. Use only as an idealised first estimate.",
    },
    {
      q: "Does the resistor calculator support both series and parallel?",
      a: "Yes — paste resistor values, toggle the configuration. Same for capacitors (rules are flipped: series adds reciprocals, parallel adds directly).",
    },
    {
      q: "What's the Doppler effect calculator for?",
      a: "Computes the observed frequency when source and/or observer is moving. Useful for school physics problems and basic radar / ultrasound theory.",
    },
  ],
  chemistry: [
    {
      q: "What chemistry calculators are available?",
      a: "15 calculators: molarity, molality, molar mass (from chemical formula), moles ↔ mass ↔ atoms, mass percent, dilution (M₁V₁ = M₂V₂), pH / pOH from [H⁺], buffer pH (Henderson-Hasselbalch), ideal gas law (PV = nRT), Boyle's & Charles's laws, radioactive half-life, empirical formula from mass %, Avogadro / mole conversion, density, and solution concentration (mg/L ↔ ppm ↔ %).",
    },
    {
      q: "How does molar mass calculation work?",
      a: "Type the formula like H2O or NaCl or C6H12O6. The calculator parses element symbols and subscripts, sums atomic masses from a lookup table covering H to common metals. For complex organic compounds with parentheses (e.g. Ca(OH)2), expand manually for now — parenthesis-parsing is on the roadmap.",
    },
    {
      q: "Is this for school chemistry?",
      a: "Yes — covers ICSE / CBSE / IB / AP Chemistry topics at the level of stoichiometry, acid-base, gas laws, and basic kinetics. Quantum chemistry (orbitals, hybridization) needs a different tool.",
    },
    {
      q: "pH = 7, why isn't it always neutral?",
      a: "Neutral pH = 7 only at 25°C. At body temperature (37°C), neutral pH ≈ 6.81. The calculator doesn't apply temperature correction — use it at standard conditions or apply the correction manually.",
    },
    {
      q: "How accurate is the empirical formula?",
      a: "Input element:mass% pairs. The calculator divides each by the element's atomic mass to get mole ratios, then normalizes to the smallest. Whole-number rounding works for simple molecules; complex hydrates may need manual adjustment.",
    },
    {
      q: "What is the Henderson-Hasselbalch equation?",
      a: "pH = pKa + log([A⁻]/[HA]). Used to compute the pH of a buffer solution. Type pKa and the concentrations of conjugate base and weak acid — get the buffer's pH instantly.",
    },
  ],
  electrical: [
    {
      q: "What electrical calculators do you have?",
      a: "12 tools: Ohm's law (full solver), resistor color code (4-band → resistance, plus reverse), voltage drop on wire, AWG wire gauge sizing, LED series resistor, RC and RL time constants, decibel (power or voltage ratio), power factor, battery life (mAh ÷ load), and solar panel sizing for off-grid loads.",
    },
    {
      q: "How do I read a resistor color code?",
      a: "4-band: digit-digit-multiplier-tolerance. Pick the colors in the Resistor Color Code calculator → get resistance + tolerance. There's also a reverse calculator: type the resistance value, get the colors.",
    },
    {
      q: "What's the right LED series resistor?",
      a: "R = (Vsupply − Vled_forward) / Iled. The LED Series Resistor calculator does this for you — also outputs the power dissipated so you can pick a 1/4-watt or 1/2-watt resistor.",
    },
    {
      q: "How big a battery do I need for X hours?",
      a: "Battery life ≈ (capacity in mAh / load in mA) × efficiency factor (~0.7). The Battery Life calculator includes the factor. For lithium-ion, real-world usable capacity is 80-90% of rated.",
    },
    {
      q: "How is solar panel size computed?",
      a: "Required watts = (daily energy kWh × 1000) / (peak sun hours × system efficiency). Type your daily kWh load and local sun-hours; the calculator outputs required panel watts and how many 300W panels that translates to.",
    },
    {
      q: "Why does voltage drop matter?",
      a: "Long wires drop voltage proportional to current × resistance. The Voltage Drop calculator uses wire material (copper vs aluminium) and length to estimate drop — typically should stay under 3% for branch circuits per electrical code.",
    },
  ],
  cooking: [
    {
      q: "What cooking calculators are here?",
      a: "10 calculators: recipe scaler, cups ↔ grams (ingredient-aware: flour, sugar, butter, rice, oil, honey have different densities), tbsp ↔ tsp ↔ ml ↔ fl oz ↔ cup, oven temperature (°C ↔ °F ↔ Gas Mark), baking pan conversion (area ratio), cooking time (by meat type + weight), bread (yeast + sugar + water + salt from flour), coffee brew ratio, alcohol ABV (from OG / FG), and macros per recipe serving.",
    },
    {
      q: "1 cup of flour — how many grams?",
      a: "120 g (loosely scooped). The Cups ↔ Grams calculator includes 6 ingredients with their actual densities: flour 120, sugar 200, butter 227, rice 200, oil 224, honey 340 g/cup. Always weigh ingredients for baking accuracy — volume measurements vary by 10-20% depending on packing.",
    },
    {
      q: "What's the right coffee-to-water ratio?",
      a: "Default 1:16 (60 g coffee per litre of water) is industry standard for filter coffee. Stronger: 1:14. Weaker: 1:18. Espresso uses 1:2 ratio (different category).",
    },
    {
      q: "How long to cook a chicken?",
      a: "Roughly 45 min per kg at 180°C. The Cooking Time calculator includes lookup tables for chicken, beef (rare/medium/well), pork, lamb, and turkey. Always verify internal temperature with a thermometer — 75°C for poultry, 63°C for beef medium.",
    },
    {
      q: "Is the ABV calculator accurate for homebrew?",
      a: "Standard formula: ABV ≈ (OG − FG) × 131.25. Accurate within 0.5% for most fermentations. For higher-precision (high-gravity beers), use the alternative Toolbox formula.",
    },
    {
      q: "Can I convert a recipe between pan sizes?",
      a: "Yes — the Baking Pan Conversion calculator computes the area ratio. A 9-inch round pan is ~57% the area of a 9×13 rectangular pan, so multiply ingredient quantities by 0.57 to fit.",
    },
  ],
  lifestyle: [
    {
      q: "What's in the Lifestyle category?",
      a: "15 calculators: GPA (4.0 or 10.0 scale), CGPA-to-percentage, exam grade needed for target, exam score predictor (with negative marking), tip + split bill, love-compatibility (fun), name numerology, age in days/hours/minutes, zodiac (Western + Chinese), wedding anniversary symbol, retirement countdown, carbon footprint, and water footprint.",
    },
    {
      q: "Is the GPA calculator US or Indian?",
      a: "Both — toggle between 4.0 scale (US) and 10.0 scale (India / CBSE / VTU). Paste grade:credit pairs, get cumulative GPA. The CGPA-to-Percentage calculator follows the standard ×9.5 rule for 10-point scales (VTU / Anna University use slightly different multipliers — verify with your institute).",
    },
    {
      q: "How does the love compatibility calculator work?",
      a: "It's a fun calculator, not science — it sums letter occurrences from 'LOVES' across both names and computes a percentage. Don't make life decisions from it.",
    },
    {
      q: "Is name numerology real?",
      a: "Numerology is a belief system, not science. We provide the Pythagorean numerology mapping (A=1, B=2, …, summed and reduced to a single digit) as a curiosity. Treat it as entertainment, not advice.",
    },
    {
      q: "Is the carbon footprint accurate?",
      a: "Rough order of magnitude. Inputs are annual km driven, short and long flights, and diet category. Output is tonnes CO₂/year. Actual values depend on your car's efficiency, electricity grid mix, food sourcing, etc. Use it for awareness, not regulatory reporting.",
    },
    {
      q: "Anniversary symbol meanings?",
      a: "Year 1 = paper, 5 = wood, 10 = tin, 25 = silver, 50 = gold, 60 = diamond, 75 = platinum. The Wedding Anniversary calculator shows your number and matching symbol.",
    },
  ],
  developer: [
    {
      q: "What developer tools are here?",
      a: "14 utilities: IP subnet (CIDR → mask + hosts + broadcast), subnet mask converter (dotted ↔ CIDR), MAC OUI lookup, Base64 encode/decode, URL encode/decode, HTML entity encode/decode, hash generator (SHA-1/256/384/512), UUID generator, password generator (configurable charset), password strength meter (entropy), random string generator, bandwidth / download time, color converter (HEX ↔ RGB ↔ HSL), and cron expression helper.",
    },
    {
      q: "Is everything client-side?",
      a: "Yes — every developer tool runs in your browser. Base64, hashes, UUIDs, passwords — none of it is sent to a server. Safe to use for sensitive data.",
    },
    {
      q: "How accurate is the password strength meter?",
      a: "Entropy in bits = length × log₂(charset size). 60+ bits = strong, 80+ = very strong. The verdict scale: < 28 weak, 28-60 reasonable, 60-128 strong, > 128 very strong (passphrases). It does NOT check against breached-password lists.",
    },
    {
      q: "Why is UUID v4 the default?",
      a: "v4 is the universally-supported random-UUID standard. The page uses the browser's `crypto.randomUUID()` which is cryptographically secure on all modern browsers.",
    },
    {
      q: "Cron expression — minute hour day month weekday?",
      a: "Five fields, space-separated. Examples: `0 9 * * 1-5` = 9 AM weekdays. `*/15 * * * *` = every 15 minutes. The Cron Helper calculator builds the expression interactively and explains it in plain English.",
    },
    {
      q: "Does the IP Subnet calculator support IPv6?",
      a: "Only IPv4 currently. IPv6 subnet math is straightforward but the UX is different — coming in the next developer-tools expansion.",
    },
  ],
  weather: [
    {
      q: "What weather calculators are there?",
      a: "7 tools: wind chill (apparent temperature with wind), heat index (feels-like with humidity), dew point, humidity (relative ↔ absolute), UV exposure time (by skin type), sunrise/sunset (from latitude + longitude), and moon phase + illumination.",
    },
    {
      q: "How is wind chill calculated?",
      a: "Canadian/US standard formula (2001 update): WC = 13.12 + 0.6215T − 11.37·V^0.16 + 0.3965·T·V^0.16, where T is °C and V is wind speed in km/h. Valid for T ≤ 10°C and V ≥ 4.8 km/h.",
    },
    {
      q: "Heat index vs feels-like — same thing?",
      a: "Yes for warm-weather feels-like. Heat index uses temperature and relative humidity (Rothfusz / Steadman formula). Wind chill is used for cold weather. Both are 'apparent temperature' measures.",
    },
    {
      q: "Is the sunrise/sunset calculator accurate?",
      a: "Astronomical algorithm with ~1 minute accuracy under standard atmospheric refraction. Type your latitude / longitude / date — output is in UTC (convert to your local zone separately, or use the Timezone calculator).",
    },
    {
      q: "How is moon phase computed?",
      a: "Synodic period of 29.530588853 days. The calculator outputs the named phase (New, First Quarter, Full, Last Quarter, etc.) and illumination %. Accurate enough for everyday use; for astronomy / astrology timing of within minutes, use a specialised ephemeris.",
    },
    {
      q: "What's a 'safe' UV exposure time?",
      a: "Depends on your skin type (Fitzpatrick I-VI) and the current UV index. The UV Exposure calculator multiplies base time by 6/UVI and divides by skin type to give an estimated time to first sunburn. Always wear SPF 30+; this is a minimum, not a recommendation.",
    },
  ],
  sports: [
    {
      q: "What sports calculators do you have?",
      a: "8 sport-specific tools: cricket run rate, cricket required run rate (chase math), simplified DLS revised target, cricket batting/bowling stats (strike rate, average, economy), golf handicap (USGA formula), bowling (10-pin) score, darts checkout (from remaining score), and fantasy cricket points.",
    },
    {
      q: "Is the DLS calculator official?",
      a: "No — it's a simplified linear approximation (overs ratio × score). Official DLS uses the full resource-percentage table published by ICC, which varies by score and wickets. For accurate revised targets in serious matches, use ICC's published tables.",
    },
    {
      q: "Strike rate vs batting average?",
      a: "Strike rate = runs scored per 100 balls (T20 attacking metric). Batting average = total runs / times out (Test-cricket consistency metric). The Cricket Stats calculator outputs both, plus bowling average and economy.",
    },
    {
      q: "Fantasy cricket points formula?",
      a: "Standard Dream11 scoring: 1 pt per run, +1 per boundary, +2 per six, 25 per wicket, 8 per catch, +8 for fifty, +16 for century. The Fantasy Cricket calculator computes the points for a given performance.",
    },
    {
      q: "Golf handicap — USGA or R&A?",
      a: "USGA differential calculation. Type your last 5 (or more) scores along with course rating and slope. The output is your handicap index using the lower-half-of-differentials method. Multiple-handicap-systems support is on the roadmap.",
    },
    {
      q: "Darts checkout — what's the suggested finish for 161?",
      a: "T20-T17-Bull (three darts). The Darts Checkout calculator has lookup tables for all common checkouts. For non-standard values, it suggests aiming for a number that leaves you on a double.",
    },
  ],
};
