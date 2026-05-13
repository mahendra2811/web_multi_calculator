import type { CalculatorSchema } from "../schema-types";

const numF = (n: unknown) => (typeof n === "number" ? n : Number(n) || 0);

export const COOKING_SCHEMAS: CalculatorSchema[] = [
  {
    slug: "recipe-scaler",
    inputs: [
      { id: "oldServings", label: "Original servings", kind: "number", default: 4 },
      { id: "newServings", label: "Desired servings", kind: "number", default: 6 },
      { id: "ingredient", label: "Ingredient amount", kind: "number", default: 250 },
    ],
    outputs: [
      { id: "factor", label: "Scale factor", format: "number", fractionDigits: 3 },
      {
        id: "scaled",
        label: "Scaled amount",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 2,
      },
    ],
    compute: (i) => {
      const f = numF(i.newServings) / Math.max(0.001, numF(i.oldServings));
      return { factor: f, scaled: numF(i.ingredient) * f };
    },
  },
  {
    slug: "cups-to-grams",
    inputs: [
      { id: "cups", label: "Cups", kind: "number", default: 1, step: 0.25 },
      {
        id: "ingredient",
        label: "Ingredient",
        kind: "select",
        default: "flour",
        options: [
          { value: "flour", label: "Flour" },
          { value: "sugar", label: "Sugar (white)" },
          { value: "butter", label: "Butter" },
          { value: "rice", label: "Rice (uncooked)" },
          { value: "oil", label: "Oil" },
          { value: "honey", label: "Honey" },
        ],
      },
    ],
    outputs: [{ id: "grams", label: "Grams", format: "integer", tone: "primary", big: true }],
    compute: (i) => {
      const D: Record<string, number> = {
        flour: 120,
        sugar: 200,
        butter: 227,
        rice: 200,
        oil: 224,
        honey: 340,
      };
      return { grams: numF(i.cups) * (D[String(i.ingredient)] ?? 200) };
    },
  },
  {
    slug: "tbsp-tsp-ml",
    inputs: [
      { id: "value", label: "Amount", kind: "number", default: 1 },
      {
        id: "from",
        label: "From",
        kind: "select",
        default: "tbsp",
        options: [
          { value: "tbsp", label: "Tablespoon" },
          { value: "tsp", label: "Teaspoon" },
          { value: "ml", label: "Milliliter" },
          { value: "fl_oz", label: "Fluid ounce" },
          { value: "cup", label: "Cup" },
        ],
      },
      {
        id: "to",
        label: "To",
        kind: "select",
        default: "tsp",
        options: [
          { value: "tbsp", label: "Tablespoon" },
          { value: "tsp", label: "Teaspoon" },
          { value: "ml", label: "Milliliter" },
          { value: "fl_oz", label: "Fluid ounce" },
          { value: "cup", label: "Cup" },
        ],
      },
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
      const ML: Record<string, number> = {
        tbsp: 14.787,
        tsp: 4.929,
        ml: 1,
        fl_oz: 29.574,
        cup: 236.588,
      };
      const ml = numF(i.value) * (ML[String(i.from)] ?? 1);
      return { result: ml / (ML[String(i.to)] ?? 1) };
    },
  },
  {
    slug: "oven-temp",
    inputs: [
      { id: "value", label: "Temperature", kind: "number", default: 180 },
      {
        id: "from",
        label: "From",
        kind: "select",
        default: "C",
        options: [
          { value: "C", label: "Celsius" },
          { value: "F", label: "Fahrenheit" },
          { value: "gas", label: "Gas Mark" },
        ],
      },
    ],
    outputs: [
      { id: "celsius", label: "Celsius", format: "integer", suffix: " °C" },
      {
        id: "fahrenheit",
        label: "Fahrenheit",
        format: "integer",
        suffix: " °F",
        tone: "primary",
        big: true,
      },
      { id: "gasMark", label: "Gas Mark", format: "number", fractionDigits: 1 },
    ],
    compute: (i) => {
      const v = numF(i.value);
      let c = v;
      if (i.from === "F") c = ((v - 32) * 5) / 9;
      else if (i.from === "gas") c = 135 + v * 14;
      return { celsius: c, fahrenheit: (c * 9) / 5 + 32, gasMark: Math.max(0.5, (c - 135) / 14) };
    },
  },
  {
    slug: "pan-conversion",
    inputs: [
      {
        id: "shapeA",
        label: "Original shape",
        kind: "select",
        default: "rect",
        options: [
          { value: "rect", label: "Rectangle" },
          { value: "round", label: "Round" },
        ],
      },
      { id: "aA", label: "Dim A", kind: "number", default: 23 },
      { id: "bA", label: "Dim B (rect)", kind: "number", default: 23 },
      {
        id: "shapeB",
        label: "New shape",
        kind: "select",
        default: "round",
        options: [
          { value: "rect", label: "Rectangle" },
          { value: "round", label: "Round" },
        ],
      },
      { id: "aB", label: "New Dim A", kind: "number", default: 23 },
      { id: "bB", label: "New Dim B (rect)", kind: "number", default: 0 },
    ],
    outputs: [
      {
        id: "ratio",
        label: "Volume ratio (new/old)",
        format: "percent",
        tone: "primary",
        big: true,
        fractionDigits: 1,
      },
    ],
    compute: (i) => {
      const area = (shape: unknown, a: number, b: number) =>
        shape === "rect" ? a * b : Math.PI * (a / 2) ** 2;
      const old = area(i.shapeA, numF(i.aA), numF(i.bA));
      const nw = area(i.shapeB, numF(i.aB), numF(i.bB));
      return { ratio: old === 0 ? 0 : (nw / old) * 100 };
    },
  },
  {
    slug: "cooking-time",
    inputs: [
      { id: "weight", label: "Weight (kg)", kind: "number", default: 2, step: 0.1 },
      {
        id: "meat",
        label: "Meat",
        kind: "select",
        default: "chicken",
        options: [
          { value: "chicken", label: "Chicken (45 min/kg)" },
          { value: "beef_rare", label: "Beef rare (40)" },
          { value: "beef_med", label: "Beef medium (50)" },
          { value: "beef_well", label: "Beef well (60)" },
          { value: "pork", label: "Pork (60)" },
          { value: "lamb", label: "Lamb (55)" },
          { value: "turkey", label: "Turkey (35)" },
        ],
      },
    ],
    outputs: [{ id: "time", label: "Cook time", format: "text", tone: "primary", big: true }],
    compute: (i) => {
      const M: Record<string, number> = {
        chicken: 45,
        beef_rare: 40,
        beef_med: 50,
        beef_well: 60,
        pork: 60,
        lamb: 55,
        turkey: 35,
      };
      const totalMin = numF(i.weight) * (M[String(i.meat)] ?? 45);
      return { time: `${Math.floor(totalMin / 60)}h ${Math.round(totalMin % 60)}m` };
    },
  },
  {
    slug: "yeast-sugar",
    inputs: [{ id: "flour", label: "Flour (g)", kind: "number", default: 500 }],
    outputs: [
      { id: "yeast", label: "Active dry yeast (g)", format: "number", fractionDigits: 1 },
      { id: "salt", label: "Salt (g)", format: "number", fractionDigits: 1 },
      { id: "water", label: "Water (ml)", format: "integer", tone: "primary", big: true },
      { id: "sugar", label: "Sugar (g)", format: "number", fractionDigits: 1 },
    ],
    compute: (i) => {
      const f = numF(i.flour);
      return { yeast: f * 0.014, salt: f * 0.02, water: f * 0.65, sugar: f * 0.01 };
    },
  },
  {
    slug: "coffee-ratio",
    inputs: [
      { id: "water", label: "Water (g/ml)", kind: "number", default: 300 },
      { id: "ratio", label: "Brew ratio (1:N)", kind: "number", default: 16 },
    ],
    outputs: [
      {
        id: "coffee",
        label: "Coffee (g)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 1,
      },
    ],
    compute: (i) => ({ coffee: numF(i.water) / Math.max(1, numF(i.ratio)) }),
  },
  {
    slug: "abv",
    inputs: [
      { id: "og", label: "Original gravity (OG)", kind: "number", default: 1.05, step: 0.001 },
      { id: "fg", label: "Final gravity (FG)", kind: "number", default: 1.01, step: 0.001 },
    ],
    outputs: [
      { id: "abv", label: "ABV", format: "percent", tone: "primary", big: true, fractionDigits: 2 },
    ],
    compute: (i) => ({ abv: (numF(i.og) - numF(i.fg)) * 131.25 }),
  },
  {
    slug: "macros-per-recipe",
    inputs: [
      { id: "servings", label: "Servings", kind: "number", default: 4 },
      { id: "protein", label: "Total protein (g)", kind: "number", default: 80 },
      { id: "carbs", label: "Total carbs (g)", kind: "number", default: 200 },
      { id: "fats", label: "Total fats (g)", kind: "number", default: 50 },
    ],
    outputs: [
      {
        id: "calsPerServing",
        label: "Calories per serving",
        format: "integer",
        tone: "primary",
        big: true,
      },
      {
        id: "proteinPerServing",
        label: "Protein/serving",
        format: "number",
        suffix: " g",
        fractionDigits: 1,
      },
      {
        id: "carbsPerServing",
        label: "Carbs/serving",
        format: "number",
        suffix: " g",
        fractionDigits: 1,
      },
      {
        id: "fatsPerServing",
        label: "Fats/serving",
        format: "number",
        suffix: " g",
        fractionDigits: 1,
      },
    ],
    compute: (i) => {
      const s = Math.max(1, numF(i.servings));
      const cal = numF(i.protein) * 4 + numF(i.carbs) * 4 + numF(i.fats) * 9;
      return {
        calsPerServing: cal / s,
        proteinPerServing: numF(i.protein) / s,
        carbsPerServing: numF(i.carbs) / s,
        fatsPerServing: numF(i.fats) / s,
      };
    },
  },
];
