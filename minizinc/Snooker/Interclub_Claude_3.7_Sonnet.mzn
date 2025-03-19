% --------------------
% Snooker League Scheduler
% --------------------

include "globals.mzn";

% --------------------
% Parameters
% --------------------

% Time parameters
int: weeks_in_season = 34;  % September to April ~ 34 weeks
int: holiday_break_start = 16;  % Mid-December
int: holiday_break_end = 17;    % Early January
set of int: WEEKS = 1..weeks_in_season;
set of int: DAYS_OF_WEEK = 1..7;  % 1=Monday, ..., 6=Saturday, 7=Sunday

% Clubs
enum CLUBS = {BILJART_LOUNGE, BUCKINGHAM, DE_KREEFT, DE_MAXX, HAPPY_SNOOKER, 
              NRG, RE_SPOT, RILEY_INN, SNOOKER_SPORTS, ZUMA};

% Divisions
enum DIVISIONS = {HONORARY, FIRST, SECOND, THIRD, FOURTH, FIFTH, SATURDAY};

% Teams
int: num_teams;
set of int: TEAMS = 1..num_teams;
array[TEAMS] of CLUBS: team_club;
array[TEAMS] of DIVISIONS: team_division;
array[TEAMS] of int: team_preferred_day;  % 1=Monday, ..., 6=Saturday

% Available club days
array[CLUBS, DAYS_OF_WEEK] of bool: club_available_days = 
  [| true,  true,  true,  false, false, false, false  % BILJART_LOUNGE
   | true,  true,  true,  true,  false, false, false  % BUCKINGHAM
   | true,  true,  true,  true,  false, true,  false  % DE_KREEFT
   | true,  true,  true,  true,  false, false, false  % DE_MAXX
   | true,  true,  true,  true,  false, true,  false  % HAPPY_SNOOKER
   | false, true,  true,  true,  false, true,  false  % NRG
   | true,  true,  true,  true,  false, true,  false  % RE_SPOT
   | true,  true,  true,  true,  false, false, false  % RILEY_INN
   | true,  true,  true,  true,  false, false, false  % SNOOKER_SPORTS
   | true,  true,  true,  true,  false, false, false  % ZUMA
  |];

% Division available days
array[DIVISIONS, DAYS_OF_WEEK] of bool: division_available_days = 
  [| true,  true,  true,  true,  false, false, false  % HONORARY
   | true,  true,  true,  true,  false, false, false  % FIRST
   | true,  true,  true,  true,  false, false, false  % SECOND
   | true,  true,  true,  true,  false, false, false  % THIRD
   | true,  true,  true,  true,  false, false, false  % FOURTH
   | true,  true,  true,  true,  false, false, false  % FIFTH
   | false, false, false, false, false, true,  false  % SATURDAY
  |];

% Club table counts
array[CLUBS] of int: club_tables = 
  [3,  % BILJART_LOUNGE
   6,  % BUCKINGHAM
   6,  % DE_KREEFT
   4,  % DE_MAXX
   5,  % HAPPY_SNOOKER
   2,  % NRG
   6,  % RE_SPOT
   8,  % RILEY_INN
   2,  % SNOOKER_SPORTS
   6]; % ZUMA

% Tables required per match
int: tables_per_match = 2;

% Blackout dates (holidays, events, etc.)
set of int: blackout_weeks = {holiday_break_start, holiday_break_end};

% --------------------
% Variables
% --------------------

% Schedule: when and where each match is played
array[TEAMS, TEAMS] of var opt int: match_week;  % Which week the match is played (0 if no match)
array[TEAMS, TEAMS] of var opt int: match_day;   % Which day of the week (1-7, 0 if no match)

% --------------------
% Constraints
% --------------------

% Each team plays every other team in the same division twice (double round-robin)
constraint forall(t1, t2 in TEAMS where t1 != t2 /\ team_division[t1] == team_division[t2])(
  % First round
  match_week[t1, t2] in WEEKS /\ match_week[t1, t2] < holiday_break_start \/
  % Second round
  match_week[t2, t1] in WEEKS /\ match_week[t2, t1] > holiday_break_end
);

% Teams from different divisions don't play against each other
constraint forall(t1, t2 in TEAMS where team_division[t1] != team_division[t2])(
  match_week[t1, t2] = 0 /\ match_day[t1, t2] = 0
);

% Each team plays maximum 1 match per week
constraint forall(w in WEEKS, t in TEAMS)(
  sum(opp in TEAMS)(if match_week[t, opp] = w then 1 else 0 endif) +
  sum(opp in TEAMS)(if match_week[opp, t] = w then 1 else 0 endif) <= 1
);

% Matches are played at the home team's club on allowed days
constraint forall(t1, t2 in TEAMS where t1 != t2)(
  if match_week[t1, t2] > 0 then
    club_available_days[team_club[t1], match_day[t1, t2]] = true /\
    division_available_days[team_division[t1], match_day[t1, t2]] = true
  else
    match_day[t1, t2] = 0
  endif
);

% No matches on blackout dates
constraint forall(t1, t2 in TEAMS where t1 != t2)(
  not (match_week[t1, t2] in blackout_weeks)
);

% Avoid scheduling multiple matches at the same club on the same day if there are insufficient tables
constraint forall(w in WEEKS, d in DAYS_OF_WEEK, c in CLUBS)(
  sum(t1, t2 in TEAMS where team_club[t1] == c /\ match_week[t1, t2] == w /\ match_day[t1, t2] == d)
  (tables_per_match) <= club_tables[c]
);

