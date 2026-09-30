# Contributing

This is the **step-by-step guide to submitting work**, from picking a task to getting it merged.
Follow it exactly for every task, including small ones. It becomes automatic after two or three PRs.

> What to work on and when → [ROADMAP.md](ROADMAP.md) · How the code is organised → [ARCHITECTURE.md](ARCHITECTURE.md)

---

## The whole flow at a glance

```
 1. Pick a task (GitHub issue)       →  assign yourself
 2. Update your local main           →  git switch main && git pull
 3. Create a branch                  →  git switch -c feat/bmi-calculator
 4. Write the code + tests
 5. Run the checks locally           →  npm run format, typecheck, lint, test, build
 6. Commit                           →  git commit -m "feat(bmi): add BMI calculator"
 7. Push + open a PR                 →  git push -u origin HEAD && gh pr create
 8. Review: fix comments, push again
 9. Reviewer approves → squash-merge
10. Clean up                         →  git switch main && git pull && git branch -d <branch>
```

---

## 0. One-time setup (first day only)

### Install

| Tool                | Check it's installed | Install (macOS)                                        |
| ------------------- | -------------------- | ------------------------------------------------------ |
| Node.js **≥ 22.12** | `node -v`            | `brew install node`                                    |
| Git                 | `git --version`      | comes with Xcode tools                                 |
| GitHub CLI          | `gh --version`       | `brew install gh`                                      |
| VS Code             | —                    | [code.visualstudio.com](https://code.visualstudio.com) |

On Windows or Linux, install Node from [nodejs.org](https://nodejs.org) and GitHub CLI from [cli.github.com](https://cli.github.com).

**VS Code extensions** (search in the Extensions panel): _Astro_, _ESLint_, _Prettier_, _Tailwind CSS IntelliSense_.

### Configure git (once per computer)

```bash
git config --global user.name "Your Name"
git config --global user.email "the-email-on-your-github-account@example.com"
gh auth login
```

The email must be one that's added to your GitHub account, or your commits won't show your profile.

### Get the code

1. Accept the collaborator invite (check your email or https://github.com/notifications).
2. Clone and run:

```bash
git clone https://github.com/tryingtobeadeveloperin2025/trendminds.git
cd trendminds
npm install
npm run dev
```

3. Open http://localhost:4321. If you see the site, you're set up.

Your first task is **T06**: add yourself to the _Team_ table in `README.md` and submit it by following this guide. It's a practice run of the whole flow.

---

## 1. Pick a task

1. Open the repo's **Issues** tab. Each task from `ROADMAP.md` is an issue, like `T14: BMI Calculator`.
2. Choose one that is **unassigned** and whose **Depends on** tasks are already done.
3. Click **Assignees → assign yourself**, and comment "Taking this, aiming for Sunday."
4. Read the whole issue. If anything is unclear, **ask in the issue before coding**.

Rule: at most **2 tasks in progress** per person.

---

## 2. Update your local `main`

Always start from the latest code. Otherwise you build on an old version and get conflicts later.

```bash
git switch main
git pull
```

---

## 3. Create a branch

Never work directly on `main`. Each task gets its own branch:

```bash
git switch -c <type>/<short-description>
```

| Type        | Use for                                  | Example                 |
| ----------- | ---------------------------------------- | ----------------------- |
| `feat/`     | A new tool or feature                    | `feat/bmi-calculator`   |
| `fix/`      | A bug fix                                | `fix/age-leap-year`     |
| `docs/`     | Documentation only                       | `docs/update-roadmap`   |
| `chore/`    | Setup, config, dependencies              | `chore/add-ci`          |
| `refactor/` | Restructuring without changing behaviour | `refactor/shared-input` |
| `test/`     | Adding or fixing tests only              | `test/json-edge-cases`  |

Use lowercase and hyphens, no spaces.

---

## 4. Write the code

### If the task is a new tool

Follow ARCHITECTURE.md §4 exactly. Copy the Word Counter (`src/tools/word-counter/`) as your starting point:

1. `cp -r src/tools/word-counter src/tools/<your-slug>`
2. **`meta.ts`**: set the name, slug, category, description and keywords.
3. **`logic.ts`**: write pure functions. No React, no `document`, no `window`, no `fetch`.
4. **`logic.test.ts`**: test every exported function, including edge cases.
5. **`Tool.tsx`**: the UI only. Use the shared components (`Button`, `Input`…) and call `logic.ts`.
6. Add one line to `src/registry.ts`.
7. `npm run dev` and try it at http://localhost:4321/tools/your-slug.

**Tip:** write `logic.ts` and its tests **first**, then the UI. Running `npm run test:watch` re-runs the tests every time you save.

### For any task

- Keep the PR **focused on the task**. If you notice an unrelated bug, open a new issue for it instead of fixing it in this PR.
- Don't add a new npm package without mentioning why in the PR description.

---

## 5. Run the checks locally

Before every push:

```bash
npm run format        # auto-fixes formatting
npm run typecheck     # type errors
npm run lint          # likely bugs
npm test              # all tests pass
npm run build         # the site builds
```

All five must pass. CI runs the same checks on GitHub (with `format:check` instead of `format`), and **a PR with a red check cannot be merged**, so it's faster to catch problems here.

---

## 6. Commit

```bash
git add .
git status          # read the list! Only files you meant to change?
git commit -m "feat(bmi): add BMI calculator with metric and imperial units"
```

### Commit message format ([Conventional Commits](https://www.conventionalcommits.org))

```
<type>(<scope>): <what changed, in present tense>
```

- **type**: same list as branch types (`feat`, `fix`, `docs`, `chore`, `refactor`, `test`)
- **scope** (optional): the tool or area, e.g. `bmi`, `layout`, `ci`
- **description**: lowercase, present tense ("add", not "added"), no full stop

✅ `feat(json): show line number of syntax errors`
✅ `fix(age): handle birthdays on 29 February`
❌ `updated stuff` · ❌ `Fixed Bug.` · ❌ `wip`

Several small commits per task are fine. They're combined into one when the PR is merged.

---

## 7. Push and open a Pull Request

```bash
git push -u origin HEAD
gh pr create
```

`HEAD` means "the branch I'm on". `gh pr create` asks for a title and opens an editor for the description, which is pre-filled from the PR template. Alternatively, open the link that `git push` prints and create the PR on the website.

### A good PR has

- **Title**: same format as a commit message, e.g. `feat(bmi): add BMI calculator`
- **`Closes #14`** in the description, so the issue closes automatically when merged
- **What & why**: 2–3 sentences
- **How to test**: steps the reviewer can follow
- **Screenshots** for anything visual (phone + desktop)
- The template's checklist ticked honestly

### Draft PRs

Want early feedback before you're finished? Open it as a draft (`gh pr create --draft`) and say what you want feedback on. Mark it **Ready for review** when done.

### After opening

- Wait for CI. If a check turns ❌ red, click **Details**, read the error, fix it, then commit and push again.
- The **Cloudflare preview URL** appears as a comment. Open it on your phone and check your work there too.

---

## 8. Code review

Every PR needs **one approval from someone other than its author**: Aayan reviews the contributor's PRs, and the contributor reviews Aayan's. Reviewing each other's code is the fastest way to learn the codebase.

### The reviewer's three options

| Decision               | Meaning                           | What the author does            |
| ---------------------- | --------------------------------- | ------------------------------- |
| ✅ **Approve**         | Good to merge                     | Nothing; the reviewer merges    |
| 🔁 **Request changes** | Must fix before merging           | Fix, push, reply to comments    |
| 💬 **Comment**         | Questions or optional suggestions | Answer, and change if you agree |

A PR is **closed without merging** only if the task is cancelled, is duplicated by another PR, or is going in a direction we agree to restart. The reviewer always explains why in a comment, and the issue goes back to unassigned.

### Responding to review comments

1. Make the changes **on the same branch**. Don't open a new PR.
2. `git add . && git commit -m "fix(bmi): address review comments" && git push`
3. The PR updates automatically.
4. Reply to each comment ("Done", or explain why you disagree), then click **Resolve conversation**.
5. Click **Re-request review** (🔄 next to the reviewer's name).

Disagreeing is fine. Explain your reasoning in the thread. If you can't agree, Aayan makes the final call on architecture and scope.

### What reviewers check (in this order)

1. **Correctness:** is `logic.ts` right? Are the tests meaningful and covering edge cases?
2. **Architecture:** does it follow ARCHITECTURE.md (logic/UI split, shared components, no cross-tool imports)?
3. **Behaviour:** try it on the preview URL on a phone and on desktop. Try bad input.
4. **Readability:** clear names, no dead code, no leftover `console.log`.
5. **Scope:** only what the task asked for.

Be kind and specific: _"This returns NaN when height is 0; can we show an error instead?"_ beats _"this is wrong"_.

**Reviews happen within 48 hours** of a PR being opened or re-requested.

---

## 9. Merging

The **reviewer** merges after approving, using **Squash and merge**. All the PR's commits become one clean commit on `main`, titled with the PR title. Then click **Delete branch**.

Merging to `main` deploys to production automatically.

---

## 10. Clean up locally

```bash
git switch main
git pull
git branch -d feat/bmi-calculator
```

Then go back to step 1 for your next task.

---

## Troubleshooting

### "My PR has merge conflicts"

Someone changed the same lines in `main` since you branched. Bring their changes into your branch:

```bash
git switch your-branch
git fetch origin
git merge origin/main
```

Git marks conflicting spots in the files like this:

```
<<<<<<< HEAD
your version
=======
the version from main
>>>>>>> origin/main
```

Edit each file to keep the right code, delete the markers, then:

```bash
git add .
git commit -m "chore: merge main into your-branch"
git push
```

If you're unsure which version to keep, ask in the PR. Don't guess.

### "I committed to `main` by mistake" (not pushed yet)

```bash
git switch -c feat/my-task      # the new branch keeps your commit
git switch main
git reset --hard origin/main    # put local main back to GitHub's version
git switch feat/my-task
```

Pushing to `main` directly is blocked on GitHub anyway, so no harm can reach the shared repo.

### "I started coding but forgot to create a branch"

If you haven't committed yet, just run `git switch -c feat/my-task`. Your uncommitted changes move to the new branch.

### "CI fails but it works on my machine"

Run the exact CI command locally: `npm ci && npm run format:check && npm run typecheck && npm run lint && npm test && npm run build`. `npm ci` installs exactly what's in `package-lock.json`, like CI does.

### "I'm stuck"

Stuck for more than 30–60 minutes? Comment on the issue or PR with what you tried and the exact error. Asking early is expected, not a weakness.

### "I can't finish by Sunday"

Comment on the issue **by Friday**. We'll either move the deadline or split the task.
