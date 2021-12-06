import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.scss']
})
export class MatchCardComponent implements OnInit {

  constructor() { }
  @Input() tsmatch;
  ngOnInit(): void {
  }

}
