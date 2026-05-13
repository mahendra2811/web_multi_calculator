import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "CalcMaster privacy summary.",
};

const FEEDBACK_EMAIL = "mahendrapuniya92@gmail.com";

export default function PrivacyPage() {
  return (
    <div className="container-page max-w-2xl py-12">
      <h1 className="text-text text-3xl font-bold">Privacy</h1>
      <p className="text-text-secondary mt-4">
        CalcMaster runs entirely in your browser. We don&apos;t collect, store, or share any
        personal data.
      </p>

      <h2 className="text-text mt-8 text-lg font-semibold">What we store</h2>
      <ul className="text-text-secondary mt-3 list-disc space-y-1 pl-5">
        <li>Your theme &amp; language preference — saved in your browser&apos;s localStorage.</li>
        <li>
          Your favorites &amp; calculation history — saved in your browser&apos;s localStorage.
        </li>
      </ul>
      <p className="text-text-secondary mt-3">
        All of this stays on your device. Clear your browser data anytime to remove it.
      </p>

      <h2 className="text-text mt-8 text-lg font-semibold">No tracking</h2>
      <p className="text-text-secondary mt-3">
        No analytics, no ads, no third-party trackers, no accounts required.
      </p>

      <h2 className="text-text mt-8 text-lg font-semibold">Questions</h2>
      <p className="text-text-secondary mt-3">
        Email{" "}
        <a href={`mailto:${FEEDBACK_EMAIL}`} className="text-primary font-medium hover:underline">
          {FEEDBACK_EMAIL}
        </a>{" "}
        for anything privacy-related.
      </p>
    </div>
  );
}
