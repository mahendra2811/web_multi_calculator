# 300 New Calculators — Batch 1

> Spec for the next 300 calculators to build. Most are **schema-driven** (default). Mark a calc as `[custom]` only if it needs a chart, custom keypad, or multi-step UX.

---

## Calculator Definition Standard

Every calculator below follows the same compact spec, which maps 1:1 to `CalculatorSchema` in `src/lib/calculators/schema-types.ts`.

```
**N. Calculator Name** | `slug` | category | LucideIcon | "shortDesc (≤80 chars)"
  in:  id:kind=default, id:kind=default, …
  out: id:format[tone,big?], id:format, …
  f:   formula or one-line algorithm
```

### Field reference

| Field             | Allowed values                                                                                                                                                                              |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `kind` (input)    | `number`, `currency`, `percent`, `select`, `date`, `text`, `toggle`, `textarea`                                                                                                             |
| `format` (output) | `currency`, `currency-inr`, `percent`, `number`, `integer`, `text`, `date`                                                                                                                  |
| `tone` (output)   | `primary`, `secondary`, `accent`, `success`, `error`, `default`                                                                                                                             |
| `big` (output)    | `true` on exactly ONE primary output per calc — the hero stat                                                                                                                               |
| `category`        | existing 18, or one of new: `investing`, `insurance`, `realestate`, `business`, `marketing`, `engineering`, `statistics`, `cs`, `networking`, `crypto-sec`, `datascience`, `database`, `ai` |

### Build checklist (per calc)

1. Metadata row in `src/constants/calculators.ts`.
2. Pure math helper in `src/lib/calculators/{category}.ts`.
3. Vitest case in `src/lib/calculators/{category}.test.ts`.
4. Schema entry in `src/lib/calculators/schemas/{category}.ts`.
5. Run `npx tsc --noEmit && npx vitest run && npm run build`.

---

# A. Investing & Trading (40)

**1. Bond YTM** | `bond-ytm` | investing | Banknote | "Yield to maturity for fixed-coupon bonds."
in: `price:currency=950`, `face:currency=1000`, `coupon:percent=6`, `years:number=5`, `freq:select=2`
out: `ytm:percent[primary,big]`, `currentYield:percent`
f: Bisection on `Σ C/(1+y/k)^kt + F/(1+y/k)^kn = price`

**2. Bond Duration (Macaulay)** | `bond-duration` | investing | Activity | "Weighted average time to bond cash flows."
in: `face:currency=1000`, `coupon:percent=6`, `ytm:percent=7`, `years:number=10`, `freq:select=2`
out: `macaulay:number[primary,big]`, `modified:number`
f: `D = Σ(t·CFt/(1+y)^t) / Price`

**3. Bond Convexity** | `bond-convexity` | investing | LineChart | "Price-yield curvature sensitivity."
in: `face:currency=1000`, `coupon:percent=6`, `ytm:percent=7`, `years:number=10`
out: `convexity:number[primary,big]`
f: `C = Σ(t²+t)·CFt/(1+y)^(t+2) / Price`

**4. Black-Scholes Call** | `bs-call` | investing | TrendingUp | "European call option price."
in: `S:currency=100`, `K:currency=100`, `T:number=1`, `r:percent=5`, `sigma:percent=20`
out: `call:currency[primary,big]`, `d1:number`, `d2:number`
f: `C = S·N(d1) − K·e^(−rT)·N(d2)`

**5. Black-Scholes Put** | `bs-put` | investing | TrendingDown | "European put option price."
in: `S:currency=100`, `K:currency=100`, `T:number=1`, `r:percent=5`, `sigma:percent=20`
out: `put:currency[primary,big]`
f: `P = K·e^(−rT)·N(−d2) − S·N(−d1)`

**6. Option Delta** | `option-delta` | investing | Move | "Sensitivity of option price to underlying."
in: `S:currency=100`, `K:currency=100`, `T:number=1`, `r:percent=5`, `sigma:percent=20`, `side:select=call`
out: `delta:number[primary,big]`
f: `Δ_call = N(d1)`; `Δ_put = N(d1) − 1`

**7. Option Gamma** | `option-gamma` | investing | Activity | "Rate of change of delta."
in: `S:currency=100`, `K:currency=100`, `T:number=1`, `r:percent=5`, `sigma:percent=20`
out: `gamma:number[primary,big]`
f: `Γ = N'(d1)/(S·σ·√T)`

**8. Option Theta** | `option-theta` | investing | Clock | "Time decay per day."
in: `S:currency=100`, `K:currency=100`, `T:number=1`, `r:percent=5`, `sigma:percent=20`, `side:select=call`
out: `theta:currency[primary,big]`
f: BS partial w.r.t. T / 365

**9. Option Vega** | `option-vega` | investing | Waves | "Sensitivity to 1% volatility move."
in: `S:currency=100`, `K:currency=100`, `T:number=1`, `r:percent=5`, `sigma:percent=20`
out: `vega:currency[primary,big]`
f: `ν = S·√T·N'(d1)/100`

**10. Option Rho** | `option-rho` | investing | Percent | "Sensitivity to 1% interest-rate move."
in: `S:currency=100`, `K:currency=100`, `T:number=1`, `r:percent=5`, `sigma:percent=20`, `side:select=call`
out: `rho:currency[primary,big]`
f: `ρ_call = K·T·e^(−rT)·N(d2)/100`

**11. Put-Call Parity** | `put-call-parity` | investing | Equal | "Verify parity / solve missing leg."
in: `S:currency=100`, `K:currency=100`, `call:currency=10`, `put:currency=5`, `r:percent=5`, `T:number=1`
out: `lhs:currency`, `rhs:currency`, `verdict:text[primary,big]`
f: `C + K·e^(−rT) = P + S`

**12. Sharpe Ratio** | `sharpe-ratio` | investing | TrendingUp | "Return per unit of total risk."
in: `meanReturn:percent=12`, `riskFree:percent=4`, `stddev:percent=15`
out: `sharpe:number[primary,big]`
f: `(Rp − Rf)/σp`

**13. Sortino Ratio** | `sortino-ratio` | investing | TrendingUp | "Return per unit of downside risk."
in: `meanReturn:percent=12`, `riskFree:percent=4`, `downsideDev:percent=10`
out: `sortino:number[primary,big]`
f: `(Rp − Rf)/σd`

**14. Treynor Ratio** | `treynor-ratio` | investing | Activity | "Excess return per unit of systematic risk."
in: `meanReturn:percent=12`, `riskFree:percent=4`, `beta:number=1.2`
out: `treynor:number[primary,big]`
f: `(Rp − Rf)/β`

**15. Jensen's Alpha** | `jensens-alpha` | investing | Award | "Excess return over CAPM expectation."
in: `actual:percent=14`, `riskFree:percent=4`, `beta:number=1.2`, `market:percent=10`
out: `alpha:percent[primary,big]`
f: `α = Rp − (Rf + β(Rm − Rf))`

**16. Beta (from returns)** | `beta-returns` | investing | LineChart | "Stock beta from paired returns."
in: `stock:textarea`, `market:textarea`
out: `beta:number[primary,big]`, `correlation:number`
f: `β = cov(stock,market)/var(market)`

**17. Max Drawdown** | `max-drawdown` | investing | TrendingDown | "Largest peak-to-trough drop."
in: `prices:textarea`
out: `mdd:percent[primary,big,error]`, `peakIdx:integer`, `troughIdx:integer`
f: `min((p_t − running_max)/running_max)`

**18. Calmar Ratio** | `calmar-ratio` | investing | Shield | "CAGR divided by max drawdown."
in: `cagr:percent=12`, `mdd:percent=15`
out: `calmar:number[primary,big]`
f: `CAGR/|MDD|`

**19. Information Ratio** | `info-ratio` | investing | Target | "Excess return over benchmark per tracking error."
in: `portfolio:percent=12`, `benchmark:percent=10`, `trackingError:percent=4`
out: `info:number[primary,big]`
f: `(Rp − Rb)/TE`

**20. Gordon DDM** | `gordon-ddm` | investing | DollarSign | "Stock fair value via constant dividend growth."
in: `dividend:currency=2`, `growth:percent=4`, `requiredReturn:percent=8`
out: `fairValue:currency[primary,big]`
f: `P = D1/(r − g)`

**21. Two-Stage DDM** | `two-stage-ddm` | investing | LineChart | "DDM with high-growth then stable phase."
in: `dividend:currency=2`, `g1:percent=15`, `years:number=5`, `g2:percent=4`, `r:percent=10`
out: `fairValue:currency[primary,big]`
f: PV(high-growth divs) + PV(terminal value)

**22. FCFE** | `fcfe` | investing | Wallet | "Free cash flow to equity."
in: `netIncome:currency=10000000`, `capex:currency=4000000`, `dep:currency=2000000`, `dWC:currency=1000000`, `netBorrowing:currency=500000`
out: `fcfe:currency-inr[primary,big]`
f: `NI + Dep − CapEx − ΔWC + ΔDebt`

**23. FCFF** | `fcff` | investing | Wallet | "Free cash flow to firm."
in: `ebit:currency=15000000`, `tax:percent=25`, `dep:currency=2000000`, `capex:currency=4000000`, `dWC:currency=1000000`
out: `fcff:currency-inr[primary,big]`
f: `EBIT(1−t) + Dep − CapEx − ΔWC`

**24. WACC** | `wacc` | investing | Percent | "Weighted average cost of capital."
in: `equity:currency=70`, `debt:currency=30`, `costEquity:percent=12`, `costDebt:percent=8`, `tax:percent=25`
out: `wacc:percent[primary,big]`
f: `(E/V)re + (D/V)rd(1−t)`

**25. EV / EBITDA** | `ev-ebitda` | investing | BarChart3 | "Enterprise-value multiple."
in: `marketCap:currency=100000000`, `debt:currency=30000000`, `cash:currency=10000000`, `ebitda:currency=15000000`
out: `multiple:number[primary,big]`, `ev:currency-inr`
f: `(mcap + debt − cash)/EBITDA`

**26. PEG Ratio** | `peg-ratio` | investing | Gauge | "P/E adjusted for growth."
in: `pe:number=20`, `growth:percent=10`
out: `peg:number[primary,big]`
f: `PEG = P/E ÷ growth%`

**27. Price/Book** | `pb-ratio` | investing | Book | "Price-to-book multiple."
in: `price:currency=200`, `bookValue:currency=80`
out: `pb:number[primary,big]`
f: `price/book`

