"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  ArrowRight,
  Heart,
  History as HistoryIcon,
  Languages,
  Moon,
  Settings as SettingsIcon,
  Sun,
  Trash2,
  User,
} from "lucide-react";
import { useFavorites, useHistory } from "@/lib/storage/stores";
import { getCalculatorBySlug } from "@/constants/calculators";
import { IMPLEMENTED_SLUGS } from "@/lib/calculators/registry";
import { CALCULATOR_COUNT_LABEL } from "@/constants/stats";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import {
  CATEGORY_BADGE_CLASS,
  CATEGORY_TEXT_CLASS,
} from "@/components/calculator/category-classes";
import { useTheme, type Theme } from "@/contexts/ThemeProvider";

const THEMES: Theme[] = ["light", "dark", "system"];

export default function ProfilePage() {
  const favoriteIds = useFavorites((s) => s.ids);
  const removeFavorite = useFavorites((s) => s.toggle);
  const historyEntries = useHistory((s) => s.entries);
  const clearHistory = useHistory((s) => s.clear);
  const removeHistory = useHistory((s) => s.remove);
  const { theme, setTheme } = useTheme();

  const favorites = useMemo(
    () =>
      favoriteIds
        .map((id) => getCalculatorBySlug(id))
        .filter((c): c is NonNullable<ReturnType<typeof getCalculatorBySlug>> => Boolean(c)),
    [favoriteIds],
  );

  const recentHistory = historyEntries.slice(0, 5);
  const uniqueCalculatorsUsed = new Set(historyEntries.map((e) => e.calculatorId)).size;

  return (
    <div className="container-page py-6 lg:py-10">
      {/* Header */}
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-2xl">
            <User className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-text text-2xl font-bold sm:text-3xl">Your profile</h1>
            <p className="text-text-secondary text-sm">
              Everything you&apos;ve saved, used, and configured — all local.
            </p>
          </div>
        </div>
      </header>

      {/* Quick stats */}
      <section className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        <StatCard
          label="Favorites"
          value={favorites.length}
          icon={<Heart className="text-error h-5 w-5" />}
          href="/favorites"
        />
        <StatCard
          label="Calculations"
          value={historyEntries.length}
          icon={<HistoryIcon className="text-secondary h-5 w-5" />}
          href="/history"
        />
        <StatCard
          label="Tools tried"
          value={uniqueCalculatorsUsed}
          icon={<User className="text-primary h-5 w-5" />}
          suffix={` / ${CALCULATOR_COUNT_LABEL}`}
        />
        <StatCard
          label="Theme"
          value={theme}
          icon={
            theme === "dark" ? (
              <Moon className="text-accent h-5 w-5" />
            ) : (
              <Sun className="text-accent h-5 w-5" />
            )
          }
          href="/settings"
          isText
        />
      </section>

      {/* Favorites preview */}
      <section className="mb-10">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-text flex items-center gap-2 text-lg font-bold sm:text-xl">
              <Heart className="text-error h-5 w-5" /> Favorites
            </h2>
            <p className="text-text-secondary text-xs">
              Saved calculators you keep coming back to.
            </p>
          </div>
          {favorites.length > 0 && (
            <Link
              href="/favorites"
              className="text-text-secondary hover:text-text inline-flex items-center gap-1 text-sm font-medium"
            >
              See all
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
        {favorites.length === 0 ? (
          <EmptyCard
            icon={<Heart className="text-text-tertiary h-6 w-6" />}
            title="No favorites yet"
            body="Tap the heart icon on any calculator to save it here."
          />
        ) : (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {favorites.slice(0, 8).map((c) => {
              const live = IMPLEMENTED_SLUGS.has(c.id);
              return (
                <li key={c.id} className="relative">
                  <Link
                    href={`/calculator/${c.id}`}
                    className="group border-border bg-surface-elevated hover:border-primary/40 flex h-full flex-col gap-2 rounded-xl border p-3 transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${CATEGORY_BADGE_CLASS[c.category] ?? ""}`}
                      >
                        <Icon name={c.icon} className="h-4 w-4" />
                      </div>
                      {!live && (
                        <span className="border-border text-text-tertiary rounded-full border px-1.5 py-0.5 text-[9px] font-semibold tracking-wide uppercase">
                          Soon
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-text truncate text-sm font-semibold">{c.name}</p>
                      <p className="text-text-secondary line-clamp-1 text-xs">{c.shortDesc}</p>
                    </div>
                  </Link>
                  <button
                    type="button"
                    onClick={() => removeFavorite(c.id)}
                    aria-label={`Remove ${c.name} from favorites`}
                    className="bg-surface-elevated border-border text-text-tertiary hover:text-error absolute top-1.5 right-1.5 rounded-md border p-1 opacity-0 transition group-hover:opacity-100 focus-visible:opacity-100"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* History preview */}
      <section className="mb-10">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-text flex items-center gap-2 text-lg font-bold sm:text-xl">
              <HistoryIcon className="text-text-secondary h-5 w-5" /> Recent calculations
            </h2>
            <p className="text-text-secondary text-xs">Last few results you computed.</p>
          </div>
          <div className="flex items-center gap-2">
            {historyEntries.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearHistory}>
                <Trash2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Clear</span>
              </Button>
            )}
            {historyEntries.length > 5 && (
              <Link
                href="/history"
                className="text-text-secondary hover:text-text inline-flex items-center gap-1 text-sm font-medium"
              >
                See all
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>
        {recentHistory.length === 0 ? (
          <EmptyCard
            icon={<HistoryIcon className="text-text-tertiary h-6 w-6" />}
            title="Nothing here yet"
            body="Run any calculator and the result will appear here automatically."
          />
        ) : (
          <ul className="flex flex-col gap-2">
            {recentHistory.map((e) => {
              const meta = getCalculatorBySlug(e.calculatorId);
              if (!meta) return null;
              const when = new Date(e.createdAt);
              return (
                <li
                  key={e.id}
                  className="border-border bg-surface-elevated flex items-center gap-3 rounded-xl border p-3 sm:p-4"
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${CATEGORY_BADGE_CLASS[meta.category] ?? ""}`}
                  >
                    <Icon name={meta.icon} className="h-5 w-5" />
                  </div>
                  <Link href={`/calculator/${e.calculatorId}`} className="min-w-0 flex-1">
                    <p className="text-text truncate text-sm font-semibold">{meta.name}</p>
                    <p className="text-text-tertiary text-xs">
                      {when.toLocaleDateString()} ·{" "}
                      {when.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </Link>
                  <Link
                    href={`/calculator/${e.calculatorId}`}
                    className={`shrink-0 text-xs font-semibold ${CATEGORY_TEXT_CLASS[meta.category] ?? "text-primary"}`}
                  >
                    Re-run →
                  </Link>
                  <button
                    type="button"
                    onClick={() => removeHistory(e.id)}
                    aria-label="Remove from history"
                    className="text-text-tertiary hover:text-error shrink-0 rounded-md p-1 transition"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* Settings shortcut */}
      <section>
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-text flex items-center gap-2 text-lg font-bold sm:text-xl">
              <SettingsIcon className="text-text-secondary h-5 w-5" /> Quick settings
            </h2>
            <p className="text-text-secondary text-xs">
              Theme + locale here, full settings on the dedicated page.
            </p>
          </div>
          <Link
            href="/settings"
            className="text-text-secondary hover:text-text inline-flex items-center gap-1 text-sm font-medium"
          >
            All settings
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="border-border bg-surface-elevated rounded-xl border p-4">
            <div className="text-text mb-3 flex items-center gap-2 text-sm font-semibold">
              {theme === "dark" ? (
                <Moon className="text-accent h-4 w-4" />
              ) : (
                <Sun className="text-accent h-4 w-4" />
              )}
              Theme
            </div>
            <div className="flex gap-2">
              {THEMES.map((t) => (
                <Button
                  key={t}
                  variant={theme === t ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => setTheme(t)}
                  className="flex-1 capitalize"
                >
                  {t}
                </Button>
              ))}
            </div>
          </div>
          <div className="border-border bg-surface-elevated rounded-xl border p-4">
            <div className="text-text mb-3 flex items-center gap-2 text-sm font-semibold">
              <Languages className="text-secondary h-4 w-4" />
              More options
            </div>
            <p className="text-text-secondary mb-3 text-xs">
              Locale, data export, and reset live on the full Settings page.
            </p>
            <Link href="/settings">
              <Button variant="secondary" size="sm" className="w-full">
                Open settings
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  href,
  isText,
  suffix,
}: {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  href?: string;
  isText?: boolean;
  suffix?: string;
}) {
  const body = (
    <div className="border-border bg-surface-elevated flex h-full flex-col gap-2 rounded-xl border p-4 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-text-secondary text-xs font-medium tracking-wide uppercase">
          {label}
        </span>
        {icon}
      </div>
      <div className="text-text text-2xl font-bold capitalize sm:text-3xl">
        {value}
        {suffix && <span className="text-text-tertiary text-sm font-medium">{suffix}</span>}
      </div>
      {isText ? (
        <span className="text-text-tertiary text-xs">Tap to change</span>
      ) : (
        <span className="text-text-tertiary text-xs">All-time</span>
      )}
    </div>
  );
  return href ? <Link href={href}>{body}</Link> : body;
}

function EmptyCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="border-border bg-surface-elevated/40 flex flex-col items-center gap-2 rounded-2xl border border-dashed p-8 text-center sm:p-10">
      {icon}
      <p className="text-text text-sm font-semibold">{title}</p>
      <p className="text-text-secondary text-xs">{body}</p>
    </div>
  );
}
