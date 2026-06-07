"use client";

import { type ReactNode, useEffect } from "react";
import { Heart, RotateCcw, Share2 } from "lucide-react";
import type { CalculatorMeta } from "@/types/calculator";
import { useFavorites, useRecents } from "@/lib/storage/stores";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { CATEGORY_BADGE_CLASS } from "@/components/calculator/category-classes";
import { track } from "@/lib/analytics/events";
import { ReminderButton } from "@/components/pwa/ReminderButton";

interface CalculatorShellProps {
  meta: CalculatorMeta;
  inputs: ReactNode;
  result: ReactNode;
  onReset?: () => void;
}

export function CalculatorShell({ meta, inputs, result, onReset }: CalculatorShellProps) {
  const isFavorite = useFavorites((s) => s.ids.includes(meta.id));
  const toggleFavorite = useFavorites((s) => s.toggle);
  const touchRecent = useRecents((s) => s.touch);

  useEffect(() => {
    touchRecent(meta.id);
    track.calculatorOpen(meta.id, meta.category);
    // Increment use-count for PushOptIn trigger threshold
    const key = "calcmaster:use-count";
    const prev = Number(localStorage.getItem(key) ?? "0");
    localStorage.setItem(key, String(prev + 1));
  }, [meta.id, meta.category, touchRecent]);

  const handleFavorite = () => {
    const willBeFavorite = !isFavorite;
    toggleFavorite(meta.id);
    track.favoriteToggle(meta.id, willBeFavorite);
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: meta.name, url });
        track.calculatorShare(meta.id, "native");
      } catch {
        /* user dismissed */
      }
    } else {
      await navigator.clipboard.writeText(url);
      track.calculatorShare(meta.id, "copy");
    }
  };

  return (
    <div className="container-page py-6 lg:py-10">
      <header className="mb-6 flex items-start justify-between gap-3 sm:gap-4">
        <div className="flex items-start gap-3 sm:gap-4">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12",
              CATEGORY_BADGE_CLASS[meta.category],
            )}
          >
            <Icon name={meta.icon} className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div className="min-w-0">
            <h1 className="text-text text-md font-bold sm:text-lg lg:text-3xl">{meta.name}</h1>
            {/* <p className="text-text-secondary mt-1 text-xs sm:text-sm">{meta.shortDesc}</p> */}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <ReminderButton calculatorSlug={meta.id} calculatorName={meta.name} />
          <Button variant="ghost" size="icon" aria-label="Favorite" onClick={handleFavorite}>
            <Heart className={cn("h-5 w-5", isFavorite && "fill-error text-error")} />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Share" onClick={handleShare}>
            <Share2 className="h-5 w-5" />
          </Button>
          {onReset && (
            <Button variant="ghost" size="icon" aria-label="Reset" onClick={onReset}>
              <RotateCcw className="h-5 w-5" />
            </Button>
          )}
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-5">
        <section className="lg:col-span-2">{inputs}</section>
        <section className="lg:col-span-3">{result}</section>
      </div>
    </div>
  );
}
