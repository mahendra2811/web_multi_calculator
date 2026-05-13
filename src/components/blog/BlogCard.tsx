import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import type { BlogSummary } from "@/lib/blog/types";
import { CATEGORY_BADGE_CLASS } from "@/components/calculator/category-classes";

const KIND_LABEL: Record<BlogSummary["kind"], string> = {
  category: "Overview",
  calculator: "Guide",
  "deep-dive": "Deep dive",
};

export function BlogCard({ post }: { post: BlogSummary }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group bg-surface-elevated border-border hover:border-primary/40 flex flex-col overflow-hidden rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="bg-surface relative aspect-[16/9] w-full overflow-hidden">
        {post.coverImage && (
          <Image
            src={post.coverImage}
            alt={post.coverAlt || post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2 text-xs">
          {post.category && (
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase ${CATEGORY_BADGE_CLASS[post.category]}`}
            >
              {post.category}
            </span>
          )}
          <span className="text-text-tertiary border-border rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase">
            {KIND_LABEL[post.kind]}
          </span>
        </div>
        <h3 className="text-text group-hover:text-primary text-lg leading-snug font-semibold">
          {post.title}
        </h3>
        <p className="text-text-secondary line-clamp-2 text-sm">{post.excerpt}</p>
        <div className="text-text-tertiary mt-auto flex items-center gap-3 text-xs">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" /> {post.readingMinutes} min
          </span>
          <span aria-hidden>·</span>
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString("en-IN", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        </div>
      </div>
    </Link>
  );
}
