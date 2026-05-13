# MultiCalc — Production Plan

> **Status:** Foundation complete. 3 reference calculators (Basic, SIP, BMI) shipped. 62 calculators remain. Build passes, 14/14 unit tests green.

This plan is the single source of truth for finishing the project. Execute phases in order. Each phase ends in a working, deployable state.

## Project Brief

- **What:** A Next.js 16 web app with 65+ calculators across six categories (Finance / Math / Health / Converters / Date & Time / Crypto & Stock).
- **Inspiration:** The Expo `CalcMaster` app at `../../a_APP/3. multi calculator/CalcMaster`. The formulas there are authoritative — port them, don't reinvent.
- **Differentiators vs. the app:** Three.js hero + 3D chart toggle, PWA install, optional Supabase cloud sync, full SSR/SEO via Next.js, larger calculator catalogue.
- **Constraints:** Production-ready (typed, tested, performant), works in light + dark themes, English + Hindi i18n, deploys to Vercel.

## Architecture Snapshot (already wired)

| Layer             | Tech                                                                            | Where                                                                    |
| ----------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Framework         | Next.js 16 + Turbopack                                                          | `next.config.ts`                                                         |
| Styling           | Tailwind v4 (CSS variables, `darkMode: "class"`)                                | `src/app/globals.css`                                                    |
| 3D                | three + react-three-fiber + drei                                                | `src/components/three/`, `dynamic({ ssr: false })` from a client wrapper |
| 2D Charts         | Recharts                                                                        | `src/components/charts/`                                                 |
| Animation         | Framer Motion                                                                   | per-component                                                            |
| State             | Zustand (`persist` → localStorage)                                              | `src/lib/storage/stores.ts`                                              |
| i18n              | next-intl (cookie-driven)                                                       | `src/i18n/`, `request.ts`                                                |
| Auth + cloud sync | Supabase SSR (optional, disabled by default)                                    | `src/lib/supabase/`                                                      |
| PWA               | `@ducanh2912/next-pwa`                                                          | `next.config.ts`, `public/manifest.webmanifest`                          |
| Theme             | custom ThemeProvider + no-flash inline script                                   | `src/contexts/ThemeProvider.tsx`, `ThemeScript.tsx`                      |
| Tests             | Vitest + Testing Library                                                        | `*.test.ts` next to source                                               |
| Tooling           | ESLint, Prettier (+tw plugin), Husky, lint-staged                               | `package.json`, `.husky/`                                                |
| Claude            | `CLAUDE.md`, `.claude/PROJECT_CONTEXT.md`, code-review-graph MCP, settings.json | repo root + `.claude/`                                                   |

## Catalogue (65 calculators)

The full list is in `src/constants/calculators.ts`. **Don't edit slugs once shipped** — they're permanent URLs.

- **Finance (24):** sip, lumpsum, emi, simple-interest, compound-interest, fd-rd, ppf, currency-converter, gst, profit-loss, discount, salary, income-tax, mortgage, retirement, roi, nps, cagr, hra, gratuity, epf, home-loan-vs-rent, net-worth, break-even
- **Math (12):** basic, scientific, percentage, fraction, number-system, prime-checker, gcd-lcm, statistics, matrix, quadratic, logarithm, permutation-combination
- **Health (8):** bmi, bmr, calorie, body-fat, ideal-weight, water-intake, pregnancy, macro
- **Converters (10):** length, mass, temperature, area, volume, speed, time-units, data-storage, energy, pressure
- **Date & Time (5):** age, date-diff, date-add, working-days, timezone
- **Crypto & Stock (6):** crypto-profit, staking-yield, dca, stock-average, pe-ratio, position-size

## Phased Roadmap

### ✅ Phase 0 — Foundation (DONE)

- Scaffold Next.js 16 + TS + Tailwind v4 + Turbopack
- All runtime + dev deps installed
- Design system, dark/light theme with no-flash inline script
- next-intl wired for en/hi
- Zustand stores (favorites, history, recents) + localStorage persistence
- Supabase clients (browser + server) ready, disabled until env keys set
- Calculator registry + `/calculator/[slug]` dynamic route + `/category/[category]` browse
- Layout: Header (with theme toggle), Footer, MobileTabBar
- Reference calculators: **Basic** (Math), **SIP** (Finance, with 2D Recharts + 3D r3f toggle), **BMI** (Health)
- Three.js hero scene on homepage with floating distort meshes + wireframe sphere
- PWA: manifest, service worker via `@ducanh2912/next-pwa`
- 14/14 Vitest unit tests green for finance + health formulas
- Production build passes (79 static routes generated)

