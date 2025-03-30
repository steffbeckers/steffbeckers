% Snooker League Scheduling Model

include "globals.mzn";

% ------ Constants and Parameters ------

% Time parameters
int: weeks_per_season = 34;            % September to April (excluding holiday break)
int: holiday_break_start = 16;         % Week before Christmas break
int: holiday_break_end = 18;           % Week after New Year
set of int: WEEKS = 1..weeks_per_season;
set of int: FIRST_HALF = 1..holiday_break_start;
set of int: SECOND_HALF = (holiday_break_end+1)..weeks_per_season;
enum DAYS = {Mon, Tue, Wed, Thu, Sat}; % Days of the week

% Clubs
enum CLUBS = {
  BiljartLounge, Buckingham, DeKreeft, DeMaxx, 
  HappySnooker, NRG, ReSpot, RileyInn, SnookerSports, Zuma
};

% Divisions
enum DIVISIONS = {Honorary, First, Second, Third, Fourth, Fifth, Saturday};

% ---- Club-specific data ----
array[CLUBS, DAYS] of bool: club_available_days;
constraint club_available_days[BiljartLounge, Mon] = true;
constraint club_available_days[BiljartLounge, Tue] = true;
constraint club_available_days[BiljartLounge, Wed] = true;
constraint club_available_days[BiljartLounge, Thu] = false;
constraint club_available_days[BiljartLounge, Sat] = false;
% Add similar constraints for all other clubs

array[CLUBS] of int: club_table_count = [
  3,  % BiljartLounge
  6,  % Buckingham
  6,  % DeKreeft
  4,  % DeMaxx
  5,  % HappySnooker
  2,  % NRG
  6,  % ReSpot
  8,  % RileyInn
  2,  % SnookerSports
  6   % Zuma
];

% ---- Division-specific data ----
array[DIVISIONS, DAYS] of bool: division_allowed_days;
% Honorary division available days
constraint division_allowed_days[Honorary, Mon] = true;
constraint division_allowed_days[Honorary, Tue] = true;
constraint division_allowed_days[Honorary, Wed] = true;
constraint division_allowed_days[Honorary, Thu] = true;
constraint division_allowed_days[Honorary, Sat] = false;
% Add similar constraints for all other divisions

% ------ Teams ------
int: num_teams;                           % Total number of teams
set of int: TEAMS = 1..num_teams;
array[TEAMS] of CLUBS: team_club;         % Club that each team belongs to
array[TEAMS] of DIVISIONS: team_division; % Division of each team
array[TEAMS] of DAYS: team_preferred_day; % Preferred match day

% Derived sets for teams in each division
array[DIVISIONS] of set of TEAMS: teams_by_division = 
  [{ t | t in TEAMS where team_division[t] == d } | d in DIVISIONS];

% Derived sets for teams in each club
array[CLUBS] of set of TEAMS: teams_by_club = 
  [{ t | t in TEAMS where team_club[t] == c } | c in CLUBS];

% ------ Matches ------
% Pre-computed match pairs for each division
array[int] of int: home_teams;
array[int] of int: away_teams;
array[int] of DIVISIONS: match_divisions;

int: num_matches = length(home_teams);
set of int: MATCHES = 1..num_matches;

% ------ Decision Variables ------
array[MATCHES] of var WEEKS: match_week;
array[MATCHES] of var DAYS: match_day;
array[MATCHES] of var bool: is_first_half; % True if the match is in the first half

% ------ Constraints ------

% 1. First/second half scheduling
constraint forall(m in MATCHES)(
  is_first_half[m] <-> match_week[m] in FIRST_HALF
);

% Ensure proper double round-robin structure
constraint forall(m in MATCHES)(
  if is_first_half[m] then
    match_week[m] in FIRST_HALF
  else
    match_week[m] in SECOND_HALF
  endif
);

% 2. No matches during holiday break
constraint forall(m in MATCHES)(
  match_week[m] != holiday_break_start + 1 /\
  match_week[m] != holiday_break_start + 2
);

% 3. Each team plays at most one match per week
constraint forall(t in TEAMS, w in WEEKS)(
  sum([if (home_teams[m] == t \/ away_teams[m] == t) /\ match_week[m] == w then 1 else 0 endif | m in MATCHES]) <= 1
);

% 4. Match days must be allowed for both the home club and the division
constraint forall(m in MATCHES)(
  club_available_days[team_club[home_teams[m]], match_day[m]] /\
  division_allowed_days[match_divisions[m], match_day[m]]
);

