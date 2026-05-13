import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Flame, Sparkles } from "lucide-react";
import { CALCULATORS, CATEGORIES, getCalculatorsByCategory } from "@/constants/calculators";
import { CALCULATOR_COUNT_LABEL } from "@/constants/stats";
import { IMPLEMENTED_SLUGS } from "@/lib/calculators/registry";
import { CalculatorList } from "@/components/calculator/CalculatorList";
import { CategoryList } from "@/components/calculator/CategoryList";
import { HeroSceneClient } from "@/components/three/HeroSceneClient";
import { HeroSearchTrigger } from "@/components/search/HeroSearchTrigger";
import { FaqSection } from "@/components/calculator/FaqSection";
import { JsonLd, faqSchema } from "@/components/seo/JsonLd";
import { HOME_FAQS } from "@/lib/faqs/home";

const POPULAR_SLUGS = ["sip", "emi", "bmi", "compound-interest", "percentage", "gst"] as const;

export default async function Home() {
  const t = await getTranslations("home");

  const liveCount = CALCULATORS.filter((c) => IMPLEMENTED_SLUGS.has(c.id)).length;

  const slugToCalc = new Map(CALCULATORS.map((c) => [c.id, c]));
  const popularCalcs = POPULAR_SLUGS.map((slug) => slugToCalc.get(slug)).filter(
    (c): c is NonNullable<typeof c> => Boolean(c && IMPLEMENTED_SLUGS.has(c.id)),
  );

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
            {CALCULATOR_COUNT_LABEL} calculators · works offline · zero tracking
          </span>
          <h1 className="text-text max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl">
            {t("heroTitle")}
          </h1>
          <p className="text-text-secondary mt-5 max-w-2xl text-base text-balance md:text-lg">
            {t("heroSubtitle", { count: CALCULATOR_COUNT_LABEL })}
          </p>
          <div className="mt-8 w-full">
            <HeroSearchTrigger />
          </div>
          <Link
            href="#categories"
            className="group bg-primary text-primary-foreground shadow-primary/20 mt-6 inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-semibold shadow-lg transition-transform hover:-translate-y-0.5"
          >
            {t("ctaExplore")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      <section id="popular" className="container-page py-12 lg:py-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div className="min-w-0">
            <div className="text-accent mb-2 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase">
              <Flame className="h-3.5 w-3.5" />
              Popular
            </div>
            <h2 className="text-text text-2xl font-bold md:text-3xl">Most-used calculators</h2>
            <p className="text-text-secondary mt-1 text-sm">
              Quick access to the 6 tools used most often.
            </p>
          </div>
          <Link
            href="#categories"
            className="text-text-secondary hover:text-text hidden shrink-0 items-center gap-1 text-sm font-medium sm:inline-flex"
          >
            See all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <CalculatorList items={popularCalcs} />
      </section>

      <section id="categories" className="container-page py-12 lg:py-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-text text-2xl font-bold md:text-3xl">Categories</h2>
            <p className="text-text-secondary mt-1 text-sm">
              {CATEGORIES.length} categories · {liveCount}+ calculators live.
            </p>
          </div>
        </div>
        <CategoryList
          items={CATEGORIES.map((cat) => ({
            ...cat,
            count: getCalculatorsByCategory(cat.id).length,
          }))}
        />
      </section>

      <JsonLd data={faqSchema(HOME_FAQS.map((f) => ({ question: f.q, answer: f.a })))} />
      <FaqSection faqs={HOME_FAQS} calculatorName="CalcMaster" />
    </>
  );
}
