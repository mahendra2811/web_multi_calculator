"use client";

import { type ReactNode, useEffect } from "react";
import { Heart, RotateCcw, Share2 } from "lucide-react";
import { motion, useReducedMotion as useFmReducedMotion } from "framer-motion";
import type { CalculatorMeta } from "@/types/calculator";
import { useFavorites, useRecents } from "@/lib/storage/stores";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { CATEGORY_BADGE_CLASS } from "@/components/calculator/category-classes";
import { track } from "@/lib/analytics/events";

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
  const reduceMotion = useFmReducedMotion();

  useEffect(() => {
    touchRecent(meta.id);
    track.calculatorOpen(meta.id, meta.category);
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

  const motionProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.25 },
      };

  return (
    <motion.div {...motionProps} className="container-page py-6 lg:py-10">
      <header className="mb-6 flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl",
              CATEGORY_BADGE_CLASS[meta.category],
            )}
          >
            <Icon name={meta.icon} className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-text text-2xl font-bold lg:text-3xl">{meta.name}</h1>
            <p className="text-text-secondary mt-1 text-sm">{meta.shortDesc}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
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
    </motion.div>
  );
}
