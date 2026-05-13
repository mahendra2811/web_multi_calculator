import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface Crumb {
  label: string;
  href?: string;
}

interface Props {
  items: Crumb[];
  className?: string;
}

/**
 * Visible breadcrumb. On screens narrower than sm, middle levels collapse to "…".
 * Pairs with the BreadcrumbList JSON-LD already emitted server-side.
 */
export function Breadcrumb({ items, className }: Props) {
  if (items.length === 0) return null;
  const lastIdx = items.length - 1;
  const showEllipsis = items.length > 2;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`text-text-tertiary container-page flex items-center gap-1.5 overflow-x-auto py-3 text-xs sm:text-sm ${className ?? ""}`}
    >
      <ol className="flex min-w-0 items-center gap-1.5">
        <li className="shrink-0">
          <Link
            href="/"
            aria-label="Home"
            className="hover:text-text flex items-center gap-1 transition-colors"
          >
            <Home className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </li>

        {showEllipsis && (
          <li className="flex shrink-0 items-center gap-1.5 sm:hidden" aria-hidden>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-60" />
            <span className="opacity-60">…</span>
          </li>
        )}

        {items.map((c, i) => {
          const last = i === lastIdx;
          const isMiddle = showEllipsis && i < lastIdx;
          return (
            <li
              key={`${c.label}-${i}`}
              className={`flex shrink-0 items-center gap-1.5 ${isMiddle ? "hidden sm:flex" : ""}`}
            >
              <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-60" aria-hidden />
              {last || !c.href ? (
                <span
                  className="text-text max-w-[200px] truncate font-medium sm:max-w-none"
                  aria-current={last ? "page" : undefined}
                >
                  {c.label}
                </span>
              ) : (
                <Link
                  href={c.href}
                  className="hover:text-text max-w-[160px] truncate transition-colors sm:max-w-none"
                >
                  {c.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