**28. Price/Sales** | `ps-ratio` | investing | ShoppingCart | "Price-to-sales multiple."
in: `price:currency=100`, `salesPerShare:currency=20`
out: `ps:number[primary,big]`
f: `price/sales`

**29. Enterprise Value** | `enterprise-value` | investing | Briefcase | "Total firm value."
in: `marketCap:currency=100000000`, `debt:currency=30000000`, `cash:currency=10000000`, `pref:currency=0`, `mi:currency=0`
out: `ev:currency-inr[primary,big]`
f: `mcap + debt + pref + MI − cash`

**30. CAPM Expected Return** | `capm` | investing | Sigma | "Required return via CAPM."
in: `riskFree:percent=4`, `beta:number=1.2`, `marketReturn:percent=10`
out: `expected:percent[primary,big]`
f: `Rf + β(Rm − Rf)`

**31. Fama-French 3-Factor** | `ff-3factor` | investing | LineChart | "Expected return via FF3."
in: `rf:percent=4`, `mktPrem:percent=6`, `smb:percent=2`, `hml:percent=3`, `betaM:number=1`, `betaS:number=0.3`, `betaH:number=0.2`
out: `expected:percent[primary,big]`
f: `Rf + βM·MKT + βS·SMB + βH·HML`

**32. Currency Forward** | `currency-forward` | investing | ArrowLeftRight | "Forward FX rate via IRP."
in: `spot:number=83`, `domRate:percent=6`, `forRate:percent=4`, `days:number=90`
out: `forward:number[primary,big]`
f: `F = S(1+rd·t/360)/(1+rf·t/360)`

**33. Futures P&L** | `futures-pnl` | investing | TrendingUp | "Settled futures P&L."
in: `qty:number=10`, `entry:currency=20000`, `exit:currency=20500`, `tickSize:number=0.25`, `tickValue:currency=12.5`
out: `pnl:currency-inr[primary,big]`
f: `qty·(exit−entry)·tickValue/tickSize`

**34. Margin Call Price** | `margin-call-price` | investing | AlertTriangle | "Price that triggers a margin call."
in: `buyPrice:currency=100`, `initialMargin:percent=50`, `maintMargin:percent=25`
out: `callPrice:currency[primary,big]`
f: `buy·(1−init)/(1−maint)`

**35. Hedge Ratio** | `hedge-ratio` | investing | Shield | "Minimum-variance hedge ratio."
in: `corr:number=0.85`, `sigmaSpot:percent=15`, `sigmaFut:percent=18`
out: `h:number[primary,big]`
f: `h = ρ·σS/σF`

**36. Black-76 (Commodity)** | `black-76` | investing | Flame | "Option on futures (commodity)."
in: `F:currency=80`, `K:currency=80`, `T:number=0.5`, `r:percent=5`, `sigma:percent=30`, `side:select=call`
out: `price:currency[primary,big]`
f: `c = e^(−rT)[F·N(d1) − K·N(d2)]`

**37. Binomial Option (2-step)** | `binomial-2step` | investing | GitFork | "Two-step CRR binomial price."
in: `S:currency=100`, `K:currency=100`, `r:percent=5`, `T:number=1`, `u:number=1.1`, `d:number=0.9`, `side:select=call`
out: `price:currency[primary,big]`
f: Risk-neutral backward induction; `p=(e^(rΔt)−d)/(u−d)`

**38. T-Bill Yield** | `tbill-yield` | investing | FileText | "Effective yield on a discount bill."
in: `face:currency=100`, `price:currency=98`, `days:number=91`
out: `yield:percent[primary,big]`, `bankDiscount:percent`
f: `(F−P)/P · 365/days`

**39. Effective Annual Rate** | `ear` | investing | Percent | "Annual rate including compounding."
in: `nominal:percent=12`, `compoundsPerYear:number=12`
out: `ear:percent[primary,big]`
f: `(1+r/n)^n − 1`

**40. Continuously Compounded Rate** | `continuous-rate` | investing | Infinity | "Convert simple ↔ continuous."
in: `rate:percent=12`, `direction:select=toContinuous`
out: `result:percent[primary,big]`
f: `rc = ln(1+r)`

---

# B. Insurance (20)

**41. Term Life Premium** | `term-life-premium` | insurance | Shield | "Rough term-life premium estimate."
in: `age:number=30`, `sumAssured:currency=10000000`, `term:number=20`, `gender:select=male`, `smoker:toggle=false`
out: `annual:currency-inr[primary,big]`, `monthly:currency-inr`
f: mortality-table multiplier × sum/1000

**42. Whole Life Premium** | `whole-life-premium` | insurance | ShieldCheck | "Whole-life premium estimate."
in: `age:number=30`, `sumAssured:currency=5000000`, `gender:select=male`
out: `annual:currency-inr[primary,big]`
f: ≈ 3–5× term-life on same cover

**43. ULIP Maturity** | `ulip-maturity` | insurance | TrendingUp | "ULIP corpus after charges."
in: `annualPremium:currency=100000`, `years:number=15`, `returnPct:percent=10`, `chargesPct:percent=2`
out: `maturity:currency-inr[primary,big]`, `totalPaid:currency-inr`
f: SIP-FV at `(return − charges)%`

**44. Health Cost Sharing** | `health-cost-share` | insurance | HeartPulse | "Out-of-pocket after deductible/copay."
in: `bill:currency=200000`, `deductible:currency=20000`, `coinsurance:percent=20`, `oopMax:currency=100000`
out: `youPay:currency-inr[primary,big]`, `insurerPays:currency-inr`
f: deductible + min(oopMax−ded, (bill−ded)·coins%)

**45. Health Coverage Needed** | `health-coverage-needed` | insurance | HeartPulse | "Recommended sum-insured."
in: `age:number=35`, `cityTier:select=tier1`, `dependents:number=2`
out: `recommended:currency-inr[primary,big]`
f: base × age × tier × (1+0.1·dep)

**46. Motor IDV** | `motor-idv` | insurance | Car | "Insured Declared Value after depreciation."
in: `exShowroom:currency=1200000`, `ageYears:number=3`
out: `idv:currency-inr[primary,big]`
f: 5/15/20/30/40/50% depreciation slabs

**47. Motor Premium** | `motor-premium` | insurance | Car | "Comprehensive motor premium."
in: `idv:currency=900000`, `cc:number=1500`, `zone:select=A`, `ncbPct:percent=20`
out: `premium:currency-inr[primary,big]`, `ownDamage:currency-inr`, `thirdParty:currency-inr`
f: OD = IDV·rate·(1−NCB%) + TP slab

**48. Marine Cargo Premium** | `marine-premium` | insurance | Ship | "Cargo insurance estimate."
in: `cargoValue:currency=5000000`, `clause:select=A`, `voyageType:select=international`
out: `premium:currency-inr[primary,big]`
f: value × (0.05%–0.5%)

**49. Fire Insurance Premium** | `fire-premium` | insurance | Flame | "Property fire-insurance estimate."
in: `sumInsured:currency=50000000`, `occupancy:select=residential`
out: `premium:currency-inr[primary,big]`
f: rate per ₹1000 × sum

**50. Critical Illness Cover** | `critical-illness-cover` | insurance | Heart | "Recommended CI cover."
in: `annualIncome:currency=1500000`, `age:number=40`
out: `recommended:currency-inr[primary,big]`
f: 3–5× annual income, age-adjusted

**51. Disability Insurance** | `disability-cover` | insurance | Accessibility | "Monthly disability benefit."
in: `monthlyIncome:currency=100000`, `coveragePct:percent=60`
out: `monthly:currency-inr[primary,big]`
f: `income × coverage%`

**52. LTC Coverage** | `ltc-cover` | insurance | Bed | "Long-term care need."
in: `dailyCost:currency=3000`, `years:number=3`
out: `total:currency-inr[primary,big]`
f: `daily × 365 × years × inflation`

**53. Crop Insurance (PMFBY)** | `crop-insurance` | insurance | Wheat | "Premium under PMFBY."
in: `sumInsured:currency=50000`, `crop:select=kharif`
out: `premium:currency-inr[primary,big]`
f: kharif 2%, rabi 1.5%, hort 5%

**54. Pet Insurance** | `pet-insurance` | insurance | Dog | "Pet insurance premium."
in: `species:select=dog`, `ageYears:number=3`, `sumInsured:currency=50000`
out: `premium:currency-inr[primary,big]`
f: species rate × age factor × sum

**55. Travel Insurance** | `travel-insurance` | insurance | Plane | "Travel cover by destination/duration."
in: `tripDays:number=14`, `destination:select=schengen`, `age:number=30`
out: `premium:currency-inr[primary,big]`
f: per-day × destination × age multiplier

**56. Loan Protection** | `loan-protection-premium` | insurance | Lock | "Loan-cover term premium."
in: `loan:currency=5000000`, `tenure:number=20`, `age:number=30`
out: `premium:currency-inr[primary,big]`
f: term life on decreasing cover

**57. Liability Insurance** | `liability-insurance` | insurance | Scale | "Public/professional liability."
in: `cover:currency=10000000`, `business:select=consulting`
out: `premium:currency-inr[primary,big]`
f: rate × cover (business-class adjusted)

**58. Renters Insurance** | `renters-insurance` | insurance | Home | "Renters' contents cover."
in: `contentsValue:currency=300000`
out: `premium:currency-inr[primary,big]`
f: ≈ 0.5–1% of contents

**59. Umbrella Policy** | `umbrella-policy` | insurance | Umbrella | "Recommended umbrella limit."
in: `netWorth:currency=20000000`
out: `recommended:currency-inr[primary,big]`
f: ≥ net worth, rounded to tier

**60. Claim Settlement Expected** | `claim-settlement` | insurance | CheckCircle | "Expected payout given CSR."
in: `claim:currency=2000000`, `csr:percent=98`
out: `payout:currency-inr[primary,big]`
f: `claim × CSR%`

---

# C. Real Estate (15)

**61. Rental Yield (Gross)** | `rental-yield-gross` | realestate | Home | "Annual rent / price."
in: `annualRent:currency=240000`, `propertyValue:currency=8000000`
out: `yield:percent[primary,big]`
f: `rent/value · 100`

**62. Rental Yield (Net)** | `rental-yield-net` | realestate | Home | "Net of expenses & vacancy."
in: `annualRent:currency=240000`, `expenses:currency=40000`, `vacancyPct:percent=5`, `propertyValue:currency=8000000`
out: `yield:percent[primary,big]`
f: `(rent(1−vac) − exp)/value · 100`

