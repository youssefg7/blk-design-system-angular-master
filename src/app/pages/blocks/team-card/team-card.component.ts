import { Component, OnInit, Input } from '@angular/core';
import { Team } from 'src/app/models/team.model';


@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent implements OnInit {

  @Input() tsteam:Team;
  @Input() showId:boolean;


  constructor() { }

  ngOnInit(): void {
    
  }

}
