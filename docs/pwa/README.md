# CalcMaster — Android release

## App identity

| Setting                      | Value                                                                                             |
| ---------------------------- | ------------------------------------------------------------------------------------------------- |
| Package ID                   | `com.pooniya.calcmaster`                                                                          |
| Launcher name                | CalcMaster                                                                                        |
| Website                      | `https://calcmaster.pooniya.com`                                                                  |
| Version name / code          | `1.0.2` / `3`                                                                                     |
| Target / minimum Android API | `36` / `23`                                                                                       |
| Upload keystore              | `~/calcmaster-release.keystore`, alias `calcmaster`                                               |
| Keystore credentials         | `~/calcmaster-keystore-credentials.txt` — keep private                                            |
| Upload certificate SHA-256   | `76:0E:52:8A:E3:6F:A5:F6:CF:98:C3:14:AC:28:41:3A:0B:C9:4F:D9:00:85:A8:5B:0A:85:DB:D1:74:92:E6:04` |

Keep the package ID and signing key stable. Back up the keystore and credentials
outside this repository. Never upload either file to a store listing or commit them.

The icons, launcher images, splash artwork, and favicon for this release are generated
from `public/logo/calcMasterNewLogo.png` by `node scripts/generate-icons.mjs`.

## Files for this release

- **Play Console:** `twa/app-release-bundle.aab`.
- **Direct installation on Android:** `twa/app-release-signed.apk`.

The Android app is a Trusted Web Activity: it opens the production website.
The AAB contains the Android wrapper, icons, and launch configuration. It does
**not** embed the local Next.js application. Deploy the web changes before
expecting them to appear in the installed app.

Testing and production deployment are handled by the project owner for this
release. Building and signing these files does not mean device testing or Play
review has passed.

## Production handoff

1. Deploy this web source with `npm run build` (webpack is required for Serwist).
2. Confirm these URLs serve the expected files:
   - `/privacy`: revised policy for `com.pooniya.calcmaster`.
   - `/sw.js`: generated JavaScript service worker.
   - `/~offline`: offline fallback page.
   - `/.well-known/assetlinks.json`: JSON containing the package ID and certificates.
3. After configuring Play App Signing, copy its **app signing certificate**
   SHA-256 from Play Console into `public/.well-known/assetlinks.json` and deploy
   again. Keep the upload certificate already in the file for local APK installs.
   Add actual certificate values only; a placeholder will not verify the app.
4. Install and exercise the app yourself, including a Play-distributed build.
   Offline support depends on cached pages and assets; first launch needs internet.

The readiness check on 27 September 2026 found the home page and privacy page
online, but `/sw.js`, `/~offline`, and `/.well-known/assetlinks.json` returned 404.
The site loaded Google Analytics. These observations must be rechecked after
the owner's deployment.

## Play Console content

Prepare the listing, a 512×512 icon, a 1024×500 feature graphic, and at least two
phone screenshots showing the actual app. Use `CalcMaster` as the store name.
Use `https://calcmaster.pooniya.com/privacy` as the privacy policy URL.

Suggested short description:

> Free calculators for finance, maths, health, conversions, and everyday tasks.

Describe the available calculators, local calculation history, favorites, themes,
and supported languages. Say that previously cached pages can work offline.
Avoid claiming the app collects no data or that every page works offline immediately
after installation.

Complete each declaration from the deployed app and actual Console configuration:

- **App access:** calculator features do not require sign-in.
- **Data safety:** Google Analytics is enabled on the observed production site.
  Review its collected data, retention, sharing settings, and consent configuration.
  Also account for hosting and optional push subscriptions. Do not use a blanket
  “no data collected” answer. Browser-backed app content is part of this assessment.
- **Health apps:** declare the offered health features, including relevant fitness
  and weight-management calculators. Do not declare that the app has no health features.
- **Financial features:** assess the actual finance calculators against the current
  form. Providing calculators does not establish an exemption from the declaration.
- **Ads, advertising ID, audience, and content rating:** answer from the actual app
  and configured services; do not copy guessed answers or ratings.
- **Testing access:** personal accounts created after 13 November 2023 need the
  required closed test before applying for production access. Check your Console.

References:

- [Google Play preparation](https://support.google.com/googleplay/android-developer/answer/9859455)
- [Data safety](https://support.google.com/googleplay/android-developer/answer/10787469)
- [Health declarations](https://support.google.com/googleplay/android-developer/answer/14738291)
- [Testing requirements](https://support.google.com/googleplay/android-developer/answer/14151465)
- [TWA signing and Digital Asset Links](https://developer.chrome.com/docs/android/trusted-web-activity/android-for-web-devs)

## Rebuilding

Keep `appVersionName`, `appVersion`, and `appVersionCode` in
`twa/twa-manifest.json` aligned with `versionName` and `versionCode` in
`twa/app/build.gradle`. Each new upload needs an unused, higher version code.

Build the existing Android project without device tests:

```bash
cd twa
JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64 ANDROID_HOME=/home/pooniya/Android/Sdk ./gradlew assembleRelease bundleRelease -x test -x lint --console=plain
```

The Gradle outputs are unsigned. Sign the bundle with the existing keystore using
`jarsigner` and the APK using `apksigner`; supply passwords through environment
variables or secure prompts. The signed root-level files named above are the
release deliverables. Build outputs and credentials are ignored by Git.

For ordinary web-content changes, deploy the website. Rebuild Android when its
native resources, launch configuration, dependencies, or release version change.
Cached web content may take a reload or service worker update to refresh.
