# CalcMaster — PWA & Play Store

Everything specific to shipping CalcMaster as an installable PWA and an Android
app. The general method — how a TWA works, keystore handling, Play Console
mechanics — lives once in
[`~/Documents/p_project/pwa-playbook/`](../../../../pwa-playbook/README.md). Read
that first; this file is only what differs for CalcMaster.

---

## Identity — permanent, do not change

|                    |                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------- |
| Origin             | `https://calcmaster.pooniya.com`                                                                  |
| Package id         | `com.pooniya.calcmaster`                                                                          |
| Launcher name      | CalcMaster                                                                                        |
| Keystore           | `~/calcmaster-release.keystore` (alias `calcmaster`)                                              |
| Credentials        | `~/calcmaster-keystore-credentials.txt` (mode 600)                                                |
| Upload key SHA-256 | `76:0E:52:8A:E3:6F:A5:F6:CF:98:C3:14:AC:28:41:3A:0B:C9:4F:D9:00:85:A8:5B:0A:85:DB:D1:74:92:E6:04` |
| Theme / background | `#0D9488` / `#0a0f1c`                                                                             |
| Play category      | **Finance**                                                                                       |

> ⚠️ An older `~/calcmaster-release.keystore` existed with **no recorded
> password**; it is preserved as `.orphan.bak` and is not used. Nothing was ever
> published with it, so this costs nothing — but **back up the new keystore and
> its credentials file off this machine now.**

---

## What changed here

**The service worker was never being generated.** `next.config.ts` used
`@ducanh2912/next-pwa`, which is a webpack plugin, while `npm run build` ran on
Next 16's default **Turbopack** — so the plugin silently did nothing and
`public/sw.js` never existed. CalcMaster had a manifest, an `InstallPrompt` and an
`OfflineBanner`, but Chrome would not have offered installation, because a
registered service worker with a fetch handler is a hard requirement.

Fixed by moving to **Serwist** (the maintained successor, and what the other four
projects use):

- `src/app/sw.ts` — new. Serwist config with `NetworkFirst` navigations,
  `CacheFirst` for `/_next/static` and icons, and the `/~offline` fallback. The
  **web-push handlers from the old `public/sw-push.js` are ported into it**;
  `next-pwa` used to merge that file in via `importScripts`, and Serwist has no
  equivalent step, so the handlers now live in `sw.ts` directly.
- `next.config.ts` — `withPWAInit` → `withSerwistInit`.
- `package.json` — `next build` → **`next build --webpack`**. Serwist's plugin is
  webpack-based; this is the line that actually makes the service worker exist.
- `src/components/pwa/ServiceWorkerRegister.tsx` — new. `next-pwa` registered the
  worker for us via `register: true`; Serwist only _builds_ `public/sw.js`, so
  registration is ours to do.
- `src/app/~offline/page.tsx` — new. The fallback the service worker serves.
- `public/.well-known/assetlinks.json` — new, carrying the upload-key fingerprint.
- `eslint.config.mjs` / `.gitignore` — ignore the generated `public/sw.js`.
- `twa/` — new. TWA project + signed `.aab`.

Icons were **not** touched: the existing set is complete and
`icon-512-maskable.png` is correctly inset on the teal ground, which is the part
people usually get wrong.

---

## Current state

|                   |                                                           |
| ----------------- | --------------------------------------------------------- |
| Origin live       | ✅ 200                                                    |
| Manifest          | ✅ `public/manifest.webmanifest`, 9 icons + 3 shortcuts   |
| Service worker    | ✅ generated (48 KB) — **new**                            |
| Offline page      | ✅ `/~offline` — **new**                                  |
| Install prompt    | ✅ pre-existing                                           |
| `assetlinks.json` | ✅ in repo — **not yet deployed**                         |
| Signed bundle     | ✅ `twa/app-release-bundle.aab` (4.8 MB)                  |
| Analytics         | none — Data safety is the clean "collects no data" answer |

---

## Build the Android bundle

