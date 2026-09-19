# Mental SafeZw

A rebuild of the Mental SafeZw Bolt site as a production Next.js application, with the placeholder
"tests" replaced by real, validated mental-health screening instruments, plus a Flutter shell that
wraps the deployed site as a store-shippable mobile app.

```
mental-safezw/
├── web/        Next.js 15 app  →  deploys to Vercel
└── mobile/     Flutter shell   →  builds .apk / .ipa, loads the Vercel URL
```

---

## What changed from the Bolt version

| Before | Now |
| --- | --- |
| Bolt single-page build | Next.js 15, App Router, TypeScript, Tailwind, 18 prerendered routes |
| Generic "mental health evaluations" | Six published clinical instruments, scored with their real thresholds |
| No safety handling | Suicide-risk items interrupt the questionnaire before any score is shown |
| Unverified contact details | Every helpline checked against the organisation's own site |
| Web only | Installable PWA + Flutter shell for Play Store / App Store |

### The assessments are now real instruments

| Instrument | Screens for | Items | Cut-off |
| --- | --- | --- | --- |
| **SSQ-14** — Shona Symptom Questionnaire | Common mental disorder | 14 | ≥ 8 |
| **PHQ-9** | Depression | 9 | ≥ 10 |
| **GAD-7** | Generalised anxiety | 7 | ≥ 10 |
| **WHO-5** | Wellbeing | 5 | ≤ 13 |
| **PC-PTSD-5** | Post-traumatic stress | 5 | ≥ 3 |
| **AUDIT-C** | Harmful drinking | 3 | ≥ 4 |

Item wording is reproduced as published, not paraphrased, and each instrument carries its licence
and source citations in `web/lib/instruments.ts`. All six are free to use — the PHQ-9, GAD-7 and
PC-PTSD-5 are public domain, the WHO-5 and AUDIT-C are free for non-commercial use, and the SSQ-14
is published in the peer-reviewed literature and used openly in Zimbabwean public health practice.

The **SSQ-14 is the one that matters most here.** It was developed in Shona, in Harare, from how
Zimbabweans actually describe distress rather than translated from an English instrument, and it is
the screener Friendship Bench uses nationwide. It is featured first throughout the app.

### Safety design

This is the part that most deserves review before you ship:

- **PHQ-9 item 9** and **SSQ-14 item 13** ask about suicidal thoughts. Endorsing either one
  immediately halts the questionnaire and shows `RiskInterstitial` — **before any score is
  calculated or displayed.**