**63. Cap Rate** | `cap-rate` | realestate | Percent | "NOI / value."
in: `noi:currency=200000`, `value:currency=8000000`
out: `capRate:percent[primary,big]`
f: `NOI/value · 100`

**64. Cash-on-Cash Return** | `cash-on-cash` | realestate | Wallet | "Annual cash flow / cash invested."
in: `annualCashFlow:currency=150000`, `cashInvested:currency=2000000`
out: `coc:percent[primary,big]`
f: `cashFlow/invested · 100`

**65. NOI** | `noi` | realestate | DollarSign | "Net Operating Income."
in: `grossRent:currency=300000`, `vacancyPct:percent=5`, `operating:currency=60000`
out: `noi:currency-inr[primary,big]`
f: `gross(1−vac) − operating`

**66. 1% Rule Check** | `one-percent-rule` | realestate | CheckCircle | "Rent ≥ 1% of price?"
in: `monthlyRent:currency=20000`, `price:currency=2000000`
out: `ratio:percent[primary,big]`, `pass:text`
f: `rent/price · 100 ≥ 1`

**67. 50% Rule Estimate** | `fifty-percent-rule` | realestate | Calculator | "Opex ≈ 50% of rent."
in: `monthlyRent:currency=20000`
out: `estimatedNoi:currency-inr[primary,big]`
f: `rent · 12 · 0.5`

**68. Gross Rent Multiplier** | `grm` | realestate | Activity | "Price / annual gross rent."
in: `price:currency=8000000`, `annualRent:currency=240000`
out: `grm:number[primary,big]`
f: `price/rent`

**69. BRRRR Cash-out** | `brrrr-cashout` | realestate | Repeat | "Cash recovered after refi."
in: `arv:currency=10000000`, `ltvPct:percent=75`, `allInCost:currency=7000000`
out: `cashOut:currency-inr[primary,big]`
f: `ARV·LTV − allInCost`

**70. House Flip Profit** | `flip-profit` | realestate | Hammer | "Profit after sale and costs."
in: `purchase:currency=4000000`, `renovation:currency=800000`, `holding:currency=120000`, `sellingCost:currency=200000`, `sellPrice:currency=6000000`
out: `profit:currency-inr[primary,big]`, `roi:percent`
f: `sell − (purchase + reno + hold + sell)`

**71. Land Value** | `land-value` | realestate | Map | "Land = total − building."
in: `totalValue:currency=10000000`, `buildingValuePct:percent=60`
out: `land:currency-inr[primary,big]`
f: `total · (1 − bldg%)`

**72. Property Tax** | `property-tax` | realestate | FileText | "Annual property tax."
in: `assessedValue:currency=8000000`, `millage:percent=1.2`
out: `tax:currency-inr[primary,big]`
f: `value · rate%`

**73. HOA Total** | `hoa-cost` | realestate | Users | "HOA over hold period."
in: `monthlyHoa:currency=3000`, `years:number=10`, `escalation:percent=4`
out: `total:currency-inr[primary,big]`
f: compound monthly × 12 × years with escalation

**74. Title Insurance** | `title-insurance` | realestate | Shield | "Title insurance cost."
in: `propertyValue:currency=8000000`, `rate:percent=0.5`
out: `premium:currency-inr[primary,big]`
f: `value · rate%`

**75. Closing Costs** | `closing-costs` | realestate | Receipt | "Sum of typical closing costs."
in: `price:currency=8000000`, `stampPct:percent=6`, `regPct:percent=1`, `legal:currency=20000`, `other:currency=10000`
out: `total:currency-inr[primary,big]`
f: stamp + reg + legal + other

---

# D. Business / Accounting (25)

**76. Cash Flow Forecast** | `cash-flow-forecast` | business | LineChart | "Month-end cash balance."
in: `openingBalance:currency=500000`, `inflows:textarea`, `outflows:textarea`
out: `closing:currency-inr[primary,big]`, `lowestMonth:text`
f: cumulative open + Σin − Σout

**77. Working Capital** | `working-capital` | business | RefreshCw | "Current assets − current liabilities."
in: `currentAssets:currency=2000000`, `currentLiabilities:currency=1200000`
out: `wc:currency-inr[primary,big]`
f: `CA − CL`

**78. Quick Ratio** | `quick-ratio` | business | Gauge | "Liquidity excl inventory."
in: `currentAssets:currency=2000000`, `inventory:currency=600000`, `currentLiabilities:currency=1200000`
out: `quick:number[primary,big]`
f: `(CA − Inv)/CL`

**79. Current Ratio** | `current-ratio` | business | Gauge | "Short-term solvency."
in: `currentAssets:currency=2000000`, `currentLiabilities:currency=1200000`
out: `current:number[primary,big]`
f: `CA/CL`

**80. Debt-to-Equity** | `de-ratio` | business | Scale | "Total debt / total equity."
in: `totalDebt:currency=5000000`, `totalEquity:currency=8000000`
out: `de:number[primary,big]`
f: `D/E`

**81. Inventory Turnover** | `inventory-turnover` | business | Package | "How often inventory cycles."
in: `cogs:currency=12000000`, `avgInventory:currency=2000000`
out: `turnover:number[primary,big]`, `daysOnHand:number`
f: `COGS/avg inv`; DOH = 365/turnover

**82. DSO** | `dso` | business | Clock | "Days sales outstanding."
in: `receivables:currency=1500000`, `annualSales:currency=20000000`
out: `dso:integer[primary,big]`
f: `AR/sales · 365`

**83. DPO** | `dpo` | business | Clock | "Days payable outstanding."
in: `payables:currency=800000`, `cogs:currency=12000000`
out: `dpo:integer[primary,big]`
f: `AP/COGS · 365`

**84. CCC** | `ccc` | business | Repeat | "Cash conversion cycle."
in: `dso:number=30`, `doh:number=45`, `dpo:number=20`
out: `ccc:integer[primary,big]`
f: `DSO + DOH − DPO`

**85. Gross Margin** | `gross-margin` | business | Percent | "(Rev − COGS)/Rev."
in: `revenue:currency=20000000`, `cogs:currency=12000000`
out: `gm:percent[primary,big]`
f: `(R−COGS)/R · 100`

**86. Operating Margin** | `operating-margin` | business | Percent | "OI / revenue."
in: `revenue:currency=20000000`, `operatingIncome:currency=3000000`
out: `om:percent[primary,big]`
f: `OI/R · 100`

**87. Net Margin** | `net-margin` | business | Percent | "NI / revenue."
in: `revenue:currency=20000000`, `netIncome:currency=2200000`
out: `nm:percent[primary,big]`
f: `NI/R · 100`

**88. ROA** | `roa` | business | Activity | "Net income / total assets."
in: `netIncome:currency=2200000`, `totalAssets:currency=18000000`
out: `roa:percent[primary,big]`
f: `NI/Assets · 100`

**89. ROE** | `roe` | business | Award | "Net income / equity."
in: `netIncome:currency=2200000`, `equity:currency=10000000`
out: `roe:percent[primary,big]`
f: `NI/Equity · 100`

**90. ROIC** | `roic` | business | Target | "Return on invested capital."
in: `nopat:currency=2500000`, `investedCapital:currency=15000000`
out: `roic:percent[primary,big]`
f: `NOPAT/IC · 100`

**91. EBITDA Margin** | `ebitda-margin` | business | Percent | "EBITDA / revenue."
in: `revenue:currency=20000000`, `ebitda:currency=4000000`
out: `margin:percent[primary,big]`
f: `EBITDA/R · 100`

**92. Burn Rate** | `burn-rate` | business | Flame | "Monthly cash consumption."
in: `monthsCash:textarea`
out: `avgBurn:currency-inr[primary,big,error]`
f: avg of monthly net outflow

**93. Runway** | `runway` | business | Plane | "Months till cash hits zero."
in: `cash:currency=10000000`, `monthlyBurn:currency=1500000`
out: `months:integer[primary,big]`
f: `cash/burn`

**94. Unit Economics** | `unit-economics` | business | Coins | "Contribution margin per unit."
in: `pricePerUnit:currency=500`, `variableCost:currency=200`
out: `cm:currency-inr[primary,big]`, `cmPct:percent`
f: `P − VC`; CM% = CM/P · 100

**95. Payroll Cost** | `payroll-cost` | business | Users | "Loaded payroll cost."
in: `salaries:currency=5000000`, `loadingPct:percent=30`
out: `total:currency-inr[primary,big]`
f: `salaries · (1 + loading%)`

**96. Overhead Allocation** | `overhead-allocation` | business | PieChart | "Cost per allocation unit."
in: `totalOverhead:currency=2000000`, `units:number=10000`
out: `perUnit:currency-inr[primary,big]`
f: `overhead/units`

**97. Activity-Based Costing** | `abc-costing` | business | LayoutGrid | "Cost per activity driver."
in: `activityCost:currency=500000`, `driverVolume:number=2500`
out: `rate:currency-inr[primary,big]`
f: `cost/driver`

**98. Job Costing** | `job-costing` | business | Briefcase | "Total cost of a job."
in: `material:currency=200000`, `labor:currency=300000`, `overhead:currency=100000`
out: `total:currency-inr[primary,big]`
f: `M + L + OH`

**99. Process Costing** | `process-costing` | business | Workflow | "Equivalent-unit cost."
in: `costs:currency=1000000`, `equivalentUnits:number=4000`
out: `costPerUnit:currency-inr[primary,big]`
f: `costs/EU`

**100. Variance Analysis (price)** | `variance-price` | business | Activity | "Materials price variance."
in: `actualPrice:currency=110`, `standardPrice:currency=100`, `actualQty:number=1000`
out: `variance:currency-inr[primary,big,error]`
f: `(AP − SP) · AQ`

---

# E. Marketing / Sales (20)

**101. CAC** | `cac` | marketing | Users | "Customer acquisition cost."
in: `marketingSpend:currency=500000`, `customersAcquired:number=200`
out: `cac:currency-inr[primary,big]`
f: `spend/customers`

**102. LTV** | `ltv` | marketing | Award | "Customer lifetime value."
in: `arpu:currency=500`, `grossMarginPct:percent=80`, `churnPct:percent=5`
out: `ltv:currency-inr[primary,big]`
f: `ARPU · GM% / churn%`

