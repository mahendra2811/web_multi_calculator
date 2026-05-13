# multi_calculator_web — Project Context

> This file provides essential project context for Claude. Read this before writing any code.

## What This Project Is

A **production-ready Next.js 16 web app** with 60+ calculators across six categories. It is a richer web counterpart to the existing Expo app **CalcMaster** at `../../a_APP/3. multi calculator/CalcMaster`. The math/formulas are ported from there.

Key differentiators vs. the mobile app:

- **Three.js / react-three-fiber** for hero scene, decorative backgrounds, and optional 3D result charts
- **Recharts** for 2D charts (primary view) with a 3D toggle on supported finance calculators
- **PWA** (installable, offline-capable for already-visited calculators)
- **localStorage default** + **optional Supabase cloud sync** for history / favorites
- **next-intl** for English + Hindi (porting from CalcMaster's `src/i18n/locales`)
- Deployed on **Vercel**

## Tech Stack (Do Not Deviate)

| Tech                                  | Version | Why                                     |
| ------------------------------------- | ------- | --------------------------------------- |
| Next.js                               | 16.x    | App Router, Turbopack, Cache Components |
| React                                 | 19.x    | RSC, transitions                        |
| TypeScript                            | 5.x     | Strict mode                             |
| Tailwind CSS                          | v4      | Faster, CSS-first config                |
| three / @react-three/fiber / drei     | latest  | 3D scenes + charts                      |
| Recharts                              | 3.x     | 2D financial charts                     |
| Framer Motion                         | 12.x    | Page + UI animation                     |
| Zustand                               | 5.x     | Light global state (history, favorites) |
| next-intl                             | 4.x     | i18n (en, hi)                           |
| @supabase/supabase-js + @supabase/ssr | latest  | Optional cloud sync                     |
| decimal.js / mathjs                   | latest  | Precise math                            |
| @ducanh2912/next-pwa                  | latest  | PWA support                             |
| Vitest                                | 4.x     | Unit tests for math helpers             |
| Husky + lint-staged                   | latest  | Pre-commit hooks                        |

**Never install:** redux/jotai/mobx, moment (use native Intl / date math), lodash (use targeted utilities), legacy chart libs.

## File Structure

```
src/
├── app/                          # App Router (RSC + client islands)
│   ├── layout.tsx                # Root: providers + fonts
│   ├── page.tsx                  # Home (hero 3D + category grid)
│   ├── calculator/[slug]/        # Dynamic calculator route
│   ├── category/[category]/      # Category browse page
│   ├── search/                   # Search page
│   ├── favorites/                # Favorites page
│   ├── history/                  # History page
│   ├── settings/                 # Settings (theme, locale, cloud-sync)
│   └── api/                      # Route handlers (currency rates, sync)
├── calculators/                  # 60+ calculator implementations, one folder per category
│   ├── finance/                  # 24 calculators (SIPCalculator.tsx, ...)
│   ├── math/                     # 12
│   ├── health/                   # 8
│   ├── converter/                # 10
│   ├── datetime/                 # 5
│   └── crypto/                   # 6
├── components/
│   ├── ui/                       # Primitives (Button, Card, Input, Slider, etc.)
│   ├── layout/                   # Header, Footer, SideNav, MobileTabBar
│   ├── three/                    # HeroScene, ParticleField, ChartScene
│   └── charts/                   # GrowthChart, AmortizationChart, ResultPieChart
├── contexts/                     # ThemeProvider, LocaleProvider (next-intl wrapper)
├── hooks/                        # useCalculator, useFavorites, useHistory, useTheme
├── lib/
│   ├── calculators/              # registry.ts + pure math helpers
│   ├── storage/                  # localStorage abstraction + optional Supabase sync
│   ├── supabase/                 # browser + server clients
│   └── three/                    # Three.js helpers (geometry, materials)
├── types/                        # calculator.ts, navigation.ts
├── constants/                    # calculators.ts (registry), storage-keys.ts
└── i18n/messages/                # en.json, hi.json
```

## Architecture Patterns

### Dynamic Calculator Route

All 60+ calculators load via a **single dynamic route**: `src/app/calculator/[slug]/page.tsx`.
The slug maps to a component via `src/lib/calculators/registry.ts`.

### Calculator Shell

Every calculator component MUST:

1. Be a **client component** (`"use client"`) — interactive form
2. Wrap form + result in `<CalculatorShell meta={meta}>`
3. Use `useCalculator()` hook for history saving + reset
4. Auto-recompute on input change (debounced 300ms via `useDebouncedValue`)
5. Be wrapped in `React.memo()` for performance

### State Pattern

- **UI state** (form inputs): local `useState`
- **Cross-component state** (favorites, history, recents, theme): **Zustand** stores
- **Persisted state**: Zustand stores hydrate from `localStorage` on mount; if cloud sync is enabled, also sync from Supabase

### Three.js Pattern

- **HeroScene** (homepage): `<Canvas>` with a single `<HeroScene />` client component. Lazy-loaded with `next/dynamic({ ssr: false })`.
- **3D chart toggle**: on supported finance calculators, a button toggles between Recharts (2D) and a `ChartScene` (3D). Default = 2D.
- **Performance**: use `<Suspense>` with skeleton fallback; pause render when off-screen (`useFrame` gated by `useInView`).
- **Accessibility**: 3D charts always have a text/2D fallback.

### Number Formatting

`src/lib/utils/format.ts` — `formatINR()`, `formatNumber(locale)`. Use `Intl.NumberFormat`.

### Math precision

For money: **decimal.js** (never plain JS floats). For general math: **mathjs**.

## Design System

### Colors (CSS variables, see `src/app/globals.css`)

```
--primary: teal #0D9488 (light) / #2DD4BF (dark)
--secondary: indigo #6366F1 (light) / #818CF8 (dark)
--accent: amber #F59E0B
--success: green #22C55E
--error: red #EF4444

Category colors:
--finance: teal
--math: indigo
--health: green
--converter: amber
--datetime: cyan
--crypto: purple
```

### Tailwind Semantic Tokens

Use these (auto-switch light/dark):

- `bg-background`, `bg-surface`, `bg-surface-elevated`
- `text-text`, `text-text-secondary`, `text-text-tertiary`
- `border-border`
- `text-primary`, `bg-primary`, `text-finance`, etc.

**Dark mode**: `darkMode: "class"` via `dark` variant. ThemeProvider toggles `.dark` on `<html>`.

### Components

Built with **class-variance-authority** + Tailwind. Inspired by shadcn/ui but custom-tuned for calculator UX (large input fields, prominent results).

## i18n

```typescript
import { useTranslations } from "next-intl";
const t = useTranslations("calculators.sip");
t("name"); // "SIP Calculator" or "SIP कैलकुलेटर"
```

Never hardcode user-visible English strings — always use `t()`.

## Supabase Cloud Sync (Optional)

- Default: disabled (localStorage only)
- User opts in via Settings → "Enable cloud sync"
- Tables: `profiles`, `history`, `favorites` (RLS scoped to `auth.uid()`)
- Sync uses last-write-wins; merging done client-side on login

## Common Mistakes to Avoid

1. **Don't use** plain `Math.round` for money — use `decimal.js`
2. **Don't put Three.js Canvas in RSC** — always client + `dynamic({ ssr: false })`
3. **Don't import** large icon sets — use `lucide-react` per-icon
4. **Don't hardcode colors** — use Tailwind semantic tokens
5. **Don't skip `React.memo`** on calculator components — performance critical
6. **Don't write barrel `index.ts`** that re-exports everything — bundle bloat
7. **Don't use** `'use client'` on layouts — only on leaves that need it
8. **Don't write** new calculator IDs without adding them to `src/constants/calculators.ts`

## Calculator Slugs (Authoritative List)

See `src/constants/calculators.ts`. Total = **65 calculators**:
Finance (24) + Math (12) + Health (8) + Converter (10) + Date/Time (5) + Crypto/Stock (6).

## Build Commands

```bash
npm run dev          # turbopack dev
npm run build        # production build
npm run start        # serve build
npm run lint         # eslint
npm run typecheck    # tsc --noEmit
npm run test         # vitest run
npm run test:watch   # vitest
npm run format       # prettier --write .
```
