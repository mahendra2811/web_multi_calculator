import type { CalculatorSchema } from "../schema-types";

const numF = (n: unknown) => (typeof n === "number" ? n : Number(n) || 0);

export const LIFESTYLE_SCHEMAS: CalculatorSchema[] = [
  {
    slug: "gpa",
    inputs: [
      {
        id: "grades",
        label: "Grades:Credits (one per line)",
        kind: "textarea",
        default: "A:3\nB+:4\nB:3\nA-:3",
      },
      {
        id: "scale",
        label: "Scale",
        kind: "select",
        default: 4,
        options: [
          { value: 4, label: "4.0 (US)" },
          { value: 10, label: "10.0 (India)" },
        ],
      },
    ],
    outputs: [
      { id: "gpa", label: "GPA", format: "number", tone: "primary", big: true, fractionDigits: 2 },
    ],
    compute: (i) => {
      const M4: Record<string, number> = {
        "A+": 4,
        A: 4,
        "A-": 3.7,
        "B+": 3.3,
        B: 3,
        "B-": 2.7,
        "C+": 2.3,
        C: 2,
        D: 1,
        F: 0,
      };
      const M10: Record<string, number> = {
        "A+": 10,
        A: 9,
        "A-": 8.5,
        "B+": 8,
        B: 7,
        "B-": 6.5,
        "C+": 6,
        C: 5,
        D: 4,
        F: 0,
      };
      const M = i.scale === 10 ? M10 : M4;
      const lines = String(i.grades)
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
      let total = 0,
        credits = 0;
      for (const line of lines) {
        const [g, c] = line.split(":").map((s) => s.trim());
        const v = M[g.toUpperCase()];
        const cr = parseFloat(c);
        if (v != null && isFinite(cr)) {
          total += v * cr;
          credits += cr;
        }
      }
      return { gpa: credits === 0 ? 0 : total / credits };
    },
  },
  {
    slug: "cgpa-percentage",
    inputs: [
      { id: "cgpa", label: "CGPA", kind: "number", default: 8.5, step: 0.1 },
      {
        id: "scale",
        label: "Scale",
        kind: "select",
        default: 10,
        options: [
          { value: 10, label: "10.0" },
          { value: 4, label: "4.0" },
        ],
      },
    ],
    outputs: [
      {
        id: "pct",
        label: "Percentage",
        format: "percent",
        tone: "primary",
        big: true,
        fractionDigits: 1,
      },
    ],
    compute: (i) => ({ pct: i.scale === 4 ? (numF(i.cgpa) / 4) * 100 : numF(i.cgpa) * 9.5 }),
  },
  {
    slug: "exam-grade-needed",
    inputs: [
      { id: "currentPct", label: "Current %", kind: "percent", default: 75 },
      { id: "currentWeight", label: "Weight covered %", kind: "percent", default: 70 },
      { id: "targetPct", label: "Target final %", kind: "percent", default: 80 },
    ],
    outputs: [
      {
        id: "needed",
        label: "Required on remaining",
        format: "percent",
        tone: "primary",
        big: true,
        fractionDigits: 1,
      },
    ],
    compute: (i) => {
      const w = numF(i.currentWeight) / 100;
      const remW = 1 - w;
      if (remW <= 0) return { needed: 0 };
      const target = numF(i.targetPct);
      const have = numF(i.currentPct) * w;
      return { needed: (target - have) / remW };
    },
  },
  {
    slug: "exam-score-predictor",
    inputs: [
      { id: "correct", label: "Correct", kind: "number", default: 80 },
      { id: "wrong", label: "Wrong", kind: "number", default: 10 },
      { id: "marksRight", label: "Marks per correct", kind: "number", default: 4 },
      { id: "negative", label: "Negative marks per wrong", kind: "number", default: 1 },
    ],
    outputs: [
      {
        id: "score",
        label: "Predicted score",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 1,
      },
    ],
    compute: (i) => ({
      score: numF(i.correct) * numF(i.marksRight) - numF(i.wrong) * numF(i.negative),
    }),
  },
  {
    slug: "tip-calculator-lifestyle",
    inputs: [
      { id: "bill", label: "Bill (₹)", kind: "currency", default: 1500 },
      { id: "tipPct", label: "Tip %", kind: "percent", default: 10 },
    ],
    outputs: [
      { id: "tip", label: "Tip", format: "currency-inr" },
      { id: "total", label: "Total", format: "currency-inr", tone: "primary", big: true },
    ],
    compute: (i) => {
      const tip = (numF(i.bill) * numF(i.tipPct)) / 100;
      return { tip, total: numF(i.bill) + tip };
    },
  },
  {
    slug: "split-bill",
    inputs: [
      { id: "bill", label: "Total bill", kind: "currency", default: 1800 },
      { id: "tipPct", label: "Tip %", kind: "percent", default: 10 },
      { id: "people", label: "People", kind: "number", default: 3 },
    ],
    outputs: [
      { id: "total", label: "Total with tip", format: "currency-inr" },
      { id: "perPerson", label: "Per person", format: "currency-inr", tone: "primary", big: true },
    ],
    compute: (i) => {
      const total = numF(i.bill) * (1 + numF(i.tipPct) / 100);
      return { total, perPerson: total / Math.max(1, numF(i.people)) };
    },
  },
  {
    slug: "love-compatibility",
    inputs: [
      { id: "a", label: "Name 1", kind: "text", default: "Priya" },
      { id: "b", label: "Name 2", kind: "text", default: "Rahul" },
    ],
    outputs: [
      {
        id: "score",
        label: "Compatibility",
        format: "percent",
        tone: "primary",
        big: true,
        fractionDigits: 0,
      },
      { id: "verdict", label: "Verdict", format: "text" },
    ],
    compute: (i) => {
      const a = String(i.a)
        .toLowerCase()
        .replace(/[^a-z]/g, "");
      const b = String(i.b)
        .toLowerCase()
        .replace(/[^a-z]/g, "");
      const all = (a + b).split("");
      const codes = "loves".split("");
      let score = 0;
      for (let k = 0; k < codes.length; k++)
        score += all.filter((c) => c === codes[k]).length * (k + 1) * 5;
      const final = Math.min(100, score % 101);
      const verdict =
        final > 80
          ? "Soulmates ❤️"
          : final > 60
            ? "Great match"
            : final > 40
              ? "Worth a try"
              : "Just friends";
      return { score: final, verdict };
    },
  },
  {
    slug: "name-numerology",
    inputs: [{ id: "name", label: "Full name", kind: "text", default: "Mahendra" }],
    outputs: [
      { id: "destiny", label: "Destiny number", format: "integer", tone: "primary", big: true },
    ],
    compute: (i) => {
      const sum = String(i.name)
        .toUpperCase()
        .split("")
        .reduce((s, c) => {
          const code = c.charCodeAt(0);
          if (code < 65 || code > 90) return s;
          return s + ((code - 64) % 9 || 9);
        }, 0);
      let n = sum;
      while (n > 9)
        n = String(n)
          .split("")
          .reduce((a, b) => a + Number(b), 0);
      return { destiny: n };
    },
  },
  {
    slug: "age-in-units",
    inputs: [{ id: "dob", label: "Date of birth", kind: "date" }],
    outputs: [
      { id: "days", label: "Days lived", format: "integer", tone: "primary", big: true },
      { id: "hours", label: "Hours", format: "integer" },
      { id: "minutes", label: "Minutes", format: "integer" },
    ],
    compute: (i) => {
      const d = new Date(String(i.dob));
      if (isNaN(d.getTime())) return {};
      const ms = Date.now() - d.getTime();
      return {
        days: Math.floor(ms / 86400000),
        hours: Math.floor(ms / 3600000),
        minutes: Math.floor(ms / 60000),
      };
    },
  },
  {
    slug: "zodiac-western",
    inputs: [{ id: "dob", label: "DOB", kind: "date" }],
    outputs: [{ id: "sign", label: "Sun sign", format: "text", tone: "primary", big: true }],
    compute: (i) => {
      const d = new Date(String(i.dob));
      if (isNaN(d.getTime())) return {};
      const m = d.getMonth() + 1,
        dt = d.getDate();
      const signs: Array<[string, number, number, number, number]> = [
        ["Capricorn", 12, 22, 1, 19],
        ["Aquarius", 1, 20, 2, 18],
        ["Pisces", 2, 19, 3, 20],
        ["Aries", 3, 21, 4, 19],
        ["Taurus", 4, 20, 5, 20],
        ["Gemini", 5, 21, 6, 20],
        ["Cancer", 6, 21, 7, 22],
        ["Leo", 7, 23, 8, 22],
        ["Virgo", 8, 23, 9, 22],
        ["Libra", 9, 23, 10, 22],
        ["Scorpio", 10, 23, 11, 21],
        ["Sagittarius", 11, 22, 12, 21],
      ];
      for (const [s, m1, d1, m2, d2] of signs) {
        if ((m === m1 && dt >= d1) || (m === m2 && dt <= d2)) return { sign: s };
      }
      return { sign: "Capricorn" };
    },
  },
  {
    slug: "chinese-zodiac",
    inputs: [{ id: "year", label: "Birth year", kind: "number", default: 1995 }],
    outputs: [{ id: "animal", label: "Zodiac animal", format: "text", tone: "primary", big: true }],
    compute: (i) => {
      const animals = [
        "Rat",
        "Ox",
        "Tiger",
        "Rabbit",
        "Dragon",
        "Snake",
        "Horse",
        "Goat",
        "Monkey",
        "Rooster",
        "Dog",
        "Pig",
      ];
      return { animal: animals[(numF(i.year) - 4) % 12] };
    },
  },
  {
    slug: "anniversary",
    inputs: [{ id: "weddingYear", label: "Wedding year", kind: "number", default: 2015 }],
    outputs: [
      { id: "years", label: "Years married", format: "integer", tone: "primary", big: true },
      { id: "name", label: "Anniversary symbol", format: "text" },
    ],
    compute: (i) => {
      const yrs = new Date().getFullYear() - numF(i.weddingYear);
      const names: Record<number, string> = {
        1: "Paper",
        5: "Wood",
        10: "Tin",
        15: "Crystal",
        20: "China",
        25: "Silver",
        30: "Pearl",
        40: "Ruby",
        50: "Gold",
        60: "Diamond",
        75: "Platinum",
      };
      return { years: yrs, name: names[yrs] ?? "—" };
    },
  },
  {
    slug: "retirement-countdown",
    inputs: [
      { id: "currentAge", label: "Current age", kind: "number", default: 32 },
      { id: "retireAge", label: "Retirement age", kind: "number", default: 60 },
    ],
    outputs: [
      { id: "years", label: "Years left", format: "integer", tone: "primary", big: true },
      { id: "months", label: "Months", format: "integer" },
      { id: "days", label: "Days", format: "integer" },
    ],
    compute: (i) => {
      const y = Math.max(0, numF(i.retireAge) - numF(i.currentAge));
      return { years: y, months: y * 12, days: y * 365 };
    },
  },
  {
    slug: "carbon-footprint",
    inputs: [
      { id: "carKm", label: "Car (km/year)", kind: "number", default: 12000 },
      { id: "flightsShort", label: "Short flights/year", kind: "number", default: 2 },
      { id: "flightsLong", label: "Long-haul flights/year", kind: "number", default: 1 },
      {
        id: "diet",
        label: "Diet",
        kind: "select",
        default: "mixed",
        options: [
          { value: "vegan", label: "Vegan" },
          { value: "vegetarian", label: "Vegetarian" },
          { value: "mixed", label: "Mixed" },
          { value: "heavy_meat", label: "Heavy meat" },
        ],
      },
    ],
    outputs: [
      {
        id: "co2",
        label: "Annual CO₂ (tonnes)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 2,
      },
    ],
    compute: (i) => {
      const D: Record<string, number> = { vegan: 1.5, vegetarian: 2, mixed: 2.5, heavy_meat: 3.5 };
      const car = numF(i.carKm) * 0.00021;
      const flights = numF(i.flightsShort) * 0.5 + numF(i.flightsLong) * 1.5;
      return { co2: car + flights + (D[String(i.diet)] ?? 2.5) };
    },
  },
  {
    slug: "water-footprint",
    inputs: [
      { id: "showerMin", label: "Shower (min/day)", kind: "number", default: 8 },
      { id: "loadsPerWeek", label: "Laundry loads/week", kind: "number", default: 3 },
      {
        id: "diet",
        label: "Diet",
        kind: "select",
        default: "mixed",
        options: [
          { value: "vegan", label: "Vegan (3000 L)" },
          { value: "vegetarian", label: "Vegetarian (4000 L)" },
          { value: "mixed", label: "Mixed (5400 L)" },
          { value: "heavy_meat", label: "Heavy meat (7000 L)" },
        ],
      },
    ],
    outputs: [
      {
        id: "litres",
        label: "Daily water footprint",
        format: "integer",
        suffix: " L",
        tone: "primary",
        big: true,
      },
    ],
    compute: (i) => {
      const D: Record<string, number> = {
        vegan: 3000,
        vegetarian: 4000,
        mixed: 5400,
        heavy_meat: 7000,
      };
      return {
        litres:
          numF(i.showerMin) * 9 + (numF(i.loadsPerWeek) / 7) * 70 + (D[String(i.diet)] ?? 5400),
      };
    },
  },
];
