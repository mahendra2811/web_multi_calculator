import type { CalculatorSchema } from "../schema-types";

const numF = (n: unknown) => (typeof n === "number" ? n : Number(n) || 0);
const PI = Math.PI;

export const GEOMETRY_SCHEMAS: CalculatorSchema[] = [
  {
    slug: "triangle-solver",
    inputs: [
      { id: "a", label: "Side a", kind: "number", default: 3 },
      { id: "b", label: "Side b", kind: "number", default: 4 },
      { id: "c", label: "Side c", kind: "number", default: 5 },
    ],
    outputs: [
      { id: "perimeter", label: "Perimeter", format: "number", fractionDigits: 4 },
      {
        id: "area",
        label: "Area (Heron)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
      { id: "angleA", label: "Angle A (deg)", format: "number", fractionDigits: 2 },
      { id: "angleB", label: "Angle B (deg)", format: "number", fractionDigits: 2 },
      { id: "angleC", label: "Angle C (deg)", format: "number", fractionDigits: 2 },
    ],
    compute: (i) => {
      const a = numF(i.a),
        b = numF(i.b),
        c = numF(i.c);
      const s = (a + b + c) / 2;
      const area = Math.sqrt(Math.max(0, s * (s - a) * (s - b) * (s - c)));
      const ang = (op: number, adj1: number, adj2: number) =>
        (Math.acos((adj1 * adj1 + adj2 * adj2 - op * op) / (2 * adj1 * adj2)) * 180) / PI;
      return {
        perimeter: a + b + c,
        area,
        angleA: ang(a, b, c),
        angleB: ang(b, a, c),
        angleC: ang(c, a, b),
      };
    },
  },
  {
    slug: "right-triangle-geo",
    inputs: [
      { id: "a", label: "Leg a", kind: "number", default: 3 },
      { id: "b", label: "Leg b", kind: "number", default: 4 },
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
      { id: "area", label: "Area", format: "number", fractionDigits: 4 },
      { id: "perimeter", label: "Perimeter", format: "number", fractionDigits: 4 },
    ],
    compute: (i) => {
      const a = numF(i.a),
        b = numF(i.b);
      const c = Math.sqrt(a * a + b * b);
      return { c, area: (a * b) / 2, perimeter: a + b + c };
    },
  },
  {
    slug: "equilateral-triangle",
    inputs: [{ id: "side", label: "Side", kind: "number", default: 5 }],
    outputs: [
      {
        id: "area",
        label: "Area",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
      { id: "height", label: "Height", format: "number", fractionDigits: 4 },
      { id: "perimeter", label: "Perimeter", format: "number", fractionDigits: 4 },
    ],
    compute: (i) => {
      const s = numF(i.side);
      return { area: (Math.sqrt(3) / 4) * s * s, height: (Math.sqrt(3) / 2) * s, perimeter: 3 * s };
    },
  },
  {
    slug: "pythagorean-geo",
    inputs: [
      { id: "a", label: "Side a", kind: "number", default: 6 },
      { id: "b", label: "Side b", kind: "number", default: 8 },
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
    ],
    compute: (i) => ({ c: Math.sqrt(numF(i.a) ** 2 + numF(i.b) ** 2) }),
    formula: "c² = a² + b²",
  },
  {
    slug: "circle-geo",
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
      return { area: PI * r * r, circumference: 2 * PI * r, diameter: 2 * r };
    },
  },
  {
    slug: "ellipse",
    inputs: [
      { id: "a", label: "Semi-major axis", kind: "number", default: 5 },
      { id: "b", label: "Semi-minor axis", kind: "number", default: 3 },
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
      { id: "perimeter", label: "Perimeter (approx)", format: "number", fractionDigits: 4 },
    ],
    compute: (i) => {
      const a = numF(i.a),
        b = numF(i.b);
      const h = (a - b) ** 2 / (a + b) ** 2;
      return {
        area: PI * a * b,
        perimeter: PI * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h))),
      };
    },
  },
  {
    slug: "square",
    inputs: [{ id: "side", label: "Side", kind: "number", default: 5 }],
    outputs: [
      {
        id: "area",
        label: "Area",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
      { id: "perimeter", label: "Perimeter", format: "number", fractionDigits: 4 },
      { id: "diagonal", label: "Diagonal", format: "number", fractionDigits: 4 },
    ],
    compute: (i) => {
      const s = numF(i.side);
      return { area: s * s, perimeter: 4 * s, diagonal: s * Math.sqrt(2) };
    },
  },
  {
    slug: "rectangle",
    inputs: [
      { id: "length", label: "Length", kind: "number", default: 8 },
      { id: "width", label: "Width", kind: "number", default: 5 },
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
      { id: "perimeter", label: "Perimeter", format: "number", fractionDigits: 4 },
      { id: "diagonal", label: "Diagonal", format: "number", fractionDigits: 4 },
    ],
    compute: (i) => {
      const l = numF(i.length),
        w = numF(i.width);
      return { area: l * w, perimeter: 2 * (l + w), diagonal: Math.sqrt(l * l + w * w) };
    },
  },
  {
    slug: "parallelogram",
    inputs: [
      { id: "base", label: "Base", kind: "number", default: 8 },
      { id: "height", label: "Height", kind: "number", default: 5 },
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
    compute: (i) => ({ area: numF(i.base) * numF(i.height) }),
  },
  {
    slug: "trapezoid",
    inputs: [
      { id: "a", label: "Parallel side a", kind: "number", default: 5 },
      { id: "b", label: "Parallel side b", kind: "number", default: 9 },
      { id: "h", label: "Height", kind: "number", default: 4 },
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
    compute: (i) => ({ area: ((numF(i.a) + numF(i.b)) * numF(i.h)) / 2 }),
  },
  {
    slug: "regular-polygon",
    inputs: [
      { id: "n", label: "Number of sides", kind: "number", default: 6 },
      { id: "side", label: "Side length", kind: "number", default: 5 },
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
      { id: "perimeter", label: "Perimeter", format: "number", fractionDigits: 4 },
      { id: "interiorAngle", label: "Interior angle (deg)", format: "number", fractionDigits: 2 },
    ],
    compute: (i) => {
      const n = numF(i.n),
        s = numF(i.side);
      const area = (n * s * s) / (4 * Math.tan(PI / n));
      return { area, perimeter: n * s, interiorAngle: ((n - 2) * 180) / n };
    },
  },
  {
    slug: "cube",
    inputs: [{ id: "side", label: "Side", kind: "number", default: 5 }],
    outputs: [
      {
        id: "volume",
        label: "Volume",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
      { id: "surface", label: "Surface area", format: "number", fractionDigits: 4 },
      { id: "diagonal", label: "Space diagonal", format: "number", fractionDigits: 4 },
    ],
    compute: (i) => {
      const s = numF(i.side);
      return { volume: s ** 3, surface: 6 * s * s, diagonal: s * Math.sqrt(3) };
    },
  },
  {
    slug: "cuboid",
    inputs: [
      { id: "l", label: "Length", kind: "number", default: 5 },
      { id: "w", label: "Width", kind: "number", default: 4 },
      { id: "h", label: "Height", kind: "number", default: 3 },
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
      { id: "surface", label: "Surface area", format: "number", fractionDigits: 4 },
    ],
    compute: (i) => {
      const l = numF(i.l),
        w = numF(i.w),
        h = numF(i.h);
      return { volume: l * w * h, surface: 2 * (l * w + w * h + l * h) };
    },
  },
  {
    slug: "sphere",
    inputs: [{ id: "r", label: "Radius", kind: "number", default: 5 }],
    outputs: [
      {
        id: "volume",
        label: "Volume",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
      { id: "surface", label: "Surface area", format: "number", fractionDigits: 4 },
    ],
    compute: (i) => {
      const r = numF(i.r);
      return { volume: (4 / 3) * PI * r ** 3, surface: 4 * PI * r * r };
    },
  },
  {
    slug: "cylinder",
    inputs: [
      { id: "r", label: "Radius", kind: "number", default: 3 },
      { id: "h", label: "Height", kind: "number", default: 10 },
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
      { id: "surface", label: "Surface area", format: "number", fractionDigits: 4 },
    ],
    compute: (i) => {
      const r = numF(i.r),
        h = numF(i.h);
      return { volume: PI * r * r * h, surface: 2 * PI * r * (r + h) };
    },
  },
  {
    slug: "cone",
    inputs: [
      { id: "r", label: "Radius", kind: "number", default: 3 },
      { id: "h", label: "Height", kind: "number", default: 8 },
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
      { id: "surface", label: "Surface area", format: "number", fractionDigits: 4 },
      { id: "slant", label: "Slant height", format: "number", fractionDigits: 4 },
    ],
    compute: (i) => {
      const r = numF(i.r),
        h = numF(i.h);
      const l = Math.sqrt(r * r + h * h);
      return { volume: (PI * r * r * h) / 3, surface: PI * r * (r + l), slant: l };
    },
  },
  {
    slug: "pyramid",
    inputs: [
      { id: "base", label: "Base side", kind: "number", default: 5 },
      { id: "h", label: "Height", kind: "number", default: 8 },
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
      { id: "surface", label: "Surface area", format: "number", fractionDigits: 4 },
    ],
    compute: (i) => {
      const b = numF(i.base),
        h = numF(i.h);
      const slant = Math.sqrt((b / 2) ** 2 + h * h);
      return { volume: (b * b * h) / 3, surface: b * b + 2 * b * slant };
    },
  },
  {
    slug: "torus",
    inputs: [
      { id: "R", label: "Major radius R", kind: "number", default: 8 },
      { id: "r", label: "Minor radius r", kind: "number", default: 2 },
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
      { id: "surface", label: "Surface area", format: "number", fractionDigits: 4 },
    ],
    compute: (i) => {
      const R = numF(i.R),
        r = numF(i.r);
      return { volume: 2 * PI * PI * R * r * r, surface: 4 * PI * PI * R * r };
    },
  },
];
