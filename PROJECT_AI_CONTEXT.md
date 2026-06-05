# CalcMaster Web (multi_calculator_web) — AI Project Context

> **Purpose of this file**: Give any AI (Claude, ChatGPT, Gemini) or human reader a complete understanding of this project in one read. Also serves as my personal interview-prep cheat sheet.

---

## 1. Quick Snapshot (TL;DR)

- **Project ID**: `calcmaster-web`
- **Title**: CalcMaster Web — 65+ Calculators across 6 categories
- **Category**: Web · Productivity · SEO · PWA
- **Status**: Foundation complete · 3 reference calcs shipped (Basic, SIP, BMI) · 62 to go
- **Year**: 2026
- **Role**: Solo Developer
- **Local path**: `a_web/multi_calculator_web/`
- **Deployed**: Vercel (vercel.json present)
- **Companion app**: Sibling Expo project at `a_APP/3. multi calculator/CalcMaster` — formulas ported from there

## 2. One-Sentence Description

Production-grade Next.js 16 web app with 65+ calculators (Finance, Math, Health, Converters, Date/Time, Crypto/Stock), Three.js hero + 3D charts, Recharts visualizations, MDX-driven SEO long-form content per calc, PWA, English+Hindi i18n, optional Supabase cloud sync — built to outrank Calculator.net by copying its 6-block page template and beating on UX + India coverage.

## 3. Long Description

The web counterpart to my Expo CalcMaster app, rebuilt for SEO scale. The core insight: Calculator.net wins thousands of search queries with mediocre UX but a rigid 6-block template applied uniformly across every calculator. This project replicates that template (Header → Inputs → Result → Visualization → 800–1500-word MDX SEO content → Footer extras) and ships a unified `<CalculatorShell>` that enforces it. All 65 calculators load via the single dynamic route `/calculator/[slug]` backed by a lazy registry (`src/lib/calculators/registry.ts`). Roughly 80% of calcs are schema-driven (declarative inputs/outputs/compute in a TS object); the other 20% are custom components for charts, amortization tables, multi-step flows, or shape renders. Heavy use of CSS-variable design tokens with `darkMode: "class"`; an inline no-flash script prevents FOUC. Three.js used for the home hero + optional 3D chart toggle on top finance calcs. Money uses `decimal.js` (no `Math.round` for finance). FAQ + BreadcrumbList + SoftwareApplication JSON-LD emitted per calc page.

## 4. Tech Stack (DO NOT DEVIATE)

- **Framework**: Next.js 16.x (App Router, Turbopack, Cache Components)
- **React**: 19.x (RSC, transitions)
- **Language**: TypeScript 5.x (strict)
- **Styling**: Tailwind v4 (CSS-first config)
- **3D**: Three.js + `@react-three/fiber` + `@react-three/drei`
- **2D charts**: Recharts 3.x
- **Animation**: Framer Motion 12.x
- **State**: Zustand 5.x (favorites, history, recents)
- **i18n**: next-intl 4.x (en + hi)
- **Auth/DB (optional)**: `@supabase/supabase-js` + `@supabase/ssr`
- **Math**: `decimal.js` (money), `mathjs` (general)
- **PWA**: `@ducanh2912/next-pwa` (manifest + Workbox)
- **Testing**: Vitest 4.x
- **Hooks**: Husky + lint-staged
- **MDX**: `next-mdx-remote` (for per-calc long-form SEO content)
- **Banned**: redux/jotai/mobx, moment.js, lodash (use targeted utils only)

## 5. The 6-Block Page Template (THE big idea)

Every `/calculator/[slug]` page renders:

