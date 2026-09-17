# Startlist — the shell

We run the season in Excel. Who rides which race, by when they have to enter, which races got cancelled. I want a local app that does that job. Call it Startlist.

This change is only the app on screen with the club look. Almost empty under the chrome: a title or short empty state is enough. No calendar yet.

Change id: `add-startlist-shell`. Propose, review, apply. Stop when it runs.

## Chrome (from the first page)

A **sticky header** stays on every page as we add more later. It holds the app shell:

- **Brand** — DSD wordmark
- **General navigation** — primary places in the app (even if most links are stubs for now)
- **Account** — space for who is signed in / account actions (placeholder is fine; real login is later)

Content scrolls under it. Don’t rebuild a new header per page.

## Look

Please use the club stuff, not a made-up brand.

DSD wordmark (`images/dsd-logo.png`). Headings: Bricolage Grotesque. Body: Lato.

- accent `#ff4801`
- ink `#1c1a14`
- links `#2c5e7a`
- cream `#f5f1e8`

## Out of scope

Calendars, start lists, riders, SQLite seed, Startgeld, real login / auth, hosting. Next change: [`startlist-slice.md`](startlist-slice.md).
