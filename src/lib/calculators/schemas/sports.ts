import type { CalculatorSchema } from "../schema-types";

const numF = (n: unknown) => (typeof n === "number" ? n : Number(n) || 0);

export const SPORTS_SCHEMAS: CalculatorSchema[] = [
  {
    slug: "cricket-run-rate",
    inputs: [
      { id: "runs", label: "Runs scored", kind: "number", default: 120 },
      { id: "overs", label: "Overs faced", kind: "number", default: 15, step: 0.1 },
    ],
    outputs: [
      {
        id: "rr",
        label: "Run rate",
        format: "number",
        suffix: " RPO",
        tone: "primary",
        big: true,
        fractionDigits: 2,
      },
    ],
    compute: (i) => ({ rr: numF(i.overs) === 0 ? 0 : numF(i.runs) / numF(i.overs) }),
  },
  {
    slug: "cricket-required-rr",
    inputs: [
      { id: "target", label: "Target runs", kind: "number", default: 200 },
      { id: "currentRuns", label: "Current runs", kind: "number", default: 80 },
      { id: "currentOvers", label: "Overs done", kind: "number", default: 10 },
      { id: "totalOvers", label: "Total overs", kind: "number", default: 20 },
    ],
    outputs: [
      { id: "needed", label: "Runs needed", format: "integer" },
      { id: "overs", label: "Overs left", format: "number", fractionDigits: 1 },
      {
        id: "rrr",
        label: "Required RR",
        format: "number",
        suffix: " RPO",
        tone: "primary",
        big: true,
        fractionDigits: 2,
      },
    ],
    compute: (i) => {
      const needed = Math.max(0, numF(i.target) - numF(i.currentRuns));
      const oversLeft = numF(i.totalOvers) - numF(i.currentOvers);
      return { needed, overs: oversLeft, rrr: oversLeft > 0 ? needed / oversLeft : Infinity };
    },
  },
  {
    slug: "cricket-dls",
    inputs: [
      { id: "team1Score", label: "Team 1 score", kind: "number", default: 200 },
      { id: "oversLost", label: "Overs lost to rain", kind: "number", default: 10 },
      { id: "totalOvers", label: "Total overs", kind: "number", default: 50 },
    ],
    outputs: [
      {
        id: "target",
        label: "Revised target (simplified)",
        format: "integer",
        tone: "primary",
        big: true,
      },
    ],
    compute: (i) => {
      const resource = (numF(i.totalOvers) - numF(i.oversLost)) / numF(i.totalOvers);
      return { target: Math.ceil(numF(i.team1Score) * resource) + 1 };
    },
  },
  {
    slug: "cricket-stats",
    inputs: [
      { id: "runs", label: "Runs", kind: "number", default: 1200 },
      { id: "balls", label: "Balls faced", kind: "number", default: 800 },
      { id: "wickets", label: "Wickets taken", kind: "number", default: 50 },
      { id: "runsConceded", label: "Runs conceded", kind: "number", default: 1500 },
      { id: "ballsBowled", label: "Balls bowled", kind: "number", default: 1200 },
    ],
    outputs: [
      {
        id: "strikeRate",
        label: "Batting strike rate",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 2,
      },
      { id: "bowlingAvg", label: "Bowling avg", format: "number", fractionDigits: 2 },
      { id: "economy", label: "Economy", format: "number", fractionDigits: 2 },
    ],
    compute: (i) => ({
      strikeRate: numF(i.balls) === 0 ? 0 : (numF(i.runs) / numF(i.balls)) * 100,
      bowlingAvg: numF(i.wickets) === 0 ? 0 : numF(i.runsConceded) / numF(i.wickets),
      economy: numF(i.ballsBowled) === 0 ? 0 : (numF(i.runsConceded) / numF(i.ballsBowled)) * 6,
    }),
  },
  {
    slug: "golf-handicap",
    inputs: [
      { id: "scores", label: "Last 5 scores (comma)", kind: "text", default: "82, 85, 88, 90, 84" },
      { id: "courseRating", label: "Course rating", kind: "number", default: 72 },
      { id: "slope", label: "Slope", kind: "number", default: 113 },
    ],
    outputs: [
      {
        id: "handicap",
        label: "Handicap index",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 1,
      },
    ],
    compute: (i) => {
      const scores = String(i.scores)
        .split(/[,\s]+/)
        .map(Number)
        .filter(Number.isFinite);
      if (scores.length === 0) return { handicap: 0 };
      const diffs = scores.map(
        (s) => ((s - numF(i.courseRating)) * 113) / Math.max(1, numF(i.slope)),
      );
      const sorted = [...diffs].sort((a, b) => a - b);
      const best = sorted.slice(0, Math.max(1, Math.floor(diffs.length / 2)));
      return { handicap: best.reduce((s, v) => s + v, 0) / best.length };
    },
  },
  {
    slug: "bowling-score",
    inputs: [
      {
        id: "frames",
        label: "Score per frame (1-10 comma)",
        kind: "text",
        default: "10, 7, 3, 9, 0, 10, 8, 2, 7, 3",
      },
    ],
    outputs: [
      { id: "total", label: "Total score (approx)", format: "integer", tone: "primary", big: true },
    ],
    compute: (i) => {
      const vals = String(i.frames)
        .split(/[,\s]+/)
        .map(Number)
        .filter((n) => isFinite(n));
      return { total: vals.reduce((s, v) => s + v, 0) };
    },
  },
  {
    slug: "darts-checkout",
    inputs: [{ id: "remaining", label: "Remaining score", kind: "number", default: 161 }],
    outputs: [
      { id: "checkout", label: "Possible checkout", format: "text", tone: "primary", big: true },
    ],
    compute: (i) => {
      const r = numF(i.remaining);
      const known: Record<number, string> = {
        170: "T20-T20-Bull",
        167: "T20-T19-Bull",
        164: "T20-T18-Bull",
        161: "T20-T17-Bull",
        160: "T20-T20-D20",
        158: "T20-T20-D19",
        100: "T20-D20",
        80: "T20-D10",
        50: "Bull",
        40: "D20",
      };
      return { checkout: known[r] ?? `Aim for: ${Math.min(60, r - 50)} → finish on double` };
    },
  },
  {
    slug: "fantasy-cricket",
    inputs: [
      { id: "runs", label: "Runs scored", kind: "number", default: 50 },
      { id: "fours", label: "Boundaries", kind: "number", default: 4 },
      { id: "sixes", label: "Sixes", kind: "number", default: 2 },
      { id: "wickets", label: "Wickets", kind: "number", default: 1 },
      { id: "catches", label: "Catches", kind: "number", default: 1 },
    ],
    outputs: [
      { id: "points", label: "Fantasy points", format: "integer", tone: "primary", big: true },
    ],
    compute: (i) => ({
      points:
        numF(i.runs) +
        numF(i.fours) * 1 +
        numF(i.sixes) * 2 +
        numF(i.wickets) * 25 +
        numF(i.catches) * 8 +
        (numF(i.runs) >= 50 ? 8 : 0) +
        (numF(i.runs) >= 100 ? 16 : 0),
    }),
  },
  // ── batch 4 — sports ──────────────────────────────────────────────────────
  {
    slug: "max-heart-rate-tanaka",
    inputs: [{ id: "age", label: "Age", kind: "number", default: 30, suffix: "yrs" }],
    outputs: [
      {
        id: "maxHr",
        label: "Max heart rate (Tanaka)",
        format: "integer",
        tone: "primary",
        big: true,
        suffix: " bpm",
      },
      { id: "classic", label: "Classic 220 − age", format: "integer", suffix: " bpm" },
      { id: "zones", label: "Training zones (50–90%)", format: "text" },
    ],
    compute: (i) => {
      const age = numF(i.age);
      const mhr = 208 - 0.7 * age;
      const z = (p: number) => Math.round((mhr * p) / 100);
      return {
        maxHr: mhr,
        classic: 220 - age,
        zones: `Z1 ${z(50)}–${z(60)} · Z2 ${z(60)}–${z(70)} · Z3 ${z(70)}–${z(80)} · Z4 ${z(80)}–${z(90)} · Z5 ${z(90)}+`,
      };
    },
    formula: "MHR = 208 − 0.7 × age (Tanaka, more accurate than 220 − age)",
  },
  {
    slug: "vo2max-bruce",
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
      { id: "timeMin", label: "Time to exhaustion", kind: "number", default: 12, suffix: "min" },
    ],
    outputs: [
      {
        id: "vo2max",
        label: "VO₂max",
        format: "number",
        tone: "primary",
        big: true,
        suffix: " ml/kg/min",
        fractionDigits: 1,
      },
      { id: "rating", label: "Fitness rating", format: "text" },
    ],
    compute: (i) => {
      const t = numF(i.timeMin);
      if (t <= 0) return {};
      const vo2 =
        String(i.sex) === "female"
          ? 4.38 * t - 3.9
          : 14.8 - 1.379 * t + 0.451 * t * t - 0.012 * t * t * t;
      const rating =
        vo2 >= 55
          ? "Superior"
          : vo2 >= 47
            ? "Excellent"
            : vo2 >= 40
              ? "Good"
              : vo2 >= 33
                ? "Fair"
                : "Needs work";
      return { vo2max: vo2, rating };
    },
    formula: "Male: 14.8 − 1.379T + 0.451T² − 0.012T³ · Female: 4.38T − 3.9 (Bruce protocol)",
  },
  {
    slug: "dots-score",
    inputs: [
      { id: "bodyKg", label: "Body weight", kind: "number", default: 85, suffix: "kg" },
      { id: "totalKg", label: "Lifted total", kind: "number", default: 500, suffix: "kg" },
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
        id: "dots",
        label: "DOTS score",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 2,
      },
      { id: "level", label: "Indicative level", format: "text" },
    ],
    compute: (i) => {
      const w = numF(i.bodyKg);
      if (w <= 0) return {};
      const male = String(i.sex) !== "female";
      const [a, b, c, d, e] = male
        ? [-307.75076, 24.0900756, -0.1918759221, 0.0007391293, -0.000001093]
        : [-57.96288, 13.6175032, -0.1126655495, 0.0005158568, -0.0000010706];
      const denom = a + b * w + c * w * w + d * Math.pow(w, 3) + e * Math.pow(w, 4);
      if (denom <= 0) return {};
      const dots = (numF(i.totalKg) * 500) / denom;
      const level =
        dots >= 500
          ? "Elite"
          : dots >= 400
            ? "Advanced"
            : dots >= 300
              ? "Intermediate"
              : dots >= 200
                ? "Novice"
                : "Beginner";
      return { dots, level };
    },
    formula: "DOTS = total × 500 ÷ (a + bw + cw² + dw³ + ew⁴), coefficients by sex",
  },
  {
    slug: "race-time-vdot",
    inputs: [
      {
        id: "knownDistanceKm",
        label: "Known race distance",
        kind: "number",
        default: 5,
        suffix: "km",
      },
      { id: "knownTimeMin", label: "Known race time", kind: "number", default: 22, suffix: "min" },
      {
        id: "targetDistanceKm",
        label: "Target race distance",
        kind: "number",
        default: 10,
        suffix: "km",
      },
    ],
    outputs: [
      {
        id: "predictedTimeMin",
        label: "Predicted target time",
        format: "number",
        tone: "primary",
        big: true,
        suffix: " min",
        fractionDigits: 1,
      },
      { id: "vdot", label: "VDOT", format: "number", fractionDigits: 1 },
      { id: "easyPace", label: "Easy training pace", format: "text" },
    ],
    compute: (i) => {
      const dKm = numF(i.knownDistanceKm);
      const t = numF(i.knownTimeMin);
      const targetKm = numF(i.targetDistanceKm);
      if (dKm <= 0 || t <= 0 || targetKm <= 0) return {};
      // Daniels & Gilbert formulas
      const pctVo2 = (min: number) =>
        0.8 + 0.1894393 * Math.exp(-0.012778 * min) + 0.2989558 * Math.exp(-0.1932605 * min);
      const vo2 = (vMmin: number) => -4.6 + 0.182258 * vMmin + 0.000104 * vMmin * vMmin;
      const vdot = vo2((dKm * 1000) / t) / pctVo2(t);
      // bisection: find target time where the same VDOT holds
      let lo = 1;
      let hi = 2000;
      for (let k = 0; k < 80; k++) {
        const mid = (lo + hi) / 2;
        const f = vo2((targetKm * 1000) / mid) / pctVo2(mid) - vdot;
        if (f > 0) lo = mid;
        else hi = mid;
      }
      const predicted = (lo + hi) / 2;
      // easy pace at ~70% VDOT (quadratic in velocity)
      const target = 0.7 * vdot;
      const disc = 0.182258 * 0.182258 + 4 * 0.000104 * (target + 4.6);
      const vEasy = (-0.182258 + Math.sqrt(disc)) / (2 * 0.000104);
      const paceMinKm = 1000 / vEasy;
      const mm = Math.floor(paceMinKm);
      const ss = Math.round((paceMinKm - mm) * 60);
      return {
        predictedTimeMin: predicted,
        vdot,
        easyPace: `${mm}:${String(ss).padStart(2, "0")} /km`,
      };
    },
    formula:
      "Daniels VDOT: VO₂ = −4.6 + 0.182258v + 0.000104v² ÷ %VO₂max(t); equal VDOT across distances",
  },
  {
    slug: "football-xg",
    inputs: [
      {
        id: "distanceM",
        label: "Shot distance from goal",
        kind: "number",
        default: 12,
        suffix: "m",
      },
      { id: "angleDeg", label: "Goal-opening angle", kind: "number", default: 30, suffix: "°" },
      {
        id: "shotType",
        label: "Shot type",
        kind: "select",
        default: "foot",
        options: [
          { value: "foot", label: "Foot" },
          { value: "header", label: "Header" },
        ],
      },
      {
        id: "assistType",
        label: "Assist type",
        kind: "select",
        default: "open-play",
        options: [
          { value: "open-play", label: "Open play pass" },
          { value: "cross", label: "Cross" },
          { value: "through-ball", label: "Through ball" },
          { value: "rebound", label: "Rebound" },
        ],
      },
    ],
    outputs: [
      {
        id: "xg",
        label: "Expected goals (xG)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 3,
      },
      { id: "interpretation", label: "Means", format: "text" },
    ],
    compute: (i) => {
      // Simple logistic xG model fitted to public shot data patterns
      let logit = 0.35 - 0.105 * numF(i.distanceM) + 0.022 * numF(i.angleDeg);
      if (String(i.shotType) === "header") logit -= 0.55;
      logit +=
        { "open-play": 0, cross: -0.1, "through-ball": 0.3, rebound: 0.6 }[String(i.assistType)] ??
        0;
      const xg = 1 / (1 + Math.exp(-logit));
      return {
        xg,
        interpretation: `Roughly ${Math.max(1, Math.round(xg * 100))} goals per 100 identical shots`,
      };
    },
    formula:
      "xG = 1 ÷ (1 + e^−(β₀ + β·features)) — logistic model on distance, angle, shot & assist type",
  },
];
