import { describe, expect, it } from "vitest";
import {
  calculateCryptoProfit,
  calculateDCA,
  calculateStakingYield,
  peRatio,
  positionSize,
  stockAverage,
} from "./crypto";

describe("crypto profit", () => {
  it("entry 100, exit 150, qty 10, 1% fee", () => {
    const r = calculateCryptoProfit({ entryPrice: 100, exitPrice: 150, quantity: 10, feePct: 1 });
    expect(r.netProfit).toBeCloseTo(500 - 25); // 0.01 * (1000+1500) = 25
  });
});

describe("staking yield", () => {
  it("higher compound freq → higher total", () => {
    const annual = calculateStakingYield({
      principal: 1000,
      apyPct: 10,
      days: 365,
      compoundFrequencyPerYear: 1,
    });
    const daily = calculateStakingYield({
      principal: 1000,
      apyPct: 10,
      days: 365,
      compoundFrequencyPerYear: 365,
    });
    expect(daily.total).toBeGreaterThan(annual.total);
  });
});

describe("DCA", () => {
  it("averages down on falling prices", () => {
    const r = calculateDCA({ perBuy: 100, prices: [100, 50, 25] });
    expect(r.avg).toBeLessThan(100);
    expect(r.avg).toBeGreaterThan(25);
  });
});

describe("stock average", () => {
  it("100@500 + 50@400 = 466.67", () => {
    const r = stockAverage([
      { price: 500, qty: 100 },
      { price: 400, qty: 50 },
    ]);
    expect(r.avgPrice).toBeCloseTo(466.67, 1);
  });
});

describe("P/E ratio", () => {
  it("price 200 / eps 10 = 20", () => expect(peRatio(200, 10)).toBe(20));
});

describe("position size", () => {
  it("1% of 100k risk, entry 100, stop 95 → qty 200", () => {
    const r = positionSize({ accountSize: 100000, riskPct: 1, entry: 100, stop: 95 });
    expect(r.qty).toBe(200);
  });
});
