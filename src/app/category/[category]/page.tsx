import { notFound } from "next/navigation";
import Link from "next/link";
import { CATEGORIES, getCalculatorsByCategory, getCategoryBySlug } from "@/constants/calculators";
import { Icon } from "@/components/ui/Icon";
import {
  CATEGORY_BADGE_CLASS,
  CATEGORY_TEXT_CLASS,
} from "@/components/calculator/category-classes";
import type { Category } from "@/types/calculator";

interface Params {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.id }));
}

export async function generateMetadata({ params }: Params) {
  const { category } = await params;
  const meta = getCategoryBySlug(category);
  if (!meta) return {};
  return { title: meta.name, description: meta.shortDesc };
}

export default async function CategoryPage({ params }: Params) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const items = getCalculatorsByCategory(cat.id as Category);

  return (
    <div className="container-page py-10">
      <header className="mb-8 flex items-center gap-4">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-xl ${CATEGORY_BADGE_CLASS[cat.id]}`}
        >
          <Icon name={cat.icon} className="h-7 w-7" />
        </div>
        <div>
          <h1 className="text-text text-3xl font-bold">{cat.name}</h1>
          <p className="text-text-secondary text-sm">
            {cat.shortDesc} · {items.length} calculators
          </p>
        </div>
      </header>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => (
          <Link
            key={c.id}
            href={`/calculator/${c.id}`}
            className="group border-border bg-surface-elevated hover:border-primary/40 flex items-start gap-4 rounded-xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${CATEGORY_BADGE_CLASS[c.category]}`}
            >
              <Icon name={c.icon} className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-text truncate font-semibold">{c.name}</h3>
              <p className="text-text-secondary mt-0.5 line-clamp-2 text-sm">{c.shortDesc}</p>
              <span
                className={`mt-2 inline-flex items-center text-xs font-semibold ${CATEGORY_TEXT_CLASS[c.category]}`}
              >
                Open →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
