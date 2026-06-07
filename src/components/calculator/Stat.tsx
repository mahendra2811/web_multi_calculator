import { cn } from "@/lib/utils";

interface StatProps {
  label: string;
  value: string;
  hint?: string;
  tone?: "primary" | "secondary" | "accent" | "success" | "error" | "default";
}

const TONE_CLASS: Record<NonNullable<StatProps["tone"]>, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
  success: "text-success",
  error: "text-error",
  default: "text-text",
};

/**
 * Mobile-safe result stat. On mobile each stat renders as a full-width
 * "Label … value" row (stacks vertically, stays readable); from sm: up it
 * becomes the stacked label-over-value column. Long numbers truncate with a
 * title tooltip fallback.
 */
export function Stat({ label, value, hint, tone = "default" }: StatProps) {
  return (
    <div className="flex min-w-0 flex-row items-baseline justify-between gap-3 sm:flex-col sm:items-start sm:gap-1">
      <span className="text-text-tertiary shrink-0 text-[11px] tracking-wide uppercase sm:text-xs">
        {label}
      </span>
      <span
        className={cn(
          "truncate text-base font-bold tabular-nums sm:text-xl lg:text-2xl",
          TONE_CLASS[tone],
        )}
        title={value}
      >
        {value}
      </span>
      {hint && <span className="text-text-tertiary hidden text-xs sm:block">{hint}</span>}
    </div>
  );
}

export function BigStat({ label, value, tone = "primary" }: Omit<StatProps, "hint">) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-1 text-center">
      <span className="text-text-tertiary text-xs tracking-wide uppercase">{label}</span>
      <span
        className={cn(
          "truncate text-3xl leading-tight font-bold tabular-nums sm:text-4xl lg:text-5xl",
          TONE_CLASS[tone],
        )}
        title={value}
      >
        {value}
      </span>
    </div>
  );
}
