# CalcMaster

A Next.js 16 calculator web app covering finance, math, health, conversions, and more. The Android app uses a Trusted Web Activity (TWA) to open `https://calcmaster.pooniya.com`.

## Status

The live calculator count comes from `src/lib/calculators/registry.ts`. Android packaging uses `com.pooniya.calcmaster`; see [the release guide](./docs/pwa/README.md) for the AAB, production handoff, and Play Console setup.

## Tech stack

Next.js 16 · React 19 · TypeScript · Tailwind v4 · Turbopack · three / r3f / drei · Recharts · Framer Motion · Zustand · next-intl · Supabase SSR · Serwist · Vitest · Husky

## Commands

```bash
npm run dev          # turbopack dev server (localhost:3000)
npm run build        # production build
npm run start        # serve the production build
npm run lint         # eslint
npm run typecheck    # tsc --noEmit
npm run test         # vitest unit tests
npm run format       # prettier --write
```

## Architecture

See [`PLAN.md`](./PLAN.md) and [`.claude/PROJECT_CONTEXT.md`](./.claude/PROJECT_CONTEXT.md). Highlights:

- Calculators load via the single dynamic route `/calculator/[slug]` plus a lazy registry (`src/lib/calculators/registry.ts`).
- Theme: CSS-variable design tokens + `darkMode: "class"` + an inline no-flash script.
- 3D: r3f `<Canvas>` rendered only on the client via `dynamic({ ssr: false })`. SIP calculator includes a 2D ↔ 3D chart toggle.
- State: Zustand stores (`favorites`, `history`, `recents`) persisted to localStorage. Supabase clients are wired but disabled until env keys are set.
- i18n: cookie-driven locale (en/hi) through next-intl.
- PWA: manifest + Serwist service worker, built with `next build --webpack`.

## Configuration

Environment keys are optional for the calculator features. Analytics and push notifications depend on their configured environment variables. Review the deployed configuration when completing Play's Data safety form.

## Deploy

This repo includes `vercel.json`. Push to GitHub, then `vercel link` + `vercel deploy --prod`.

## Source attribution

Calculator formulas are ported from the sibling Expo project `../../a_APP/3. multi calculator/CalcMaster`.
