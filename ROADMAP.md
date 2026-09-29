# Roadmap & Timetable — Phase 1 (MVP)

This file is the **plan**: every task, what it depends on, and when it's due.
**Status lives on GitHub Issues.** Each task below becomes one issue with the same ID in its title (e.g. `T14: BMI Calculator`).
Who is working on what is shown by the issue's **Assignee**.

> How to submit a task → [CONTRIBUTING.md](CONTRIBUTING.md) · How the code is organised → [ARCHITECTURE.md](ARCHITECTURE.md)

---

## Goal

Launch a live site with **14 working tools**, legal pages, a cookie banner and a custom domain, then submit the Google AdSense application.

**Target launch:** Sunday 15 November 2026 (with a buffer week until 22 November).

**Assumed pace:** ~6–8 hours per person per week. If that changes, re-plan at the weekly sync. Don't silently fall behind.

---

## How tasks are assigned

- **Anyone can take any task.** There are no fixed roles.
- At the **weekly sync** (see below), each person claims tasks for the coming week by assigning themselves the GitHub issue.
- Mid-week you can claim any **unassigned** task whose dependencies are done: assign yourself and comment "Taking this".
- **Work in progress limit: 2 tasks per person at a time.** Finish or hand back before claiming more.
- Try to keep the load roughly even. The _Size_ column helps with that.
- A few tasks are marked 🔑 **owner-only** because they need admin access to GitHub/Cloudflare/Google accounts, not because of preference.

### Sizes

| Size  | Rough effort | Example                                             |
| ----- | ------------ | --------------------------------------------------- |
| **S** | ≤ 2 hours    | A simple calculator, a config file                  |
| **M** | 2–5 hours    | A tool with several modes, a layout component       |
| **L** | 5–10 hours   | Image processing, the tool registry, cookie consent |

---

## Weekly rhythm

| When                                | What                                                                                                        |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Sunday, 30-min call**             | Demo what got merged · review this file · claim next week's tasks                                           |
| **Mon → Sun**                       | Work on claimed tasks. Open PRs as early as you like (Draft PRs are fine)                                   |
| **Friday**                          | If you're blocked or won't finish, **comment on the issue**. Early warning is always better than a surprise |
| **Sunday end of day**               | **Deadline**: the PR for each claimed task must be **opened** (not necessarily merged)                      |
| **Within 48 hours of a PR opening** | The other person reviews it                                                                                 |

