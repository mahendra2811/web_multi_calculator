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
