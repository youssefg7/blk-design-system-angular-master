import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/services/match.service';
import { Observable } from 'rxjs';
import { Match } from 'src/app/models/match.model';
import { AuthService } from 'src/app/services/auth.service';
import { TeamService } from 'src/app/services/team.service';
import { Team } from 'src/app/models/team.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private matchService: MatchService, private teamService: TeamService, public authService: AuthService, private userService: UserService) { }

  todayDate: Date;
  today: string;
  matches$: Observable<Array<Match>> = this.matchService.matches$;
  matchList: Match[];
  teamList: Team[];
  teams$: Observable<Array<Team>> = this.teamService.teams$;
  ngOnInit(): void {

    if(this.authService.userLoggedIn){
      this.userService.getCurrentUser();
    }
    
    this.todayDate = new Date();
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

    this.matches$.subscribe(queriedItems => {
      this.matchList = queriedItems;
      return queriedItems;
    });
    this.teams$.subscribe(queriedItems => {
      this.teamList = queriedItems;
      return queriedItems;
    });
  }

}
