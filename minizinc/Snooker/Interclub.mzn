% This MiniZinc model schedules an interclub snooker league season

% The maximum date a match can be scheduled on
int: maxMatchDate = 245; % 35 weeks
% Number of days in a week
int: daysInWeek = 7;
% The minimal amount of snooker tables which are required for a match to be played between 2 teams
int: minMatchTableCount = 2;
% The maximum consecutive home and away matches for each team
int: maxConsecutiveHomeAwayMatches = 3;
% Amount of divisions
int: divisionCount = 7; % HON, 1ST, 2ND, 3RD, 4TH, 5TH, SAT

% All clubs which have teams
enum CLUBS = {
  NRG,
  HAPPY_SNOOKER,
  ZUMA,
  BYE,
};

% Amount of tables a club has available on each match day
array[CLUBS] of int: clubTableCount = [
  2, % NRG
  5, % HAPPY_SNOOKER
  6, % ZUMA
  1000, % BYE
];

% Available days of the week for each club
array[CLUBS] of set of 1..daysInWeek: clubAvailableDays = [
  { 2, 3, 4, 5, 6, 7 },    % NRG
  { 1, 2, 3, 4, 5, 6, 7 }, % HAPPY_SNOOKER
  { 1, 2, 3, 4, 5, 6, 7 }, % ZUMA
  { 1, 2, 3, 4, 5, 6, 7 }  % BYE
];

% All teams, which play snooker
enum TEAMS = {
  NRG_A,
  NRG_B,
  NRG_C,
  NRG_D,
  HAPPY_SNOOKER_A,
  HAPPY_SNOOKER_B,
  HAPPY_SNOOKER_C,
  ZUMA_A,
  ZUMA_B,
  ZUMA_C,
  BYE_1,
  BYE_2,
};

% Days of the week a match may be scheduled on for a division
array[1..divisionCount] of set of 1..daysInWeek: divisionDaysOfWeek = array1d(1..divisionCount, [
  { 1, 2, 3, 4 }, % HON
  { 1, 2, 3, 4 }, % 1ST
  { 1, 2, 3, 4 }, % 2ND
  { 1, 2, 3, 4 }, % 3RD
  { 1, 2, 3, 4 }, % 4TH
  { 1, 2, 3, 4 }, % 5TH
  { 6 }           % SAT
]);

% Amount of rounds there are played within a division
array[int] of int: divisionRounds = array1d(1..divisionCount, [
  2, % HON
  2, % 1ST
  2, % 2ND
  2, % 3RD
  2, % 4TH
  2, % 5TH
  6  % SAT
]);

% Define the number of weeks in each round for each division
array[1..divisionCount] of int: divisionWeeksPerRound = array1d(1..divisionCount, [
  max(card(divisionTeams[1]) - 1, 0), % HON
  max(card(divisionTeams[2]) - 1, 0), % 1ST
  max(card(divisionTeams[3]) - 1, 0), % 2ND
  max(card(divisionTeams[4]) - 1, 0), % 3RD
  max(card(divisionTeams[5]) - 1, 0), % 4TH
  max(card(divisionTeams[6]) - 1, 0), % 5TH
  max(card(divisionTeams[7]) - 1, 0)  % SAT
]);

% Teams filtered by division
array[1..divisionCount] of set of TEAMS: divisionTeams = [
  {t | t in TEAMS where teamDivision[t] == d} | d in 1..divisionCount
];

% Link between team and club
array[TEAMS] of CLUBS: teamClub = [
  NRG, % NRG_A
  NRG, % NRG_B
  NRG, % NRG_C
  NRG, % NRG_D
  HAPPY_SNOOKER, % HAPPY_SNOOKER_A
  HAPPY_SNOOKER, % HAPPY_SNOOKER_B
  HAPPY_SNOOKER, % HAPPY_SNOOKER_C
  ZUMA, % ZUMA_A
  ZUMA, % ZUMA_B
  ZUMA, % ZUMA_C
  BYE, % BYE_1
  BYE, % BYE_2
];

% Link between team and division
% Teams of the same division compete against each other
array[TEAMS] of 1..divisionCount: teamDivision = [
  2, % NRG_A
  2, % NRG_B
  2, % NRG_C
  3, % NRG_D
  2, % HAPPY_SNOOKER_A
  2, % HAPPY_SNOOKER_B
  2, % HAPPY_SNOOKER_C
  1, % ZUMA_A
  2, % ZUMA_B
  3, % ZUMA_C
  1, % BYE_1
  2, % BYE_2
];

% The favorite day of the week a team would like to play their home matches
array[TEAMS] of 1..daysInWeek: teamFavoriteDayOfWeek = [
  2, % NRG_A
  3, % NRG_B
  4, % NRG_C
  2, % NRG_D
  1, % HAPPY_SNOOKER_A
  2, % HAPPY_SNOOKER_B
  3, % HAPPY_SNOOKER_C
  1, % ZUMA_A
  2, % ZUMA_B
  3, % ZUMA_C
  1, % BYE_1
  1, % BYE_2
];

% The match schedule which will be calculated. [Home team, Away team, Date]
array[TEAMS, TEAMS, 1..maxMatchDate] of var bool: matchSchedule;
array[1..divisionCount] of var 1..maxMatchDate: latestMatchDatePerDivision;
array[1..divisionCount] of var 1..maxMatchDate: latestIntraClubMatchDatePerDivision;

