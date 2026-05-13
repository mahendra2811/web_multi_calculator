@AGENTS.md
@.claude/PROJECT_CONTEXT.md

## MCP Tools: code-review-graph

**ALWAYS use the `code-review-graph` MCP tools BEFORE Grep/Glob/Read for codebase exploration.** The graph is faster, cheaper (fewer tokens), and gives structural context (callers, dependents, tests) that file scanning cannot.

### When to use graph tools FIRST

- **Exploring code**: `semantic_search_nodes` or `query_graph` instead of Grep
- **Understanding impact**: `get_impact_radius` instead of manually tracing imports
- **Code review**: `detect_changes` + `get_review_context` instead of reading entire files
- **Finding relationships**: `query_graph` with callers_of / callees_of / imports_of / tests_for
- **Architecture questions**: `get_architecture_overview` + `list_communities`

Fall back to Grep/Glob/Read **only** when the graph doesn't cover what you need.

### Workflow

1. The graph auto-updates on file changes (via hooks).
2. Use `detect_changes` for code review.
3. Use `get_affected_flows` to understand impact.
4. Use `query_graph` pattern="tests_for" to check coverage.

## Project-Specific Conventions

See `.claude/PROJECT_CONTEXT.md` for architecture, calculator slugs, design tokens, and do/don't list.

---

# Adding a new calculator — compulsory checklist

> **Every new calculator MUST satisfy every item below before merge.** No exceptions: the SEO, accessibility, and consistency budget assumes this checklist holds. If a step doesn't apply (e.g. no chart needed), say so explicitly in the PR rather than skipping silently.

## 1. Decide build mode: **Schema** or **Custom component**

Two valid paths — choose deliberately, not by habit.

| Mode                          | When to use                                                                                               | Code lives in                                     |
| ----------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| **Schema-driven** _(default)_ | The calculator is a form (inputs → numbers out). No chart, no custom keypad, no multi-step UI.            | `src/lib/calculators/schemas/{category}.ts`       |
| **Custom component**          | Needs a chart, custom keypad, 3D toggle, multi-step flow, or any UX that the generic engine can't render. | `src/calculators/{category}/{Name}Calculator.tsx` |

**~80% of new calculators should be schema-driven.** Only escalate to a custom component when truly needed.

## 2. Compulsory artifacts

For **every** calculator, in this order:

### A. Metadata entry — `src/constants/calculators.ts`

- [ ] Add a `C(...)` row with: `id` (kebab-case slug, permanent), `name`, `shortDesc` (≤80 chars), `category`, `icon` (lucide-react name).
- [ ] Set `hasChart: true` if the calc benefits from a chart, `has3DView: true` if it has a 3D toggle.
- [ ] The slug must be **unique across all categories** — it's the URL path forever.
- [ ] The icon name must exist in `lucide-react`; pick from the existing palette where possible.

### B. Pure math function — `src/lib/calculators/{category}.ts`

- [ ] Pure, deterministic, no side effects. Inputs in, outputs out.
- [ ] Currency values use plain numbers; never `Math.round` for money — let the display layer format.
- [ ] Sourced from / verified against the Expo app at `../../a_APP/3. multi calculator/CalcMaster/src/screens/calculators/{Name}Calculator.tsx` where one exists.
- [ ] Export both the input interface and the function.

### C. Unit test — `src/lib/calculators/{category}.test.ts` (or `*.more.test.ts`)

- [ ] At least one test per non-trivial formula (covers a textbook example).
- [ ] Edge cases: zero, negative, very large (₹1cr+), invalid input.
- [ ] **Skippable only** when the function is pure unit-conversion (factor-based) or trivial passthrough.
- [ ] Run: `npx vitest run` — must all pass before merging.

### D. UI

**If schema-driven:**

- [ ] Append a `CalculatorSchema` to the relevant `src/lib/calculators/schemas/{category}.ts`.
- [ ] Inputs use the right `kind` (`currency`, `percent`, `date`, `toggle`, `select`, etc.) — never just `number` when a richer kind exists.
- [ ] Mark **exactly one** primary output `big: true` (this is the hero stat).
- [ ] Include a `formula:` line when the math has educational value.

**If custom component:**

- [ ] Wraps everything in `<CalculatorShell meta={meta}>`.
- [ ] Wrapped in `React.memo()`.
- [ ] Calls `track.calculatorCalculate(meta.id)` from the inside-the-debounce calculate effect.
- [ ] Adds a lazy import row to `src/lib/calculators/registry.ts` matching the slug exactly.
- [ ] **All numeric outputs go through `<Stat>` or `<BigStat>`** — they auto-shrink on mobile and tabular-num/truncate. No raw `<div>{value}</div>`.
- [ ] Slider thumbs use the shared `<Slider>` component (24px touch on mobile, 18px desktop).

### E. SEO — already automatic, but you MUST verify

- [ ] Open the page after building: `/calculator/{slug}` — confirm `<title>` and meta description are populated (these flow from `meta.name` + `meta.shortDesc`).
- [ ] Confirm OG image renders at `/calculator/{slug}/opengraph-image` (auto-branded with category color).
- [ ] `shortDesc` is keyword-rich: it's the meta description AND used in OG cards. Write for humans + crawlers.

### F. FAQs — compulsory minimum **5 questions**

- [ ] **For top-30 popular calculators**: hand-write **7–10 deep FAQs** in `src/lib/faqs/curated.ts` under the calculator's slug.
- [ ] **For every other calculator**: do nothing — the auto-generator (`src/lib/faqs/auto.ts`) returns 5 baseline FAQs based on category + name + shortDesc. This still produces valid `FAQPage` JSON-LD.
- [ ] Curated FAQs must answer the math, when to use, common confusions, tax/regulatory edges (for finance), and accuracy disclaimers (for health).
- [ ] If a calc has < 5 curated FAQs, `getFaqsFor(meta)` tops it up with auto ones — but please write 5 properly instead.

