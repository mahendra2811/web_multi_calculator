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
  // ── batch 4 — engineering (mechanical / fluid / thermal) ─────────────────
  {
    slug: "torque-force",
    inputs: [
      { id: "force", label: "Force", kind: "number", default: 100, suffix: "N" },
      { id: "armM", label: "Lever arm length", kind: "number", default: 0.5, suffix: "m" },
      {
        id: "angleDeg",
        label: "Angle between force & arm",
        kind: "number",
        default: 90,
        suffix: "°",
      },
    ],
    outputs: [
      {
        id: "torque",
        label: "Torque",
        format: "number",
        tone: "primary",
        big: true,
        suffix: " N·m",
        fractionDigits: 2,
      },
    ],
    compute: (i) => ({
      torque: numF(i.force) * numF(i.armM) * Math.sin((numF(i.angleDeg) * Math.PI) / 180),
    }),
    formula: "τ = F·r·sin(θ)",
  },
  {
    slug: "pipe-friction-loss",
    inputs: [
      { id: "frictionFactor", label: "Friction factor f", kind: "number", default: 0.02 },
      { id: "lengthM", label: "Pipe length", kind: "number", default: 10, suffix: "m" },
      { id: "diameterM", label: "Pipe diameter", kind: "number", default: 0.05, suffix: "m" },
      { id: "velocity", label: "Flow velocity", kind: "number", default: 2, suffix: "m/s" },
      { id: "density", label: "Fluid density", kind: "number", default: 1000, suffix: "kg/m³" },
    ],
    outputs: [
      {
        id: "headLoss",
        label: "Head loss",
        format: "number",
        tone: "primary",
        big: true,
        suffix: " m",
        fractionDigits: 3,
      },
      {
        id: "pressureDrop",
        label: "Pressure drop",
        format: "number",
        suffix: " Pa",
        fractionDigits: 1,
      },
    ],
    compute: (i) => {
      const d = numF(i.diameterM);
      if (d <= 0) return {};
      const v = numF(i.velocity);
      const hf = (numF(i.frictionFactor) * (numF(i.lengthM) / d) * v * v) / (2 * G_EARTH);
      return { headLoss: hf, pressureDrop: numF(i.density) * G_EARTH * hf };
    },
    formula: "h_f = f·(L/D)·v²/(2g) ; ΔP = ρ·g·h_f (Darcy–Weisbach)",
  },
  {
    slug: "heat-exchanger-efficiency",
    inputs: [
      { id: "tHotIn", label: "Hot inlet temp", kind: "number", default: 120, suffix: "°C" },
      { id: "tHotOut", label: "Hot outlet temp", kind: "number", default: 80, suffix: "°C" },
      { id: "tColdIn", label: "Cold inlet temp", kind: "number", default: 30, suffix: "°C" },
      { id: "tColdOut", label: "Cold outlet temp", kind: "number", default: 70, suffix: "°C" },
      {
        id: "config",
        label: "Flow configuration",
        kind: "select",
        default: "counter",
        options: [
          { value: "counter", label: "Counter-flow" },
          { value: "parallel", label: "Parallel-flow" },
        ],
      },
    ],
    outputs: [
      {
        id: "lmtd",
        label: "LMTD",
        format: "number",
        tone: "primary",
        big: true,
        suffix: " °C",
        fractionDigits: 2,
      },
      { id: "effectiveness", label: "Effectiveness ε", format: "percent", fractionDigits: 1 },
    ],
    compute: (i) => {
      const thi = numF(i.tHotIn);
      const tho = numF(i.tHotOut);
      const tci = numF(i.tColdIn);
      const tco = numF(i.tColdOut);
      const dT1 = String(i.config) === "parallel" ? thi - tci : thi - tco;
      const dT2 = String(i.config) === "parallel" ? tho - tco : tho - tci;
      if (dT1 <= 0 || dT2 <= 0) return {};
      const lmtd = Math.abs(dT1 - dT2) < 1e-9 ? dT1 : (dT1 - dT2) / Math.log(dT1 / dT2);
      const maxSpan = thi - tci;
      const effectiveness = maxSpan > 0 ? (Math.max(thi - tho, tco - tci) / maxSpan) * 100 : 0;
      return { lmtd, effectiveness };
    },
    formula: "LMTD = (ΔT1 − ΔT2) / ln(ΔT1/ΔT2) ; ε = ΔT_max-stream / (T_hot,in − T_cold,in)",
  },
  // ── batch 4 — physics ─────────────────────────────────────────────────────
  {
    slug: "refractive-index",
    inputs: [
      {
        id: "mode",
        label: "Solve from",
        kind: "select",
        default: "fromSpeed",
        options: [
          { value: "fromSpeed", label: "Speed of light in medium" },
          { value: "fromAngles", label: "Incidence / refraction angles" },
        ],
      },
      { id: "v", label: "Speed in medium (m/s)", kind: "number", default: 200000000 },
      { id: "thetaI", label: "Incidence angle (°)", kind: "number", default: 45 },
      { id: "thetaR", label: "Refraction angle (°)", kind: "number", default: 28 },
    ],
    outputs: [
      {
        id: "n",
        label: "Refractive index n",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 3,
      },
    ],
    compute: (i) => {
      if (String(i.mode) === "fromAngles") {
        const sinR = Math.sin((numF(i.thetaR) * Math.PI) / 180);
        if (Math.abs(sinR) < 1e-12) return {};
        return { n: Math.sin((numF(i.thetaI) * Math.PI) / 180) / sinR };
      }
      const v = numF(i.v);
      if (v <= 0) return {};
      return { n: 299792458 / v };
    },
    formula: "n = c/v or n = sin(θi)/sin(θr)",
  },
  {
    slug: "lens-equation",
    inputs: [
      {
        id: "objectDistance",
        label: "Object distance d₀",
        kind: "number",
        default: 0.5,
        suffix: "m",
      },
      { id: "focalLength", label: "Focal length f", kind: "number", default: 0.2, suffix: "m" },
    ],
    outputs: [
      {
        id: "imageDistance",
        label: "Image distance dᵢ",
        format: "number",
        tone: "primary",
        big: true,
        suffix: " m",
        fractionDigits: 3,
      },
      { id: "magnification", label: "Magnification m", format: "number", fractionDigits: 3 },
      { id: "imageType", label: "Image", format: "text" },
    ],
    compute: (i) => {
      const dO = numF(i.objectDistance);
      const f = numF(i.focalLength);
      if (dO === 0 || f === 0) return {};
      if (Math.abs(dO - f) < 1e-12)
        return { imageType: "Object at focal point — image at infinity" };
      const dI = 1 / (1 / f - 1 / dO);
      const m = -dI / dO;
      return {
        imageDistance: dI,
        magnification: m,
        imageType: `${dI > 0 ? "Real, inverted" : "Virtual, upright"} · ${Math.abs(m) > 1 ? "magnified" : "diminished"}`,
      };
    },
    formula: "1/f = 1/d₀ + 1/dᵢ ; m = −dᵢ/d₀ (thin lens)",
  },
  {
    slug: "snells-law",
    inputs: [
      { id: "n1", label: "Refractive index n₁", kind: "number", default: 1.0 },
      { id: "n2", label: "Refractive index n₂", kind: "number", default: 1.5 },
      { id: "theta1Deg", label: "Incidence angle θ₁", kind: "number", default: 30, suffix: "°" },
    ],
    outputs: [
      {
        id: "theta2Deg",
        label: "Refraction angle θ₂",
        format: "number",
        tone: "primary",
        big: true,
        suffix: " °",
        fractionDigits: 2,
      },
      { id: "tir", label: "Total internal reflection", format: "text" },
    ],
    compute: (i) => {
      const n2 = numF(i.n2);
      if (n2 === 0) return {};
      const sinT2 = (numF(i.n1) * Math.sin((numF(i.theta1Deg) * Math.PI) / 180)) / n2;
      if (Math.abs(sinT2) > 1) return { tir: "Yes — beyond critical angle, ray fully reflects" };
      return { theta2Deg: (Math.asin(sinT2) * 180) / Math.PI, tir: "No" };
    },
    formula: "n₁·sin(θ₁) = n₂·sin(θ₂)",
  },
  {
    slug: "sound-intensity-db",
    inputs: [
      { id: "intensity", label: "Sound intensity (W/m²)", kind: "number", default: 0.000001 },
    ],
    outputs: [
      {
        id: "db",
        label: "Sound level",
        format: "number",
        tone: "primary",
        big: true,
        suffix: " dB",
        fractionDigits: 1,
      },
      { id: "comparable", label: "Comparable to", format: "text" },
    ],
    compute: (i) => {
      const I = numF(i.intensity);
      if (I <= 0) return {};
      const db = 10 * Math.log10(I / 1e-12);
      const comparable =
        db < 30
          ? "Whisper"
          : db < 60
            ? "Normal conversation"
            : db < 85
              ? "City traffic"
              : db < 110
                ? "Power tools — hearing protection advised"
                : "Rock concert / jet — dangerous";
      return { db, comparable };
    },
    formula: "dB = 10·log₁₀(I/I₀), I₀ = 10⁻¹² W/m²",
  },
  {
    slug: "latent-heat",
    inputs: [
      { id: "mass", label: "Mass", kind: "number", default: 1, suffix: "kg" },
      {
        id: "latentHeat",
        label: "Specific latent heat L",
        kind: "number",
        default: 334000,
        suffix: "J/kg",
        hint: "Water: fusion 334,000 · vaporization 2,260,000",
      },
    ],
    outputs: [
      {
        id: "heatQ",
        label: "Energy required Q",
        format: "number",
        tone: "primary",
        big: true,
        suffix: " J",
        fractionDigits: 0,
      },
      { id: "kj", label: "Kilojoules", format: "number", suffix: " kJ", fractionDigits: 1 },
    ],
    compute: (i) => {
      const q = numF(i.mass) * numF(i.latentHeat);
      return { heatQ: q, kj: q / 1000 };
    },
    formula: "Q = m·L",
  },
  {
    slug: "coulombs-law",
    inputs: [
      { id: "q1", label: "Charge q₁ (C)", kind: "number", default: 0.000001 },
      { id: "q2", label: "Charge q₂ (C)", kind: "number", default: 0.000001 },
      { id: "rM", label: "Separation r", kind: "number", default: 0.1, suffix: "m" },
    ],
    outputs: [
      {
        id: "force",
        label: "Electrostatic force",
        format: "number",
        tone: "primary",
        big: true,
        suffix: " N",
        fractionDigits: 4,
      },
      { id: "direction", label: "Direction", format: "text" },
    ],
    compute: (i) => {
      const r = numF(i.rM);
      if (r <= 0) return {};
      const q1 = numF(i.q1);
      const q2 = numF(i.q2);
      const f = (8.9875e9 * q1 * q2) / (r * r);
      return {
        force: Math.abs(f),
        direction: q1 * q2 > 0 ? "Repulsive (like charges)" : "Attractive (opposite charges)",
      };
    },
    formula: "F = k·q₁·q₂/r², k = 8.99 × 10⁹ N·m²/C²",
  },
  {
    slug: "magnetic-field-wire",
    inputs: [
      { id: "currentA", label: "Current", kind: "number", default: 10, suffix: "A" },
      { id: "distanceM", label: "Distance from wire", kind: "number", default: 0.05, suffix: "m" },
    ],
    outputs: [
      {
        id: "bField",
        label: "Magnetic field B",
        format: "number",
        tone: "primary",
        big: true,
        suffix: " T",
        fractionDigits: 8,
      },
      { id: "microTesla", label: "Microtesla", format: "number", suffix: " µT", fractionDigits: 2 },
    ],
    compute: (i) => {
      const r = numF(i.distanceM);
      if (r <= 0) return {};
      const b = (4 * Math.PI * 1e-7 * numF(i.currentA)) / (2 * Math.PI * r);
      return { bField: b, microTesla: b * 1e6 };
    },
    formula: "B = μ₀·I / (2π·r), μ₀ = 4π × 10⁻⁷",
  },
  {
    slug: "lorentz-force",
    inputs: [
      { id: "qC", label: "Charge q (C)", kind: "number", default: 1.6e-19 },
      { id: "vMs", label: "Velocity v (m/s)", kind: "number", default: 1000000 },
      { id: "bT", label: "Magnetic field B (T)", kind: "number", default: 0.01 },
      { id: "eVm", label: "Electric field E (V/m)", kind: "number", default: 0 },
      { id: "angleDeg", label: "Angle between v and B", kind: "number", default: 90, suffix: "°" },
    ],
    outputs: [
      {
        id: "force",
        label: "Total force",
        format: "number",
        tone: "primary",
        big: true,
        suffix: " N",
        fractionDigits: 8,
      },
      { id: "magnetic", label: "Magnetic part", format: "number", suffix: " N", fractionDigits: 8 },
      { id: "electric", label: "Electric part", format: "number", suffix: " N", fractionDigits: 8 },
    ],
    compute: (i) => {
      const q = numF(i.qC);
      const fM = Math.abs(
        q * numF(i.vMs) * numF(i.bT) * Math.sin((numF(i.angleDeg) * Math.PI) / 180),
      );
      const fE = Math.abs(q * numF(i.eVm));
      return { force: fE + fM, magnetic: fM, electric: fE };
    },
    formula: "F = qE + q·v·B·sin(θ)",
  },
  {
    slug: "centripetal-force-shm",
    inputs: [
      { id: "mass", label: "Mass", kind: "number", default: 1, suffix: "kg" },
      { id: "velocity", label: "Tangential velocity", kind: "number", default: 10, suffix: "m/s" },
      { id: "radius", label: "Radius", kind: "number", default: 5, suffix: "m" },
    ],
    outputs: [
      {
        id: "force",
        label: "Centripetal force",
        format: "number",
        tone: "primary",
        big: true,
        suffix: " N",
        fractionDigits: 2,
      },
      {
        id: "acceleration",
        label: "Centripetal acceleration",
        format: "number",
        suffix: " m/s²",
        fractionDigits: 2,
      },
    ],
    compute: (i) => {
      const r = numF(i.radius);
      if (r <= 0) return {};
      const v = numF(i.velocity);
      const a = (v * v) / r;
      return { force: numF(i.mass) * a, acceleration: a };
    },
    formula: "F = m·v²/r ; a = v²/r",
  },
];
