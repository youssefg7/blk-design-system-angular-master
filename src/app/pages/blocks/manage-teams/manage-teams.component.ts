import { Component, OnInit, Input } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { CookieService } from 'ngx-cookie-service';
import { Team } from 'src/app/models/team.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manage-teams',
  templateUrl: './manage-teams.component.html',
  styleUrls: ['./manage-teams.component.scss']
})
export class ManageTeamsComponent implements OnInit {

  teams$: Observable<Array<Team>> = this.teamService.teams$;
  teamList:Team[];
  @Input() condition:string;
  @Input() showUser:boolean;

  constructor(private teamService:TeamService, private cookieService:CookieService) { }

  ngOnInit(): void {
    this.teams$.subscribe( queriedItems => {
      console.log(queriedItems);
      this.teamList = queriedItems;
      return queriedItems;
    });
  }

}
