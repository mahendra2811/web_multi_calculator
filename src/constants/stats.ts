import { CALCULATORS, CATEGORIES } from "./calculators";
import { IMPLEMENTED_SLUGS } from "@/lib/calculators/registry";

/** Total categories shown on the homepage / navigation. */
export const TOTAL_CATEGORIES = CATEGORIES.length;

/** True live count derived from the registry — always accurate. */
const COMPUTED_TOTAL = IMPLEMENTED_SLUGS.size;

/**
 * Optional env override (`NEXT_PUBLIC_TOTAL_CALCULATORS`).
 * Useful for marketing / pre-launch builds. When unset, we use the real count.
 */
const ENV_OVERRIDE = (() => {
  const raw = process.env.NEXT_PUBLIC_TOTAL_CALCULATORS;
  if (!raw) return null;
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : null;
})();

/** Total LIVE calculators (env override wins, else computed from registry). */
export const TOTAL_CALCULATORS = ENV_OVERRIDE ?? COMPUTED_TOTAL;

/** Full catalog size (live + planned). */
export const TOTAL_CATALOG = CALCULATORS.length;

/**
 * Marketing-friendly count, rounded DOWN to the nearest nice number so the
 * displayed value is always "≤ truth" and stable as we ship more calculators.
 *
 *   46  → "45+"     (step 5)
 *   123 → "120+"    (step 10)
 *   371 → "350+"    (step 50)
 *   1240 → "1200+"  (step 100)
 */
export function roundedCount(n: number = TOTAL_CALCULATORS): string {
  if (n < 50) return `${Math.floor(n / 5) * 5}+`;
  if (n < 200) return `${Math.floor(n / 10) * 10}+`;
  if (n < 1000) return `${Math.floor(n / 50) * 50}+`;
  return `${Math.floor(n / 100) * 100}+`;
}

/** Pre-computed label used everywhere we say "X+ calculators". */
export const CALCULATOR_COUNT_LABEL = roundedCount(TOTAL_CALCULATORS);
