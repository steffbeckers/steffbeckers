% - Each team only plays against other teams of the same division
% - Teams should play all other teams of the same division the amount of rounds defined on division level by divisionRounds
% - Each match can only be scheduled on permissible days for each division

% - Each team plays max one match per week

% - Teams play round-robin. A round ends when all teams have played against all other teams in the same division
% - Teams within the same division should play in the same sequence against each other for each consecutive round.
% - Teams in the same division play round-robin. A round ends when all teams have played against all other teams in the same division. For each consecutive round the teams should play in the same sequence (first week of first round = first week of second round) as the previous round. Home and away just change. The match day inside the week can differ, since we try to schedule the match mostly on the favorite day of the home team.
% - Teams in the same division play round-robin. Round counts are defined on division level by the divisionRounds array. Each week a team plays against an other team from the same division. When a team has played against all other teams, over several weeks, the round is over. Consecutive rounds, if any, should be played in the same sequence as the previous one. E.g. if there are 4 teams in a division, in 3 weeks a teams has played against all other teams.

% Round 1
Week 1 Tue NRG_A vs NRG_B
Week 1 Mon NRG_D vs NRG_C
Week 2 Tue NRG_D vs NRG_A
Week 2 Thu NRG_C vs NRG_B
Week 3 Tue NRG_A vs NRG_C
Week 3 Wed NRG_B vs NRG_D
% Round 2
Week 4 Wed NRG_B vs NRG_A
Week 4 Thu NRG_C vs NRG_D
Week 5 Tue NRG_A vs NRG_D
Week 5 Wed NRG_B vs NRG_C
Week 6 Thu NRG_C vs NRG_A
Week 6 Tue NRG_D vs NRG_B
% Round 3
Week 7 Tue NRG_A vs NRG_B
Week 7 Mon NRG_D vs NRG_C
Week 8 Tue NRG_D vs NRG_A
Week 8 Thu NRG_C vs NRG_B
Week 9 Tue NRG_A vs NRG_C
Week 9 Wed NRG_B vs NRG_D
% Round 4
Week 10 Wed NRG_B vs NRG_A
Week 10 Thu NRG_C vs NRG_D
Week 11 Tue NRG_A vs NRG_D
Week 11 Wed NRG_B vs NRG_C
Week 12 Thu NRG_C vs NRG_A
Week 12 Tue NRG_D vs NRG_B

Each consecutive round, a team should play against the same opponent team in the same week. The date should fall in the week. Home and away team should switch each round. A round ends when all teams have played against all other teams in the same division. Divisions will have even number of teams.

Example with 4 teams and division has 2 rounds:
Week 1 Tue NRG_A vs NRG_B
Week 1 Mon NRG_D vs NRG_C
Week 2 Tue NRG_D vs NRG_A
Week 2 Thu NRG_C vs NRG_B
Week 3 Tue NRG_A vs NRG_C
Week 3 Wed NRG_B vs NRG_D
Week 4 Wed NRG_B vs NRG_A
Week 4 Thu NRG_C vs NRG_D
Week 5 Tue NRG_A vs NRG_D
Week 5 Wed NRG_B vs NRG_C
Week 6 Thu NRG_C vs NRG_A
Week 6 Tue NRG_D vs NRG_B

Following week pairs have same match opponents but home and away team switch:
Week 1 and 4
Week 2 and 5
Week 3 and 6

Example with 4 teams and division has 4 rounds:
Week 1 Tue NRG_A vs NRG_B
Week 1 Mon NRG_D vs NRG_C
Week 2 Tue NRG_D vs NRG_A
Week 2 Thu NRG_C vs NRG_B
Week 3 Tue NRG_A vs NRG_C
Week 3 Wed NRG_B vs NRG_D
Week 4 Wed NRG_B vs NRG_A
Week 4 Thu NRG_C vs NRG_D
Week 5 Tue NRG_A vs NRG_D
Week 5 Wed NRG_B vs NRG_C
Week 6 Thu NRG_C vs NRG_A
Week 6 Tue NRG_D vs NRG_B
Week 7 Tue NRG_A vs NRG_B
Week 7 Mon NRG_D vs NRG_C
Week 8 Tue NRG_D vs NRG_A
Week 8 Thu NRG_C vs NRG_B
Week 9 Tue NRG_A vs NRG_C
Week 9 Wed NRG_B vs NRG_D
Week 10 Wed NRG_B vs NRG_A
Week 10 Thu NRG_C vs NRG_D
Week 11 Tue NRG_A vs NRG_D
Week 11 Wed NRG_B vs NRG_C
Week 12 Thu NRG_C vs NRG_A
Week 12 Tue NRG_D vs NRG_B

Following week pairs have same match opponents but home and away team switch:
Week 1 and 7
Week 2 and 8
Week 3 and 9
Week 4 and 10
Week 5 and 11
Week 6 and 12

-----

Just give me the new or modified code as your answer.

Each consecutive round, a team should play against the same opponent team in the same week. The date should fall in the week. Home and away team should switch each round. A round ends when all teams have played against all other teams in the same division. Divisions will have even number of teams. With 4 teams in the same division and 2 rounds this should be the output:

