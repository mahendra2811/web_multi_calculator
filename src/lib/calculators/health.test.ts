import { describe, expect, it } from "vitest";
import { calculateBMI, calculateBMR } from "./health";

describe("calculateBMI", () => {
  it("classifies normal weight", () => {
    const r = calculateBMI(70, 175);
    expect(r.bmi).toBeCloseTo(22.86, 1);
    expect(r.category).toBe("normal");
  });

  it("classifies obese", () => {
    const r = calculateBMI(110, 170);
    expect(r.category).toBe("obese");
  });

  it("returns 0 for invalid input", () => {
    expect(calculateBMI(0, 170).bmi).toBe(0);
    expect(calculateBMI(70, 0).bmi).toBe(0);
  });
});

describe("calculateBMR", () => {
  it("Mifflin-St Jeor male", () => {
    const r = calculateBMR({ weightKg: 80, heightCm: 180, ageYears: 30, sex: "male" });
    expect(Math.round(r)).toBe(1780);
  });

  it("Mifflin-St Jeor female", () => {
    const r = calculateBMR({ weightKg: 60, heightCm: 165, ageYears: 28, sex: "female" });
    expect(Math.round(r)).toBe(1330);
  });
});
