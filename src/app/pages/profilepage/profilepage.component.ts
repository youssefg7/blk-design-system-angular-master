import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: "app-profilepage",
  templateUrl: "profilepage.component.html"
})
export class ProfilepageComponent implements OnInit, OnDestroy {
  
  accountDetails = new FormGroup({
    name: new FormControl('Youssef', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    favTeam: new FormControl('')
  })

  isCollapsed = true;
  constructor() {}

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");
    document.getElementById("userEmail").innerText = "ygfssms@gmail.com";
    (document.getElementById("userName") as HTMLInputElement).value = "Youssef George";

  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("profile-page");
  }
}
