import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/services/match.service';
import { Observable } from 'rxjs';
import { Match } from 'src/app/models/match.model';
import { AuthService } from 'src/app/services/auth.service';
import { TeamService } from 'src/app/services/team.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { Team } from 'src/app/models/team.model';
import { Tournament } from 'src/app/models/tournament.model';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {

  constructor(private matchService: MatchService, private teamService: TeamService, private tournamentService: TournamentService) { }

  todayDate: Date;
  today: string;
  matches$: Observable<Array<Match>> = this.matchService.matches$;
  matchList: Match[];
  teams$: Observable<Array<Team>> = this.teamService.teams$;
  tournaments$: Observable<Array<Tournament>> = this.tournamentService.tournaments$;
  tournamentList: Tournament[];
  teamList: Team[];
  teamSearch: string = "";
  tourSearch: string = "";
  dateSearch: string = "";

  ngOnInit(): void {
    /*this.todayDate = new Date();
    this.today = (this.todayDate).getFullYear().toString();
    if ((this.todayDate.getMonth() + 1) < 10) {
      this.today = this.today.concat("-0", (this.todayDate.getMonth() + 1).toString());
    } else {
      this.today = this.today.concat("-", (this.todayDate.getMonth() + 1).toString())
    }
    if (this.todayDate.getDate() < 10) {
      this.today = this.today.concat("-0", (this.todayDate.getDate()).toString());
    } else {
      this.today = this.today.concat("-", (this.todayDate.getDate()).toString());
    }
    this.dateSearch = this.today;*/
    this.matches$.subscribe(queriedItems => {
      this.matchList = queriedItems;
      return queriedItems;
    });
    this.teams$.subscribe(queriedItems => {
      this.teamList = queriedItems;
      return queriedItems;
    });
    this.tournaments$.subscribe(queriedItems => {
      this.tournamentList = queriedItems;
      return queriedItems;
    });

  }

  onDateChange() {
    this.dateSearch = (document.getElementById("dateSelect") as HTMLInputElement).value;

  }

  onTourChange() {
    this.tourSearch = (document.getElementById("tournamentSelect") as HTMLInputElement).value;
  }

  onTeamChange() {
    this.teamSearch = (document.getElementById("teamSelect") as HTMLInputElement).value;
  }

  getTeam(team: string): Team {
    return this.teamList.find(x => x.id == team);
  }

  getTournament(tournament: string): Tournament {
    return this.tournamentList.find(x => x.id == tournament);
  }

}
