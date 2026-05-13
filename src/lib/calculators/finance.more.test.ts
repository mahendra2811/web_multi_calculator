import { describe, expect, it } from "vitest";
import {
  applyDiscount,
  breakEven,
  calculateFD,
  calculateGratuity,
  calculateHRA,
  calculateIncomeTax,
  calculateNPS,
  calculatePPF,
  calculateROI,
  gstAddExclusive,
  gstRemoveInclusive,
  netWorth,
  profitLoss,
  salaryBreakdown,
  stackedDiscounts,
} from "./finance";

describe("GST", () => {
  it("adds 18% GST to ₹100 → ₹118", () => {
    const r = gstAddExclusive(100, 18);
    expect(r.gst).toBe(18);
    expect(r.total).toBe(118);
  });
  it("removes 18% from ₹118 → ₹100", () => {
    const r = gstRemoveInclusive(118, 18);
    expect(r.base).toBeCloseTo(100);
  });
});

describe("Discount", () => {
  it("70% + 20% stacked = 76%", () => {
    const r = stackedDiscounts(100, [70, 20]);
    expect(r.effectivePct).toBeCloseTo(76);
  });
  it("single 40% off ₹500", () => {
    const r = applyDiscount(500, 40);
    expect(r.final).toBe(300);
  });
});

describe("PPF", () => {
  it("caps at ₹150,000 yearly", () => {
    const r = calculatePPF({ yearly: 200000, ratePct: 7.1 });
    expect(r.invested).toBe(150000 * 15);
    expect(r.total).toBeGreaterThan(r.invested);
  });
});

describe("FD", () => {
  it("₹100k @ 7% quarterly for 5 years > ₹140k", () => {
    const r = calculateFD({ principal: 100000, ratePct: 7, years: 5, compoundsPerYear: 4 });
    expect(r.total).toBeGreaterThan(140000);
    expect(r.total).toBeLessThan(145000);
  });
});

describe("Profit/Loss & ROI", () => {
  it("cost 80 sell 100 → 25% profit", () => {
    const r = profitLoss(80, 100);
    expect(r.profit).toBe(20);
    expect(r.netPct).toBe(25);
  });
  it("ROI 100k → 200k over 6y ~12.25%", () => {
    const r = calculateROI(100000, 200000, 6);
    expect(r.annualized).toBeGreaterThan(12);
    expect(r.annualized).toBeLessThan(13);
  });
});

describe("Income Tax", () => {
  it("Old + 80C ₹1.5L on ₹10L gross", () => {
    const r = calculateIncomeTax({ gross: 1000000, deduction80C: 150000 });
    expect(r.oldTax).toBeGreaterThan(0);
    expect(r.newTax).toBeGreaterThan(0);
  });
  it("Zero tax under ₹3L new regime", () => {
    const r = calculateIncomeTax({ gross: 350000 });
    expect(r.newTax).toBe(0);
  });
});

describe("HRA", () => {
  it("metro 50% rule", () => {
    const r = calculateHRA({
      basicMonthly: 50000,
      hraMonthly: 20000,
      rentMonthly: 18000,
      isMetro: true,
    });
    expect(r.exempt).toBeGreaterThan(0);
    expect(r.exempt).toBeLessThanOrEqual(r.actual);
  });
});

describe("Gratuity", () => {
  it("₹50k × 10y → (50000*15*10)/26", () => {
    const r = calculateGratuity(50000, 10);
    expect(r.gratuity).toBeCloseTo((50000 * 15 * 10) / 26);
  });
});

describe("NPS", () => {
  it("returns positive maturity", () => {
    const r = calculateNPS({ monthly: 5000, currentAge: 30, expectedReturnPct: 10 });
    expect(r.total).toBeGreaterThan(r.invested);
  });
});

describe("Salary breakdown", () => {
  it("returns positive in-hand for ₹15L CTC", () => {
    const r = salaryBreakdown(1500000);
    expect(r.inHandMonthly).toBeGreaterThan(0);
    expect(r.inHandAnnual).toBeLessThan(r.gross);
  });
});

describe("Break-even", () => {
  it("fixed 100k, ₹50 - ₹30 → 5000 units", () => {
    const r = breakEven(100000, 50, 30);
    expect(r.units).toBe(5000);
  });
});

describe("Net worth", () => {
  it("assets - liabilities", () => {
    const r = netWorth([100, 200, 300], [50, 50]);
    expect(r.netWorth).toBe(500);
  });
});
