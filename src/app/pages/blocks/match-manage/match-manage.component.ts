import { Component, OnInit, Input} from '@angular/core';
import { Match } from 'src/app/models/match.model';
import { Team } from 'src/app/models/team.model';
import { Player } from 'src/app/models/player.model';
import { Tournament } from 'src/app/models/tournament.model';
import { MatchService } from 'src/app/services/match.service';
import { TeamService } from 'src/app/services/team.service';
import { PlayerService } from 'src/app/services/player.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-match-manage',
  templateUrl: './match-manage.component.html',
  styleUrls: ['./match-manage.component.scss']
})
export class MatchManageComponent implements OnInit {

  constructor(private teamService:TeamService, private tournamentService: TournamentService, private playerService:PlayerService, private matchService:MatchService) { }
  
  @Input() tsmatch:Match;
  teams$: Observable<Array<Team>> = this.teamService.teams$;
  tournaments$: Observable<Array<Tournament>> = this.tournamentService.tournaments$;
  tournamentList : Tournament[];
  teamList : Team[];
  players$: Observable<Array<Player>> = this.playerService.players$;
  playerList : Player[];
  selected = "Pick a Scorer";
  teamARadioPicked:boolean = true;


  ngOnInit(): void {
    this.teams$.subscribe( queriedItems => {
      console.log(queriedItems);
      this.teamList = queriedItems;
      return queriedItems;
    });
    this.tournaments$.subscribe( queriedItems => {
      console.log(queriedItems);
      this.tournamentList = queriedItems;
      return queriedItems;
    });
    this.players$.subscribe( queriedItems => {
      console.log(queriedItems);
      this.playerList = queriedItems;
      return queriedItems;
    });
    if(this.tsmatch.aScore == "-" && this.tsmatch.bScore == "-"){
      this.matchService.addMatch(this.tsmatch.id,{
        aId: this.tsmatch.aId,
        bId: this.tsmatch.bId,
        aScore: "0",
        bScore: "0",
        tournamentId: this.tsmatch.tournamentId,
        date: this.tsmatch.date,
        ticketPrice: this.tsmatch.ticketPrice,
        ticketsLeft: this.tsmatch.ticketsLeft,
        week: this.tsmatch.week,
        scorersId: this.tsmatch.scorersId
      });
    }


  }

  getTeam(team:string):Team{
    return this.teamList.find(x => x.id === team);
  }
  
  getTournament(tournament:string):Tournament{
     return this.tournamentList.find(x => x.id === tournament);
  }

  onAddGoal(){
    let ascore:number; let bscore:number;
    if(this.teamARadioPicked){
      ascore = parseInt(this.tsmatch.aScore,10)+1;
      bscore = parseInt(this.tsmatch.bScore,10);
    }else{
      ascore = parseInt(this.tsmatch.aScore,10);
      bscore = parseInt(this.tsmatch.bScore,10)+1;
    }
    if(this.selected == "default"){
      this.matchService.addMatch(this.tsmatch.id,{
        aId: this.tsmatch.aId,
        bId: this.tsmatch.bId,
        aScore: ascore.toString(),
        bScore: bscore.toString(),
        tournamentId: this.tsmatch.tournamentId,
        date: this.tsmatch.date,
        ticketPrice: this.tsmatch.ticketPrice,
        ticketsLeft: this.tsmatch.ticketsLeft,
        week: this.tsmatch.week,
        scorersId: this.tsmatch.scorersId
      });
    }else{
      let scorers = [""];
      scorers = scorers.concat(this.tsmatch.scorersId);
      scorers.push(this.selected);
      scorers.shift();
      this.matchService.addMatch(this.tsmatch.id,{
        aId: this.tsmatch.aId,
        bId: this.tsmatch.bId,
        aScore: ascore.toString(),
        bScore: bscore.toString(),
        tournamentId: this.tsmatch.tournamentId,
        date: this.tsmatch.date,
        ticketPrice: this.tsmatch.ticketPrice,
        ticketsLeft: this.tsmatch.ticketsLeft,
        week: this.tsmatch.week,
        scorersId: scorers
      });
    }
  }

  teamRadio() {
    this.teamARadioPicked = (document.getElementById("aRadio") as HTMLInputElement).checked;
  }


  update(e){
    this.selected = e.target.value
  }

}
