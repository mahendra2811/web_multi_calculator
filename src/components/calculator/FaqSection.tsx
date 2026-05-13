import { HelpCircle } from "lucide-react";
import type { FaqItem } from "@/lib/faqs/types";

interface Props {
  faqs: FaqItem[];
  calculatorName: string;
}

export function FaqSection({ faqs, calculatorName }: Props) {
  if (faqs.length === 0) return null;
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
          {/* <p className="text-text-secondary text-sm">
            {faqs.length} questions about how it works and when to use it.
          </p> */}
        </div>
      </header>

      <div className="border-border bg-surface-elevated divide-border divide-y overflow-hidden rounded-2xl border">
        {faqs.map((f, i) => (
          <details key={i} className="group">
            <summary className="hover:bg-surface flex cursor-pointer list-none items-center justify-between gap-4 p-5 transition-colors">
              <h3 className="text-text text-sm leading-snug font-semibold sm:text-base">{f.q}</h3>
              <span
                className="text-text-tertiary flex h-6 w-6 shrink-0 items-center justify-center text-lg transition-transform group-open:rotate-45"
                aria-hidden
              >
                +
              </span>
            </summary>
            <div className="text-text-secondary px-5 pb-5 text-sm leading-relaxed sm:text-[15px]">
              {f.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
