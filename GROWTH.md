# Growth, SEO & Performance Playbook

> What's shipped, what's left, and how to actually pull traffic to CalcMaster.

## ✅ Shipped in this build

### SEO infrastructure

- `src/lib/site.ts` — single source of truth for URL, brand, contact, GA/GTM IDs
- `src/app/robots.ts` — robots policy + sitemap pointer + host directive
- `src/app/sitemap.ts` — auto-generated sitemap covering home, /about, /privacy, /search, /blog, all 6 categories, all 6 blog-categories, all 65 calculators, all 22 blog posts (~112 URLs)
- Canonical URLs on every page (calculator, blog, blog category, root)
- Full OpenGraph + Twitter Card metadata in root layout + dynamic per-page
- `metadataBase` set so relative OG URLs resolve to the production domain
- `hreflang` alternates for en + hi
- `keywords`, `authors`, `creator`, `publisher` populated
- `robots` directives with `max-image-preview: large` and `max-snippet: -1` for richer SERP previews

### Structured data (JSON-LD)

Component: `src/components/seo/JsonLd.tsx`

- **`WebSite`** + **`Organization`** in root layout (with SearchAction so Google can show a search box)
- **`SoftwareApplication`** + **`BreadcrumbList`** on every calculator page
- **`BlogPosting`** + **`BreadcrumbList`** on every blog post
- Helpers for **`FAQPage`** ready to use when calculators get FAQ sections
- AggregateRating with placeholder values — replace with real review data when you have it

### Dynamic OG images (next/og `ImageResponse`)

- `/opengraph-image` — root brand card
- `/calculator/[slug]/opengraph-image` — auto-branded card per calculator with category color
- `/blog/[slug]/opengraph-image` — auto-branded card per blog post

Every page now produces a unique, on-brand 1200×630 PNG when shared — no manual asset work required.

### Google Analytics 4 + custom events

- `src/components/analytics/Analytics.tsx` — `@next/third-parties` GA + GTM mounted only when env vars are present
- `src/lib/analytics/events.ts` — **typed event helper**:
  - `calculatorOpen` / `calculatorCalculate` / `calculatorShare`
  - `favoriteToggle`
  - `view3DToggle`
  - `searchQuery`
  - `themeChange` / `localeChange`
  - `blogOpen` / `blogShare`
  - `outboundClick`
  - `pwaInstall`
  - `webVital`
- Hooked into: CalculatorShell (open, favorite, share), SIP (calculate, 3D toggle), Search (search), ThemeProvider (theme), Settings (locale), BlogTracker (open)

### Performance

- `display: "swap"` on Geist fonts (eliminates FOIT)
- `preconnect` to `images.unsplash.com`, `fonts.gstatic.com`
- `dns-prefetch` for image CDN
- `prefers-reduced-motion` CSS rule + `useReducedMotion` hook
- Hero Three.js scene **renders a static gradient fallback** for reduced-motion users
- Framer-motion `useReducedMotion` integrated in `CalculatorShell` (skips entry animation)
- **Web Vitals** auto-reported to GA4 (LCP, CLS, INP, FCP, TTFB) for every page view

### Configuration

- `.env.example` updated with `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GTM_ID`, and Sanity placeholders
- `next.config.ts` whitelists `images.unsplash.com` and `cdn.sanity.io` for `next/image`

---

## 🎯 What to do _outside the code_ for traffic

This is where the actual growth comes from.

### 1. Google Search Console (do this Day 1 after launch)

- Verify the domain via DNS TXT or HTML file
- Submit `https://calcmaster.pooniya.com/sitemap.xml`
- Add the property to the **URL Inspection** queue weekly
- Set up email alerts for indexing errors and Core Web Vitals issues
- Monitor "Performance" → impressions/CTR per query weekly — this is your topic-list for new blog posts

### 2. Bing Webmaster Tools (free signal Google ignores)

- Same sitemap submission. ~5% of traffic that Google won't give you.

### 3. Google Analytics 4 setup

- Create the GA4 property → copy the `G-XXXXXXXX` Measurement ID into `NEXT_PUBLIC_GA_ID`
- In GA4 UI, mark these as **conversion events**: `calculator_calculate`, `blog_open`, `pwa_install`, `favorite_toggle`
- Build Explore reports: top calculators, top blog posts, search-term failures (queries with 0 matches)
- Connect to Search Console under **Admin → Product links** to overlay query data on landing pages

