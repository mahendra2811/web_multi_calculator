"use client";

import Link from "next/link";
import { History as HistoryIcon, Trash2 } from "lucide-react";
import { useHistory } from "@/lib/storage/stores";
import { getCalculatorBySlug } from "@/constants/calculators";
import { Button } from "@/components/ui/Button";

export default function HistoryPage() {
  const entries = useHistory((s) => s.entries);
  const clear = useHistory((s) => s.clear);
  const remove = useHistory((s) => s.remove);

  return (
    <div className="container-page py-10">
      <header className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <HistoryIcon className="text-text-secondary h-6 w-6" />
          <h1 className="text-text text-2xl font-bold">History</h1>
        </div>
        {entries.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clear}>
            <Trash2 className="mr-1 h-4 w-4" /> Clear all
          </Button>
        )}
      </header>
      {entries.length === 0 ? (
        <div className="border-border bg-surface-elevated rounded-2xl border border-dashed p-10 text-center">
          <p className="text-text-secondary">No saved calculations yet.</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {entries.map((e) => {
            const meta = getCalculatorBySlug(e.calculatorId);
            return (
              <li
                key={e.id}
                className="border-border bg-surface-elevated flex items-center justify-between rounded-lg border p-4"
              >
                <Link href={`/calculator/${e.calculatorId}`} className="min-w-0 flex-1">
                  <h3 className="text-text truncate text-sm font-semibold">
                    {meta?.name ?? e.calculatorId}
                  </h3>
                  <p className="text-text-tertiary mt-0.5 truncate font-mono text-xs">
                    {JSON.stringify(e.result)}
                  </p>
                  <p className="text-text-tertiary mt-0.5 text-xs">
                    {new Date(e.createdAt).toLocaleString()}
                  </p>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(e.id)}
                  aria-label="Remove"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
