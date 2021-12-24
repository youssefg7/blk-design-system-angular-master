import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/services/match.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { TeamService } from 'src/app/services/team.service';
import { Match } from 'src/app/models/match.model';
import { Tournament } from 'src/app/models/tournament.model';
import { Team } from 'src/app/models/team.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements OnInit {

  tournaments$: Observable<Array<Tournament>> = this.tournamentService.tournaments$;
  tournamentList: Tournament[];
  matches$: Observable<Array<Match>> = this.matchService.matches$;
  matchList: Match[];
  teams$: Observable<Array<Team>> = this.teamService.teams$;
  teamList: Team[];
  selected = "default";
  Scorers: scoreCount[] = [{ teamId: "", matchesPlayed: 0, count: 0, gw: 0, ga: 0, rank: 0 }];

  constructor(private tournamentService: TournamentService, private matchService: MatchService, private teamService: TeamService) { }

  ngOnInit(): void {
    this.tournaments$.subscribe(queriedItems => {
      // console.log(queriedItems);
      this.tournamentList = queriedItems;
      return queriedItems;
    });
    this.matches$.subscribe(queriedItems => {
      // console.log(queriedItems);
      this.matchList = queriedItems;
      return queriedItems;
    });
    this.teams$.subscribe(queriedItems => {
      // console.log(queriedItems);
      this.teamList = queriedItems;
      return queriedItems;
    });
  }

  update(e) {
    this.selected = e.target.value;
    this.Scorers = [{ teamId: "", matchesPlayed: 0, count: 0, gw: 0, ga: 0, rank: 0 }];
    if (this.selected != "default") {
      const currentTour = this.getTournament(this.selected);
      for (let i = 0; i < currentTour.teamsId.length; i++) {
        this.Scorers.push({
          teamId: currentTour.teamsId[i],
          matchesPlayed: 0,
          count: 0,
          gw: 0,
          ga: 0,
          rank: i
        });
      }
      this.Scorers.shift();
      for (let i = 0; i < currentTour.matchesId.length; i++) {
        let currentMatch = this.getMatch(currentTour.matchesId[i])
        if (currentMatch.aScore != "-" && currentMatch.bScore != "-") {

          let afoundindex = this.Scorers.findIndex(x => x.teamId == currentMatch.aId);
          let bfoundindex = this.Scorers.findIndex(x => x.teamId == currentMatch.bId);


          if (parseInt(currentMatch.aScore, 10) > parseInt(currentMatch.bScore, 10)) {
            this.Scorers[afoundindex] = {
              teamId: this.Scorers[afoundindex].teamId,
              matchesPlayed: this.Scorers[afoundindex].matchesPlayed + 1,
              count: this.Scorers[afoundindex].count + 3,
              gw: this.Scorers[afoundindex].gw + parseInt(currentMatch.aScore, 10),
              ga: this.Scorers[afoundindex].ga + parseInt(currentMatch.bScore, 10),
              rank: this.Scorers[afoundindex].rank
            }
            this.Scorers[bfoundindex] = {
              teamId: this.Scorers[bfoundindex].teamId,
              matchesPlayed: this.Scorers[bfoundindex].matchesPlayed + 1,
              count: this.Scorers[bfoundindex].count,
              gw: this.Scorers[bfoundindex].gw + parseInt(currentMatch.bScore, 10),
              ga: this.Scorers[bfoundindex].ga + parseInt(currentMatch.aScore, 10),
              rank: this.Scorers[bfoundindex].rank
            }
          } else if (parseInt(currentMatch.bScore, 10) > parseInt(currentMatch.aScore, 10)) {
            this.Scorers[bfoundindex] = {
              teamId: this.Scorers[bfoundindex].teamId,
              matchesPlayed: this.Scorers[bfoundindex].matchesPlayed + 1,
              count: this.Scorers[bfoundindex].count + 3,
              gw: this.Scorers[bfoundindex].gw + parseInt(currentMatch.bScore, 10),
              ga: this.Scorers[bfoundindex].ga + parseInt(currentMatch.aScore, 10),
              rank: this.Scorers[bfoundindex].rank
            }
            this.Scorers[afoundindex] = {
              teamId: this.Scorers[afoundindex].teamId,
              matchesPlayed: this.Scorers[afoundindex].matchesPlayed + 1,
              count: this.Scorers[afoundindex].count,
              gw: this.Scorers[afoundindex].gw + parseInt(currentMatch.aScore, 10),
              ga: this.Scorers[afoundindex].ga + parseInt(currentMatch.bScore, 10),
              rank: this.Scorers[afoundindex].rank
            }
          } else {
            this.Scorers[bfoundindex] = {
              teamId: this.Scorers[bfoundindex].teamId,
              matchesPlayed: this.Scorers[bfoundindex].matchesPlayed + 1,
              count: this.Scorers[bfoundindex].count + 1,
              gw: this.Scorers[bfoundindex].gw + parseInt(currentMatch.bScore, 10),
              ga: this.Scorers[bfoundindex].ga + parseInt(currentMatch.aScore, 10),
              rank: this.Scorers[bfoundindex].rank
            }
            this.Scorers[afoundindex] = {
              teamId: this.Scorers[afoundindex].teamId,
              matchesPlayed: this.Scorers[afoundindex].matchesPlayed + 1,
              count: this.Scorers[afoundindex].count + 1,
              gw: this.Scorers[afoundindex].gw + parseInt(currentMatch.aScore, 10),
              ga: this.Scorers[afoundindex].ga + parseInt(currentMatch.bScore, 10),
              rank: this.Scorers[afoundindex].rank
            }
          }


        }
      }

      this.Scorers.sort(this.compare);
      for (let i = 0; i < this.Scorers.length; i++) {
        this.Scorers[i] = {
          teamId: this.Scorers[i].teamId,
          matchesPlayed: this.Scorers[i].matchesPlayed,
          count: this.Scorers[i].count,
          gw: this.Scorers[i].gw,
          ga: this.Scorers[i].ga,
          rank: i + 1
        }
      }


    }
  }


  getMatch(match: string): Match {
    return this.matchList.find(x => x.id === match);
  }

  getTournament(tournament: string): Tournament {
    return this.tournamentList.find(x => x.id === tournament);
  }

  getTeam(team: string): Team {
    return this.teamList.find(x => x.id === team);
  }


  sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }


  compare(a, b) {
    if (a.count > b.count) {
      return -1;
    }
    if (a.count < b.count) {
      return 1;
    }
    if(a.gw - a.ga > b.gw - b.ga){
      return -1;
    }
    if(a.gw - a.ga < b.gw - b.ga){
      return 1
    }
    if (a.gw > b.gw) {
      return -1;
    }
    if (a.gw < b.gw) {
      return 1;
    }
    if (a.ga > b.ga) {
      return 1;
    }
    if (a.ga < b.ga) {
      return -1;
    }
    return 0;
  }

}

interface scoreCount {
  teamId: string,
  matchesPlayed: number,
  count: number,
  gw: number,
  ga: number,
  rank: number
}
