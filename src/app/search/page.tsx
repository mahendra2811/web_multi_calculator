"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { CALCULATORS } from "@/constants/calculators";
import { Icon } from "@/components/ui/Icon";
import { Input } from "@/components/ui/Input";
import {
  CATEGORY_BADGE_CLASS,
  CATEGORY_TEXT_CLASS,
} from "@/components/calculator/category-classes";
import { track } from "@/lib/analytics/events";

export default function SearchPage() {
  const [q, setQ] = useState("");
  const matches = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return CALCULATORS;
    return CALCULATORS.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.shortDesc.toLowerCase().includes(query) ||
        c.id.toLowerCase().includes(query),
    );
  }, [q]);

  useEffect(() => {
    const term = q.trim();
    if (term.length < 2) return;
    const timer = setTimeout(() => track.searchQuery(term, matches.length), 600);
    return () => clearTimeout(timer);
  }, [q, matches.length]);

  return (
    <div className="container-page py-10">
      <div className="mb-6 flex items-center gap-3">
        <Search className="text-text-secondary h-6 w-6" />
        <h1 className="text-text text-2xl font-bold">Search</h1>
      </div>
      <Input
        placeholder="SIP, BMI, EMI, prime…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        autoFocus
      />
      <p className="text-text-tertiary mt-4 text-sm">
        {matches.length} of {CALCULATORS.length} calculators
      </p>
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {matches.map((c) => (
          <Link
            key={c.id}
            href={`/calculator/${c.id}`}
            className="border-border bg-surface-elevated hover:border-primary/40 flex items-start gap-3 rounded-xl border p-4 transition-colors"
          >
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${CATEGORY_BADGE_CLASS[c.category]}`}
            >
              <Icon name={c.icon} className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-text truncate text-sm font-semibold">{c.name}</h3>
              <p className="text-text-secondary line-clamp-1 text-xs">{c.shortDesc}</p>
              <span className={`text-xs font-medium ${CATEGORY_TEXT_CLASS[c.category]}`}>
                {c.category}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
