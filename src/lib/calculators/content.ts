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

export interface ContentSection {
  /** Plain-text h2 heading; `null` for intro content before the first h2. */
  heading: string | null;
  html: string;
}

/**
 * Same content as `getCalculatorContentHtml`, but split into one section per
 * `<h2>` so the page can render each as a click-to-open accordion item.
 * Intro text before the first h2 becomes a `heading: null` section.
 */
export async function getCalculatorContentSections(slug: string): Promise<ContentSection[] | null> {
  const html = await getCalculatorContentHtml(slug);
  if (!html) return null;
  return splitByH2(html);
}

function stripTags(s: string): string {
  return s.replace(/<[^>]*>/g, "").trim();
}

function splitByH2(html: string): ContentSection[] {
  const parts = html.split(/(?=<h2[ >])/i);
  const sections: ContentSection[] = [];
  for (const part of parts) {
    const m = part.match(/^<h2[^>]*>([\s\S]*?)<\/h2>/i);
    if (m) {
      sections.push({ heading: stripTags(m[1]), html: part.slice(m[0].length) });
    } else if (part.trim()) {
      sections.push({ heading: null, html: part });
    }
  }
  return sections;
}
