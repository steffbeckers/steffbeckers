Create a MiniZinc model to generate a schedule for an interclub snooker league with 6 teams, playing a double round-robin tournament (each team plays every other team twice). Each team has a home venue.

**Data:**

- Number of teams: 6
- Number of rounds: 10 (calculated as N*(N-1) / 2 * 2, where N is teams, after rounding up)
- `venue[team]`: An array indicating the home venue of each team (e.g., `venue[1] = "The Snooker Shack"`, `venue[2] = "Cue Masters"`, etc.). Represent Venues as a number so that the model doesn't need to handle Strings. The output can be mapped to a Venue name later on.
- `availability[venue, round]`: A boolean array indicating whether a venue is available in a given round. `true` means available, `false` means unavailable. (e.g., `availability[1, 3] = false` means Venue 1 is not available in Round 3).

**Variables:**

- `game[round, match]`: A 2D array. Each element `game[r, m]` represents a game in round `r` and match number `m`. It will have a tuple (team1, team2) which specifies which team is home and which is away. team1 must always be lower than team2 to be valid.
- `home[round, match]`: Specifies which team in the match is at home and which is away. Values of this int are either team1 or team2

**Constraints:**

- Each team plays exactly one game in each round.
- Each team plays every other team exactly twice (double round-robin).
- A team cannot play itself.
- In each game represented by `game[r, m]`, one team is playing at their home venue.
- No team should have two consecutive home games or two consecutive away games if possible.
- A game can only be scheduled at a venue if that venue is available in that round (using the `availability` data).

**Objective:**

- Minimize the number of instances where a team has two consecutive home games or two consecutive away games.
- Prioritize venues that have fewer changes from week to week (i.e., try to keep games at the same venue if possible).

**Output:**

- Print the `game` array, showing the schedule round by round. For each game, indicate the venue. Format: "Round r, Match m: Team A vs. Team B at Venue X"
