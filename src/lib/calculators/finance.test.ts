import { describe, expect, it } from "vitest";
import {
  calculateCAGR,
  calculateCompoundInterest,
  calculateEMI,
  calculateLumpsum,
  calculateSIP,
  calculateSimpleInterest,
} from "./finance";

describe("calculateSIP", () => {
  it("returns 0 for 0 months", () => {
    const r = calculateSIP({ monthlyInvestment: 1000, annualReturnPct: 12, years: 0 });
    expect(r.total).toBe(0);
    expect(r.invested).toBe(0);
  });

  it("computes 10 years at 12% on 5000/mo within tolerance", () => {
    const r = calculateSIP({ monthlyInvestment: 5000, annualReturnPct: 12, years: 10 });
    expect(r.invested).toBe(600000);
    expect(Math.round(r.total)).toBeGreaterThan(1100000);
    expect(Math.round(r.total)).toBeLessThan(1200000);
  });

  it("schedule has one entry per year", () => {
    const r = calculateSIP({ monthlyInvestment: 5000, annualReturnPct: 12, years: 5 });
    expect(r.schedule).toHaveLength(5);
  });
});

describe("calculateLumpsum", () => {
  it("doubles in ~6 years at 12%", () => {
    const r = calculateLumpsum({ principal: 100000, annualReturnPct: 12, years: 6 });
    expect(r.total).toBeGreaterThan(190000);
    expect(r.total).toBeLessThan(210000);
  });
});

describe("calculateEMI", () => {
  it("matches standard formula for 10L @ 9% for 20y", () => {
    const r = calculateEMI({ principal: 1000000, annualRatePct: 9, years: 20 });
    expect(Math.round(r.emi)).toBeCloseTo(8997, -1);
  });

  it("zero-interest loan amortizes evenly", () => {
    const r = calculateEMI({ principal: 12000, annualRatePct: 0, years: 1 });
    expect(r.emi).toBe(1000);
    expect(r.totalInterest).toBe(0);
  });
});

describe("calculateCompoundInterest", () => {
  it("quarterly compounding outpaces annual", () => {
    const annual = calculateCompoundInterest({
      principal: 10000,
      annualRatePct: 10,
      years: 5,
      compoundsPerYear: 1,
    });
    const quarterly = calculateCompoundInterest({
      principal: 10000,
      annualRatePct: 10,
      years: 5,
      compoundsPerYear: 4,
    });
    expect(quarterly.total).toBeGreaterThan(annual.total);
  });
});

describe("calculateSimpleInterest", () => {
  it("matches PRT/100", () => {
    const r = calculateSimpleInterest(10000, 8, 3);
    expect(r.interest).toBe(2400);
    expect(r.total).toBe(12400);
  });
});

describe("calculateCAGR", () => {
  it("100k → 200k over 6y ~12.25%", () => {
    const r = calculateCAGR(100000, 200000, 6);
    expect(r).toBeGreaterThan(12);
    expect(r).toBeLessThan(13);
  });
});
