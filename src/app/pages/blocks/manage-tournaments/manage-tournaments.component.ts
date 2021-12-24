import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Match } from 'src/app/models/match.model';
import { Tournament } from 'src/app/models/tournament.model';
import { TournamentService } from 'src/app/services/tournament.service';
import { MatchService } from 'src/app/services/match.service';
import { Observable } from 'rxjs';
import { Team } from 'src/app/models/team.model';
import { TeamService } from 'src/app/services/team.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-manage-tournaments',
  templateUrl: './manage-tournaments.component.html',
  styleUrls: ['./manage-tournaments.component.scss']
})
export class ManageTournamentsComponent implements OnInit {
  tournaments$: Observable<Array<Tournament>> = this.tournamentService.tournaments$;
  tournamentList:Tournament[];
  matches$: Observable<Array<Match>> = this.matchService.matches$;
  matchList:Match[];
  teams$: Observable<Array<Team>> = this.teamService.teams$;
  teamList:Team[];
  @Input() condition;
  modalRef?: BsModalRef;
  totalSold:number;
  totalRevenue:number;
  totalTickets:number;
 

  constructor(private teamService:TeamService, private modalService:BsModalService, private tournamentService:TournamentService, private matchService:MatchService) { }

  ngOnInit(): void {
    this.tournaments$.subscribe( queriedItems => {
      this.tournamentList = queriedItems;
      return queriedItems;
    });
    this.matches$.subscribe( queriedItems => {
      this.matchList = queriedItems;
      return queriedItems;
    });
    this.teams$.subscribe( queriedItems => {
      this.teamList = queriedItems;
      return queriedItems;
    });
  }

  openMenu(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'modal-lg' }));
  } 


  getMatch(match:string):Match{
    return this.matchList.find(x => x.id === match);
  }

  getTeam(team:string):Team{
    return this.teamList.find(x => x.id === team);
  }

  calculate(tour:Tournament){
    this.totalSold = 0;
    for(let i = 0; i< tour.matchesId.length; i++){
      this.totalSold = this.totalSold + tour.tickets - this.getMatch(tour.matchesId[i]).ticketsLeft;
    }
    this.totalTickets = tour.tickets * tour.matchesId.length;
    this.totalRevenue =  this.totalSold * this.getMatch(tour.matchesId[0]).ticketPrice;
  }

  onPdf(){
    const doc = new jsPDF();
      const ta = document.getElementById('myTable');
      html2canvas(ta).then(content => {
      // let imgHeight = (content.height * 210 / content.width);
        const contentDataURL = content.toDataURL('image/png');
        let pdf = new jsPDF('l', 'mm', [content.height, content.width]);
        pdf.addImage(contentDataURL,'PNG',0,0,content.width,content.height);
        pdf.save("Sales Report");
      });
  }

}
