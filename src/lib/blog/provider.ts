import { localBlogProvider } from "./local";
import { isSanityConfigured, sanityBlogProvider } from "./sanity";
import type { BlogProvider } from "./types";

/**
 * Returns the active blog provider.
 *
 * Behavior:
 *  - If Sanity env vars are set AND its `list()` returns posts, use Sanity.
 *  - Otherwise fall back to local markdown files in `/blogs`.
 *
 * Today the Sanity provider is a stub returning empty arrays — so we always read
 * from local. The day you add Sanity credentials and the migration runs, this
 * function automatically prefers Sanity.
 */
export async function getBlogProvider(): Promise<BlogProvider> {
  if (isSanityConfigured()) {
    const remote = await sanityBlogProvider.list();
    if (remote.length > 0) return sanityBlogProvider;
  }
  return localBlogProvider;
}
