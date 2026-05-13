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
];
