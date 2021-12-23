import { Component, OnInit, Input } from '@angular/core';
import { Match } from 'src/app/models/match.model';
import { Tournament } from 'src/app/models/tournament.model';
import { TournamentService } from 'src/app/services/tournament.service';
import { MatchService } from 'src/app/services/match.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manage-tournaments',
  templateUrl: './manage-tournaments.component.html',
  styleUrls: ['./manage-tournaments.component.scss']
})
export class ManageTournamentsComponent implements OnInit {
  tournaments$: Observable<Array<Tournament>> = this.tournamentService.tournaments$;
  tournamentList:Tournament[];
  matches$: Observable<Array<Match>> = this.matchService.matches$;
  matchList:Match[];
  @Input() condition;

 

  constructor(private tournamentService:TournamentService, private matchService:MatchService) { }

  ngOnInit(): void {
    this.tournaments$.subscribe( queriedItems => {
      this.tournamentList = queriedItems;
      return queriedItems;
    });
    this.matches$.subscribe( queriedItems => {
      this.matchList = queriedItems;
      return queriedItems;
    });
  }


  getMatch(match:string):Match{
    return this.matchList.find(x => x.id === match);
  }

}
