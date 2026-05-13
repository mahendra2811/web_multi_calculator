"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useFavorites } from "@/lib/storage/stores";
import { getCalculatorBySlug } from "@/constants/calculators";
import { Icon } from "@/components/ui/Icon";
import { CATEGORY_BADGE_CLASS } from "@/components/calculator/category-classes";

export default function FavoritesPage() {
  const ids = useFavorites((s) => s.ids);
  const items = ids.map(getCalculatorBySlug).filter(Boolean);

  return (
    <div className="container-page py-10">
      <header className="mb-6 flex items-center gap-3">
        <Heart className="text-error h-6 w-6" />
        <h1 className="text-text text-2xl font-bold">Favorites</h1>
      </header>
      {items.length === 0 ? (
        <div className="border-border bg-surface-elevated rounded-2xl border border-dashed p-10 text-center">
          <p className="text-text-secondary">No favorites yet. Tap the heart on any calculator.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c) => (
            <Link
              key={c!.id}
              href={`/calculator/${c!.id}`}
              className="border-border bg-surface-elevated hover:border-primary/40 flex items-start gap-3 rounded-xl border p-4"
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${CATEGORY_BADGE_CLASS[c!.category]}`}
              >
                <Icon name={c!.icon} className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-text text-sm font-semibold">{c!.name}</h3>
                <p className="text-text-secondary text-xs">{c!.shortDesc}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