### 4. Internal linking strategy (free SEO)

The structure is already there; just make sure every blog post links to:

- The calculator it covers (already done via the CTA box)
- 2–3 other related blogs (already done via the related-posts strip)
- The category overview blog (do this manually on new posts)

Each calculator page now links to its blogs at the bottom. Mission accomplished.

### 5. Topical authority — the 80/20 of SEO traffic

A calculator site competes against ClearTax, Groww, BankBazaar, MoneyControl. You can't outrank them on `sip calculator` directly. You **can** rank on the long-tail:

- "how much SIP to retire with 5 crore"
- "EMI for ₹50 lakh home loan 20 years"
- "compound vs simple interest example india"
- "BMI calculator south asian"
- "GST inclusive calculation formula"

Write a blog post for each long-tail query that ranks high in your Search Console "Queries" tab with **low CTR** (= you appear but nobody clicks).

### 6. Calculator-specific FAQs

**Single most-impactful SEO addition you can make right now.** Add a small FAQ section at the bottom of each calculator page:

- "How is SIP return calculated?"
- "What's a good 25-year SIP amount?"
- "Is SIP better than lumpsum?"

Then emit `FAQPage` JSON-LD (helper already in `JsonLd.tsx` — `faqSchema(items)`). Google often renders these as expandable accordions in SERPs — huge real estate win.

### 7. Backlinks

