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
          "bg-border accent-primary h-2 w-full cursor-pointer touch-none appearance-none rounded-full",
          // Bigger thumb on mobile for easier touch (24px), smaller on desktop (18px).
          "[&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md sm:[&::-webkit-slider-thumb]:h-[18px] sm:[&::-webkit-slider-thumb]:w-[18px]",
          "[&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 sm:[&::-moz-range-thumb]:h-[18px] sm:[&::-moz-range-thumb]:w-[18px]",
          className,
        )}
        {...props}
      />
    </div>
  );
}
