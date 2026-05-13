"use client";

import { type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  valueLabel?: string;
}

export function Slider({ className, label, valueLabel, ...props }: SliderProps) {
  return (
    <div className="flex flex-col gap-2">
      {(label || valueLabel) && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary font-medium">{label}</span>
          {valueLabel && <span className="text-text font-semibold">{valueLabel}</span>}
        </div>
      )}
      <input
        type="range"
        className={cn(
          "bg-border accent-primary h-2 w-full cursor-pointer appearance-none rounded-full",
          "[&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full",
          className,
        )}
        {...props}
      />
    </div>
  );
}
