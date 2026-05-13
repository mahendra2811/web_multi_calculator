import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight, CheckCircle2, Clock, Sparkles } from "lucide-react";
import { CALCULATORS, CATEGORIES, getCalculatorsByCategory } from "@/constants/calculators";
import { IMPLEMENTED_SLUGS } from "@/lib/calculators/registry";
import { Icon } from "@/components/ui/Icon";
import {
  CATEGORY_BADGE_CLASS,
  CATEGORY_BG_SOFT_CLASS,
  CATEGORY_TEXT_CLASS,
} from "@/components/calculator/category-classes";
import { HeroSceneClient } from "@/components/three/HeroSceneClient";

export default async function Home() {
  const t = await getTranslations("home");
  const tCat = await getTranslations("categories");

  const liveCalcs = CALCULATORS.filter((c) => IMPLEMENTED_SLUGS.has(c.id));
  const pendingCalcs = CALCULATORS.filter((c) => !IMPLEMENTED_SLUGS.has(c.id));
  const totalCount = CALCULATORS.length;
  const liveCount = liveCalcs.length;
  const progressPct = Math.round((liveCount / totalCount) * 100);

  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-90">
          <HeroSceneClient />
        </div>
        <div
          aria-hidden
          className="from-background/0 via-background/40 to-background pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b"
        />
        <div className="container-page flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
          <span className="border-border bg-surface-elevated/70 text-text-secondary mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur">
            <Sparkles className="text-accent h-3.5 w-3.5" />
            65+ calculators · works offline · zero tracking
          </span>
          <h1 className="text-text max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl">
            {t("heroTitle")}
          </h1>
          <p className="text-text-secondary mt-5 max-w-2xl text-base text-balance md:text-lg">
            {t("heroSubtitle")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="#categories"
              className="group bg-primary text-primary-foreground shadow-primary/20 inline-flex h-12 items-center gap-2 rounded-xl px-6 text-sm font-semibold shadow-lg transition-transform hover:-translate-y-0.5"
            >
              {t("ctaExplore")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/search"
              className="border-border bg-surface-elevated/70 text-text hover:bg-surface inline-flex h-12 items-center rounded-xl border px-6 text-sm font-semibold backdrop-blur transition-colors"
            >
              Search by name
            </Link>
          </div>
        </div>
      </section>

      <section id="categories" className="container-page py-12 lg:py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-text text-2xl font-bold md:text-3xl">Categories</h2>
            <p className="text-text-secondary mt-1 text-sm">Browse calculators by category.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => {
            const count = getCalculatorsByCategory(cat.id).length;
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.id}`}
                className={`group border-border bg-surface-elevated relative overflow-hidden rounded-2xl border p-6 transition-all hover:-translate-y-1 hover:shadow-xl ${CATEGORY_BG_SOFT_CLASS[cat.id]}`}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${CATEGORY_BADGE_CLASS[cat.id]}`}
                  >
                    <Icon name={cat.icon} className="h-6 w-6" />
                  </div>
                  <span className="text-text-tertiary text-xs font-medium">{count} tools</span>
                </div>
                <h3 className="text-text mt-4 text-xl font-semibold">{tCat(cat.id)}</h3>
                <p className="text-text-secondary mt-1 text-sm">{cat.shortDesc}</p>
                <span
                  className={`mt-4 inline-flex items-center gap-1 text-sm font-medium ${CATEGORY_TEXT_CLASS[cat.id]}`}
                >
                  Open
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="container-page py-12 lg:py-16">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-text text-2xl font-bold md:text-3xl">Roadmap</h2>
            <p className="text-text-secondary mt-1 text-sm">
              {liveCount} of {totalCount} calculators are live. {pendingCalcs.length} more are
              coming.
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-text-secondary">{progressPct}%</span>
            <div className="bg-surface h-2 w-40 overflow-hidden rounded-full">
              <div className="bg-primary h-full" style={{ width: `${progressPct}%` }} />
            </div>
          </div>
        </div>

        <div className="text-text mb-4 flex items-center gap-2 text-sm font-semibold">
          <CheckCircle2 className="text-success h-4 w-4" />
          Live now · {liveCount}
        </div>
        <ul className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {liveCalcs.map((c) => (
            <li key={c.id}>
              <Link
                href={`/calculator/${c.id}`}
                className="group border-border bg-surface-elevated hover:border-primary/40 flex items-start gap-3 rounded-xl border p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${CATEGORY_BADGE_CLASS[c.category]}`}
                >
                  <Icon name={c.icon} className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-text truncate text-sm font-semibold">{c.name}</h3>
                    <span className="bg-success/15 text-success rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase">
                      Live
                    </span>
                  </div>
                  <p className="text-text-secondary line-clamp-1 text-xs">{c.shortDesc}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="text-text mb-4 flex items-center gap-2 text-sm font-semibold">
          <Clock className="text-text-tertiary h-4 w-4" />
          Coming soon · {pendingCalcs.length}
        </div>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pendingCalcs.map((c) => (
            <li
              key={c.id}
              className="border-border bg-surface-elevated/40 flex items-start gap-3 rounded-xl border p-4 opacity-70"
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${CATEGORY_BADGE_CLASS[c.category]} opacity-60`}
              >
                <Icon name={c.icon} className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-text truncate text-sm font-semibold">{c.name}</h3>
                  <span className="border-border text-text-tertiary rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase">
                    Soon
                  </span>
                </div>
                <p className="text-text-secondary line-clamp-1 text-xs">{c.shortDesc}</p>
              </div>
            </li>
          ))}
        </ul>

        <p className="text-text-secondary mt-8 text-center text-sm">
          Want a calculator prioritized? Email{" "}
          <a
            href="mailto:mahendrapuniya92@gmail.com"
            className="text-primary font-medium hover:underline"
          >
            mahendrapuniya92@gmail.com
          </a>
          .
        </p>
      </section>
    </>
  );
}
