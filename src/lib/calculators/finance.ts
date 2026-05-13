export interface SIPInput {
  monthlyInvestment: number;
  annualReturnPct: number;
  years: number;
}

export interface SIPResult {
  invested: number;
  returns: number;
  total: number;
  schedule: Array<{ year: number; invested: number; total: number }>;
}

export function calculateSIP({ monthlyInvestment, annualReturnPct, years }: SIPInput): SIPResult {
  const months = Math.max(0, Math.round(years * 12));
  const r = annualReturnPct / 100 / 12;
  let total = 0;
  const schedule: SIPResult["schedule"] = [];

  for (let m = 1; m <= months; m++) {
    total = (total + monthlyInvestment) * (1 + r);
    if (m % 12 === 0) {
      schedule.push({
        year: m / 12,
        invested: monthlyInvestment * m,
        total: Math.round(total),
      });
    }
  }
  const invested = monthlyInvestment * months;
  return {
    invested,
    returns: Math.max(0, total - invested),
    total,
    schedule,
  };
}

export interface LumpsumInput {
  principal: number;
  annualReturnPct: number;
  years: number;
}

export function calculateLumpsum({ principal, annualReturnPct, years }: LumpsumInput) {
  const total = principal * Math.pow(1 + annualReturnPct / 100, years);
  return {
    invested: principal,
    total,
    returns: total - principal,
  };
}

export interface EMIInput {
  principal: number;
  annualRatePct: number;
  years: number;
}