**103. LTV:CAC** | `ltv-cac` | marketing | Scale | "Healthy SaaS unit-economics ratio."
in: `ltv:currency=15000`, `cac:currency=3000`
out: `ratio:number[primary,big]`
f: `LTV/CAC` (healthy ≥ 3)

**104. Churn Rate** | `churn-rate` | marketing | TrendingDown | "Monthly customer attrition."
in: `lost:number=20`, `startCount:number=1000`
out: `churn:percent[primary,big,error]`
f: `lost/start · 100`

**105. Retention Rate** | `retention-rate` | marketing | TrendingUp | "Customer retention."
in: `endCount:number=950`, `newCount:number=70`, `startCount:number=1000`
out: `retention:percent[primary,big]`
f: `(end − new)/start · 100`

**106. NPS** | `nps` | marketing | Smile | "Net promoter score."
in: `promoters:number=600`, `passives:number=200`, `detractors:number=200`
out: `nps:integer[primary,big]`
f: `prom% − det%`

**107. Conversion Rate** | `conversion-rate` | marketing | Percent | "Conversions / visitors."
in: `conversions:number=120`, `visitors:number=10000`
out: `cr:percent[primary,big]`
f: `conv/visitors · 100`

**108. CTR** | `ctr` | marketing | MousePointer | "Click-through rate."
in: `clicks:number=500`, `impressions:number=20000`
out: `ctr:percent[primary,big]`
f: `clicks/impressions · 100`

**109. CPC** | `cpc` | marketing | DollarSign | "Cost per click."
in: `spend:currency=50000`, `clicks:number=2500`
out: `cpc:currency-inr[primary,big]`
f: `spend/clicks`

**110. CPL** | `cpl` | marketing | UserPlus | "Cost per lead."
in: `spend:currency=50000`, `leads:number=200`
out: `cpl:currency-inr[primary,big]`
f: `spend/leads`

**111. CPA** | `cpa` | marketing | Target | "Cost per acquisition."
in: `spend:currency=200000`, `acquisitions:number=50`
out: `cpa:currency-inr[primary,big]`
f: `spend/acq`

**112. ROAS** | `roas` | marketing | TrendingUp | "Return on ad spend."
in: `revenue:currency=600000`, `adSpend:currency=120000`
out: `roas:number[primary,big]`
f: `revenue/spend`

**113. AOV** | `aov` | marketing | ShoppingBag | "Average order value."
in: `revenue:currency=1000000`, `orders:number=2000`
out: `aov:currency-inr[primary,big]`
f: `revenue/orders`

**114. Repeat Purchase Rate** | `repeat-purchase-rate` | marketing | Repeat | "Share of repeat buyers."
in: `repeatCustomers:number=300`, `totalCustomers:number=1200`
out: `rate:percent[primary,big]`
f: `repeat/total · 100`

**115. A/B Sample Size** | `ab-sample-size` | marketing | Beaker | "Per-arm sample for desired lift."
in: `baselineRate:percent=5`, `mde:percent=1`, `confidence:select=95`, `power:select=80`
out: `perArm:integer[primary,big]`
f: two-proportion sample-size formula

**116. A/B Significance** | `ab-significance` | marketing | CheckCircle | "Z-test on two proportions."
in: `aConversions:number=120`, `aTotal:number=2400`, `bConversions:number=160`, `bTotal:number=2400`
out: `pValue:number[primary,big]`, `liftPct:percent`
f: pooled z-test

**117. Funnel Conversion** | `funnel-conversion` | marketing | Filter | "Stage-by-stage funnel rates."
in: `stages:textarea`
out: `overallPct:percent[primary,big]`, `stagewise:text`
f: product of stage ratios

**118. Email CTR** | `email-ctr` | marketing | Mail | "Email open/click rates."
in: `delivered:number=10000`, `opens:number=4500`, `clicks:number=800`
out: `openRate:percent`, `ctr:percent[primary,big]`
f: `clicks/delivered · 100`

**119. Bounce Rate** | `bounce-rate` | marketing | LogOut | "Single-page session share."
in: `singlePageSessions:number=4500`, `totalSessions:number=12000`
out: `bounce:percent[primary,big]`
f: `single/total · 100`

**120. Engagement Rate** | `engagement-rate` | marketing | Heart | "Social engagement rate."
in: `engagements:number=900`, `reach:number=15000`
out: `er:percent[primary,big]`
f: `engagements/reach · 100`

---

# F. Mechanical Engineering (25)

**121. Beam Bending Stress** | `beam-bending-stress` | engineering | Wrench | "σ = M·c/I."
in: `M:number=1000`, `c:number=0.05`, `I:number=1e-6`
out: `sigma:number[primary,big]`
f: `M·c/I`

**122. Beam Deflection — SS** | `beam-ss-deflection` | engineering | Wrench | "Midspan deflection under point load."
in: `P:number=1000`, `L:number=2`, `E:number=200e9`, `I:number=1e-6`
out: `delta:number[primary,big]`
f: `δ = PL³/(48·EI)`

**123. Beam Deflection — Cantilever** | `beam-cant-deflection` | engineering | Wrench | "Tip deflection under end load."
in: `P:number=1000`, `L:number=2`, `E:number=200e9`, `I:number=1e-6`
out: `delta:number[primary,big]`
f: `δ = PL³/(3·EI)`

**124. Shaft Torsion** | `shaft-torsion` | engineering | RotateCw | "Max shear stress in solid shaft."
in: `T:number=500`, `radius:number=0.02`, `J:number=2.5e-7`
out: `tau:number[primary,big]`
f: `τ = T·r/J`

**125. Belt Tension** | `belt-tension` | engineering | Move | "Tight/slack tension from torque."
in: `power:number=1000`, `pulleyRadius:number=0.1`, `rpm:number=1500`, `mu:number=0.3`, `wrapAngle:number=180`
out: `T1:number[primary,big]`, `T2:number`
f: `T1/T2 = e^(μθ)`; `(T1−T2)·r·ω = P`

**126. Gear Ratio** | `gear-ratio` | engineering | Cog | "Output/input ratio."
in: `teethDriver:number=20`, `teethDriven:number=60`
out: `ratio:number[primary,big]`
f: `Td/Tdr`

**127. Bearing Load** | `bearing-load` | engineering | Disc | "Equivalent dynamic load."
in: `radial:number=2000`, `axial:number=500`, `X:number=0.56`, `Y:number=1.5`
out: `P:number[primary,big]`
f: `P = X·Fr + Y·Fa`

**128. Spring Constant (combined)** | `spring-constant-combined` | engineering | Spline | "Series/parallel stiffness."
in: `k1:number=100`, `k2:number=200`, `config:select=series`
out: `kEq:number[primary,big]`
f: series `1/(1/k1+1/k2)`; parallel `k1+k2`

**129. Spring Force** | `spring-force` | engineering | Spline | "Hooke's law."
in: `k:number=500`, `displacement:number=0.05`
out: `F:number[primary,big]`
f: `F = k·x`

**130. Pulley MA** | `pulley-ma` | engineering | Anchor | "Mechanical advantage of pulleys."
in: `supportingRopes:number=4`
out: `ma:number[primary,big]`
f: `MA = n`

**131. Lever MA** | `lever-ma` | engineering | Ruler | "Lever mechanical advantage."
in: `effortArm:number=1`, `loadArm:number=0.2`
out: `ma:number[primary,big]`
f: `MA = effort/load`

**132. Inclined Plane MA** | `incline-ma` | engineering | TriangleRight | "Ramp advantage."
in: `length:number=5`, `height:number=1`
out: `ma:number[primary,big]`
f: `MA = L/h`

**133. Hoop Stress** | `hoop-stress` | engineering | Circle | "Cylindrical vessel circumferential."
in: `P:number=1e6`, `r:number=0.5`, `t:number=0.01`
out: `sigma:number[primary,big]`
f: `σ = P·r/t`

**134. Axial Stress** | `axial-stress` | engineering | Cylinder | "Cylindrical vessel longitudinal."
in: `P:number=1e6`, `r:number=0.5`, `t:number=0.01`
out: `sigma:number[primary,big]`
f: `σ = P·r/(2t)`

**135. Bernoulli Flow** | `bernoulli` | engineering | Waves | "Energy conservation in a fluid."
in: `v1:number=2`, `v2:number=4`, `p1:number=101325`, `rho:number=1000`, `dz:number=0`
out: `p2:number[primary,big]`
f: `p2 = p1 + ½ρ(v1²−v2²) − ρgΔz`

**136. Darcy-Weisbach** | `darcy-weisbach` | engineering | PipeIcon | "Pipe friction loss."
in: `f:number=0.02`, `L:number=10`, `D:number=0.05`, `v:number=2`
out: `hf:number[primary,big]`
f: `hf = f·L/D · v²/(2g)`

**137. Reynolds Number** | `reynolds` | engineering | Waves | "Flow regime indicator."
in: `rho:number=1000`, `v:number=2`, `D:number=0.05`, `mu:number=0.001`
out: `Re:number[primary,big]`, `regime:text`
f: `Re = ρvD/μ`

**138. Hydraulic Cylinder Force** | `hydraulic-cylinder` | engineering | Cylinder | "Force from pressure × area."
in: `pressure:number=20e6`, `bore:number=0.08`
out: `F:number[primary,big]`
f: `F = P · π(d/2)²`

**139. Pneumatic Cylinder Force** | `pneumatic-cylinder` | engineering | Wind | "Pneumatic actuator force."
in: `pressure:number=600000`, `bore:number=0.05`
out: `F:number[primary,big]`
f: `F = P · π(d/2)²`

**140. Fourier Conduction** | `fourier-conduction` | engineering | Flame | "1-D conduction rate."
in: `k:number=200`, `A:number=0.5`, `dT:number=50`, `L:number=0.01`
out: `Q:number[primary,big]`
f: `Q = k·A·ΔT/L`

**141. LMTD** | `lmtd` | engineering | Thermometer | "Log mean temperature difference."
in: `dT1:number=80`, `dT2:number=30`
out: `lmtd:number[primary,big]`
f: `(ΔT1−ΔT2)/ln(ΔT1/ΔT2)`

**142. Boiler Efficiency** | `boiler-efficiency` | engineering | Flame | "Thermal efficiency."
in: `steam:number=5000`, `enthalpy:number=2700`, `fuel:number=400`, `cv:number=42000`
out: `eff:percent[primary,big]`
f: `(steam·h)/(fuel·CV) · 100`

