include "globals.mzn";

% --- Enums ---
enum DayOfWeek = { Mon, Tue, Wed, Thu, Fri, Sat, Sun }; % Include Fri/Sun for completeness, even if unused

% --- Parameters (Data Input) ---

% Season Info
int: num_weeks_total; % Total number of weeks available for scheduling (calculated from start/end dates)
int: holiday_break_start_week; % First week of the holiday break
int: holiday_break_end_week; % Last week of the holiday break (matches resume week after this)
set of int: blackout_weeks; % Set of weeks where no matches can be scheduled

% Clubs
enum ClubName;
array[ClubName] of set of DayOfWeek: club_available_days;
array[ClubName] of int: club_tables;

% Divisions
enum DivisionName;
array[DivisionName] of set of DayOfWeek: division_available_days;

% Teams
enum TeamName; % Unique identifier for each team (e.g., BiljartLounge_A)
array[TeamName] of ClubName: team_club;
array[TeamName] of DivisionName: team_division;

% Team Preferences (Optional)
array[TeamName] of bool: team_has_preference;
array[TeamName] of DayOfWeek: team_preferred_day; % Only relevant if team_has_preference is true

% Matches (Pre-calculated Double Round-Robin)
% Each match is represented as a tuple (home_team, away_team)
set of TeamName: Teams = index_set(team_club);
set of ClubName: Clubs = index_set(club_tables);
set of DivisionName: Divisions = index_set(division_available_days);

% Define the set of all matches to be scheduled
% This needs to be generated externally based on divisions (double round-robin)
% Example: Matches = {(T1, T2), (T2, T1), (T1, T3), (T3, T1), ...};
set of int: MatchIds; % Use integers to index matches
array[MatchIds] of TeamName: match_home_team;
array[MatchIds] of TeamName: match_away_team;

% Identify matches belonging to round 1 and round 2
% Assume matches are ordered such that round 1 comes first, then round 2
int: num_matches_round1; % Number of matches in the first round
set of int: MatchesRound1 = 1..num_matches_round1;
set of int: MatchesRound2 = num_matches_round1+1..card(MatchIds);

% --- Constants ---
int: TABLES_PER_MATCH = 2;
int: MAX_CONSECUTIVE = 3; % Max consecutive home or away matches

% --- Derived Parameters ---
set of int: Weeks = 1..num_weeks_total;
set of int: SchedulableWeeks = Weeks diff blackout_weeks;
set of int: WeeksRound1 = {w | w in SchedulableWeeks where w < holiday_break_start_week};
set of int: WeeksRound2 = {w | w in SchedulableWeeks where w > holiday_break_end_week};

% --- Decision Variables ---

% The week each match is played
array[MatchIds] of var SchedulableWeeks: match_week;
% The day of the week each match is played
array[MatchIds] of var DayOfWeek: match_day_of_week;

% --- Helper Variables (for constraints/optimization) ---

% is_home[t, w] = 1 if team t plays home in week w, -1 if away, 0 if bye/not playing
array[Teams, Weeks] of var -1..1: is_home;

% --- Constraints ---

