import type { Category } from "@/types/calculator";
import type { Blog, BlogProvider, BlogSummary } from "./types";

/**
 * Sanity provider stub.
 *
 * Drop in `next-sanity` client + GROQ queries here once the user provides:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_TOKEN  (writes only — public reads use the CDN)
 *
 * Until then, every method returns null/empty so `provider.ts` falls back to local.
 */
export function isSanityConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_DATASET,
  );
}

async function emptySummaries(): Promise<BlogSummary[]> {
  return [];
}

async function emptyBlog(): Promise<Blog | null> {
  return null;
}

export const sanityBlogProvider: BlogProvider = {
  list: emptySummaries,
  get: emptyBlog,
  byCategory: emptySummaries,
  byCalculator: emptySummaries,
};

// Suppress unused type warnings — these are part of the BlogProvider contract.
export type _UnusedTypes = [Category];
