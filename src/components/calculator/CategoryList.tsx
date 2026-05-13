"use client";

import Link from "next/link";
import { ArrowRight, Grid3x3, LayoutGrid, List, Rows3 } from "lucide-react";
import { useListView, type ListView } from "@/lib/storage/stores";
import {
  CATEGORY_BADGE_CLASS,
  CATEGORY_BG_SOFT_CLASS,
  CATEGORY_TEXT_CLASS,
} from "@/components/calculator/category-classes";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import type { CategoryMeta } from "@/types/calculator";

interface Props {
  items: Array<CategoryMeta & { count: number }>;
  showToggle?: boolean;
  forceView?: ListView;
}

const VIEW_BUTTONS: Array<{ id: ListView; label: string; Icon: typeof LayoutGrid }> = [
  { id: "compact", label: "Compact", Icon: Rows3 },
  { id: "small", label: "Small", Icon: Grid3x3 },
  { id: "grid", label: "Grid", Icon: LayoutGrid },
  { id: "detailed", label: "Detailed", Icon: List },
];

export function CategoryList({ items, showToggle = true, forceView }: Props) {
  const storedView = useListView((s) => s.view);
  const setView = useListView((s) => s.setView);
  const view = forceView ?? storedView;

  return (
    <div className="flex flex-col gap-4">
      {showToggle && (
        <div className="flex items-center justify-between gap-2">
          <p className="text-text-tertiary text-xs sm:text-sm">
            {items.length} categor{items.length === 1 ? "y" : "ies"}
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
                href={`/category/${c.id}`}
                className={`border-border bg-surface-elevated hover:border-primary/40 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm ${CATEGORY_TEXT_CLASS[c.id] ?? "text-primary"}`}
              >
                <Icon name={c.icon} className="h-3.5 w-3.5" />
                <span className="text-text max-w-[180px] truncate">{c.name}</span>
                <span className="text-text-tertiary">· {c.count}</span>
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
                href={`/category/${c.id}`}
                title={c.name}
                className="group border-border bg-surface-elevated hover:border-primary/40 flex h-28 flex-col items-center justify-center gap-2 rounded-xl border p-3 text-center transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${CATEGORY_BADGE_CLASS[c.id] ?? ""}`}
                >
                  <Icon name={c.icon} className="h-5 w-5" />
                </div>
                <span className="text-text line-clamp-2 text-xs leading-tight font-medium">
                  {c.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {view === "grid" && (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((c) => (
            <li key={c.id}>
              <Link
                href={`/category/${c.id}`}
                title={c.name}
                className={`group border-border bg-surface-elevated relative flex h-full flex-col overflow-hidden rounded-2xl border p-5 transition-all hover:-translate-y-1 hover:shadow-xl ${CATEGORY_BG_SOFT_CLASS[c.id] ?? ""}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${CATEGORY_BADGE_CLASS[c.id] ?? ""}`}
                  >
                    <Icon name={c.icon} className="h-5 w-5" />
                  </div>
                  <span className="text-text-tertiary shrink-0 text-xs font-medium">
                    {c.count} tools
                  </span>
                </div>
                <h3 className="text-text mt-4 line-clamp-2 text-lg leading-tight font-semibold">
                  {c.name}
                </h3>
                <p className="text-text-secondary mt-1 line-clamp-2 text-sm">{c.shortDesc}</p>
                <span
                  className={`mt-4 inline-flex items-center gap-1 text-sm font-medium ${CATEGORY_TEXT_CLASS[c.id] ?? "text-primary"}`}
                >
                  Open
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {view === "detailed" && (
        <ul className="flex flex-col gap-3">
          {items.map((c) => (
            <li key={c.id}>
              <Link
                href={`/category/${c.id}`}
                className="group border-border bg-surface-elevated hover:border-primary/40 flex items-start gap-4 rounded-xl border p-4 transition-all hover:shadow-md sm:p-5"
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${CATEGORY_BADGE_CLASS[c.id] ?? ""}`}
                >
                  <Icon name={c.icon} className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-text text-base font-semibold sm:text-lg">{c.name}</h3>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase ${CATEGORY_BADGE_CLASS[c.id] ?? ""}`}
                    >
                      {c.count} tools
                    </span>
                  </div>
                  <p className="text-text-secondary mt-1 text-sm">{c.shortDesc}</p>
                  <span
                    className={`mt-3 inline-flex items-center gap-1 text-xs font-semibold ${CATEGORY_TEXT_CLASS[c.id] ?? "text-primary"}`}
                  >
                    Browse category
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
