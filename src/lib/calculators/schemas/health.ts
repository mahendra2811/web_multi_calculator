import type { CalculatorSchema } from "../schema-types";

const numF = (n: unknown) => (typeof n === "number" ? n : Number(n) || 0);

export const HEALTH_SCHEMAS: CalculatorSchema[] = [
  {
    slug: "healthy-weight-range",
    inputs: [
      { id: "height", label: "Height (cm)", kind: "number", default: 175, suffix: "cm" },
      {
        id: "frame",
        label: "Frame",
        kind: "select",
        default: "medium",
        options: [
          { value: "small", label: "Small" },
          { value: "medium", label: "Medium" },
          { value: "large", label: "Large" },
        ],
      },
    ],
    outputs: [
      {
        id: "lower",
        label: "Lower bound (BMI 18.5)",
        format: "number",
        suffix: " kg",
        fractionDigits: 1,
      },
      {
        id: "upper",
        label: "Upper bound (BMI 25)",
        format: "number",
        suffix: " kg",
        fractionDigits: 1,
      },
      {
        id: "ideal",
        label: "Ideal centre",
        format: "number",
        suffix: " kg",
        tone: "primary",
        big: true,
        fractionDigits: 1,
      },
    ],
    compute: (i) => {
      const h = numF(i.height) / 100;
      const lower = 18.5 * h * h;
      const upper = 25 * h * h;
      return { lower, upper, ideal: (lower + upper) / 2 };
    },
  },
  {
    slug: "lean-body-mass",
    inputs: [
      { id: "weight", label: "Weight", kind: "number", default: 75, suffix: "kg" },
      { id: "height", label: "Height", kind: "number", default: 175, suffix: "cm" },
      {
        id: "sex",
        label: "Sex",
        kind: "select",
        default: "male",
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ],
      },
    ],
    outputs: [
      {
        id: "lbm",
        label: "Lean body mass",
        format: "number",
        suffix: " kg",
        tone: "primary",
        big: true,
        fractionDigits: 1,
      },
      {
        id: "fatMass",
        label: "Estimated fat mass",
        format: "number",
        suffix: " kg",
        fractionDigits: 1,
      },
    ],
    compute: (i) => {
      const w = numF(i.weight),
        h = numF(i.height);
      const lbm = i.sex === "male" ? 0.407 * w + 0.267 * h - 19.2 : 0.252 * w + 0.473 * h - 48.3;
      return { lbm, fatMass: w - lbm };
    },
    formula: "Boer formula",
  },
  {
    slug: "army-body-fat",
    inputs: [
      {
        id: "sex",
        label: "Sex",
        kind: "select",
        default: "male",
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ],
      },
      { id: "height", label: "Height", kind: "number", default: 175, suffix: "cm" },
      { id: "neck", label: "Neck", kind: "number", default: 38, suffix: "cm" },
      { id: "waist", label: "Waist", kind: "number", default: 85, suffix: "cm" },
      { id: "hip", label: "Hip (female)", kind: "number", default: 95, suffix: "cm" },
    ],
    outputs: [
      {
        id: "bf",
        label: "Body fat %",
        format: "percent",
        tone: "primary",
        big: true,
        fractionDigits: 1,
      },
    ],
    compute: (i) => {
      const h = numF(i.height),
        n = numF(i.neck),
        w = numF(i.waist),
        hip = numF(i.hip);
      const bf =
        i.sex === "male"
          ? 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450
          : 495 / (1.29579 - 0.35004 * Math.log10(w + hip - n) + 0.221 * Math.log10(h)) - 450;
      return { bf };
    },
  },
  {
    slug: "one-rep-max",
    inputs: [
      { id: "weight", label: "Weight lifted", kind: "number", default: 80, suffix: "kg" },
      { id: "reps", label: "Reps performed", kind: "number", default: 5 },
    ],
    outputs: [
      {
        id: "epley",
        label: "1RM (Epley)",
        format: "number",
        suffix: " kg",
        tone: "primary",
        big: true,
        fractionDigits: 1,
      },
      { id: "brzycki", label: "1RM (Brzycki)", format: "number", suffix: " kg", fractionDigits: 1 },
      {
        id: "lombardi",
        label: "1RM (Lombardi)",
        format: "number",
        suffix: " kg",
        fractionDigits: 1,
      },
    ],
    compute: (i) => {
      const w = numF(i.weight),
        r = numF(i.reps);
      return {
        epley: w * (1 + r / 30),
        brzycki: w * (36 / (37 - r)),
        lombardi: w * Math.pow(r, 0.1),
      };
    },
  },
  {
    slug: "target-heart-rate",
    inputs: [
      { id: "age", label: "Age", kind: "number", default: 30 },
      { id: "resting", label: "Resting HR", kind: "number", default: 65, suffix: "bpm" },
    ],
    outputs: [
      { id: "max", label: "Max HR", format: "integer", suffix: " bpm", tone: "primary", big: true },
      { id: "moderate", label: "Moderate (50-70%)", format: "text" },
      { id: "vigorous", label: "Vigorous (70-85%)", format: "text" },
    ],
    compute: (i) => {
      const max = 220 - numF(i.age);
      const r = numF(i.resting);
      const k = (pct: number) => Math.round((max - r) * pct + r);
      return { max, moderate: `${k(0.5)}–${k(0.7)} bpm`, vigorous: `${k(0.7)}–${k(0.85)} bpm` };
    },
    formula: "Karvonen method",
  },
  {
    slug: "max-heart-rate",
    inputs: [{ id: "age", label: "Age", kind: "number", default: 30 }],
    outputs: [
      { id: "max", label: "Max HR", format: "integer", suffix: " bpm", tone: "primary", big: true },
    ],
    compute: (i) => ({ max: 220 - numF(i.age) }),
  },
  {
    slug: "calories-burned",
    inputs: [
      { id: "weight", label: "Weight", kind: "number", default: 70, suffix: "kg" },
      { id: "minutes", label: "Duration", kind: "number", default: 30, suffix: "min" },
      {
        id: "activity",
        label: "Activity",
        kind: "select",
        default: "running",
        options: [
          { value: "walking", label: "Walking 5 km/h (MET 3.5)" },
          { value: "running", label: "Running 8 km/h (MET 8)" },
          { value: "cycling", label: "Cycling moderate (MET 6)" },
          { value: "swimming", label: "Swimming (MET 7)" },
          { value: "yoga", label: "Yoga (MET 2.5)" },
          { value: "weights", label: "Weight training (MET 5)" },
        ],
      },
    ],
    outputs: [
      {
        id: "cal",
        label: "Calories burned",
        format: "integer",
        suffix: " kcal",
        tone: "primary",
        big: true,
      },
    ],
    compute: (i) => {
      const MET: Record<string, number> = {
        walking: 3.5,
        running: 8,
        cycling: 6,
        swimming: 7,
        yoga: 2.5,
        weights: 5,
      };
      const met = MET[String(i.activity)] ?? 5;
      return { cal: (met * numF(i.weight) * numF(i.minutes)) / 60 };
    },
  },
  {
    slug: "pace",
    inputs: [
      { id: "distance", label: "Distance", kind: "number", default: 5, suffix: "km" },
      { id: "time", label: "Time (min)", kind: "number", default: 30 },
    ],
    outputs: [
      { id: "pace", label: "Pace per km", format: "text", tone: "primary", big: true },
      { id: "speed", label: "Speed", format: "number", suffix: " km/h", fractionDigits: 2 },
    ],
    compute: (i) => {
      const minPerKm = numF(i.distance) > 0 ? numF(i.time) / numF(i.distance) : 0;
      const m = Math.floor(minPerKm);
      const s = Math.round((minPerKm - m) * 60);
      return {
        pace: `${m}:${String(s).padStart(2, "0")} min/km`,
        speed: numF(i.time) > 0 ? (numF(i.distance) * 60) / numF(i.time) : 0,
      };
    },
  },
  {
    slug: "pace-predictor",
    inputs: [
      { id: "recentKm", label: "Recent race distance (km)", kind: "number", default: 5 },
      { id: "recentTime", label: "Recent time (min)", kind: "number", default: 25 },
      { id: "targetKm", label: "Target race distance (km)", kind: "number", default: 21.0975 },
    ],
    outputs: [
      { id: "predicted", label: "Predicted time", format: "text", tone: "primary", big: true },
    ],
    compute: (i) => {
      // Riegel: T2 = T1 × (D2/D1)^1.06
      const t =
        numF(i.recentTime) * Math.pow(numF(i.targetKm) / Math.max(0.001, numF(i.recentKm)), 1.06);
      const h = Math.floor(t / 60);
      const m = Math.floor(t % 60);
      const s = Math.round((t - Math.floor(t)) * 60);
      return { predicted: `${h}h ${m}m ${s}s` };
    },
  },
  {
    slug: "vo2-max",
    inputs: [
      { id: "distance", label: "Distance run in 12 min (m)", kind: "number", default: 2400 },
    ],
    outputs: [
      {
        id: "vo2",
        label: "VO₂ Max",
        format: "number",
        suffix: " ml/kg/min",
        tone: "primary",
        big: true,
        fractionDigits: 1,
      },
    ],
    compute: (i) => ({ vo2: (numF(i.distance) - 504.9) / 44.73 }),
    formula: "Cooper test: (d − 504.9) / 44.73",
  },
  {
    slug: "body-surface-area",
    inputs: [
      { id: "height", label: "Height", kind: "number", default: 175, suffix: "cm" },
      { id: "weight", label: "Weight", kind: "number", default: 70, suffix: "kg" },
    ],
    outputs: [
      {
        id: "bsa",
        label: "BSA (Du Bois)",
        format: "number",
        suffix: " m²",
        tone: "primary",
        big: true,
        fractionDigits: 3,
      },
    ],
    compute: (i) => ({
      bsa: 0.007184 * Math.pow(numF(i.height), 0.725) * Math.pow(numF(i.weight), 0.425),
    }),
  },
  {
    slug: "body-type",
    inputs: [
      { id: "wristCm", label: "Wrist circumference", kind: "number", default: 17 },
      { id: "heightCm", label: "Height", kind: "number", default: 175 },
    ],
    outputs: [{ id: "type", label: "Somatotype", format: "text", tone: "primary", big: true }],
    compute: (i) => {
      const ratio = numF(i.heightCm) / Math.max(0.0001, numF(i.wristCm));
      const type = ratio > 10.4 ? "Ectomorph" : ratio > 9.6 ? "Mesomorph" : "Endomorph";
      return { type };
    },
  },
  {
    slug: "carb-intake",
    inputs: [
      { id: "calories", label: "Daily calories", kind: "number", default: 2200 },
      { id: "pct", label: "Carbs %", kind: "percent", default: 45 },
    ],
    outputs: [
      {
        id: "grams",
        label: "Carbs",
        format: "integer",
        suffix: " g/day",
        tone: "primary",
        big: true,
      },
    ],
    compute: (i) => ({ grams: (numF(i.calories) * numF(i.pct)) / 100 / 4 }),
  },
  {
    slug: "protein-intake",
    inputs: [
      { id: "weight", label: "Body weight (kg)", kind: "number", default: 70 },
      {
        id: "activity",
        label: "Activity level",
        kind: "select",
        default: "active",
        options: [
          { value: "sedentary", label: "Sedentary (0.8 g/kg)" },
          { value: "active", label: "Active (1.4 g/kg)" },
          { value: "athlete", label: "Athlete (1.8 g/kg)" },
          { value: "bodybuilder", label: "Bodybuilder (2.2 g/kg)" },
        ],
      },
    ],
    outputs: [
      {
        id: "grams",
        label: "Protein",
        format: "integer",
        suffix: " g/day",
        tone: "primary",
        big: true,
      },
    ],
    compute: (i) => {
      const M: Record<string, number> = {
        sedentary: 0.8,
        active: 1.4,
        athlete: 1.8,
        bodybuilder: 2.2,
      };
      return { grams: numF(i.weight) * (M[String(i.activity)] ?? 1.4) };
    },
  },
  {
    slug: "fat-intake",
    inputs: [
      { id: "calories", label: "Daily calories", kind: "number", default: 2200 },
      { id: "pct", label: "Fat %", kind: "percent", default: 25 },
    ],
    outputs: [
      {
        id: "grams",
        label: "Fat",
        format: "integer",
        suffix: " g/day",
        tone: "primary",
        big: true,
      },
    ],
    compute: (i) => ({ grams: (numF(i.calories) * numF(i.pct)) / 100 / 9 }),
  },
  {
    slug: "tdee",
    inputs: [
      { id: "bmr", label: "BMR (kcal)", kind: "number", default: 1700 },
      {
        id: "activity",
        label: "Activity",
        kind: "select",
        default: "moderate",
        options: [
          { value: "sedentary", label: "Sedentary (1.2)" },
          { value: "light", label: "Light (1.375)" },
          { value: "moderate", label: "Moderate (1.55)" },
          { value: "active", label: "Active (1.725)" },
          { value: "veryactive", label: "Very active (1.9)" },
        ],
      },
    ],
    outputs: [
      {
        id: "tdee",
        label: "TDEE",
        format: "integer",
        suffix: " kcal/day",
        tone: "primary",
        big: true,
      },
    ],
    compute: (i) => {
      const M: Record<string, number> = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        veryactive: 1.9,
      };
      return { tdee: numF(i.bmr) * (M[String(i.activity)] ?? 1.55) };
    },
  },
  {
    slug: "calorie-goal",
    inputs: [
      { id: "tdee", label: "TDEE", kind: "number", default: 2400 },
      {
        id: "goal",
        label: "Goal",
        kind: "select",
        default: "maintain",
        options: [
          { value: "cut", label: "Cut" },
          { value: "maintain", label: "Maintain" },
          { value: "bulk", label: "Bulk" },
        ],
      },
    ],
    outputs: [
      {
        id: "target",
        label: "Target",
        format: "integer",
        suffix: " kcal/day",
        tone: "primary",
        big: true,
      },
    ],
    compute: (i) => ({
      target:
        i.goal === "cut"
          ? numF(i.tdee) - 500
          : i.goal === "bulk"
            ? numF(i.tdee) + 500
            : numF(i.tdee),
    }),
  },
  {
    slug: "pregnancy-weight-gain",
    inputs: [
      { id: "preBmi", label: "Pre-pregnancy BMI", kind: "number", default: 22 },
      { id: "weeks", label: "Weeks pregnant", kind: "number", default: 20 },
    ],
    outputs: [
      {
        id: "totalRange",
        label: "Total recommended gain",
        format: "text",
        tone: "primary",
        big: true,
      },
      { id: "weeklyRange", label: "Weekly target", format: "text" },
    ],
    compute: (i) => {
      const bmi = numF(i.preBmi);
      let lo = 11.5,
        hi = 16;
      if (bmi < 18.5) [lo, hi] = [12.5, 18];
      else if (bmi < 25) [lo, hi] = [11.5, 16];
      else if (bmi < 30) [lo, hi] = [7, 11.5];
      else [lo, hi] = [5, 9];
      return {
        totalRange: `${lo}–${hi} kg`,
        weeklyRange: `${(lo / 40).toFixed(2)}–${(hi / 40).toFixed(2)} kg/week`,
      };
    },
  },
  {
    slug: "ovulation",
    inputs: [
      { id: "lmp", label: "First day of last period", kind: "date" },
      { id: "cycle", label: "Cycle length (days)", kind: "number", default: 28 },
    ],
    outputs: [
      { id: "ovulation", label: "Ovulation day", format: "date", tone: "primary", big: true },
      { id: "fertileStart", label: "Fertile window start", format: "date", tone: "success" },
      { id: "fertileEnd", label: "Fertile window end", format: "date", tone: "success" },
    ],
    compute: (i) => {
      const lmp = new Date(String(i.lmp));
      if (isNaN(lmp.getTime())) return {};
      const ov = new Date(lmp);
      ov.setDate(ov.getDate() + (numF(i.cycle) - 14));
      const s = new Date(ov);
      s.setDate(s.getDate() - 5);
      const e = new Date(ov);
      e.setDate(e.getDate() + 1);
      return {
        ovulation: ov.toISOString(),
        fertileStart: s.toISOString(),
        fertileEnd: e.toISOString(),
      };
    },
  },
  {
    slug: "period-tracker",
    inputs: [
      { id: "lmp", label: "Last period start", kind: "date" },
      { id: "cycle", label: "Cycle length", kind: "number", default: 28 },
    ],
    outputs: [
      { id: "next", label: "Next period", format: "date", tone: "primary", big: true },
      { id: "nextAfter", label: "Period after that", format: "date" },
    ],
    compute: (i) => {
      const lmp = new Date(String(i.lmp));
      if (isNaN(lmp.getTime())) return {};
      const n = new Date(lmp);
      n.setDate(n.getDate() + numF(i.cycle));
      const n2 = new Date(n);
      n2.setDate(n2.getDate() + numF(i.cycle));
      return { next: n.toISOString(), nextAfter: n2.toISOString() };
    },
  },
  {
    slug: "sleep",
    inputs: [{ id: "wakeTime", label: "Wake time (HH:MM, 24h)", kind: "text", default: "06:30" }],
    outputs: [
      {
        id: "bedtimes",
        label: "Best bedtimes (90-min cycles)",
        format: "text",
        tone: "primary",
        big: true,
      },
    ],
    compute: (i) => {
      const [h, m] = String(i.wakeTime).split(":").map(Number);
      if (isNaN(h) || isNaN(m)) return { bedtimes: "—" };
      const wakeMin = h * 60 + m;
      const cycles = [6, 5, 4];
      const bedtimes = cycles.map((c) => {
        const mins = (wakeMin - c * 90 - 14 + 24 * 60) % (24 * 60);
        const hh = Math.floor(mins / 60),
          mm = mins % 60;
        return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")} (${c} cycles)`;
      });
      return { bedtimes: bedtimes.join(", ") };
    },
  },
  {
    slug: "bac",
    inputs: [
      { id: "drinks", label: "Standard drinks", kind: "number", default: 2 },
      { id: "weight", label: "Weight (kg)", kind: "number", default: 70 },
      { id: "hours", label: "Hours since first drink", kind: "number", default: 1 },
      {
        id: "sex",
        label: "Sex",
        kind: "select",
        default: "male",
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ],
      },
    ],
    outputs: [
      { id: "bac", label: "BAC", format: "percent", tone: "primary", big: true, fractionDigits: 3 },
      { id: "status", label: "Status", format: "text" },
    ],
    compute: (i) => {
      const r = i.sex === "male" ? 0.68 : 0.55;
      const grams = numF(i.drinks) * 14;
      const bac = Math.max(0, (grams / (numF(i.weight) * 1000 * r)) * 100 - numF(i.hours) * 0.015);
      const status =
        bac >= 0.08
          ? "Legally drunk in most places"
          : bac >= 0.03
            ? "Impaired"
            : "Below most limits";
      return { bac, status };
    },
  },
  {
    slug: "gfr",
    inputs: [
      {
        id: "creatinine",
        label: "Serum creatinine (mg/dL)",
        kind: "number",
        default: 1,
        step: 0.1,
      },
      { id: "age", label: "Age", kind: "number", default: 35 },
      {
        id: "sex",
        label: "Sex",
        kind: "select",
        default: "male",
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ],
      },
    ],
    outputs: [
      {
        id: "gfr",
        label: "Estimated GFR",
        format: "number",
        suffix: " mL/min/1.73m²",
        tone: "primary",
        big: true,
        fractionDigits: 1,
      },
      { id: "stage", label: "CKD stage", format: "text" },
    ],
    compute: (i) => {
      // MDRD simplified
      const gfr =
        175 *
        Math.pow(numF(i.creatinine), -1.154) *
        Math.pow(numF(i.age), -0.203) *
        (i.sex === "female" ? 0.742 : 1);
      const stage =
        gfr >= 90
          ? "Normal (G1)"
          : gfr >= 60
            ? "Mild (G2)"
            : gfr >= 45
              ? "Moderate (G3a)"
              : gfr >= 30
                ? "Moderate (G3b)"
                : gfr >= 15
                  ? "Severe (G4)"
                  : "Failure (G5)";
      return { gfr, stage };
    },
  },
  {
    slug: "steps-to-calories",
    inputs: [
      { id: "steps", label: "Steps", kind: "number", default: 10000 },
      { id: "weight", label: "Weight (kg)", kind: "number", default: 70 },
    ],
    outputs: [
      {
        id: "cal",
        label: "Calories burned",
        format: "integer",
        suffix: " kcal",
        tone: "primary",
        big: true,
      },
    ],
    compute: (i) => ({ cal: numF(i.steps) * 0.0005 * numF(i.weight) }),
  },
];
