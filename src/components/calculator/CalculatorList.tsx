"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { ArrowRight, Grid3x3, LayoutGrid, List, Rows3 } from "lucide-react";
import { useListView, type ListView } from "@/lib/storage/stores";
import {
  CATEGORY_BADGE_CLASS,
  CATEGORY_TEXT_CLASS,
} from "@/components/calculator/category-classes";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { displayLongDesc, displayName, displayShortDesc } from "@/lib/calculators/display";
import type { CalculatorMeta } from "@/types/calculator";

interface Props {
  items: CalculatorMeta[];
  emptyText?: string;
  showToggle?: boolean;
  /** Force a specific view (overrides persisted preference). */
  forceView?: ListView;
}

const VIEW_BUTTONS: Array<{ id: ListView; label: string; Icon: typeof LayoutGrid }> = [
  { id: "compact", label: "Compact", Icon: Rows3 },
  { id: "small", label: "Small", Icon: Grid3x3 },
  { id: "grid", label: "Grid", Icon: LayoutGrid },
  { id: "detailed", label: "Detailed", Icon: List },
];

export function CalculatorList({
  items,
  emptyText = "No calculators found.",
  showToggle = true,
  forceView,
}: Props) {
  const locale = useLocale();
  const storedView = useListView((s) => s.view);
  const setView = useListView((s) => s.setView);
  const view = forceView ?? storedView;

  if (items.length === 0) {
    return (
      <div className="border-border bg-surface-elevated rounded-2xl border border-dashed p-10 text-center">
        <p className="text-text-secondary">{emptyText}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {showToggle && (
        <div className="flex items-center justify-between gap-2">
          <p className="text-text-tertiary text-xs sm:text-sm">
            {items.length} calculator{items.length === 1 ? "" : "s"}
          </p>
          <div
            className="border-border bg-surface-elevated flex rounded-lg border p-0.5"
            role="tablist"
            aria-label="View mode"
          >
            {VIEW_BUTTONS.map(({ id, label, Icon: I }) => (
              <Button
                key={id}
                variant={view === id ? "primary" : "ghost"}
                size="sm"
                onClick={() => setView(id)}
                role="tab"
                aria-selected={view === id}
                aria-label={label}
                className="!h-8 !px-2 sm:!px-3"
              >
                <I className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>
              </Button>
            ))}
          </div>
        </div>
      )}

      {view === "compact" && (
        <ul className="flex flex-wrap gap-2">
          {items.map((c) => (
            <li key={c.id}>
              <Link
                href={`/calculator/${c.id}`}
                className={`border-border bg-surface-elevated hover:border-primary/40 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm ${CATEGORY_TEXT_CLASS[c.category]}`}
              >
                <Icon name={c.icon} className="h-3.5 w-3.5" />
                <span className="text-text max-w-[180px] truncate">{displayName(c, locale)}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {view === "small" && (
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
          {items.map((c) => (
            <li key={c.id}>
              <Link
                href={`/calculator/${c.id}`}
                title={displayName(c, locale)}
                className="group border-border bg-surface-elevated hover:border-primary/40 flex h-28 flex-col items-center justify-center gap-2 rounded-xl border p-3 text-center transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${CATEGORY_BADGE_CLASS[c.category]}`}
                >
                  <Icon name={c.icon} className="h-5 w-5" />
                </div>
                <span className="text-text line-clamp-2 text-xs leading-tight font-medium">
                  {displayName(c, locale)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {view === "grid" && (
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c) => (
            <li key={c.id}>
              <Link
                href={`/calculator/${c.id}`}
                className="group border-border bg-surface-elevated hover:border-primary/40 flex items-start gap-3 rounded-xl border p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${CATEGORY_BADGE_CLASS[c.category]}`}
                >
                  <Icon name={c.icon} className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-text truncate text-sm font-semibold sm:text-base">
                    {displayName(c, locale)}
                  </h3>
                  <p className="text-text-secondary mt-0.5 line-clamp-2 text-xs sm:text-sm">
                    {displayShortDesc(c, locale)}
                  </p>
                  <span
                    className={`mt-2 inline-flex items-center gap-1 text-[11px] font-semibold sm:text-xs ${CATEGORY_TEXT_CLASS[c.category]}`}
                  >
                    Open
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {view === "detailed" && (
        <ul className="flex flex-col gap-3">
          {items.map((c) => {
            const long = displayLongDesc(c, locale);
            return (
              <li key={c.id}>
                <Link
                  href={`/calculator/${c.id}`}
                  className="group border-border bg-surface-elevated hover:border-primary/40 flex items-start gap-4 rounded-xl border p-4 transition-all hover:shadow-md sm:p-5"
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${CATEGORY_BADGE_CLASS[c.category]}`}
                  >
                    <Icon name={c.icon} className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-text text-base font-semibold sm:text-lg">
                        {displayName(c, locale)}
                      </h3>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase ${CATEGORY_BADGE_CLASS[c.category]}`}
                      >
                        {c.category}
                      </span>
                    </div>
                    <p className="text-text-secondary mt-1 text-sm">
                      {displayShortDesc(c, locale)}
                    </p>
                    {long && (
                      <p className="text-text-tertiary mt-2 hidden text-xs leading-relaxed sm:block">
                        {long}
                      </p>
                    )}
                    <span
                      className={`mt-3 inline-flex items-center gap-1 text-xs font-semibold ${CATEGORY_TEXT_CLASS[c.category]}`}
                    >
                      Open calculator
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
