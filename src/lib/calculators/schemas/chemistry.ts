import type { CalculatorSchema } from "../schema-types";

const numF = (n: unknown) => (typeof n === "number" ? n : Number(n) || 0);
const R = 8.314;
const AVOGADRO = 6.022e23;

export const CHEMISTRY_SCHEMAS: CalculatorSchema[] = [
  {
    slug: "molarity",
    inputs: [
      { id: "moles", label: "Moles of solute", kind: "number", default: 0.5 },
      { id: "litres", label: "Solution volume (L)", kind: "number", default: 1 },
    ],
    outputs: [
      {
        id: "M",
        label: "Molarity (mol/L)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
    ],
    compute: (i) => ({ M: numF(i.litres) === 0 ? 0 : numF(i.moles) / numF(i.litres) }),
  },
  {
    slug: "molality",
    inputs: [
      { id: "moles", label: "Moles of solute", kind: "number", default: 0.5 },
      { id: "kg", label: "Mass of solvent (kg)", kind: "number", default: 1 },
    ],
    outputs: [
      {
        id: "m",
        label: "Molality (mol/kg)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
    ],
    compute: (i) => ({ m: numF(i.kg) === 0 ? 0 : numF(i.moles) / numF(i.kg) }),
  },
  {
    slug: "molar-mass",
    inputs: [{ id: "formula", label: "Formula (e.g. H2O, NaCl)", kind: "text", default: "H2O" }],
    outputs: [
      {
        id: "mass",
        label: "Molar mass (g/mol)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
    ],
    compute: (i) => {
      const atomic: Record<string, number> = {
        H: 1.008,
        He: 4.0026,
        Li: 6.94,
        Be: 9.0122,
        B: 10.81,
        C: 12.011,
        N: 14.007,
        O: 15.999,
        F: 18.998,
        Ne: 20.18,
        Na: 22.99,
        Mg: 24.305,
        Al: 26.982,
        Si: 28.085,
        P: 30.974,
        S: 32.06,
        Cl: 35.45,
        K: 39.098,
        Ca: 40.078,
        Fe: 55.845,
        Cu: 63.546,
        Zn: 65.38,
        Ag: 107.87,
        I: 126.9,
        Au: 196.97,
      };
      const matches = String(i.formula).matchAll(/([A-Z][a-z]?)(\d*)/g);
      let m = 0;
      for (const match of matches) {
        if (!match[1]) continue;
        const a = atomic[match[1]];
        if (a) m += a * (match[2] ? Number(match[2]) : 1);
      }
      return { mass: m };
    },
  },
  {
    slug: "moles-mass-atoms",
    inputs: [
      {
        id: "mode",
        label: "Given",
        kind: "select",
        default: "mass",
        options: [
          { value: "mass", label: "Mass" },
          { value: "moles", label: "Moles" },
          { value: "atoms", label: "Atoms" },
        ],
      },
      { id: "value", label: "Value", kind: "number", default: 18 },
      { id: "molarMass", label: "Molar mass (g/mol)", kind: "number", default: 18 },
    ],
    outputs: [
      { id: "mass", label: "Mass (g)", format: "number", fractionDigits: 4 },
      {
        id: "moles",
        label: "Moles",
        format: "number",
        fractionDigits: 6,
        tone: "primary",
        big: true,
      },
      { id: "atoms", label: "Atoms", format: "text" },
    ],
    compute: (i) => {
      const v = numF(i.value),
        mm = numF(i.molarMass);
      let moles = 0;
      if (i.mode === "mass") moles = v / mm;
      else if (i.mode === "moles") moles = v;
      else moles = v / AVOGADRO;
      return { mass: moles * mm, moles, atoms: (moles * AVOGADRO).toExponential(3) };
    },
  },
  {
    slug: "mass-percent",
    inputs: [
      { id: "solute", label: "Mass of solute (g)", kind: "number", default: 10 },
      { id: "solution", label: "Mass of solution (g)", kind: "number", default: 100 },
    ],
    outputs: [
      {
        id: "pct",
        label: "Mass %",
        format: "percent",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
    ],
    compute: (i) => ({
      pct: numF(i.solution) === 0 ? 0 : (numF(i.solute) / numF(i.solution)) * 100,
    }),
  },
  {
    slug: "dilution",
    inputs: [
      { id: "M1", label: "Initial molarity (M1)", kind: "number", default: 1 },
      { id: "V1", label: "Initial volume (mL)", kind: "number", default: 50 },
      { id: "M2", label: "Final molarity (M2)", kind: "number", default: 0.1 },
    ],
    outputs: [
      {
        id: "V2",
        label: "Final volume (mL)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 2,
      },
    ],
    compute: (i) => ({ V2: numF(i.M2) === 0 ? 0 : (numF(i.M1) * numF(i.V1)) / numF(i.M2) }),
    formula: "M1·V1 = M2·V2",
  },
  {
    slug: "ph",
    inputs: [{ id: "h", label: "[H+] (mol/L)", kind: "number", default: 0.0001, step: 0.0001 }],
    outputs: [
      { id: "pH", label: "pH", format: "number", tone: "primary", big: true, fractionDigits: 2 },
      { id: "pOH", label: "pOH", format: "number", fractionDigits: 2 },
      { id: "type", label: "Type", format: "text" },
    ],
    compute: (i) => {
      const pH = -Math.log10(numF(i.h));
      return { pH, pOH: 14 - pH, type: pH < 7 ? "Acidic" : pH > 7 ? "Basic" : "Neutral" };
    },
  },
  {
    slug: "buffer",
    inputs: [
      { id: "pKa", label: "pKa", kind: "number", default: 4.76, step: 0.01 },
      { id: "base", label: "[A-]", kind: "number", default: 0.1, step: 0.01 },
      { id: "acid", label: "[HA]", kind: "number", default: 0.1, step: 0.01 },
    ],
    outputs: [
      {
        id: "pH",
        label: "Buffer pH",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 3,
      },
    ],
    compute: (i) => ({
      pH: numF(i.acid) === 0 ? 0 : numF(i.pKa) + Math.log10(numF(i.base) / numF(i.acid)),
    }),
    formula: "Henderson-Hasselbalch",
  },
  {
    slug: "ideal-gas",
    inputs: [
      { id: "P", label: "Pressure (Pa)", kind: "number", default: 101325 },
      { id: "V", label: "Volume (m^3)", kind: "number", default: 0.01 },
      { id: "T", label: "Temperature (K)", kind: "number", default: 298 },
    ],
    outputs: [
      { id: "n", label: "Moles", format: "number", tone: "primary", big: true, fractionDigits: 4 },
    ],
    compute: (i) => ({ n: (numF(i.P) * numF(i.V)) / (R * numF(i.T)) }),
    formula: "PV = nRT",
  },
  {
    slug: "boyle-charles",
    inputs: [
      {
        id: "law",
        label: "Law",
        kind: "select",
        default: "boyle",
        options: [
          { value: "boyle", label: "Boyle (PV=const)" },
          { value: "charles", label: "Charles (V/T=const)" },
        ],
      },
      { id: "X1", label: "Initial X", kind: "number", default: 1 },
      { id: "Y1", label: "Initial Y", kind: "number", default: 1 },
      { id: "X2", label: "Final X", kind: "number", default: 2 },
    ],
    outputs: [
      {
        id: "Y2",
        label: "Final Y",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
    ],
    compute: (i) => {
      if (i.law === "boyle")
        return { Y2: numF(i.X2) === 0 ? 0 : (numF(i.X1) * numF(i.Y1)) / numF(i.X2) };
      return { Y2: numF(i.X1) === 0 ? 0 : (numF(i.Y1) * numF(i.X2)) / numF(i.X1) };
    },
  },
  {
    slug: "half-life-radio",
    inputs: [
      { id: "A0", label: "Initial activity", kind: "number", default: 100 },
      { id: "t", label: "Time elapsed", kind: "number", default: 60 },
      { id: "tHalf", label: "Half-life", kind: "number", default: 30 },
    ],
    outputs: [
      {
        id: "A",
        label: "Remaining",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
    ],
    compute: (i) => ({
      A: numF(i.A0) * Math.pow(0.5, numF(i.t) / Math.max(0.0001, numF(i.tHalf))),
    }),
  },
  {
    slug: "empirical-formula",
    inputs: [
      {
        id: "elements",
        label: "Element:mass% (one per line)",
        kind: "textarea",
        default: "C:40\nH:6.67\nO:53.33",
      },
    ],
    outputs: [
      { id: "formula", label: "Empirical formula", format: "text", tone: "primary", big: true },
    ],
    compute: (i) => {
      const atomic: Record<string, number> = {
        H: 1.008,
        C: 12.011,
        N: 14.007,
        O: 15.999,
        S: 32.06,
        P: 30.974,
        Cl: 35.45,
        Na: 22.99,
      };
      const lines = String(i.elements)
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
      const moles: Array<[string, number]> = [];
      for (const ln of lines) {
        const [el, pctStr] = ln.split(":").map((s) => s.trim());
        const mass = parseFloat(pctStr);
        const m = atomic[el];
        if (m && isFinite(mass)) moles.push([el, mass / m]);
      }
      if (moles.length === 0) return { formula: "-" };
      const min = Math.min(...moles.map(([, n]) => n));
      return {
        formula: moles
          .map(([el, n]) => `${el}${Math.round(n / min) === 1 ? "" : Math.round(n / min)}`)
          .join(""),
      };
    },
  },
  {
    slug: "avogadro",
    inputs: [
      {
        id: "mode",
        label: "From",
        kind: "select",
        default: "moles",
        options: [
          { value: "moles", label: "Moles to atoms" },
          { value: "atoms", label: "Atoms to moles" },
        ],
      },
      { id: "value", label: "Value", kind: "number", default: 1 },
    ],
    outputs: [{ id: "result", label: "Result", format: "text", tone: "primary", big: true }],
    compute: (i) => {
      const v = numF(i.value);
      return {
        result:
          i.mode === "moles"
            ? (v * AVOGADRO).toExponential(4) + " atoms"
            : (v / AVOGADRO).toExponential(4) + " mol",
      };
    },
  },
  {
    slug: "chem-density",
    inputs: [
      { id: "m", label: "Mass (g)", kind: "number", default: 10 },
      { id: "V", label: "Volume (mL)", kind: "number", default: 5 },
    ],
    outputs: [
      {
        id: "rho",
        label: "Density (g/mL)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
    ],
    compute: (i) => ({ rho: numF(i.V) === 0 ? 0 : numF(i.m) / numF(i.V) }),
  },
  {
    slug: "solution-concentration",
    inputs: [
      { id: "mg", label: "Solute (mg)", kind: "number", default: 50 },
      { id: "litres", label: "Solution (L)", kind: "number", default: 1 },
    ],
    outputs: [
      { id: "mgL", label: "mg/L", format: "number", tone: "primary", big: true, fractionDigits: 2 },
      { id: "ppm", label: "ppm", format: "number", fractionDigits: 2 },
      { id: "pct", label: "% w/v", format: "percent", fractionDigits: 4 },
    ],
    compute: (i) => {
      const mgL = numF(i.litres) === 0 ? 0 : numF(i.mg) / numF(i.litres);
      return { mgL, ppm: mgL, pct: mgL / 10000 };
    },
  },
  // ── batch 4 — chemistry ───────────────────────────────────────────────────
  {
    slug: "reaction-yield-percent",
    inputs: [
      { id: "actualG", label: "Actual yield", kind: "number", default: 18, suffix: "g" },
      { id: "theoreticalG", label: "Theoretical yield", kind: "number", default: 22, suffix: "g" },
    ],
    outputs: [
      {
        id: "percentYield",
        label: "Percent yield",
        format: "percent",
        tone: "primary",
        big: true,
        fractionDigits: 1,
      },
      { id: "lostG", label: "Yield lost", format: "number", suffix: " g", fractionDigits: 2 },
    ],
    compute: (i) => {
      const t = numF(i.theoreticalG);
      if (t <= 0) return {};
      const a = numF(i.actualG);
      return { percentYield: (a / t) * 100, lostG: t - a };
    },
    formula: "% yield = (actual ÷ theoretical) × 100",
  },
  {
    slug: "equilibrium-constant",
    inputs: [
      {
        id: "products",
        label: "Products — one per line: concentration,coefficient",
        kind: "textarea",
        default: "0.5,2",
        hint: "e.g. 0.5,2 means [X] = 0.5 M with coefficient 2",
      },
      {
        id: "reactants",
        label: "Reactants — one per line: concentration,coefficient",
        kind: "textarea",
        default: "0.2,1\n0.1,1",
      },
    ],
    outputs: [
      {
        id: "kc",
        label: "Equilibrium constant Kc",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
      { id: "position", label: "Equilibrium position", format: "text" },
    ],
    compute: (i) => {
      const product = (txt: unknown) =>
        String(txt)
          .split(/\n+/)
          .map((l) => l.trim())
          .filter(Boolean)
          .reduce((acc, line) => {
            const [c, n] = line.split(",").map((s) => Number(s.trim()));
            if (!isFinite(c) || c <= 0) return NaN;
            return acc * Math.pow(c, isFinite(n) && n > 0 ? n : 1);
          }, 1);
      const num = product(i.products);
      const den = product(i.reactants);
      if (!isFinite(num) || !isFinite(den) || den === 0) return {};
      const kc = num / den;
      return {
        kc,
        position:
          kc > 1
            ? "Products favoured (Kc > 1)"
            : kc < 1
              ? "Reactants favoured (Kc < 1)"
              : "Balanced (Kc = 1)",
      };
    },
    formula: "Kc = Π[products]^coeff ÷ Π[reactants]^coeff",
  },
  {
    slug: "reaction-rate",
    inputs: [
      { id: "k", label: "Rate constant k", kind: "number", default: 0.05 },
      {
        id: "species",
        label: "Species — one per line: concentration,order",
        kind: "textarea",
        default: "0.5,1\n0.2,2",
        hint: "e.g. 0.5,1 means [A] = 0.5 M, first order",
      },
    ],
    outputs: [
      {
        id: "rate",
        label: "Reaction rate",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 6,
      },
      { id: "overallOrder", label: "Overall order", format: "number", fractionDigits: 1 },
    ],
    compute: (i) => {
      let rate = numF(i.k);
      let order = 0;
      for (const line of String(i.species).split(/\n+/)) {
        const t = line.trim();
        if (!t) continue;
        const [c, n] = t.split(",").map((s) => Number(s.trim()));
        if (!isFinite(c) || c < 0) return {};
        const ord = isFinite(n) ? n : 1;
        rate *= Math.pow(c, ord);
        order += ord;
      }
      return { rate, overallOrder: order };
    },
    formula: "Rate = k · Π [A]^order",
  },
  {
    slug: "enthalpy-change-hess",
    inputs: [
      {
        id: "steps",
        label: "Steps — one per line: factor,ΔH (kJ/mol)",
        kind: "textarea",
        default: "1,-393.5\n2,-285.8\n-1,-890.4",
        hint: "Use negative factor for a reversed step",
      },
    ],
    outputs: [
      {
        id: "deltaH",
        label: "Overall ΔH",
        format: "number",
        tone: "primary",
        big: true,
        suffix: " kJ/mol",
        fractionDigits: 2,
      },
      { id: "kind", label: "Reaction is", format: "text" },
    ],
    compute: (i) => {
      let sum = 0;
      let any = false;
      for (const line of String(i.steps).split(/\n+/)) {
        const t = line.trim();
        if (!t) continue;
        const [f, h] = t.split(",").map((s) => Number(s.trim()));
        if (!isFinite(f) || !isFinite(h)) return {};
        sum += f * h;
        any = true;
      }
      if (!any) return {};
      return {
        deltaH: sum,
        kind: sum < 0 ? "Exothermic (releases heat)" : "Endothermic (absorbs heat)",
      };
    },
    formula: "ΔH_overall = Σ (factor × ΔH_step) — Hess's law",
  },
  {
    slug: "entropy-change",
    inputs: [
      {
        id: "productsEntropy",
        label: "Products — one per line: moles,S° (J/mol·K)",
        kind: "textarea",
        default: "1,213.8",
      },
      {
        id: "reactantsEntropy",
        label: "Reactants — one per line: moles,S° (J/mol·K)",
        kind: "textarea",
        default: "1,5.7\n1,205.2",
      },
    ],
    outputs: [
      {
        id: "deltaS",
        label: "ΔS° of reaction",
        format: "number",
        tone: "primary",
        big: true,
        suffix: " J/mol·K",
        fractionDigits: 2,
      },
      { id: "trend", label: "Disorder", format: "text" },
    ],
    compute: (i) => {
      const total = (txt: unknown) =>
        String(txt)
          .split(/\n+/)
          .map((l) => l.trim())
          .filter(Boolean)
          .reduce((acc, line) => {
            const [n, s] = line.split(",").map((v) => Number(v.trim()));
            if (!isFinite(n) || !isFinite(s)) return NaN;
            return acc + n * s;
          }, 0);
      const p = total(i.productsEntropy);
      const r = total(i.reactantsEntropy);
      if (!isFinite(p) || !isFinite(r)) return {};
      const dS = p - r;
      return { deltaS: dS, trend: dS > 0 ? "Increases (more disorder)" : "Decreases (more order)" };
    },
    formula: "ΔS° = Σn·S°(products) − Σn·S°(reactants)",
  },
  {
    slug: "gibbs-free-energy",
    inputs: [
      { id: "deltaH", label: "Enthalpy change ΔH", kind: "number", default: -50, suffix: "kJ/mol" },
      { id: "tempK", label: "Temperature", kind: "number", default: 298, suffix: "K" },
      {
        id: "deltaS",
        label: "Entropy change ΔS",
        kind: "number",
        default: -0.1,
        suffix: "kJ/mol·K",
      },
    ],
    outputs: [
      {
        id: "deltaG",
        label: "Gibbs free energy ΔG",
        format: "number",
        tone: "primary",
        big: true,
        suffix: " kJ/mol",
        fractionDigits: 2,
      },
      { id: "spontaneous", label: "Spontaneity", format: "text" },
    ],
    compute: (i) => {
      const dG = numF(i.deltaH) - numF(i.tempK) * numF(i.deltaS);
      return {
        deltaG: dG,
        spontaneous:
          dG < 0
            ? "Spontaneous (ΔG < 0)"
            : dG > 0
              ? "Non-spontaneous (ΔG > 0)"
              : "At equilibrium (ΔG = 0)",
      };
    },
    formula: "ΔG = ΔH − T·ΔS",
  },
  {
    slug: "buffer-capacity",
    inputs: [
      { id: "weakAcidMol", label: "Weak acid amount", kind: "number", default: 0.1, suffix: "mol" },
      {
        id: "conjugateBaseMol",
        label: "Conjugate base amount",
        kind: "number",
        default: 0.1,
        suffix: "mol",
      },
      { id: "volumeL", label: "Solution volume", kind: "number", default: 1, suffix: "L" },
    ],
    outputs: [
      {
        id: "beta",
        label: "Buffer capacity β",
        format: "number",
        tone: "primary",
        big: true,
        suffix: " mol/L·pH",
        fractionDigits: 4,
      },
      { id: "verdict", label: "Buffering", format: "text" },
    ],
    compute: (i) => {
      const v = numF(i.volumeL);
      if (v <= 0) return {};
      const ca = numF(i.weakAcidMol) / v;
      const cb = numF(i.conjugateBaseMol) / v;
      if (ca + cb <= 0) return {};
      const beta = (2.303 * (ca * cb)) / (ca + cb);
      return {
        beta,
        verdict:
          Math.min(ca, cb) / Math.max(ca, cb) > 0.5
            ? "Strong buffering — acid/base ratio near 1:1"
            : "Weak buffering — ratio far from 1:1",
      };
    },
    formula: "β ≈ 2.303 · ([HA]·[A⁻]) / ([HA] + [A⁻])",
  },
];
