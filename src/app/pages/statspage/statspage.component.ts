import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { Player } from 'src/app/models/player.model';
import { Tournament } from 'src/app/models/tournament.model';
import { Observable } from 'rxjs';
import { Match } from 'src/app/models/match.model';
import { MatchService } from 'src/app/services/match.service';
import { TeamService } from 'src/app/services/team.service';
import { Team } from 'src/app/models/team.model';

@Component({
  selector: 'app-statspage',
  templateUrl: './statspage.component.html',
  styleUrls: ['./statspage.component.scss']
})
export class StatspageComponent implements OnInit {

  selected = "Pick a Tournament";
  players$: Observable<Array<Player>> = this.playerService.players$;
  playerList : Player[];
  tournaments$: Observable<Array<Tournament>> = this.tournamentService.tournaments$;
  tournamentList : Tournament[];
  matches$: Observable<Array<Match>> = this.matchService.matches$;
  matchList : Match[];
  teams$: Observable<Array<Team>> = this.teamService.teams$;
  teamList : Team[];
  Scorers: scoreCount[] = [{playerId: "", count: 0}]

  constructor(private tournamentService: TournamentService, private playerService:PlayerService, private matchService: MatchService, private teamService: TeamService) { }

  ngOnInit(): void {
    this.tournaments$.subscribe( queriedItems => {
     // console.log(queriedItems);
      this.tournamentList = queriedItems;
      return queriedItems;
    });
    this.players$.subscribe( queriedItems => {
     // console.log(queriedItems);
      this.playerList = queriedItems;
      return queriedItems;
    });
    this.matches$.subscribe( queriedItems => {
     // console.log(queriedItems);
      this.matchList = queriedItems;
      return queriedItems;
    });
    this.teams$.subscribe( queriedItems => {
      // console.log(queriedItems);
       this.teamList = queriedItems;
       return queriedItems;
     });
  }


  update(e){
    this.selected = e.target.value;
    let totalTourScorers:string[] = [""];
    this.Scorers = [{playerId: "", count: 0}];
    if(this.selected != "Pick a Tournament"){
      let currentTour = this.getTournament(this.selected);
      for(let i=0;i<currentTour.matchesId.length;i++){
        totalTourScorers = totalTourScorers.concat(this.getMatch(currentTour.matchesId[i]).scorersId);
      }
      for(let i=0;i<totalTourScorers.length;i++){
        let addCurrent = true;
        for(let j =0;j<this.Scorers.length;j++){
          if(totalTourScorers[i] == this.Scorers[j].playerId){
            addCurrent = false;
            this.Scorers[j].count++;
          }
        }
        if(addCurrent){
          this.Scorers.push({playerId: totalTourScorers[i], count: 1});
        }
      }
      totalTourScorers.shift();
      this.Scorers.shift();


    }
  }


  getMatch(match:string):Match{
    return this.matchList.find(x => x.id === match);
  }

  getTournament(tournament:string):Tournament{
    return this.tournamentList.find(x => x.id === tournament);
  }

  getPlayer(player:string):Player{
    return this.playerList.find(x => x.id === player);
  }

  getTeam(team:string):Team{
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
        switchcount ++;
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

}


interface scoreCount {
  playerId:string,
  count:number
}


