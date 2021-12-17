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
    aId:"SS1LOayA3PPzXy8qYrIa",
    bId:"dabESHQVj7xY12dKJbUS",
    aScore:"2",
    bScore:"2",
    tournamentId:"IjLXc",
    date:"2021-11-11"
  };

  constructor() { }

  ngOnInit(): void {
    
  }


  counter(i: number) {
    return new Array(i);
  }

}
