# Architecture

This document explains **how the project is built and why**. Read it before your first PR.
If a decision here changes, update this file in the same PR.

---

## 1. The big picture

The site is a collection of small tools. Almost all of them run **entirely in the user's browser**.
There is no server that does work when someone uses a tool: the server only hands out files that were built ahead of time.

```
 ┌──────────────── BUILD TIME (on our machine / in CI) ────────────────┐
 │                                                                     │
 │  src/ (Astro + React + TypeScript)  ──  npm run build  ──▶  dist/   │
 │                                                     (HTML, CSS, JS) │
 └─────────────────────────────────────────────────────────────────────┘
                                   │ upload
                                   ▼
 ┌──────────────── RUN TIME ───────────────────────────────────────────┐
 │                                                                     │
 │  Cloudflare Pages (CDN) ──▶ user's browser ──▶ tool runs locally    │
 │                                                                     │
 │  Exceptions (only where unavoidable):                               │
 │   • Currency Converter → fetches exchange rates from a public API   │
 │   • Phase 3 video/audio tools → our own backend (not built yet)     │
 └─────────────────────────────────────────────────────────────────────┘
```

Why this matters:
- **Cost:** serving static files is free at our scale. There's no server to pay for or keep running.
- **Speed:** pages are plain HTML served from a CDN close to the user.
- **Privacy:** user files (images, text) never leave their device in Phase 1.

---

## 2. Tech stack and why each piece was chosen

| Piece | Choice | What it does | Why we picked it |
|---|---|---|---|
| Runtime | **Node.js** | Runs our build tools on our machines | Required by Astro/npm |
| Package manager | **npm** | Installs libraries listed in `package.json` | Comes with Node, no extra setup |
| Framework | **Astro** | Turns our pages into static HTML at build time | Ships zero JavaScript by default, which is great for SEO and speed |
| UI library | **React** (inside Astro) | Builds the interactive part of each tool | Most widely known UI library |
| Language | **TypeScript** | JavaScript plus types | Catches mistakes before the code runs and makes PRs easier to review |
| Styling | **Tailwind CSS** | Utility classes like `p-4 text-lg` | Consistent design with no separate CSS files per tool |
| Tests | **Vitest** | Runs `*.test.ts` files | Fast and works with our Vite-based setup |
| Lint/format | **ESLint + Prettier** | Flags bugs and auto-formats code | Everyone's code looks the same, so reviews focus on logic |
| Hosting | **Cloudflare Pages** | Serves `dist/` worldwide | Free, custom domain, **preview URL for every PR** |
| CI | **GitHub Actions** | Runs checks on every PR | Broken code can't be merged |

### Key concept: "islands"
An Astro page is static HTML. When part of the page must be interactive, such as the calculator form, we drop in a React component with a `client:*` directive:

```astro
<BmiCalculator client:load />
```

Only that component's JavaScript is sent to the browser. The rest of the page (header, text, footer) stays as plain HTML. That interactive part is called an **island**.

---

## 3. Folder structure

```
Demo-1/
├── .github/
│   ├── workflows/ci.yml           # CI: lint, typecheck, test, build on every PR
│   ├── pull_request_template.md   # checklist shown when opening a PR
│   ├── ISSUE_TEMPLATE/            # templates for "new tool" / "bug" issues
│   └── CODEOWNERS                 # who must approve PRs
├── public/                        # files copied as-is (favicon, robots.txt, ads.txt)
├── src/
│   ├── tools/                     # ★ ONE FOLDER PER TOOL (most work happens here)
│   │   ├── word-counter/
│   │   ├── bmi-calculator/
│   │   └── ...
│   ├── registry.ts                # collects every tool's meta.ts into one list
│   ├── components/                # shared UI: Header, Footer, ToolCard, Input, Button...
│   ├── layouts/
│   │   ├── BaseLayout.astro       # <html>, <head>, SEO tags, header, footer, consent
│   │   └── ToolLayout.astro       # wraps every tool page (title, description, ad slots)
│   ├── pages/                     # every file here becomes a URL
│   │   ├── index.astro            # /                (homepage)
│   │   ├── [category].astro       # /calculators, /text-tools, ...
│   │   ├── tools/[slug].astro     # /tools/bmi-calculator, ... (generated from registry)
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── privacy.astro
│   │   └── terms.astro
│   └── styles/global.css          # Tailwind setup and design tokens (colors, fonts)
├── ARCHITECTURE.md                # this file
├── CONTRIBUTING.md                # how to pick up a task and open a PR
├── astro.config.mjs               # Astro settings
├── package.json                   # dependencies and scripts (npm run dev/build/test)
└── tsconfig.json                  # TypeScript settings
```

---

## 4. Anatomy of a tool (the most important section)

Every tool lives in `src/tools/<slug>/` and has exactly four files:

