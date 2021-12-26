import { Component, OnInit, Output, TemplateRef, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Team } from 'src/app/models/team.model';
import { TeamService } from 'src/app/services/team.service';
import { MatchService } from 'src/app/services/match.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Tournament } from 'src/app/models/tournament.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tournament-create',
  templateUrl: './tournament-create.component.html',
  styleUrls: ['./tournament-create.component.scss']
})
export class TournamentCreateComponent implements OnInit {
  teams$: Observable<Array<Team>> = this.teamService.teams$;
  tournaments$: Observable<Array<Tournament>> = this.tourService.tournaments$;
  users$: Observable<Array<User>> = this.userService.users$;
  addedTeams: string[] = [""];
  modalRef?: BsModalRef;
  teamList: Team[];
  userList: User[];
  tournamentList: Tournament[];
  isError:boolean = false;
  errorMsg:string;
  teamSearch:string = "";
  userSearch:string = "";
  @Output() EEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor(private userService:UserService, private modalService: BsModalService, private toastr: ToastrService, private teamService: TeamService, private matchService: MatchService, private tourService: TournamentService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.teams$.subscribe(queriedItems => {
      console.log(queriedItems);
      this.teamList = queriedItems;
      return queriedItems;
    });
    this.tournaments$.subscribe(queriedItems => {
      console.log(queriedItems);
      this.tournamentList = queriedItems;
      return queriedItems;
    });
    this.users$.subscribe(queriedItems => {
      console.log(queriedItems);
      this.userList = queriedItems;
      return queriedItems;
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'modal-lg' }));
  }

  teamAddedHandler(id: string) {
    this.addedTeams.push(id);
  }

  getTeam(team: string): Team {
    return this.teamList.find(x => x.id == team);
  }

  getUser(user: string): User {
    return this.userList.find(x => x.id == user);
  }

  removeTeam(team: string) {
    this.addedTeams = this.addedTeams.filter(x => x != team);
  }

  onAddTournament() {
    let start = (document.getElementById("startDateSelect") as HTMLInputElement).valueAsDate;
    let startedit = new Date(start);
    let end = (document.getElementById("endDateSelect") as HTMLInputElement).valueAsDate;
    let endedit = new Date(end);
    if((document.getElementById("tournamentName") as HTMLInputElement).value == "" || (document.getElementById("startDateSelect") as HTMLInputElement).value == "" || (document.getElementById("endDateSelect") as HTMLInputElement).value == ""){
      this.errorMsg = "Make sure Name and Date fields are entered";
      this.isError = true;
    }else if(this.tournamentList.some(e => e.name === (document.getElementById("tournamentName") as HTMLInputElement).value)){
      this.errorMsg = "Tournament Name already exists";
      this.isError = true;
    }else if(start > end){
      this.errorMsg = "Start date can't be after End date";
      this.isError = true;
    }else if(this.addedTeams.length <= 2){
      this.errorMsg = "The Tournament needs at least 2 Teams";
      this.isError = true;
    }else if(this.dayDiff(startedit, endedit) < this.addedTeams.length - 1){
      this.errorMsg = "Date difference must be bigger for this number of teams";
      this.isError = true;
    }
    else{
      startedit = new Date(start);
      endedit = new Date(end);
      let daysBetweenRounds;
      let matchesId: string[] = [""];
      this.addedTeams.shift();
      let rounds; let matches;
      if (this.addedTeams.length % 2 == 0) {
        rounds = this.addedTeams.length - 1;
        matches = this.addedTeams.length / 2;
      } else {
        rounds = this.addedTeams.length;
        matches = (this.addedTeams.length - 1) / 2;
      }
      if (this.addedTeams.length == 2) {
        daysBetweenRounds = 0;
      } else {
        daysBetweenRounds = this.dayDiff(startedit, endedit) / rounds;
        endedit = new Date(end);
        startedit = new Date(start);
      }
      const tour = this.generateTournament(this.addedTeams);
      const tourid = this.makeid(20);
      let price = (document.getElementById("price") as HTMLInputElement).valueAsNumber;
      let capacity = (document.getElementById("capacity") as HTMLInputElement).valueAsNumber;
      if( isNaN(price) ){
        price = 0;
      }
      if( isNaN(capacity) ){
        capacity = 0;
      }
      for (let i = 0; i < rounds; i++) {
        for (let j = 0; j < matches; j++) {
          let teamA = tour[i][j][0];
          let teamB = tour[i][j][1];
          startedit = new Date(start);
          startedit.setDate(start.getDate() + (i * daysBetweenRounds))
          let date = (startedit).getFullYear().toString();
          if ((startedit.getMonth() + 1) < 10) {
            date = date.concat("-0", (startedit.getMonth() + 1).toString());
          } else {
            date = date.concat("-", (startedit.getMonth() + 1).toString())
          }
          if (startedit.getDate() < 10) {
            date = date.concat("-0", (startedit.getDate()).toString());
          } else {
            date = date.concat("-", (startedit.getDate()).toString());
          }
          this.matchService.addMatch((tourid + ((i + (rounds * j)).toString())), {
            aId: teamA,
            bId: teamB,
            date: date,
            ticketPrice: price,
            ticketsLeft: capacity,
            tournamentId: tourid,
            aScore: "-",
            bScore: "-",
            week: i + 1,
            scorersId: [""]
          });
          matchesId.push((tourid + ((i + (rounds * j)).toString())));
        }
      }
  
  
      matchesId.shift();
      this.tourService.addTournament(tourid, {
        name: (document.getElementById("tournamentName") as HTMLInputElement).value,
        userId: this.cookieService.get('Uid'),
        teamsId: this.addedTeams,
        matchesId: matchesId,
        startDate: start.getFullYear().toString().concat("-", (start.getMonth() + 1).toString(), "-", start.getDate().toString()),
        endDate: end.getFullYear().toString().concat("-", (end.getMonth() + 1).toString(), "-", end.getDate().toString()),
        tickets: capacity
      });
  
      this.toastr.success('Tournament Added!', (document.getElementById("tournamentName") as HTMLInputElement).value, {
        timeOut: 3000,
      });
  
      this.EEmitter.emit("close tournament-create");
        
    }
    

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

  rotateArray(array) {
    const p = Array.from(array);
    const firstElement = p.shift();
    const lastElement = p.pop();
    return [firstElement, lastElement].concat(p);
  };

  generateTournament(participants) {
    const tournamentRounds = [];
    let rounds;
    let p = participants;
    if (participants.length % 2 == 0) {
      rounds = participants.length - 1;
    } else {
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
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  dayDiff(first, second) {
    let firstDate = first;
    let secondDate = second;
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

  onTeamNameChange(){
    this.teamSearch = (document.getElementById("teamSelect") as HTMLInputElement).value;
  }

  onUserNameChange(){
    this.userSearch = (document.getElementById("userSelect") as HTMLInputElement).value;
  }

}
