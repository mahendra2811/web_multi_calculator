import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calculator as CalculatorIcon, Mail } from "lucide-react";
import { getBlogProvider } from "@/lib/blog/provider";
import { BlogContent } from "@/components/blog/BlogContent";
import { BlogHero } from "@/components/blog/BlogHero";
import { RelatedBlogs } from "@/components/blog/RelatedBlogs";
import { getCalculatorBySlug } from "@/constants/calculators";

interface Params {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const provider = await getBlogProvider();
  const posts = await provider.list();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const provider = await getBlogProvider();
  const post = await provider.get(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      images: post.coverImage ? [{ url: post.coverImage, alt: post.coverAlt }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const provider = await getBlogProvider();
  const post = await provider.get(slug);
  if (!post) notFound();

  const calc = post.calculatorSlug ? getCalculatorBySlug(post.calculatorSlug) : undefined;

  // Pull related posts: same category, exclude this one, limit 3
  const related = post.category ? await provider.byCategory(post.category) : [];
  const relatedFiltered = related.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <BlogHero post={post} />

      <main className="container-page max-w-4xl">
        <BlogContent html={post.contentHtml} />

        {calc && (
          <aside className="bg-primary/5 border-primary/30 mt-12 flex flex-col items-start gap-3 rounded-2xl border p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="bg-primary text-primary-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                <CalculatorIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-text font-semibold">Try the {calc.name}</p>
                <p className="text-text-secondary text-sm">{calc.shortDesc}</p>
              </div>
            </div>
            <Link
              href={`/calculator/${calc.id}`}
              className="bg-primary text-primary-foreground inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold"
            >
              Open calculator <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        )}

        <aside className="text-text-secondary border-border bg-surface-elevated mt-10 flex items-start gap-3 rounded-2xl border p-5 text-sm">
          <Mail className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            Spotted a mistake or have a topic request? Email{" "}
            <a
              href="mailto:mahendrapuniya92@gmail.com"
              className="text-primary font-medium hover:underline"
            >
              mahendrapuniya92@gmail.com
            </a>
            .
          </p>
        </aside>
      </main>

      <RelatedBlogs posts={relatedFiltered} />
    </>
  );
}
