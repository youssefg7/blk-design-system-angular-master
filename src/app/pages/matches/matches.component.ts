import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/services/match.service';
import { Observable } from 'rxjs';
import { Match } from 'src/app/models/match.model';



@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {
  matches$: Observable<Array<Match>> = this.matchService.matches$;

  constructor(private matchService:MatchService) { }

  matchList:any;

  ngOnInit(): void {
    this.matches$.subscribe( queriedItems => {
      console.log(queriedItems);
      this.matchList = queriedItems;
      return queriedItems;
    });
  }

}
