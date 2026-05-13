import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { CALCULATORS, getCalculatorsByCategory } from "@/constants/calculators";
import { IMPLEMENTED_SLUGS } from "@/lib/calculators/registry";
import {
  CATEGORY_BADGE_CLASS,
  CATEGORY_TEXT_CLASS,
} from "@/components/calculator/category-classes";
import { Icon } from "@/components/ui/Icon";
import type { CalculatorMeta } from "@/types/calculator";

interface Props {
  current: CalculatorMeta;
  /** Explicit slug list — overrides the auto-recommended set. */
  related?: string[];
  count?: number;
}

const HAND_PICKED: Record<string, string[]> = {
  sip: ["lumpsum", "step-up-sip", "compound-interest", "cagr", "retirement", "elss"],
  emi: ["mortgage", "amortization", "refinance", "mortgage-payoff", "personal-loan", "auto-loan"],
  bmi: ["bmr", "tdee", "body-fat", "ideal-weight", "calorie-goal", "healthy-weight-range"],
  mortgage: [
    "emi",
    "amortization",
    "refinance",
    "house-affordability",
    "down-payment",
    "rent-vs-buy",
  ],
  "income-tax": ["regime-compare", "advance-tax", "section-80c", "hra", "salary", "form-16"],
  ppf: ["nps", "epf", "ssy", "elss", "sip", "fd-rd"],
  retirement: ["sip", "step-up-sip", "annuity-payout", "swp", "nps", "savings-goal"],
  "compound-interest": ["sip", "lumpsum", "future-value", "cagr", "fd-rd", "simple-interest"],
};

function autoPick(current: CalculatorMeta, count: number): CalculatorMeta[] {
  // 1. Hand-picked if available
  const picks = HAND_PICKED[current.id];
  if (picks) {
    return picks
      .map((id) => CALCULATORS.find((c) => c.id === id))
      .filter((c): c is CalculatorMeta => Boolean(c))
      .slice(0, count);
  }

  // 2. Same category, prioritize implemented
  const sameCat = getCalculatorsByCategory(current.category).filter((c) => c.id !== current.id);
  const live = sameCat.filter((c) => IMPLEMENTED_SLUGS.has(c.id));
  const pending = sameCat.filter((c) => !IMPLEMENTED_SLUGS.has(c.id));
  return [...live, ...pending].slice(0, count);
}

export function RelatedCalculators({ current, related, count = 6 }: Props) {
  const items = related
    ? related
        .map((id) => CALCULATORS.find((c) => c.id === id))
        .filter((c): c is CalculatorMeta => Boolean(c))
        .slice(0, count)
    : autoPick(current, count);

  if (items.length === 0) return null;

  return (
    <section className="container-page no-print py-10">
      <header className="mb-5 flex items-center gap-3">
        <span className="bg-primary/15 text-primary flex h-9 w-9 items-center justify-center rounded-lg">
          <Sparkles className="h-4 w-4" />
        </span>
        <div>
          <h2 className="text-text text-lg font-bold sm:text-xl">Related calculators</h2>
          <p className="text-text-tertiary text-xs sm:text-sm">
            People who use {current.name} often check these next.
          </p>
        </div>
      </header>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => (
          <li key={c.id}>
            <Link
              href={`/calculator/${c.id}`}
              className="group border-border bg-surface-elevated hover:border-primary/40 flex items-center gap-3 rounded-xl border p-3 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${CATEGORY_BADGE_CLASS[c.category]}`}
              >
                <Icon name={c.icon} className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-text truncate text-sm font-semibold">{c.name}</h3>
                <p className="text-text-tertiary truncate text-xs">{c.shortDesc}</p>
              </div>
              <ArrowRight
                className={`h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${CATEGORY_TEXT_CLASS[c.category]}`}
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
