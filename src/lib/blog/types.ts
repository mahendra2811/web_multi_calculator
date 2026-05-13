import type { Category } from "@/types/calculator";

export type BlogKind = "category" | "calculator" | "deep-dive";

export interface BlogFrontmatter {
  title: string;
  excerpt: string;
  kind: BlogKind;
  category?: Category;
  calculatorSlug?: string;
  tags?: string[];
  publishedAt: string;
  coverImage?: string;
  coverAlt?: string;
}

export interface Blog extends BlogFrontmatter {
  slug: string;
  order: number;
  readingMinutes: number;
  contentHtml: string;
  contentRaw: string;
}

export interface BlogSummary {
  slug: string;
  order: number;
  title: string;
  excerpt: string;
  kind: BlogKind;
  category?: Category;
  calculatorSlug?: string;
  tags?: string[];
  publishedAt: string;
  coverImage?: string;
  coverAlt?: string;
  readingMinutes: number;
}

export interface BlogProvider {
  list(): Promise<BlogSummary[]>;
  get(slug: string): Promise<Blog | null>;
  byCategory(category: Category): Promise<BlogSummary[]>;
  byCalculator(slug: string): Promise<BlogSummary[]>;
}
