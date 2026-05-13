"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Heart, History, Settings, User } from "lucide-react";
import { useFavorites, useHistory } from "@/lib/storage/stores";

const ITEMS = [
  { href: "/profile", label: "Profile", Icon: User, desc: "Overview", showCount: false },
  {
    href: "/favorites",
    label: "Favorites",
    Icon: Heart,
    desc: "Saved calculators",
    showCount: "favorites" as const,
  },
  {
    href: "/history",
    label: "History",
    Icon: History,
    desc: "Recent calculations",
    showCount: "history" as const,
  },
  {
    href: "/settings",
    label: "Settings",
    Icon: Settings,
    desc: "Theme & locale",
    showCount: false,
  },
] as const;

export function HeaderProfileMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const favoritesCount = useFavorites((s) => s.ids.length);
  const historyCount = useHistory((s) => s.entries.length);

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

  const countFor = (slot: false | "favorites" | "history") =>
    slot === "favorites" ? favoritesCount : slot === "history" ? historyCount : 0;

  return (
    <div ref={ref} className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Open profile menu"
        className="text-text-secondary hover:bg-surface hover:text-text data-[open=true]:bg-surface data-[open=true]:text-text relative flex items-center gap-1.5 rounded-lg px-2 py-2 text-sm font-medium transition-colors sm:px-3"
        data-open={open}
      >
        <User className="h-5 w-5" />
        <ChevronDown
          className={`hidden h-3.5 w-3.5 transition-transform sm:block ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
        {(favoritesCount > 0 || historyCount > 0) && !open && (
          <span
            aria-hidden
            className="bg-primary absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full"
          />
        )}
      </button>

      {open && (
        <div
          className="border-border bg-surface-elevated absolute top-full right-0 z-50 mt-2 w-72 origin-top-right overflow-hidden rounded-xl border shadow-xl"
          role="menu"
        >
          <div className="border-border bg-surface/40 border-b px-4 py-3">
            <p className="text-text text-sm font-semibold">Your space</p>
            <p className="text-text-tertiary text-xs">Local — never leaves your device.</p>
          </div>
          <ul className="p-1.5">
            {ITEMS.map(({ href, label, Icon, desc, showCount }) => {
              const count = countFor(showCount);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    role="menuitem"
                    onClick={() => setOpen(false)}
                    className="hover:bg-surface group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors"
                  >
                    <Icon className="text-text-secondary group-hover:text-primary h-5 w-5 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-text truncate text-sm font-medium">{label}</p>
                      <p className="text-text-tertiary truncate text-xs">{desc}</p>
                    </div>
                    {showCount && count > 0 && (
                      <span className="bg-primary/10 text-primary shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold">
                        {count}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