- That screen shows no score, no severity label, and asks no safety-assessment questions ("do you
  have a plan?"). An app cannot respond to those answers, and asking without being able to respond
  does harm.
- No method language appears anywhere, including in advice about removing access to means.
- 24/7 lines are listed first; daytime services below them.
- The crisis bar is the first element in the DOM on every page, so it is reachable at any point in
  any flow and is the first thing a screen reader encounters.
- If a risk item was endorsed, the result screen repeats the crisis prompt **above** the score.

### Privacy

No account, no server, no analytics. Results are written to `localStorage` on the device and
nothing else — individual answers are discarded once a score is computed. In a context where
mental-health stigma can cost someone a job, this was treated as a requirement rather than a
feature. Every storage call is wrapped in `try/catch` so private mode and blocked site data
degrade gracefully instead of crashing.

---

## Running the web app

```bash
cd web
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build        # production build
npm run typecheck    # tsc --noEmit
npm test             # 41 scoring assertions
```

`npm test` compiles `lib/instruments.ts` and verifies scoring against hand-checked expected values:
band boundaries are contiguous with no gaps, `maxScore` matches items × scale, the SSQ-14's
reverse-scored item 14 behaves correctly, WHO-5's inverted direction flags **low** scores, and risk
items flag even when the total score is low. Run it after any change to an instrument — a silent
scoring bug here has real consequences.

---

## Publishing to GitHub and Vercel

### 1. Push to GitHub

From the repository root (`mental-safezw/`, **not** `web/`):

```bash
git init -b main
git add .
git commit -m "Mental SafeZw: Next.js app with validated screening instruments"
```

Then create the remote. With the [GitHub CLI](https://cli.github.com):

```bash
gh auth login
gh repo create mental-safezw --public --source=. --remote=origin --push
```

Or create an empty repo in the GitHub UI (no README, no .gitignore — this repo has both) and:

```bash
git remote add origin https://github.com/<your-username>/mental-safezw.git
git push -u origin main
```

`.gitignore` already excludes `node_modules/`, `.next/`, build output, and — importantly — Android
signing keys (`*.jks`, `key.properties`). Check `git status` before your first commit and confirm
no keystore is listed.

### 2. Deploy on Vercel

Connect the repo rather than using the CLI — you get automatic deploys on every push, and preview
URLs for every pull request.

1. [vercel.com/new](https://vercel.com/new) → **Import Git Repository** → pick `mental-safezw`
2. **Set Root Directory to `web`.** This is the one setting that matters and the one that is easy
   to miss: the repo root holds both `web/` and `mobile/`, so Vercel will not find a Next.js app
   unless you point it at `web`.
3. Framework preset will auto-detect as Next.js. Leave the build and output settings alone.
4. No environment variables are needed — there is no backend.
5. **Deploy.**

`vercel.json` pins the Cape Town region (`cpt1`), the closest edge to Zimbabwe.

> If you prefer the CLI, `npx vercel --prod` from inside `web/` works too — at the `Which project?`
> prompt choose **Create a new project** rather than pressing Ctrl+C, which is what aborts the
> deploy with `User force closed the prompt`.

### 3. Point the mobile shell at the live URL

Once Vercel gives you a domain, update **both**:

- `mobile/lib/config.dart` → `allowedHosts` (add your real host, or every page bounces to the
  external browser)
- your build command → `--dart-define=APP_URL=https://<your-domain>`

### Continuous integration

`.github/workflows/ci.yml` runs on every push and pull request: typecheck, the 41 scoring tests,
a production build, and `npm audit --audit-level=high`. The audit gate is deliberate — see
[SECURITY.md](SECURITY.md).

Dependabot is configured in `.github/dependabot.yml` for weekly npm updates.

### Choosing a licence

This repo intentionally ships without a `LICENSE` file, because the choice is yours and it has real
consequences for a health tool. Without one, nobody else may legally reuse the code. If you want
other Zimbabwean projects to build on this, **MIT** or **Apache-2.0** are the usual choices;
Apache-2.0 additionally grants patent rights and requires changes to be stated. Add it via
GitHub's *Add file → Create new file → `LICENSE`* template picker.

Note this is separate from the clinical instruments, which carry their own terms — those are
documented per instrument in `web/lib/instruments.ts`.

---

## Building the mobile app

The Flutter app is a **thin shell**. All screening logic, content and scoring live in the web app,
so correcting a clinical threshold means redeploying to Vercel — not pushing a new binary through
app review. That matters when the content is health information.

What the shell adds that the web cannot do alone:

- **`tel:` handoff to the real dialler** — one tap from a crisis button to a ringing phone
- **An offline screen with crisis numbers compiled into the binary** — works with no data at all,
  which is the single best reason for this app to exist as a binary
- Hardware back button walking the web history
- Navigation confined to your own host; anything else opens in the external browser, so no third
  party can render inside your app's chrome

### First-time setup

The repo contains the Dart source and the hand-written platform files that matter
(`AndroidManifest.xml`, `Info.plist`, `build.gradle`). It does **not** contain the generated Gradle
wrapper, Xcode project or `Podfile`, which are large, version-specific and better generated locally:

```bash
cd mobile
flutter create . --platforms=android,ios --org zw.co.mentalsafezw
```

`flutter create` fills in missing scaffolding without overwriting existing files, so the committed
manifest and Info.plist survive. Then:

```bash
flutter pub get
flutter pub run flutter_launcher_icons     # generates launcher icons from assets/
flutter test
flutter analyze
```

### Pointing the shell at your deployment

The URL is injected at build time, so one source tree produces staging and production binaries:

```bash
flutter run --dart-define=APP_URL=https://your-app.vercel.app

flutter build apk  --release --dart-define=APP_URL=https://your-app.vercel.app
flutter build appbundle --release --dart-define=APP_URL=https://your-app.vercel.app   # Play Store
flutter build ipa  --release --dart-define=APP_URL=https://your-app.vercel.app        # App Store
```

**Also update `allowedHosts` in `mobile/lib/config.dart`** to include your real domain, or every
page will bounce out to the external browser.

### Signing

`android/app/build.gradle` currently uses the debug signing config so a release build succeeds out
of the box. **Replace this before publishing.** Generate an upload key, put it in
`android/key.properties` (already gitignored), and reference it from a proper `signingConfigs`
block.

---

## Honest status

- **Web app: verified.** `next build` passes clean, every route prerenders, 41/41 scoring tests
  pass, TypeScript strict mode with no errors, and `npm audit` reports zero vulnerabilities.
- **Security:** originally pinned to `next@15.1.6`, which is affected by
  [CVE-2025-66478](https://nextjs.org/blog/CVE-2025-66478) — a CVSS 10.0 remote code execution
  flaw in the React Server Components protocol, actively exploited in the wild, affecting all
  Next.js 15.x App Router apps. Now on Next 16.x with a clean audit. Dependencies use caret ranges
  so patches flow, with the lockfile pinning exact versions for reproducible builds.
- **Flutter app: written but not compiled.** The build container has no Flutter SDK and its network
  allowlist blocks both `storage.googleapis.com` and `pub.dev`, so the Dart could not be compiled
  or `flutter analyze`d here. The code targets stable APIs for `webview_flutter` 4.x,
  `connectivity_plus` 6.x and `url_launcher` 6.x, and version-sensitive calls were deliberately
  avoided (notably `Color.withValues`, which only exists in Flutter 3.27+). Expect to run
  `flutter analyze` once and fix any minor drift for your SDK version. `PopScope.onPopInvokedWithResult`
  requires Flutter 3.22 or newer — on an older SDK, swap it for `onPopInvoked`.

## Before this goes in front of real users

1. **Have a Zimbabwean mental health professional review the result copy and the crisis flow.** The
   instruments are correct; the wording around them is a judgement call and deserves a clinician's
   eyes.
2. **Re-verify every helpline number, and put a recurring reminder in place to do it again.**
   Numbers were checked in September 2026 against each organisation's own site. Services lose
   funding and numbers get reassigned; a dead crisis number is worse than none.
3. **Contact Friendship Bench and Childline before launch.** The app routes people to them. They
   should know, and may want input on how they are described.
4. **Translate into Shona and Ndebele.** The SSQ-14 exists in Shona already — running an
   English-only app around a Shona instrument is the biggest remaining gap in this build.
5. **Decide on the provider directory.** `/providers` deliberately lists organisations and explains
   how to verify registration with the Allied Health Practitioners Council, rather than naming
   individual therapists. Naming practitioners means vouching for them, which needs a real
   verification process behind it.

## Sources

Clinical instruments and their citations are listed in `web/lib/instruments.ts` and surfaced on
`/about`. Helpline details and their verification dates are in `web/lib/resources.ts`.