1. **Header strip** — Breadcrumb (Home › Category › Calc Name) + Print button. Auto.
2. **Input panel** — single col mobile, two-col desktop. Rich `kind` (currency/percent/date/select/toggle), `[+ More Options]` behind expander when >6 inputs.
3. **Result summary** — one headline `<BigStat>` + supporting `<Stat>` grid + breakdown table + small donut.
4. **Detailed visualization** — amortization (loans), growth chart (SIP/Lumpsum), classification bar (BMI), function plot (trig/quad), etc. Recharts; 3D toggle on top finance calcs.
5. **Long-form SEO content** — 800–1500-word MDX at `content/calculators/{slug}.mdx` with 9 standard subsections (What is X / How is it calculated / Components / Variants / Caveats / Worked example / Limitations / Related / FAQ). **This is the moat.**
6. **Footer extras** — `<CalculatorBlogLinks>`, `<RelatedCalculators>`, `<FaqSection>` (with `FAQPage` JSON-LD).

## 6. Build Modes per Calculator

- **Schema-driven (default, ~80%)**: declarative `CalculatorSchema` in `src/lib/calculators/schemas/{category}.ts` — inputs + outputs + `compute()` + `formula`. Renders via the generic engine.
- **Custom component (~20%)**: when you need chart, amortization table, 3D toggle, multi-step UX, shape renders. Lives in `src/calculators/{category}/{Name}Calculator.tsx`. Must wrap in `<CalculatorShell>`, be `React.memo`'d, register in `registry.ts`, use `<Stat>` / `<BigStat>` only (never raw `<div>{value}</div>` for output).

## 7. Key Highlights

- 65 calculators across 6 categories (Finance 24 / Math 12 / Health 8 / Converter 10 / DateTime 5 / Crypto 6)
- Single dynamic route + lazy registry — every calc is one slug
- 6-block page template enforced via `<CalculatorShell>`
- MDX-driven SEO content (top-30 priority list)
- SchemaCalculator engine renders 80% of calcs from JS-objects
- 3D chart toggle on top finance calcs (SIP first)
- Recharts 2D primary, Three.js 3D optional
- Tailwind v4 with CSS-variable tokens + `darkMode: "class"`
- Inline no-flash dark-mode script
- next-intl (en/hi) with locale cookie
- Supabase cloud sync opt-in (RLS-scoped tables: `profiles`, `history`, `favorites`)
- PWA installable + offline for visited calcs
- Auto-generated FAQ (5 baseline) per calc + curated 7-10 for top-30
- Per-calc OG image at `/calculator/{slug}/opengraph-image`
- JSON-LD emitted: SoftwareApplication + BreadcrumbList + FAQPage

## 8. Problem → Solution

- **Problem**: Calculator.net dominates Google for calculator queries with outdated UX, no mobile-first design, no Indian coverage (GST, PPF, SIP, EPF, HRA, etc.), and no 3D/interactive visualizations.
- **Solution**: Copy their template (proven SEO), beat them on UX, mobile, India-specific calcs, charts, and MDX content depth. PWA + offline + cloud sync are bonuses competitors can't easily clone.

## 9. Architecture

```
src/
├── app/                 # App Router (RSC + client islands)
│   ├── calculator/[slug]/    # single dynamic route for all 65 calcs
│   ├── category/[category]/
│   ├── search/ favorites/ history/ settings/
│   └── api/                  # currency rates, sync
├── calculators/         # custom components, one folder per category
├── components/
│   ├── ui/              # primitives (Button, Card, Input, Slider, Stat, BigStat)
│   ├── layout/          # Header, Footer, SideNav, MobileTabBar
│   ├── three/           # HeroScene, ParticleField, ChartScene
│   └── charts/          # GrowthChart, AmortizationChart, ResultPieChart
├── lib/
│   ├── calculators/     # registry.ts + per-category schemas + math
│   ├── storage/         # localStorage + Supabase sync
│   └── three/           # geometry, materials helpers
├── constants/calculators.ts   # the canonical list (slugs PERMANENT)
└── i18n/messages/       # en.json + hi.json
content/calculators/{slug}.mdx   # SEO long-form per calc
```

## 10. Mandatory Artifacts per New Calculator

For every calc (checklist):

