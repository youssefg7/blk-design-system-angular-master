import { Component, OnInit, Input } from '@angular/core';
import { Match } from 'src/app/models/match.model';

@Component({
  selector: 'app-match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.scss']
})
export class MatchCardComponent implements OnInit {
  @Input() tsmatch:Match;
  constructor() { }

  ngOnInit(): void {
  }

}