A task is **done** only when its PR is **merged**. See the [Definition of Done](#definition-of-done).

---

## Timetable

### Week 1 — Foundation · Mon 28 Sep → Sun 4 Oct 2026

_Goal: the repo is safe to collaborate in. These tasks block everything else, so do them in order._

| ID  | Task                                                          | Size | Depends on | Notes                               |
| --- | ------------------------------------------------------------- | ---- | ---------- | ----------------------------------- |
| T01 | Quality tooling: typecheck, lint, format, test scripts        | M    | —          | In progress (PR #1)                 |
| T02 | CI workflow: run all checks on every PR (GitHub Actions)      | S    | T01        |                                     |
| T03 | PR template, issue templates, labels                          | S    | —          |                                     |
| T04 | 🔑 Protect `main`, invite collaborator                        | S    | T02        | Owner-only                          |
| T05 | 🔑 Deploy to Cloudflare Pages with preview URL per PR         | M    | T01        | Owner-only                          |
| T06 | Onboarding: clone, run locally, add yourself to README "Team" | S    | T04        | **Each new contributor's first PR** |

### Week 2 — Core framework · Mon 5 Oct → Sun 11 Oct 2026

_Goal: the skeleton every tool plugs into._

| ID  | Task                                                                          | Size | Depends on | Notes                                                    |
| --- | ----------------------------------------------------------------------------- | ---- | ---------- | -------------------------------------------------------- |
| T07 | Design tokens: colors, fonts, spacing, dark mode in `global.css`              | M    | T01        |                                                          |
| T08 | `BaseLayout`: `<head>` + SEO meta, header, footer, mobile menu                | M    | T07        |                                                          |
| T09 | Shared UI: `Button`, `Input`, `Select`, `TextArea`, `ResultBox`, `CopyButton` | L    | T07        |                                                          |
| T10 | Tool types + `registry.ts` + `ToolLayout` + `tools/[slug].astro`              | L    | T08        | Most important task of Phase 1                           |
| T11 | Homepage tool grid + category pages                                           | M    | T10        |                                                          |
| T12 | **Word Counter**: the reference tool                                          | M    | T09, T10   | **Pair-programmed together**; the pattern for all others |

### Week 3 — Tools, batch A (pure logic, easiest) · Mon 12 Oct → Sun 18 Oct 2026

| ID  | Task                                                                  | Size | Depends on | Notes                               |
| --- | --------------------------------------------------------------------- | ---- | ---------- | ----------------------------------- |
| T13 | Percentage Calculator (X% of Y, X is what % of Y, % change)           | S    | T12        |                                     |
| T14 | BMI Calculator (metric + imperial)                                    | S    | T12        |                                     |
| T15 | Age Calculator (years, months, days; leap years)                      | M    | T12        | Dates are trickier than they look   |
| T16 | Base64 Encoder/Decoder (incl. Unicode text)                           | S    | T12        |                                     |
| T17 | Password Generator (length, character sets, `crypto.getRandomValues`) | M    | T12        | Never `Math.random()` for passwords |

### Week 4 — Tools, batch B · Mon 19 Oct → Sun 25 Oct 2026

| ID  | Task                                                              | Size | Depends on | Notes                                         |
| --- | ----------------------------------------------------------------- | ---- | ---------- | --------------------------------------------- |
| T18 | EMI Calculator (monthly EMI, total interest, schedule)            | M    | T12        |                                               |
| T19 | Unit Converter (length, weight, temperature, area, volume, speed) | M    | T12        |                                               |
| T20 | JSON Formatter / Validator (format, minify, show error line)      | M    | T12        |                                               |
| T21 | Color Picker (picker + HEX/RGB/HSL conversion)                    | M    | T12        |                                               |
| T22 | QR Code Generator (text/URL → PNG/SVG download)                   | M    | T12        | Uses a small library; discuss which in the PR |

### Week 5 — Tools, batch C + discovery · Mon 26 Oct → Sun 1 Nov 2026

| ID  | Task                                                                | Size | Depends on | Notes                                |
| --- | ------------------------------------------------------------------- | ---- | ---------- | ------------------------------------ |
| T23 | Currency Converter (public rates API, caching, offline/error state) | L    | T12        | Only tool that calls an external API |
| T24 | Image Converter (PNG/JPG/WebP via Canvas API, in-browser)           | L    | T12        | File never leaves the device         |
| T25 | Image Compressor (quality slider, before/after size)                | L    | T24        | Reuses T24's helpers                 |
| T26 | Search box on homepage (filter registry by name/keywords)           | M    | T11        |                                      |
| T27 | 404 page, `sitemap.xml`, `robots.txt`                               | S    | T10        |                                      |

### Week 6 — Trust & compliance (AdSense requirements) · Mon 2 Nov → Sun 8 Nov 2026

| ID  | Task                                                             | Size | Depends on | Notes                              |
| --- | ---------------------------------------------------------------- | ---- | ---------- | ---------------------------------- |
| T28 | About + Contact pages                                            | S    | T08        | Contact via email link, no backend |
| T29 | Privacy Policy + Terms pages                                     | M    | T08        | Must mention AdSense cookies       |
| T30 | Cookie consent banner; ads/analytics load **only after consent** | L    | T08        | Legal requirement (GDPR/CCPA)      |
| T31 | SEO content for every tool page: intro, how-to, FAQ              | L    | T13–T25    | Can be split per tool if needed    |

### Week 7 — Launch · Mon 9 Nov → Sun 15 Nov 2026

| ID  | Task                                                    | Size | Depends on   | Notes                    |
| --- | ------------------------------------------------------- | ---- | ------------ | ------------------------ |
| T32 | QA pass: every page on phone + desktop, Lighthouse ≥ 90 | M    | all          | Both people, split pages |
| T33 | 🔑 Custom domain + production deploy                    | S    | T05          | Owner-only               |
| T34 | 🔑 Submit AdSense application, add `ads.txt`            | S    | T28–T30, T33 | Owner-only               |

### Week 8 — Buffer · Mon 16 Nov → Sun 22 Nov 2026

Catch up on anything that slipped. If nothing slipped, start picking Phase 2 tools.

---

## Dependency map (what unblocks what)

```
T01 ─┬─▶ T02 ─▶ T04 ─▶ T06
     ├─▶ T05 ─────────────────────────────────────────────▶ T33 ─▶ T34
     └─▶ T07 ─┬─▶ T08 ─┬─▶ T10 ─┬─▶ T11 ─▶ T26
              │        │        ├─▶ T27
              │        │        └─▶ T12 ─▶ T13 … T25 ─▶ T31
              └─▶ T09 ─┴───────────▶ T12
                       └─▶ T28, T29, T30
```

Weeks 1–2 are mostly a **chain**, so only one or two tasks can run at a time. Weeks 3–5 are **wide**, and every tool can be built in parallel. That's why the tools come after the framework.

---

## Definition of Done

A task is done when **all** of these are true:

- [ ] PR merged into `main`
- [ ] All CI checks green (typecheck, lint, format, test, build)
- [ ] For tools: `logic.ts` has tests, including edge cases (empty, zero, negative, huge)
- [ ] Works on a phone-sized screen and on desktop (checked on the preview URL)
- [ ] No `console.log` left behind, no commented-out code
- [ ] The GitHub issue is closed (happens automatically with `Closes #N` in the PR)

---

## Changing this plan

This timetable is a guess and will be wrong in places. That's normal.
Change it **at the Sunday sync**, through a normal PR to this file (`docs: update roadmap`).
Don't delete missed deadlines; move the task to the next week, so we learn our real pace.
