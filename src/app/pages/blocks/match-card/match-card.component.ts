import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Match } from 'src/app/models/match.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.scss']
})
export class MatchCardComponent implements OnInit {
  @Input() tsmatch:Match;
  constructor(private modalService: BsModalService) { }

  modalRef?: BsModalRef;

  ngOnInit(): void {
  }
  openMenu(template : TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
 }

}
