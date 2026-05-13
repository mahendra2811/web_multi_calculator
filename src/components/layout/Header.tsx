"use client";

import Link from "next/link";
import { BookOpen, Heart, History, Home, Menu, Search, Settings } from "lucide-react";
import { useTheme } from "@/contexts/ThemeProvider";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";

const NAV_LINKS = [
  { href: "/", label: "home", icon: Home },
  { href: "/blog", label: "blog", icon: BookOpen },
  { href: "/favorites", label: "favorites", icon: Heart },
  { href: "/history", label: "history", icon: History },
  { href: "/settings", label: "settings", icon: Settings },
] as const;

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
  const t = useTranslations("nav");
  return (
    <header className="border-border bg-background/80 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="text-text flex items-center gap-2 font-bold">
          <span className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-lg">
            ₹
          </span>
          <span className="hidden sm:inline">CalcMaster</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map(({ href, label, icon: I }) => (
            <Link
              key={href}
              href={href}
              className="text-text-secondary hover:bg-surface hover:text-text flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            >
              <I className="h-4 w-4" />
              {t(label)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/search"
            className="text-text hover:bg-surface flex h-10 w-10 items-center justify-center rounded-lg md:w-auto md:gap-2 md:px-3"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
            <span className="text-text-secondary hidden text-sm lg:inline">{t("search")}</span>
          </Link>
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
