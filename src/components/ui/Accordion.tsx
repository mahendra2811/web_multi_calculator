import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AccordionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Container for AccordionItem entries. Matches the FaqSection card look:
 * rounded border with divider lines between items.
 */
export function Accordion({ children, className }: AccordionProps) {
  return (
    <div
      className={cn(
        "border-border bg-surface-elevated divide-border divide-y overflow-hidden rounded-2xl border",
        className,
      )}
    >
      {children}
    </div>
  );
}

export interface AccordionItemProps {
  title: ReactNode;
  defaultOpen?: boolean;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

/**
 * Click-to-open section built on native <details>/<summary> — no JS needed,
 * content stays in the DOM (SEO + print friendly; print CSS force-expands).
 */
export function AccordionItem({
  title,
  defaultOpen = false,
  icon,
  className,
  children,
}: AccordionItemProps) {
  return (
    <details open={defaultOpen} className={cn("group/acc", className)}>
      <summary className="hover:bg-surface flex cursor-pointer list-none items-center justify-between gap-4 p-4 transition-colors sm:p-5">
        <span className="flex min-w-0 items-center gap-2.5">
          {icon}
          <span className="text-text text-sm leading-snug font-semibold sm:text-base">{title}</span>
        </span>
        <span
          className="text-text-tertiary flex h-6 w-6 shrink-0 items-center justify-center text-lg transition-transform group-open/acc:rotate-45"
          aria-hidden
        >
          +
        </span>
      </summary>
      <div className="px-4 pb-4 sm:px-5 sm:pb-5">{children}</div>
    </details>
  );
}