```
src/tools/bmi-calculator/
├── meta.ts         # WHAT the tool is: name, slug, category, description, keywords
├── logic.ts        # HOW it computes: pure functions only, no React, no DOM
├── logic.test.ts   # PROOF logic.ts is correct
└── Tool.tsx        # UI: inputs, buttons, output. Calls functions from logic.ts
```

### Rules
1. **`logic.ts` is pure.** Given the same input it always returns the same output. It never touches the page, `window` or the network. This makes it trivial to test and review.
2. **`Tool.tsx` contains no math.** It only reads inputs, calls `logic.ts` and displays results.
3. **Every exported function in `logic.ts` has tests**, including edge cases (empty input, zero, negative, huge numbers).
4. **A tool never imports from another tool's folder.** Shared code goes in `src/components/` or `src/lib/`.
5. **Tools use shared components** (`<Input>`, `<Button>`, `<ResultBox>`) so every tool looks the same.

### Why split it this way?
- A reviewer can check correctness by reading `logic.ts` and its tests without running the app.
- The UI can be redesigned later without touching the math.
- When a bug is reported, a failing test is written first, then the fix.

---

## 5. The tool registry

`src/registry.ts` imports every `meta.ts` and exports one array of tools.
Everything that lists tools reads from this array:

- the homepage grid
- category pages
- the search box
- the sitemap (for Google)
- `tools/[slug].astro`, which generates one page per tool at build time

**Adding a tool = create the folder + add one line to the registry.** No other file changes.

---

## 6. Client-side vs server-side rule

Before building a tool, ask: *can the browser do this alone?*

| Answer | Where it runs | Examples |
|---|---|---|
| Yes | Browser only | Calculators, text/code tools, password, QR, color picker |
| Yes, with a browser API | Browser only | Image compress/convert (Canvas API), text-to-speech (Web Speech API) |
| Needs public data | Browser + third-party API, cached | Currency converter (exchange rates) |
| Needs heavy processing | **Our backend (Phase 3)** | Video/audio conversion, speech-to-text |

Adding any server-side piece requires a discussion and an update to this document first, because it costs money on every use.

---

## 7. Page layout, ads and consent

- `BaseLayout.astro` renders the header, footer, SEO `<meta>` tags and the **cookie consent banner** on every page.
- **AdSense scripts load only after the user accepts cookies** (required for GDPR/CCPA).
- Ad slots are placed only in `ToolLayout.astro`, **never inside a tool**, and always have a fixed height reserved so the page doesn't jump when an ad loads (layout shift hurts Google ranking).
- No popups or interstitial ads.

---

## 8. Quality gates

A PR can be merged only when **all** of these pass:

| Check | Command | Catches |
|---|---|---|
| Lint | `npm run lint` | Common bugs, unused variables |
| Format | `npm run format:check` | Inconsistent formatting |
| Types | `npm run typecheck` | Wrong types, typos in property names |
| Tests | `npm run test` | Broken logic |
| Build | `npm run build` | Pages that fail to generate |
| Human review | Code owner approval | Everything else |

Plus a manual check on the **Cloudflare preview URL** on mobile and desktop.

---

## 9. Collaboration workflow

1. The maintainer opens a GitHub **issue** per task, labelled (`tool`, `good first issue`, `phase-1`...).
2. The contributor comments on the issue, gets assigned, then creates a branch:
   `feat/bmi-calculator`, `fix/word-counter-empty-input`, `docs/update-readme`
3. Commits follow **Conventional Commits**:
   `feat(bmi): add BMI calculator`, `fix(json): handle trailing commas`, `test(age): add leap year cases`
4. The contributor opens a PR that links the issue (`Closes #12`) and fills in the PR template.
5. CI runs. The preview URL appears on the PR.
6. The maintainer reviews: **Approve**, **Request changes** (with comments), or **Close**.
7. After approval the PR is **squash-merged** into `main`, which deploys to production automatically.

`main` is protected: nobody pushes to it directly, including the maintainer.

---

## 10. Future (not in Phase 1)

- **Backend (Phase 3):** a small Go service (Fiber) for video/audio/PDF processing. Files are processed in memory or temp storage and deleted immediately. They are never stored.
- **Pipeline Builder (Phase 4):** because every tool's `logic.ts` is a pure function with typed input and output, tools can later be chained together. This is one more reason for the strict logic/UI split.

---

## Glossary

- **SSG (Static Site Generation):** building every page into an HTML file ahead of time instead of on each request.
- **Island / hydration:** an interactive component on an otherwise static page. "Hydration" is when its JavaScript loads and makes it interactive.
- **CDN:** servers worldwide that keep copies of our files close to users.
- **CI (Continuous Integration):** automatic checks that run on every PR.
- **Slug:** the URL-friendly name of a tool, e.g. `bmi-calculator`.
