"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, LayoutGrid } from "lucide-react";
import { CATEGORIES, getCalculatorsByCategory } from "@/constants/calculators";
import {
  CATEGORY_BADGE_CLASS,
  CATEGORY_TEXT_CLASS,
} from "@/components/calculator/category-classes";
import { Icon } from "@/components/ui/Icon";

export function HeaderAllCategoriesMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
        <LayoutGrid className="h-4 w-4" />
        All Categories
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {open && (
        <div
          className="border-border bg-surface-elevated absolute top-full right-0 z-50 mt-2 w-[640px] max-w-[90vw] origin-top-right overflow-hidden rounded-xl border shadow-xl"
          role="menu"
        >
          <div className="grid grid-cols-2 gap-1 p-2 sm:grid-cols-3">
            {CATEGORIES.map((c) => {
              const count = getCalculatorsByCategory(c.id).length;
              return (
                <Link
                  key={c.id}
                  href={`/category/${c.id}`}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="hover:bg-surface group flex items-start gap-2.5 rounded-lg p-3 transition-colors"
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${CATEGORY_BADGE_CLASS[c.id]}`}
                  >
                    <Icon name={c.icon} className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-text truncate text-sm font-semibold">{c.name}</p>
                    <p className="text-text-tertiary line-clamp-1 text-[11px]">
                      {count} calculator{count === 1 ? "" : "s"}
                    </p>
                    <span
                      className={`mt-0.5 inline-block text-[10px] font-semibold tracking-wider uppercase ${CATEGORY_TEXT_CLASS[c.id]}`}
                    >
                      Browse →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
