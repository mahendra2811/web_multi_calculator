"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CALCULATORS } from "@/constants/calculators";
import { Input } from "@/components/ui/Input";
import { CalculatorList } from "@/components/calculator/CalculatorList";
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
    <div className="container-page py-6 lg:py-10">
      <div className="mb-4 flex items-center gap-3">
        <Search className="text-text-secondary h-5 w-5 sm:h-6 sm:w-6" />
        <h1 className="text-text text-xl font-bold sm:text-2xl">Search</h1>
      </div>
      <Input
        placeholder="SIP, BMI, EMI, prime, paint…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        autoFocus
      />
      <div className="mt-6">
        <CalculatorList items={matches} emptyText="No calculators match your search yet." />
      </div>
    </div>
  );
}
