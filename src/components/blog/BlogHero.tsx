import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowLeft } from "lucide-react";
import type { Blog } from "@/lib/blog/types";
import { CATEGORY_BADGE_CLASS } from "@/components/calculator/category-classes";

const KIND_LABEL: Record<Blog["kind"], string> = {
  category: "Overview",
  calculator: "Calculator guide",
  "deep-dive": "Deep dive",
};

export function BlogHero({ post }: { post: Blog }) {
  return (
    <header className="container-page max-w-4xl pt-8 pb-6 lg:pt-12">
      <Link
        href="/blog"
        className="text-text-secondary hover:text-text mb-6 inline-flex items-center gap-1 text-sm"
      >
        <ArrowLeft className="h-4 w-4" /> Back to all posts
      </Link>

      <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
        {post.category && (
          <Link
            href={`/blog/category/${post.category}`}
            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase ${CATEGORY_BADGE_CLASS[post.category]}`}
          >
            {post.category}
          </Link>
        )}
        <span className="text-text-tertiary border-border rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase">
          {KIND_LABEL[post.kind]}
        </span>
      </div>

      <h1 className="text-text text-3xl leading-tight font-bold md:text-5xl">{post.title}</h1>
      <p className="text-text-secondary mt-4 text-lg">{post.excerpt}</p>

      <div className="text-text-tertiary mt-6 flex flex-wrap items-center gap-4 text-sm">
        <span className="inline-flex items-center gap-1">
          <Clock className="h-4 w-4" /> {post.readingMinutes} min read
        </span>
        <time dateTime={post.publishedAt}>
          {new Date(post.publishedAt).toLocaleDateString("en-IN", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </time>
      </div>

      {post.coverImage && (
        <div className="bg-surface relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-2xl">
          <Image
            src={post.coverImage}
            alt={post.coverAlt || post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
            priority
            unoptimized
          />
        </div>
      )}
    </header>
  );
}
