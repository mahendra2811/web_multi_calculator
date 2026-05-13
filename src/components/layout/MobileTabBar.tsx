"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, History, Home, Search, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/search", label: "Search", icon: Search },
  { href: "/favorites", label: "Favorites", icon: Heart },
  { href: "/history", label: "History", icon: History },
  { href: "/settings", label: "Settings", icon: Settings },
] as const;

export function MobileTabBar() {
  const pathname = usePathname();
  return (
    <nav className="border-border bg-background/95 fixed right-0 bottom-0 left-0 z-30 border-t backdrop-blur-md md:hidden">
      <ul className="grid grid-cols-5">
        {TABS.map(({ href, label, icon: I }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 py-2 text-xs",
                  active ? "text-primary" : "text-text-secondary",
                )}
              >
                <I className="h-5 w-5" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
