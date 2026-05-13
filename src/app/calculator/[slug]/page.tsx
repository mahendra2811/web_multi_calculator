import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllCalculators, getCalculatorBySlug } from "@/constants/calculators";
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
  return {
    title: meta.name,
    description: meta.shortDesc,
  };
}

export default async function CalculatorPage({ params }: PageParams) {
  const { slug } = await params;
  const meta = getCalculatorBySlug(slug);
  if (!meta) notFound();

  return (
    <Suspense
      fallback={<div className="container-page text-text-secondary py-10">Loading calculator…</div>}
    >
      <CalculatorLoader meta={meta} />
    </Suspense>
  );
}
