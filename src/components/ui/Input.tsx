"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  prefix?: string;
  suffix?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, hint, prefix, suffix, id, ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-text-secondary text-sm font-medium">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {prefix && (
            <span className="text-text-tertiary pointer-events-none absolute left-3 text-sm">
              {prefix}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "border-border bg-surface-elevated text-text placeholder:text-text-tertiary focus:border-primary focus:ring-primary/20 h-11 w-full rounded-lg border px-3 text-base transition-colors outline-none focus:ring-2",
              prefix && "pl-8",
              suffix && "pr-12",
              className,
            )}
            {...props}
          />
          {suffix && (
            <span className="text-text-tertiary pointer-events-none absolute right-3 text-sm">
              {suffix}
            </span>
          )}
        </div>
        {hint && <p className="text-text-tertiary text-xs">{hint}</p>}
      </div>
    );
  },
);
Input.displayName = "Input";
