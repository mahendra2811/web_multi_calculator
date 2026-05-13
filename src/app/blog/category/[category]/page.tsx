import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getBlogProvider } from "@/lib/blog/provider";
import { BlogCard } from "@/components/blog/BlogCard";
import { CATEGORIES, getCategoryBySlug } from "@/constants/calculators";
import { Icon } from "@/components/ui/Icon";
import { CATEGORY_BADGE_CLASS } from "@/components/calculator/category-classes";
import type { Category } from "@/types/calculator";

interface Params {
  params: Promise<{ category: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return {};
  return {
    title: `${cat.name} blog`,
    description: `Articles, guides and deep-dives on ${cat.name.toLowerCase()} calculators.`,
  };
}

export default async function BlogCategoryPage({ params }: Params) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const provider = await getBlogProvider();
  const posts = await provider.byCategory(cat.id as Category);

  return (
    <div className="container-page py-10 lg:py-14">
      <Link
        href="/blog"
        className="text-text-secondary hover:text-text mb-6 inline-flex items-center gap-1 text-sm"
      >
        <ArrowLeft className="h-4 w-4" /> All posts
      </Link>

      <header className="mb-10 flex items-center gap-4">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-xl ${CATEGORY_BADGE_CLASS[cat.id]}`}
        >
          <Icon name={cat.icon} className="h-7 w-7" />
        </div>
        <div>
          <h1 className="text-text text-3xl font-bold">{cat.name} blog</h1>
          <p className="text-text-secondary text-sm">
            {cat.shortDesc} · {posts.length} posts
          </p>
        </div>
      </header>

      {posts.length === 0 ? (
        <p className="text-text-secondary border-border bg-surface-elevated rounded-2xl border border-dashed p-8 text-center">
          No posts in this category yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      )}
    </div>
  );
}
