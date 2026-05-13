import type { Category } from "@/types/calculator";

const UNSPLASH = "https://images.unsplash.com";
const PARAMS = "w=1600&h=900&fit=crop&auto=format&q=70";

export const CATEGORY_COVERS: Record<Category, { id: string; alt: string }> = {
  finance: {
    id: "photo-1554224155-6726b3ff858f",
    alt: "Stack of coins on a chart printout — finance theme",
  },
  math: {
    id: "photo-1635070041078-e363dbe005cb",
    alt: "Chalkboard with mathematical formulas — math theme",
  },
  health: {
    id: "photo-1571019613454-1cb2f99b2d8b",
    alt: "Apple, dumbbell and tape measure on a wood surface — health theme",
  },
  converter: {
    id: "photo-1518349619113-03114f06ac3a",
    alt: "Old measuring tools and rulers on a desk — converter theme",
  },
  datetime: {
    id: "photo-1501139083538-0139583c060f",
    alt: "Vintage clocks arranged on a wall — date and time theme",
  },
  crypto: {
    id: "photo-1639762681485-074b7f938ba0",
    alt: "Bitcoin coins on a candlestick chart screen — crypto theme",
  },
};

export const CALCULATOR_COVERS: Record<string, { id: string; alt: string }> = {
  sip: {
    id: "photo-1611974789855-9c2a0a7236a3",
    alt: "Coin jar with plant growing — SIP investing",
  },
  emi: { id: "photo-1554224154-26032ffc0d07", alt: "House model and calculator — EMI" },
  bmi: { id: "photo-1532635241-17e820acc59f", alt: "Weighing scale and tape — BMI" },
  mortgage: { id: "photo-1564013799919-ab600027ffc6", alt: "House keys on the table — mortgage" },
  "currency-converter": {
    id: "photo-1526304640581-d334cdbbf45e",
    alt: "Multiple banknotes fanned out — currency",
  },
  age: { id: "photo-1517842645767-c639042777db", alt: "Calendar pages and clock — age" },
  "discount-calculator": {
    id: "photo-1607082348824-0a96f2a4b9da",
    alt: "Sale tags hanging — discount",
  },
  gst: { id: "photo-1554224155-3a589877462a", alt: "Receipts and a pen — taxes" },
  "percentage-calculator": {
    id: "photo-1543286386-713bdd548da4",
    alt: "Pie chart on paper — percentages",
  },
  "compound-interest": {
    id: "photo-1579621970795-87facc2f976d",
    alt: "Growing stack of coins — compounding",
  },
  basic: { id: "photo-1554224311-90b76fc3a8c0", alt: "Vintage calculator — basic arithmetic" },
  lumpsum: { id: "photo-1592495981453-d3315eb9f2c2", alt: "Pile of currency — lumpsum" },
  default: { id: "photo-1554224155-6726b3ff858f", alt: "Charts and calculator on a desk" },
};

export function unsplashUrl(photoId: string): string {
  return `${UNSPLASH}/${photoId}?${PARAMS}`;
}

export function coverForCategory(category: Category): { url: string; alt: string } {
  const c = CATEGORY_COVERS[category];
  return { url: unsplashUrl(c.id), alt: c.alt };
}

export function coverForCalculator(
  slug: string,
  fallback?: Category,
): { url: string; alt: string } {
  const c = CALCULATOR_COVERS[slug];
  if (c) return { url: unsplashUrl(c.id), alt: c.alt };
  if (fallback) return coverForCategory(fallback);
  const d = CALCULATOR_COVERS.default;
  return { url: unsplashUrl(d.id), alt: d.alt };
}
