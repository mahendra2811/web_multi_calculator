import type { CalculatorMeta } from "@/types/calculator";

/** Locale-aware display name. Falls back to English if no Hindi field. */
export function displayName(meta: CalculatorMeta, locale: string): string {
  if (locale === "hi" && meta.nameHi) return meta.nameHi;
  return meta.name;
}

export function displayShortDesc(meta: CalculatorMeta, locale: string): string {
  if (locale === "hi" && meta.shortDescHi) return meta.shortDescHi;
  return meta.shortDesc;
}

export function displayLongDesc(meta: CalculatorMeta, locale: string): string | undefined {
  if (locale === "hi" && meta.longDescHi) return meta.longDescHi;
  return meta.longDesc;
}