- **A** Metadata `C(...)` row in `src/constants/calculators.ts` (slug, name, shortDesc ≤80 chars, category, icon)
- **B** Pure math in `src/lib/calculators/{category}.ts` (deterministic, returns schedule for loans)
- **C** Unit test in `src/lib/calculators/{category}.test.ts` (textbook + edges)
- **D** UI — schema or custom (with `React.memo` + `<CalculatorShell>` + track event)
- **E** MDX SEO content at `content/calculators/{slug}.mdx` (800–1500 words, top-30 priority)
- **F** FAQs — curated 7–10 in `src/lib/faqs/curated.ts` (top-30) or auto-generator (5 baseline) for rest
- **G** Related-calcs `HAND_PICKED` entry for top-30
- **H** SEO meta — automatic from A + F (verify in browser)
- **I** Verification: `tsc --noEmit && eslint && vitest && next build` ALL green

## 11. Common Mistakes to Avoid

1. Inventing duplicate slugs — URLs are permanent
2. `Math.round` for money — use `decimal.js` + `formatINR()`
3. Plain `<div>{value}</div>` for results — use `<Stat>` / `<BigStat>` (mobile-safe truncation)
4. Three.js Canvas in RSC — must be Client + `dynamic({ ssr: false })`
5. Custom component when schema works — adds 60 lines for what 12 lines would do
6. Skipping FAQs — every page needs ≥5 (auto-gen handles it if needed)
7. Slug in registry but missing from constants (or vice versa) — page 404s
8. Hardcoding English in custom components — use `useTranslations` + `i18n/messages/`

## 12. Important File Paths

- README: `a_web/multi_calculator_web/README.md`
- Project plan: `PLAN.md`
- Growth notes: `GROWTH.md`
- Claude master guide: `CLAUDE.md`
- Project context: `.claude/PROJECT_CONTEXT.md` (READ THIS FIRST in future sessions)
- Calc constants: `src/constants/calculators.ts`
- Registry: `src/lib/calculators/registry.ts`
- Schemas: `src/lib/calculators/schemas/{category}.ts`
- MDX content: `content/calculators/{slug}.mdx`

## 13. Tags

`nextjs-16`, `app-router`, `cache-components`, `turbopack`, `tailwind-v4`, `threejs`, `recharts`, `mdx`, `seo`, `pwa`, `supabase`, `i18n`, `india-finance`, `decimal-js`, `calculator-net-killer`

---

## 14. Interview Questions I Should Be Ready For

### SEO Strategy (the unique angle here)

1. Why are you trying to copy Calculator.net's template? What's the strategic insight?
2. Walk me through the 6-block page template.
3. How does the MDX SEO content layer actually move the needle for ranking?
4. What's JSON-LD `SoftwareApplication` + `FAQPage` + `BreadcrumbList` doing for SERP?
5. Why per-page OG images? What's the social-share angle?
6. How do you choose which 30 calcs get the curated FAQ + MDX treatment first?
7. What's your sitemap strategy with 65+ calc pages + category pages + search pages?

### Next.js 16 Specifics

8. What changed in Next.js 16 vs 15 (PPR, Cache Components, `use cache`)?
9. How do Server Components + Client islands work for a calculator page?
10. How does Turbopack differ from Webpack? Trade-offs?
11. How do you `dynamic({ ssr: false })` Three.js without breaking First Paint?
12. What does the inline no-flash dark-mode script do? Why inline?

### Calculator Engine

13. Schema-driven vs custom component — when does each win?
14. Walk me through `CalculatorSchema` shape (inputs/outputs/compute).
15. How does the single dynamic route serve 65 calcs efficiently? Code-splitting?
16. How would you add a brand-new calc end-to-end?
17. Why `React.memo` on every calc component? Show me when it actually matters.

### Math / Precision

18. Why `decimal.js` for money? Show me the bug with `0.1 + 0.2`.
19. What does `formatINR()` do (Intl.NumberFormat with en-IN — `₹1,00,000.00`)?
20. How do you compute an EMI amortization schedule deterministically?
21. How do you handle r=0 (interest-free loan) in EMI formula?
22. What's the trade-off between precise (decimal.js) and fast (mathjs)?