**143. Pump Power** | `pump-power` | engineering | Droplet | "Hydraulic power required."
in: `flow:number=0.01`, `head:number=50`, `rho:number=1000`, `eff:percent=70`
out: `P:number[primary,big]`
f: `P = ρgQH/η`

**144. Centripetal Force** | `centripetal-force` | engineering | Circle | "F = m·v²/r."
in: `m:number=2`, `v:number=10`, `r:number=5`
out: `F:number[primary,big]`
f: `F = m·v²/r`

**145. Moment of Inertia (rect)** | `moi-rectangle` | engineering | Square | "I = b·h³/12."
in: `b:number=0.1`, `h:number=0.2`
out: `I:number[primary,big]`
f: `I = b·h³/12`

---

# G. Civil Engineering (20)

**146. Mix Design (M30+)** | `mix-design-high` | engineering | Construction | "C-S-A for M30+ concrete."
in: `concreteVol:number=1`, `grade:select=M30`
out: `cement:number[primary,big]`, `sand:number`, `aggregate:number`
f: IS 456 ratio tables

**147. Steel %** | `steel-percent` | engineering | Construction | "Rebar mass from % of concrete."
in: `concreteVol:number=10`, `pct:percent=1.5`, `density:number=7850`
out: `steelKg:number[primary,big]`
f: `vol · pct% · density`

**148. Bricks w/ Wastage** | `bricks-with-waste` | engineering | Construction | "Brick count + waste."
in: `wallVol:number=10`, `brickVol:number=0.002`, `waste:percent=8`
out: `bricks:integer[primary,big]`
f: `wallVol/brickVol · (1+waste%)`

**149. Plaster Cement-Sand** | `plaster-cs` | engineering | Construction | "Cement + sand for plaster."
in: `area:number=100`, `thickness:number=12`, `mix:select=1:6`
out: `cementBags:integer[primary,big]`, `sandM3:number`
f: dry vol × 1.27 split by ratio

**150. Earthwork Volume** | `earthwork-volume` | engineering | Pickaxe | "Excavation cut & fill."
in: `length:number=20`, `width:number=10`, `depth:number=2`
out: `volume:number[primary,big]`
f: `L·W·D`

**151. Cut & Fill** | `cut-fill` | engineering | Pickaxe | "Net cut vs fill."
in: `cut:number=200`, `fill:number=150`
out: `net:number[primary,big]`
f: `cut − fill`

**152. BBS (single bar)** | `bbs-single` | engineering | Slash | "Cut length incl bends."
in: `straight:number=2`, `bends:number=2`, `barDia:number=0.012`
out: `cutLength:number[primary,big]`
f: straight + bend deductions

**153. Foundation Sand** | `sand-foundation` | engineering | Construction | "Sand bedding volume."
in: `length:number=10`, `width:number=0.6`, `thickness:number=0.1`
out: `volume:number[primary,big]`
f: `L·W·T`

**154. Wall Load** | `wall-load` | engineering | LayoutGrid | "Load per metre of wall."
in: `density:number=2000`, `height:number=3`, `thickness:number=0.23`, `live:number=2`
out: `total:number[primary,big]`
f: `ρ·h·t + LL`

**155. Slab Load** | `slab-load` | engineering | Square | "DL + LL on slab."
in: `thickness:number=0.15`, `density:number=25000`, `live:number=4000`, `finish:number=1500`
out: `total:number[primary,big]`
f: `t·ρ + finish + LL`

**156. Beam Rebar** | `beam-rebar` | engineering | Construction | "Steel area for beam."
in: `M:number=80`, `b:number=0.3`, `d:number=0.45`, `fck:number=25`, `fy:number=500`
out: `Ast:number[primary,big]`
f: `Mu = 0.87 fy Ast (d − 0.42 xu)`

**157. Column Rebar** | `column-rebar` | engineering | Construction | "Axial column steel."
in: `Pu:number=1500`, `Ag:number=0.16`, `fck:number=25`, `fy:number=415`, `ratio:percent=1`
out: `Asc:number[primary,big]`
f: `Pu = 0.4 fck(Ag−Asc) + 0.67 fy Asc`

**158. Footing Size** | `footing-size` | engineering | LayoutGrid | "Spread footing area."
in: `load:number=800`, `safeBearing:number=200`
out: `area:number[primary,big]`, `side:number`
f: `A = load/SBC`; side = √A

**159. Pile Capacity** | `pile-capacity` | engineering | Pickaxe | "Single-pile axial capacity."
in: `dia:number=0.4`, `length:number=10`, `skinFriction:number=40`, `endBearing:number=2000`
out: `Q:number[primary,big]`
f: `Q = π·d·L·fs + Ap·qb`

**160. Retaining Wall Stability** | `retaining-stability` | engineering | Shield | "FoS for overturn/slide."
in: `Wself:number=180`, `Pearth:number=60`, `armW:number=1.5`, `armP:number=1`
out: `fosOverturn:number[primary,big]`, `fosSlide:number`
f: `Mr/Mo`

**161. Terzaghi Bearing** | `terzaghi-bearing` | engineering | Construction | "Ultimate bearing capacity."
in: `c:number=10`, `Nc:number=5.7`, `gamma:number=18`, `Df:number=1`, `Nq:number=1`, `B:number=2`, `Ngamma:number=0`
out: `qu:number[primary,big]`
f: `qu = cNc + γDfNq + 0.5γBNγ`

**162. Settlement (Immediate)** | `settlement-immediate` | engineering | ChevronDown | "Elastic settlement."
in: `q:number=200`, `B:number=2`, `E:number=20000`, `Is:number=0.95`, `mu:number=0.3`
out: `Si:number[primary,big]`
f: `Si = qB(1−μ²)Is/E`

**163. Slope FoS** | `slope-fos` | engineering | Mountain | "Infinite-slope FoS."
in: `c:number=10`, `gamma:number=18`, `H:number=5`, `phi:number=30`, `slope:number=20`
out: `fos:number[primary,big]`
f: `(c + γHcos²β·tanφ)/(γHsinβcosβ)`

**164. Trig Leveling** | `trig-leveling` | engineering | Triangle | "Height from angle + distance."
in: `distance:number=100`, `angleDeg:number=15`
out: `height:number[primary,big]`
f: `h = d·tanθ`

**165. Bridge Span Estimate** | `bridge-span` | engineering | Bridge | "Girder steel mass per span."
in: `span:number=30`, `width:number=10`, `kgPerM2:number=120`
out: `steelMass:number[primary,big]`
f: `kg/m² · span · width`

---

# H. Chemical Engineering (15)

**166. CSTR Volume** | `cstr-volume` | engineering | Beaker | "CSTR sizing."
in: `Fa0:number=10`, `X:percent=80`, `ra:number=2`
out: `V:number[primary,big]`
f: `V = Fa0·X/(−ra)`

**167. PFR Volume** | `pfr-volume` | engineering | PipeIcon | "PFR sizing (1st order)."
in: `Fa0:number=10`, `Ca0:number=1`, `k:number=0.5`, `X:percent=80`
out: `V:number[primary,big]`
f: `V = Fa0/(k·Ca0) · ln(1/(1−X))`

**168. Mass Balance** | `mass-balance` | engineering | Scale | "Steady-state in − out."
in: `in:textarea`, `out:textarea`
out: `imbalance:number[primary,big]`
f: `Σin − Σout`

**169. Energy Balance** | `energy-balance` | engineering | Flame | "Heat in − out − losses."
in: `qIn:number=10000`, `qOut:number=8000`, `loss:number=500`
out: `accumulation:number[primary,big]`
f: `qIn − qOut − loss`

**170. Mass Transfer k** | `mass-transfer` | engineering | Waves | "k from Sh, D, L."
in: `Sh:number=100`, `D:number=2e-5`, `L:number=0.01`
out: `k:number[primary,big]`
f: `k = Sh·D/L`

**171. Cp Mix** | `cp-mix` | engineering | Thermometer | "Heat capacity of a mixture."
in: `components:textarea`
out: `cpMix:number[primary,big]`
f: `Σ xi·Cpi`

**172. Antoine** | `antoine` | engineering | Wind | "P(T) for a pure liquid."
in: `A:number=8.07131`, `B:number=1730.63`, `C:number=233.426`, `T:number=25`
out: `P:number[primary,big]`
f: `log10P = A − B/(C+T)`

**173. Raoult's Law** | `raoults-law` | engineering | Beaker | "Partial pressure in ideal mix."
in: `xA:number=0.4`, `pAsat:number=100`
out: `pA:number[primary,big]`
f: `pA = xA·pA_sat`

**174. Henry's Law** | `henrys-law` | engineering | Bubbles | "Gas solubility."
in: `kh:number=1.6e-5`, `partialP:number=21000`
out: `c:number[primary,big]`
f: `c = kH·p`

**175. Reactor Yield** | `reactor-yield` | engineering | TrendingUp | "Product mass / reactant mass."
in: `productMass:number=80`, `reactantMass:number=100`
out: `yield:percent[primary,big]`
f: `(prod/react) · 100`

**176. Reactor Conversion** | `reactor-conversion` | engineering | Activity | "Fraction of feed consumed."
in: `feed:number=100`, `unreacted:number=20`
out: `X:percent[primary,big]`
f: `(feed−unreacted)/feed · 100`

**177. Selectivity** | `selectivity` | engineering | Filter | "Desired / undesired."
in: `desired:number=80`, `undesired:number=20`
out: `S:number[primary,big]`
f: `desired/undesired`

**178. Fenske NTP** | `fenske` | engineering | Beaker | "Min plates at total reflux."
in: `xD:number=0.95`, `xB:number=0.05`, `alpha:number=2`
out: `Nmin:number[primary,big]`
f: `Nmin = log[(xD/(1−xD))·((1−xB)/xB)]/logα`

**179. Cooling Tower Approach** | `cooling-tower-approach` | engineering | Wind | "Outlet − wet bulb."
in: `outletT:number=30`, `wetBulb:number=25`
out: `approach:number[primary,big]`
f: `T_out − T_wb`

**180. Crystallization Yield** | `crystallization-yield` | engineering | Snowflake | "Crystals recovered on cooling."
in: `feedSolute:number=100`, `motherLiquorSolute:number=20`
out: `yield:percent[primary,big]`
f: `(feed−ML)/feed · 100`

---

# I. Aerospace / Aviation (10)