% 1. Link is_home helper variable to decisions
constraint forall(t in Teams, w in Weeks) (
  if w in SchedulableWeeks then
    let {
      % Count home matches for team t in week w
      var int: home_match_count = sum(m in MatchIds where match_home_team[m] == t) (
                                    bool2int(match_week[m] == w)
                                  );
      % Count away matches for team t in week w
      var int: away_match_count = sum(m in MatchIds where match_away_team[m] == t) (
                                    bool2int(match_week[m] == w)
                                  );
    } in
    (home_match_count == 1 /\ away_match_count == 0 -> is_home[t, w] = 1) /\
    (home_match_count == 0 /\ away_match_count == 1 -> is_home[t, w] = -1) /\
    (home_match_count == 0 /\ away_match_count == 0 -> is_home[t, w] = 0) % Bye or unscheduled week
    % Add a check for invalid states (shouldn't happen if constraint 2 holds, but good practice)
    /\ home_match_count + away_match_count <= 1
  else
    % Not a schedulable week (blackout)
    is_home[t, w] = 0
  endif
);

% 2. Each team plays at most once per week
constraint forall(t in Teams, w in Weeks) (
   sum(m in MatchIds where match_home_team[m] == t \/ match_away_team[m] == t) (
      bool2int(match_week[m] == w)
   ) <= 1
);

% 3. Schedule Round 1 before break, Round 2 after break
constraint forall(m in MatchesRound1) (
  match_week[m] in WeeksRound1
);
constraint forall(m in MatchesRound2) (
  match_week[m] in WeeksRound2
);

% 4. Match day constraints:
constraint forall(m in MatchIds) (
  let { TeamName: home_team = match_home_team[m];
        ClubName: home_club = team_club[home_team];
        DivisionName: d = team_division[home_team]; } in
  % Day must be allowed by home club
  match_day_of_week[m] in club_available_days[home_club]
  /\
  % Day must be allowed by division
  match_day_of_week[m] in division_available_days[d]
);

% 5. Table Capacity Constraint:
constraint forall(c in Clubs, w in Weeks, d in DayOfWeek) (
  sum(m in MatchIds where team_club[match_home_team[m]] == c) (
     bool2int(match_week[m] == w /\ match_day_of_week[m] == d)
  ) * TABLES_PER_MATCH <= club_tables[c]
);

% 6. No more than MAX_CONSECUTIVE home or away matches
% Use sliding sum approach
constraint forall(t in Teams, w in 1..(num_weeks_total - MAX_CONSECUTIVE)) (
  sum(i in 0..MAX_CONSECUTIVE) (is_home[t, w + i]) <= MAX_CONSECUTIVE - 1 % Cannot sum to MAX_CONSECUTIVE + 1 (e.g., 4 for MAX=3)
);
constraint forall(t in Teams, w in 1..(num_weeks_total - MAX_CONSECUTIVE)) (
  sum(i in 0..MAX_CONSECUTIVE) (is_home[t, w + i]) >= -(MAX_CONSECUTIVE - 1) % Cannot sum to -(MAX_CONSECUTIVE + 1)
);
% Alternative using regular constraint (more robust but complex to define automaton)
% include "regular.mzn";
% constraint forall (t in Teams) (
%    regular([is_home[t,w] | w in Weeks], dfa_no_consecutive)
% ); % Requires defining the dfa_no_consecutive automaton

% --- Optimization ---

% Define penalties/costs
int: intra_club_penalty_weight = 10; % Higher weight means stronger push to schedule early
int: preferred_day_penalty_weight = 1; % Lower weight, softer constraint

% Objective:
% 1. Schedule matches as early as possible (minimize sum of weeks)
var int: objective_earliness = sum(m in MatchIds)(match_week[m]);

% 2. Penalize intra-club matches scheduled later
var int: objective_intra_club = sum(m in MatchIds where team_club[match_home_team[m]] == team_club[match_away_team[m]]) (
   match_week[m] * intra_club_penalty_weight
);

% 3. Penalize matches not on preferred home day
var int: objective_preferred_day = sum(m in MatchIds where team_has_preference[match_home_team[m]]) (
   bool2int(match_day_of_week[m] != team_preferred_day[match_home_team[m]]) * preferred_day_penalty_weight
);

% Combine objectives
solve minimize objective_earliness + objective_intra_club + objective_preferred_day;

% --- Output ---
% Outputting JSON requires specific formatting. MiniZinc's default output isn't JSON.
% You would typically run the solver, get the solution, and format it externally.
% However, we can create a structured output resembling the JSON structure.

output ["[\n"];
output [
  if m == min(MatchIds) then "" else ",\n" endif ++
  "  {\n" ++
  "    \"matchId\": \(m),\n" ++ % Added for reference
  "    \"week\": \(match_week[m]),\n" ++
  "    \"dayOfWeek\": \"\(match_day_of_week[m])\",\n" ++
  % Calculate absolute day number here if start date is known (requires external logic or more complex date handling in MiniZinc)
  % "    \"day\": \( ... calculation ... ),\n" ++
  "    \"homeTeam\": \"\(match_home_team[m])\",\n" ++
  "    \"awayTeam\": \"\(match_away_team[m])\",\n" ++
  "    \"division\": \"\(team_division[match_home_team[m]])\",\n" ++
  "    \"club\": \"\(team_club[match_home_team[m]])\"\n" ++
  "  }"
  | m in MatchIds
];
output ["\n]\n"];

% ==============================================================================
% Example Data Section (Replace with your full data)
% ==============================================================================

% --- Parameters (Data Input) ---
num_weeks_total = 35; % Example: Sept to April ~ 34-35 weeks
holiday_break_start_week = 16; % Example: Mid-December
holiday_break_end_week = 17; % Example: End of Dec/Start of Jan
blackout_weeks = {1, 16, 17, 35}; % Example: Week 1 (setup), break, last week

% Clubs
ClubName = { BL, BUCK, KREEFT, MAXX, HAPPY, NRG, RESPOT, RILEY, SPORTS, ZUMA };
club_available_days = [
  {Mon, Tue, Wed},    % BL
  {Mon, Tue, Wed, Thu}, % BUCK
  {Mon, Tue, Wed, Thu, Sat}, % KREEFT
  {Mon, Tue, Wed, Thu}, % MAXX
  {Mon, Tue, Wed, Thu, Sat}, % HAPPY
  {Tue, Wed, Thu, Sat}, % NRG
  {Mon, Tue, Wed, Thu, Sat}, % RESPOT
  {Mon, Tue, Wed, Thu}, % RILEY
  {Mon, Tue, Wed, Thu}, % SPORTS
  {Mon, Tue, Wed, Thu}  % ZUMA
];
club_tables = [3, 6, 6, 4, 5, 2, 6, 8, 2, 6];

% Divisions
DivisionName = { HON, D1, D2, D3, D4, D5, SAT };
division_available_days = [
  {Mon, Tue, Wed, Thu}, % HON
  {Mon, Tue, Wed, Thu}, % D1
  {Mon, Tue, Wed, Thu}, % D2
  {Mon, Tue, Wed, Thu}, % D3
  {Mon, Tue, Wed, Thu}, % D4
  {Mon, Tue, Wed, Thu}, % D5
  {Sat}                 % SAT
];

% Teams (Partial Example - Needs full list and unique names)
TeamName = { BL_A, BL_B, BL_C, BL_D, BUCK_A, BUCK_B, BUCK_C, NRG_A, NRG_B, NRG_C, NRG_D }; % Add ALL teams
team_club = [
  BL, BL, BL, BL, % BL teams
  BUCK, BUCK, BUCK, % BUCK teams
  NRG, NRG, NRG, NRG % NRG teams
];
team_division = [
  HON, D1, D1, D4, % BL teams
  HON, HON, D1, % BUCK teams
  D2, D2, D3, D3 % NRG teams (Example divisions)
];

% Team Preferences (Example)
team_has_preference = [
  true, true, true, true, % BL teams
  false, false, false,    % BUCK teams
  false, false, false, false % NRG teams
];
team_preferred_day = [
  Tue, Tue, Wed, Thu, % BL teams
  Mon, Mon, Mon,      % BUCK teams (dummy if has_preference=false)
  Tue, Tue, Tue, Tue  % NRG teams (dummy if has_preference=false)
];

% Matches (Crucial - Needs external generation)
% Example for a tiny 4-team division (NRG teams in D2/D3)
% Assume NRG_A, NRG_B in D2; NRG_C, NRG_D in D3
% Round 1 D2: (NRG_A, NRG_B)
% Round 2 D2: (NRG_B, NRG_A)
% Round 1 D3: (NRG_C, NRG_D)
% Round 2 D3: (NRG_D, NRG_C)
% ... plus all other divisions ...
MatchIds = 1..4; % Example: Just these 4 matches
match_home_team = [NRG_A, NRG_C, NRG_B, NRG_D];
match_away_team = [NRG_B, NRG_D, NRG_A, NRG_C];
num_matches_round1 = 2; % First two matches are round 1