- Submit to [Indie Hackers](https://indiehackers.com), [Product Hunt](https://producthunt.com), [BetaList](https://betalist.com)
- r/IndianStreetBets, r/IndiaInvestments, r/personalfinanceindia (read the rules; don't spam)
- Quora answers to "SIP calculator" / "EMI calculator" questions, linking to your tools
- Twitter/X threads on each blog post (the _real_ distribution channel)
- Guest posts on Indian personal-finance blogs
- DM 10 fintech YouTubers and offer your calculator as a "widget" they can embed on their channel page (you'll need to ship embeds — see below)

### 8. Schema enhancements (when you have data)

- Replace the placeholder `AggregateRating` with real review counts (e.g., when you ship a "Rate this calculator" widget)
- Add `HowTo` schema to blog posts with numbered step-by-step instructions
- Add `Course` schema if you ever build a multi-blog learning track

---

## 🚀 Features to add (for traffic, retention, and monetization)

Roughly ranked by impact-to-effort.

### Tier 1 — high impact, low effort

1. **FAQ sections per calculator** with `FAQPage` JSON-LD (covered above)
2. **Shareable URLs** — encode form state in query params (`?monthly=10000&rate=12`). Users who share calculations link straight to a pre-filled page. Massive viral coefficient.
3. **PDF export of results** — `jspdf` (lazy-loaded). Email-able PDFs are heavily shared in WhatsApp.
4. **"Embed this calculator" widget** — generate an `<iframe>` snippet other sites can paste. Free backlinks at scale.
5. **WhatsApp share button** — already preferred share channel in India; one-tap deep link.
6. **Submit to Google for indexing** via the URL Inspection tool after launch
7. **Open Graph badges on home page** — show counts: "Used 1.2k times this week" (build trust)
8. **Auto-generate a `404.tsx`** with calculator suggestions

### Tier 2 — high impact, medium effort

1. **Calculator FAQ + How-to per page** (medium because content needs writing — but easy once you find the pattern)
2. **Compare mode** — side-by-side runs of SIP vs Lumpsum, Old Regime vs New Regime, etc. Each comparison gets its own URL — `/compare/sip-vs-lumpsum`. These pages will rank for "X vs Y" queries which are _huge_ in finance search.
3. **Goal-based reverse calculator** — "I want ₹1cr in 15 years → what monthly SIP?" Standalone tool + landing page.
4. **Image alt text + descriptive captions** on all 22 blog cover images (helps image search)
5. **RSS feed** at `/feed.xml` (next-sitemap supports this) — for newsletter subscribers + RSS readers
6. **Print stylesheet** — `print:hidden` on nav, clean layout for printed receipts/results
7. **Email yourself the result** — send via a simple Resend API route (Tier 1 if you wire Resend)
8. **Calculator history → share link** — every history entry has a unique shareable URL
9. **Trending calculators** — "Calculators 12 people used in the last hour" — Vercel Edge Config or a simple Redis (Upstash) counter

### Tier 3 — high impact, higher effort

1. **Multi-language SEO** — beyond just having `hi` in the UI, generate Hindi-only landing pages with proper `hreflang`. Hindi search market is largely under-served by calculator sites.
2. **Schema markup for every calculator** with specific inputs/outputs documented (Google's calculator-specific rich results)
3. **HowTo schema in every blog post** — step 1, step 2, etc.
4. **Image SEO** — replace generic Unsplash with custom OG images of actual screenshots (Lighthouse will love it)
5. **Programmatic SEO** — auto-generated "X by Y" pages for every combination users actually search ("SIP for ₹5000 in 10 years", "EMI for 50 lakh 9% 20 years")
6. **Newsletter** — weekly "Calculator of the week" with a worked example. Requires Resend + opt-in flow.
7. **User-submitted bug reports** — `Crisp.chat` or `Tawk.to` free widget so users can flag formula errors. Each fixed bug is a tiny SEO and trust win.
8. **A/B testing infrastructure** — Vercel Edge Config + simple route handler. Test CTA copy, hero variants.

### Tier 4 — nice to have

1. **Dark/light theme screenshots in OG cards** based on viewer preference (hard — usually skipped)
2. **3D OG image** for showcase calculators (CSS-only via next/og is doable but tricky)
3. **Calculator embed analytics** — track which sites embed your widget
4. **PWA install prompts** — guided UI to add to home screen (Android shows it natively; iOS needs a tooltip)
5. **Offline-first message** — when offline-cached, show "You're offline — calculator still works" banner

---

## 📈 Performance targets to hit

Run [PageSpeed Insights](https://pagespeed.web.dev/) on these pages after launch:

| Page                   | LCP target | CLS target | INP target |
| ---------------------- | ---------- | ---------- | ---------- |
| `/` (with Three.js)    | ≤ 2.5s     | ≤ 0.1      | ≤ 200ms    |
| `/calculator/sip`      | ≤ 2.0s     | ≤ 0.05     | ≤ 150ms    |
| `/calculator/basic`    | ≤ 1.5s     | ≤ 0.05     | ≤ 100ms    |
| `/blog/sip-calculator` | ≤ 2.0s     | ≤ 0.05     | ≤ 100ms    |

If LCP is failing on `/`, the culprit is the Three.js scene. Options:

- Make the static gradient fallback the _default_ and only swap in WebGL after user scroll
- Reduce particle count
- Preload only the first paint of Canvas

Web Vitals are now auto-reported to GA4 — you'll see exactly where you fail in real-user data, not just lab tests.

---

## 🧰 Tools to add to your weekly routine

- **Ahrefs / SEMrush / Ubersuggest** (paid) — competitor keyword research; ground for new blog topics
- **Google Search Console** (free) — top of the funnel, every Monday
- **Google Analytics 4** (free) — engagement, top calculators, blog drop-off
- **PageSpeed Insights** (free) — Lighthouse pulse-check weekly
- **Vercel Web Vitals dashboard** (free with Vercel) — real-user data, more accurate than Lighthouse
- **Schema Markup Validator** at https://validator.schema.org/ — run a sample of pages monthly
- **Rich Results Test** at https://search.google.com/test/rich-results — see if Google can parse your structured data

---

## 🎯 30-day post-launch checklist

- [ ] Set up domain DNS + SSL on Vercel
- [ ] Add `NEXT_PUBLIC_GA_ID` env var in Vercel
- [ ] Verify domain in Google Search Console + submit sitemap
- [ ] Verify in Bing Webmaster Tools
- [ ] Run PageSpeed Insights on 5 representative pages; fix anything red
- [ ] Add FAQPage schema + visible FAQ to top-3 calculators (SIP, EMI, BMI)
- [ ] Write 5 "X vs Y" comparison posts (SIP vs Lumpsum is the template — write 4 more)
- [ ] Submit to ProductHunt
- [ ] Post on r/IndianStreetBets / r/IndiaInvestments (link to specific calculator with worked example)
- [ ] Tweet about each of the 22 blog posts (one per day for 3 weeks)
- [ ] Set up the "embed this calculator" iframe widget for top 5 calculators
- [ ] Email 10 fintech YouTubers offering the embed
- [ ] Monitor Search Console "Queries" tab daily; turn the top 10 zero-CTR queries into blog posts

---

The infra is now boring. The work is the content + distribution.
