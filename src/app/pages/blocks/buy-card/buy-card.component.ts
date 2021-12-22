import { Component, Input, OnInit } from '@angular/core';
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
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-buy-card',
  templateUrl: './buy-card.component.html',
  styleUrls: ['./buy-card.component.scss']
})
export class BuyCardComponent implements OnInit {

  constructor(private userService: UserService, private tournamentService: TournamentService, private teamService: TeamService, private matchService: MatchService) { }
  buyAttempt: boolean;
  cardInfo: boolean;
  cardRadioChecked: boolean;
  @Input() tsmatch: Match;
  @Input() firstTeam: Team;
  @Input() secondTeam: Team;
  @Input() tournament: Tournament;
  focus; focus1; focus2; focus3; focus4;

  buyForm = new FormGroup({
    favTeam: new FormControl('', [Validators.required]),
    numOfTickets: new FormControl(0, [Validators.required]),
    paymentMethod: new FormControl('', [Validators.required]),
    cardNumber: new FormControl(''),
    cvv: new FormControl(''),
    expiryDate: new FormControl(''),
  });

  onSubmitBuy(): void {
    console.log(this.paymentMethod.value);
    this.buyAttempt = true;
    if (this.buyForm.valid && (this.paymentMethod.value == "cash" || (this.cvv.value() != "" && this.cardNumber.value() != "" && this.expiryDate.value() != ""))) {
      this.cardInfo = true;
      this.matchService.addMatch(this.tsmatch.id, {
        aId: this.tsmatch.aId,
        bId: this.tsmatch.bId,
        aScore: this.tsmatch.aScore,
        bScore: this.tsmatch.bScore,
        date: this.tsmatch.date,
        ticketsLeft: this.tsmatch.ticketsLeft - this.numOfTickets.value,
        ticketPrice: this.tsmatch.ticketPrice,
        tournamentId: this.tsmatch.tournamentId,
        week: this.tsmatch.week
      })

      const doc = new jsPDF();
      const ta = document.getElementById('ticket');
      console.log('true');
      html2canvas(ta).then(content => {
        let imgWidth = 210;
        let imgHeight = (content.height * imgWidth / content.width);
        const contentDataURL = content.toDataURL('image/png');
        let pdf = new jsPDF();
        var position=0;
        console.log('true1');

        pdf.addImage(contentDataURL,'PNG',0,position,imgWidth,imgHeight);
        console.log('true2');

        pdf.save("Mabrook");
      })
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

}