### G. Breadcrumb — automatic

- [ ] Provided by `<Breadcrumb>` in the calculator page. The crumb path is `Home › {Category Name} › {Calculator Name}`. No action needed beyond setting the correct `category` on the metadata entry.

### H. Mobile responsiveness — mandatory verification

- [ ] Open the calculator in dev tools at **360px, 768px, 1024px**. All must work without horizontal scroll.
- [ ] Inputs stack vertically on mobile (CalculatorShell handles this — don't override the grid).
- [ ] Large values (₹1 cr+, scientific notation) must NOT overflow stat cards. `<Stat>` already truncates; if you use raw text, add `truncate min-w-0`.
- [ ] Touch targets ≥ 44×44 px (iOS Human Interface Guidelines minimum). Buttons, sliders, and select pills already comply via `<Button>` and `<Slider>`.
- [ ] Font size on input fields ≥ 16px (prevents iOS focus-zoom). The shared `<Input>` defaults to `text-base` (16px) — don't shrink it.

### I. Adding a brand-new category (rare)

Only if the calc doesn't fit any of the 18 existing categories:

- [ ] Extend the `Category` union in `src/types/calculator.ts`.
- [ ] Add an entry to `CATEGORIES` in `src/constants/calculators.ts`.
- [ ] Add badge / bg-soft / text / ring classes to **all four maps** in `src/components/calculator/category-classes.ts`. Tailwind v4 needs static class names; dynamic interpolation breaks the build.
- [ ] Add the Unsplash cover-image entry to `src/lib/blog/unsplash.ts` (`CATEGORY_COVERS`).
- [ ] Update `CATEGORY_BLURB` in `src/lib/faqs/auto.ts` so auto-generated FAQs read naturally.

### J. Bilingual support (optional, top calculators only)

- [ ] If the calculator is in the top-15 by traffic potential, add optional `nameHi`, `shortDescHi`, `longDescHi` fields to its metadata entry.
- [ ] No action needed for the rest — the locale-aware `displayName()` helper falls back to English when the Hindi field is missing.

## 3. Verification before merge

Run **all four** locally — no shortcuts:

```bash
npx tsc --noEmit     # MUST be zero errors
npx eslint src       # MUST be zero errors (warnings okay if justified)
npx vitest run       # MUST pass — never skip a failing test
npm run build        # MUST succeed; check the route count grew by exactly 1
```

If any step fails: fix it. Don't disable the rule, don't `xit` the test, don't `--no-verify` the commit.

## 4. PR description template

Every calculator PR must include:

```markdown
## What

- Added: `{Slug}` ({Name})
- Category: {category}
- Build mode: {schema | custom component}

## Why

{One-sentence user value.}

## Verification

- [ ] Formula sourced/verified from: {Expo app file / Wikipedia / IRS Pub / IRDAI doc / etc.}
- [ ] Unit tests added: {N tests, listing key cases}
- [ ] Hand-written FAQs: {Y/N — Y for top-30, otherwise auto-generator is fine}
- [ ] Mobile checked at 360 / 768 / 1024 px
- [ ] Build green: tsc + eslint + vitest + next build
```

## 5. Common mistakes to avoid

1. **Don't invent a new slug** if one already exists in `src/constants/calculators.ts` — even commented out. URLs are permanent.
2. **Don't `Math.round` for money** — let `formatINR()` handle precision.
3. **Don't use plain `<div>{value}</div>` for results.** Use `<Stat>` / `<BigStat>` — they truncate and scale on mobile.
4. **Don't put Three.js or Canvas directly in a Server Component** — must be a Client Component, lazy-loaded with `next/dynamic` and `ssr: false`.
5. **Don't write a custom component when a schema works.** Adding 60 lines of bespoke JSX for what 12 lines of schema would do is technical debt.
6. **Don't skip FAQs** — even the auto-generator's 5 baseline FAQs are required because the `FAQPage` JSON-LD is what makes the page eligible for rich SERP snippets.
7. **Don't add a calculator's slug to the registry but forget the constants entry** (or vice versa). Both files must list it; otherwise the page 404s or the listing skips it.
8. **Don't hard-code English copy in custom components.** Use the existing translations or extend them — UI strings live in `src/i18n/messages/en.json`.

## 6. Quick reference — copy-paste skeleton (schema-driven)

```typescript
// In src/constants/calculators.ts:
C("my-slug", "My Calculator", "One-line description", "finance", "Calculator"),

// In src/lib/calculators/schemas/finance.ts (or correct category file):
{
  slug: "my-slug",
  inputs: [
    { id: "principal", label: "Amount", kind: "currency", default: 100000, prefix: "₹" },
    { id: "years", label: "Years", kind: "number", default: 10 },
  ],
  outputs: [
    { id: "result", label: "Final value", format: "currency-inr", tone: "primary", big: true },
  ],
  compute: (i) => ({ result: Number(i.principal) * Number(i.years) }),
  formula: "Whatever the math is",
},

// Optional curated FAQs in src/lib/faqs/curated.ts:
"my-slug": [
  { q: "How does it work?", a: "..." },
  { q: "When should I use it?", a: "..." },
  // ... at least 5
],
```

That's it. After saving these three pieces, the calculator gets:

- A live page at `/calculator/my-slug`
- Sitemap entry, OG image, FAQPage + SoftwareApplication + BreadcrumbList JSON-LD
- Listing in the category page + search results + (if user favorites it) on favorites page
- GA4 tracking on open / calculate / share / favorite

— all automatically, with zero additional wiring.
