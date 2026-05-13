"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Search } from "lucide-react";
import { useTheme } from "@/contexts/ThemeProvider";
import { Button } from "@/components/ui/Button";
import { getCategoryBySlug } from "@/constants/calculators";
import { HeaderCategoryMenu } from "./HeaderCategoryMenu";
import { HeaderAllCategoriesMenu } from "./HeaderAllCategoriesMenu";
import { HeaderProfileMenu } from "./HeaderProfileMenu";
import { MobileDrawer } from "./MobileDrawer";
import { useSearchPalette } from "@/lib/storage/search-palette";

// Top 3 most-traffic categories
const TOP_CAT_IDS = ["finance", "math", "health"] as const;

function ThemeToggle() {
  const { resolvedTheme, toggle } = useTheme();
  return (
    <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={toggle}>
      {resolvedTheme === "dark" ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
    </Button>
  );
}

function SunIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const openSearch = useSearchPalette((s) => s.setOpen);

  const topCategories = TOP_CAT_IDS.map((id) => getCategoryBySlug(id)).filter(
    (c): c is NonNullable<ReturnType<typeof getCategoryBySlug>> => Boolean(c),
  );

  return (
    <>
      <header className="border-border bg-background/85 sticky top-0 z-40 border-b backdrop-blur-md">
        <div className="container-page flex h-16 items-center justify-between gap-2 sm:gap-4">
          <Link
            href="/"
            className="text-text flex shrink-0 items-center gap-2 font-bold"
            aria-label="CalcMaster home"
          >
            <span className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-lg">
              ₹
            </span>
            <span className="hidden sm:inline">CalcMaster</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 md:flex">
            {topCategories.map((c) => (
              <HeaderCategoryMenu key={c.id} category={c} />
            ))}
            <HeaderAllCategoriesMenu />
            <Link
              href="/blog"
              className="text-text-secondary hover:bg-surface hover:text-text rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            >
              Blog
            </Link>
          </nav>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <button
              onClick={() => openSearch(true)}
              aria-label="Open search"
              className="border-border bg-surface-elevated/60 hover:bg-surface text-text-secondary hover:text-text flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-sm transition-colors sm:gap-3 sm:px-3 sm:py-2"
            >
              <Search className="h-4 w-4" />
              <span className="hidden lg:inline">Search…</span>
              <kbd className="border-border text-text-tertiary hidden rounded border px-1.5 py-0.5 font-mono text-[10px] lg:inline">
                ⌘K
              </kbd>
            </button>
            <ThemeToggle />
            <div className="hidden md:flex">
              <HeaderProfileMenu />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
              onClick={() => setDrawerOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
