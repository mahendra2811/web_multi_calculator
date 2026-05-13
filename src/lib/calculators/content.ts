import { readFile } from "node:fs/promises";
import path from "node:path";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const CONTENT_DIR = path.join(process.cwd(), "content", "calculators");

const cache = new Map<string, string | null>();

/**
 * Loads the Block-5 SEO content for a calculator by slug. Returns rendered
 * HTML or `null` if no content file exists.
 *
 * Files live at `content/calculators/{slug}.md`. We use plain markdown instead
 * of MDX to keep the build server-side, fast, and dependency-light. JSX in
 * content files is intentionally NOT supported — the calculator UI itself
 * lives in the page, not in the marketing copy.
 */
export async function getCalculatorContentHtml(slug: string): Promise<string | null> {
  if (cache.has(slug)) return cache.get(slug) ?? null;

  const file = path.join(CONTENT_DIR, `${slug}.md`);
  let raw: string;
  try {
    raw = await readFile(file, "utf-8");
  } catch {
    cache.set(slug, null);
    return null;
  }

  const processed = await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(raw);
  const html = String(processed);
  cache.set(slug, html);
  return html;
}