### Phase 1 — Math + Health (10 calculators, ~2 days)

**Goal:** Ship all Math + remaining Health calculators. These are mostly pure functions, fastest to build.

1. **scientific** — wrap mathjs `evaluate` with a sandbox + keypad UI
2. **percentage** — 4 modes: % of, change %, add %, subtract %
3. **fraction** — input `a/b` and operator, return reduced fraction
4. **number-system** — bin/oct/dec/hex live converter
5. **prime-checker** — `isPrime`, list factors
6. **gcd-lcm** — Euclidean algorithm, accept N numbers
7. **statistics** — paste list of numbers, output mean/median/mode/stddev/var; **2D bar chart**
8. **matrix** — 2×2 / 3×3 / 4×4 inputs; ops: +, -, ×, det, transpose, inverse
9. **quadratic** — roots + **graph (2D + optional 3D surface)**
10. **logarithm** — `log_b(x)` with base picker
11. **permutation-combination** — nPr, nCr
12. **bmr, calorie, body-fat, ideal-weight, water-intake, pregnancy, macro**

Add each component to `src/lib/calculators/registry.ts`. Add unit tests for any formula with edge cases.

### Phase 2 — Finance (23 calculators, ~3 days)

**Goal:** Port the 23 remaining finance calculators from `../../a_APP/3. multi calculator/CalcMaster/src/screens/calculators/`.
**Source files:** read `EMICalculator.tsx`, `LumpSumCalculator.tsx`, etc. — same formulas, rewrite the UI for web.
**Pattern:** copy SIPCalculator.tsx structure. For each:

1. Pure math function in `src/lib/calculators/finance.ts` + unit test
2. UI component in `src/calculators/finance/{Name}Calculator.tsx`
3. Register in `src/lib/calculators/registry.ts`
4. Add to `has3DView` list in `src/constants/calculators.ts` if it benefits from 3D

**Calculators with charts:** lumpsum, emi, simple-interest, compound-interest, fd-rd, ppf, profit-loss, salary, income-tax, mortgage, retirement, nps, epf, home-loan-vs-rent, net-worth, break-even
**Calculators with 3D toggle:** lumpsum, emi, compound-interest, mortgage, retirement, home-loan-vs-rent, net-worth

### Phase 3 — Converters + Date & Time (15 calculators, ~1.5 days)

**Goal:** Build unit converters with a unified UI pattern.

1. **Shared `UnitConverter` component** — takes `units: { id, label, factor, offset? }[]`. Drives all 10 unit calculators. Temperature needs custom logic (uses offsets).
2. Implement 10 units: length, mass, temperature, area, volume, speed, time-units, data-storage, energy, pressure.
3. **currency-converter** — server route `/api/rates` calls exchangerate.host (free, no key) with 1-hour `revalidate`; client picks from + to currency.
4. **Date/Time (5):** age, date-diff, date-add, working-days, timezone. Use native `Intl.DateTimeFormat` + `Intl.RelativeTimeFormat`. Working-days needs configurable weekend + holidays input.

### Phase 4 — Crypto & Stock (6 calculators, ~1 day)

1. **crypto-profit** — entry price, exit price, qty, fees → net P/L %
2. **staking-yield** — principal, APY, compound frequency → growth chart
3. **dca** — buy schedule simulation, avg cost, total qty; **3D toggle**
4. **stock-average** — current avg, qty, new buy → blended avg
5. **pe-ratio** — price / EPS
6. **position-size** — account size × risk% / (entry − stop)

### Phase 5 — Polish & Optional features (~2 days)

1. **Search & filter:** add fuzzy search via `useMemo` with normalized strings (current impl is substring; upgrade to score-based if needed)
2. **Compare mode:** select 2 finance calculators, render side-by-side (SIP vs lumpsum, buy vs rent)
3. **Shareable URLs:** put calculator state in query params (`?monthly=10000&rate=12&years=10`); on mount, hydrate state from search params
4. **PDF export of results** — `jspdf` (lazy-loaded) for any calculator with a chart
5. **Goal-based planner** — "I want ₹1cr in 15y" → reverse-solve monthly SIP
6. **Recents row** on homepage above featured grid
7. **Empty/error/loading states** consistent across pages

