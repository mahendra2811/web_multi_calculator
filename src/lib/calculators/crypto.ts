export interface CryptoProfitInput {
  entryPrice: number;
  exitPrice: number;
  quantity: number;
  feePct: number;
}
export function calculateCryptoProfit({
  entryPrice,
  exitPrice,
  quantity,
  feePct,
}: CryptoProfitInput) {
  const invested = entryPrice * quantity;
  const exitValue = exitPrice * quantity;
  const fees = (invested + exitValue) * (feePct / 100);
  const netProfit = exitValue - invested - fees;
  const netReturnPct = invested > 0 ? (netProfit / invested) * 100 : 0;
  return { invested, exitValue, fees, netProfit, netReturnPct };
}

export interface StakingYieldInput {
  principal: number;
  apyPct: number;
  days: number;
  compoundFrequencyPerYear: number;
}
export function calculateStakingYield({
  principal,
  apyPct,
  days,
  compoundFrequencyPerYear,
}: StakingYieldInput) {
  const r = apyPct / 100;
  const n = compoundFrequencyPerYear;
  const t = days / 365;
  const total = principal * Math.pow(1 + r / n, n * t);
  return { principal, total, interest: total - principal };
}

export interface DCAInput {
  perBuy: number;
  prices: number[]; // chronological price series, one per buy
}
export function calculateDCA({ perBuy, prices }: DCAInput) {
  let units = 0;
  let invested = 0;
  const schedule: Array<{
    step: number;
    price: number;
    units: number;
    avg: number;
    value: number;
  }> = [];
  prices.forEach((p, i) => {
    if (p > 0) {
      units += perBuy / p;
      invested += perBuy;
      const avg = invested / units;
      schedule.push({ step: i + 1, price: p, units, avg, value: units * p });
    }
  });
  const lastPrice = prices[prices.length - 1] ?? 0;
  return {
    units,
    invested,
    avg: units > 0 ? invested / units : 0,
    currentValue: units * lastPrice,
    netProfit: units * lastPrice - invested,
    schedule,
  };
}

export function stockAverage(buys: Array<{ price: number; qty: number }>) {
  const totalQty = buys.reduce((s, b) => s + b.qty, 0);
  const totalCost = buys.reduce((s, b) => s + b.price * b.qty, 0);
  return {
    totalQty,
    totalCost,
    avgPrice: totalQty > 0 ? totalCost / totalQty : 0,
  };
}

export function peRatio(price: number, eps: number) {
  if (eps === 0) return Infinity;
  return price / eps;
}

export interface PositionSizeInput {
  accountSize: number;
  riskPct: number;
  entry: number;
  stop: number;
}
export function positionSize({ accountSize, riskPct, entry, stop }: PositionSizeInput) {
  const riskAmount = accountSize * (riskPct / 100);
  const perUnitRisk = Math.abs(entry - stop);
  if (perUnitRisk === 0) return { qty: 0, riskAmount, positionValue: 0 };
  const qty = riskAmount / perUnitRisk;
  return { qty, riskAmount, positionValue: qty * entry };
}
