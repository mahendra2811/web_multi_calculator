import type { Category } from "@/types/calculator";

export const CATEGORY_BADGE_CLASS: Record<Category, string> = {
  finance: "bg-finance/15 text-finance",
  math: "bg-math/15 text-math",
  health: "bg-health/15 text-health",
  converter: "bg-converter/15 text-converter",
  datetime: "bg-datetime/15 text-datetime",
  crypto: "bg-crypto/15 text-crypto",
};

export const CATEGORY_BG_SOFT_CLASS: Record<Category, string> = {
  finance: "bg-finance/10",
  math: "bg-math/10",
  health: "bg-health/10",
  converter: "bg-converter/10",
  datetime: "bg-datetime/10",
  crypto: "bg-crypto/10",
};

export const CATEGORY_TEXT_CLASS: Record<Category, string> = {
  finance: "text-finance",
  math: "text-math",
  health: "text-health",
  converter: "text-converter",
  datetime: "text-datetime",
  crypto: "text-crypto",
};

export const CATEGORY_RING_CLASS: Record<Category, string> = {
  finance: "ring-finance/30",
  math: "ring-math/30",
  health: "ring-health/30",
  converter: "ring-converter/30",
  datetime: "ring-datetime/30",
  crypto: "ring-crypto/30",
};
