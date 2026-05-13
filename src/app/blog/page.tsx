import type { Metadata } from "next";
import Link from "next/link";
import { getBlogProvider } from "@/lib/blog/provider";
import { BlogCard } from "@/components/blog/BlogCard";
import { CATEGORIES } from "@/constants/calculators";
import { CATEGORY_BADGE_CLASS } from "@/components/calculator/category-classes";

export const metadata: Metadata = {
  title: "Blog",
  description: "Guides, deep-dives and category overviews for every calculator in CalcMaster.",
};

export const revalidate = 3600;

export default async function BlogIndexPage() {
  const provider = await getBlogProvider();
  const posts = await provider.list();

  const featured = posts.slice(0, 3);
  const rest = posts.slice(3);

  return (
    <div className="container-page py-10 lg:py-14">
      <header className="mb-8 max-w-3xl">
        <h1 className="text-text text-3xl font-bold md:text-5xl">CalcMaster Blog</h1>
        <p className="text-text-secondary mt-3 text-lg">
          Plain-English guides to every calculator: what the formula is, when to use it, and the
          mistakes that cost real money.
        </p>
      </header>

      <nav className="mb-10 flex flex-wrap gap-2 text-xs">
        <Link
          href="/blog"
          className="bg-primary text-primary-foreground rounded-full px-3 py-1.5 font-semibold tracking-wide uppercase"
        >
          All
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c.id}
            href={`/blog/category/${c.id}`}
            className={`rounded-full px-3 py-1.5 font-semibold tracking-wide uppercase ${CATEGORY_BADGE_CLASS[c.id]}`}
          >
            {c.name}
          </Link>
        ))}
      </nav>

      {featured.length > 0 && (
        <section className="mb-12">
          <h2 className="text-text mb-5 text-xl font-semibold">Latest</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {featured.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section>
          <h2 className="text-text mb-5 text-xl font-semibold">All posts</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}

      {posts.length === 0 && (
        <p className="text-text-secondary border-border bg-surface-elevated mt-8 rounded-2xl border border-dashed p-8 text-center">
          No posts yet — add markdown files in{" "}
          <code className="bg-surface mx-1 rounded px-1 py-0.5 font-mono text-xs">/blogs</code>.
        </p>
      )}
    </div>
  );
}
