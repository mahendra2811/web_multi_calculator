import type { CalculatorMeta } from "@/types/calculator";
import { generateDefaultFaqs } from "./auto";
import { CURATED_FAQS } from "./curated";
import type { FaqItem } from "./types";

const MIN_FAQS = 5;

/**
 * Returns FAQs for a calculator. If a hand-curated set exists, returns it.
 * Otherwise auto-generates the baseline 5. If a curated set has fewer than
 * 5 items (shouldn't happen, but defensive), tops up with auto FAQs.
 */
export function getFaqsFor(meta: CalculatorMeta): FaqItem[] {
  const curated = CURATED_FAQS[meta.id] ?? [];
  if (curated.length >= MIN_FAQS) return curated;
  const fallback = generateDefaultFaqs(meta);
  // Merge curated first, then auto-fallback, dedupe by question
  const merged = [...curated];
  const seen = new Set(curated.map((f) => f.q.toLowerCase()));
  for (const f of fallback) {
    if (merged.length >= MIN_FAQS) break;
    if (!seen.has(f.q.toLowerCase())) {
      merged.push(f);
      seen.add(f.q.toLowerCase());
    }
  }
  return merged;
}

export function hasCuratedFaqs(slug: string): boolean {
  return (CURATED_FAQS[slug]?.length ?? 0) >= MIN_FAQS;
}

export type { FaqItem };
