import type { CalculatorSchema } from "../schema-types";
import { statistics } from "../math";

const numF = (n: unknown) => (typeof n === "number" ? n : Number(n) || 0);

export const MATH_SCHEMAS: CalculatorSchema[] = [
  {
    slug: "standard-deviation",
    inputs: [
      {
        id: "values",
        label: "Numbers (comma)",
        kind: "textarea",
        default: "10, 12, 14, 15, 18, 22",
      },
    ],
    outputs: [
      {
        id: "stddev",
        label: "Std deviation σ",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
      { id: "variance", label: "Variance", format: "number", fractionDigits: 4 },
      { id: "mean", label: "Mean", format: "number", fractionDigits: 4 },
    ],
    compute: (i) => {
      const vals = String(i.values)
        .split(/[,\s]+/)
        .map(Number)
        .filter(Number.isFinite);
      const r = statistics(vals);
      return { stddev: r.stddev, variance: r.variance, mean: r.mean };
    },
  },
  {
    slug: "variance",
    inputs: [
      { id: "values", label: "Numbers", kind: "textarea", default: "10, 12, 14, 15, 18, 22" },
    ],
    outputs: [
      {
        id: "variance",
        label: "Variance σ²",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
    ],
    compute: (i) => {
      const vals = String(i.values)
        .split(/[,\s]+/)
        .map(Number)
        .filter(Number.isFinite);
      return { variance: statistics(vals).variance };
    },
  },
  {
    slug: "mean-median-mode",
    inputs: [
      { id: "values", label: "Numbers", kind: "textarea", default: "2, 4, 4, 4, 5, 5, 7, 9" },
    ],
    outputs: [
      { id: "mean", label: "Mean", format: "number", tone: "primary", fractionDigits: 3 },
      { id: "median", label: "Median", format: "number", fractionDigits: 3 },
      { id: "mode", label: "Mode", format: "text" },
      { id: "range", label: "Range", format: "number" },
    ],
    compute: (i) => {
      const vals = String(i.values)
        .split(/[,\s]+/)
        .map(Number)
        .filter(Number.isFinite);
      const r = statistics(vals);
      return { mean: r.mean, median: r.median, mode: r.mode.join(", ") || "—", range: r.range };
    },
  },
  {
    slug: "z-score",
    inputs: [
      { id: "x", label: "Value (x)", kind: "number", default: 75 },
      { id: "mean", label: "Mean (μ)", kind: "number", default: 70 },
      { id: "stddev", label: "Std dev (σ)", kind: "number", default: 5 },
    ],
    outputs: [
      {
        id: "z",
        label: "Z-score",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
    ],
    compute: (i) => ({ z: (numF(i.x) - numF(i.mean)) / Math.max(0.0001, numF(i.stddev)) }),
    formula: "z = (x − μ) / σ",
  },
  {
    slug: "confidence-interval",
    inputs: [
      { id: "mean", label: "Sample mean", kind: "number", default: 100 },
      { id: "stddev", label: "Std dev", kind: "number", default: 15 },
      { id: "n", label: "Sample size", kind: "number", default: 30 },
      {
        id: "confidence",
        label: "Confidence",
        kind: "select",
        default: 95,
        options: [
          { value: 90, label: "90%" },
          { value: 95, label: "95%" },
          { value: 99, label: "99%" },
        ],
      },
    ],
    outputs: [
      { id: "lower", label: "Lower bound", format: "number", fractionDigits: 2 },
      { id: "upper", label: "Upper bound", format: "number", fractionDigits: 2 },
      {
        id: "margin",
        label: "Margin of error",
        format: "number",
        tone: "primary",
        fractionDigits: 2,
        big: true,
      },
    ],
    compute: (i) => {
      const z = i.confidence === 99 ? 2.576 : i.confidence === 90 ? 1.645 : 1.96;
      const margin = (z * numF(i.stddev)) / Math.sqrt(Math.max(1, numF(i.n)));
      return { lower: numF(i.mean) - margin, upper: numF(i.mean) + margin, margin };
    },
  },
  {
    slug: "sample-size",
    inputs: [
      { id: "margin", label: "Margin of error %", kind: "percent", default: 5 },
      {
        id: "confidence",
        label: "Confidence",
        kind: "select",
        default: 95,
        options: [
          { value: 90, label: "90%" },
          { value: 95, label: "95%" },
          { value: 99, label: "99%" },
        ],
      },
      { id: "p", label: "Population proportion", kind: "number", default: 0.5, step: 0.01 },
    ],
    outputs: [
      { id: "n", label: "Sample size required", format: "integer", tone: "primary", big: true },
    ],
    compute: (i) => {
      const z = i.confidence === 99 ? 2.576 : i.confidence === 90 ? 1.645 : 1.96;
      const E = numF(i.margin) / 100;
      const p = numF(i.p);
      return { n: Math.ceil((z * z * p * (1 - p)) / (E * E)) };
    },
  },
  {
    slug: "probability",
    inputs: [
      { id: "favorable", label: "Favorable outcomes", kind: "number", default: 3 },
      { id: "total", label: "Total outcomes", kind: "number", default: 10 },
    ],
    outputs: [
      { id: "prob", label: "Probability", format: "percent", tone: "primary", big: true },
      { id: "odds", label: "Odds in favor", format: "text" },
    ],
    compute: (i) => {
      const p = numF(i.total) > 0 ? (numF(i.favorable) / numF(i.total)) * 100 : 0;
      return { prob: p, odds: `${numF(i.favorable)}:${numF(i.total) - numF(i.favorable)}` };
    },
  },
  {
    slug: "ap-gp-fib",
    inputs: [
      {
        id: "type",
        label: "Sequence",
        kind: "select",
        default: "ap",
        options: [
          { value: "ap", label: "Arithmetic" },
          { value: "gp", label: "Geometric" },
          { value: "fib", label: "Fibonacci" },
        ],
      },
      { id: "a", label: "First term", kind: "number", default: 1 },
      { id: "d", label: "Common difference / ratio", kind: "number", default: 2 },
      { id: "n", label: "Number of terms", kind: "number", default: 10 },
    ],
    outputs: [
      { id: "nthTerm", label: "Nth term", format: "number", tone: "primary", big: true },
      { id: "sum", label: "Sum of first n", format: "number" },
      { id: "sequence", label: "Sequence", format: "text" },
    ],
    compute: (i) => {
      const a = numF(i.a),
        d = numF(i.d),
        n = numF(i.n);
      let seq: number[] = [];
      if (i.type === "ap") {
        for (let k = 0; k < n; k++) seq.push(a + k * d);
      } else if (i.type === "gp") {
        for (let k = 0; k < n; k++) seq.push(a * Math.pow(d, k));
      } else {
        seq = [0, 1];
        while (seq.length < n) seq.push(seq[seq.length - 1] + seq[seq.length - 2]);
      }
      return {
        nthTerm: seq[seq.length - 1] ?? 0,
        sum: seq.reduce((s, v) => s + v, 0),
        sequence: seq.slice(0, 20).join(", "),
      };
    },
  },
  {
    slug: "percent-error",
    inputs: [
      { id: "expected", label: "Expected", kind: "number", default: 100 },
      { id: "actual", label: "Actual", kind: "number", default: 95 },
    ],
    outputs: [{ id: "pct", label: "Percent error", format: "percent", tone: "primary", big: true }],
    compute: (i) => ({
      pct:
        numF(i.actual) === 0
          ? 0
          : (Math.abs(numF(i.expected) - numF(i.actual)) / Math.abs(numF(i.actual))) * 100,
    }),
  },
  {
    slug: "percent-change",
    inputs: [
      { id: "old", label: "Original", kind: "number", default: 80 },
      { id: "new", label: "New", kind: "number", default: 100 },
    ],
    outputs: [
      { id: "change", label: "Percent change", format: "percent", tone: "primary", big: true },
    ],
    compute: (i) => ({
      change: numF(i.old) === 0 ? 0 : ((numF(i.new) - numF(i.old)) / Math.abs(numF(i.old))) * 100,
    }),
  },
  {
    slug: "exponent",
    inputs: [
      { id: "base", label: "Base", kind: "number", default: 2 },
      { id: "exp", label: "Exponent", kind: "number", default: 10 },
    ],
    outputs: [{ id: "result", label: "Result", format: "number", tone: "primary", big: true }],
    compute: (i) => ({ result: Math.pow(numF(i.base), numF(i.exp)) }),
  },
  {
    slug: "root",
    inputs: [
      { id: "x", label: "Number", kind: "number", default: 64 },
      { id: "n", label: "Root degree", kind: "number", default: 3 },
    ],
    outputs: [
      {
        id: "root",
        label: "n-th root",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 6,
      },
    ],
    compute: (i) => ({ root: Math.pow(numF(i.x), 1 / Math.max(0.0001, numF(i.n))) }),
  },
  {
    slug: "scientific-notation",
    inputs: [{ id: "value", label: "Number", kind: "number", default: 1234567 }],
    outputs: [
      { id: "notation", label: "Scientific notation", format: "text", tone: "primary", big: true },
    ],
    compute: (i) => ({ notation: numF(i.value).toExponential(4) }),
  },
  {
    slug: "rounding",
    inputs: [
      { id: "value", label: "Value", kind: "number", default: 3.14159 },
      { id: "decimals", label: "Decimal places", kind: "number", default: 2 },
    ],
    outputs: [
      {
        id: "rounded",
        label: "Rounded",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 6,
      },
      { id: "floor", label: "Floor", format: "number" },
      { id: "ceil", label: "Ceil", format: "number" },
    ],
    compute: (i) => {
      const f = Math.pow(10, numF(i.decimals));
      return {
        rounded: Math.round(numF(i.value) * f) / f,
        floor: Math.floor(numF(i.value) * f) / f,
        ceil: Math.ceil(numF(i.value) * f) / f,
      };
    },
  },
  {
    slug: "half-life",
    inputs: [
      { id: "initial", label: "Initial amount", kind: "number", default: 100 },
      { id: "halfLife", label: "Half-life", kind: "number", default: 30 },
      { id: "elapsed", label: "Time elapsed", kind: "number", default: 60 },
    ],
    outputs: [
      {
        id: "remaining",
        label: "Remaining",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
    ],
    compute: (i) => ({
      remaining:
        numF(i.initial) * Math.pow(0.5, numF(i.elapsed) / Math.max(0.0001, numF(i.halfLife))),
    }),
    formula: "A = A₀ × (1/2)^(t/T)",
  },
  {
    slug: "pythagorean",
    inputs: [
      { id: "a", label: "Side a", kind: "number", default: 3 },
      { id: "b", label: "Side b", kind: "number", default: 4 },
    ],
    outputs: [
      {
        id: "c",
        label: "Hypotenuse c",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
    ],
    compute: (i) => ({ c: Math.sqrt(numF(i.a) ** 2 + numF(i.b) ** 2) }),
    formula: "c = √(a² + b²)",
  },
  {
    slug: "right-triangle",
    inputs: [
      { id: "a", label: "Side a", kind: "number", default: 5 },
      { id: "b", label: "Side b", kind: "number", default: 12 },
    ],
    outputs: [
      {
        id: "c",
        label: "Hypotenuse",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
      { id: "angleA", label: "Angle A (deg)", format: "number", fractionDigits: 2 },
      { id: "angleB", label: "Angle B (deg)", format: "number", fractionDigits: 2 },
      { id: "area", label: "Area", format: "number", fractionDigits: 2 },
    ],
    compute: (i) => {
      const a = numF(i.a),
        b = numF(i.b);
      const c = Math.sqrt(a * a + b * b);
      return {
        c,
        angleA: (Math.atan(a / b) * 180) / Math.PI,
        angleB: (Math.atan(b / a) * 180) / Math.PI,
        area: (a * b) / 2,
      };
    },
  },
  {
    slug: "triangle-general",
    inputs: [
      { id: "a", label: "Side a", kind: "number", default: 5 },
      { id: "b", label: "Side b", kind: "number", default: 7 },
      { id: "c", label: "Side c", kind: "number", default: 8 },
    ],
    outputs: [
      { id: "perimeter", label: "Perimeter", format: "number", fractionDigits: 2 },
      {
        id: "area",
        label: "Area (Heron)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 2,
      },
    ],
    compute: (i) => {
      const a = numF(i.a),
        b = numF(i.b),
        c = numF(i.c);
      const s = (a + b + c) / 2;
      const area = Math.sqrt(Math.max(0, s * (s - a) * (s - b) * (s - c)));
      return { perimeter: a + b + c, area };
    },
  },
  {
    slug: "slope",
    inputs: [
      { id: "x1", label: "x1", kind: "number", default: 1 },
      { id: "y1", label: "y1", kind: "number", default: 2 },
      { id: "x2", label: "x2", kind: "number", default: 4 },
      { id: "y2", label: "y2", kind: "number", default: 10 },
    ],
    outputs: [
      {
        id: "slope",
        label: "Slope (m)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
      { id: "intercept", label: "y-intercept", format: "number", fractionDigits: 4 },
    ],
    compute: (i) => {
      const dx = numF(i.x2) - numF(i.x1);
      const m = dx === 0 ? Infinity : (numF(i.y2) - numF(i.y1)) / dx;
      return { slope: m, intercept: numF(i.y1) - m * numF(i.x1) };
    },
  },
  {
    slug: "distance-2d",
    inputs: [
      { id: "x1", label: "x1", kind: "number", default: 0 },
      { id: "y1", label: "y1", kind: "number", default: 0 },
      { id: "x2", label: "x2", kind: "number", default: 3 },
      { id: "y2", label: "y2", kind: "number", default: 4 },
    ],
    outputs: [
      {
        id: "d",
        label: "Distance",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
    ],
    compute: (i) => ({ d: Math.hypot(numF(i.x2) - numF(i.x1), numF(i.y2) - numF(i.y1)) }),
  },
  {
    slug: "circle",
    inputs: [{ id: "r", label: "Radius", kind: "number", default: 5 }],
    outputs: [
      {
        id: "area",
        label: "Area",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
      { id: "circumference", label: "Circumference", format: "number", fractionDigits: 4 },
      { id: "diameter", label: "Diameter", format: "number", fractionDigits: 4 },
    ],
    compute: (i) => {
      const r = numF(i.r);
      return { area: Math.PI * r * r, circumference: 2 * Math.PI * r, diameter: 2 * r };
    },
  },
  {
    slug: "shape-area",
    inputs: [
      {
        id: "shape",
        label: "Shape",
        kind: "select",
        default: "rectangle",
        options: [
          { value: "rectangle", label: "Rectangle" },
          { value: "triangle", label: "Triangle" },
          { value: "circle", label: "Circle" },
          { value: "trapezoid", label: "Trapezoid" },
        ],
      },
      { id: "a", label: "Dim A", kind: "number", default: 5 },
      { id: "b", label: "Dim B", kind: "number", default: 4 },
      { id: "c", label: "Dim C (trapezoid b2 / triangle h)", kind: "number", default: 3 },
    ],
    outputs: [
      {
        id: "area",
        label: "Area",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
    ],
    compute: (i) => {
      const a = numF(i.a),
        b = numF(i.b),
        c = numF(i.c);
      if (i.shape === "rectangle") return { area: a * b };
      if (i.shape === "triangle") return { area: (a * b) / 2 };
      if (i.shape === "circle") return { area: Math.PI * a * a };
      return { area: ((a + b) * c) / 2 };
    },
  },
  {
    slug: "shape-volume",
    inputs: [
      {
        id: "shape",
        label: "Shape",
        kind: "select",
        default: "cube",
        options: [
          { value: "cube", label: "Cube" },
          { value: "cuboid", label: "Cuboid" },
          { value: "sphere", label: "Sphere" },
          { value: "cylinder", label: "Cylinder" },
          { value: "cone", label: "Cone" },
        ],
      },
      { id: "a", label: "Dim A", kind: "number", default: 5 },
      { id: "b", label: "Dim B", kind: "number", default: 4 },
      { id: "c", label: "Dim C", kind: "number", default: 3 },
    ],
    outputs: [
      {
        id: "volume",
        label: "Volume",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
    ],
    compute: (i) => {
      const a = numF(i.a),
        b = numF(i.b),
        c = numF(i.c);
      if (i.shape === "cube") return { volume: a * a * a };
      if (i.shape === "cuboid") return { volume: a * b * c };
      if (i.shape === "sphere") return { volume: (4 / 3) * Math.PI * a * a * a };
      if (i.shape === "cylinder") return { volume: Math.PI * a * a * b };
      return { volume: (Math.PI * a * a * b) / 3 };
    },
  },
  {
    slug: "shape-surface",
    inputs: [
      {
        id: "shape",
        label: "Shape",
        kind: "select",
        default: "cube",
        options: [
          { value: "cube", label: "Cube" },
          { value: "cuboid", label: "Cuboid" },
          { value: "sphere", label: "Sphere" },
          { value: "cylinder", label: "Cylinder" },
        ],
      },
      { id: "a", label: "Dim A", kind: "number", default: 5 },
      { id: "b", label: "Dim B", kind: "number", default: 4 },
      { id: "c", label: "Dim C", kind: "number", default: 3 },
    ],
    outputs: [
      {
        id: "surface",
        label: "Surface area",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
    ],
    compute: (i) => {
      const a = numF(i.a),
        b = numF(i.b),
        c = numF(i.c);
      if (i.shape === "cube") return { surface: 6 * a * a };
      if (i.shape === "cuboid") return { surface: 2 * (a * b + b * c + a * c) };
      if (i.shape === "sphere") return { surface: 4 * Math.PI * a * a };
      return { surface: 2 * Math.PI * a * (a + b) };
    },
  },
  {
    slug: "ratio-simplifier",
    inputs: [{ id: "ratio", label: "Ratio (e.g. 12:18:24)", kind: "text", default: "12:18:24" }],
    outputs: [
      { id: "simplified", label: "Simplified", format: "text", tone: "primary", big: true },
    ],
    compute: (i) => {
      const parts = String(i.ratio)
        .split(":")
        .map((s) => parseInt(s, 10))
        .filter(Number.isFinite);
      if (parts.length < 2) return { simplified: "—" };
      const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
      const g = parts.reduce((acc, n) => gcd(acc, n));
      return { simplified: parts.map((p) => p / g).join(":") };
    },
  },
  {
    slug: "proportion-solver",
    inputs: [
      { id: "a", label: "a", kind: "number", default: 2 },
      { id: "b", label: "b", kind: "number", default: 5 },
      { id: "c", label: "c", kind: "number", default: 6 },
    ],
    outputs: [
      {
        id: "x",
        label: "x (in a/b = c/x)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
    ],
    compute: (i) => ({ x: numF(i.a) === 0 ? 0 : (numF(i.b) * numF(i.c)) / numF(i.a) }),
  },
  {
    slug: "random-number",
    inputs: [
      { id: "min", label: "Min", kind: "number", default: 1 },
      { id: "max", label: "Max", kind: "number", default: 100 },
      { id: "count", label: "Count", kind: "number", default: 5 },
    ],
    outputs: [
      { id: "result", label: "Random numbers", format: "text", tone: "primary", big: true },
    ],
    compute: (i) => {
      const out: number[] = [];
      const min = numF(i.min),
        max = numF(i.max);
      for (let k = 0; k < Math.min(20, numF(i.count)); k++) {
        out.push(Math.floor(Math.random() * (max - min + 1)) + min);
      }
      return { result: out.join(", ") };
    },
  },
  {
    slug: "dice-roller",
    inputs: [
      { id: "sides", label: "Sides per die", kind: "number", default: 6 },
      { id: "count", label: "Number of dice", kind: "number", default: 3 },
    ],
    outputs: [
      { id: "sum", label: "Sum", format: "integer", tone: "primary", big: true },
      { id: "rolls", label: "Individual rolls", format: "text" },
    ],
    compute: (i) => {
      const out: number[] = [];
      for (let k = 0; k < Math.min(20, numF(i.count)); k++)
        out.push(Math.floor(Math.random() * numF(i.sides)) + 1);
      return { sum: out.reduce((s, v) => s + v, 0), rolls: out.join(", ") };
    },
  },
];
