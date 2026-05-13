import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import type { BlogSummary } from "@/lib/blog/types";

interface Props {
  posts: BlogSummary[];
  calculatorName: string;
}

export function CalculatorBlogLinks({ posts, calculatorName }: Props) {
  if (posts.length === 0) return null;

  return (
    <section className="container-page py-12">
      <header className="mb-6 flex items-center gap-3">
        <span className="bg-primary/15 text-primary flex h-9 w-9 items-center justify-center rounded-lg">
          <BookOpen className="h-4 w-4" />
        </span>
        <div>
          <h2 className="text-text text-xl font-bold">Guides for the {calculatorName}</h2>
          <p className="text-text-secondary text-sm">
            Articles that explain when and how to use it, with examples.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group border-border bg-surface-elevated hover:border-primary/40 flex flex-col overflow-hidden rounded-xl border transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            {p.coverImage && (
              <div className="bg-surface relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={p.coverImage}
                  alt={p.coverAlt || p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
              </div>
            )}
            <div className="flex flex-1 flex-col gap-2 p-4">
              <h3 className="text-text group-hover:text-primary line-clamp-2 text-sm font-semibold">
                {p.title}
              </h3>
              <p className="text-text-secondary line-clamp-2 text-xs">{p.excerpt}</p>
              <div className="text-text-tertiary mt-auto flex items-center gap-2 text-[11px]">
                <Clock className="h-3 w-3" /> {p.readingMinutes} min
                <ArrowRight className="ml-auto h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
