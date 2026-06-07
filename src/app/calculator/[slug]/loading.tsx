import { cn } from "@/lib/utils";

function Sk({ className }: { className?: string }) {
  return <div className={cn("bg-surface-elevated animate-pulse rounded-md", className)} />;
}

/**
 * Instant skeleton shown while a calculator page renders on the server.
 * Mirrors the CalculatorShell layout: breadcrumb → header → inputs/result grid.
 */
export default function CalculatorLoading() {
  return (
    <div className="container-page py-6 lg:py-10">
      {/* Breadcrumb */}
      <Sk className="mb-6 h-4 w-48" />

      {/* Header: icon + title + short description */}
      <div className="mb-6 flex items-start gap-3 sm:gap-4">
        <Sk className="h-10 w-10 shrink-0 rounded-xl sm:h-12 sm:w-12" />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Sk className="h-6 w-2/3 max-w-xs" />
          <Sk className="h-4 w-1/2 max-w-sm" />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Inputs card */}
        <section className="lg:col-span-2">
          <div className="border-border bg-surface rounded-2xl border p-6">
            <Sk className="mb-6 h-5 w-24" />
            <div className="flex flex-col gap-6">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex flex-col gap-2">
                  <Sk className="h-4 w-32" />
                  <Sk className="h-11 w-full rounded-lg" />
                  <Sk className="h-2 w-full rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Result card */}
        <section className="lg:col-span-3">
          <div className="border-border bg-surface rounded-2xl border p-6">
            <Sk className="mb-6 h-5 w-20" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="flex flex-row items-baseline justify-between gap-3 sm:flex-col sm:gap-2"
                >
                  <Sk className="h-3 w-20" />
                  <Sk className="h-6 w-24" />
                </div>
              ))}
            </div>
            <Sk className="mt-6 h-[240px] w-full rounded-xl sm:h-[320px]" />
          </div>
        </section>
      </div>
    </div>
  );
}
