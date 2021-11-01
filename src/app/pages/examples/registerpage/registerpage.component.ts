import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import { FormGroup, FormBuilder, FormArray, FormControl } from "@angular/forms";
@Component({
  selector: "app-registerpage",
  templateUrl: "registerpage.component.html"
})
export class RegisterpageComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  focus;
  focus1;
  focus2;
  registerForm = new FormGroup({
    name: new FormControl(),
    password: new FormControl(),
    email: new FormControl(),
    isAdmin: new FormControl()
  });
  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  })
  constructor(private fb: FormBuilder) { }


  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("register-page");
  }
  

  
  onSubmitRegister(): void {
    console.log(this.registerForm.value);
    console.log('register fn');
  }
  onSubmitLogin(): void {
    console.log(this.loginForm.value);
    console.log('login fn');
  }
  
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("register-page");
  }
}
