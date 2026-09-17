# B07/26 — Module 3: Software Engineering with AI
## MVP Development with AI II

**Total duration:** 3 hours (including 2×10 min breaks)  
**Language:** English  
**Format:** Trainer-led live demo — I build, you watch  
**Trainer:** Hans Reinl  
**Date:** Thu, 17 Sep 2026 · 18:00–21:00  
**Presentation (source of truth):** [`index.html`](index.html) (Reveal.js)

**Prep:** No participant coding tonight. Demo runs on the trainer’s machine. Prepared repo already has `openspec init` (Cursor selected). We do not install live.

**Demo runbook:** speaker notes on the live slides. Exact `/opsx-…` prompts, catch/fail, and the two loops (propose → review → apply, twice) live there.

---

### What participants take away

From watching the demo, they should be able to:

- See why **AGENTS.md** (standing instructions) and a short **spec come before** touching the agent (OpenSpec replaces the old ChatGPT user-story prompt)
- Follow the OpenSpec loop live: propose → review → apply → archive
- Watch two Cursor cloud agents start from Linear and push PRs
- Leave with a clear picture of how to try the same loop later — on their own time (optional)

---

### Session description

Live demo of building a complete MVP with the trainer — from idea to a locally running app. Focus: a modern AI-assisted development workflow (spec-driven development with OpenSpec + Cursor).

**In scope:**

- Trainer starts from a prepared product idea (**Startlist** — replace the club’s season Excel with a local app)
- Short intro to the workflow and concepts (spec-driven development / OpenSpec)
- Live demo of a full MVP build with Cursor (main part) — trainer drives
- Effective use of Cursor cloud agents started from Linear (two issues in parallel)
- Best practices for prompting, iteration, and productive collaboration with AI
- Room for questions, discussion, and short pauses during live development

**Out of scope:**

- Deployment
- Tests
- Refactoring
- Participants coding along (watch only; optional practice after the session)

---

### Timeline (180 minutes)

| Block | Content | Time |
|---|---|---|
| Kickoff | Poll · contract · agenda · goals | 0:00–0:12 |
| Initial Instructions | AGENTS.md · why specs · two halves · layout · loop | 0:12–0:35 |
| Product idea | Startlist · two change ids · two loops | 0:35–0:45 |
| **Break** | | **0:45–0:55** |
| Live 1 | Propose → review → apply, twice · shell, then the slice | 0:55–1:45 |
| **Break** | | **1:45–1:55** |
| Live 2 | Linear → Cursor · two PRs | 1:55–2:35 |
| Close | Recap · Q&A · optional next steps | 2:35–3:00 |

---

### Product (demo)

**Working title:** Startlist  
**Change ids:** `add-startlist-shell`, then `add-race-startlist`  
**Source of truth today:** a season Excel (races as rows, riders as columns). Example analog: [`examples/race-planner-season-example.xlsx`](examples/race-planner-season-example.xlsx)

Real file shape (Amateure / Elite-Amateure / Frauen): Rennen, Tag, Datum, Uhrzeit, Meldeschluss, Teilnehmer:innenzahl, Fahrer 1…n. Race and entry URLs in cells. Cancelled races. Stichtage. Amateure + Elite = men; Frauen = women.

**Tonight (local, running):** the loop twice. **Loop 1 — shell** (`add-startlist-shell`): club look on a running empty app. **Loop 2 — the slice** (`add-race-startlist`): race calendar for **Amateure, Elite, and Frauen** (name, day, date, Meldeschluss; import from rad-net.de) → start list for one race → add/remove a rider → SQLite. Hosting: spec only. **Live 2 (Linear):** Startgeld reimbursement (issue A: riders ask, admin overview) + club login (issue B: rider + admin) — own Cursor agent, own PR each. Brief: [`examples/startlist-next.md`](examples/startlist-next.md).

---

### Optional practice (after tonight)

**Not graded. Not required. Nothing to hand in.** Say this once at kickoff so nobody waits for homework.

If someone wants to try later: `openspec init` · one `/opsx-propose` + `/opsx-apply` · local only — or rebuild Startlist from the spec.

---

### Trainer notes — Live 1 (0:55–1:45)

Speaker view: press **S**. Notes are on the live slides. The deck does not carry the demo.

1. **Loop 1 — propose:** in Cursor chat, hyphen not colon:  
   `/opsx-propose add-startlist-shell`  
   Point at [`examples/startlist-shell.md`](examples/startlist-shell.md). Do not run `openspec` in the terminal.
2. **Loop 1 — review:** scope is look + sticky header (nav, account placeholder) + running empty app. If calendars, Startgeld, or real login are in the proposal, `/opsx-update`.
3. **Loop 1 — apply:** `/opsx-apply`. Stop when DSD is on cream, the sticky header is there, and the app runs. No calendar yet. Show the **browser**, not the chat.
4. **Loop 1 — sync:** `/opsx-sync add-startlist-shell`. Still Build. Delta lands in `openspec/specs/`; the change stays open. Show the diff.
5. **Loop 1 — archive:** `/opsx-archive add-startlist-shell`. Closes the change before the next propose.
6. **Loop 2 — propose:** `/opsx-propose add-race-startlist`  
   Point at [`examples/startlist-slice.md`](examples/startlist-slice.md). New change, not another apply on the shell.
7. **Loop 2 — review:** if the proposal invents `interested | registered | DNS`, or “sync live with the Google Sheet” — that is not the Excel. The Excel is a **name in a Fahrer column**, on Amateure / Elite / Frauen tabs.  
   Fix: `/opsx-update`. Auth and Startgeld stay later (Live 2). Hosting stays after tonight.  
   If the agent was clean, still point at Out of scope and say you almost built Startgeld as task 1.
8. **Loop 2 — apply:** `/opsx-apply`. Seed: *Rund um Merken*, 6 riders. Then the quality gate.
9. **Scenario to pass (on the check slide):**  
   Given Amateur calendar includes “Rund um Merken” on 29.03.  
   And the start list has 6 riders  
   When I add “Leo K.”  
   Then she is on the list and the count is 7.
10. **Fail on purpose:** add “Jonas B.” to cancelled *Rund in Rheinbach*. Spec: cancelled races do not accept riders. If it already refuses, fail the count instead (add a rider, `#` stays 6). Paste the UI/error, point at the spec, tight prompt — no new vibe.
11. **Commit + push:** Cursor chat (not `$ git`). Both changes on branch `add-race-startlist` → [dl-mvp-raceplanner](https://github.com/drublic/dl-mvp-raceplanner). You read the diff. Never `main`.
12. **Gate 4 — `@copilot`:** open the PR, comment `@copilot`. Read the review. You still own merge. Do not merge on stage unless the diff is tiny.

### Trainer notes — Live 2 (1:55–2:35)

1. Linear issue A (Startgeld reimbursement) → assign **Cursor**. Immediately issue B (club login) → assign **Cursor**. Let them run. Brief: [`examples/startlist-next.md`](examples/startlist-next.md).
2. Both descriptions: `Follow AGENTS.md` · `Follow openspec/changes/add-race-startlist/` and `Read examples/startlist-next.md`. No hosting.
3. PRs land on [dl-mvp-raceplanner](https://github.com/drublic/dl-mvp-raceplanner). You merge. They don’t.
4. No `/opsx-archive` on stage — Live 2 ships from Linear briefs, not a new OpenSpec change. **Bonus (if time):** after the PR, `/opsx-explore` → `/opsx-propose` (delta = what already shipped) → review → `/opsx-sync` + `/opsx-archive`. Skip apply if the code is already there. Deploy / remote CI / refactor = not tonight.
