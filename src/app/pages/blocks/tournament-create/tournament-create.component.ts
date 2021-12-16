import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tournament-create',
  templateUrl: './tournament-create.component.html',
  styleUrls: ['./tournament-create.component.scss']
})
export class TournamentCreateComponent implements OnInit {

  list:string[] = ["aaaa","bbb"];
  modalRef? : BsModalRef;

  constructor(private modalService:BsModalService, private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  async showImage(template : TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
    //await new Promise(f => setTimeout(f, 1000));
    //this.modalRef.hide();
 }

 start(){
  this.toastr.success('Hello world!', 'Toastr fun!', {
    timeOut:3000,
  });
 }

}