```bash
cd twa
export BUBBLEWRAP_KEYSTORE_PASSWORD=$(grep '^password' ~/calcmaster-keystore-credentials.txt | awk '{print $2}')
export BUBBLEWRAP_KEY_PASSWORD="$BUBBLEWRAP_KEYSTORE_PASSWORD"
npx @bubblewrap/cli@latest build --skipPwaValidation
```

Verify:

```bash
~/Android/Sdk/build-tools/36.1.0/aapt2 dump badging app-release-signed.apk | head -1
# package: name='com.pooniya.calcmaster' versionCode='1' versionName='1.0.0'
```

---

## What you must supply

- [ ] **Deploy** so `https://calcmaster.pooniya.com/.well-known/assetlinks.json` returns the JSON
- [ ] **Back up** `~/calcmaster-release.keystore` + `~/calcmaster-keystore-credentials.txt`
- [ ] **Feature graphic**, 1024×500
- [ ] **Screenshots**, 2–8 at 1080×1920 — suggested order below
- [ ] **A `/terms` page** — CalcMaster has `/privacy` but no terms page
- [ ] Confirm `/privacy` names "CalcMaster"

### Screenshots worth the slots

| #   | Screen                                      | Why                                                     |
| --- | ------------------------------------------- | ------------------------------------------------------- |
| 1   | SIP calculator with a filled result + chart | The most-searched calculator; leads with the payoff     |
| 2   | EMI calculator with the amortisation table  | Shows depth, not just a number                          |
| 3   | The category grid                           | Communicates "50+ calculators" faster than any sentence |
| 4   | BMI or another health calculator            | Shows breadth beyond finance                            |
| 5   | A unit/date converter                       | Same                                                    |
| 6   | Favourites or history                       | Shows it remembers you                                  |

Fill every input with realistic numbers. An empty calculator screenshot is the
single most common trigger for a "minimum functionality" rejection.

---

## Store listing

**App name** (≤30)

```
CalcMaster
```

**Short description** (≤80)

```
50+ free calculators — finance, EMI, SIP, health, maths. Works offline.
```

70 chars.

**Full description** (≤4000)

```
CalcMaster is a collection of more than 50 calculators that runs entirely in
your browser. No sign-up, no upload, no waiting.

WHAT YOU CAN WORK OUT

• Money — SIP returns, EMI and loan schedules, interest, GST, income tax
• Health — BMI, body fat, calories, ideal weight
• Maths — percentages, fractions, averages, algebra
• Conversion — length, weight, temperature, area, speed, data
• Dates — age, days between dates, deadlines
• Crypto and currency

WHY IT'S DIFFERENT

• Everything is calculated on your device — nothing is sent to a server
• Works offline once installed
• Every result shows its working, not just a number
• Save the calculators you use to Favourites
• Free, with no watermarks and no account

CalcMaster is a calculator, not financial advice. It shows you the arithmetic
behind a decision — the decision stays yours.
```

**Category:** Business → no. Use **Finance**. That is where people search for
"EMI calculator" and "SIP calculator", and it puts CalcMaster beside the right
neighbours.

---

## App content answers

| Card               | Answer                                                           |
| ------------------ | ---------------------------------------------------------------- |
| Privacy policy     | `https://calcmaster.pooniya.com/privacy`                         |
| App access         | All functionality available without special access               |
| Ads                | **No**                                                           |
| Content rating     | Utility/Productivity, No to everything → Everyone                |
| Target audience    | 13+ (and up). Do not tick under-13.                              |
| Data safety        | **"No, this app does not collect or share any user data."**      |
| Financial features | **None of these** — a loan calculator is not a financial service |
| Health apps        | No — a BMI calculator is not a health app in Play's sense        |
| Advertising ID     | No                                                               |

The empty Data safety form is genuinely true here: no analytics is configured,
and every calculation happens on-device. Keep it that way and it stays a selling
point rather than a form to maintain.

---

## Releasing an update

Feature work needs **no** Play release — deploy the web app and every installed
device updates instantly.

Rebuild only for name, icon, colours, package id, start URL or version. Bump all
three of `appVersionName` / `appVersion` / `appVersionCode` in
`twa/twa-manifest.json` (the code must strictly increase), then follow
[03-twa-build.md](../../../../pwa-playbook/03-twa-build.md#5-shipping-an-update).
