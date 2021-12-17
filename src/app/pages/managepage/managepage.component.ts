import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-managepage',
  templateUrl: './managepage.component.html',
  styleUrls: ['./managepage.component.scss']
})
export class ManagepageComponent implements OnInit {

  constructor(public userService : UserService, private modalService: BsModalService, public cookieService: CookieService, public afAuth:AngularFireAuth) { }

  modalRef?: BsModalRef;
  

  ngOnInit(): void {
    this.userService.getCurrentUser();
  }


  openMenu(template : TemplateRef<any>){
     this.modalRef = this.modalService.show(template);
  }

  eventHandle(event){
    this.modalRef.hide();
  }

}