% Teams should not play more than 3 consecutive home or away matches
% Create arrays indicating whether a team plays at home or away each week
array[TEAMS, WEEKS] of var 0..1: home_match = 
  array2d(TEAMS, WEEKS, [
    if exists(opp in TEAMS)(match_week[t, opp] = w) then 1 else 0 endif 
    | t in TEAMS, w in WEEKS
  ]);

array[TEAMS, WEEKS] of var 0..1: away_match = 
  array2d(TEAMS, WEEKS, [
    if exists(opp in TEAMS)(match_week[opp, t] = w) then 1 else 0 endif 
    | t in TEAMS, w in WEEKS
  ]);

% Use sliding_sum to ensure no more than 3 consecutive home matches
constraint forall(t in TEAMS)(
  sliding_sum(1, 3, 4, [home_match[t, w] | w in WEEKS])
);

% Use sliding_sum to ensure no more than 3 consecutive away matches
constraint forall(t in TEAMS)(
  sliding_sum(1, 3, 4, [away_match[t, w] | w in WEEKS])
);

% Second round mirrors the first round (same sequence of opponents, home and away swapped)
constraint forall(t1, t2 in TEAMS where t1 != t2 /\ team_division[t1] == team_division[t2])(
  if match_week[t1, t2] > 0 /\ match_week[t1, t2] < holiday_break_start then
    match_week[t2, t1] = match_week[t1, t2] + holiday_break_end - holiday_break_start + 1
  endif
);

% Matches between teams in the same division of the same club should be played in the beginning of each round
constraint forall(t1, t2 in TEAMS where t1 < t2 /\ team_club[t1] == team_club[t2] /\ team_division[t1] == team_division[t2])(
  match_week[t1, t2] <= 4 \/ match_week[t2, t1] <= 4 \/ 
  (match_week[t1, t2] >= holiday_break_end + 1 /\ match_week[t1, t2] <= holiday_break_end + 4) \/ 
  (match_week[t2, t1] >= holiday_break_end + 1 /\ match_week[t2, t1] <= holiday_break_end + 4)
);

% Teams with a preferred match day should play on that day when at home (soft constraint)
var int: preferred_day_violations = sum(t1, t2 in TEAMS where t1 != t2 /\ match_week[t1, t2] > 0)(
  if match_day[t1, t2] != team_preferred_day[t1] then 1 else 0 endif
);

% Balance home & away matches throughout the season
var int: home_away_imbalance = sum(t in TEAMS, w in 1..weeks_in_season div 2)(
  abs(
    sum(opp in TEAMS)(if match_week[t, opp] <= w then 1 else 0 endif) -
    sum(opp in TEAMS)(if match_week[opp, t] <= w then 1 else 0 endif)
  )
);

% --------------------
% Objective
% --------------------

% Minimize a weighted sum of:
% 1. Schedule matches as early as possible
% 2. Minimize preferred day violations
% 3. Balance home & away matches
var int: total_week_sum = sum(t1, t2 in TEAMS where t1 != t2)(
  if match_week[t1, t2] > 0 then match_week[t1, t2] else 0 endif
);

var int: objective = total_week_sum + 5 * preferred_day_violations + 3 * home_away_imbalance;

solve minimize objective;

% --------------------
% Output
% --------------------

output [
  "[\n" ++
  concat(
    [
      "  {\n" ++
      "    \"day\": " ++ show(fix(match_day[t1, t2])) ++ ",\n" ++
      "    \"homeTeam\": \"" ++ show(team_club[t1]) ++ "_" ++ show(t1) ++ "\",\n" ++
      "    \"awayTeam\": \"" ++ show(team_club[t2]) ++ "_" ++ show(t2) ++ "\",\n" ++
      "    \"week\": " ++ show(fix(match_week[t1, t2])) ++ "\n" ++
      "  }" ++ if t1 != num_teams \/ t2 != num_teams then ",\n" else "\n" endif
    | t1, t2 in TEAMS where t1 != t2 /\ fix(match_week[t1, t2]) > 0
    ]
  ) ++
  "]\n"
];

% --------------------
% Data section (would be customized based on actual team data)
% --------------------

% This is a simplified example with fewer teams to make the model solvable quickly
num_teams = 12;

% Team clubs
team_club = [
  BILJART_LOUNGE, BILJART_LOUNGE,  % Teams 1-2
  BUCKINGHAM, BUCKINGHAM,          % Teams 3-4
  DE_KREEFT, DE_KREEFT,            % Teams 5-6
  HAPPY_SNOOKER, HAPPY_SNOOKER,    % Teams 7-8
  NRG, NRG,                        % Teams 9-10
  ZUMA, ZUMA                       % Teams 11-12
];

% Team divisions
team_division = [
  HONORARY, FIRST,     % Teams 1-2
  HONORARY, FIRST,     % Teams 3-4
  HONORARY, FIRST,     % Teams 5-6
  HONORARY, FIRST,     % Teams 7-8
  HONORARY, FIRST,     % Teams 9-10
  HONORARY, FIRST      % Teams 11-12
];

% Team preferred days
team_preferred_day = [
  2, 2,  % Teams 1-2: Tuesday
  2, 3,  % Teams 3-4: Tuesday, Wednesday
  2, 3,  % Teams 5-6: Tuesday, Wednesday
  2, 3,  % Teams 7-8: Tuesday, Wednesday
  2, 3,  % Teams 9-10: Tuesday, Wednesday
  2, 3   % Teams 11-12: Tuesday, Wednesday
];
