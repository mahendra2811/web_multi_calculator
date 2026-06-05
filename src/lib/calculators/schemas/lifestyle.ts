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
  // ── batch 4 — travel ──────────────────────────────────────────────────────
  {
    slug: "walking-time",
    inputs: [
      { id: "distanceKm", label: "Distance", kind: "number", default: 3, suffix: "km" },
      { id: "paceKmh", label: "Walking pace", kind: "number", default: 5, suffix: "km/h" },
    ],
    outputs: [
      {
        id: "minutes",
        label: "Walking time",
        format: "number",
        tone: "primary",
        big: true,
        suffix: " min",
        fractionDigits: 0,
      },
      { id: "hoursMinutes", label: "As h:mm", format: "text" },
    ],
    compute: (i) => {
      const pace = numF(i.paceKmh);
      if (pace <= 0) return {};
      const mins = (numF(i.distanceKm) / pace) * 60;
      return {
        minutes: mins,
        hoursMinutes: `${Math.floor(mins / 60)}h ${Math.round(mins % 60)}m`,
      };
    },
    formula: "time = distance ÷ pace",
  },
  {
    slug: "train-journey-duration",
    inputs: [
      { id: "distanceKm", label: "Journey distance", kind: "number", default: 500, suffix: "km" },
      { id: "avgSpeedKmh", label: "Average speed", kind: "number", default: 80, suffix: "km/h" },
      { id: "stops", label: "Number of stops", kind: "number", default: 5 },
      { id: "stopMinutes", label: "Minutes per stop", kind: "number", default: 2 },
    ],
    outputs: [
      {
        id: "totalMinutes",
        label: "Total journey time",
        format: "number",
        tone: "primary",
        big: true,
        suffix: " min",
        fractionDigits: 0,
      },
      { id: "hoursMinutes", label: "As h:mm", format: "text" },
    ],
    compute: (i) => {
      const speed = numF(i.avgSpeedKmh);
      if (speed <= 0) return {};
      const mins = (numF(i.distanceKm) / speed) * 60 + numF(i.stops) * numF(i.stopMinutes);
      return {
        totalMinutes: mins,
        hoursMinutes: `${Math.floor(mins / 60)}h ${Math.round(mins % 60)}m`,
      };
    },
    formula: "time = distance ÷ speed + stops × minutes-per-stop",
  },
  {
    slug: "bike-ride-time",
    inputs: [
      { id: "distanceKm", label: "Distance", kind: "number", default: 20, suffix: "km" },
      { id: "paceKmh", label: "Cycling pace", kind: "number", default: 18, suffix: "km/h" },
    ],
    outputs: [
      {
        id: "minutes",
        label: "Ride time",
        format: "number",
        tone: "primary",
        big: true,
        suffix: " min",
        fractionDigits: 0,
      },
      { id: "hoursMinutes", label: "As h:mm", format: "text" },
    ],
    compute: (i) => {
      const pace = numF(i.paceKmh);
      if (pace <= 0) return {};
      const mins = (numF(i.distanceKm) / pace) * 60;
      return {
        minutes: mins,
        hoursMinutes: `${Math.floor(mins / 60)}h ${Math.round(mins % 60)}m`,
      };
    },
    formula: "time = distance ÷ pace",
  },
  {
    slug: "travel-delay-prob",
    inputs: [
      {
        id: "meanDelayMin",
        label: "Average (mean) delay",
        kind: "number",
        default: 20,
        suffix: "min",
      },
      { id: "stdDevMin", label: "Standard deviation", kind: "number", default: 15, suffix: "min" },
      {
        id: "thresholdMin",
        label: "Major-delay threshold",
        kind: "number",
        default: 30,
        suffix: "min",
      },
    ],
    outputs: [
      {
        id: "expectedDelay",
        label: "Expected delay",
        format: "number",
        tone: "primary",
        big: true,
        suffix: " min",
        fractionDigits: 0,
      },
      {
        id: "probAboveThreshold",
        label: "P(delay > threshold)",
        format: "percent",
        fractionDigits: 1,
      },
    ],
    compute: (i) => {
      const sd = numF(i.stdDevMin);
      const mean = numF(i.meanDelayMin);
      if (sd <= 0)
        return { expectedDelay: mean, probAboveThreshold: numF(i.thresholdMin) > mean ? 0 : 100 };
      const z = (numF(i.thresholdMin) - mean) / sd;
      // Abramowitz–Stegun approximation of the standard normal CDF
      const t = 1 / (1 + 0.2316419 * Math.abs(z));
      const d = 0.3989423 * Math.exp((-z * z) / 2);
      let p =
        d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
      if (z < 0) p = 1 - p;
      return { expectedDelay: mean, probAboveThreshold: p * 100 };
    },
    formula: "Normal model: P(delay > X) = 1 − Φ((X − μ)/σ)",
  },
  {
    slug: "layover-min",
    inputs: [
      {
        id: "airportTier",
        label: "Airport size",
        kind: "select",
        default: "large",
        options: [
          { value: "small", label: "Small (regional)" },
          { value: "medium", label: "Medium (hub)" },
          { value: "large", label: "Large (international hub)" },
        ],
      },
      { id: "intl", label: "International connection", kind: "toggle", default: true },
      { id: "terminalChange", label: "Terminal change required", kind: "toggle", default: true },
    ],
    outputs: [
      {
        id: "minMinutes",
        label: "Minimum layover",
        format: "integer",
        tone: "primary",
        big: true,
        suffix: " min",
      },
      { id: "recommended", label: "Recommended buffer", format: "text" },
    ],
    compute: (i) => {
      const base = { small: 30, medium: 45, large: 60 }[String(i.airportTier)] ?? 45;
      let mins = i.intl ? base + 45 : base;
      if (i.terminalChange) mins += 30;
      return {
        minMinutes: mins,
        recommended: `${mins + 30}–${mins + 60} min for a stress-free connection`,
      };
    },
    formula: "Base by airport size (30/45/60) + 45 if international + 30 if terminal change",
  },
  // ── batch 4 — education ───────────────────────────────────────────────────
  {
    slug: "cgpa-percentage-custom",
    inputs: [
      { id: "cgpa", label: "CGPA", kind: "number", default: 8.5 },
      {
        id: "scale",
        label: "Grading scale",
        kind: "select",
        default: "10",
        options: [
          { value: "10", label: "10-point (CBSE ×9.5)" },
          { value: "4", label: "4-point (×25)" },
          { value: "custom", label: "Custom factor" },
        ],
      },
      { id: "factor", label: "Custom factor", kind: "number", default: 9.5 },
    ],
    outputs: [
      {
        id: "percentage",
        label: "Percentage",
        format: "percent",
        tone: "primary",
        big: true,
        fractionDigits: 2,
      },
    ],
    compute: (i) => {
      const scale = String(i.scale);
      const factor = scale === "10" ? 9.5 : scale === "4" ? 25 : numF(i.factor);
      return { percentage: numF(i.cgpa) * factor };
    },
    formula: "CBSE 10-pt: % = CGPA × 9.5 · 4-pt: % = CGPA × 25 · custom: % = CGPA × factor",
  },
  {
    slug: "cumulative-marks-predictor",
    inputs: [
      {
        id: "completed",
        label: "Completed — one per line: obtained,max",
        kind: "textarea",
        default: "72,100\n65,100\n80,100",
      },
      {
        id: "pending",
        label: "Pending — one per line: predicted,max",
        kind: "textarea",
        default: "70,100\n75,100",
      },
    ],
    outputs: [
      {
        id: "predictedTotal",
        label: "Predicted total marks",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 0,
      },
      { id: "predictedPct", label: "Predicted percentage", format: "percent", fractionDigits: 2 },
      { id: "grade", label: "Indicative grade", format: "text" },
    ],
    compute: (i) => {
      const parse = (txt: unknown) =>
        String(txt)
          .split(/\n+/)
          .map((l) => l.trim())
          .filter(Boolean)
          .map((l) => l.split(",").map((s) => Number(s.trim())));
      const rows = [...parse(i.completed), ...parse(i.pending)];
      let got = 0;
      let max = 0;
      for (const [o, m] of rows) {
        if (!isFinite(o) || !isFinite(m) || m <= 0) return {};
        got += o;
        max += m;
      }
      if (max === 0) return {};
      const pct = (got / max) * 100;
      const grade =
        pct >= 90
          ? "A+"
          : pct >= 80
            ? "A"
            : pct >= 70
              ? "B"
              : pct >= 60
                ? "C"
                : pct >= 50
                  ? "D"
                  : "F";
      return { predictedTotal: got, predictedPct: pct, grade };
    },
    formula: "total = Σ obtained + Σ predicted ; % = total ÷ Σ max × 100",
  },
  {
    slug: "course-credit-hours",
    inputs: [
      {
        id: "courses",
        label: "Courses — one credit value per line",
        kind: "textarea",
        default: "4\n4\n3\n3\n2",
      },
      { id: "requiredCredits", label: "Credits required", kind: "number", default: 120 },
    ],
    outputs: [
      {
        id: "totalCredits",
        label: "Total credits",
        format: "integer",
        tone: "primary",
        big: true,
      },
      { id: "remaining", label: "Credits remaining", format: "integer" },
      { id: "gpaEligible", label: "Requirement met?", format: "text" },
    ],
    compute: (i) => {
      let total = 0;
      for (const line of String(i.courses).split(/\n+/)) {
        const t = line.trim();
        if (!t) continue;
        const c = Number(t);
        if (!isFinite(c) || c < 0) return {};
        total += c;
      }
      const req = numF(i.requiredCredits);
      return {
        totalCredits: total,
        remaining: Math.max(0, req - total),
        gpaEligible: total >= req ? "Yes — requirement met" : `No — ${req - total} credits short`,
      };
    },
    formula: "total = Σ credits ; eligible if total ≥ required",
  },
];