**181. Lift** | `aero-lift` | engineering | Plane | "Aircraft lift force."
in: `CL:number=0.5`, `rho:number=1.225`, `v:number=80`, `S:number=20`
out: `L:number[primary,big]`
f: `L = CL · ½ρv²S`

**182. Drag** | `aero-drag` | engineering | Plane | "Aircraft drag force."
in: `CD:number=0.04`, `rho:number=1.225`, `v:number=80`, `S:number=20`
out: `D:number[primary,big]`
f: `D = CD · ½ρv²S`

**183. Stall Speed** | `stall-speed` | engineering | Plane | "Min flying speed."
in: `W:number=10000`, `rho:number=1.225`, `CLmax:number=1.5`, `S:number=20`
out: `Vs:number[primary,big]`
f: `Vs = √(2W/(ρ·S·CLmax))`

**184. Glide Ratio** | `glide-ratio` | engineering | Plane | "L/D from altitude vs distance."
in: `altitude:number=2000`, `distance:number=20000`
out: `LD:number[primary,big]`
f: `LD = distance/altitude`

**185. Breguet Range** | `breguet-range` | engineering | Plane | "Cruise range (prop)."
in: `eta:number=0.8`, `cp:number=8e-8`, `LD:number=12`, `W0:number=8000`, `W1:number=5500`
out: `range:number[primary,big]`
f: `R = (η/cp)(L/D)ln(W0/W1)`

**186. Breguet Endurance** | `breguet-endurance` | engineering | Clock | "Cruise endurance."
in: `eta:number=0.8`, `cp:number=8e-8`, `LD:number=12`, `W0:number=8000`, `W1:number=5500`
out: `endurance:number[primary,big]`
f: `E = (η/cp)(L/D)ln(W0/W1)/V`

**187. Tsiolkovsky Rocket** | `tsiolkovsky` | engineering | Rocket | "Δv from Isp + mass ratio."
in: `isp:number=300`, `m0:number=1000`, `mf:number=300`
out: `deltaV:number[primary,big]`
f: `Δv = Isp·g·ln(m0/mf)`

**188. Orbital Velocity** | `orbital-velocity` | engineering | Globe | "Circular orbit velocity."
in: `mu:number=3.986e14`, `r:number=6.671e6`
out: `v:number[primary,big]`
f: `v = √(μ/r)`

**189. Escape Velocity** | `escape-velocity-aero` | engineering | Rocket | "Velocity to escape gravity."
in: `mu:number=3.986e14`, `r:number=6.371e6`
out: `v:number[primary,big]`
f: `v = √(2μ/r)`

**190. Mach Number** | `mach-number` | engineering | Plane | "v / a."
in: `v:number=300`, `a:number=340`
out: `M:number[primary,big]`
f: `M = v/a`

---

# J. Statistics — Advanced (20)

**191. One-Sample T-Test** | `t-test-one` | statistics | BarChart | "Sample vs hypothesized mean."
in: `sample:textarea`, `mu0:number=0`
out: `t:number[primary,big]`, `df:integer`, `pValue:number`
f: `t = (x̄−μ₀)/(s/√n)`

**192. Two-Sample T-Test** | `t-test-two` | statistics | BarChart | "Compare two independent means."
in: `a:textarea`, `b:textarea`, `equalVar:toggle=true`
out: `t:number[primary,big]`, `df:integer`, `pValue:number`
f: pooled or Welch t

**193. Paired T-Test** | `t-test-paired` | statistics | GitMerge | "Paired observations."
in: `pairs:textarea`
out: `t:number[primary,big]`, `df:integer`, `pValue:number`
f: `t = d̄/(sd/√n)`

**194. Chi² Goodness of Fit** | `chi-square-gof` | statistics | Sigma | "Observed vs expected counts."
in: `observed:textarea`, `expected:textarea`
out: `chi2:number[primary,big]`, `df:integer`, `pValue:number`
f: `χ² = Σ (O−E)²/E`

**195. Chi² Independence** | `chi-square-indep` | statistics | LayoutGrid | "Contingency-table independence."
in: `table:textarea`
out: `chi2:number[primary,big]`, `df:integer`, `pValue:number`
f: `χ² = Σ (Oij−Eij)²/Eij`

**196. One-Way ANOVA** | `anova-one-way` | statistics | BarChart3 | "Means of 3+ groups."
in: `groups:textarea`
out: `F:number[primary,big]`, `dfB:integer`, `dfW:integer`, `pValue:number`
f: `F = MSb/MSw`

**197. Pearson Correlation** | `pearson-correlation` | statistics | LineChart | "Linear correlation."
in: `x:textarea`, `y:textarea`
out: `r:number[primary,big]`
f: `r = Σ(xi−x̄)(yi−ȳ)/√(ΣΔx²·ΣΔy²)`

**198. Spearman Correlation** | `spearman-correlation` | statistics | LineChart | "Rank correlation."
in: `x:textarea`, `y:textarea`
out: `rho:number[primary,big]`
f: `1 − 6Σd²/(n(n²−1))`

**199. Linear Regression** | `linear-regression` | statistics | TrendingUp | "y = a + bx fit."
in: `x:textarea`, `y:textarea`
out: `slope:number[primary,big]`, `intercept:number`, `r2:number`
f: `b = Σ(xi−x̄)(yi−ȳ)/Σ(xi−x̄)²`

**200. R²** | `r-squared` | statistics | Percent | "Fit quality from residuals."
in: `actual:textarea`, `predicted:textarea`
out: `r2:number[primary,big]`
f: `1 − SSres/SStot`

**201. Adjusted R²** | `adj-r-squared` | statistics | Percent | "R² penalized for predictors."
in: `r2:number=0.85`, `n:number=100`, `k:number=3`
out: `adj:number[primary,big]`
f: `1 − (1−R²)(n−1)/(n−k−1)`

**202. SE of Estimate** | `see` | statistics | BarChart | "RMS residual error."
in: `residuals:textarea`, `k:number=2`
out: `see:number[primary,big]`
f: `√(Σe²/(n−k−1))`

**203. Poisson** | `poisson` | statistics | Sigma | "P(k events) given λ."
in: `lambda:number=3`, `k:number=2`
out: `prob:percent[primary,big]`
f: `e^(−λ)·λ^k/k!`

**204. Binomial** | `binomial` | statistics | Sigma | "P(k successes) in n trials."
in: `n:number=10`, `k:number=4`, `p:number=0.3`
out: `prob:percent[primary,big]`
f: `C(n,k)p^k(1−p)^(n−k)`

**205. Normal Distribution** | `normal-dist` | statistics | Sigma | "PDF/CDF for normal."
in: `x:number=1`, `mu:number=0`, `sigma:number=1`, `mode:select=cdf`
out: `value:number[primary,big]`
f: PDF/CDF of N(μ,σ²)

**206. Exponential Distribution** | `exponential-dist` | statistics | Sigma | "PDF/CDF exponential."
in: `x:number=1`, `lambda:number=0.5`, `mode:select=cdf`
out: `value:number[primary,big]`
f: `f = λe^(−λx)`; `F = 1−e^(−λx)`

**207. Geometric Distribution** | `geometric-dist` | statistics | Sigma | "P(first success at k)."
in: `k:number=3`, `p:number=0.4`
out: `prob:percent[primary,big]`
f: `(1−p)^(k−1)·p`

**208. Hypergeometric** | `hypergeometric-dist` | statistics | Sigma | "Sampling w/o replacement."
in: `N:number=50`, `K:number=10`, `n:number=5`, `k:number=2`
out: `prob:percent[primary,big]`
f: `C(K,k)C(N−K,n−k)/C(N,n)`

**209. Bayesian Posterior** | `bayes-posterior` | statistics | Sigma | "P(H|E) via Bayes."
in: `prior:percent=10`, `likelihood:percent=80`, `falsePos:percent=5`
out: `posterior:percent[primary,big]`
f: `pL/(pL + (1−p)FP)`

**210. Cohen's d** | `cohens-d` | statistics | Sigma | "Effect size between means."
in: `m1:number=100`, `m2:number=110`, `sd:number=15`
out: `d:number[primary,big]`
f: `d = (m2−m1)/sd`

---

# K. Probability (15)

**211. Coin Flip** | `coin-flip` | statistics | CircleDot | "P(k heads in n flips)."
in: `n:number=10`, `k:number=5`
out: `prob:percent[primary,big]`
f: `C(n,k)·0.5^n`

**212. Dice Sum** | `dice-sum-prob` | statistics | Dices | "P(sum=S) with d dice."
in: `dice:number=2`, `sides:number=6`, `target:number=7`
out: `prob:percent[primary,big]`
f: DP convolution

**213. Poker Hand** | `poker-hand-prob` | statistics | Spade | "P(5-card hands)."
in: `hand:select=fullHouse`
out: `prob:percent[primary,big]`
f: combinatorial table

**214. Birthday Paradox** | `birthday-paradox` | statistics | Cake | "P(shared birthday)."
in: `n:number=23`, `days:number=365`
out: `prob:percent[primary,big]`
f: `1 − ∏(1−i/365)`

**215. Monty Hall** | `monty-hall` | statistics | DoorOpen | "Switch vs stay."
in: `doors:number=3`
out: `switchPct:percent[primary,big]`, `stayPct:percent`
f: `1−1/n` vs `1/n`

**216. Conditional Probability** | `conditional-prob` | statistics | Filter | "P(A|B)."
in: `pAB:percent=10`, `pB:percent=25`
out: `pAGivenB:percent[primary,big]`
f: `P(A∩B)/P(B)`

**217. Bayes' Theorem** | `bayes-theorem` | statistics | Sigma | "P(A|B) via Bayes."
in: `pBA:percent=80`, `pA:percent=10`, `pB:percent=15`
out: `pAB:percent[primary,big]`
f: `P(B|A)P(A)/P(B)`

**218. Expected Value** | `expected-value` | statistics | Sigma | "E[X] = Σ xi·pi."
in: `outcomes:textarea`
out: `ev:number[primary,big]`
f: `Σx·p`

**219. Variance of RV** | `variance-rv` | statistics | Sigma | "Var(X)."
in: `outcomes:textarea`
out: `variance:number[primary,big]`
f: `Σx²p − (Σxp)²`

**220. Markov Steady (2-state)** | `markov-2state` | statistics | GitMerge | "Steady probabilities."
in: `pAB:number=0.3`, `pBA:number=0.2`
out: `pA:percent[primary,big]`, `pB:percent`
f: `pA = pBA/(pAB+pBA)`

