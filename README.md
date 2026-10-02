# TrendMinds

> Working name. Final branding is still to be decided.

**50+ free, fast, no-signup online tools in one place**: calculators, file converters, text and code utilities, and everyday helpers.

Instead of searching Google separately for a BMI calculator, an image compressor and a word counter, and landing on three ad-cluttered sites, a user finds all of them here with the same clean interface. Most tools run **entirely in the browser**, so files and text never leave the user's device.

**Status:** 🚧 Phase 1 (MVP) in progress. 14 tools, target launch **15 November 2026**. See [ROADMAP.md](ROADMAP.md).

---

## Documentation

| Read this                          | To learn                                                 |
| ---------------------------------- | -------------------------------------------------------- |
| [ROADMAP.md](ROADMAP.md)           | The task list, timetable, deadlines and who's doing what |
| [CONTRIBUTING.md](CONTRIBUTING.md) | **How to submit work**: branches, commits, PRs, reviews  |
| [ARCHITECTURE.md](ARCHITECTURE.md) | How the code is organised and why                        |

New here? Read them in this order: README → ARCHITECTURE → CONTRIBUTING → ROADMAP.

---

## Quick start

Requires **Node.js 22.12 or newer** (`node -v` to check).

```bash
git clone https://github.com/tryingtobeadeveloperin2025/trendminds.git
cd trendminds
npm install
npm run dev
```

Open **http://localhost:4321**. Edits to files in `src/` appear in the browser as soon as you save.

---

## Commands

| Command                | What it does                                                   |
| ---------------------- | -------------------------------------------------------------- |
| `npm run dev`          | Start the local dev server with live reload                    |
| `npm run build`        | Build the production site into `dist/`                         |
| `npm run preview`      | Serve the built `dist/` locally, to check a production build   |
| `npm run typecheck`    | Check types in `.ts`, `.tsx` and `.astro` files                |
| `npm run lint`         | Find likely bugs with ESLint                                   |
| `npm run format`       | Auto-format all files with Prettier                            |
| `npm run format:check` | Report formatting problems without changing files (used by CI) |
| `npm test`             | Run all tests once                                             |
| `npm run test:watch`   | Re-run tests every time you save                               |

---

## Tech stack

**Astro** (static pages) · **React** (interactive tool UIs) · **TypeScript** · **Tailwind CSS** · **Vitest** · **ESLint + Prettier** · hosted on **Cloudflare Pages** · CI on **GitHub Actions**.

The reasons for each choice are in [ARCHITECTURE.md §2](ARCHITECTURE.md#2-tech-stack-and-why-each-piece-was-chosen).

---

## Project structure (short version)

```
src/
├── tools/<tool-slug>/   ← one folder per tool (meta, logic, tests, UI)
├── registry.ts          ← list of all tools
├── components/          ← shared UI (buttons, inputs, header…)
├── layouts/             ← page wrappers
└── pages/               ← every file here becomes a URL
```

Full version: [ARCHITECTURE.md §3](ARCHITECTURE.md#3-folder-structure).

---

## Team

| Name        | GitHub                                                                       | Role                                  |
| ----------- | ---------------------------------------------------------------------------- | ------------------------------------- |
| Aayan Mulla | [@tryingtobeadeveloperin2025](https://github.com/tryingtobeadeveloperin2025) | Maintainer: reviews, merges, releases |
| Sarfaraz    | [@sarf14](https://github.com/sarf14)                                         | Contributor                           |
