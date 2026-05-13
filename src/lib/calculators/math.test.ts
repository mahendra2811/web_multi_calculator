import { describe, expect, it } from "vitest";
import {
  combinations,
  convertBase,
  factorial,
  fractionAdd,
  fractionDivide,
  fractionMultiply,
  fractionSubtract,
  gcdMany,
  isPrime,
  lcmMany,
  logBase,
  matrixDeterminant,
  matrixMultiply,
  matrixTranspose,
  percentageChange,
  percentageOf,
  percentageWhatPercent,
  permutations,
  primeFactors,
  quadraticRoots,
  statistics,
} from "./math";

describe("percentage", () => {
  it("computes 20% of 250", () => expect(percentageOf(20, 250)).toBe(50));
  it("part-of-whole 50/200", () => expect(percentageWhatPercent(50, 200)).toBe(25));
  it("change 80→96 is +20%", () => expect(percentageChange(80, 96)).toBeCloseTo(20));
  it("change 100→75 is -25%", () => expect(percentageChange(100, 75)).toBe(-25));
});

describe("fractions", () => {
  it("1/2 + 1/3 = 5/6", () =>
    expect(fractionAdd({ num: 1, den: 2 }, { num: 1, den: 3 })).toEqual({ num: 5, den: 6 }));
  it("3/4 − 1/2 = 1/4", () =>
    expect(fractionSubtract({ num: 3, den: 4 }, { num: 1, den: 2 })).toEqual({ num: 1, den: 4 }));
  it("2/3 × 3/4 = 1/2", () =>
    expect(fractionMultiply({ num: 2, den: 3 }, { num: 3, den: 4 })).toEqual({ num: 1, den: 2 }));
  it("1/2 ÷ 1/4 = 2", () =>
    expect(fractionDivide({ num: 1, den: 2 }, { num: 1, den: 4 })).toEqual({ num: 2, den: 1 }));
});

describe("prime", () => {
  it("2,3,5,7,11 are prime", () => [2, 3, 5, 7, 11].forEach((n) => expect(isPrime(n)).toBe(true)));
  it("4,6,8,9 are not prime", () => [4, 6, 8, 9].forEach((n) => expect(isPrime(n)).toBe(false)));
  it("factors of 60 are 2,2,3,5", () => expect(primeFactors(60)).toEqual([2, 2, 3, 5]));
});

describe("gcd/lcm", () => {
  it("gcd(12,18,24) = 6", () => expect(gcdMany([12, 18, 24])).toBe(6));
  it("lcm(4,5,6) = 60", () => expect(lcmMany([4, 5, 6])).toBe(60));
});

describe("statistics", () => {
  it("computes mean/median for simple list", () => {
    const r = statistics([2, 4, 4, 4, 5, 5, 7, 9]);
    expect(r.mean).toBeCloseTo(5);
    expect(r.median).toBe(4.5);
    expect(r.mode).toEqual([4]);
    expect(r.stddev).toBeCloseTo(2, 0);
  });
  it("handles empty", () => {
    expect(statistics([]).count).toBe(0);
  });
});

describe("quadratic", () => {
  it("real distinct: x² − 5x + 6 = 0 → 2, 3", () => {
    const r = quadraticRoots(1, -5, 6);
    expect(r.kind).toBe("real-distinct");
    expect(r.roots).toContain(2);
    expect(r.roots).toContain(3);
  });
  it("equal: x² − 2x + 1 → 1", () => {
    const r = quadraticRoots(1, -2, 1);
    expect(r.kind).toBe("real-equal");
    expect(r.roots[0]).toBe(1);
  });
  it("complex: x² + 1 = 0 → ±i", () => {
    const r = quadraticRoots(1, 0, 1);
    expect(r.kind).toBe("complex");
  });
});

describe("log / factorial / perm-comb", () => {
  it("log_2(8) = 3", () => expect(logBase(8, 2)).toBeCloseTo(3));
  it("5! = 120", () => expect(factorial(5)).toBe(120));
  it("P(5,2) = 20", () => expect(permutations(5, 2)).toBe(20));
  it("C(5,2) = 10", () => expect(combinations(5, 2)).toBe(10));
});

describe("number base", () => {
  it("dec 255 → hex FF", () => expect(convertBase("255", "dec", "hex")).toBe("FF"));
  it("bin 1010 → dec 10", () => expect(convertBase("1010", "bin", "dec")).toBe("10"));
});

describe("matrix", () => {
  it("det 2×2", () =>
    expect(
      matrixDeterminant([
        [3, 2],
        [4, 1],
      ]),
    ).toBe(-5));
  it("multiply 2×2", () => {
    expect(
      matrixMultiply(
        [
          [1, 2],
          [3, 4],
        ],
        [
          [5, 6],
          [7, 8],
        ],
      ),
    ).toEqual([
      [19, 22],
      [43, 50],
    ]);
  });
  it("transpose", () => {
    expect(
      matrixTranspose([
        [1, 2, 3],
        [4, 5, 6],
      ]),
    ).toEqual([
      [1, 4],
      [2, 5],
      [3, 6],
    ]);
  });
});
