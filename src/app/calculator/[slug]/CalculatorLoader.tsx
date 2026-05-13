"use client";

import { Suspense } from "react";
import Link from "next/link";
import { calculatorRegistry } from "@/lib/calculators/registry";
import type { CalculatorMeta } from "@/types/calculator";

interface DispatcherProps {
  meta: CalculatorMeta;
}

function CalculatorDispatcher({ meta }: DispatcherProps) {
  const Comp = calculatorRegistry[meta.id];
  return <Comp meta={meta} />;
}

export function CalculatorLoader({ meta }: { meta: CalculatorMeta }) {
  if (!(meta.id in calculatorRegistry)) {
    return (
      <div className="container-page py-10">
        <div className="border-border bg-surface-elevated rounded-2xl border border-dashed p-10 text-center">
          <h2 className="text-text text-xl font-semibold">{meta.name}</h2>
          <p className="text-text-secondary mt-2 text-sm">
            This calculator is on the roadmap — see PLAN.md.
          </p>
          <Link
            href="/"
            className="bg-primary text-primary-foreground mt-6 inline-flex h-10 items-center rounded-lg px-4 text-sm font-medium"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="container-page text-text-secondary py-10">Loading…</div>}>
      <CalculatorDispatcher meta={meta} />
    </Suspense>
  );
}
