"use client";

import { Search, Sparkles } from "lucide-react";
import { useSearchPalette } from "@/lib/storage/search-palette";

/**
 * Big "click to search" pill that lives above the hero. Opens the global
 * SearchPalette modal. Mobile-first sizing.
 */
export function HeroSearchTrigger() {
  const open = useSearchPalette((s) => s.setOpen);

  return (
    <button
      type="button"
      onClick={() => open(true)}
      aria-label="Open search"
      className="group border-border bg-surface-elevated/70 hover:bg-surface-elevated hover:border-primary/50 mx-auto flex w-full max-w-xl items-center gap-3 rounded-2xl border px-4 py-3 text-left backdrop-blur transition-all hover:-translate-y-0.5 hover:shadow-lg sm:px-5 sm:py-4"
    >
      <Search className="text-text-tertiary group-hover:text-primary h-5 w-5 shrink-0 transition-colors" />
      <span className="text-text-tertiary group-hover:text-text-secondary min-w-0 flex-1 truncate text-sm transition-colors sm:text-base">
        Search 387+ calculators — SIP, EMI, BMI, concrete…
      </span>
      <span className="text-text-tertiary hidden items-center gap-1 text-[11px] sm:flex">
        <kbd className="border-border text-text-tertiary rounded border px-1.5 py-0.5 font-mono">
          ⌘K
        </kbd>
      </span>
      <Sparkles className="text-accent h-4 w-4 shrink-0 sm:hidden" />
    </button>
  );
}