### Three.js / 3D

23. Why offer 3D charts at all? Performance cost vs marketing/SEO value?
24. How do you gate `useFrame` so off-screen 3D doesn't burn CPU?
25. How does the 3D toggle have a 2D fallback?

### Tailwind v4 + Theming

26. What's new in Tailwind v4? (CSS-first config, faster build)
27. How do CSS-variable design tokens enable dark mode?
28. Why `darkMode: "class"` + an inline script vs `prefers-color-scheme`?
29. How do you avoid Tailwind v4's dynamic-class footgun? (Static maps in `category-classes.ts`)

### Supabase / State

30. Why Zustand for cross-component state (favorites/history/recents)?
31. How does the localStorage → Supabase opt-in sync work?
32. What does last-write-wins look like in practice?
33. How is RLS enforced on `history` and `favorites` tables?

### PWA

34. What does `@ducanh2912/next-pwa` give you?
35. How does the service worker cache visited calcs?
36. How would you push an updated worker to existing users?

### i18n

37. Why next-intl over react-intl or i18next?
38. How does the locale cookie flow work in App Router?
39. How would you add a third language (Marathi) at scale?

### India-specific calcs

40. What's SIP / Lumpsum / PPF / NPS / EPF / HRA / GST math?
41. Why does India need its own calc app? (Number formatting, regulatory variants)
42. How would you keep up with FY budget tax-bracket changes?

---

## 15. Extra Talking Points (Bring Up Voluntarily)

- **The "Calculator.net killer" thesis**: Calculator.net's whole moat is _template consistency at scale_. Even if my SEO is weaker per-page initially, matching the structure across all 65 pages compounds.
- **Schema-first is the productivity hack**: A new calc = 3 file edits (constants + schema + optional FAQ). The custom component fallback exists but I keep the threshold high (must really need it).
- **Why ported from Expo CalcMaster**: Formulas are battle-tested in mobile production. I reuse rather than re-derive — fewer bugs, faster ship.
- **MDX as the moat**: Anyone can clone the UI. Almost no one will write 30 × 1200-word SEO articles. Content is the defensible asset.
- **The decision to NOT use a CMS**: MDX in repo = versioned, type-safe slug → MDX mapping, no CMS subscription, no preview-deploy infra. Trade-off: non-tech writers can't edit. Fine for solo.
- **Why decimal.js + not Big.js**: decimal.js has better TS types and is what Stripe internally uses. Pure preference.
- **What I'd do differently**: Start with PPR Cache Components from day 1 (came in Next.js 16). Initial work was on Next 15 mental model.
- **The hardest part**: NOT building calculators — it's writing 30 × MDX SEO articles that actually rank. That's a 60-hour content sprint, not engineering.

---

## 16. If I Need to Revisit This Project Later

**MUST read first**: `.claude/PROJECT_CONTEXT.md` — full architecture context.

Then read in this order:

1. `README.md`, `PLAN.md`, `GROWTH.md` — status + roadmap
2. `CLAUDE.md` — the 6-block template + calculator checklist (THE master rules)
3. `src/constants/calculators.ts` — canonical list of 65 slugs
4. `src/lib/calculators/registry.ts` — slug → component mapping
5. `src/lib/calculators/schemas/finance.ts` — schema-driven examples
6. `src/calculators/finance/SIPCalculator.tsx` — custom-component reference
7. `content/calculators/sip.mdx` — MDX SEO content example
8. `src/lib/faqs/curated.ts` — top-30 curated FAQ patterns

Build commands:

```bash
cd a_web/multi_calculator_web
npm run dev           # turbopack on :3000
npm run typecheck     # tsc --noEmit
npm run lint
npm run test          # vitest run
npm run build         # next build
```

Verification before merging any new calc (no shortcuts):

```bash
npx tsc --noEmit && npx eslint src && npx vitest run && npm run build
# route count MUST grow by exactly 1
```

Sibling Expo project: `../../a_APP/3. multi calculator/CalcMaster/` — port formulas FROM there.
