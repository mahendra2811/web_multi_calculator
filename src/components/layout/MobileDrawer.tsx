"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, History, Settings, User, X } from "lucide-react";
import { CATEGORIES, getCalculatorsByCategory } from "@/constants/calculators";
import { CATEGORY_BADGE_CLASS } from "@/components/calculator/category-classes";
import { Icon } from "@/components/ui/Icon";

const YOUR_SPACE = [
  { href: "/profile", label: "Profile", Icon: User },
  { href: "/favorites", label: "Favorites", Icon: Heart },
  { href: "/history", label: "History", Icon: History },
  { href: "/settings", label: "Settings", Icon: Settings },
] as const;

interface Props {
  open: boolean;
  onClose: () => void;
}

export function MobileDrawer({ open, onClose }: Props) {
  // Lock scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Escape to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="drawer-backdrop"
          className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
          aria-hidden
        >
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="bg-background border-border absolute top-0 right-0 flex h-full w-[86vw] max-w-sm flex-col border-l shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <header className="border-border flex items-center justify-between border-b p-4">
              <span className="text-text text-base font-bold">Categories</span>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="hover:bg-surface text-text-tertiary flex h-9 w-9 items-center justify-center rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-3">
              <p className="text-text-tertiary px-2 pb-2 text-[10px] font-semibold tracking-wider uppercase">
                Your space
              </p>
              <ul className="mb-5 flex flex-col gap-1">
                {YOUR_SPACE.map(({ href, label, Icon: I }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={onClose}
                      className="hover:bg-surface text-text flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
                    >
                      <I className="text-text-secondary h-4 w-4" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="text-text-tertiary px-2 pb-2 text-[10px] font-semibold tracking-wider uppercase">
                Categories
              </p>
              <ul className="flex flex-col gap-1">
                {CATEGORIES.map((c) => {
                  const count = getCalculatorsByCategory(c.id).length;
                  return (
                    <li key={c.id}>
                      <Link
                        href={`/category/${c.id}`}
                        onClick={onClose}
                        className="hover:bg-surface flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors"
                      >
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${CATEGORY_BADGE_CLASS[c.id]}`}
                        >
                          <Icon name={c.icon} className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-text truncate text-sm font-medium">{c.name}</p>
                          <p className="text-text-tertiary text-[11px]">
                            {count} calculator{count === 1 ? "" : "s"}
                          </p>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
