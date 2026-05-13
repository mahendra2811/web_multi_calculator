import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllCalculators, getCalculatorBySlug, getCategoryBySlug } from "@/constants/calculators";
import { getBlogProvider } from "@/lib/blog/provider";
import { CalculatorBlogLinks } from "@/components/calculator/CalculatorBlogLinks";
import { JsonLd, breadcrumbSchema, softwareApplicationSchema } from "@/components/seo/JsonLd";
import { absoluteUrl, SITE } from "@/lib/site";
import { CalculatorLoader } from "./CalculatorLoader";

interface PageParams {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllCalculators().map((c) => ({ slug: c.id }));
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const meta = getCalculatorBySlug(slug);
  if (!meta) return {};
  const canonical = `/calculator/${slug}`;
  return {
    title: meta.name,
    description: meta.shortDesc,
    alternates: { canonical },
    openGraph: {
      title: `${meta.name} · ${SITE.name}`,
      description: meta.shortDesc,
      url: absoluteUrl(canonical),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${meta.name} · ${SITE.name}`,
      description: meta.shortDesc,
    },
  };
}

export default async function CalculatorPage({ params }: PageParams) {
  const { slug } = await params;
  const meta = getCalculatorBySlug(slug);
  if (!meta) notFound();

  const provider = await getBlogProvider();
  const blogs = await provider.byCalculator(meta.id);
  const category = getCategoryBySlug(meta.category);
  const url = absoluteUrl(`/calculator/${meta.id}`);

  const schemas = [
    softwareApplicationSchema({
      name: meta.name,
      description: meta.shortDesc,
      url,
      applicationCategory: "FinanceApplication",
    }),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: category?.name ?? meta.category, url: `/category/${meta.category}` },
      { name: meta.name, url: `/calculator/${meta.id}` },
    ]),
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <Suspense
        fallback={
          <div className="container-page text-text-secondary py-10">Loading calculator…</div>
        }
      >
        <CalculatorLoader meta={meta} />
      </Suspense>
      <CalculatorBlogLinks posts={blogs} calculatorName={meta.name} />
    </>
  );
}
