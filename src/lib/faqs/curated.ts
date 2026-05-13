import type { FaqItem } from "./types";

/**
 * Curated, hand-written FAQs for popular calculators. The blog system and the
 * FAQPage JSON-LD on each calculator page use these. Anything not listed here
 * falls back to the auto-generator (5 baseline FAQs).
 */
export const CURATED_FAQS: Record<string, FaqItem[]> = {
  // ─── SIP ────────────────────────────────────────────────────────────────
  sip: [
    {
      q: "How is SIP return calculated?",
      a: "SIP future value uses the annuity formula: FV = P × ((1+i)^n − 1) / i × (1+i), where P is the monthly investment, i is the monthly rate (annual / 12 / 100), and n is the total number of months. CalcMaster iterates this monthly to match what fund houses publish, so the number matches your statement within a rupee.",
    },
    {
      q: "What annual return should I assume for an equity SIP?",
      a: "Indian equity mutual funds have averaged roughly 11–14% over 15+ year horizons. We default to 12% for long horizons (which is conservative). For 5-year horizons use 10–11%; for hybrid or debt SIPs, use 6–8%.",
    },
    {
      q: "Is the SIP return guaranteed?",
      a: "No. Markets are volatile — any single year can be −25% to +50%. The 12% is an annualized average across cycles. Don't quit during the bad years; that's when SIPs accumulate the cheapest units.",
    },
    {
      q: "Is SIP better than lumpsum?",
      a: "Lumpsum wins ~70% of the time in rising markets because money is invested earlier and compounds longer. SIP wins in flat or falling markets thanks to rupee-cost averaging. For most retail investors, the behavioural benefit of SIP — staying invested — outweighs the math edge of lumpsum.",
    },
    {
      q: "What is a step-up SIP?",
      a: "A step-up SIP automatically increases the monthly amount by a fixed % every year (typically 5–15%) to track salary growth. Step-up SIPs of 10% / yr roughly double the final corpus over 25 years vs a flat SIP.",
    },
    {
      q: "Can SIP returns be tax-free?",
      a: "Equity SIP gains held >12 months are LTCG at 12.5% with a ₹1.25 L annual exemption. Debt SIP gains are taxed at slab rate regardless of holding period (post-April 2023). Harvest the LTCG exemption every March to compound the exemption itself.",
    },
    {
      q: "What's the minimum SIP amount in India?",
      a: "Most fund houses allow SIP from ₹100/month, some from ₹500. There's no upper limit. CalcMaster works at any amount from ₹100 to ₹10 lakh per month.",
    },
    {
      q: "How do I stop a SIP?",
      a: "On your fund house portal or app: SIP / Manage SIP → Stop. Funds already invested stay invested; only future debits stop. Don't redeem what's already invested unless you actually need the money.",
    },
    {
      q: "Does CalcMaster account for inflation in SIP?",
      a: "By default we show nominal returns. Mentally subtract 5–6% inflation to estimate real purchasing power. For a 25-year ₹1 cr nominal corpus, the real value today is roughly ₹23 lakh.",
    },
    {
      q: "Why does my fund's CAGR not match my SIP return?",
      a: "Fund CAGR is point-to-point. Your SIP's effective return is XIRR (each instalment has its own holding period). On a strongly trending fund, XIRR is typically 10–20% lower than the headline CAGR over the same period.",
    },
  ],

  // ─── EMI ────────────────────────────────────────────────────────────────
  emi: [
    {
      q: "What is the EMI formula?",
      a: "EMI = P × r × (1+r)^n / ((1+r)^n − 1), where P is the loan amount, r is the monthly rate (annual / 12 / 100), and n is the total months. This is the reducing-balance EMI used by every Indian bank for home, car and personal loans.",
    },
    {
      q: "Why is total interest higher than the loan amount on long tenures?",
      a: "Long tenures (20–30 yr) at 8–10% rates compound interest each month on the remaining balance. A 20-year loan at 9% pays ~115% of principal as interest. The total payment vs total interest stat in CalcMaster shows this exact split.",
    },
    {
      q: "Does EMI change over time?",
      a: "No, EMI is constant. What changes is the split: early months are ~90% interest + 10% principal; near the end it flips to ~10% interest + 90% principal. The full schedule is downloadable from the Amortization Schedule tool.",
    },
    {
      q: "What happens if I prepay an extra ₹1 lakh in year 2?",
      a: "Massive interest savings. The Mortgage Payoff calculator shows that on a ₹50 L / 20 yr / 9% loan, a single ₹1 L prepayment in year 2 saves ~₹3 L of total interest. Same prepayment in year 18 saves almost nothing.",
    },
    {
      q: "What's flat-rate EMI vs reducing balance?",
      a: "Flat-rate computes interest on the original principal for the entire tenure — roughly doubling the effective interest rate. Reducing balance computes on the actual remaining balance each month. Every Indian bank loan is reducing balance; some money-lenders quote flat rates. Avoid flat-rate loans.",
    },
    {
      q: "Can EMI be more than my income allows?",
      a: "Yes. Banks may approve up to 65% of net income as EMI; the safe rule is 40% across all loans combined. Use the DTI Ratio calculator before signing.",
    },
    {
      q: "How is EMI on personal loan different from home loan?",
      a: "The formula is identical. The difference is the rate (personal 12–20%, home 8–10%) and tenure (personal 1–5 yr, home 15–30 yr). Both use reducing balance.",
    },
    {
      q: "Will my EMI change if interest rates change?",
      a: "On a fixed-rate loan: no. On a floating-rate loan (most Indian home loans): the EMI is recalculated whenever the bank's reference rate changes — usually quarterly. CalcMaster computes one snapshot; rerun when rates change.",
    },
    {
      q: "What's the impact of choosing a 30-year vs 20-year EMI?",
      a: "On ₹50 L at 9%: 30-yr EMI = ₹40,232 (interest ₹95 L); 20-yr EMI = ₹44,986 (interest ₹58 L). The 30-yr loan costs ₹37 L more in interest. If you can afford the higher EMI, take the shorter tenure.",
    },
  ],

  // ─── Lumpsum ────────────────────────────────────────────────────────────
  lumpsum: [
    {
      q: "What is a lumpsum investment?",
      a: "A one-time deposit of a sum of money into an investment vehicle (mutual fund, FD, bond, stocks) where future growth depends entirely on the rate of return, not on additional deposits.",
    },
    {
      q: "What's the formula?",
      a: "Future Value = Principal × (1 + r/100)^n, where r is the annual return % and n is years. CalcMaster also shows the year-by-year corpus so you can visualize the compounding curve.",
    },
    {
      q: "Lumpsum or SIP — which to choose?",
      a: "If you already have a lump sum and the market is at historic lows, lumpsum wins. If you're investing month-to-month from salary, SIP is correct. Most people overthink this; the right answer is usually 'lumpsum and keep saving via SIP' if both apply.",
    },
    {
      q: "What's a realistic equity return for 10+ years?",
      a: "Indian equity index funds have averaged ~12% over 10-yr rolling windows. Use 10–12% for projections; treat anything above 14% as optimistic.",
    },
    {
      q: "Will the calculator account for taxes?",
      a: "No — values are nominal/gross. For Indian equity LTCG: 12.5% on gains > ₹1.25 L/yr. Subtract that from final value for a post-tax estimate.",
    },
    {
      q: "Can I add to a lumpsum later?",
      a: "Yes — that's actually a hybrid 'lumpsum + SIP' strategy and often beats either alone. CalcMaster doesn't model this combined view yet; you can run each separately and add the corpora.",
    },
    {
      q: "What if returns are negative for the first few years?",
      a: "Lumpsum is more exposed to sequence-of-returns risk than SIP. A 30% drop in year 1 takes 7+ years at 12% just to recover. If your horizon is < 5 years, prefer an STP (systematic transfer plan).",
    },
    {
      q: "Is lumpsum risk-free in an FD?",
      a: "Yes for the principal up to ₹5 lakh per bank under DICGC. But FD returns barely beat inflation; over 10+ years your real purchasing power can shrink.",
    },
  ],

  // ─── Compound Interest ──────────────────────────────────────────────────
  "compound-interest": [
    {
      q: "What is compound interest?",
      a: "Interest that's added to your principal each compounding period, so future interest is computed on a growing base. It's why your bank balance accelerates over time and why credit card debt explodes.",
    },
    {
      q: "How does compounding frequency affect returns?",
      a: "More frequent = slightly higher. On ₹1 L @ 10% for 10 yr: annual → ₹2.59 L; quarterly → ₹2.69 L; monthly → ₹2.71 L; continuous → ₹2.72 L. Beyond daily, returns asymptote to e^(rt).",
    },
    {
      q: "What's the rule of 72?",
      a: "Divide 72 by your annual return % to estimate doubling time. 6% → 12 yr, 12% → 6 yr, 18% → 4 yr. Useful for mental math on FDs, SIPs, and credit card debt.",
    },
    {
      q: "Compound vs simple interest — when does it matter?",
      a: "For < 1 year: barely. For 5+ years it's dramatic. ₹1 L at 10% simple for 10 yr = ₹2 L. Compound = ₹2.59 L. Always prefer compound.",
    },
    {
      q: "How is bank FD compounding different from CalcMaster?",
      a: "Most Indian banks compound FDs quarterly. Set 'Compounding = Quarterly' in CalcMaster to match. NRE FDs and corporate deposits may compound annually.",
    },
    {
      q: "Why is credit card interest higher than this calculator shows?",
      a: "Credit cards charge daily compounding at high APR (24–48%). Use the Credit Card Payoff calculator instead — it accounts for monthly minimum payments.",
    },
    {
      q: "Does CalcMaster handle continuous compounding?",
      a: "Set 'Compounding = Daily' for a close approximation. Mathematically continuous compounding uses A = P·e^(rt); we don't expose that mode because no real bank uses it.",
    },
  ],

  // ─── Simple Interest ────────────────────────────────────────────────────
  "simple-interest": [
    {
      q: "When is simple interest used?",
      a: "Short-term loans (personal loans from money-lenders, post-dated cheque advances) and old-style PPF tables. Modern banks use reducing-balance (compound) for all retail products.",
    },
    {
      q: "What's the formula?",
      a: "Simple Interest = (Principal × Rate × Time) / 100. Total amount = Principal + SI.",
    },
    {
      q: "Why is simple interest lower than compound?",
      a: "Because interest doesn't earn interest. On ₹100,000 at 10% for 5 years: SI = ₹50,000; CI (annual) = ₹61,051.",
    },
    {
      q: "Are car loans simple or compound interest?",
      a: "All Indian car loans are reducing-balance (compound). The 'flat rate' some dealers quote inflates the effective rate by ~2× — always compute the true APR.",
    },
    {
      q: "Is PPF simple interest?",
      a: "No, PPF compounds annually. Use the dedicated PPF calculator for accurate maturity.",
    },
    {
      q: "When should I borrow at simple interest?",
      a: "Only if the simple rate is meaningfully lower than a compound alternative AND the loan is short term (<1 yr). Otherwise compound at the same headline rate works out cheaper because of how flat rates inflate APR.",
    },
  ],

  // ─── FD / RD ────────────────────────────────────────────────────────────
  "fd-rd": [
    {
      q: "How is FD interest calculated?",
      a: "FD = P × (1 + r/n)^(n·t). Most Indian banks compound quarterly (n=4). For a ₹1 L FD at 7% for 5 years: A = 100000 × (1.0175)^20 = ₹1,41,478.",
    },
    {
      q: "What's the difference between FD and RD?",
      a: "FD is one lump deposit earning interest for the full tenure. RD is a monthly deposit (like SIP for FDs); each instalment earns interest only from its deposit date. RD returns are slightly lower than equivalent FD due to staggered deposits.",
    },
    {
      q: "Is FD interest taxable?",
      a: "Yes — at your slab rate. Banks deduct 10% TDS if interest > ₹40,000 per FY (₹50,000 for seniors). Section 80TTA gives ₹10,000 deduction on savings interest (not FD); 80TTB gives ₹50,000 for seniors on all bank interest.",
    },
    {
      q: "Are senior citizen FDs different?",
      a: "Yes — banks offer 0.25–0.5% higher rates. SCSS (Senior Citizens Savings Scheme, a separate product) gives 8.2% with quarterly payout — use the SCSS calculator for that.",
    },
    {
      q: "What's the minimum and maximum FD amount?",
      a: "Usually ₹1,000 min, no max. Above ₹2 cr, rates differ (bulk deposit rates). DICGC insurance covers up to ₹5 lakh per depositor per bank.",
    },
    {
      q: "Can I break an FD prematurely?",
      a: "Yes, with a 0.5–1% penalty on the applicable rate. CalcMaster doesn't model premature closure; compute manually if needed.",
    },
    {
      q: "RD with ₹5000/month for 5 years — what's the maturity?",
      a: "At 7% quarterly compounding ≈ ₹3.59 L (invested ₹3 L). Use the FD/RD calculator with monthly = 5000 and rate = 7 for an exact number.",
    },
  ],

  // ─── PPF ────────────────────────────────────────────────────────────────
  ppf: [
    {
      q: "What is PPF and who can open it?",
      a: "Public Provident Fund — a 15-year government-backed savings scheme for Indian residents. Returns are tax-free (EEE) and the current rate is 7.1%. One account per person; minors can have accounts via guardian.",
    },
    {
      q: "What's the maximum yearly investment?",
      a: "₹1.5 lakh per financial year, total across all PPF accounts you hold. CalcMaster caps your input at this ceiling automatically.",
    },
    {
      q: "Is PPF interest tax-free?",
      a: "Yes. PPF falls under the EEE (Exempt-Exempt-Exempt) regime: deposits qualify for Section 80C, interest is tax-free, and maturity is tax-free. One of the few remaining EEE products.",
    },
    {
      q: "Can I withdraw before 15 years?",
      a: "Partial withdrawal allowed from year 7. Loans against PPF allowed from year 3 to year 6. Premature closure only under specific conditions (medical / education) and 1% interest penalty applies.",
    },
    {
      q: "Is PPF a good investment in 2025?",
      a: "Good for a debt allocation of your portfolio, especially if you're in the 30% tax bracket (PPF's 7.1% tax-free ≈ 10.1% taxable). Not enough alone to fund retirement; pair with equity SIPs.",
    },
    {
      q: "Can I extend PPF after 15 years?",
      a: "Yes, in blocks of 5 years, with or without further deposits. Returns continue at the prevailing rate. Many people extend to avoid taxable alternatives.",
    },
    {
      q: "When during the month should I deposit?",
      a: "Before the 5th of the month. Interest is calculated on the minimum balance between the 5th and end of month. Depositing on the 5th captures full month's interest; depositing on the 6th loses one month.",
    },
    {
      q: "PPF vs ELSS — which?",
      a: "PPF: guaranteed 7.1%, 15-year lock-in, debt allocation. ELSS: market-linked 11–14% expected, 3-year lock-in, equity. Use both — PPF for the 'safe' bucket, ELSS for the 'growth' bucket. Both qualify for 80C.",
    },
  ],

  // ─── NPS ────────────────────────────────────────────────────────────────
  nps: [
    {
      q: "What is NPS?",
      a: "National Pension System — a market-linked retirement scheme. You contribute monthly, your money is allocated across equity (E), corporate debt (C), government bonds (G), and alternates (A). At 60, you withdraw 60% as lumpsum (tax-free) and use 40% to buy an annuity.",
    },
    {
      q: "What returns does NPS give?",
      a: "Long-term NPS Tier-1 has averaged 9–12% depending on equity allocation. Aggressive (75% equity) tends toward 11–12%; conservative (low equity) toward 8–9%.",
    },
    {
      q: "What's the tax benefit of NPS?",
      a: "₹1.5 L under 80CCD(1) — part of the regular 80C cap. Additional ₹50,000 under 80CCD(1B), exclusively for NPS, on top of 80C. Employer NPS contributions get 80CCD(2) deduction (10% of basic — uncapped).",
    },
    {
      q: "Can I withdraw before 60?",
      a: "Premature exit allowed after 5 years: 20% lumpsum (taxable), 80% used for annuity. Better to stay invested — early exit is rarely worth it.",
    },
    {
      q: "Is the 40% annuity taxable?",
      a: "The 40% used to buy the annuity is tax-free. The monthly annuity income (pension) is taxable at slab rate. The 60% lumpsum at maturity is tax-free.",
    },
    {
      q: "Tier-1 vs Tier-2?",
      a: "Tier-1 is locked till 60 (with restrictions), gets tax benefits. Tier-2 is fully liquid (withdraw anytime), no tax benefit. Most subscribers only use Tier-1.",
    },
    {
      q: "How much should I contribute?",
      a: "Minimum ₹500/yr (Tier-1). Realistic target for retirement adequacy: 10% of basic salary, or use the Retirement Planner to reverse-engineer the number.",
    },
  ],

  // ─── EPF ────────────────────────────────────────────────────────────────
  epf: [
    {
      q: "What is EPF?",
      a: "Employees' Provident Fund — a mandatory retirement scheme for salaried employees. Both you and your employer contribute 12% of your Basic + DA each month. Current interest rate is 8.15% (FY 2024-25).",
    },
    {
      q: "How is EPF interest calculated?",
      a: "Monthly compounding at the declared annual rate / 12. Interest is credited annually but compounded monthly internally. CalcMaster simulates the month-by-month accrual to match your UAN passbook.",
    },
    {
      q: "Is EPF withdrawal tax-free?",
      a: "Yes if you've completed 5 years of continuous service (across employers). Withdrawal before 5 years is taxable + TDS at 10% if amount > ₹50,000.",
    },
    {
      q: "Can I withdraw EPF for home / wedding / medical?",
      a: "Yes — partial withdrawal allowed for housing (after 5 yr service), marriage (after 7 yr), medical (any time), and education (after 7 yr). Each has different eligibility caps.",
    },
    {
      q: "What happens to EPF when I switch jobs?",
      a: "Transfer to your new employer's UAN — don't withdraw. Continuous service includes contributions from previous employer if you transfer (vs withdraw). This matters for tax exemption.",
    },
    {
      q: "EPS vs EPF — what's the difference?",
      a: "Of the employer's 12%, 8.33% goes to EPS (Employees' Pension Scheme) and 3.67% to EPF. Your full 12% goes to EPF. EPS gives a small monthly pension at 58; EPF is your retirement corpus.",
    },
    {
      q: "How do I check my EPF balance?",
      a: "Login to UAN portal (unifiedportal-mem.epfindia.gov.in) with your UAN + password. SMS 'EPFOHO UAN' to 7738299899. Missed call to 9966044425 from registered mobile.",
    },
  ],

  // ─── HRA ────────────────────────────────────────────────────────────────
  hra: [
    {
      q: "What is HRA exemption?",
      a: "House Rent Allowance — tax-exempt portion of salary you receive for rent. Exempt under Section 10(13A) only if you pay actual rent. The exempt amount is the minimum of three calculated values.",
    },
    {
      q: "What are the three HRA exemption rules?",
      a: "Exempt HRA = MIN of: (1) actual HRA received, (2) 50% of basic+DA for metros (40% for non-metros), (3) actual rent paid − 10% of basic+DA. CalcMaster shows all three numbers and the minimum.",
    },
    {
      q: "Which cities are metros for HRA?",
      a: "Only Delhi, Mumbai, Kolkata, and Chennai are 'metro' for HRA tax purposes — even though Bangalore, Hyderabad, Pune are larger metros economically. The IT department's list is legally binding.",
    },
    {
      q: "Can I claim HRA without renting?",
      a: "No. You must actually pay rent and have rent receipts as proof. False HRA claims are flagged in scrutiny.",
    },
    {
      q: "Can I claim HRA while paying home loan EMI?",
      a: "Yes if your home loan home is in a different city than your job, or rented out, or your name isn't on the property. Both HRA exemption and Section 24(b) home-loan-interest deduction can be claimed simultaneously in these cases.",
    },
    {
      q: "Do I need a PAN of my landlord?",
      a: "Required if annual rent > ₹1 lakh (₹8,333/month). Without PAN, employer cannot grant HRA exemption — though you can claim refund later directly in ITR.",
    },
    {
      q: "Is HRA exempt under the new tax regime?",
      a: "No. New regime (default) has flat-rate slabs with no HRA exemption. Choose Old regime if your HRA-driven savings outweigh the slab gap. Use the Regime Compare calculator.",
    },
  ],

  // ─── Income Tax ─────────────────────────────────────────────────────────
  "income-tax": [
    {
      q: "Which regime should I choose?",
      a: "Compare both: New regime has lower rates but no major deductions (only ₹75k standard deduction). Old regime has higher rates but allows 80C (₹1.5 L), 80D (medical), HRA, home-loan interest. Old wins if your deductions exceed ~₹3-4 lakh. Use the Regime Compare calculator for your exact number.",
    },
    {
      q: "What are the new regime slabs (FY 2024-25)?",
      a: "Up to ₹3 L: nil. ₹3-7 L: 5%. ₹7-10 L: 10%. ₹10-12 L: 15%. ₹12-15 L: 20%. >₹15 L: 30%. Plus 4% cess. Standard deduction ₹75,000.",
    },
    {
      q: "What are the old regime slabs?",
      a: "Up to ₹2.5 L: nil. ₹2.5-5 L: 5%. ₹5-10 L: 20%. >₹10 L: 30%. Plus 4% cess. Standard deduction ₹50,000. Various 80C, 80D etc deductions also apply.",
    },
    {
      q: "What's the 87A rebate?",
      a: "If taxable income ≤ ₹7 L (new regime) or ≤ ₹5 L (old regime), tax payable is zero due to Section 87A rebate. CalcMaster applies this automatically.",
    },
    {
      q: "Is the 4% cess applied to everything?",
      a: "Yes — 4% health & education cess is added on top of the income tax (after 87A rebate). The cess in CalcMaster's tax outputs is already included.",
    },
    {
      q: "What about surcharge?",
      a: "Surcharge applies above ₹50 L (10%), ₹1 cr (15%), ₹2 cr (25% — old regime), ₹5 cr (37% — old / 25% — new). CalcMaster doesn't yet apply surcharge for incomes > ₹50 L — use a CA for high incomes.",
    },
    {
      q: "Can I claim 80C in the new regime?",
      a: "No. New regime disallows 80C, 80D, HRA, LTA, home-loan interest, professional tax — but it gives a higher standard deduction (₹75k) and a lower tax rate. For incomes ₹5-12 L without big deductions, New is usually better.",
    },
    {
      q: "When is advance tax due?",
      a: "If liability > ₹10,000 for the year: 15% by 15 Jun, 45% by 15 Sep, 75% by 15 Dec, 100% by 15 Mar. Use the Advance Tax calculator for exact instalments.",
    },
  ],

  // ─── Mortgage ───────────────────────────────────────────────────────────
  mortgage: [
    {
      q: "What's the difference between EMI and Mortgage calculator?",
      a: "Math is identical (both use the reducing-balance EMI formula). Mortgage adds home-specific inputs: down payment %, property price, prepayment scenarios. Use Mortgage for housing; EMI for any other loan.",
    },
    {
      q: "How much down payment is best?",
      a: "Most lenders need 10–25%. Sweet spot is 20% — qualifies you for best rates and stays comfortable. Less than 10% requires PMI (in the US) or higher rate (in India). More than 30% leaves cash idle that could earn more in equity.",
    },
    {
      q: "Should I take 20 or 30-year tenure?",
      a: "20-year wins on total interest (saves ~30% vs 30-year on same loan). If 20-year EMI is comfortable (< 40% of net income), take it. If it strains the budget, take 30-year and prepay aggressively from year 2 onwards.",
    },
    {
      q: "What's a good interest rate?",
      a: "In India (2025): 8.4–9.0% for prime borrowers with good credit. Floating-rate is usually 0.25–0.5% below fixed-rate; fixed locks in protection against hikes. With current rate stability, floating tends to win.",
    },
    {
      q: "Can I claim tax benefit on home loan?",
      a: "Yes (old regime only). Principal: 80C up to ₹1.5 L. Interest: Section 24(b) up to ₹2 L for self-occupied. First-home buyers: additional ₹1.5 L under 80EEA (subject to caps).",
    },
    {
      q: "Does mortgage rate change?",
      a: "Floating-rate loans reset quarterly based on the bank's MCLR or repo-linked rate (RLLR). Most banks now use repo-linked, which moves quickly with RBI changes.",
    },
    {
      q: "What if I want to prepay?",
      a: "Banks allow prepayment on floating-rate housing loans with no penalty (RBI rule). Fixed-rate loans may have 2–4% prepayment penalty in the first few years. Use the Mortgage Payoff calculator to see the interest saving.",
    },
  ],

  // ─── Retirement ─────────────────────────────────────────────────────────
  retirement: [
    {
      q: "How much corpus do I need to retire?",
      a: "Rule of thumb: 30× your annual post-retirement expenses (i.e. the 4% rule). For someone needing ₹60,000/month today (₹7.2 L/yr) retiring in 25 years: corpus needed ≈ ₹5 cr (inflated and grossed). Use the Retirement Planner for your numbers.",
    },
    {
      q: "What's the 4% rule?",
      a: "Withdraw 4% of corpus in year 1, then adjust each year for inflation. Historical US data shows a 4%-rate portfolio (60% equity / 40% debt) survives 30+ years with high probability. India-adjusted, 3.5% is more conservative.",
    },
    {
      q: "What return assumptions are sensible?",
      a: "Pre-retirement (working years, equity-heavy): 11–13%. Post-retirement (debt-heavy): 7–8%. Inflation: 6% in India long-term. The Retirement Planner uses your inputs — defaults to 12 / 8 / 6.",
    },
    {
      q: "What is sequence-of-returns risk?",
      a: "Even with a good long-term average, a few bad years right after you retire can deplete a corpus that would have lasted otherwise. Mitigation: keep 2–3 years of expenses in liquid funds; ramp down equity as you approach retirement.",
    },
    {
      q: "Should I consider healthcare separately?",
      a: "Yes. Medical inflation in India is ~10–12%, much higher than general inflation. Add 30–50% buffer to your retirement corpus, or maintain a separate health insurance through retirement.",
    },
    {
      q: "Can I retire on PPF + EPF alone?",
      a: "Almost never. Even maxed-out EPF + PPF over 35 years produces ~₹3–4 cr — insufficient for a 30-year retirement at today's expenses. You need equity exposure to bridge the gap.",
    },
  ],

  // ─── Currency Converter ────────────────────────────────────────────────
  "currency-converter": [
    {
      q: "Are these rates live?",
      a: "CalcMaster currently uses offline approximate rates (USD = 1 as base, refreshed periodically). For mission-critical conversions (large remittances, business transactions), check live rates on Xe, Google, or your bank — they may differ by 0.5-2%.",
    },
    {
      q: "Why does my bank quote a different rate?",
      a: "Banks add a spread (typically 1-3%) to the mid-market rate to make profit on FX. Wise, Revolut and forex cards offer rates much closer to mid-market. The 'rate' you see online is mid-market; the rate you receive is always slightly worse.",
    },
    {
      q: "What's the best way to send money abroad?",
      a: "For < $5000: Wise or Revolut usually wins on cost. For real-estate-sized transfers: ask your bank for a forex desk quote. Always compare total cost (fee + spread) not just the headline rate.",
    },
    {
      q: "How often do rates change?",
      a: "Constantly — major pairs change every second during trading hours. Indian INR rates have ~0.1% intraday volatility; emerging market currencies can swing 1-2% in a day on news.",
    },
  ],

  // ─── GST ───────────────────────────────────────────────────────────────
  gst: [
    {
      q: "What is GST?",
      a: "Goods and Services Tax — India's unified indirect tax replacing VAT, service tax, excise. Standard slabs: 0%, 5%, 12%, 18%, 28%. Plus cess on luxury / sin goods.",
    },
    {
      q: "What's CGST vs SGST vs IGST?",
      a: "For intra-state sales: CGST (centre) + SGST (state), each half of the GST rate. For inter-state sales: IGST (full rate, centre collects then shares). Total burden is the same; only routing differs.",
    },
    {
      q: "How is GST applied — on cost or sale price?",
      a: "On the sale price (transaction value). The Discount calculator handles cases where the headline price is inclusive vs exclusive of GST.",
    },
    {
      q: "Who needs to register for GST?",
      a: "Businesses with turnover > ₹40 L (₹20 L for services or in special category states). Casual taxpayers, inter-state suppliers, and e-commerce operators register regardless of turnover.",
    },
    {
      q: "Can I claim GST as input credit?",
      a: "If you're GST-registered: yes — GST you paid on business inputs offsets GST you charge on outputs. Salaried individuals: no input credit; the GST you pay is a final cost.",
    },
    {
      q: "What rate applies to restaurants?",
      a: "Non-AC restaurants: 5%. AC / starred restaurants: 18%. Standalone bakeries: 5% on bakery items eaten on-premises, 12% on packaged items.",
    },
    {
      q: "Are exports GST-exempt?",
      a: "Exports are 'zero-rated' — effectively GST-free. Exporters get refund of input GST paid. CalcMaster doesn't model export refunds; consult a CA.",
    },
  ],

  // ─── Discount ──────────────────────────────────────────────────────────
  discount: [
    {
      q: "How are stacked discounts calculated?",
      a: "Multiplicatively, not additively. '70% off + extra 20% off' isn't 90% off — it's 1 − (1 − 0.7)(1 − 0.2) = 76%. CalcMaster computes this correctly for any number of stacked discounts.",
    },
    {
      q: "Why does the calculator show 76% instead of 90%?",
      a: "Because the second 20% discount applies to the already-discounted price, not the original. Retailers know stacking math is opaque to most shoppers — which is why they stack.",
    },
    {
      q: "What about coupon codes on top?",
      a: "Same multiplicative logic. Three discounts (20% + 10% + 10%) = 1 − (0.8 × 0.9 × 0.9) = 35.2% effective, not 40%.",
    },
    {
      q: "Is GST applied before or after discount?",
      a: "After. The 'sale price' is base for GST. If a product's MRP is ₹2,000 with 18% GST inclusive: discount it 20% → ₹1,600 inclusive of 18% GST. The base then is ₹1,355.93 and GST is ₹244.07.",
    },
    {
      q: "Can I use this on bank offers?",
      a: "Yes — feed the bank's flat discount as one of the stacked discounts. E.g., '15% bank cashback' is just another multiplicative discount.",
    },
  ],

  // ─── BMI ────────────────────────────────────────────────────────────────
  bmi: [
    {
      q: "How is BMI calculated?",
      a: "BMI = weight (kg) / height² (m). For 70 kg @ 1.75 m: BMI = 70 / 3.0625 = 22.86.",
    },
    {
      q: "What are the BMI categories?",
      a: "WHO global standard: < 18.5 underweight; 18.5-24.9 normal; 25-29.9 overweight; ≥ 30 obese. For South Asians, ICMR uses lower cut-offs (23 = overweight, 25 = obese) because metabolic risk arises at lower BMIs.",
    },
    {
      q: "Is BMI accurate?",
      a: "It's a screening tool, not a diagnosis. BMI doesn't distinguish muscle from fat. Athletes routinely score 'overweight' BMI with very low body fat. For a more accurate picture, use the Body Fat %, BMR, and waist-to-height ratio calculators together.",
    },
    {
      q: "Is BMI same for men and women?",
      a: "Adult cut-offs are the same for both sexes. Body composition differs (women have higher essential fat %) but BMI as a population-level metric uses unified ranges.",
    },
    {
      q: "What's a healthy BMI for Indians?",
      a: "Lower end of the normal range (18.5-23) per ICMR. South Asians develop diabetes and cardiovascular risk at lower BMI than Europeans. Aim for 21-23 as a target.",
    },
    {
      q: "Should children use this BMI calculator?",
      a: "No — children and teens (2-19 yr) need age-and-sex-specific percentile charts, not adult cut-offs. Talk to a paediatrician.",
    },
    {
      q: "Why does my BMI differ between calculators online?",
      a: "Some calculators round (whole-cm input vs decimal) and some apply ethnic adjustments. The math is identical; the categorization may differ. CalcMaster uses WHO standard.",
    },
  ],

  // ─── BMR ────────────────────────────────────────────────────────────────
  bmr: [
    {
      q: "What is BMR?",
      a: "Basal Metabolic Rate — calories your body burns at complete rest (just to maintain organs, breathing, body temperature). Roughly 60-75% of daily energy expenditure for most people.",
    },
    {
      q: "BMR vs TDEE?",
      a: "BMR is calories at rest. TDEE (Total Daily Energy Expenditure) is BMR × activity multiplier (1.2 sedentary to 1.9 athlete). Eat at TDEE to maintain weight; below to lose; above to gain.",
    },
    {
      q: "Which BMR formula does CalcMaster use?",
      a: "Mifflin-St Jeor — the modern standard, more accurate than the older Harris-Benedict. For 80kg / 180cm / 30yr male: 10·80 + 6.25·180 − 5·30 + 5 = 1780 kcal.",
    },
    {
      q: "Does BMR change with age?",
      a: "Yes — drops ~2-3% per decade after 20s, mostly due to muscle loss. The −5 × age term in Mifflin-St Jeor captures this.",
    },
    {
      q: "How accurate is the calculator?",
      a: "±10% for most people. Indirect calorimetry in a lab is the gold standard. Individual variation comes from muscle mass, thyroid function, genetics.",
    },
    {
      q: "Should I eat less than my BMR to lose weight?",
      a: "Almost never. Eating below BMR for extended periods slows metabolism and risks nutrient deficiency. Aim for TDEE − 500 kcal/day for a healthy ~0.5 kg/week loss.",
    },
  ],

  // ─── Calorie ────────────────────────────────────────────────────────────
  calorie: [
    {
      q: "How many calories should I eat?",
      a: "Maintenance = TDEE. Weight loss = TDEE − 500 kcal/day (≈ 0.5 kg/week loss). Weight gain = TDEE + 300-500 kcal/day. CalcMaster computes all three.",
    },
    {
      q: "Why a 500-calorie deficit?",
      a: "3500 kcal ≈ 0.45 kg of fat. A 500/day deficit creates one such deficit per week. More aggressive (>750/day) deficits work short-term but increase muscle loss and rebound risk.",
    },
    {
      q: "What about protein, carbs, fats?",
      a: "Calories drive weight; macros drive composition. Use the Macro Splitter alongside this calculator. General split: 30% protein / 40% carbs / 30% fats works for most.",
    },
    {
      q: "Does calorie counting work?",
      a: "Yes — when accurate. The challenge is accuracy. Most people underestimate intake by 20-30% (sauces, drinks, restaurant portions) and overestimate exercise burn by 50%+.",
    },
    {
      q: "Are exercise calories accurate?",
      a: "Wearable estimates are roughly ±20%. CalcMaster's Calories Burned tool uses MET tables (medical research) which are conservative and more reliable.",
    },
  ],

  // ─── Pace ───────────────────────────────────────────────────────────────
  pace: [
    {
      q: "What's a good 5K pace?",
      a: "Recreational: 6:00-7:00 min/km. Intermediate: 5:00-6:00. Competitive amateur: 4:00-5:00. Elite: < 3:00. Don't compare to elites; compare to your past self.",
    },
    {
      q: "Pace vs speed?",
      a: "Pace is time per distance (min/km). Speed is distance per time (km/h). Runners use pace; cyclists use speed. CalcMaster shows both.",
    },
    {
      q: "How does running pace translate to time?",
      a: "Pace × distance. 5:00 min/km × 10 km = 50 min. Add ~30 seconds per km penalty for hills, heat, or evening fatigue.",
    },
    {
      q: "Can I predict my marathon time from a 5K?",
      a: "Use the Pace Predictor calculator — it uses the Riegel formula T2 = T1 × (D2/D1)^1.06. Most runners slow more than the formula predicts at marathon distance; subtract 10-15% from the predicted pace.",
    },
  ],

  // ─── Age ────────────────────────────────────────────────────────────────
  age: [
    {
      q: "How is age calculated?",
      a: "Years, months, days from your date of birth to today (or any other date). Handles leap years correctly, including Feb 29 birthdays which are celebrated on Feb 28 / Mar 1 in non-leap years per most government rules.",
    },
    {
      q: "Why does my age look different in some forms?",
      a: "Some forms ask for 'age in completed years' (truncated); others use 'age on date X' (specific moment); insurance uses 'age last birthday' or 'age next birthday'. CalcMaster gives the most precise: years + months + days.",
    },
    {
      q: "Can I calculate age for school admission?",
      a: "Yes — change today's date to the admission cut-off (usually 31 March or 30 June). The calculator shows whether the child meets the school's age criterion exactly.",
    },
    {
      q: "Is Feb 29 birthday handled?",
      a: "Yes. Leaplings show 'next birthday' correctly. The math uses native JS Date which handles all the edge cases (calendar transitions, leap centuries).",
    },
  ],

  // ─── Tip ────────────────────────────────────────────────────────────────
  tip: [
    {
      q: "Standard tip in India?",
      a: "10% at sit-down restaurants is standard. 5-10% at casual places. Service charge (if pre-added on the bill — typically 5-10%) is technically a tip; tip on top of it is optional.",
    },
    {
      q: "Standard tip in the US?",
      a: "18-20% for good service is the floor. 15% is the bare minimum. Tip is on pre-tax subtotal.",
    },
    {
      q: "How to split the bill?",
      a: "Use the Split Bill calculator — it divides total + tip across N people. Round up the per-person amount to avoid awkward change.",
    },
    {
      q: "Should I tip on delivery?",
      a: "In India: usually ₹20-50 if not auto-applied. In the US: 15-20% of the food cost.",
    },
  ],

  // ─── Percentage ─────────────────────────────────────────────────────────
  percentage: [
    {
      q: "What are the common percentage operations?",
      a: "(1) X% of Y — discounts, taxes. (2) X is what % of Y — share of total. (3) Change from A to B — growth, comparisons. (4) Add X% to Y — markup, GST. (5) Subtract X% from Y — discount. CalcMaster supports all five.",
    },
    {
      q: "Why isn't 80% off + 50% off = 130%?",
      a: "Multiplicative, not additive. After 80% off, the price is 20% of original. Then 50% off that = 10% of original. So 90% off total — not 130%.",
    },
    {
      q: "How to calculate percentage increase?",
      a: "((new − old) / old) × 100. From 80 to 96: ((96-80)/80)×100 = 20%. From 100 to 75: ((75-100)/100)×100 = −25%.",
    },
    {
      q: "Are percentage increase and decrease symmetric?",
      a: "No. 100 → 150 is +50%. Going 150 → 100 is −33%. To recover from a fall of X%, you need (X / (1−X/100))% rise. Down 50% needs +100% to break even.",
    },
  ],

  // ─── Basic ──────────────────────────────────────────────────────────────
  basic: [
    {
      q: "Does it support keyboard input?",
      a: "Yes. Number keys, + − × ÷ (or * /), Enter (=), Backspace, Escape (C). Designed for fast number-typing without grabbing the mouse.",
    },
    {
      q: "How is order of operations handled?",
      a: "Left to right, immediate evaluation (calculator-style). For BODMAS / PEMDAS-aware evaluation, use the Scientific Calculator instead.",
    },
    {
      q: "Can I see history of operations?",
      a: "Every calculation is auto-saved to the History page. The Basic calculator shows the previous operand and operator inline (e.g., '12 +') as you type the next number.",
    },
    {
      q: "Why doesn't 0 ÷ 0 give an answer?",
      a: "Mathematically undefined. CalcMaster shows 'NaN'. Division by zero (anything else / 0) gives Infinity.",
    },
  ],

  // ─── Length / Mass / Temperature / Volume / Speed (converters) ──────────
  length: [
    {
      q: "Which units does the Length converter support?",
      a: "Meter, kilometer, centimeter, millimeter, inch, foot, yard, mile, nautical mile. Switching the 'from' unit instantly recomputes all 'to' values — no submit needed.",
    },
    {
      q: "1 mile = how many km?",
      a: "1 mile = 1.609344 km. CalcMaster uses 6-decimal precision; for typical work 3 decimals (1.609) is enough.",
    },
    {
      q: "Is the nautical mile the same as a regular mile?",
      a: "No. 1 nautical mile = 1.852 km = 1.151 miles. Used in aviation and maritime navigation, based on 1 minute of arc along a meridian.",
    },
    {
      q: "How to convert ft + inches to cm?",
      a: "Convert separately: ft × 30.48 + in × 2.54 = cm. For 5'9\": 5 × 30.48 + 9 × 2.54 = 175.26 cm. CalcMaster doesn't have a ft+in input yet — feature request welcome.",
    },
    {
      q: "Is mil same as millimeter?",
      a: "No. 'Mil' (US engineering) = 0.001 inch = 0.0254 mm. 'Millimeter' = 1 mm. Don't confuse them.",
    },
  ],

  mass: [
    {
      q: "1 kg = how many lb?",
      a: "1 kg = 2.20462 lb. Quick mental conversion: kg × 2.2 (slightly under-estimates by ~0.2%).",
    },
    {
      q: "Difference between mass and weight?",
      a: "Mass is amount of matter (kg). Weight is force (N) = mass × gravity. On Earth, 1 kg weighs 9.81 N. On the Moon: 1.62 N. Use this calculator for mass; use the Weight calculator for force.",
    },
    {
      q: "Stone is still used where?",
      a: "UK and Ireland for body weight. 1 stone = 14 lb = 6.35 kg. Most modern UK scales also show kg.",
    },
    {
      q: "Ton variants?",
      a: "Metric ton (tonne) = 1000 kg. US short ton = 907.185 kg. UK long ton = 1016.05 kg. CalcMaster uses metric ton by default.",
    },
    {
      q: "Are precious metals measured in kg?",
      a: "Gold/silver use troy ounce (31.1035 g) — different from regular ounce (28.3495 g). Common confusion in jewellery and trading.",
    },
  ],

  temperature: [
    {
      q: "How to convert Celsius to Fahrenheit?",
      a: "°F = °C × 9/5 + 32. 25°C = 77°F. Mental shortcut: double the C, subtract 10%, add 32.",
    },
    {
      q: "Why does temperature need an offset, not just a factor?",
      a: "Because the zero points differ. 0°C ≠ 0°F. The two scales are linear but offset (Fahrenheit's 0 is the freezing point of brine). Only Kelvin (absolute zero) shares zero with the molecular-motion baseline.",
    },
    {
      q: "What is absolute zero?",
      a: "−273.15°C = −459.67°F = 0 K. Theoretical lower bound of temperature where molecular motion stops. Unreachable in practice.",
    },
    {
      q: "Body temperature in F vs C?",
      a: "98.6°F = 37°C (normal). Fever: ≥ 100°F (37.8°C). Most home thermometers in India use °C; most US thermometers use °F.",
    },
    {
      q: "Is Rankine still used?",
      a: "Rarely. Rankine = Fahrenheit on an absolute scale (0 R = absolute zero). Mostly seen in US thermodynamics textbooks. CalcMaster doesn't include Rankine — request if needed.",
    },
  ],

  volume: [
    {
      q: "1 cup = how many ml?",
      a: "1 US cup = 236.59 ml. 1 metric cup = 250 ml (Australia, NZ). 1 imperial cup = 284.13 ml (rarely used).",
    },
    {
      q: "Difference between US gallon and UK gallon?",
      a: "US gallon = 3.785 L. UK (imperial) gallon = 4.546 L. 17% bigger. Important for car fuel economy comparisons (a UK MPG is ~20% higher than the same car's US MPG).",
    },
    {
      q: "tbsp vs tsp?",
      a: "1 tbsp = 3 tsp = 14.79 ml (US). 1 tsp = 4.93 ml. Australian tbsp is 20 ml (different from US/UK).",
    },
    {
      q: "How many cubic centimeters in a litre?",
      a: "Exactly 1000 cc = 1 L. 1 cc = 1 ml. So 1 ml = 1 cm³.",
    },
  ],

  speed: [
    {
      q: "1 mph = how many km/h?",
      a: "1 mph = 1.609 km/h. To convert km/h → mph, divide by 1.609 (or multiply by 0.621).",
    },
    {
      q: "How fast is 1 knot?",
      a: "1 knot = 1 nautical mile / hour = 1.852 km/h = 1.151 mph. Used in aviation and shipping.",
    },
    {
      q: "What's the speed of sound?",
      a: "~343 m/s = 1235 km/h = 768 mph at 20°C in dry air. Faster in warmer / denser air.",
    },
    {
      q: "Is Mach a speed or a ratio?",
      a: "Ratio. Mach 1 = local speed of sound. So Mach 2 at 35,000 ft (~295 m/s sound speed) = 590 m/s = 2124 km/h. Different from Mach 2 at sea level.",
    },
  ],

  // ─── ROI / CAGR ─────────────────────────────────────────────────────────
  roi: [
    {
      q: "ROI vs CAGR?",
      a: "ROI is total return %. CAGR is annualized. ₹100k → ₹200k is 100% ROI; if it took 10 years, CAGR is 7.2%. ROI is meaningful only if you include the time horizon.",
    },
    {
      q: "Is high ROI always good?",
      a: "Not if risk-adjusted. A 50% ROI on a coin flip is worse than 12% guaranteed. Always compare ROI relative to risk and the investment's volatility.",
    },
    {
      q: "Can ROI be negative?",
      a: "Yes. ((Final − Initial) / Initial) × 100. Final < Initial → negative ROI. Common in stocks, real estate during corrections, and business projects that fail.",
    },
  ],

  cagr: [
    {
      q: "What is CAGR?",
      a: "Compound Annual Growth Rate. The geometric mean rate that takes an initial value to a final value over N years: CAGR = (final/initial)^(1/N) − 1, expressed as %.",
    },
    {
      q: "CAGR vs annualized return?",
      a: "Same thing in most contexts. CAGR assumes one starting and one ending value; ignores volatility along the way. Two portfolios with identical CAGR can have very different ride quality.",
    },
    {
      q: "Is CAGR higher or lower than average return?",
      a: "Always equal or lower than the arithmetic average of yearly returns, because of volatility drag. The bigger the swings, the bigger the gap.",
    },
    {
      q: "How is CAGR used in mutual fund rankings?",
      a: "Most fund factsheets show 3-, 5-, and 10-year CAGR. Always compare same-period CAGRs across funds; mixing periods is misleading.",
    },
  ],
};