### Phase 6 — Cloud sync (Supabase) (~1 day)

Only ship after at least one user requests it.

1. Provision Supabase project; capture URL + anon key in Vercel env
2. SQL: `profiles`, `favorites(user_id, calc_id)`, `history(user_id, calc_id, inputs jsonb, result jsonb, created_at)` with RLS = `auth.uid() = user_id`
3. Sign-in via email-magic-link + Google OAuth (in Supabase dashboard)
4. `useCloudSync()` hook: on first sign-in, merge localStorage into Supabase (last-write-wins). Thereafter, subscribe + push optimistically.
5. Settings: toggle to enable/disable

### Phase 7 — Performance & a11y polish (~1 day)

1. **Bundle audit:** `next build --analyze` (add `@next/bundle-analyzer`); ensure r3f loads only on routes that use it (it should — `dynamic({ ssr: false })` everywhere)
2. **Lighthouse run** on home, /calculator/sip, /calculator/basic. Target ≥ 95 in all four scores.
3. **CWV:** ensure LCP < 2.5s (preload hero font, defer Three.js until viewport)
4. **a11y:** Keyboard-test the calculator keypad (Basic). Add focus rings to all interactive elements (already in Button). Add `aria-live` to result cards.
5. **Reduced motion:** detect `prefers-reduced-motion` and disable r3f auto-rotation + Framer Motion animations.

### Phase 8 — Deploy to Vercel (~30 min)

1. Push to GitHub
2. `vercel link` → connect project
3. Set env in Vercel: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SUPABASE_URL` (later), `NEXT_PUBLIC_SUPABASE_ANON_KEY` (later)
4. `vercel deploy --prod`
5. Add custom domain (optional)
6. Smoke test: theme toggle, language toggle, 3 reference calculators, PWA install on desktop + Android

## Performance Targets

- LCP ≤ 2.0s (4G, mid-tier mobile)
- INP ≤ 200ms
- CLS ≤ 0.1
- Bundle / route gzipped ≤ 100 kB (excluding 3D islands)
- 3D hero canvas should NOT block first paint (it's a client island)
- All static calculator routes pre-rendered at build time

## Non-negotiables

1. **No `Math.round` for money.** Use `decimal.js`. Wrong rounding on lakhs/crores is a bug.
2. **No new calculator slug without registering it** in `src/constants/calculators.ts`.
3. **No Three.js in Server Components.** Always wrap in a client component with `dynamic({ ssr: false })`.
4. **No new color tokens without adding them to** `globals.css` AND the category class maps.
5. **No hard-coded English strings.** Always go through `next-intl`.
6. **Unit-test any formula** with non-trivial logic. Especially tax, EMI, compound interest.

## How to add a new calculator (template)

1. Add metadata to `src/constants/calculators.ts` (slug, name, shortDesc, category, icon)
2. Add translations under `calculators.{slug}` in `src/i18n/messages/en.json` and `hi.json`
3. Write pure math in `src/lib/calculators/{category}.ts` + unit test
4. Build the UI: `src/calculators/{category}/{Name}Calculator.tsx`, copy `SIPCalculator.tsx` as a template
5. Register the lazy import in `src/lib/calculators/registry.ts`
6. Run `npm run typecheck && npm run test && npm run build`

## Reference files in this repo

- `CLAUDE.md` + `.claude/PROJECT_CONTEXT.md` — architecture, do/don't, slugs
- `.claude/settings.json` — MCP servers + Bash allowlist
- `next.config.ts` — Next.js + next-intl + PWA wiring
- `src/i18n/request.ts` — locale negotiation
- `src/contexts/ThemeProvider.tsx` + `src/components/ThemeScript.tsx` — theme system with no FOUC
- `src/calculators/finance/SIPCalculator.tsx` — **template** for finance with 2D/3D toggle
- `src/calculators/math/BasicCalculator.tsx` — **template** for stateful keypad calculators
- `src/calculators/health/BMICalculator.tsx` — **template** for slider-driven calculators
