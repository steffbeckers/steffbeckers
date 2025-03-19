# Prompt engineering

Help me create a great prompt related to creating a MiniZinc model to generate a schedule for an interclub snooker league. Ask me questions about things which might need to be taken into account and create a new prompt for actually creating the model.

What do you think of the following prompt so far:

{ prompt }

# Prompt

Create a MiniZinc model to generate a balanced schedule for an interclub snooker league with the following info:

Data:

- Season
  - Starts in the beginning of September and ends around the end of April.
  - Break of 2 weeks around holidays (Christmas/New Year)
- Clubs
  - Biljart Lounge
    - Specific days: Monday, Tuesday, Wednesday
    - Table count: 3
  - Buckingham
    - Specific days: Monday, Tuesday, Wednesday, Thursday
    - Table count: 6
  - De Kreeft
    - Specific days: Monday, Tuesday, Wednesday, Thursday, Saturday
    - Table count: 6
  - De Maxx
    - Specific days: Monday, Tuesday, Wednesday, Thursday
    - Table count: 4
  - Happy Snooker
    - Specific days: Monday, Tuesday, Wednesday, Thursday, Saturday
    - Table count: 5
  - NRG
    - Specific days: Tuesday, Wednesday, Thursday, Saturday
    - Table count: 2
  - Re-Spot
    - Specific days: Monday, Tuesday, Wednesday, Thursday, Saturday
    - Table count: 6
  - Riley Inn
    - Specific days: Monday, Tuesday, Wednesday, Thursday
    - Table count: 8
  - Snooker Sports
    - Specific days: Monday, Tuesday, Wednesday, Thursday
    - Table count: 2
  - Zuma
    - Specific days: Monday, Tuesday, Wednesday, Thursday
    - Table count: 6
- Divisions
  - Honorary
    - Specific days: Monday, Tuesday, Wednesday, Thursday
  - 1st
    - Specific days: Monday, Tuesday, Wednesday, Thursday
  - 2nd
    - Specific days: Monday, Tuesday, Wednesday, Thursday
  - 3rd
    - Specific days: Monday, Tuesday, Wednesday, Thursday
  - 4th
    - Specific days: Monday, Tuesday, Wednesday, Thursday
  - 5th
    - Specific days: Monday, Tuesday, Wednesday, Thursday
  - Saturday
    - Specific days: Saturday
- Extra division info
  - In case a division has an odd number of teams, a bye week for one team per round should be introduced
- Teams per club
  - Biljart Lounge
    - A (Honorary)
      - Preferred match day: Tuesday
    - B (1st)
      - Preferred match day: Tuesday
    - C (1st)
      - Preferred match day: Wednesday
    - D (4th)
      - Preferred match day: Thursday
    - ... 7 more ...
  - Buckingham
    - A (Honorary)
    - B (Honorary)
    - C (1st)
    - D (1st)
    - E (1st)
    - F (2th)
    - ... 10 more ...
  - De Kreeft
    - A..G
  - ...
- Matches
  - A single match between 2 teams is played in 1 evening.
  - A match is played on at least 2 tables, these tables should be reserved for the entire match duration.
- Around 16 teams in each division.

Constraints:

- Each team plays every other team of the same division twice (double round-robin).
  - 2nd round starts after holiday break, same sequence of opponents (home and away team change).
- Each team plays maximum 1 match per week.
- Matches are played at the home team's club.
- Matches are scheduled on specific days based on the home team's club and division.
- Avoid scheduling multiple matches at the same club on the same match day if the number of tables is insufficient.
- Teams should not play more than 3 consecutive home or away matches.
- No matches on blackout dates (holidays, events, etc.).

Optimizations:

- Each match should be scheduled as early as possible.
- Matches between teams in the same division of the same club should be played in the beginning of each round.
- Teams have a preferred match day when they play at their own club. (soft constraint)
- Balance home & away matches throughout the season.

Example output format:

```json
[
  ...
  {
    "day": 2,
    "dayOfWeek": "Tue",
    "homeTeam": "NRG_A",
    "awayTeam": "NRG_C",
    "week": 1
  },
  {
    "day": 2,
    "dayOfWeek": "Tue",
    "homeTeam": "ZUMA_B",
    "awayTeam": "HAPPY_SNOOKER_B",
    "week": 1
  },
  {
    "day": 3,
    "dayOfWeek": "Wed",
    "homeTeam": "HAPPY_SNOOKER_C",
    "awayTeam": "NRG_B",
    "week": 1
  },
  {
    "day": 3,
    "dayOfWeek": "Wed",
    "homeTeam": "ZUMA_C",
    "awayTeam": "NRG_D",
    "week": 1
  },
  {
    "day": 9,
    "dayOfWeek": "Tue",
    "homeTeam": "ZUMA_B",
    "awayTeam": "NRG_A",
    "week": 2
  },
  {
    "day": 10,
    "dayOfWeek": "Wed",
    "homeTeam": "HAPPY_SNOOKER_C",
    "awayTeam": "HAPPY_SNOOKER_B",
    "week": 2
  }
  ...
]
```
