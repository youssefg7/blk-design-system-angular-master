import { Component, OnInit, Input } from '@angular/core';
import { Match } from 'src/app/models/match.model';
import { Team } from 'src/app/models/team.model';
import { Tournament } from 'src/app/models/tournament.model';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  @Input() tsmatch: Match;
  @Input() firstTeam: Team;
  @Input() secondTeam: Team;
  @Input() tournament: Tournament;
  @Input() numOfTickets: number;
  @Input() paymentMethod: string;
  @Input() favTeam: string;

  constructor() { }

  ngOnInit(): void {
  }

}
