# Startlist — slice scenarios (host copy)

Paste into the `add-race-startlist` spec if the agent doesn’t write it. Also on the Live 1 check slide. Brief: [`startlist-slice.md`](startlist-slice.md).

Slice 1 covers **Amateure, Elite, and Frauen** registration. Seed/demo path below is Amateur *Rund um Merken*.

```md
#### Scenario: Add a rider to an existing race
Given the Amateur calendar includes "Rund um Merken" on 29.03.
And the start list has 6 riders
When I add "Leo K." to that race
Then "Leo K." appears on the start list
And the participant count is 7

#### Scenario: Cancelled race rejects adds
Given "Rund in Rheinbach — cancelled" is on the calendar
When I add "Jonas B." to that race
Then the start list does not change
And the app shows that the race is cancelled
```

Fail the cancelled-race scenario on purpose if the second change (the slice) leaves it open. The first change is the shell only.
