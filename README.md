# CalcMaster

A Next.js 16 web app with 65+ calculators across six categories: Finance, Math, Health, Converters, Date & Time, and Crypto/Stock. Built with Three.js, Tailwind v4, Recharts, and ported formulas from the sibling CalcMaster Expo app.

## Status

Foundation complete. 3 reference calculators (Basic, SIP, BMI) shipped end-to-end. 62 remaining — see [`PLAN.md`](./PLAN.md).

## Tech stack

Next.js 16 · React 19 · TypeScript · Tailwind v4 · Turbopack · three / r3f / drei · Recharts · Framer Motion · Zustand · next-intl · Supabase SSR · `@ducanh2912/next-pwa` · Vitest · Husky

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

- All 65 calculators load via the single dynamic route `/calculator/[slug]` plus a lazy registry (`src/lib/calculators/registry.ts`).
- Theme: CSS-variable design tokens + `darkMode: "class"` + an inline no-flash script.
- 3D: r3f `<Canvas>` rendered only on the client via `dynamic({ ssr: false })`. SIP calculator includes a 2D ↔ 3D chart toggle.
- State: Zustand stores (`favorites`, `history`, `recents`) persisted to localStorage. Supabase clients are wired but disabled until env keys are set.
- i18n: cookie-driven locale (en/hi) through next-intl.
- PWA: manifest + Workbox service worker via `@ducanh2912/next-pwa`.

## Configuration

Copy `.env.example` to `.env.local`. All keys are optional — the app runs fully client-side without any of them.

## Deploy

This repo includes `vercel.json`. Push to GitHub, then `vercel link` + `vercel deploy --prod`.

## Source attribution

Calculator formulas are ported from the sibling Expo project `../../a_APP/3. multi calculator/CalcMaster`.
