import type { CalculatorSchema } from "../schema-types";

const numF = (n: unknown) => (typeof n === "number" ? n : Number(n) || 0);

const COLORS = [
  "black",
  "brown",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "violet",
  "grey",
  "white",
];

export const ELECTRICAL_SCHEMAS: CalculatorSchema[] = [
  {
    slug: "ohms-full",
    inputs: [
      {
        id: "mode",
        label: "Solve for",
        kind: "select",
        default: "R",
        options: [
          { value: "V", label: "Voltage" },
          { value: "I", label: "Current" },
          { value: "R", label: "Resistance" },
          { value: "P", label: "Power" },
        ],
      },
      { id: "a", label: "Input A", kind: "number", default: 12 },
      { id: "b", label: "Input B", kind: "number", default: 2 },
    ],
    outputs: [
      {
        id: "result",
        label: "Result",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
    ],
    compute: (i) => {
      const a = numF(i.a),
        b = numF(i.b);
      if (i.mode === "V") return { result: a * b }; // I*R
      if (i.mode === "I") return { result: b === 0 ? 0 : a / b }; // V/R
      if (i.mode === "R") return { result: b === 0 ? 0 : a / b }; // V/I
      return { result: a * b }; // V*I
    },
  },
  {
    slug: "resistor-color-code",
    inputs: [
      {
        id: "b1",
        label: "Band 1",
        kind: "select",
        default: "brown",
        options: COLORS.map((c) => ({ value: c, label: c })),
      },
      {
        id: "b2",
        label: "Band 2",
        kind: "select",
        default: "black",
        options: COLORS.map((c) => ({ value: c, label: c })),
      },
      {
        id: "b3",
        label: "Multiplier",
        kind: "select",
        default: "red",
        options: COLORS.map((c) => ({ value: c, label: c })),
      },
      {
        id: "tol",
        label: "Tolerance",
        kind: "select",
        default: "gold",
        options: [
          { value: "gold", label: "Gold (±5%)" },
          { value: "silver", label: "Silver (±10%)" },
          { value: "brown", label: "Brown (±1%)" },
        ],
      },
    ],
    outputs: [{ id: "R", label: "Resistance", format: "text", tone: "primary", big: true }],
    compute: (i) => {
      const idx = (c: string) => COLORS.indexOf(c);
      const val = (idx(String(i.b1)) * 10 + idx(String(i.b2))) * Math.pow(10, idx(String(i.b3)));
      const fmt =
        val >= 1e6
          ? `${(val / 1e6).toFixed(2)} MΩ`
          : val >= 1000
            ? `${(val / 1000).toFixed(2)} kΩ`
            : `${val} Ω`;
      const tol = i.tol === "gold" ? "±5%" : i.tol === "silver" ? "±10%" : "±1%";
      return { R: `${fmt} ${tol}` };
    },
  },
  {
    slug: "resistor-color-reverse",
    inputs: [{ id: "value", label: "Resistance (Ω)", kind: "number", default: 1000 }],
    outputs: [{ id: "bands", label: "4-band colors", format: "text", tone: "primary", big: true }],
    compute: (i) => {
      const v = numF(i.value);
      let exp = 0;
      let m = v;
      while (m >= 100) {
        m /= 10;
        exp++;
      }
      const d1 = Math.floor(m / 10);
      const d2 = Math.floor(m % 10);
      return { bands: `${COLORS[d1] ?? "—"} ${COLORS[d2] ?? "—"} ${COLORS[exp] ?? "—"} gold` };
    },
  },
  {
    slug: "voltage-drop",
    inputs: [
      { id: "I", label: "Current (A)", kind: "number", default: 10 },
      { id: "length", label: "Wire length (m)", kind: "number", default: 30 },
      { id: "csa", label: "Cross-section (mm²)", kind: "number", default: 2.5 },
      {
        id: "material",
        label: "Material",
        kind: "select",
        default: "copper",
        options: [
          { value: "copper", label: "Copper" },
          { value: "aluminum", label: "Aluminum" },
        ],
      },
    ],
    outputs: [
      {
        id: "drop",
        label: "Voltage drop (V)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 3,
      },
    ],
    compute: (i) => {
      const rho = i.material === "copper" ? 0.0175 : 0.028;
      return { drop: (2 * rho * numF(i.length) * numF(i.I)) / Math.max(0.0001, numF(i.csa)) };
    },
  },
  {
    slug: "wire-gauge",
    inputs: [
      { id: "current", label: "Current (A)", kind: "number", default: 15 },
      { id: "length", label: "One-way length (m)", kind: "number", default: 10 },
      { id: "voltage", label: "Voltage (V)", kind: "number", default: 230 },
      { id: "dropPct", label: "Max drop %", kind: "percent", default: 3 },
    ],
    outputs: [{ id: "awg", label: "Min AWG", format: "text", tone: "primary", big: true }],
    compute: (i) => {
      const maxDropV = (numF(i.voltage) * numF(i.dropPct)) / 100;
      const csa = (2 * 0.0175 * numF(i.length) * numF(i.current)) / Math.max(0.001, maxDropV);
      const awg = Math.max(0, Math.round((-39 * Math.log10(csa / 13.0)) / Math.log10(92)));
      return { awg: `AWG ${awg}` };
    },
  },
  {
    slug: "led-resistor",
    inputs: [
      { id: "Vs", label: "Supply voltage", kind: "number", default: 9 },
      { id: "Vled", label: "LED forward voltage", kind: "number", default: 2.1, step: 0.1 },
      { id: "Iled", label: "LED current (mA)", kind: "number", default: 20 },
    ],
    outputs: [
      { id: "R", label: "Series resistor (Ω)", format: "integer", tone: "primary", big: true },
      { id: "power", label: "Power (W)", format: "number", fractionDigits: 4 },
    ],
    compute: (i) => {
      const R = (numF(i.Vs) - numF(i.Vled)) / (numF(i.Iled) / 1000);
      return { R, power: (numF(i.Iled) / 1000) ** 2 * R };
    },
  },
  {
    slug: "rc-time",
    inputs: [
      { id: "R", label: "Resistance (Ω)", kind: "number", default: 1000 },
      { id: "C", label: "Capacitance (μF)", kind: "number", default: 100 },
    ],
    outputs: [
      {
        id: "tau",
        label: "Time constant τ (s)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
      { id: "fiveTau", label: "Steady state (5τ)", format: "number", fractionDigits: 4 },
    ],
    compute: (i) => {
      const tau = numF(i.R) * (numF(i.C) / 1e6);
      return { tau, fiveTau: 5 * tau };
    },
  },
  {
    slug: "rl-time",
    inputs: [
      { id: "R", label: "Resistance (Ω)", kind: "number", default: 100 },
      { id: "L", label: "Inductance (mH)", kind: "number", default: 10 },
    ],
    outputs: [
      {
        id: "tau",
        label: "Time constant τ (s)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 6,
      },
    ],
    compute: (i) => ({ tau: numF(i.R) === 0 ? 0 : numF(i.L) / 1000 / numF(i.R) }),
  },
  {
    slug: "decibel",
    inputs: [
      { id: "P1", label: "Reference (P1 or V1)", kind: "number", default: 1 },
      { id: "P2", label: "Measured (P2 or V2)", kind: "number", default: 100 },
      {
        id: "type",
        label: "Type",
        kind: "select",
        default: "power",
        options: [
          { value: "power", label: "Power" },
          { value: "voltage", label: "Voltage" },
        ],
      },
    ],
    outputs: [
      {
        id: "db",
        label: "Decibels (dB)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 2,
      },
    ],
    compute: (i) => {
      const r = numF(i.P2) / Math.max(0.0001, numF(i.P1));
      return { db: (i.type === "power" ? 10 : 20) * Math.log10(r) };
    },
  },
  {
    slug: "power-factor",
    inputs: [
      { id: "real", label: "Real power (W)", kind: "number", default: 800 },
      { id: "apparent", label: "Apparent power (VA)", kind: "number", default: 1000 },
    ],
    outputs: [
      {
        id: "pf",
        label: "Power factor",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 3,
      },
      { id: "angle", label: "Phase angle (deg)", format: "number", fractionDigits: 2 },
    ],
    compute: (i) => {
      const pf = numF(i.apparent) === 0 ? 0 : numF(i.real) / numF(i.apparent);
      return { pf, angle: (Math.acos(Math.min(1, Math.max(-1, pf))) * 180) / Math.PI };
    },
  },
  {
    slug: "battery-life",
    inputs: [
      { id: "capacity", label: "Capacity (mAh)", kind: "number", default: 3000 },
      { id: "load", label: "Load current (mA)", kind: "number", default: 200 },
    ],
    outputs: [
      {
        id: "hours",
        label: "Battery life (hours)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 2,
      },
      { id: "minutes", label: "Minutes", format: "integer" },
    ],
    compute: (i) => {
      const hours = numF(i.load) === 0 ? 0 : (numF(i.capacity) / numF(i.load)) * 0.7;
      return { hours, minutes: hours * 60 };
    },
  },
  {
    slug: "solar-panel-sizing",
    inputs: [
      { id: "loadKwh", label: "Daily load (kWh)", kind: "number", default: 10 },
      { id: "sunHours", label: "Peak sun hours/day", kind: "number", default: 5 },
      { id: "efficiency", label: "System efficiency %", kind: "percent", default: 80 },
    ],
    outputs: [
      {
        id: "watts",
        label: "Required panel size (W)",
        format: "integer",
        tone: "primary",
        big: true,
      },
      { id: "panels300", label: "300W panels needed", format: "integer" },
    ],
    compute: (i) => {
      const watts = (numF(i.loadKwh) * 1000) / (numF(i.sunHours) * (numF(i.efficiency) / 100));
      return { watts, panels300: Math.ceil(watts / 300) };
    },
  },
];