**221. Gambler's Ruin** | `gamblers-ruin` | statistics | Coins | "P(reach N from i)."
in: `p:number=0.5`, `i:number=10`, `N:number=20`
out: `pWin:percent[primary,big]`
f: closed-form by p≠½ or =½

**222. Lottery Odds** | `lottery-odds` | statistics | Ticket | "Pick-k-of-n odds."
in: `pool:number=49`, `pick:number=6`
out: `odds:text[primary,big]`
f: `1/C(n,k)`

**223. Perm w/ Repetition** | `perm-repetition` | statistics | Shuffle | "Arrangements with repeats."
in: `letters:text=MISSISSIPPI`
out: `count:integer[primary,big]`
f: `n!/(n1!n2!…)`

**224. Comb w/ Repetition** | `comb-repetition` | statistics | Shuffle | "Multiset choose."
in: `n:number=5`, `r:number=3`
out: `count:integer[primary,big]`
f: `C(n+r−1,r)`

**225. Pigeonhole** | `pigeonhole` | statistics | Bird | "Min to guarantee collision."
in: `pigeons:number=10`, `holes:number=7`
out: `minRepeat:integer[primary,big]`
f: `⌈n/k⌉`

---

# L. Algorithms / CS (20)

**226. Big-O Compare** | `big-o-compare` | cs | Code | "Compare growth at N."
in: `n:number=1000`, `a:select=nlogn`, `b:select=n2`
out: `aOps:number`, `bOps:number`, `verdict:text[primary,big]`
f: substitute n into class

**227. Time Complexity Estimator** | `time-complexity` | cs | Clock | "Runtime at scale."
in: `ops:number=1e6`, `complexity:select=nlogn`, `n:number=1000000`
out: `seconds:number[primary,big]`
f: `f(n)/ops`

**228. Space Complexity Estimator** | `space-complexity` | cs | HardDrive | "Memory at scale."
in: `n:number=1000000`, `bytesPerUnit:number=8`, `complexity:select=n`
out: `bytes:number[primary,big]`
f: `f(n)·bytes`

**229. Binary Search Steps** | `binary-search-steps` | cs | Search | "Worst-case comparisons."
in: `n:number=1000000`
out: `steps:integer[primary,big]`
f: `⌈log2 n⌉`

**230. Sort Comparisons** | `sort-comparisons` | cs | ArrowDownUp | "Comparison count by algo."
in: `n:number=1000`, `algo:select=quicksort`
out: `comparisons:integer[primary,big]`
f: algorithm-specific formula

**231. Hash Collision** | `hash-collision` | cs | Hash | "Birthday-bound for hashes."
in: `bits:number=64`, `n:number=1000000`
out: `prob:percent[primary,big]`
f: `1 − e^(−n²/(2·2^bits))`

**232. Bloom Filter Size** | `bloom-filter-size` | cs | Filter | "Optimal m & k for FPR."
in: `n:number=1000000`, `fpr:percent=1`
out: `m:integer[primary,big]`, `k:integer`
f: `m = −n·ln(p)/ln(2)²`; `k = m/n·ln2`

**233. Page Replacement** | `page-replacement` | cs | Layers | "Faults given trace."
in: `frames:number=3`, `trace:text=7,0,1,2,0,3,0,4`, `policy:select=lru`
out: `faults:integer[primary,big]`
f: simulate per policy

**234. Disk Seek Time** | `disk-seek-time` | cs | HardDrive | "Avg seek + rot + transfer."
in: `rpm:number=7200`, `seekMs:number=8`, `kbToRead:number=64`, `transferMbps:number=200`
out: `totalMs:number[primary,big]`
f: seek + ½rev + size/throughput

**235. RAID Capacity** | `raid-capacity` | cs | HardDrive | "Usable capacity by level."
in: `disks:number=4`, `diskTb:number=4`, `level:select=raid5`
out: `usableTb:number[primary,big]`, `redundancy:text`
f: 0/1/5/6/10 formulas

**236. Cache AMAT** | `cache-miss-rate` | cs | Cpu | "Avg memory access time."
in: `hitTime:number=1`, `missRate:percent=5`, `missPenalty:number=100`
out: `amat:number[primary,big]`
f: `AMAT = hit + miss·penalty`

**237. CPU Throughput** | `cpu-throughput` | cs | Cpu | "Jobs/sec."
in: `jobsDone:number=1000`, `seconds:number=60`
out: `throughput:number[primary,big]`
f: `jobs/time`

**238. Erlang B** | `erlang-b` | cs | Phone | "Blocking probability."
in: `traffic:number=10`, `trunks:number=12`
out: `blockPct:percent[primary,big]`
f: recursive Erlang B

**239. Network Throughput** | `network-throughput` | networking | Network | "Practical MB/s."
in: `linkMbps:number=1000`, `overheadPct:percent=10`
out: `mbps:number[primary,big]`
f: `link·(1−overhead%)/8`

**240. BDP** | `bdp` | networking | Network | "Bandwidth-delay product."
in: `bandwidthMbps:number=1000`, `rttMs:number=20`
out: `bytes:number[primary,big]`
f: `BW·RTT/8`

**241. TCP Window** | `tcp-window` | networking | Network | "Recommended window."
in: `bandwidthMbps:number=1000`, `rttMs:number=20`
out: `windowKb:number[primary,big]`
f: `BDP, rounded up`

**242. RTT / Latency** | `latency-rtt` | networking | Clock | "RTT from one-way times."
in: `oneWayMs:number=10`
out: `rttMs:number[primary,big]`
f: `2 · one-way`

**243. Big-O Ratio** | `big-o-ratio` | cs | Activity | "fA(n)/fB(n)."
in: `n:number=100000`, `a:select=n`, `b:select=nlogn`
out: `ratio:number[primary,big]`
f: `fA(n)/fB(n)`

**244. Master Theorem** | `master-theorem` | cs | Sigma | "Solve T(n)=aT(n/b)+Θ(n^d)."
in: `a:number=2`, `b:number=2`, `d:number=1`
out: `complexity:text[primary,big]`
f: compare `d` to `log_b a`

**245. Linear Recurrence** | `recurrence-linear` | cs | Sigma | "Closed form for linear recurrence."
in: `a:number=1`, `b:number=2`, `c:number=1`
out: `formula:text[primary,big]`
f: solve `T(n) = a·T(n−1) + c`

---

# M. Networking (15)

**246. Subnet Hosts** | `subnet-hosts` | networking | Network | "Usable hosts for /n."
in: `prefix:number=24`
out: `hosts:integer[primary,big]`
f: `2^(32−n) − 2`

**247. VLSM Plan** | `vlsm` | networking | Layers | "Subnets for hosts list."
in: `basePrefix:text=10.0.0.0/16`, `hostsList:text=500,200,100,50`
out: `plan:text[primary,big]`
f: greedy by size desc

**248. Wildcard Mask** | `wildcard-mask` | networking | Cog | "Mask → ACL wildcard."
in: `mask:text=255.255.255.0`
out: `wildcard:text[primary,big]`
f: bitwise NOT

**249. IPv6 Subnet** | `ipv6-subnet` | networking | Globe | "IPv6 prefix info."
in: `cidr:text=2001:db8::/32`
out: `range:text[primary,big]`, `total:text`
f: 128-bit prefix arithmetic

**250. Public IP Range** | `public-ip-range` | networking | Globe | "Private vs public."
in: `ip:text=8.8.8.8`
out: `type:text[primary,big]`
f: RFC1918/CGNAT/loopback

**251. NAT Pool Size** | `nat-pool-size` | networking | ArrowRightLeft | "Required NAT mappings."
in: `users:number=10000`, `flowsPerUser:number=8`
out: `mappings:integer[primary,big]`
f: `users·flows`

**252. MTU / MSS** | `mtu-mss` | networking | Network | "MSS from MTU."
in: `mtu:number=1500`, `ipHdr:number=20`, `tcpHdr:number=20`
out: `mss:integer[primary,big]`
f: `MTU − IP − TCP`

**253. Round-Trip Time** | `rtt` | networking | Activity | "RTT from one-way."
in: `forwardMs:number=10`, `reverseMs:number=12`
out: `rtt:number[primary,big]`
f: `forward + reverse`

**254. Bandwidth → Throughput** | `bw-to-throughput` | networking | Network | "After overhead."
in: `linkMbps:number=1000`, `efficiencyPct:percent=92`
out: `mbps:number[primary,big]`
f: `link·eff%`

**255. Packet Loss** | `packet-loss` | networking | AlertTriangle | "Loss from sent/recv."
in: `sent:number=1000`, `received:number=985`
out: `loss:percent[primary,big,error]`
f: `(sent−recv)/sent·100`

**256. VoIP Bandwidth** | `voip-bw` | networking | Phone | "Per-call kbps."
in: `codec:select=g711`, `concurrent:number=50`
out: `totalKbps:number[primary,big]`
f: codec rate × concurrent

**257. Streaming Bandwidth** | `streaming-bw` | networking | Video | "Per quality tier."
in: `quality:select=1080p`, `concurrent:number=100`
out: `totalMbps:number[primary,big]`
f: tier rate × concurrent

**258. WiFi Channel Width** | `wifi-channel-width` | networking | Wifi | "Theoretical max throughput."
in: `width:select=80MHz`, `streams:number=4`, `mcs:select=11`
out: `maxMbps:number[primary,big]`
f: 802.11ax lookup

**259. Antenna Link Budget** | `antenna-gain` | networking | Signal | "Rx power from link budget."
in: `txPowerDbm:number=20`, `txGainDbi:number=6`, `rxGainDbi:number=6`, `freeSpaceLossDb:number=80`
out: `rxPowerDbm:number[primary,big]`
f: `Tx + Gt − FSPL + Gr`

**260. dBm ↔ mW** | `dbm-mw` | networking | Signal | "Power conversion."
in: `value:number=10`, `direction:select=dbmToMw`
out: `result:number[primary,big]`
f: `mW = 10^(dBm/10)`

---

# N. Cryptography & Security (10)

**261. RSA Key Strength** | `rsa-strength` | crypto-sec | Lock | "Effective security level."
in: `bits:number=2048`
out: `securityBits:integer[primary,big]`
f: NIST SP800-57 map

**262. AES Brute-Force Time** | `aes-brute-force` | crypto-sec | Lock | "Years to brute-force."
in: `keyBits:number=128`, `keysPerSecond:number=1e18`
out: `years:number[primary,big]`
f: `2^bits/(kps·3.15e7)`

