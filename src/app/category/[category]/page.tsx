import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CATEGORIES, getCalculatorsByCategory, getCategoryBySlug } from "@/constants/calculators";
import { Icon } from "@/components/ui/Icon";
import { CATEGORY_BADGE_CLASS } from "@/components/calculator/category-classes";
import { CalculatorList } from "@/components/calculator/CalculatorList";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { FaqSection } from "@/components/calculator/FaqSection";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/components/seo/JsonLd";
import { CATEGORY_FAQS } from "@/lib/faqs/categories";
import { absoluteUrl, SITE } from "@/lib/site";
import type { Category } from "@/types/calculator";

interface Params {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category } = await params;
  const meta = getCategoryBySlug(category);
  if (!meta) return {};
  const canonical = `/category/${category}`;
  return {
    title: meta.name,
    description: meta.shortDesc,
    alternates: { canonical },
    openGraph: {
      title: `${meta.name} · ${SITE.name}`,
      description: meta.shortDesc,
      url: absoluteUrl(canonical),
    },
  };
}

export default async function CategoryPage({ params }: Params) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const items = getCalculatorsByCategory(cat.id as Category);
  const faqs = CATEGORY_FAQS[cat.id as Category] ?? [];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: cat.name, url: `/category/${cat.id}` },
          ]),
          ...(faqs.length > 0
            ? [faqSchema(faqs.map((f) => ({ question: f.q, answer: f.a })))]
            : []),
        ]}
      />
      <Breadcrumb items={[{ label: cat.name }]} />
      <div className="container-page py-6 lg:py-10">
        <header className="mb-8 flex items-start gap-4">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl sm:h-14 sm:w-14 ${CATEGORY_BADGE_CLASS[cat.id]}`}
          >
            <Icon name={cat.icon} className="h-6 w-6 sm:h-7 sm:w-7" />
          </div>
          <div className="min-w-0">
            <h1 className="text-text text-2xl font-bold sm:text-3xl">{cat.name}</h1>
            <p className="text-text-secondary mt-1 text-sm">
              {cat.shortDesc} · {items.length} calculators
            </p>
          </div>
        </header>
        <CalculatorList items={items} emptyText="No calculators in this category yet." />
      </div>
      {faqs.length > 0 && <FaqSection faqs={faqs} calculatorName={cat.name} />}
    </>
  );
}
