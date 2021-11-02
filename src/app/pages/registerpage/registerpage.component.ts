import { ThrowStmt } from "@angular/compiler";
import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from "@angular/forms";
import { UsersService } from "src/app/shared/users.service";
@Component({
  selector: "app-registerpage",
  templateUrl: "registerpage.component.html"
})
export class RegisterpageComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  focus;
  focus1;
  focus2;
  focus3;
  focus4;
  names = ["Youssef", "Mostafa", "Kiro", "Anthony"];
  nameOrder = [];
  registerAttempt;
  loginAttempt;

  addName = neme => {
    this.nameOrder.push(neme);
  }
  removeName = neme => {
    let index = this.nameOrder.indexOf(neme);
    if (index > -1) this.nameOrder.splice(index,1);
  }

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    isAdmin: new FormControl(false)
  });
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })
  constructor(private fb: FormBuilder, private usersService: UsersService) { }


  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("register-page");
    this.registerAttempt = false;
    this.loginAttempt = false;
  }



  onSubmitRegister(): void {
    console.log(this.registerForm.value);
    console.log('register fn');
    this.registerAttempt = true;
    if (this.registerForm.valid) {
      this.registerAttempt = false;
    }
  }
  onSubmitLogin(): void {
    console.log(this.loginForm.value);
    console.log('login fn');
    this.loginAttempt = true;
    if (this.loginForm.valid) {
      this.loginAttempt = false;
    }
  }

  get name() {
    return this.registerForm.get('name');
  }

  get newPassword() {
    return this.registerForm.get('password');
  }

  get newEmail() {
    return this.registerForm.get('email');
  }

  get isAdmin() {
    return this.registerForm.get('isAdmin');
  }

  get loginEmail() {
    return this.loginForm.get('email');
  }

  get loginPassword() {
    return this.loginForm.get('password');
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("register-page");
  }
}
