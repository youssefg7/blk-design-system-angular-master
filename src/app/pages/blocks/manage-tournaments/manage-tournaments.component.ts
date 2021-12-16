import { Component, OnInit } from '@angular/core';
import { Match } from 'src/app/models/match.model';

@Component({
  selector: 'app-manage-tournaments',
  templateUrl: './manage-tournaments.component.html',
  styleUrls: ['./manage-tournaments.component.scss']
})
export class ManageTournamentsComponent implements OnInit {

  tourarray:string[]=["a","bb","ccc","dddd","eeeee","ffffff","ggggggg","hhhhhhhh","iiiiiiiii","jjjjjjjjjj","kkkkkkkkkkk","llllllllllll","llllllllllll","llllllllllll","llllllllllll","llllllllllll","llllllllllll","llllllllllll","llllllllllll"];
  matcharray:Match={
    aId:"sadfasd",
    bId:"asdasfaf",
    aScore:"2",
    bScore:"2",
    tournamentId:"dfsaf",
    date:"asfdasf"
  };

  constructor() { }

  ngOnInit(): void {
    
  }


  counter(i: number) {
    return new Array(i);
  }

}
