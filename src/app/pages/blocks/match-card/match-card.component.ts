import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Match } from 'src/app/models/match.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TournamentService } from 'src/app/services/tournament.service';
import { TeamService } from 'src/app/services/team.service';
import { Observable } from 'rxjs';
import { Team } from 'src/app/models/team.model';
import { Tournament } from 'src/app/models/tournament.model';
import { AuthService } from 'src/app/services/auth.service';
import { PlayerService } from 'src/app/services/player.service';
import { Player } from 'src/app/models/player.model';
import { TicketService } from 'src/app/services/ticket.service';
import { Ticket } from 'src/app/models/ticket.model';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.scss']
})
export class MatchCardComponent implements OnInit {
  @Input() tsmatch: Match;
  @Input() manager: boolean;
  teams$: Observable<Array<Team>> = this.teamService.teams$;
  tournaments$: Observable<Array<Tournament>> = this.tournamentService.tournaments$;
  tournamentList: Tournament[];
  teamList: Team[];
  players$: Observable<Array<Player>> = this.playerService.players$;
  playerList: Player[];
  tickets$: Observable<Array<Ticket>> = this.ticketService.tickets$;
  ticketList: Ticket[];
  users$: Observable<Array<User>> = this.userService.users$;
  userList: User[];
  verifyText:string = "Waiting for ticket id...";
  ticketNo:string = "#";


  constructor(private userService:UserService, private ticketService:TicketService ,private modalService: BsModalService, private tournamentService: TournamentService, private teamService: TeamService, public authService:AuthService, private playerService: PlayerService) { }


  modalRef?: BsModalRef;


  ngOnInit(): void {
    this.teams$.subscribe(queriedItems => {
      this.teamList = queriedItems;
      return queriedItems;
    });
    this.tournaments$.subscribe(queriedItems => {
      this.tournamentList = queriedItems;
      return queriedItems;
    });
    this.players$.subscribe(queriedItems => {
      this.playerList = queriedItems;
      return queriedItems;
    });
    this.tickets$.subscribe(queriedItems => {
      this.ticketList = queriedItems;
      return queriedItems;
    });
    this.users$.subscribe(queriedItems => {
      this.userList = queriedItems;
      return queriedItems;
    });
  }
  openMenu(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getTeam(team: string): Team {
    return this.teamList.find(x => x.id === team);
  }

  getTournament(tournament: string): Tournament {
    return this.tournamentList.find(x => x.id === tournament);
  }

  getPlayer(player: string): Player {
    return this.playerList.find(x => x.id === player);
  }

  getTicket(ticket: string): Ticket {
    return this.ticketList.find(x => x.id === ticket);
  }

  getUser(user: string): User {
    return this.userList.find(x => x.id === user);
  }

  getDate(date: string): string {
    return (new Date(date)).toLocaleDateString();
  }

  eventHandle(event){
    this.modalRef.hide();
  }
  onTicketChange(){
    let ticid = (document.getElementById("ticketSelect") as HTMLInputElement).value;
    if(this.ticketList.some(e => e.id === ticid)){
      let curtic = this.getTicket(ticid);
      if(curtic.matchId === this.tsmatch.id){
        this.verifyText = "Valid Ticket for " + this.getUser(curtic.userId).name;
        this.ticketNo = curtic.number.toString();
      }else{
        this.verifyText = "Invalid Ticket";
        this.ticketNo = "#";
      }
    }else{
        this.verifyText = "Invalid Ticket";
        this.ticketNo = "#";
    }
  }

}
