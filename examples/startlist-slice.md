# Startlist — the slice

Startlist is already running with the club look ([`startlist-shell.md`](startlist-shell.md)). Now I want it to do the Excel job.

The sheet is [`race-planner-season-example.xlsx`](race-planner-season-example.xlsx).

## How it works today (and should keep working)

- **Amateure** (men), **Elite-Amateure** (men), **Frauen** (women). All three, not just one.
- A race has a name, weekday, date, and **Meldeschluss**. Meldeschluss is the deadline. Not a link to the entry form.
- The start list is the names on that race in that category. The number of participants is just how many names there are.
- A rider is a name in a column. That’s enough. No interested / registered / DNS.
- Cancelled races stay on the list but you can’t add or take anyone off.
- Official race list is rad-net.de — pull from there.
- Save it on the machine (SQLite is fine). Refresh and the list is still there. No Google Sheets sync.

## This change

Calendar for all three categories. Open a race, see who’s on it. Add or remove a rider, the count updates. Persist it.

Change id: `add-race-startlist`. Propose, review, apply.

Seed from the sheet: Amateur *Rund um Merken* on 29.03., already 6 riders. Also *Rund in Rheinbach*, cancelled.

If I add Leo K. to Rund um Merken he should show up and the count should go 6 → 7.

If I try to put Jonas B. on Rund in Rheinbach, nothing changes and it has to be obvious the race is cancelled.

## Later, not this change

**Live 2 (Linear → Cursor):** see [`startlist-next.md`](startlist-next.md) — **Startgeld reimbursement** (every rider can ask; an admin has the overview) and **club login** (hardcoded rider + admin is enough). Own issue, own agent, own PR each.

Still later: hosting, entry-form URLs (Meldeschluss stays a deadline), Stichtage, rad-net polish, a proper test suite in CI.

Keep the look from the shell. Do not invent a new brand.
