import { HelpCircle } from "lucide-react";
import type { FaqItem } from "@/lib/faqs/types";

interface Props {
  faqs: FaqItem[];
  calculatorName: string;
  /** Render only the FAQ list, no section/header chrome (for CollapsibleSection). */
  bare?: boolean;
}

export function FaqSection({ faqs, calculatorName, bare = false }: Props) {
  if (faqs.length === 0) return null;

  const list = (
    <div className="border-border bg-surface-elevated divide-border divide-y overflow-hidden rounded-2xl border">
      {faqs.map((f, i) => (
        <details key={i} className="group/faq">
          <summary className="hover:bg-surface flex cursor-pointer list-none items-center justify-between gap-4 p-4 transition-colors sm:p-5">
            <h3 className="text-text text-sm leading-snug font-semibold sm:text-base">{f.q}</h3>
            <span
              className="text-text-tertiary flex h-6 w-6 shrink-0 items-center justify-center text-lg transition-transform group-open/faq:rotate-45"
              aria-hidden
            >
              +
            </span>
          </summary>
          <div className="text-text-secondary px-4 pb-4 text-sm leading-relaxed sm:px-5 sm:pb-5 sm:text-[15px]">
            {f.a}
          </div>
        </details>
      ))}
    </div>
  );

  if (bare) return list;

  return (
    <section className="container-page py-12">
      <header className="mb-6 flex items-center gap-3">
        <span className="bg-primary/15 text-primary flex h-9 w-9 items-center justify-center rounded-lg">
          <HelpCircle className="h-4 w-4" />
        </span>
        <div>
          <h2 className="text-text text-xl font-bold">
            Frequently asked about the {calculatorName}
          </h2>
        </div>
      </header>
      {list}
    </section>
  );
}
