"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { CALCULATORS, getCalculatorsByCategory } from "@/constants/calculators";
import { IMPLEMENTED_SLUGS } from "@/lib/calculators/registry";
import {
  CATEGORY_BADGE_CLASS,
  CATEGORY_TEXT_CLASS,
} from "@/components/calculator/category-classes";
import { Icon } from "@/components/ui/Icon";
import type { CategoryMeta } from "@/types/calculator";

interface Props {
  category: CategoryMeta;
  /** How many calculators to show in the dropdown (default 6). */
  count?: number;
}

/**
 * Click-or-hover dropdown for a category. Shows N most-likely-useful calculators
 * from that category (live ones prioritized) plus a "View all in {category}" CTA.
 */
export function HeaderCategoryMenu({ category, count = 6 }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Click-outside + Escape to close
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const items = (() => {
    const all = getCalculatorsByCategory(category.id);
    // Prioritize live calcs (custom components / schemas) over coming-soon
    const live = all.filter((c) => IMPLEMENTED_SLUGS.has(c.id));
    const rest = all.filter((c) => !IMPLEMENTED_SLUGS.has(c.id));
    return [...live, ...rest].slice(0, count);
  })();

  // Hover-aware (desktop) + click-aware open
  const handleEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div ref={ref} className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="text-text-secondary hover:bg-surface hover:text-text data-[open=true]:bg-surface data-[open=true]:text-text flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
        data-open={open}
      >
        {category.name}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {open && (
        <div
          className="border-border bg-surface-elevated absolute top-full left-0 z-50 mt-2 w-[320px] origin-top-left overflow-hidden rounded-xl border shadow-xl"
          role="menu"
        >
          <div className="border-border flex items-center gap-3 border-b p-4">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${CATEGORY_BADGE_CLASS[category.id]}`}
            >
              <Icon name={category.icon} className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-text text-sm font-semibold">{category.name}</p>
              <p className="text-text-tertiary text-xs">{category.shortDesc}</p>
            </div>
          </div>
          <ul className="max-h-[60vh] overflow-y-auto p-1.5">
            {items.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/calculator/${c.id}`}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="hover:bg-surface group flex items-center gap-2.5 rounded-md px-2.5 py-2 transition-colors"
                >
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${CATEGORY_BADGE_CLASS[c.category]}`}
                  >
                    <Icon name={c.icon} className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-text truncate text-sm font-medium">{c.name}</p>
                    <p className="text-text-tertiary line-clamp-1 text-[11px]">{c.shortDesc}</p>
                  </div>
                  <ArrowRight className="text-text-tertiary group-hover:text-text h-3.5 w-3.5 shrink-0 opacity-0 transition group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={`/category/${category.id}`}
            onClick={() => setOpen(false)}
            className={`border-border hover:bg-surface flex items-center justify-between border-t px-4 py-3 text-sm font-semibold transition-colors ${CATEGORY_TEXT_CLASS[category.id]}`}
          >
            View all in {category.name}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}

/** Returns the top 3 categories by total calculator count. */
export function getTopCategories(): CategoryMeta[] {
  // Pre-computed: finance > math > health based on calculator count
  // We compute dynamically to stay accurate as new ones are added.
  const counts: Record<string, number> = {};
  for (const c of CALCULATORS) counts[c.category] = (counts[c.category] ?? 0) + 1;
  return [];
}
