import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { CALCULATOR_COUNT_LABEL, TOTAL_CATEGORIES } from "@/constants/stats";

export const metadata: Metadata = {
  title: "About",
  description: `About ${SITE.name}.`,
};

const FEEDBACK_EMAIL = SITE.author.email;

export default function AboutPage() {
  return (
    <div className="container-page max-w-2xl py-12">
      <h1 className="text-text text-3xl font-bold">About {SITE.name}</h1>
      <p className="text-text-secondary mt-4">
        {SITE.name} is a free collection of calculators for everyday finance, math, health, unit
        conversion, date, and crypto/stock tasks. It runs entirely in your browser, works offline,
        and tracks nothing.
      </p>

      <h2 className="text-text mt-8 text-lg font-semibold">What&apos;s inside</h2>
      <ul className="text-text-secondary mt-3 list-disc space-y-1 pl-5">
        <li>
          {CALCULATOR_COUNT_LABEL} calculators across {TOTAL_CATEGORIES} categories
        </li>
        <li>Light &amp; dark themes</li>
        <li>English &amp; हिंदी</li>
        <li>Installable as an app (PWA)</li>
      </ul>

      <h2 className="text-text mt-8 text-lg font-semibold">Feedback &amp; queries</h2>
      <p className="text-text-secondary mt-3">
        Found a bug, have a calculator request, or just want to say hi? Email{" "}
        <a href={`mailto:${FEEDBACK_EMAIL}`} className="text-primary font-medium hover:underline">
          {FEEDBACK_EMAIL}
        </a>
        .
      </p>

      <p className="text-text-tertiary mt-10 text-sm">
        Calculations are educational. Always verify with a qualified professional before making
        financial or medical decisions. See the{" "}
        <Link href="/privacy" className="text-primary hover:underline">
          privacy page
        </Link>
        .
      </p>
    </div>
  );
}
