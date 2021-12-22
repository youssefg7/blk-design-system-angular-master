import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Match } from 'src/app/models/match.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TournamentService } from 'src/app/services/tournament.service';
import { TeamService } from 'src/app/services/team.service';
import { Observable } from 'rxjs';
import { Team } from 'src/app/models/team.model';
import { Tournament } from 'src/app/models/tournament.model';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.scss']
})
export class MatchCardComponent implements OnInit {
  @Input() tsmatch: Match;
  @Input() manager: boolean;
  teams$: Observable<Array<Team>> = this.teamService.teams$;
  tournaments$: Observable<Array<Tournament>> = this.tournamentService.tournaments$;
  tournamentList: Tournament[];
  teamList: Team[];


  constructor(private modalService: BsModalService, private tournamentService: TournamentService, private teamService: TeamService, public authService:AuthService) { }


  modalRef?: BsModalRef;


  ngOnInit(): void {
    this.teams$.subscribe(queriedItems => {
      this.teamList = queriedItems;
      return queriedItems;
    });
    this.tournaments$.subscribe(queriedItems => {
      this.tournamentList = queriedItems;
      return queriedItems;
    });
  }
  openMenu(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getTeam(team: string): Team {
    return this.teamList.find(x => x.id === team);
  }

  getTournament(tournament: string): Tournament {
    return this.tournamentList.find(x => x.id === tournament);
  }

  getDate(date: string): string {
    return (new Date(date)).toLocaleDateString();
  }

}