**263. Hash Birthday Bound** | `hash-birthday` | crypto-sec | Hash | "Collision threshold."
in: `bits:number=256`
out: `threshold:number[primary,big]`
f: `2^(bits/2)`

**264. DH Group Size** | `dh-group-size` | crypto-sec | Key | "DH security level."
in: `groupBits:number=2048`
out: `securityBits:integer[primary,big]`
f: NIST table

**265. Password Entropy** | `password-entropy` | crypto-sec | Key | "Bits of entropy."
in: `length:number=12`, `charset:select=alnumSym`
out: `bits:number[primary,big]`
f: `length · log2|charset|`

**266. PBKDF2 Iterations** | `pbkdf2-iterations` | crypto-sec | Lock | "Iterations for target."
in: `targetMs:number=300`, `iterationsPerMs:number=1000`
out: `iterations:integer[primary,big]`
f: `targetMs · ipms`

**267. ECC Equivalent** | `ecc-equivalent` | crypto-sec | Lock | "RSA-bits equivalent."
in: `curveBits:number=256`
out: `rsaEquivBits:integer[primary,big]`
f: NIST (256≈3072 RSA)

**268. Shor's Algorithm Gates** | `shors-steps` | crypto-sec | Atom | "Quantum gate count."
in: `bits:number=2048`
out: `gates:number[primary,big]`
f: `O(b³)`

**269. Encryption Speed** | `encryption-speed` | crypto-sec | Lock | "Seconds to encrypt N bytes."
in: `bytes:number=1e9`, `throughputMbps:number=200`
out: `seconds:number[primary,big]`
f: `bytes·8/(Mbps·1e6)`

**270. TLS Handshake Cost** | `tls-handshake` | crypto-sec | Lock | "RTT + crypto time."
in: `rttMs:number=30`, `cryptoMs:number=10`
out: `totalMs:number[primary,big]`
f: `2·RTT + crypto`

---

# O. Data Science / ML (20)

**271. Confusion Matrix** | `confusion-matrix` | datascience | LayoutGrid | "TP/FP/TN/FN metrics."
in: `tp:number=80`, `fp:number=10`, `fn:number=5`, `tn:number=105`
out: `accuracy:percent[primary,big]`, `precision:percent`, `recall:percent`, `f1:number`
f: standard definitions

**272. Precision/Recall/F1** | `precision-recall-f1` | datascience | Target | "All three from TP/FP/FN."
in: `tp:number=80`, `fp:number=10`, `fn:number=5`
out: `precision:percent`, `recall:percent`, `f1:number[primary,big]`
f: `F1 = 2PR/(P+R)`

**273. Accuracy** | `accuracy` | datascience | CheckCircle | "Correct/total."
in: `correct:number=185`, `total:number=200`
out: `accuracy:percent[primary,big]`
f: `correct/total·100`

**274. ROC AUC** | `roc-auc` | datascience | LineChart | "AUC from TPR/FPR."
in: `tpr:textarea`, `fpr:textarea`
out: `auc:number[primary,big]`
f: trapezoidal rule

**275. PR AUC** | `pr-auc` | datascience | LineChart | "Precision-recall AUC."
in: `precision:textarea`, `recall:textarea`
out: `auc:number[primary,big]`
f: trapezoidal rule

**276. Cross-Entropy** | `cross-entropy` | datascience | Sigma | "Binary/categorical CE."
in: `yTrue:textarea`, `yPred:textarea`
out: `loss:number[primary,big]`
f: `−Σ y·log(p)`

**277. MSE / MAE / RMSE** | `mse-mae-rmse` | datascience | Sigma | "Regression error metrics."
in: `actual:textarea`, `predicted:textarea`
out: `mse:number`, `mae:number`, `rmse:number[primary,big]`
f: `√(Σ(y−ŷ)²/n)`

**278. R² (manual)** | `r2-manual` | datascience | Percent | "Fit quality."
in: `actual:textarea`, `predicted:textarea`
out: `r2:number[primary,big]`
f: `1 − SSres/SStot`

**279. Silhouette** | `silhouette` | datascience | LayoutGrid | "Cluster quality."
in: `a:number=0.4`, `b:number=0.7`
out: `s:number[primary,big]`
f: `(b−a)/max(a,b)`

**280. K-means Inertia** | `kmeans-inertia` | datascience | LayoutGrid | "SSE to centroids."
in: `distances:textarea`
out: `inertia:number[primary,big]`
f: `Σ d²`

**281. Train/Test Split** | `train-test-split` | datascience | GitBranch | "Counts after split."
in: `total:number=10000`, `testPct:percent=20`, `valPct:percent=10`
out: `train:integer[primary,big]`, `val:integer`, `test:integer`
f: percentage allocation

**282. K-Fold** | `k-fold` | datascience | Repeat | "Fold size + iterations."
in: `total:number=10000`, `k:number=5`
out: `perFold:integer[primary,big]`, `iterations:integer`
f: `total/k`

**283. LR Estimator** | `lr-estimator` | datascience | Activity | "LR sweep multiplier."
in: `lrMin:number=1e-5`, `lrMax:number=1e-1`, `steps:number=100`
out: `multiplier:number[primary,big]`
f: `(max/min)^(1/steps)`

**284. MLP Params** | `mlp-params` | ai | Brain | "Trainable params in MLP."
in: `layers:text=784,256,128,10`
out: `params:integer[primary,big]`
f: `Σ (Lᵢ·Lᵢ₊₁ + Lᵢ₊₁)`

**285. CNN FLOPs** | `cnn-flops` | ai | Brain | "FLOPs of one conv layer."
in: `H:number=224`, `W:number=224`, `Cin:number=3`, `Cout:number=64`, `K:number=3`
out: `flops:number[primary,big]`
f: `2·H·W·Cin·Cout·K²`

**286. Transformer Params** | `transformer-params` | ai | Brain | "Rough LM param count."
in: `dModel:number=512`, `layers:number=6`, `vocab:number=32000`
out: `params:integer[primary,big]`
f: `12·layers·d² + vocab·d`

**287. Attention Memory** | `attention-memory` | ai | Brain | "Bytes for attention."
in: `seq:number=2048`, `heads:number=16`, `dModel:number=4096`, `dtypeBytes:number=2`
out: `bytes:number[primary,big]`
f: `heads·seq²·dtypeBytes`

**288. GPU Memory for Batch** | `gpu-memory-batch` | ai | Cpu | "Memory needed."
in: `params:number=1e9`, `bytesPerParam:number=4`, `optStateBytes:number=12`, `actBytesPerSample:number=2e7`, `batch:number=8`
out: `gb:number[primary,big]`
f: `(params·bpp + params·opt + batch·act)/1e9`

**289. LLM Token Cost** | `llm-token-cost` | ai | Coins | "Cost for I/O tokens."
in: `inputTokens:number=1000`, `outputTokens:number=400`, `priceIn:currency=0.003`, `priceOut:currency=0.015`
out: `total:currency[primary,big]`
f: `(in·priceIn + out·priceOut)/1000`

**290. Vector Distance** | `vector-distance` | datascience | Move | "Cosine / L2."
in: `a:textarea`, `b:textarea`, `metric:select=cosine`
out: `distance:number[primary,big]`
f: cosine or Euclidean

---

# P. Database / Backend (10)

**291. Index Size** | `index-size` | database | Database | "B-tree index size."
in: `rows:number=1e7`, `keyBytes:number=8`, `pointerBytes:number=8`
out: `bytes:number[primary,big]`
f: `rows·(k+p)·1.5`

**292. Row Size** | `row-size` | database | Database | "Avg bytes per row."
in: `fields:textarea`
out: `bytes:integer[primary,big]`
f: sum of field sizes

**293. Storage Estimate** | `storage-estimate` | database | HardDrive | "Total table size."
in: `rows:number=1e8`, `bytesPerRow:number=200`, `overheadPct:percent=20`
out: `gb:number[primary,big]`
f: `rows·bytes·(1+oh%)/1e9`

**294. QPS → RPS** | `qps-rps` | database | Activity | "Queries vs requests."
in: `qps:number=2000`, `queriesPerRequest:number=4`
out: `rps:number[primary,big]`
f: `qps/qpr`

**295. Connection Pool** | `db-conn-pool` | database | Network | "Pool from concurrency."
in: `concurrentUsers:number=200`, `avgQueryMs:number=20`, `qps:number=2000`
out: `pool:integer[primary,big]`
f: `qps·queryS + headroom`

**296. Sharding Range** | `sharding-range` | database | Layers | "Rows per shard."
in: `rows:number=1e9`, `shards:number=16`
out: `rowsPerShard:integer[primary,big]`
f: `rows/shards`

**297. Replication Lag** | `replication-lag` | database | RefreshCw | "Lag from throughput."
in: `writesPerSec:number=10000`, `replicaThroughput:number=12000`
out: `lagSeconds:number[primary,big]`
f: backlog / (replica − writes)

**298. Buffer Pool Hit** | `buffer-pool-hit` | database | Layers | "Cache effectiveness."
in: `hits:number=950000`, `total:number=1000000`
out: `hitRatio:percent[primary,big]`
f: `hits/total·100`

**299. B-tree Depth** | `btree-depth` | database | Database | "Levels for N keys."
in: `rows:number=1e9`, `fanout:number=100`
out: `depth:integer[primary,big]`
f: `⌈log_F(N)⌉`

**300. Backup Window** | `backup-window` | database | Save | "Hours to back up data."
in: `dataGb:number=500`, `throughputMbps:number=200`
out: `hours:number[primary,big]`
f: `dataGB·8·1024/(Mbps·3600)`

---

## Index

| #         | Section                 | Count   |
| --------- | ----------------------- | ------- |
| A         | Investing & Trading     | 40      |
| B         | Insurance               | 20      |
| C         | Real Estate             | 15      |
| D         | Business / Accounting   | 25      |
| E         | Marketing / Sales       | 20      |
| F         | Mechanical Engineering  | 25      |
| G         | Civil Engineering       | 20      |
| H         | Chemical Engineering    | 15      |
| I         | Aerospace / Aviation    | 10      |
| J         | Statistics Advanced     | 20      |
| K         | Probability             | 15      |
| L         | Algorithms / CS         | 20      |
| M         | Networking              | 15      |
| N         | Cryptography & Security | 10      |
| O         | Data Science / ML       | 20      |
| P         | Database / Backend      | 10      |
| **Total** |                         | **300** |
