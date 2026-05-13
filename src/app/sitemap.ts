import type { MetadataRoute } from "next";
import { CALCULATORS, CATEGORIES } from "@/constants/calculators";
import { absoluteUrl } from "@/lib/site";
import { getBlogProvider } from "@/lib/blog/provider";
import { IMPLEMENTED_SLUGS } from "@/lib/calculators/registry";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: absoluteUrl("/privacy"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/search"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/blog"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.flatMap((c) => [
    {
      url: absoluteUrl(`/category/${c.id}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: absoluteUrl(`/blog/category/${c.id}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
  ]);

  const calculatorRoutes: MetadataRoute.Sitemap = CALCULATORS.map((c) => ({
    url: absoluteUrl(`/calculator/${c.id}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: IMPLEMENTED_SLUGS.has(c.id) ? 0.9 : 0.5,
  }));

  const provider = await getBlogProvider();
  const posts = await provider.list();
  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: absoluteUrl(`/blog/${p.slug}`),
    lastModified: new Date(p.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...calculatorRoutes, ...blogRoutes];
}
