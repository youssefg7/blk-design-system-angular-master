import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Team } from 'src/app/models/team.model';
import { TeamService } from 'src/app/services/team.service';
import { MatchService } from 'src/app/services/match.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-tournament-create',
  templateUrl: './tournament-create.component.html',
  styleUrls: ['./tournament-create.component.scss']
})
export class TournamentCreateComponent implements OnInit {
  teams$: Observable<Array<Team>> = this.teamService.teams$;
  addedTeams: string[] = [""];
  modalRef? : BsModalRef;
  teamList : Team[];

  constructor(private modalService:BsModalService, private toastr:ToastrService, private teamService:TeamService, private matchService:MatchService, private tourService:TournamentService, private cookieService:CookieService) { }

  ngOnInit(): void {
    this.teams$.subscribe( queriedItems => {
      console.log(queriedItems);
      this.teamList = queriedItems;
      return queriedItems;
    });
  }

  openModal(template : TemplateRef<any>){
    this.modalRef = this.modalService.show(template, Object.assign({},{class: 'modal-lg'}));
 }

 teamAddedHandler(id:string){
   this.addedTeams.push(id);
 }

 getTeam(team:string):Team{
  return this.teamList.find(x => x.id == team);
}

removeTeam(team:string){
  this.addedTeams = this.addedTeams.filter(x => x != team);
}

onAddTournament(){
  let start = (document.getElementById("startDateSelect") as HTMLInputElement).valueAsDate;
  let end = (document.getElementById("endDateSelect") as HTMLInputElement).valueAsDate;
  //console.log((new Date(start.setDate(start.getDate()+7))).toString())
  let daysBetweenRounds;
  let matchesId:string[] = [""];
  this.addedTeams.shift();
  let rounds; let matches;
  if(this.addedTeams.length % 2 == 0){
    rounds = this.addedTeams.length - 1;
    matches = this.addedTeams.length/2;
  }else{
    rounds = this.addedTeams.length;
    matches = (this.addedTeams.length-1)/2;
  }
  if(this.addedTeams.length == 2){
    daysBetweenRounds = 0;
  }else{
    daysBetweenRounds = this.dayDiff(start,end);
  }
  const tour = this.generateTournament(this.addedTeams);
  const tourid = this.makeid(5);
  for(let i =0;i<rounds;i++){
      for(let j = 0;j<matches;j++){
        let teamA = tour[i][j][0];
        let teamB = tour[i][j][1];
        let date = ((new Date(start.setDate(start.getDate()+(i*daysBetweenRounds)))).getFullYear()).toString().concat("-",(((new Date(start.setDate(start.getDate()+i))).getMonth()) + 1).toString(),"-",((new Date(start.setDate(start.getDate()+i))).getDate()).toString());
        this.matchService.addMatch((tourid+((i+(rounds*j)).toString())),{
          aId: teamA,
          bId: teamB,
          date: date,
          tournamentId: tourid,
          aScore: "-",
          bScore: "-"
        });
        matchesId.push((tourid+((i+(rounds*j)).toString())));
      }
  }
  matchesId.shift();
  this.tourService.addTournament(tourid,{
    name: (document.getElementById("tournamentName") as HTMLInputElement).value,
    userId: this.cookieService.get('Uid'),
    teamsId: this.addedTeams,
    matchesId: matchesId,
    startDate: start.getFullYear().toString().concat("-",(start.getMonth()+1).toString(),"-",start.getDate().toString()),
    endDate: end.getFullYear().toString().concat("-",(end.getMonth()+1).toString(),"-",end.getDate().toString()),
  });

  this.modalRef.hide();
  
  
  /*this.toastr.success('Hello world!', 'Toastr fun!', {
    timeOut:3000,
  });*/
 }

 matchParticipants(participants) {
  const p = Array.from(participants);
  const pairings = [];
  while (p.length != 0) {
    const participantA = p.shift();
    const participantB = p.pop();
    if (participantA != undefined && participantB != undefined) {
      pairings.push([participantA, participantB]);
    }
  }
  return pairings;
}

 rotateArray(array){
  const p = Array.from(array);
  const firstElement = p.shift();
  const lastElement = p.pop();
  return [firstElement, lastElement].concat(p);
};

 generateTournament(participants) {
  const tournamentRounds = [];
  let rounds;
  let p = participants;
  if(participants.length % 2 == 0){
    rounds = participants.length - 1;
  }else{
    rounds = participants.length;
    p.push(null);
  }
  for (let i = 0; i < rounds; i++) {
    tournamentRounds.push(this.matchParticipants(p));
    p = this.rotateArray(p);
  }
  return tournamentRounds;
}

makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}

dayDiff(firstDate, secondDate) {
  firstDate = new Date(firstDate);
  secondDate = new Date(secondDate);
  if (!isNaN(firstDate) && !isNaN(secondDate)) {
    firstDate.setHours(0, 0, 0, 0); //ignore time part
    secondDate.setHours(0, 0, 0, 0); //ignore time part
    var dayDiff = secondDate - firstDate;
    dayDiff = dayDiff / 86400000; // divide by milisec in one day
    return dayDiff;
  } else {
    console.log("Enter valid date.");
  }
}

}
