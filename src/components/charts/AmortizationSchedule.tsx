"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { formatINR } from "@/lib/format";

interface Row {
  month: number;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
}

interface Props {
  rows: Row[];
  /** Group rows by year with a yearly subtotal in between. */
  yearSubtotals?: boolean;
}

/**
 * Calculator.net-style amortization table. Compact "year summary" by default,
 * expandable to show every month. Mobile shows fewer columns automatically.
 */
export function AmortizationSchedule({ rows, yearSubtotals = true }: Props) {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  if (rows.length === 0) return null;

  // Group by year
  const yearMap = new Map<number, Row[]>();
  rows.forEach((r) => {
    const y = Math.ceil(r.month / 12);
    if (!yearMap.has(y)) yearMap.set(y, []);
    yearMap.get(y)!.push(r);
  });

  const toggleYear = (y: number) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(y)) next.delete(y);
      else next.add(y);
      return next;
    });

  return (
    <div className="border-border bg-surface-elevated overflow-hidden rounded-2xl border">
      {/* Header */}
      <div className="border-border bg-surface text-text-secondary grid grid-cols-[1fr_repeat(3,minmax(0,1fr))_auto] gap-2 border-b px-3 py-2.5 text-xs font-semibold tracking-wide uppercase sm:grid-cols-[80px_repeat(3,1fr)_120px] sm:px-4">
        <span>Year</span>
        <span className="text-right">Principal</span>
        <span className="text-right">Interest</span>
        <span className="hidden text-right sm:inline">EMI total</span>
        <span className="text-right">Balance</span>
      </div>

      {[...yearMap.entries()].map(([year, yearRows]) => {
        const principal = yearRows.reduce((s, r) => s + r.principal, 0);
        const interest = yearRows.reduce((s, r) => s + r.interest, 0);
        const emiTotal = yearRows.reduce((s, r) => s + r.emi, 0);
        const endBalance = yearRows[yearRows.length - 1].balance;
        const isOpen = expanded.has(year);
        return (
          <div key={year} className="border-border border-b last:border-b-0">
            <button
              type="button"
              onClick={() => toggleYear(year)}
              className="hover:bg-surface grid w-full grid-cols-[1fr_repeat(3,minmax(0,1fr))_auto] items-center gap-2 px-3 py-2.5 text-left text-sm transition-colors sm:grid-cols-[80px_repeat(3,1fr)_120px] sm:px-4"
              aria-expanded={isOpen}
            >
              <span className="text-text inline-flex items-center gap-1 font-semibold">
                <ChevronDown
                  className={`text-text-tertiary h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
                Year {year}
              </span>
              <span className="text-text-secondary truncate text-right font-mono text-xs sm:text-sm">
                {formatINR(principal)}
              </span>
              <span className="text-error truncate text-right font-mono text-xs sm:text-sm">
                {formatINR(interest)}
              </span>
              <span className="text-text-secondary hidden truncate text-right font-mono text-xs sm:inline sm:text-sm">
                {formatINR(emiTotal)}
              </span>
              <span className="text-text truncate text-right font-mono text-xs font-semibold sm:text-sm">
                {formatINR(endBalance)}
              </span>
            </button>
            {isOpen && (
              <div className="bg-surface/60 border-border border-t">
                <div className="border-border text-text-tertiary grid grid-cols-[1fr_repeat(3,minmax(0,1fr))_auto] gap-2 border-b px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase sm:grid-cols-[80px_repeat(3,1fr)_120px] sm:px-4">
                  <span>Month</span>
                  <span className="text-right">Principal</span>
                  <span className="text-right">Interest</span>
                  <span className="hidden text-right sm:inline">EMI</span>
                  <span className="text-right">Balance</span>
                </div>
                {yearRows.map((r) => (
                  <div
                    key={r.month}
                    className="text-text-secondary grid grid-cols-[1fr_repeat(3,minmax(0,1fr))_auto] gap-2 px-3 py-1 font-mono text-xs sm:grid-cols-[80px_repeat(3,1fr)_120px] sm:px-4"
                  >
                    <span>{r.month}</span>
                    <span className="truncate text-right">{formatINR(r.principal)}</span>
                    <span className="text-error/80 truncate text-right">
                      {formatINR(r.interest)}
                    </span>
                    <span className="hidden truncate text-right sm:inline">{formatINR(r.emi)}</span>
                    <span className="text-text truncate text-right font-semibold">
                      {formatINR(r.balance)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
      {/* Footnote */}
      {yearSubtotals && (
        <p className="text-text-tertiary border-border border-t px-3 py-2 text-[11px] sm:px-4">
          Tap a year to see month-by-month rows.
        </p>
      )}
    </div>
  );
}
