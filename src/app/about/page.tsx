import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "About CalcMaster.",
};

const FEEDBACK_EMAIL = "mahendrapuniya92@gmail.com";

export default function AboutPage() {
  return (
    <div className="container-page max-w-2xl py-12">
      <h1 className="text-text text-3xl font-bold">About CalcMaster</h1>
      <p className="text-text-secondary mt-4">
        CalcMaster is a free collection of calculators for everyday finance, math, health, unit
        conversion, date, and crypto/stock tasks. It runs entirely in your browser, works offline,
        and tracks nothing.
      </p>

      <h2 className="text-text mt-8 text-lg font-semibold">What&apos;s inside</h2>
      <ul className="text-text-secondary mt-3 list-disc space-y-1 pl-5">
        <li>65+ calculators across six categories</li>
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
