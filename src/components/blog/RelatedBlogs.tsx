import { BlogCard } from "./BlogCard";
import type { BlogSummary } from "@/lib/blog/types";

export function RelatedBlogs({
  posts,
  title = "Related reads",
}: {
  posts: BlogSummary[];
  title?: string;
}) {
  if (posts.length === 0) return null;
  return (
    <section className="container-page py-12">
      <h2 className="text-text mb-6 text-2xl font-bold">{title}</h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <BlogCard key={p.slug} post={p} />
        ))}
      </div>
    </section>
  );
}
