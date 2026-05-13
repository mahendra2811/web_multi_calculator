import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import readingTime from "reading-time";
import type { Category } from "@/types/calculator";
import type { Blog, BlogFrontmatter, BlogProvider, BlogSummary } from "./types";
import { coverForCalculator, coverForCategory } from "./unsplash";

const BLOG_DIR = path.join(process.cwd(), "blogs");

let cache: Blog[] | null = null;

function parseSlug(filename: string): { slug: string; order: number } {
  const base = filename.replace(/\.md$/, "");
  const m = base.match(/^(\d+)-(.+)$/);
  if (!m) return { slug: base, order: 9999 };
  return { slug: m[2], order: Number(m[1]) };
}

async function renderMarkdown(raw: string): Promise<string> {
  const file = await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(raw);
  return String(file);
}

function resolveCover(fm: BlogFrontmatter): { coverImage: string; coverAlt: string } {
  if (fm.coverImage) {
    return { coverImage: fm.coverImage, coverAlt: fm.coverAlt ?? fm.title };
  }
  if (fm.calculatorSlug) {
    const c = coverForCalculator(fm.calculatorSlug, fm.category);
    return { coverImage: c.url, coverAlt: c.alt };
  }
  if (fm.category) {
    const c = coverForCategory(fm.category);
    return { coverImage: c.url, coverAlt: c.alt };
  }
  return { coverImage: "", coverAlt: "" };
}

async function loadAll(): Promise<Blog[]> {
  if (cache) return cache;

  let files: string[];
  try {
    files = (await readdir(BLOG_DIR)).filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }

  const blogs = await Promise.all(
    files.map(async (filename): Promise<Blog> => {
      const fullPath = path.join(BLOG_DIR, filename);
      const raw = await readFile(fullPath, "utf-8");
      const { data, content } = matter(raw);
      const fm = data as BlogFrontmatter;
      const { slug, order } = parseSlug(filename);
      const html = await renderMarkdown(content);
      const cover = resolveCover(fm);
      const stats = readingTime(content);
      return {
        slug,
        order,
        title: fm.title,
        excerpt: fm.excerpt,
        kind: fm.kind,
        category: fm.category,
        calculatorSlug: fm.calculatorSlug,
        tags: fm.tags ?? [],
        publishedAt: fm.publishedAt,
        coverImage: cover.coverImage,
        coverAlt: cover.coverAlt,
        readingMinutes: Math.max(1, Math.round(stats.minutes)),
        contentHtml: html,
        contentRaw: content,
      };
    }),
  );

  blogs.sort((a, b) => a.order - b.order);
  cache = blogs;
  return blogs;
}

function toSummary(b: Blog): BlogSummary {
  return {
    slug: b.slug,
    order: b.order,
    title: b.title,
    excerpt: b.excerpt,
    kind: b.kind,
    category: b.category,
    calculatorSlug: b.calculatorSlug,
    tags: b.tags,
    publishedAt: b.publishedAt,
    coverImage: b.coverImage,
    coverAlt: b.coverAlt,
    readingMinutes: b.readingMinutes,
  };
}

export const localBlogProvider: BlogProvider = {
  async list() {
    return (await loadAll()).map(toSummary);
  },
  async get(slug) {
    return (await loadAll()).find((b) => b.slug === slug) ?? null;
  },
  async byCategory(category: Category) {
    return (await loadAll()).filter((b) => b.category === category).map(toSummary);
  },
  async byCalculator(slug: string) {
    return (await loadAll()).filter((b) => b.calculatorSlug === slug).map(toSummary);
  },
};
