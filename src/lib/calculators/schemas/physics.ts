import type { CalculatorSchema } from "../schema-types";

const numF = (n: unknown) => (typeof n === "number" ? n : Number(n) || 0);
const G_EARTH = 9.80665;

export const PHYSICS_SCHEMAS: CalculatorSchema[] = [
  {
    slug: "force",
    inputs: [
      { id: "m", label: "Mass (kg)", kind: "number", default: 10 },
      { id: "a", label: "Acceleration (m/s²)", kind: "number", default: 5 },
    ],
    outputs: [
      {
        id: "F",
        label: "Force (N)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
    ],
    compute: (i) => ({ F: numF(i.m) * numF(i.a) }),
    formula: "F = m·a",
  },
  {
    slug: "newton-second",
    inputs: [
      { id: "F", label: "Force (N)", kind: "number", default: 50 },
      { id: "m", label: "Mass (kg)", kind: "number", default: 10 },
    ],
    outputs: [
      {
        id: "a",
        label: "Acceleration (m/s²)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
    ],
    compute: (i) => ({ a: numF(i.m) === 0 ? 0 : numF(i.F) / numF(i.m) }),
  },
  {
    slug: "weight",
    inputs: [
      { id: "m", label: "Mass (kg)", kind: "number", default: 70 },
      {
        id: "planet",
        label: "Planet",
        kind: "select",
        default: "earth",
        options: [
          { value: "earth", label: "Earth (9.81)" },
          { value: "moon", label: "Moon (1.62)" },
          { value: "mars", label: "Mars (3.71)" },
          { value: "jupiter", label: "Jupiter (24.79)" },
        ],
      },
    ],
    outputs: [
      {
        id: "W",
        label: "Weight (N)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 2,
      },
    ],
    compute: (i) => {
      const G: Record<string, number> = { earth: 9.81, moon: 1.62, mars: 3.71, jupiter: 24.79 };
      return { W: numF(i.m) * (G[String(i.planet)] ?? 9.81) };
    },
  },
  {
    slug: "kinetic-energy",
    inputs: [
      { id: "m", label: "Mass (kg)", kind: "number", default: 10 },
      { id: "v", label: "Velocity (m/s)", kind: "number", default: 20 },
    ],
    outputs: [
      {
        id: "KE",
        label: "Kinetic energy (J)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
    ],
    compute: (i) => ({ KE: 0.5 * numF(i.m) * numF(i.v) ** 2 }),
    formula: "KE = ½·m·v²",
  },
  {
    slug: "potential-energy",
    inputs: [
      { id: "m", label: "Mass (kg)", kind: "number", default: 10 },
      { id: "h", label: "Height (m)", kind: "number", default: 5 },
    ],
    outputs: [
      {
        id: "PE",
        label: "Potential energy (J)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
    ],
    compute: (i) => ({ PE: numF(i.m) * G_EARTH * numF(i.h) }),
    formula: "PE = m·g·h",
  },
  {
    slug: "work",
    inputs: [
      { id: "F", label: "Force (N)", kind: "number", default: 50 },
      { id: "d", label: "Distance (m)", kind: "number", default: 10 },
      { id: "angle", label: "Angle (deg)", kind: "number", default: 0 },
    ],
    outputs: [
      {
        id: "W",
        label: "Work (J)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
    ],
    compute: (i) => ({ W: numF(i.F) * numF(i.d) * Math.cos((numF(i.angle) * Math.PI) / 180) }),
  },
  {
    slug: "physics-power",
    inputs: [
      { id: "W", label: "Work (J)", kind: "number", default: 1000 },
      { id: "t", label: "Time (s)", kind: "number", default: 10 },
    ],
    outputs: [
      {
        id: "P",
        label: "Power (W)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
    ],
    compute: (i) => ({ P: numF(i.t) === 0 ? 0 : numF(i.W) / numF(i.t) }),
  },
  {
    slug: "momentum",
    inputs: [
      { id: "m", label: "Mass (kg)", kind: "number", default: 5 },
      { id: "v", label: "Velocity (m/s)", kind: "number", default: 10 },
    ],
    outputs: [
      {
        id: "p",
        label: "Momentum (kg·m/s)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
    ],
    compute: (i) => ({ p: numF(i.m) * numF(i.v) }),
  },
  {
    slug: "impulse",
    inputs: [
      { id: "F", label: "Force (N)", kind: "number", default: 100 },
      { id: "t", label: "Time (s)", kind: "number", default: 2 },
    ],
    outputs: [
      {
        id: "J",
        label: "Impulse (N·s)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
    ],
    compute: (i) => ({ J: numF(i.F) * numF(i.t) }),
  },
  {
    slug: "velocity-uat",
    inputs: [
      { id: "u", label: "Initial velocity (m/s)", kind: "number", default: 0 },
      { id: "a", label: "Acceleration (m/s²)", kind: "number", default: 9.81 },
      { id: "t", label: "Time (s)", kind: "number", default: 3 },
    ],
    outputs: [
      {
        id: "v",
        label: "Final velocity (m/s)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
    ],
    compute: (i) => ({ v: numF(i.u) + numF(i.a) * numF(i.t) }),
    formula: "v = u + a·t",
  },
  {
    slug: "acceleration",
    inputs: [
      { id: "dv", label: "Velocity change Δv (m/s)", kind: "number", default: 10 },
      { id: "t", label: "Time (s)", kind: "number", default: 5 },
    ],
    outputs: [
      {
        id: "a",
        label: "Acceleration (m/s²)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
    ],
    compute: (i) => ({ a: numF(i.t) === 0 ? 0 : numF(i.dv) / numF(i.t) }),
  },
  {
    slug: "free-fall",
    inputs: [{ id: "h", label: "Drop height (m)", kind: "number", default: 50 }],
    outputs: [
      {
        id: "t",
        label: "Time to hit ground (s)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 3,
      },
      { id: "v", label: "Velocity at impact (m/s)", format: "number", fractionDigits: 3 },
    ],
    compute: (i) => {
      const t = Math.sqrt((2 * numF(i.h)) / G_EARTH);
      return { t, v: G_EARTH * t };
    },
  },
  {
    slug: "projectile-motion",
    inputs: [
      { id: "v0", label: "Initial velocity (m/s)", kind: "number", default: 20 },
      { id: "angle", label: "Launch angle (deg)", kind: "number", default: 45 },
    ],
    outputs: [
      {
        id: "range",
        label: "Range (m)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 3,
      },
      { id: "maxHeight", label: "Max height (m)", format: "number", fractionDigits: 3 },
      { id: "time", label: "Flight time (s)", format: "number", fractionDigits: 3 },
    ],
    compute: (i) => {
      const v = numF(i.v0);
      const a = (numF(i.angle) * Math.PI) / 180;
      return {
        range: (v * v * Math.sin(2 * a)) / G_EARTH,
        maxHeight: (v * v * Math.sin(a) ** 2) / (2 * G_EARTH),
        time: (2 * v * Math.sin(a)) / G_EARTH,
      };
    },
  },
  {
    slug: "friction",
    inputs: [
      { id: "Ff", label: "Friction force (N)", kind: "number", default: 50 },
      { id: "N", label: "Normal force (N)", kind: "number", default: 200 },
    ],
    outputs: [
      {
        id: "mu",
        label: "Coefficient μ",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
    ],
    compute: (i) => ({ mu: numF(i.N) === 0 ? 0 : numF(i.Ff) / numF(i.N) }),
  },
  {
    slug: "pressure",
    inputs: [
      { id: "F", label: "Force (N)", kind: "number", default: 1000 },
      { id: "A", label: "Area (m²)", kind: "number", default: 0.5 },
    ],
    outputs: [
      {
        id: "P",
        label: "Pressure (Pa)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 2,
      },
    ],
    compute: (i) => ({ P: numF(i.A) === 0 ? 0 : numF(i.F) / numF(i.A) }),
  },
  {
    slug: "physics-density",
    inputs: [
      { id: "m", label: "Mass (kg)", kind: "number", default: 1 },
      { id: "V", label: "Volume (m³)", kind: "number", default: 0.001 },
    ],
    outputs: [
      {
        id: "rho",
        label: "Density (kg/m³)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 2,
      },
    ],
    compute: (i) => ({ rho: numF(i.V) === 0 ? 0 : numF(i.m) / numF(i.V) }),
  },
  {
    slug: "buoyancy",
    inputs: [
      { id: "rho", label: "Fluid density (kg/m³)", kind: "number", default: 1000 },
      { id: "V", label: "Volume submerged (m³)", kind: "number", default: 0.01 },
    ],
    outputs: [
      {
        id: "Fb",
        label: "Buoyant force (N)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
    ],
    compute: (i) => ({ Fb: numF(i.rho) * numF(i.V) * G_EARTH }),
  },
  {
    slug: "ohms-law",
    inputs: [
      { id: "V", label: "Voltage (V)", kind: "number", default: 12 },
      { id: "I", label: "Current (A)", kind: "number", default: 2 },
    ],
    outputs: [
      {
        id: "R",
        label: "Resistance (Ω)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
      { id: "P", label: "Power (W)", format: "number", fractionDigits: 4 },
    ],
    compute: (i) => ({ R: numF(i.I) === 0 ? 0 : numF(i.V) / numF(i.I), P: numF(i.V) * numF(i.I) }),
    formula: "V = I·R",
  },
  {
    slug: "electrical-power",
    inputs: [
      { id: "V", label: "Voltage (V)", kind: "number", default: 230 },
      { id: "I", label: "Current (A)", kind: "number", default: 5 },
    ],
    outputs: [
      {
        id: "P",
        label: "Power (W)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 2,
      },
    ],
    compute: (i) => ({ P: numF(i.V) * numF(i.I) }),
  },
  {
    slug: "resistor-network",
    inputs: [
      { id: "values", label: "Resistor values (Ω, comma)", kind: "text", default: "10, 20, 30" },
      {
        id: "mode",
        label: "Configuration",
        kind: "select",
        default: "series",
        options: [
          { value: "series", label: "Series" },
          { value: "parallel", label: "Parallel" },
        ],
      },
    ],
    outputs: [
      {
        id: "R",
        label: "Total resistance (Ω)",
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
        .filter((n) => Number.isFinite(n) && n > 0);
      if (i.mode === "series") return { R: vals.reduce((a, b) => a + b, 0) };
      const inv = vals.reduce((a, b) => a + 1 / b, 0);
      return { R: inv === 0 ? 0 : 1 / inv };
    },
  },
  {
    slug: "capacitor-network",
    inputs: [
      { id: "values", label: "Capacitor values (μF, comma)", kind: "text", default: "10, 22, 47" },
      {
        id: "mode",
        label: "Configuration",
        kind: "select",
        default: "parallel",
        options: [
          { value: "series", label: "Series" },
          { value: "parallel", label: "Parallel" },
        ],
      },
    ],
    outputs: [
      {
        id: "C",
        label: "Total capacitance (μF)",
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
        .filter((n) => Number.isFinite(n) && n > 0);
      if (i.mode === "parallel") return { C: vals.reduce((a, b) => a + b, 0) };
      const inv = vals.reduce((a, b) => a + 1 / b, 0);
      return { C: inv === 0 ? 0 : 1 / inv };
    },
  },
  {
    slug: "wave-equation",
    inputs: [
      { id: "f", label: "Frequency (Hz)", kind: "number", default: 100 },
      { id: "v", label: "Wave speed (m/s)", kind: "number", default: 343 },
    ],
    outputs: [
      {
        id: "wavelength",
        label: "Wavelength (m)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
    ],
    compute: (i) => ({ wavelength: numF(i.f) === 0 ? 0 : numF(i.v) / numF(i.f) }),
    formula: "λ = v / f",
  },
  {
    slug: "doppler",
    inputs: [
      { id: "f", label: "Source frequency (Hz)", kind: "number", default: 500 },
      { id: "v", label: "Wave speed (m/s)", kind: "number", default: 343 },
      { id: "vSource", label: "Source velocity (m/s)", kind: "number", default: 0 },
      { id: "vObs", label: "Observer velocity (m/s)", kind: "number", default: 20 },
    ],
    outputs: [
      {
        id: "f2",
        label: "Observed frequency (Hz)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
    ],
    compute: (i) => ({
      f2: (numF(i.f) * (numF(i.v) + numF(i.vObs))) / (numF(i.v) - numF(i.vSource)),
    }),
  },
  {
    slug: "pendulum",
    inputs: [{ id: "L", label: "Length (m)", kind: "number", default: 1 }],
    outputs: [
      {
        id: "T",
        label: "Period (s)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
    ],
    compute: (i) => ({ T: 2 * Math.PI * Math.sqrt(numF(i.L) / G_EARTH) }),
    formula: "T = 2π·√(L/g)",
  },
  {
    slug: "hooke-spring",
    inputs: [
      { id: "k", label: "Spring constant (N/m)", kind: "number", default: 100 },
      { id: "x", label: "Displacement (m)", kind: "number", default: 0.1 },
    ],
    outputs: [
      {
        id: "F",
        label: "Force (N)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
    ],
    compute: (i) => ({ F: numF(i.k) * numF(i.x) }),
    formula: "F = k·x",
  },
];
