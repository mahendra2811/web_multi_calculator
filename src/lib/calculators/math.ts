export function percentageOf(percent: number, value: number) {
  return (percent / 100) * value;
}
export function percentageWhatPercent(part: number, whole: number) {
  if (whole === 0) return 0;
  return (part / whole) * 100;
}
export function percentageChange(from: number, to: number) {
  if (from === 0) return 0;
  return ((to - from) / from) * 100;
}
export function addPercent(value: number, pct: number) {
  return value * (1 + pct / 100);
}
export function subtractPercent(value: number, pct: number) {
  return value * (1 - pct / 100);
}

export interface Fraction {
  num: number;
  den: number;
}

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a || 1;
}

function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

function reduceFraction({ num, den }: Fraction): Fraction {
  if (den === 0) return { num: 0, den: 1 };
  const sign = den < 0 ? -1 : 1;
  const a = Math.abs(num) * sign;
  const b = Math.abs(den);
  const g = gcd(a, b);
  return { num: (num < 0 ? -1 : 1) * (Math.abs(num) / g), den: b / g };
}

export function fractionAdd(a: Fraction, b: Fraction): Fraction {
  return reduceFraction({ num: a.num * b.den + b.num * a.den, den: a.den * b.den });
}
export function fractionSubtract(a: Fraction, b: Fraction): Fraction {
  return reduceFraction({ num: a.num * b.den - b.num * a.den, den: a.den * b.den });
}
export function fractionMultiply(a: Fraction, b: Fraction): Fraction {
  return reduceFraction({ num: a.num * b.num, den: a.den * b.den });
}
export function fractionDivide(a: Fraction, b: Fraction): Fraction {
  if (b.num === 0) return { num: 0, den: 1 };
  return reduceFraction({ num: a.num * b.den, den: a.den * b.num });
}

export function isPrime(n: number): boolean {
  if (!Number.isInteger(n) || n < 2) return false;
  if (n < 4) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

export function primeFactors(n: number): number[] {
  if (!Number.isInteger(n) || n < 2) return [];
  const factors: number[] = [];
  let x = n;
  for (let p = 2; p * p <= x; p++) {
    while (x % p === 0) {
      factors.push(p);
      x /= p;
    }
  }
  if (x > 1) factors.push(x);
  return factors;
}

export function gcdMany(nums: number[]): number {
  if (nums.length === 0) return 0;
  return nums.reduce((a, b) => gcd(a, b));
}

export function lcmMany(nums: number[]): number {
  if (nums.length === 0) return 0;
  return nums.reduce((a, b) => lcm(a, b));
}

export interface StatsResult {
  count: number;
  sum: number;
  mean: number;
  median: number;
  mode: number[];
  range: number;
  min: number;
  max: number;
  variance: number;
  stddev: number;
}

export function statistics(values: number[]): StatsResult {
  const nums = values.filter((v) => Number.isFinite(v));
  if (nums.length === 0) {
    return {
      count: 0,
      sum: 0,
      mean: 0,
      median: 0,
      mode: [],
      range: 0,
      min: 0,
      max: 0,
      variance: 0,
      stddev: 0,
    };
  }
  const sorted = [...nums].sort((a, b) => a - b);
  const sum = nums.reduce((a, b) => a + b, 0);
  const mean = sum / nums.length;
  const mid = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];

  const freq = new Map<number, number>();
  let maxFreq = 0;
  for (const n of nums) {
    const f = (freq.get(n) ?? 0) + 1;
    freq.set(n, f);
    if (f > maxFreq) maxFreq = f;
  }
  const mode =
    maxFreq <= 1
      ? []
      : [...freq.entries()]
          .filter(([, f]) => f === maxFreq)
          .map(([v]) => v)
          .sort((a, b) => a - b);

  const variance = nums.reduce((acc, n) => acc + Math.pow(n - mean, 2), 0) / nums.length;
  const stddev = Math.sqrt(variance);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  return {
    count: nums.length,
    sum,
    mean,
    median,
    mode,
    range: max - min,
    min,
    max,
    variance,
    stddev,
  };
}

export function quadraticRoots(a: number, b: number, c: number) {
  if (a === 0) {
    if (b === 0) return { kind: "invalid" as const, roots: [] };
    return { kind: "linear" as const, roots: [-c / b] };
  }
  const d = b * b - 4 * a * c;
  if (d > 0) {
    const r1 = (-b + Math.sqrt(d)) / (2 * a);
    const r2 = (-b - Math.sqrt(d)) / (2 * a);
    return { kind: "real-distinct" as const, roots: [r1, r2], discriminant: d };
  }
  if (d === 0) {
    return { kind: "real-equal" as const, roots: [-b / (2 * a)], discriminant: 0 };
  }
  const realPart = -b / (2 * a);
  const imag = Math.sqrt(-d) / (2 * a);
  return {
    kind: "complex" as const,
    roots: [
      { re: realPart, im: imag },
      { re: realPart, im: -imag },
    ],
    discriminant: d,
  };
}

export function logBase(value: number, base: number): number {
  if (value <= 0 || base <= 0 || base === 1) return NaN;
  return Math.log(value) / Math.log(base);
}

export function factorial(n: number): number {
  if (!Number.isInteger(n) || n < 0) return NaN;
  if (n > 170) return Infinity;
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

export function permutations(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  let result = 1;
  for (let i = 0; i < r; i++) result *= n - i;
  return result;
}

export function combinations(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  r = Math.min(r, n - r);
  let result = 1;
  for (let i = 0; i < r; i++) {
    result = (result * (n - i)) / (i + 1);
  }
  return Math.round(result);
}

export type NumberBase = "bin" | "oct" | "dec" | "hex";
export function convertBase(value: string, from: NumberBase, to: NumberBase): string {
  const baseMap: Record<NumberBase, number> = { bin: 2, oct: 8, dec: 10, hex: 16 };
  const n = parseInt(value, baseMap[from]);
  if (!Number.isFinite(n)) return "";
  return n.toString(baseMap[to]).toUpperCase();
}

export type Matrix = number[][];

export function matrixAdd(a: Matrix, b: Matrix): Matrix {
  return a.map((row, i) => row.map((v, j) => v + b[i][j]));
}
export function matrixSubtract(a: Matrix, b: Matrix): Matrix {
  return a.map((row, i) => row.map((v, j) => v - b[i][j]));
}
export function matrixMultiply(a: Matrix, b: Matrix): Matrix {
  const result: Matrix = [];
  for (let i = 0; i < a.length; i++) {
    result.push([]);
    for (let j = 0; j < b[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < b.length; k++) sum += a[i][k] * b[k][j];
      result[i].push(sum);
    }
  }
  return result;
}
export function matrixTranspose(a: Matrix): Matrix {
  return a[0].map((_, j) => a.map((row) => row[j]));
}
export function matrixDeterminant(a: Matrix): number {
  const n = a.length;
  if (n === 1) return a[0][0];
  if (n === 2) return a[0][0] * a[1][1] - a[0][1] * a[1][0];
  let det = 0;
  for (let j = 0; j < n; j++) {
    const minor = a.slice(1).map((row) => row.filter((_, k) => k !== j));
    det += a[0][j] * Math.pow(-1, j) * matrixDeterminant(minor);
  }
  return det;
}