% Round 1
Week 1 Tue NRG_A vs NRG_B
Week 1 Mon NRG_D vs NRG_C
Week 2 Tue NRG_D vs NRG_A
Week 2 Thu NRG_C vs NRG_B
Week 3 Tue NRG_A vs NRG_C
Week 3 Wed NRG_B vs NRG_D
% Round 2
Week 4 Wed NRG_B vs NRG_A
Week 4 Thu NRG_C vs NRG_D
Week 5 Tue NRG_A vs NRG_D
Week 5 Wed NRG_B vs NRG_C
Week 6 Thu NRG_C vs NRG_A
Week 6 Tue NRG_D vs NRG_B

Following week pairs have same match opponents but home and away team switch:
Week 1 and 4
Week 2 and 5
Week 3 and 6

-----

% - Each team should not play more than maxConsecutiveHomeAwayMatches consecutive home or away matches

% - Each match can only be scheduled if the home club has enough tables on the match day
% - When a match is scheduled on a match date, other matches at the same home team's club should be taken into account. When a club only has 2 tables available only 1 match can be scheduled on that specific match date

% - The match schedule should respect the favorite day of the week of the home team if possible. This is a soft constraint, to be modeled as an optimization


% Ensure round-robin within each division for each round
constraint forall(di in 1..divisionCount)(
  forall(r in 1..divisionRounds[di])(
    forall(t1 in divisionTeams[di])(
      sum(t2 in divisionTeams[di] where t1 != t2)(
        % Sum of all matches between t1 and t2 in round r
        sum(w in weeksPerRound(di, r))(
          sum(d in daysPerWeek(w))(
            matchSchedule[t1, t2, d]
          )
        )
      ) == 1 % Each team plays each other team exactly once per round
    )
  )
);

% Constraint to maintain the same week in consecutive rounds but allow different match days
constraint forall(di in 1..divisionCount)(
  forall(r in 1..divisionRounds[di]-1)(
    forall(t1, t2 in divisionTeams[di] where t1 != t2)(
      % Ensure that matches in the same sequence of weeks
      forall(w in weeksPerRound(di, r))(
        sum(d in daysPerWeek(w))(
          matchSchedule[t1, t2, d]
        ) = sum(d in daysPerWeek(w + (card(divisionTeams[di]) - 1) div daysInWeek))(
          matchSchedule[t2, t1, d]
        )
      )
    )
  )
);

% Helper function to compute weeks per round for a given division and round number
function set of int: weeksPerRound(int: di, int: r) =
  let {
    int: weeksPerCycle = (card(divisionTeams[di]) - 1) div daysInWeek, % Weeks required to complete one full cycle of matches
    int: startWeek = (r-1) * weeksPerCycle + 1, % Starting week for the round
    int: endWeek = r * weeksPerCycle % Ending week for the round
  } in startWeek .. endWeek;

% Helper function to compute days within a given week
function set of int: daysPerWeek(int: w) =
  let {
    int: startDay = (w-1) * daysInWeek + 1,
    int: endDay = min(w * daysInWeek, maxMatchDate)
  } in startDay .. endDay;

% Ensure matches are scheduled on the home team's favorite day of the week
constraint forall(t1, t2 in TEAMS where t1 != t2)(
  forall(d in 1..maxMatchDate)(
    matchSchedule[t1, t2, d] -> dayOfWeekIndex(d) = teamFavoriteDayOfWeek[t1]
  )
);

var int: matchNotOnFavoriteDayOfTeam = sum(t1, t2 in TEAMS, d in 1..maxMatchDate where t1 != t2)(
  matchSchedule[t1, t2, d] /\ dayOfWeekIndex(d) != teamFavoriteDayOfWeek[t1]
);
 + matchNotOnFavoriteDayOfTeam;

"latestMatchDate: " ++ show(latestMatchDate) ++ "\n" ++
"latestIntraClubMatchDate: " ++ show(latestIntraClubMatchDate) ++ "\n" ++
"matchNotOnFavoriteDayOfTeam: " ++ show(matchNotOnFavoriteDayOfTeam) ++ "\n\n" ++

Per afdeling worden heen en terug rondes gespeeld, per afdeling is het aantal rondes ingesteld via de divisionRounds array. Aantal speelweken per afdeling per ronde hangt af van het aantal ploegen in de afdeling, dit is ingesteld via de divisionWeeksPerRound array. Een ronde is voorbij wanneer elk team tegen elk ander team van dezelfde afdeling heeft gespeeld. De volgende ronde worden de thuis- en uitploegen gewisseld. De teams behouden dezelfde volgorde van tegenstanders als de vorige ronde. 2 teams ontmoeten elkaar in dezelfde speelweek van de verschillende rondes. De speeldag moet dus in de juiste week vallen. Bijvoorbeeld wanneer er 2 rondes gespeeld worden over 14 weken, dezelfde teams zullen elkaar ontmoeten in week 1 en 8, 2 en 9 tot 7 en 14. Kan je hiervoor de nodige code toevoegen?
