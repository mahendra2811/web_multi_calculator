import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Sparkles } from "lucide-react";
import { CATEGORIES, getCalculatorsByCategory } from "@/constants/calculators";
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

      <section className="container-page pb-16">
        <h2 className="text-text mb-6 text-2xl font-bold">Featured calculators</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { slug: "sip", title: "SIP Calculator", desc: "Plan monthly mutual-fund investments" },
            { slug: "emi", title: "EMI Calculator", desc: "Home & personal loan installments" },
            { slug: "bmi", title: "BMI Calculator", desc: "Body mass index & category" },
            { slug: "basic", title: "Basic Calculator", desc: "Everyday arithmetic" },
            { slug: "currency-converter", title: "Currency Converter", desc: "Live FX rates" },
            { slug: "age", title: "Age Calculator", desc: "Years, months, days" },
          ].map((c) => (
            <Link
              key={c.slug}
              href={`/calculator/${c.slug}`}
              className="group border-border bg-surface-elevated hover:border-primary/40 rounded-xl border p-5 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="text-text font-semibold">{c.title}</h3>
              <p className="text-text-secondary mt-1 text-sm">{c.desc}</p>
              <span className="text-primary mt-3 inline-flex items-center gap-1 text-sm font-medium">
                Open
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