export interface EMIResult {
  emi: number;
  totalInterest: number;
  totalPayment: number;
  schedule: Array<{
    month: number;
    emi: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}

export function calculateEMI({ principal, annualRatePct, years }: EMIInput): EMIResult {
  const n = Math.max(1, Math.round(years * 12));
  const r = annualRatePct / 100 / 12;
  const emi =
    r === 0 ? principal / n : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  let balance = principal;
  const schedule: EMIResult["schedule"] = [];
  for (let i = 1; i <= n; i++) {
    const interest = balance * r;
    const principalPart = emi - interest;
    balance = Math.max(0, balance - principalPart);
    schedule.push({
      month: i,
      emi,
      principal: principalPart,
      interest,
      balance,
    });
  }

  return {
    emi,
    totalInterest: emi * n - principal,
    totalPayment: emi * n,
    schedule,
  };
}

export interface CompoundInterestInput {
  principal: number;
  annualRatePct: number;
  years: number;
  compoundsPerYear: number;
}

export function calculateCompoundInterest({
  principal,
  annualRatePct,
  years,
  compoundsPerYear,
}: CompoundInterestInput) {
  const r = annualRatePct / 100;
  const n = compoundsPerYear;
  const t = years;
  const total = principal * Math.pow(1 + r / n, n * t);
  return {
    invested: principal,
    total,
    interest: total - principal,
  };
}

export function calculateSimpleInterest(principal: number, annualRatePct: number, years: number) {
  const interest = (principal * annualRatePct * years) / 100;
  return { invested: principal, interest, total: principal + interest };
}

export function calculateCAGR(initial: number, final: number, years: number) {
  if (initial <= 0 || years <= 0) return 0;
  return (Math.pow(final / initial, 1 / years) - 1) * 100;
}

// ── FD / RD ────────────────────────────────────────────────────────────
export interface FDInput {
  principal: number;
  ratePct: number;
  years: number;
  compoundsPerYear: number;
}
export function calculateFD({ principal, ratePct, years, compoundsPerYear }: FDInput) {
  const r = ratePct / 100;
  const total = principal * Math.pow(1 + r / compoundsPerYear, compoundsPerYear * years);
  return { invested: principal, total, interest: total - principal };
}
export interface RDInput {
  monthly: number;
  ratePct: number;
  months: number;
}
export function calculateRD({ monthly, ratePct, months }: RDInput) {
  const r = ratePct / 400; // quarterly compounding factor per RD spec
  let total = 0;
  for (let i = 1; i <= months; i++) total = (total + monthly) * Math.pow(1 + r, 1 / 3);
  const invested = monthly * months;
  return { invested, total, interest: total - invested };
}

// ── PPF ────────────────────────────────────────────────────────────────
export const PPF_MAX_INVESTMENT = 150000;
export const PPF_TENURE = 15;
export const PPF_DEFAULT_RATE = 7.1;
export interface PPFInput {
  yearly: number;
  ratePct: number;
}
export function calculatePPF({ yearly, ratePct }: PPFInput) {
  const investment = Math.min(yearly, PPF_MAX_INVESTMENT);
  const rate = ratePct / 100;
  let balance = 0;
  const schedule: Array<{ year: number; invested: number; total: number }> = [];
  for (let y = 1; y <= PPF_TENURE; y++) {
    balance = (balance + investment) * (1 + rate);
    schedule.push({ year: y, invested: investment * y, total: Math.round(balance) });
  }
  const invested = investment * PPF_TENURE;
  return { invested, total: balance, interest: balance - invested, schedule };
}

// ── GST ────────────────────────────────────────────────────────────────
export function gstAddExclusive(amount: number, gstPct: number) {
  const gst = (amount * gstPct) / 100;
  return { base: amount, gst, total: amount + gst };
}
export function gstRemoveInclusive(total: number, gstPct: number) {
  const base = total / (1 + gstPct / 100);
  return { base, gst: total - base, total };
}

// ── Discount ───────────────────────────────────────────────────────────
export function applyDiscount(price: number, percent: number) {
  const saved = (price * percent) / 100;
  return { original: price, saved, final: price - saved };
}
export function stackedDiscounts(price: number, percents: number[]) {
  let final = price;
  for (const p of percents) final = final * (1 - p / 100);
  return {
    original: price,
    final,
    saved: price - final,
    effectivePct: ((price - final) / price) * 100,
  };
}

// ── Profit & Loss ──────────────────────────────────────────────────────
export function profitLoss(cost: number, sell: number) {
  const diff = sell - cost;
  const pct = cost > 0 ? (diff / cost) * 100 : 0;
  return { cost, sell, profit: Math.max(diff, 0), loss: Math.max(-diff, 0), netPct: pct };
}

// ── ROI ────────────────────────────────────────────────────────────────
export function calculateROI(initial: number, final: number, years: number) {
  const total = ((final - initial) / initial) * 100;
  const annualized = years > 0 ? (Math.pow(final / initial, 1 / years) - 1) * 100 : total;
  return { totalReturn: total, annualized, profit: final - initial };
}

// ── Income Tax (Old vs New regime, FY 2024-25) ─────────────────────────
export function calculateOldRegimeTax(taxableIncome: number): number {
  if (taxableIncome <= 250000) return 0;
  const slabs: [number, number, number][] = [
    [250000, 500000, 0.05],
    [500000, 1000000, 0.2],
    [1000000, Infinity, 0.3],
  ];
  let tax = 0;
  for (const [lo, hi, rate] of slabs) {
    if (taxableIncome <= lo) break;
    tax += (Math.min(taxableIncome, hi) - lo) * rate;
  }
  return tax * 1.04;
}
export function calculateNewRegimeTax(taxableIncome: number): number {
  if (taxableIncome <= 300000) return 0;
  const slabs: [number, number, number][] = [
    [300000, 700000, 0.05],
    [700000, 1000000, 0.1],
    [1000000, 1200000, 0.15],
    [1200000, 1500000, 0.2],
    [1500000, Infinity, 0.3],
  ];
  let tax = 0;
  for (const [lo, hi, rate] of slabs) {
    if (taxableIncome <= lo) break;
    tax += (Math.min(taxableIncome, hi) - lo) * rate;
  }
  return tax * 1.04;
}
export interface IncomeTaxInput {
  gross: number;
  deduction80C?: number;
  deduction80D?: number;
  hraExemption?: number;
  other?: number;
}
export function calculateIncomeTax(i: IncomeTaxInput) {
  const ded80C = i.deduction80C ?? 0;
  const ded80D = i.deduction80D ?? 0;
  const hra = i.hraExemption ?? 0;
  const other = i.other ?? 0;
  const oldTaxable = Math.max(i.gross - 50000 - ded80C - ded80D - hra - other, 0);
  const oldTax = calculateOldRegimeTax(oldTaxable);
  const newTaxable = Math.max(i.gross - 75000, 0);
  const newTax = calculateNewRegimeTax(newTaxable);
  return {
    oldTax,
    newTax,
    oldTaxable,
    newTaxable,
    better: oldTax <= newTax ? ("old" as const) : ("new" as const),
    savings: Math.abs(oldTax - newTax),
  };
}

// ── Salary CTC → in-hand ───────────────────────────────────────────────
export function salaryBreakdown(ctcAnnual: number) {
  const basic = ctcAnnual * 0.4;
  const hra = basic * 0.4;
  const epfEmployee = basic * 0.12;
  const epfEmployer = basic * 0.12;
  const gross = ctcAnnual - epfEmployer;
  const taxable = Math.max(0, gross - 75000);
  const tax = calculateNewRegimeTax(taxable);
  const inHandAnnual = gross - epfEmployee - tax;
  return {
    basic,
    hra,
    epfEmployee,
    epfEmployer,
    gross,
    tax,
    inHandAnnual,
    inHandMonthly: inHandAnnual / 12,
  };
}

// ── HRA exemption ──────────────────────────────────────────────────────
export interface HRAInput {
  basicMonthly: number;
  hraMonthly: number;
  rentMonthly: number;
  isMetro: boolean;
}
export function calculateHRA({ basicMonthly, hraMonthly, rentMonthly, isMetro }: HRAInput) {
  const basic = basicMonthly * 12;
  const hra = hraMonthly * 12;
  const rent = rentMonthly * 12;
  const actual = hra;
  const pctBasic = isMetro ? basic * 0.5 : basic * 0.4;
  const rentMinusBasic = Math.max(rent - basic * 0.1, 0);
  const exempt = Math.min(actual, pctBasic, rentMinusBasic);
  const taxable = hra - exempt;
  return { actual, pctBasic, rentMinusBasic, exempt, taxable };
}

// ── Gratuity ───────────────────────────────────────────────────────────
export function calculateGratuity(lastSalaryMonthly: number, yearsOfService: number) {
  return { gratuity: (lastSalaryMonthly * 15 * yearsOfService) / 26 };
}

// ── NPS ────────────────────────────────────────────────────────────────
export const NPS_RETIREMENT_AGE = 60;
export interface NPSInput {
  monthly: number;
  currentAge: number;
  expectedReturnPct: number;
}
export function calculateNPS({ monthly, currentAge, expectedReturnPct }: NPSInput) {
  const years = Math.max(NPS_RETIREMENT_AGE - currentAge, 0);
  const n = years * 12;
  const r = expectedReturnPct / 12 / 100;
  const invested = monthly * n;
  if (r === 0) return { invested, total: invested, interest: 0, schedule: [] };
  const compound = Math.pow(1 + r, n);
  const total = monthly * ((compound - 1) / r) * (1 + r);
  const schedule: Array<{ year: number; invested: number; total: number }> = [];
  for (let y = 1; y <= years; y++) {
    const m = y * 12;
    const c = Math.pow(1 + r, m);
    schedule.push({
      year: y,
      invested: monthly * m,
      total: Math.round(monthly * ((c - 1) / r) * (1 + r)),
    });
  }
  return { invested, total, interest: total - invested, schedule };
}

// ── EPF ────────────────────────────────────────────────────────────────
export const EPF_INTEREST_RATE = 8.15;
export interface EPFInput {
  basicDA: number;
  currentAge: number;
  retirementAge: number;
  currentBalance?: number;
}
export function calculateEPF({ basicDA, currentAge, retirementAge, currentBalance = 0 }: EPFInput) {
  const months = Math.max(retirementAge - currentAge, 0) * 12;
  const employeeMonthly = basicDA * 0.12;
  const employerMonthly = basicDA * 0.0367;
  const monthlyRate = EPF_INTEREST_RATE / 12 / 100;
  let balance = currentBalance;
  let empSum = 0;
  let erSum = 0;
  for (let m = 1; m <= months; m++) {
    balance += employeeMonthly + employerMonthly;
    empSum += employeeMonthly;
    erSum += employerMonthly;
    balance *= 1 + monthlyRate;
  }
  const totalContribution = empSum + erSum + currentBalance;
  return {
    employee: empSum,
    employer: erSum,
    totalContribution,
    interest: balance - totalContribution,
    maturity: balance,
  };
}

// ── Retirement ─────────────────────────────────────────────────────────
export interface RetirementInput {
  currentAge: number;
  retirementAge: number;
  lifeExpectancy: number;
  monthlyExpense: number;
  inflationPct: number;
  preReturnPct: number;
  postReturnPct: number;
}
export function calculateRetirement(i: RetirementInput) {
  const yrsTo = Math.max(i.retirementAge - i.currentAge, 0);
  const yrsAfter = Math.max(i.lifeExpectancy - i.retirementAge, 0);
  const inflFactor = Math.pow(1 + i.inflationPct / 100, yrsTo);
  const expenseAtRetirement = i.monthlyExpense * inflFactor;
  const realMonthly = (1 + i.postReturnPct / 100) / (1 + i.inflationPct / 100) - 1;
  const r = realMonthly / 12;
  const n = yrsAfter * 12;
  const corpus =
    r === 0 ? expenseAtRetirement * n : expenseAtRetirement * ((1 - Math.pow(1 + r, -n)) / r);
  const preR = i.preReturnPct / 12 / 100;
  const preN = yrsTo * 12;
  const monthlySip =
    preN === 0
      ? 0
      : preR === 0
        ? corpus / preN
        : corpus / (((Math.pow(1 + preR, preN) - 1) / preR) * (1 + preR));
  return { corpus, monthlySip, expenseAtRetirement, yrsTo, yrsAfter };
}

// ── Home Loan vs Rent ──────────────────────────────────────────────────
export interface HomeVsRentInput {
  housePrice: number;
  downPaymentPct: number;
  loanRatePct: number;
  tenureYears: number;
  monthlyRent: number;
  rentGrowthPct: number;
  investReturnPct: number;
}
export function homeVsRent(i: HomeVsRentInput) {
  const dp = (i.housePrice * i.downPaymentPct) / 100;
  const principal = i.housePrice - dp;
  const emi = calculateEMI({
    principal,
    annualRatePct: i.loanRatePct,
    years: i.tenureYears,
  }).emi;
  let rentCost = 0;
  let currentRent = i.monthlyRent;
  let renterCorpus = dp;
  const r = i.investReturnPct / 12 / 100;
  for (let y = 1; y <= i.tenureYears; y++) {
    for (let m = 0; m < 12; m++) {
      rentCost += currentRent;
      const diff = Math.max(emi - currentRent, 0);
      renterCorpus = (renterCorpus + diff) * (1 + r);
    }
    currentRent *= 1 + i.rentGrowthPct / 100;
  }
  const buyerCost = dp + emi * 12 * i.tenureYears;
  return { emi, totalRent: rentCost, totalBuy: buyerCost, renterFinalCorpus: renterCorpus };
}

// ── Net Worth ──────────────────────────────────────────────────────────
export function netWorth(assets: number[], liabilities: number[]) {
  const totalAssets = assets.reduce((a, b) => a + b, 0);
  const totalLiabilities = liabilities.reduce((a, b) => a + b, 0);
  return { totalAssets, totalLiabilities, netWorth: totalAssets - totalLiabilities };
}

// ── Break Even ─────────────────────────────────────────────────────────
export function breakEven(fixedCost: number, pricePerUnit: number, variablePerUnit: number) {
  const contribution = pricePerUnit - variablePerUnit;
  if (contribution <= 0) return { units: Infinity, revenue: Infinity, contribution };
  const units = fixedCost / contribution;
  return { units, revenue: units * pricePerUnit, contribution };
}

// ── Currency converter ─────────────────────────────────────────────────
export function convertCurrency(amount: number, fromRate: number, toRate: number) {
  return (amount / fromRate) * toRate;
}
