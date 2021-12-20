import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Match } from 'src/app/models/match.model';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { TournamentService } from 'src/app/services/tournament.service';
import { TeamService } from 'src/app/services/team.service';
import { Team } from 'src/app/models/team.model';
import { Tournament } from 'src/app/models/tournament.model';

@Component({
  selector: 'app-buy-card',
  templateUrl: './buy-card.component.html',
  styleUrls: ['./buy-card.component.scss']
})
export class BuyCardComponent implements OnInit {

  constructor(private tournamentService : TournamentService,private teamService:TeamService) { }
  buyAttempt: boolean;
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
    this.buyAttempt = true;
    console.log(this.buyForm.value );
    if(this.buyForm.valid){
      const doc = new jsPDF();

      doc.text(this.tsmatch.date,5,5);
      doc.text("Tickets for ",5,10);
      doc.save("A7la"+"Tickets");
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
    this.buyAttempt=false;
  }

}