% 5. Table availability at clubs
constraint forall(c in CLUBS, d in DAYS, w in WEEKS)(
  sum([if team_club[home_teams[m]] == c /\ match_day[m] == d /\ match_week[m] == w then 2 else 0 endif | m in MATCHES]) <= club_table_count[c]
);

% 6. No more than 3 consecutive home or away matches
% This is a complex constraint that might need a different approach
% For now, we'll approximate it with a simpler constraint
constraint forall(t in TEAMS, w in 1..weeks_per_season-3)(
  sum([if home_teams[m] == t /\ match_week[m] >= w /\ match_week[m] < w+4 then 1 else 0 endif | m in MATCHES]) <= 3 /\
  sum([if away_teams[m] == t /\ match_week[m] >= w /\ match_week[m] < w+4 then 1 else 0 endif | m in MATCHES]) <= 3
);

% 7. Schedule intra-club matches (same division) early in each half
constraint forall(d in DIVISIONS, c in CLUBS)(
  let {
    set of TEAMS: club_div_teams = teams_by_division[d] intersect teams_by_club[c]
  } in (
    % If there are at least 2 teams from the same club in this division
    if card(club_div_teams) >= 2 then
      % For each match between teams of the same club/division
      forall(m1 in MATCHES where 
        home_teams[m1] in club_div_teams /\
        away_teams[m1] in club_div_teams /\
        match_divisions[m1] == d
      )(
        % Find the earliest week for matches of this team with other clubs
        forall(m2 in MATCHES where 
          (home_teams[m2] in club_div_teams /\ not (away_teams[m2] in club_div_teams)) /\ 
          match_divisions[m2] == d /\
          is_first_half[m1] == is_first_half[m2]
        )(
          match_week[m1] <= match_week[m2]
        )
      )
    else
      true
    endif
  )
);

% 8. Soft constraint: Prefer match days
var int: preferred_day_violations = sum(m in MATCHES)(
  bool2int(match_day[m] != team_preferred_day[home_teams[m]])
);

% 9. Balance home and away matches (soft constraint)
array[TEAMS, WEEKS] of var 0..1: home_in_week;
array[TEAMS, WEEKS] of var 0..1: away_in_week;

constraint forall(t in TEAMS, w in WEEKS)(
  home_in_week[t, w] = sum([if home_teams[m] == t /\ match_week[m] == w then 1 else 0 endif | m in MATCHES])
);

constraint forall(t in TEAMS, w in WEEKS)(
  away_in_week[t, w] = sum([if away_teams[m] == t /\ match_week[m] == w then 1 else 0 endif | m in MATCHES])
);

% Calculate running balance for each team through the season
array[TEAMS, WEEKS] of var -weeks_per_season..weeks_per_season: running_balance;
constraint forall(t in TEAMS)(
  running_balance[t, 1] = home_in_week[t, 1] - away_in_week[t, 1]
);
constraint forall(t in TEAMS, w in 2..weeks_per_season)(
  running_balance[t, w] = running_balance[t, w-1] + home_in_week[t, w] - away_in_week[t, w]
);

% Calculate imbalance penalty as sum of absolute running balances
var int: home_away_imbalance = sum(t in TEAMS, w in WEEKS)(
  abs(running_balance[t, w])
);

% ------ Objective Function ------
var int: total_week_count = sum(m in MATCHES)(match_week[m]);
var int: objective = total_week_count + preferred_day_violations + home_away_imbalance;

solve :: int_search(match_week, first_fail, indomain_min) minimize objective;

% ------ Output ------
output ["[\n"] ++
       [concat(["  {\n",
                "    \"day\": ", show(day_number(match_day[m])), ",\n",
                "    \"dayOfWeek\": \"", show(match_day[m]), "\",\n",
                "    \"homeTeam\": \"", show(team_club[home_teams[m]]), "_", show_teamletter(home_teams[m]), "\",\n",
                "    \"awayTeam\": \"", show(team_club[away_teams[m]]), "_", show_teamletter(away_teams[m]), "\",\n",
                "    \"week\": ", show(match_week[m]), "\n",
                "  }", if m < num_matches then ",\n" else "\n" endif]) | m in MATCHES] ++
       ["]"];

% Helper functions
function int: day_number(DAYS: d) = 
  if d == Mon then 1
  elseif d == Tue then 2
  elseif d == Wed then 3
  elseif d == Thu then 4
  else 6 endif;

function string: show_teamletter(int: t) = 
  let {
    array[1..26] of string: letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  } in (
    letters[((t-1) mod 26) + 1]
  );
