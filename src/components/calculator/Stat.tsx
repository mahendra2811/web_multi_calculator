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
 * Mobile-safe result stat: scales font down on small screens, breaks long
 * numbers gracefully (overflow-hidden + truncate fallback), and supports a
 * subtitle hint.
 */
export function Stat({ label, value, hint, tone = "default" }: StatProps) {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <span className="text-text-tertiary text-[10px] tracking-wide uppercase sm:text-xs">
        {label}
      </span>
      <span
        className={cn(
          "truncate text-lg font-bold tabular-nums sm:text-xl lg:text-2xl",
          TONE_CLASS[tone],
        )}
        title={value}
      >
        {value}
      </span>
      {hint && <span className="text-text-tertiary text-xs">{hint}</span>}
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
