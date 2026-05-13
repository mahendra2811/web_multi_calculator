"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";
import { CALCULATORS, CATEGORIES } from "@/constants/calculators";
import {
  CATEGORY_BADGE_CLASS,
  CATEGORY_TEXT_CLASS,
} from "@/components/calculator/category-classes";
import { Icon } from "@/components/ui/Icon";
import { useSearchPalette } from "@/lib/storage/search-palette";
import { track } from "@/lib/analytics/events";
import type { CalculatorMeta, CategoryMeta } from "@/types/calculator";

type Item = { type: "calc"; calc: CalculatorMeta } | { type: "category"; category: CategoryMeta };

const MAX_RESULTS = 20;

function rank(query: string, c: CalculatorMeta): number {
  const q = query.toLowerCase();
  const name = c.name.toLowerCase();
  if (name === q) return 100;
  if (name.startsWith(q)) return 90;
  if (name.includes(q)) return 70;
  if (c.id.includes(q)) return 60;
  if (c.shortDesc.toLowerCase().includes(q)) return 40;
  return 0;
}

export function SearchPalette() {
  const open = useSearchPalette((s) => s.open);
  const closeStore = useSearchPalette((s) => s.close);
  const setOpen = useSearchPalette((s) => s.setOpen);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const close = useCallback(() => {
    setQuery("");
    setActive(0);
    closeStore();
  }, [closeStore]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const router = useRouter();

  // Global keybind: Cmd+K / Ctrl+K
  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setOpen]);

  // Focus input when opening
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, [open]);

  // Lock scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const items: Item[] = useMemo(() => {
    const q = query.trim();
    if (!q) {
      // Default: show categories + top picks
      return [
        ...CATEGORIES.slice(0, 6).map((category): Item => ({ type: "category", category })),
        ...["sip", "emi", "bmi", "mortgage", "currency-converter", "age"]
          .map((s) => CALCULATORS.find((c) => c.id === s))
          .filter((c): c is CalculatorMeta => Boolean(c))
          .map((calc): Item => ({ type: "calc", calc })),
      ];
    }
    const scored = CALCULATORS.map((c) => ({ c, score: rank(q, c) }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_RESULTS);
    return scored.map(({ c }): Item => ({ type: "calc", calc: c }));
  }, [query]);

  // Clamp the active index in case the items list shrank.
  const safeActive = items.length === 0 ? 0 : Math.min(active, items.length - 1);

  const onQueryChange = (next: string) => {
    setQuery(next);
    setActive(0);
  };

  const navigate = useCallback(
    (item: Item) => {
      if (item.type === "calc") {
        track.searchQuery(query, items.length);
        router.push(`/calculator/${item.calc.id}`);
      } else {
        router.push(`/category/${item.category.id}`);
      }
      close();
    },
    [router, close, query, items.length],
  );

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(items.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = items[safeActive];
      if (item) navigate(item);
    } else if (e.key === "Escape") {
      close();
    }
  };

  // Scroll active into view
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const el = list.querySelector<HTMLElement>(`[data-idx="${safeActive}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [safeActive]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="search-palette"
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 backdrop-blur-sm sm:items-start sm:pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Search calculators"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="border-border bg-surface-elevated relative flex h-[100vh] w-full flex-col overflow-hidden rounded-none border shadow-2xl sm:h-auto sm:max-h-[70vh] sm:w-full sm:max-w-2xl sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input row */}
            <div className="border-border bg-surface-elevated relative flex items-center gap-3 border-b px-4 py-3 sm:px-5 sm:py-4">
              <Search className="text-text-tertiary h-5 w-5 shrink-0" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                onKeyDown={onKey}
                placeholder="Search 387+ calculators…"
                className="text-text placeholder:text-text-tertiary min-w-0 flex-1 bg-transparent text-base outline-none sm:text-lg"
                spellCheck={false}
                autoComplete="off"
              />
              <kbd className="border-border text-text-tertiary hidden rounded border px-1.5 py-0.5 font-mono text-[10px] sm:inline-block">
                ESC
              </kbd>
              <button
                onClick={close}
                aria-label="Close search"
                className="hover:bg-surface text-text-tertiary flex h-8 w-8 items-center justify-center rounded-md transition-colors sm:hidden"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Results */}
            {items.length === 0 ? (
              <div className="text-text-secondary flex-1 px-6 py-10 text-center text-sm">
                No calculators match{" "}
                <span className="text-text font-medium">&quot;{query}&quot;</span>. Try a different
                keyword.
              </div>
            ) : (
              <ul ref={listRef} className="flex-1 overflow-y-auto p-2" role="listbox">
                {!query.trim() && (
                  <li className="text-text-tertiary px-3 pt-2 pb-1 text-[10px] font-semibold tracking-wider uppercase">
                    Suggestions
                  </li>
                )}
                {items.map((item, i) => {
                  const active_ = i === safeActive;
                  if (item.type === "category") {
                    const c = item.category;
                    return (
                      <li key={`cat-${c.id}`} role="option" aria-selected={active_}>
                        <Link
                          href={`/category/${c.id}`}
                          data-idx={i}
                          onMouseEnter={() => setActive(i)}
                          onClick={() => navigate(item)}
                          className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors ${active_ ? "bg-primary/10" : "hover:bg-surface"}`}
                        >
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${CATEGORY_BADGE_CLASS[c.id]}`}
                          >
                            <Icon name={c.icon} className="h-4 w-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-text truncate text-sm font-semibold">{c.name}</p>
                            <p className="text-text-tertiary truncate text-xs">
                              {c.shortDesc} · category
                            </p>
                          </div>
                          <ArrowRight className="text-text-tertiary h-4 w-4 shrink-0" />
                        </Link>
                      </li>
                    );
                  }
                  const c = item.calc;
                  return (
                    <li key={c.id} role="option" aria-selected={active_}>
                      <Link
                        href={`/calculator/${c.id}`}
                        data-idx={i}
                        onMouseEnter={() => setActive(i)}
                        onClick={() => navigate(item)}
                        className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors ${active_ ? "bg-primary/10" : "hover:bg-surface"}`}
                      >
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${CATEGORY_BADGE_CLASS[c.category]}`}
                        >
                          <Icon name={c.icon} className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-text truncate text-sm font-semibold">{c.name}</p>
                          <p className="text-text-tertiary truncate text-xs">{c.shortDesc}</p>
                        </div>
                        <span
                          className={`hidden text-[10px] font-semibold tracking-wider uppercase sm:inline ${CATEGORY_TEXT_CLASS[c.category]}`}
                        >
                          {c.category}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}

            {/* Footer hints */}
            <div className="border-border bg-surface text-text-tertiary hidden items-center justify-between gap-4 border-t px-4 py-2 text-[11px] sm:flex">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="border-border rounded border px-1.5 py-0.5 font-mono text-[10px]">
                    ↑↓
                  </kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="border-border rounded border px-1.5 py-0.5 font-mono text-[10px]">
                    ↵
                  </kbd>
                  open
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="border-border rounded border px-1.5 py-0.5 font-mono text-[10px]">
                    ESC
                  </kbd>
                  close
                </span>
              </div>
              <span>
                {items.length} result{items.length === 1 ? "" : "s"}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
