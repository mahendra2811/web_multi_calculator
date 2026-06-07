import { cn } from "@/lib/utils";

function Sk({ className }: { className?: string }) {
  return <div className={cn("bg-surface-elevated animate-pulse rounded-md", className)} />;
}

/**
 * Instant skeleton shown while a category page renders on the server:
 * breadcrumb → category header → calculator card grid.
 */
export default function CategoryLoading() {
  return (
    <div className="container-page py-6 lg:py-10">
      {/* Breadcrumb */}
      <Sk className="mb-6 h-4 w-40" />

      {/* Category header */}
      <div className="mb-8 flex items-start gap-3 sm:gap-4">
        <Sk className="h-12 w-12 shrink-0 rounded-xl" />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Sk className="h-7 w-48" />
          <Sk className="h-4 w-2/3 max-w-md" />
        </div>
      </div>

      {/* Calculator cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="border-border bg-surface flex items-center gap-3 rounded-xl border p-4"
          >
            <Sk className="h-9 w-9 shrink-0 rounded-lg" />
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <Sk className="h-4 w-2/3" />
              <Sk className="h-3 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
