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
];
