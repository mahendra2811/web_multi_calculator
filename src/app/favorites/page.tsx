"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/lib/storage/stores";
import { getCalculatorBySlug } from "@/constants/calculators";
import { CalculatorList } from "@/components/calculator/CalculatorList";
import type { CalculatorMeta } from "@/types/calculator";

export default function FavoritesPage() {
  const ids = useFavorites((s) => s.ids);
  const items = ids.map(getCalculatorBySlug).filter((x): x is CalculatorMeta => Boolean(x));

  return (
    <div className="container-page py-6 lg:py-10">
      <header className="mb-6 flex items-center gap-3">
        <Heart className="text-error h-5 w-5 sm:h-6 sm:w-6" />
        <h1 className="text-text text-xl font-bold sm:text-2xl">Favorites</h1>
      </header>
      <CalculatorList
        items={items}
        emptyText="No favorites yet. Tap the heart on any calculator."
      />
    </div>
  );
}
