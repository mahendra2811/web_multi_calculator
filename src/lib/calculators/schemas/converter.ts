import type { CalculatorSchema } from "../schema-types";

const numF = (n: unknown) => (typeof n === "number" ? n : Number(n) || 0);

// Generic factor converter helper
function makeFactor(
  slug: string,
  units: Array<{ id: string; label: string; f: number }>,
  defaultFrom: string,
  defaultTo: string,
): CalculatorSchema {
  return {
    slug,
    inputs: [
      { id: "value", label: "Value", kind: "number", default: 1 },
      {
        id: "from",
        label: "From",
        kind: "select",
        default: defaultFrom,
        options: units.map((u) => ({ value: u.id, label: u.label })),
      },
      {
        id: "to",
        label: "To",
        kind: "select",
        default: defaultTo,
        options: units.map((u) => ({ value: u.id, label: u.label })),
      },
    ],
    outputs: [
      {
        id: "result",
        label: "Result",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 6,
      },
    ],
    compute: (i) => {
      const fromU = units.find((u) => u.id === i.from);
      const toU = units.find((u) => u.id === i.to);
      if (!fromU || !toU) return { result: 0 };
      return { result: (numF(i.value) * fromU.f) / toU.f };
    },
  };
}

export const CONVERTER_SCHEMAS: CalculatorSchema[] = [
  // Angle
  makeFactor(
    "angle",
    [
      { id: "deg", label: "Degree", f: 1 },
      { id: "rad", label: "Radian", f: 180 / Math.PI },
      { id: "grad", label: "Gradian", f: 0.9 },
      { id: "turn", label: "Turn", f: 360 },
    ],
    "deg",
    "rad",
  ),
  // Force
  makeFactor(
    "force",
    [
      { id: "N", label: "Newton", f: 1 },
      { id: "kN", label: "Kilonewton", f: 1000 },
      { id: "lbf", label: "Pound-force", f: 4.4482216 },
      { id: "kgf", label: "Kilogram-force", f: 9.80665 },
      { id: "dyn", label: "Dyne", f: 1e-5 },
    ],
    "N",
    "lbf",
  ),
  // Torque
  makeFactor(
    "torque",
    [
      { id: "Nm", label: "Newton·meter", f: 1 },
      { id: "lbft", label: "Pound·foot", f: 1.35582 },
      { id: "kgfm", label: "Kgf·meter", f: 9.80665 },
    ],
    "Nm",
    "lbft",
  ),
  // Power
  makeFactor(
    "power",
    [
      { id: "W", label: "Watt", f: 1 },
      { id: "kW", label: "Kilowatt", f: 1000 },
      { id: "hp", label: "Horsepower", f: 745.7 },
      { id: "BTU", label: "BTU/hr", f: 0.293 },
    ],
    "W",
    "hp",
  ),
  // Frequency
  makeFactor(
    "frequency",
    [
      { id: "Hz", label: "Hertz", f: 1 },
      { id: "kHz", label: "Kilohertz", f: 1000 },
      { id: "MHz", label: "Megahertz", f: 1e6 },
      { id: "GHz", label: "Gigahertz", f: 1e9 },
      { id: "RPM", label: "RPM", f: 1 / 60 },
    ],
    "Hz",
    "kHz",
  ),
  // Fuel economy
  makeFactor(
    "fuel-economy",
    [
      { id: "mpg", label: "MPG (US)", f: 1 },
      { id: "kmpl", label: "km/L", f: 2.35215 },
      { id: "lp100", label: "L/100 km (note: inverse)", f: 1 },
    ],
    "mpg",
    "kmpl",
  ),
  // Density
  makeFactor(
    "density",
    [
      { id: "kgm3", label: "kg/m³", f: 1 },
      { id: "lbft3", label: "lb/ft³", f: 16.0185 },
      { id: "gcm3", label: "g/cm³", f: 1000 },
    ],
    "kgm3",
    "gcm3",
  ),
  // Acceleration
  makeFactor(
    "acceleration",
    [
      { id: "ms2", label: "m/s²", f: 1 },
      { id: "fts2", label: "ft/s²", f: 0.3048 },
      { id: "g", label: "g (gravity)", f: 9.80665 },
    ],
    "ms2",
    "g",
  ),
  // Magnetic flux
  makeFactor(
    "magnetic-flux",
    [
      { id: "Wb", label: "Weber", f: 1 },
      { id: "Mx", label: "Maxwell", f: 1e-8 },
    ],
    "Wb",
    "Mx",
  ),
  // Electric current
  makeFactor(
    "current",
    [
      { id: "A", label: "Ampere", f: 1 },
      { id: "mA", label: "Milliampere", f: 0.001 },
      { id: "uA", label: "Microampere", f: 1e-6 },
    ],
    "A",
    "mA",
  ),
  // Voltage
  makeFactor(
    "voltage",
    [
      { id: "V", label: "Volt", f: 1 },
      { id: "mV", label: "Millivolt", f: 0.001 },
      { id: "kV", label: "Kilovolt", f: 1000 },
    ],
    "V",
    "mV",
  ),
  // Resistance
  makeFactor(
    "resistance",
    [
      { id: "ohm", label: "Ohm (Ω)", f: 1 },
      { id: "kohm", label: "Kiloohm", f: 1000 },
      { id: "Mohm", label: "Megaohm", f: 1e6 },
    ],
    "ohm",
    "kohm",
  ),
  // Capacitance
  makeFactor(
    "capacitance",
    [
      { id: "F", label: "Farad", f: 1 },
      { id: "mF", label: "Millifarad", f: 0.001 },
      { id: "uF", label: "Microfarad", f: 1e-6 },
      { id: "nF", label: "Nanofarad", f: 1e-9 },
      { id: "pF", label: "Picofarad", f: 1e-12 },
    ],
    "uF",
    "nF",
  ),
  // Roman numerals
  {
    slug: "roman-numeral",
    inputs: [{ id: "value", label: "Decimal or Roman", kind: "text", default: "2024" }],
    outputs: [
      { id: "roman", label: "Roman", format: "text", tone: "primary", big: true },
      { id: "decimal", label: "Decimal", format: "integer" },
    ],
    compute: (i) => {
      const s = String(i.value).trim();
      const numToRoman = (num: number) => {
        const m: Array<[number, string]> = [
          [1000, "M"],
          [900, "CM"],
          [500, "D"],
          [400, "CD"],
          [100, "C"],
          [90, "XC"],
          [50, "L"],
          [40, "XL"],
          [10, "X"],
          [9, "IX"],
          [5, "V"],
          [4, "IV"],
          [1, "I"],
        ];
        let r = "";
        for (const [v, sym] of m) {
          while (num >= v) {
            r += sym;
            num -= v;
          }
        }
        return r;
      };
      const romanToNum = (r: string) => {
        const map: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
        let n = 0;
        for (let k = 0; k < r.length; k++) {
          const cur = map[r[k]] ?? 0;
          const next = map[r[k + 1]] ?? 0;
          n += cur < next ? -cur : cur;
        }
        return n;
      };
      const asNum = Number(s);
      if (!isNaN(asNum) && asNum > 0 && asNum < 4000)
        return { roman: numToRoman(Math.floor(asNum)), decimal: Math.floor(asNum) };
      return { roman: s.toUpperCase(), decimal: romanToNum(s.toUpperCase()) };
    },
  },
  // Number word spelling
  {
    slug: "number-words",
    inputs: [{ id: "value", label: "Number", kind: "number", default: 12345 }],
    outputs: [{ id: "words", label: "In words", format: "text", tone: "primary", big: true }],
    compute: (i) => {
      const n = Math.floor(numF(i.value));
      if (n === 0) return { words: "zero" };
      const a = [
        "",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
        "ten",
        "eleven",
        "twelve",
        "thirteen",
        "fourteen",
        "fifteen",
        "sixteen",
        "seventeen",
        "eighteen",
        "nineteen",
      ];
      const b = [
        "",
        "",
        "twenty",
        "thirty",
        "forty",
        "fifty",
        "sixty",
        "seventy",
        "eighty",
        "ninety",
      ];
      const seg = (x: number): string => {
        if (x < 20) return a[x];
        if (x < 100) return b[Math.floor(x / 10)] + (x % 10 ? " " + a[x % 10] : "");
        return a[Math.floor(x / 100)] + " hundred" + (x % 100 ? " " + seg(x % 100) : "");
      };
      const scales = ["", "thousand", "million", "billion", "trillion"];
      let r = "";
      let m = n;
      let s = 0;
      while (m > 0) {
        const chunk = m % 1000;
        if (chunk) r = seg(chunk) + (scales[s] ? " " + scales[s] : "") + (r ? " " + r : "");
        m = Math.floor(m / 1000);
        s++;
      }
      return { words: r };
    },
  },
  // Indian Number System
  {
    slug: "indian-number-system",
    inputs: [{ id: "value", label: "Number", kind: "number", default: 123456789 }],
    outputs: [
      { id: "indian", label: "Indian (lakh/crore)", format: "text", tone: "primary", big: true },
      { id: "intl", label: "International (M/B)", format: "text" },
    ],
    compute: (i) => {
      const n = numF(i.value);
      const cr = (n / 10000000).toFixed(2);
      const m = (n / 1000000).toFixed(2);
      return { indian: `${cr} crore`, intl: `${m} million` };
    },
  },
  // Shoe size converter
  {
    slug: "shoe-size",
    inputs: [{ id: "us", label: "US size (men)", kind: "number", default: 9 }],
    outputs: [
      { id: "uk", label: "UK", format: "number", fractionDigits: 1 },
      { id: "eu", label: "EU", format: "number", fractionDigits: 1, tone: "primary", big: true },
      { id: "jp", label: "JP (cm)", format: "number", fractionDigits: 1 },
    ],
    compute: (i) => {
      const us = numF(i.us);
      return { uk: us - 1, eu: us + 33, jp: 22 + (us - 4) * 0.85 };
    },
  },
  // Clothing size converter
  {
    slug: "clothing-size",
    inputs: [{ id: "chest", label: "Chest (cm)", kind: "number", default: 100 }],
    outputs: [{ id: "label", label: "Approx size", format: "text", tone: "primary", big: true }],
    compute: (i) => {
      const c = numF(i.chest);
      const label =
        c < 88 ? "XS" : c < 96 ? "S" : c < 104 ? "M" : c < 112 ? "L" : c < 120 ? "XL" : "XXL";
      return { label };
    },
  },
  // Ring size converter
  {
    slug: "ring-size",
    inputs: [{ id: "mm", label: "Inner diameter (mm)", kind: "number", default: 18, step: 0.1 }],
    outputs: [
      { id: "us", label: "US", format: "number", fractionDigits: 1 },
      { id: "uk", label: "UK", format: "text", tone: "primary", big: true },
      { id: "eu", label: "EU", format: "number", fractionDigits: 1 },
    ],
    compute: (i) => {
      const mm = numF(i.mm);
      const circ = mm * Math.PI;
      // very rough mapping
      return {
        us: (mm - 11.5) / 0.83,
        uk: String.fromCharCode(65 + Math.floor(mm - 13)),
        eu: circ,
      };
    },
  },
  // Bra size converter
  {
    slug: "bra-size",
    inputs: [
      { id: "underBust", label: "Under-bust (cm)", kind: "number", default: 75 },
      { id: "bust", label: "Bust (cm)", kind: "number", default: 90 },
    ],
    outputs: [{ id: "size", label: "Bra size (EU)", format: "text", tone: "primary", big: true }],
    compute: (i) => {
      const band = Math.round(numF(i.underBust) / 5) * 5;
      const diff = numF(i.bust) - numF(i.underBust);
      const cup = ["AA", "A", "B", "C", "D", "DD", "E", "F", "G"][
        Math.max(0, Math.min(8, Math.floor((diff - 10) / 2.5)))
      ];
      return { size: `${band}${cup}` };
    },
  },
];
