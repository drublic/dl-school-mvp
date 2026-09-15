# Startlist — after Live 1

Live 1 is two briefs: [`startlist-shell.md`](startlist-shell.md) (`add-startlist-shell`), then [`startlist-slice.md`](startlist-slice.md) (`add-race-startlist`). The sheet is still [`race-planner-season-example.xlsx`](race-planner-season-example.xlsx). Live 2 hangs off `add-race-startlist`.

Names are on the races. Next I want Startgeld back, and a club login so riders and an admin are not the same person.

## Live 2

**Startgeld.** Every rider should be able to ask for reimbursement — the race entry fee for a race they were on.

I request it. I see my own requests. An admin sees everyone’s: who asked, for which race, how much, what’s still open. Save it on the machine (SQLite is fine). Refresh and it’s still there.

Cancelled races stay on the list. You can’t ask for Startgeld on a race that did not run.

If Leo K. is on *Rund um Merken*, he can ask for that entry fee. Pick a real-looking number from the sheet if you need one. The admin should see Leo K.’s request in the overview.

**Club login.** Club members only. A stub or one hardcoded rider plus one hardcoded admin is enough. No OAuth, no magic links, no member directory.

After login a rider sees the start lists and can ask for Startgeld. The admin gets the overview. Before login, this is not a public internet app.
