import type { CalculatorSchema } from "../schema-types";

const numF = (n: unknown) => (typeof n === "number" ? n : Number(n) || 0);

export const CONSTRUCTION_SCHEMAS: CalculatorSchema[] = [
  {
    slug: "concrete-slab",
    inputs: [
      { id: "length", label: "Length (m)", kind: "number", default: 5 },
      { id: "width", label: "Width (m)", kind: "number", default: 4 },
      { id: "depth", label: "Depth (m)", kind: "number", default: 0.15 },
    ],
    outputs: [
      {
        id: "volume",
        label: "Volume (m³)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 3,
      },
      { id: "bags50", label: "50 kg cement bags (M20 1:1.5:3)", format: "integer" },
    ],
    compute: (i) => {
      const v = numF(i.length) * numF(i.width) * numF(i.depth);
      // M20 cement ~ 320 kg/m³ → 6.4 bags
      return { volume: v, bags50: Math.ceil(v * 6.4) };
    },
  },
  {
    slug: "concrete-column",
    inputs: [
      {
        id: "shape",
        label: "Shape",
        kind: "select",
        default: "rect",
        options: [
          { value: "rect", label: "Rectangle" },
          { value: "circle", label: "Circle" },
        ],
      },
      { id: "a", label: "Width / diameter (m)", kind: "number", default: 0.3 },
      { id: "b", label: "Depth (m, rect only)", kind: "number", default: 0.3 },
      { id: "h", label: "Height (m)", kind: "number", default: 3 },
    ],
    outputs: [
      {
        id: "volume",
        label: "Volume (m³)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
      { id: "bags50", label: "Cement bags (M20)", format: "integer" },
    ],
    compute: (i) => {
      const v =
        i.shape === "rect"
          ? numF(i.a) * numF(i.b) * numF(i.h)
          : Math.PI * (numF(i.a) / 2) ** 2 * numF(i.h);
      return { volume: v, bags50: Math.ceil(v * 6.4) };
    },
  },
  {
    slug: "cement-sand-aggregate",
    inputs: [
      { id: "volume", label: "Concrete volume (m³)", kind: "number", default: 1 },
      {
        id: "mix",
        label: "Mix ratio",
        kind: "select",
        default: "1:1.5:3",
        options: [
          { value: "1:2:4", label: "M15 (1:2:4)" },
          { value: "1:1.5:3", label: "M20 (1:1.5:3)" },
          { value: "1:1:2", label: "M25 (1:1:2)" },
        ],
      },
    ],
    outputs: [
      { id: "cement", label: "Cement (bags 50kg)", format: "integer", tone: "primary", big: true },
      { id: "sand", label: "Sand (m³)", format: "number", fractionDigits: 3 },
      { id: "aggregate", label: "Aggregate (m³)", format: "number", fractionDigits: 3 },
    ],
    compute: (i) => {
      const [a, b, c] = String(i.mix).split(":").map(Number);
      const sum = a + b + c;
      const dry = numF(i.volume) * 1.54;
      const cementVol = (dry * a) / sum;
      return {
        cement: Math.ceil((cementVol * 1440) / 50),
        sand: (dry * b) / sum,
        aggregate: (dry * c) / sum,
      };
    },
  },
  {
    slug: "mortar-plaster",
    inputs: [
      { id: "area", label: "Wall area (m²)", kind: "number", default: 50 },
      { id: "thickness", label: "Thickness (mm)", kind: "number", default: 12 },
      {
        id: "mix",
        label: "Mix ratio",
        kind: "select",
        default: "1:6",
        options: [
          { value: "1:4", label: "1:4" },
          { value: "1:5", label: "1:5" },
          { value: "1:6", label: "1:6" },
        ],
      },
    ],
    outputs: [
      { id: "cement", label: "Cement (bags 50kg)", format: "integer", tone: "primary", big: true },
      { id: "sand", label: "Sand (m³)", format: "number", fractionDigits: 3 },
    ],
    compute: (i) => {
      const wet = numF(i.area) * (numF(i.thickness) / 1000);
      const dry = wet * 1.27;
      const [a, b] = String(i.mix).split(":").map(Number);
      const sum = a + b;
      const cementVol = (dry * a) / sum;
      return { cement: Math.ceil((cementVol * 1440) / 50), sand: (dry * b) / sum };
    },
  },
  {
    slug: "brick-count",
    inputs: [
      { id: "wallL", label: "Wall length (m)", kind: "number", default: 10 },
      { id: "wallH", label: "Wall height (m)", kind: "number", default: 3 },
      { id: "thickness", label: "Wall thickness (mm)", kind: "number", default: 230 },
    ],
    outputs: [
      { id: "bricks", label: "Bricks needed", format: "integer", tone: "primary", big: true },
      { id: "mortar", label: "Mortar (m³)", format: "number", fractionDigits: 3 },
    ],
    compute: (i) => {
      const wallVol = numF(i.wallL) * numF(i.wallH) * (numF(i.thickness) / 1000);
      // 1 m³ wall = ~500 bricks (standard 230×110×75 mm with mortar)
      return { bricks: Math.ceil(wallVol * 500 * 1.05), mortar: wallVol * 0.3 };
    },
  },
  {
    slug: "block-count",
    inputs: [
      { id: "wallArea", label: "Wall area (m²)", kind: "number", default: 30 },
      { id: "blockL", label: "Block length (cm)", kind: "number", default: 40 },
      { id: "blockH", label: "Block height (cm)", kind: "number", default: 20 },
    ],
    outputs: [
      { id: "blocks", label: "Blocks needed", format: "integer", tone: "primary", big: true },
    ],
    compute: (i) => {
      const blockArea = (numF(i.blockL) * numF(i.blockH)) / 10000;
      return { blocks: Math.ceil((numF(i.wallArea) / blockArea) * 1.05) };
    },
  },
  {
    slug: "tile",
    inputs: [
      { id: "roomArea", label: "Room area (m²)", kind: "number", default: 20 },
      { id: "tileL", label: "Tile length (cm)", kind: "number", default: 60 },
      { id: "tileW", label: "Tile width (cm)", kind: "number", default: 60 },
      { id: "waste", label: "Waste %", kind: "percent", default: 10 },
    ],
    outputs: [
      { id: "tiles", label: "Tiles needed", format: "integer", tone: "primary", big: true },
      { id: "boxes", label: "Boxes of 4 tiles", format: "integer" },
    ],
    compute: (i) => {
      const tileArea = (numF(i.tileL) * numF(i.tileW)) / 10000;
      const count = Math.ceil((numF(i.roomArea) / tileArea) * (1 + numF(i.waste) / 100));
      return { tiles: count, boxes: Math.ceil(count / 4) };
    },
  },
  {
    slug: "flooring",
    inputs: [
      { id: "area", label: "Room area (m²)", kind: "number", default: 25 },
      { id: "plankArea", label: "Plank area (m²)", kind: "number", default: 0.3, step: 0.01 },
      { id: "waste", label: "Waste %", kind: "percent", default: 10 },
    ],
    outputs: [
      { id: "planks", label: "Planks needed", format: "integer", tone: "primary", big: true },
    ],
    compute: (i) => ({
      planks: Math.ceil((numF(i.area) / numF(i.plankArea)) * (1 + numF(i.waste) / 100)),
    }),
  },
  {
    slug: "carpet",
    inputs: [
      { id: "length", label: "Room length (m)", kind: "number", default: 5 },
      { id: "width", label: "Room width (m)", kind: "number", default: 4 },
      { id: "rollWidth", label: "Roll width (m)", kind: "number", default: 3.66 },
      { id: "waste", label: "Waste %", kind: "percent", default: 10 },
    ],
    outputs: [
      { id: "length", label: "Carpet length (m)", format: "number", fractionDigits: 2 },
      {
        id: "area",
        label: "Carpet area (m²)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 2,
      },
    ],
    compute: (i) => {
      const strips = Math.ceil(numF(i.width) / numF(i.rollWidth));
      const len = strips * numF(i.length) * (1 + numF(i.waste) / 100);
      return { length: len, area: len * numF(i.rollWidth) };
    },
  },
  {
    slug: "paint",
    inputs: [
      { id: "wallArea", label: "Wall area (m²)", kind: "number", default: 100 },
      { id: "coats", label: "Coats", kind: "number", default: 2 },
      { id: "coverage", label: "Coverage (m²/L)", kind: "number", default: 10 },
    ],
    outputs: [
      {
        id: "litres",
        label: "Paint needed (L)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 1,
      },
      { id: "cans4L", label: "4L cans", format: "integer" },
    ],
    compute: (i) => {
      const total = (numF(i.wallArea) * numF(i.coats)) / numF(i.coverage);
      return { litres: total, cans4L: Math.ceil(total / 4) };
    },
  },
  {
    slug: "wallpaper",
    inputs: [
      { id: "wallArea", label: "Wall area (m²)", kind: "number", default: 60 },
      { id: "rollArea", label: "Roll area (m²)", kind: "number", default: 5.3 },
      { id: "waste", label: "Waste %", kind: "percent", default: 15 },
    ],
    outputs: [
      { id: "rolls", label: "Rolls needed", format: "integer", tone: "primary", big: true },
    ],
    compute: (i) => ({
      rolls: Math.ceil((numF(i.wallArea) / numF(i.rollArea)) * (1 + numF(i.waste) / 100)),
    }),
  },
  {
    slug: "roofing",
    inputs: [
      { id: "roofArea", label: "Roof area (m²)", kind: "number", default: 100 },
      { id: "shingleCoverage", label: "Shingles per m²", kind: "number", default: 4 },
      { id: "waste", label: "Waste %", kind: "percent", default: 10 },
    ],
    outputs: [
      { id: "shingles", label: "Shingles needed", format: "integer", tone: "primary", big: true },
    ],
    compute: (i) => ({
      shingles: Math.ceil(numF(i.roofArea) * numF(i.shingleCoverage) * (1 + numF(i.waste) / 100)),
    }),
  },
  {
    slug: "roof-pitch",
    inputs: [
      { id: "rise", label: "Rise (m)", kind: "number", default: 3 },
      { id: "run", label: "Run (m)", kind: "number", default: 6 },
    ],
    outputs: [
      {
        id: "angle",
        label: "Pitch angle (deg)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 2,
      },
      { id: "ratio", label: "Pitch ratio", format: "text" },
      { id: "slope", label: "Slope length (m)", format: "number", fractionDigits: 3 },
    ],
    compute: (i) => {
      const angle = (Math.atan(numF(i.rise) / Math.max(0.001, numF(i.run))) * 180) / Math.PI;
      return {
        angle,
        ratio: `${numF(i.rise)}:${numF(i.run)}`,
        slope: Math.sqrt(numF(i.rise) ** 2 + numF(i.run) ** 2),
      };
    },
  },
  {
    slug: "drywall",
    inputs: [
      { id: "wallArea", label: "Wall area (m²)", kind: "number", default: 100 },
      { id: "sheetArea", label: "Sheet area (m²)", kind: "number", default: 2.97 },
    ],
    outputs: [
      { id: "sheets", label: "Sheets needed", format: "integer", tone: "primary", big: true },
    ],
    compute: (i) => ({ sheets: Math.ceil((numF(i.wallArea) / numF(i.sheetArea)) * 1.1) }),
  },
  {
    slug: "lumber-board-feet",
    inputs: [
      { id: "qty", label: "Quantity", kind: "number", default: 10 },
      { id: "thickness", label: "Thickness (inches)", kind: "number", default: 2 },
      { id: "width", label: "Width (inches)", kind: "number", default: 6 },
      { id: "length", label: "Length (feet)", kind: "number", default: 8 },
    ],
    outputs: [
      {
        id: "bf",
        label: "Board feet",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 2,
      },
    ],
    compute: (i) => ({
      bf: (numF(i.qty) * numF(i.thickness) * numF(i.width) * numF(i.length)) / 12,
    }),
  },
  {
    slug: "stud-wall",
    inputs: [
      { id: "wallLength", label: "Wall length (m)", kind: "number", default: 6 },
      { id: "spacing", label: "Stud spacing (cm)", kind: "number", default: 40 },
    ],
    outputs: [
      { id: "studs", label: "Studs required", format: "integer", tone: "primary", big: true },
    ],
    compute: (i) => ({ studs: Math.ceil((numF(i.wallLength) * 100) / numF(i.spacing)) + 1 }),
  },
  {
    slug: "rebar",
    inputs: [
      { id: "length", label: "Slab length (m)", kind: "number", default: 5 },
      { id: "width", label: "Slab width (m)", kind: "number", default: 4 },
      { id: "spacing", label: "Spacing (cm)", kind: "number", default: 20 },
    ],
    outputs: [
      { id: "barsL", label: "Bars along length", format: "integer" },
      { id: "barsW", label: "Bars along width", format: "integer" },
      {
        id: "totalLength",
        label: "Total bar length (m)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 2,
      },
    ],
    compute: (i) => {
      const bL = Math.ceil((numF(i.length) * 100) / numF(i.spacing)) + 1;
      const bW = Math.ceil((numF(i.width) * 100) / numF(i.spacing)) + 1;
      return { barsL: bL, barsW: bW, totalLength: bL * numF(i.width) + bW * numF(i.length) };
    },
  },
  {
    slug: "stair",
    inputs: [
      { id: "totalRise", label: "Total rise (cm)", kind: "number", default: 280 },
      { id: "totalRun", label: "Total run (cm)", kind: "number", default: 400 },
      { id: "riserHeight", label: "Riser height (cm)", kind: "number", default: 18 },
    ],
    outputs: [
      { id: "steps", label: "Number of steps", format: "integer", tone: "primary", big: true },
      { id: "treadDepth", label: "Tread depth (cm)", format: "number", fractionDigits: 2 },
    ],
    compute: (i) => {
      const steps = Math.ceil(numF(i.totalRise) / numF(i.riserHeight));
      return { steps, treadDepth: numF(i.totalRun) / Math.max(1, steps) };
    },
  },
  {
    slug: "mulch-topsoil",
    inputs: [
      { id: "length", label: "Length (m)", kind: "number", default: 10 },
      { id: "width", label: "Width (m)", kind: "number", default: 3 },
      { id: "depth", label: "Depth (cm)", kind: "number", default: 5 },
    ],
    outputs: [
      {
        id: "volume",
        label: "Volume (m³)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 3,
      },
    ],
    compute: (i) => ({ volume: numF(i.length) * numF(i.width) * (numF(i.depth) / 100) }),
  },
  {
    slug: "gravel",
    inputs: [
      { id: "area", label: "Area (m²)", kind: "number", default: 30 },
      { id: "depth", label: "Depth (cm)", kind: "number", default: 5 },
      { id: "density", label: "Density (kg/m³)", kind: "number", default: 1680 },
    ],
    outputs: [
      { id: "volume", label: "Volume (m³)", format: "number", fractionDigits: 3 },
      { id: "weight", label: "Weight (kg)", format: "integer", tone: "primary", big: true },
    ],
    compute: (i) => {
      const v = numF(i.area) * (numF(i.depth) / 100);
      return { volume: v, weight: v * numF(i.density) };
    },
  },
  {
    slug: "fence",
    inputs: [
      { id: "length", label: "Total length (m)", kind: "number", default: 30 },
      { id: "spacing", label: "Post spacing (m)", kind: "number", default: 2.5 },
    ],
    outputs: [
      { id: "posts", label: "Posts needed", format: "integer", tone: "primary", big: true },
      { id: "panels", label: "Panels needed", format: "integer" },
    ],
    compute: (i) => {
      const posts = Math.ceil(numF(i.length) / numF(i.spacing)) + 1;
      return { posts, panels: posts - 1 };
    },
  },
  {
    slug: "pool-volume",
    inputs: [
      {
        id: "shape",
        label: "Shape",
        kind: "select",
        default: "rect",
        options: [
          { value: "rect", label: "Rectangle" },
          { value: "round", label: "Round" },
        ],
      },
      { id: "a", label: "Length / diameter (m)", kind: "number", default: 10 },
      { id: "b", label: "Width (m, rect)", kind: "number", default: 5 },
      { id: "depth", label: "Avg depth (m)", kind: "number", default: 1.5 },
    ],
    outputs: [
      { id: "volume", label: "Water volume (m³)", format: "number", fractionDigits: 2 },
      { id: "litres", label: "Litres", format: "integer", tone: "primary", big: true },
    ],
    compute: (i) => {
      const a = numF(i.a),
        b = numF(i.b),
        d = numF(i.depth);
      const v = i.shape === "rect" ? a * b * d : Math.PI * (a / 2) ** 2 * d;
      return { volume: v, litres: v * 1000 };
    },
  },
  // ── batch 4 — engineering (structural) ───────────────────────────────────
  {
    slug: "safety-factor",
    inputs: [
      { id: "strength", label: "Ultimate strength", kind: "number", default: 400, suffix: "MPa" },
      { id: "workingStress", label: "Working stress", kind: "number", default: 120, suffix: "MPa" },
    ],
    outputs: [
      {
        id: "fos",
        label: "Factor of safety",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 2,
      },
      { id: "verdict", label: "Verdict", format: "text" },
    ],
    compute: (i) => {
      const s = numF(i.strength);
      const w = numF(i.workingStress);
      if (w <= 0) return {};
      const fos = s / w;
      return {
        fos,
        verdict:
          fos >= 2
            ? "Safe (FoS ≥ 2)"
            : fos >= 1.5
              ? "Marginal (1.5 ≤ FoS < 2)"
              : "Unsafe (FoS < 1.5)",
      };
    },
    formula: "FoS = ultimate strength ÷ working stress",
  },
  {
    slug: "column-load",
    inputs: [
      { id: "area", label: "Cross-section area", kind: "number", default: 0.16, suffix: "m²" },
      {
        id: "allowableStress",
        label: "Allowable stress",
        kind: "number",
        default: 15000,
        suffix: "kN/m²",
      },
    ],
    outputs: [
      {
        id: "pAllow",
        label: "Allowable axial load",
        format: "number",
        tone: "primary",
        big: true,
        suffix: " kN",
        fractionDigits: 1,
      },
    ],
    compute: (i) => ({ pAllow: numF(i.allowableStress) * numF(i.area) }),
    formula: "P_allow = σ_allow × A",
  },
  {
    slug: "foundation-design",
    inputs: [
      { id: "load", label: "Column load", kind: "number", default: 800, suffix: "kN" },
      { id: "sbc", label: "Safe bearing capacity", kind: "number", default: 200, suffix: "kN/m²" },
      { id: "fos", label: "Factor of safety", kind: "number", default: 2 },
    ],
    outputs: [
      {
        id: "area",
        label: "Required footing area",
        format: "number",
        tone: "primary",
        big: true,
        suffix: " m²",
        fractionDigits: 2,
      },
      {
        id: "sideM",
        label: "Square footing side",
        format: "number",
        suffix: " m",
        fractionDigits: 2,
      },
    ],
    compute: (i) => {
      const sbc = numF(i.sbc);
      if (sbc <= 0) return {};
      const area = (numF(i.load) * numF(i.fos)) / sbc;
      return { area, sideM: Math.sqrt(area) };
    },
    formula: "A_req = (Load × FoS) ÷ SBC; side = √A",
  },
  {
    slug: "moment-of-inertia-shape",
    inputs: [
      {
        id: "shape",
        label: "Shape",
        kind: "select",
        default: "rect",
        options: [
          { value: "rect", label: "Rectangle (b × h)" },
          { value: "circle", label: "Circle (diameter d)" },
          { value: "triangle", label: "Triangle (b × h)" },
        ],
      },
      { id: "b", label: "Width b", kind: "number", default: 0.1, suffix: "m" },
      { id: "h", label: "Height h", kind: "number", default: 0.2, suffix: "m" },
      { id: "d", label: "Diameter d (circle)", kind: "number", default: 0.1, suffix: "m" },
    ],
    outputs: [
      {
        id: "momentI",
        label: "Moment of inertia I",
        format: "number",
        tone: "primary",
        big: true,
        suffix: " m⁴",
        fractionDigits: 8,
      },
      {
        id: "centroidY",
        label: "Centroid height ȳ",
        format: "number",
        suffix: " m",
        fractionDigits: 4,
      },
    ],
    compute: (i) => {
      const b = numF(i.b);
      const h = numF(i.h);
      const d = numF(i.d);
      switch (String(i.shape)) {
        case "circle":
          return { momentI: (Math.PI * Math.pow(d, 4)) / 64, centroidY: d / 2 };
        case "triangle":
          return { momentI: (b * Math.pow(h, 3)) / 36, centroidY: h / 3 };
        default:
          return { momentI: (b * Math.pow(h, 3)) / 12, centroidY: h / 2 };
      }
    },
    formula: "Rect I = bh³/12 · Circle I = πd⁴/64 · Triangle I = bh³/36",
  },
  {
    slug: "section-modulus",
    inputs: [
      {
        id: "momentI",
        label: "Moment of inertia I",
        kind: "number",
        default: 0.000001,
        suffix: "m⁴",
      },
      { id: "c", label: "Distance to extreme fibre c", kind: "number", default: 0.05, suffix: "m" },
    ],
    outputs: [
      {
        id: "secMod",
        label: "Section modulus S",
        format: "number",
        tone: "primary",
        big: true,
        suffix: " m³",
        fractionDigits: 8,
      },
    ],
    compute: (i) => {
      const c = numF(i.c);
      if (c <= 0) return {};
      return { secMod: numF(i.momentI) / c };
    },
    formula: "S = I ÷ c",
  },
  {
    slug: "truss-load",
    inputs: [
      { id: "loadKn", label: "Vertical load at joint", kind: "number", default: 10, suffix: "kN" },
      {
        id: "angle1Deg",
        label: "Member 1 angle from horizontal",
        kind: "number",
        default: 45,
        suffix: "°",
      },
      {
        id: "angle2Deg",
        label: "Member 2 angle from horizontal",
        kind: "number",
        default: 135,
        suffix: "°",
      },
    ],
    outputs: [
      {
        id: "f1",
        label: "Member 1 force",
        format: "number",
        tone: "primary",
        big: true,
        suffix: " kN",
        fractionDigits: 2,
      },
      { id: "f2", label: "Member 2 force", format: "number", suffix: " kN", fractionDigits: 2 },
      { id: "note", label: "Sign convention", format: "text" },
    ],
    compute: (i) => {
      // Method of joints at a single pin: two members at angles θ1, θ2 carry a downward load P.
      // ΣFx = 0: F1·cosθ1 + F2·cosθ2 = 0 ; ΣFy = 0: F1·sinθ1 + F2·sinθ2 = P
      const p = numF(i.loadKn);
      const a1 = (numF(i.angle1Deg) * Math.PI) / 180;
      const a2 = (numF(i.angle2Deg) * Math.PI) / 180;
      const det = Math.cos(a1) * Math.sin(a2) - Math.cos(a2) * Math.sin(a1);
      if (Math.abs(det) < 1e-9) return { note: "Members are collinear — joint cannot be solved" };
      const f2 = (p * Math.cos(a1)) / det;
      const cos1 = Math.cos(a1);
      const f1 =
        Math.abs(cos1) < 1e-9
          ? p / Math.sin(a1) - (f2 * Math.sin(a2)) / Math.sin(a1)
          : (-f2 * Math.cos(a2)) / cos1;
      return { f1, f2, note: "Positive = tension, negative = compression" };
    },
    formula: "Joint equilibrium: ΣFx = 0, ΣFy = 0 (positive = tension)",
  },
  {
    slug: "load-combination",
    inputs: [
      { id: "dl", label: "Dead load (DL)", kind: "number", default: 10, suffix: "kN/m²" },
      { id: "ll", label: "Live load (LL)", kind: "number", default: 5, suffix: "kN/m²" },
      { id: "wl", label: "Wind load (WL)", kind: "number", default: 3, suffix: "kN/m²" },
      {
        id: "code",
        label: "Design code",
        kind: "select",
        default: "IS875",
        options: [
          { value: "IS875", label: "IS 456 / IS 875 (India)" },
          { value: "ASCE", label: "ASCE 7 (US)" },
        ],
      },
    ],
    outputs: [
      {
        id: "worstCase",
        label: "Governing factored load",
        format: "number",
        tone: "primary",
        big: true,
        suffix: " kN/m²",
        fractionDigits: 2,
      },
      { id: "combinations", label: "All combinations", format: "text" },
    ],
    compute: (i) => {
      const dl = numF(i.dl);
      const ll = numF(i.ll);
      const wl = numF(i.wl);
      const combos: Array<[string, number]> =
        String(i.code) === "ASCE"
          ? [
              ["1.4DL", 1.4 * dl],
              ["1.2DL + 1.6LL", 1.2 * dl + 1.6 * ll],
              ["1.2DL + 1.0LL + 1.0WL", 1.2 * dl + 1.0 * ll + 1.0 * wl],
              ["0.9DL + 1.0WL", 0.9 * dl + 1.0 * wl],
            ]
          : [
              ["1.5(DL + LL)", 1.5 * (dl + ll)],
              ["1.2(DL + LL + WL)", 1.2 * (dl + ll + wl)],
              ["1.5(DL + WL)", 1.5 * (dl + wl)],
              ["0.9DL + 1.5WL", 0.9 * dl + 1.5 * wl],
            ];
      const worst = combos.reduce((m, c) => Math.max(m, c[1]), 0);
      return {
        worstCase: worst,
        combinations: combos.map(([n, v]) => `${n} = ${v.toFixed(2)}`).join(" · "),
      };
    },
    formula: "Governing = max of code-factored DL/LL/WL combinations",
  },
  {
    slug: "dead-live-load",
    inputs: [
      { id: "slabThicknessM", label: "Slab thickness", kind: "number", default: 0.15, suffix: "m" },
      {
        id: "concreteDensity",
        label: "Concrete unit weight",
        kind: "number",
        default: 25,
        suffix: "kN/m³",
      },
      {
        id: "finishThicknessM",
        label: "Floor finish thickness",
        kind: "number",
        default: 0.05,
        suffix: "m",
      },
      {
        id: "finishDensity",
        label: "Finish unit weight",
        kind: "number",
        default: 20,
        suffix: "kN/m³",
      },
      {
        id: "liveKnM2",
        label: "Live load (per code)",
        kind: "number",
        default: 4,
        suffix: "kN/m²",
      },
    ],
    outputs: [
      {
        id: "totalKnM2",
        label: "Total load",
        format: "number",
        tone: "primary",
        big: true,
        suffix: " kN/m²",
        fractionDigits: 2,
      },
      { id: "dl", label: "Dead load", format: "number", suffix: " kN/m²", fractionDigits: 2 },
      { id: "ll", label: "Live load", format: "number", suffix: " kN/m²", fractionDigits: 2 },
    ],
    compute: (i) => {
      const dl =
        numF(i.slabThicknessM) * numF(i.concreteDensity) +
        numF(i.finishThicknessM) * numF(i.finishDensity);
      const ll = numF(i.liveKnM2);
      return { totalKnM2: dl + ll, dl, ll };
    },
    formula: "DL = slab·ρc + finish·ρf ; total = DL + LL",
  },
  {
    slug: "asphalt-quantity",
    inputs: [
      { id: "areaM2", label: "Paved area", kind: "number", default: 500, suffix: "m²" },
      { id: "thicknessMm", label: "Layer thickness", kind: "number", default: 50, suffix: "mm" },
      {
        id: "densityKgM3",
        label: "Asphalt density",
        kind: "number",
        default: 2400,
        suffix: "kg/m³",
      },
      { id: "ratePerTon", label: "Rate per tonne", kind: "currency", default: 6000, prefix: "₹" },
    ],
    outputs: [
      {
        id: "tons",
        label: "Asphalt required",
        format: "number",
        tone: "primary",
        big: true,
        suffix: " t",
        fractionDigits: 2,
      },
      { id: "costEstimate", label: "Cost estimate", format: "currency-inr" },
    ],
    compute: (i) => {
      const tons = (numF(i.areaM2) * (numF(i.thicknessMm) / 1000) * numF(i.densityKgM3)) / 1000;
      return { tons, costEstimate: tons * numF(i.ratePerTon) };
    },
    formula: "tonnes = area × (thickness ÷ 1000) × density ÷ 1000",
  },
];
