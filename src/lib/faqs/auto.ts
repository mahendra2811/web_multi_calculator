import type { CalculatorMeta, Category } from "@/types/calculator";
import type { FaqItem } from "./types";

const CATEGORY_BLURB: Record<Category, string> = {
  finance: "personal and business finance",
  "finance-india": "Indian tax, savings and investment products",
  math: "mathematics and arithmetic",
  geometry: "geometry — shapes, areas and volumes",
  health: "health and fitness metrics",
  converter: "unit conversion",
  datetime: "date and time arithmetic",
  crypto: "crypto and stock trading",
  construction: "construction and DIY material estimation",
  automotive: "vehicles, fuel and transport",
  physics: "classical mechanics, energy and electricity",
  chemistry: "stoichiometry, gas laws and solution chemistry",
  electrical: "wiring, resistors, batteries and electrical design",
  cooking: "recipe conversion, portions and baking",
  lifestyle: "everyday lifestyle and education tasks",
  developer: "developer and networking utilities",
  weather: "weather and atmospheric calculations",
  sports: "sports statistics and game math",
};

/**
 * Auto-generated baseline FAQs for any calculator. Always returns at least 5
 * sensible questions derived from the calculator's metadata + category. Used
 * as a fallback when a calculator has no hand-written FAQs and combined when
 * a calculator has fewer than 5 hand-written FAQs.
 */
export function generateDefaultFaqs(meta: CalculatorMeta): FaqItem[] {
  const name = meta.name;
  const blurb = CATEGORY_BLURB[meta.category];
  return [
    {
      q: `What does the ${name} do?`,
      a: `The ${name} solves the common ${blurb} question: ${meta.shortDesc.toLowerCase()}. Enter your numbers on the left, the answer updates instantly on the right — no submit button, no signup.`,
    },
    {
      q: `Is the ${name} free to use?`,
      a: `Yes. Every calculator on CalcMaster is free, has no usage caps, requires no signup, and shows no ads. The site is open-source-friendly and supported entirely by the author.`,
    },
    {
      q: `Does the ${name} work on mobile?`,
      a: `Yes. CalcMaster is fully responsive and installable as a PWA — on Android tap the browser menu → "Add to Home Screen"; on iOS Safari → Share → "Add to Home Screen". After installing, the ${name} works offline.`,
    },
    {
      q: `Where is my input stored?`,
      a: `Nowhere by default. Your inputs live in your browser's memory while you're on the page; a copy of your recent calculations is saved to localStorage on your device so the History page works. Nothing is sent to a server unless you explicitly enable cloud sync.`,
    },
    {
      q: `Can I trust the formula in the ${name}?`,
      a: `The math is sourced from peer-reviewed and standard public formulas; you can read the formula in the result card. For decisions involving real money or health, always cross-verify with a qualified professional — calculators are educational, not advice.`,
    },
  ];
}
