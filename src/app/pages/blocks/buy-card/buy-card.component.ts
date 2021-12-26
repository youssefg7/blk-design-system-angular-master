import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Match } from 'src/app/models/match.model';
import jsPDF from 'jspdf';
import { Html2CanvasOptions } from 'jspdf';
import html2canvas from 'html2canvas';
import { TournamentService } from 'src/app/services/tournament.service';
import { TeamService } from 'src/app/services/team.service';
import { Team } from 'src/app/models/team.model';
import { Tournament } from 'src/app/models/tournament.model';
import { MatchService } from 'src/app/services/match.service';
import { UserService } from 'src/app/services/user.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-buy-card',
  templateUrl: './buy-card.component.html',
  styleUrls: ['./buy-card.component.scss']
})
export class BuyCardComponent implements OnInit {

  constructor(private userService: UserService, private tournamentService: TournamentService, private ticketService: TicketService, private matchService: MatchService) { }
  buyAttempt: boolean;
  cardInfo: boolean;
  numError: boolean = false;
  negError: boolean = false;
  currentticket:string = "Id yet to be generated";
  cardRadioChecked: boolean;
  @Input() tsmatch: Match;
  @Input() firstTeam: Team;
  @Input() secondTeam: Team;
  @Input() tournament: Tournament;
  @Output() EEmitter: EventEmitter<string> = new EventEmitter<string>();
  focus; focus1; focus2; focus3; focus4;

  buyForm = new FormGroup({
    favTeam: new FormControl('', [Validators.required]),
    numOfTickets: new FormControl(0, [Validators.required]),
    paymentMethod: new FormControl('', [Validators.required]),
    cardNumber: new FormControl(''),
    cvv: new FormControl(''),
    expiryDate: new FormControl(''),
  });

  onSubmitBuy() {
    this.buyAttempt = true;
    this.numError = false;
    this.negError = false;
    if(this.numOfTickets.value > this.tsmatch.ticketsLeft){
      this.numError = true;
    }else if(this.numOfTickets.value <= 0){
      this.negError = true;
    }
    else if (this.buyForm.valid && (this.paymentMethod.value == "cash" || (!(this.cvv.value.toString().length != 3 || this.cvv.value < 0) && !(this.cardNumber.value.toString().length != 16 || this.cardNumber.value < 0) && this.expiryDate.value() != ""))) {
      this.cardInfo = true;
      this.currentticket = this.makeid(8);
      document.getElementById("ticketId").innerHTML = this.currentticket;
      this.matchService.addMatch(this.tsmatch.id, {
        aId: this.tsmatch.aId,
        bId: this.tsmatch.bId,
        aScore: this.tsmatch.aScore,
        bScore: this.tsmatch.bScore,
        date: this.tsmatch.date,
        ticketsLeft: this.tsmatch.ticketsLeft - this.numOfTickets.value,
        ticketPrice: this.tsmatch.ticketPrice,
        tournamentId: this.tsmatch.tournamentId,
        week: this.tsmatch.week,
        scorersId: this.tsmatch.scorersId
      })
     
      
      

      const doc = new jsPDF();
      const ta = document.getElementById('ticket');
      html2canvas(ta).then(content => {
      // let imgHeight = (content.height * 210 / content.width);
        const contentDataURL = content.toDataURL('image/png');
        let pdf = new jsPDF('p', 'mm', [content.height, content.width]);
        pdf.addImage(contentDataURL,'PNG',0,0,content.width,content.height);
        pdf.save("Tickets");
      });

      this.ticketService.addTicket(this.currentticket,{
        matchId: this.tsmatch.id,
        userId: this.userService.currentUser.id,
        number: this.numOfTickets.value
      });
      this.EEmitter.emit("close tournament-create");
    }
  }

  cardRadio() {
    this.cardRadioChecked = (document.getElementById("cardRadio") as HTMLInputElement).checked;
  }

  get favTeam() {
    return this.buyForm.get('favTeam');
  }

  get numOfTickets() {
    return this.buyForm.get('numOfTickets');
  }

  get paymentMethod() {
    return this.buyForm.get('paymentMethod');
  }

  get cardNumber() {
    return this.buyForm.get('cardNumber');
  }

  get cvv() {
    return this.buyForm.get('cvv');
  }

  get expiryDate() {
    return this.buyForm.get('expiryDate');
  }
  ngOnInit(): void {
    this.buyAttempt = false;
    this.cardInfo = true;
    this.userService.getCurrentUser();
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

}
