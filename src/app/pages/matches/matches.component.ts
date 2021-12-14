import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/services/match.service';
import { Observable } from 'rxjs';
import { Match } from 'src/app/models/match.model';
import { AuthService } from 'src/app/services/auth.service';
import { CompileShallowModuleMetadata } from '@angular/compiler';



@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {
  matches$: Observable<Array<Match>> = this.matchService.matches$;

  constructor(private matchService:MatchService, private authService:AuthService) { }

  matchList:Match[];

  ngOnInit(): void {
    this.matches$.subscribe( queriedItems => {
      console.log(queriedItems);
      this.matchList = queriedItems;
      return queriedItems;
    });
      
  }

  test(){
    this.matchList.forEach(function (arrayItem) {
      if(arrayItem.aId.startsWith("qwed")){
        console.log(arrayItem);
      }
    })
  }


}
