import { Component, OnInit, OnDestroy, TemplateRef } from "@angular/core";
import { FormControl, FormGroup, Validators} from "@angular/forms";
import { BsModalService, BsModalRef, ModalOptions } from "ngx-bootstrap/modal";
import { UserService } from "src/app/services/user.service";
import { AuthService } from "src/app/services/auth.service";
import { Observable } from "rxjs";
import { User } from "src/app/models/user.model";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-profilepage",
  templateUrl: "profilepage.component.html"
})
export class ProfilepageComponent implements OnInit, OnDestroy {
  
  users$: Observable<Array<User>> = this.userService.users$;
  userList:any;
  userId:string = this.cookieService.get('Uid');

  accountDetails = new FormGroup({
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    favTeam: new FormControl('')
  })

  modalRef?: BsModalRef;
  isCollapsed = true;
  constructor(private modalService: BsModalService, public userService:UserService, private cookieService:CookieService) {}

  ngOnInit() {
    console.log(this.cookieService.get('Uid'));
    this.users$.subscribe( queriedItems => {
      console.log(queriedItems);
      this.userList = queriedItems;
      return queriedItems;
    });
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");
    this.userService.getCurrentUser();
    //(document.getElementById("userName") as HTMLInputElement).value = this.userService.currentUser.name;

  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("profile-page");
  }

  test(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
    console.log(this.cookieService.get('Uid'));

  }

  getAdmin(){
    if(this.userService.currentUser.isAdmin){
      return "Oragnizer"
    }
    return "Regular";
  }

  
}
