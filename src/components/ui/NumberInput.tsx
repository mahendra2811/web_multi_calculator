"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { Input, type InputProps } from "@/components/ui/Input";

export interface NumberInputProps extends Omit<
  InputProps,
  "value" | "onChange" | "type" | "defaultValue"
> {
  /** Committed numeric state owned by the parent. */
  value: number;
  /** Emitted on every valid parse while typing and after blur-clamping. */
  onValueChange: (n: number) => void;
  min?: number;
  max?: number;
  /** Allow negative values. Default true; when false, blur clamps to >= 0. */
  allowNegative?: boolean;
  /** Allow decimal values. Default true. */
  allowDecimal?: boolean;
}

function toDraft(n: number): string {
  return Number.isFinite(n) ? String(n) : "";
}

/**
 * Numeric input with a "string draft + numeric commit" model so users can
 * freely edit (including clearing the field) without the value snapping back.
 *
 * - While typing: invalid/partial drafts ("", "-", ".") are kept locally and
 *   NOT emitted, so the parent keeps the last valid value and results stay
 *   stable.
 * - On blur: the draft is parsed, clamped to min/max (and >= 0 when
 *   `allowNegative` is false), normalized, and committed. An empty draft
 *   reverts to the last committed value.
 * - External updates (e.g. a paired Slider) sync into the draft only while
 *   the field is not focused, so they never clobber in-progress typing.
 */
export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      value,
      onValueChange,
      min,
      max,
      allowNegative = true,
      allowDecimal = true,
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const [draft, setDraft] = useState<string>(() => toDraft(value));
    const focused = useRef(false);

    // Keep the draft in sync with external value changes (slider, reset)
    // while the user is not typing in this field.
    useEffect(() => {
      if (!focused.current) setDraft(toDraft(value));
    }, [value]);

    const pattern = new RegExp(
      `^${allowNegative ? "-?" : ""}\\d*${allowDecimal ? "\\.?\\d*" : ""}$`,
    );

    return (
      <Input
        ref={ref}
        type="text"
        inputMode={allowDecimal ? "decimal" : "numeric"}
        value={draft}
        onChange={(e) => {
          const s = e.target.value;
          if (!pattern.test(s)) return; // ignore non-numeric keystrokes
          setDraft(s);
          const n = Number(s);
          if (s !== "" && s !== "-" && s !== "." && s !== "-." && Number.isFinite(n)) {
            onValueChange(n);
          }
        }}
        onFocus={(e) => {
          focused.current = true;
          onFocus?.(e);
        }}
        onBlur={(e) => {
          focused.current = false;
          let n = Number(draft);
          if (draft === "" || !Number.isFinite(n)) n = value; // revert to last committed
          if (!allowNegative && n < 0) n = 0;
          if (min != null && n < min) n = min;
          if (max != null && n > max) n = max;
          setDraft(toDraft(n));
          onValueChange(n);
          onBlur?.(e);
        }}
        {...props}
      />
    );
  },
);
NumberInput.displayName = "NumberInput";