constraint forall(di in 1..divisionCount)(
  forall(t1, t2 in divisionTeams[di] where t1 != t2)(
    forall(d in 1..maxMatchDate)(
      matchSchedule[t1, t2, d] ->
        % Ensure matches are scheduled only on permissible days for each division
        dayOfWeekIndex(d) in divisionDaysOfWeek[teamDivision[t1]] /\
        % Ensure matches are scheduled only on available days for the home club
        dayOfWeekIndex(d) in clubAvailableDays[teamClub[t1]] /\
        % Ensure the match is scheduled on the team's favorite day of the week
        dayOfWeekIndex(d) = teamFavoriteDayOfWeek[t1] /\
        % Matches should be scheduled as early as possible in the season for each division
        d <= latestMatchDatePerDivision[di] /\
        % Intra-club matches should be scheduled as early as possible in the season, to prevent match fixing
        (teamClub[t1] = teamClub[t2] -> d <= latestIntraClubMatchDatePerDivision[di])
    )
  )
);

% Ensure each team plays all other teams in the same division the specified number of rounds
constraint forall(di in 1..divisionCount)(
  forall(t1, t2 in divisionTeams[di] where t1 != t2)(
    sum(d in 1..maxMatchDate)(matchSchedule[t1, t2, d]) = divisionRounds[di] div 2 /\
    sum(d in 1..maxMatchDate)(matchSchedule[t2, t1, d]) = divisionRounds[di] div 2
  )
);

% Ensure each team plays a maximum of one match per week
constraint forall(t1 in TEAMS, w in 1..maxMatchDate div daysInWeek)(
  sum(d in 1..maxMatchDate where weekFromDay(d) = w)(
    sum(t2 in TEAMS where t2 != t1)(
      matchSchedule[t1, t2, d] + matchSchedule[t2, t1, d]
    )
  ) <= 1
);

% Ensure club table capacity is not exceeded
constraint forall(c in CLUBS, d in 1..maxMatchDate)(
  sum(t1, t2 in TEAMS where teamClub[t1] = c /\ t2 != t1)(
    matchSchedule[t1, t2, d] * minMatchTableCount
  ) <= clubTableCount[c]
);

% Ensure that no team should play more than maxConsecutiveHomeAwayMatches consecutive home or away matches
constraint forall(t1 in TEAMS)(
  % Check for consecutive home matches
  forall(start in 1..maxMatchDate - maxConsecutiveHomeAwayMatches)(
    sum(d in start..start + maxConsecutiveHomeAwayMatches)(
      sum(t2 in TEAMS where t2 != t1)(matchSchedule[t1, t2, d])
    ) <= maxConsecutiveHomeAwayMatches
  ) /\
  % Check for consecutive away matches
  forall(start in 1..maxMatchDate - maxConsecutiveHomeAwayMatches)(
    sum(d in start..start + maxConsecutiveHomeAwayMatches)(
      sum(t2 in TEAMS where t2 != t1)(matchSchedule[t2, t1, d])
    ) <= maxConsecutiveHomeAwayMatches
  )
);

% Ensure that teams meet the same opponent in the same week of different rounds
constraint forall(di in 1..divisionCount, round in 0..(divisionRounds[di] div 2 - 1))(
  forall(t1, t2 in divisionTeams[di] where t1 != t2)(
    forall(w in 1..divisionWeeksPerRound[di])(
      let {
        int: day1 = (round * divisionWeeksPerRound[di] + w - 1) * daysInWeek + 1,
        int: day2 = ((round + 1) * divisionWeeksPerRound[di] + w - 1) * daysInWeek + 1
      } in
      sum(d in day1..day1 + daysInWeek - 1)(
        matchSchedule[t1, t2, d]
      ) = sum(d in day2..day2 + daysInWeek - 1)(
        matchSchedule[t2, t1, d]
      )
    )
  )
);

% Objective to minimize the latest match dates and intra-club match dates per division
solve minimize sum(di in 1..divisionCount)(latestMatchDatePerDivision[di] + latestIntraClubMatchDatePerDivision[di]);

% output [
%   "Match Schedule:\n"
% ] ++
% [
%   if fix(matchSchedule[t1, t2, d]) then
%     "Week " ++ show(weekFromDay(d)) ++ " " ++ dayOfWeekName(d) ++ " " ++ show(t1) ++ " vs " ++ show(t2) ++ "\n"
%   else
%     ""
%   endif
%   | d in 1..maxMatchDate, t1, t2 in TEAMS where t1 != t2
% ];

% JSON output
output [
  "[\n"
] ++
[
  if fix(matchSchedule[t1, t2, d]) then
    "  {\n" ++
    "    \"day\": " ++ show(d) ++ ",\n" ++
    "    \"dayOfWeek\": \"" ++ dayOfWeekName(d) ++ "\",\n" ++
    "    \"homeTeam\": \"" ++ show(t1) ++ "\",\n" ++
    "    \"awayTeam\": \"" ++ show(t2) ++ "\",\n" ++
    "    \"week\": " ++ show(weekFromDay(d)) ++ "\n" ++
    "  },\n"
  else
    ""
  endif
  | d in 1..maxMatchDate, t1, t2 in TEAMS where t1 != t2
];

% Helper function to determine the week number from a day
function int: weekFromDay(int: d) = (d - 1) div daysInWeek + 1;

% Helper function to get the day index of the week from a date
function int: dayOfWeekIndex(int: d) = (d - 1) mod daysInWeek + 1;

% Helper function to convert day index to day name
function string: dayOfWeekName(int: d) = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][dayOfWeekIndex(d)];
