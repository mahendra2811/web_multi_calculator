import type { FaqItem } from "./types";

export const HOME_FAQS: FaqItem[] = [
  {
    q: "What is CalcMaster?",
    a: "CalcMaster is a free web app with 387+ calculators across finance, math, health, conversion, date/time, crypto, geometry, construction, automotive, physics, chemistry, electrical, cooking, lifestyle, developer tools, weather, and sports. Every calculator is free, requires no signup, and works in your browser.",
  },
  {
    q: "Is CalcMaster free to use?",
    a: "Yes — completely free, no ads, no signup, no usage caps. Every one of the 387+ calculators is free forever. There's no paid tier. The site runs entirely client-side, so we have no server costs to recoup.",
  },
  {
    q: "Does CalcMaster work on mobile?",
    a: "Yes. The whole site is responsive (tested at 360 px, 768 px, 1024 px) with touch-friendly controls (44 px minimum targets). You can also install it as a PWA on Android (Add to Home Screen) or iOS (Safari → Share → Add to Home Screen). After installing, your favorite calculators work offline.",
  },
  {
    q: "Does it work offline?",
    a: "Yes. CalcMaster is a Progressive Web App with a service worker that caches the pages you've visited. Once you've opened a calculator with internet access, it works without internet next time — useful in flights or low-coverage areas.",
  },
  {
    q: "Is my data private?",
    a: "All calculations run in your browser. We don't send your inputs to any server. Your favorites, history, and theme preference are stored in your browser's localStorage on your device. We use Google Analytics 4 to count anonymous events (page views, theme toggles) — no PII is ever collected.",
  },
  {
    q: "How accurate are the formulas?",
    a: "Every formula is sourced from peer-reviewed math, government publications (income tax, EPF, gratuity), or standard textbook formulas (physics, chemistry, finance). For tax, retirement, medical, and legal decisions, always verify the result with a qualified professional — CalcMaster is educational, not advisory.",
  },
  {
    q: "Can I bookmark a specific calculator?",
    a: "Yes. Every calculator has a permanent URL like /calculator/sip or /calculator/bmi. Bookmark it like any other webpage. We also support marking calculators as favorites (heart icon) which keeps them in your /favorites list on your device.",
  },
  {
    q: "Is CalcMaster available in Hindi?",
    a: "The interface supports both English and हिंदी — toggle in Settings. A subset of popular calculators have Hindi labels and FAQs. The math, formulas, and core functionality work identically in both languages.",
  },
  {
    q: "How do I find the right calculator quickly?",
    a: "Three options: (1) Use the global search (click the search button or press ⌘K / Ctrl+K) — fuzzy-matches across all 387 calculators by name, description, or keyword. (2) Browse categories from the header navigation — Finance, Math, Health, and the All Categories dropdown. (3) Each calculator page links to related ones at the bottom.",
  },
  {
    q: "Why is there an Indian-finance category separate from regular finance?",
    a: "Indian finance products (PPF, EPF, NPS, SSY, KVP, SCSS, GST, advance tax, regime comparison) have their own rules and tax treatment that don't map cleanly onto global finance calculators. We keep them in a dedicated 'Finance (India)' category so Indian users find them quickly, while global finance (compound interest, IRR, NPV) lives in 'Finance'.",
  },
  {
    q: "What's the difference between this and Calculator.net or Omni Calculator?",
    a: "Same problem space, three big differences: (1) we don't show ads; (2) every calculator has a curated FAQ section and structured data so it gets rich SERP snippets; (3) the design prioritizes mobile + dark mode + Indian number formatting (lakh / crore) by default. The formulas are all standard math, so accuracy is identical.",
  },
];
