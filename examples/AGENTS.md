# Startlist

Local club race planner. Replaces the season Excel.

## How we work

- Always OpenSpec. Every change is a spec in `openspec/`: propose, wait for review, then apply one slice at a time. Code only from a change.
- Change ids tonight: `add-startlist-shell` (look, running empty), then `add-race-startlist` (calendars, lists). Each change: propose, wait for review, then apply.
- Read [`startlist-shell.md`](startlist-shell.md) for the first change, [`startlist-slice.md`](startlist-slice.md) for the second.
- Specs in English.

## Stack

- TypeScript throughout, `strict`. Local web app. Persist with SQLite on disk so a refresh keeps the data.
- A slice is done when lint, typecheck, and tests all pass. Drive them from `package.json` scripts; add those scripts if they are missing.
- Tests cover the spec scenarios you just shipped.

## Product

Three categories: Amateure, Elite-Amateure, Frauen. A race has a name, weekday, date, and Meldeschluss. The start list is the names on that race. Cancelled races stay listed; riders stay as they are.

Look: DSD wordmark, Bricolage headings, Lato body. Colours in [`startlist-shell.md`](startlist-shell.md). First change: that look plus a sticky header (nav, account placeholder) on a running empty app. Then [`startlist-slice.md`](startlist-slice.md).

## Next slices

Read [`startlist-next.md`](startlist-next.md) for Startgeld (every rider can ask; an admin has the overview) and club login (one hardcoded rider plus one hardcoded admin). Same change id.
