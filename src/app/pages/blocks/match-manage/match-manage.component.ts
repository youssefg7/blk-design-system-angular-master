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

  constructor(private teamService:TeamService, private tournamentService: TournamentService, private playerService:PlayerService) { }
  
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
  }

  getTeam(team:string):Team{
    return this.teamList.find(x => x.id === team);
  }
  
  getTournament(tournament:string):Tournament{
     return this.tournamentList.find(x => x.id === tournament);
  }

  onAddGoal(){

  }

  teamRadio() {
    this.teamARadioPicked = (document.getElementById("aRadio") as HTMLInputElement).checked;
  }


  update(e){
    this.selected = e.target.value
  }

}
