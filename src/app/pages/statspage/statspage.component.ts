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
import { Sort } from '@angular/material/sort'

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

}


interface scoreCount {
  playerId:string,
  count:number
}


