import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from "@angular/router";
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.scss']
})
export class RegisterpageComponent implements OnInit, OnDestroy {

  registerAttempt:boolean;
  loginAttempt:boolean;
  users$: Observable<Array<User>> = this.userService.users$;
  userList:any;
  focus; focus1; focus2; focus3; focus4;

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    isAdmin: new FormControl(false)
  });

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private router: Router ,private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.users$.subscribe( queriedItems => {
      console.log(queriedItems);
      this.userList = queriedItems;
      return queriedItems;
    });
    if (this.authService.userLoggedIn) {                       // if the user's logged in, navigate them to the dashboard (NOTE: don't use afAuth.currentUser -- it's never null)
      this.router.navigate(['home']);
    }
    this.registerAttempt = false;
    this.loginAttempt = false;
  }


  onSubmitRegister(): void {
    console.log(this.registerForm.value.name + 'successfully added');
    console.log('register fn');
    this.registerAttempt = true;
    if (this.registerForm.valid) {
      this.registerAttempt = false;
      this.authService.signupUser(this.registerForm.value).then((result) => {
        if (result == null) {
          this.userService.addUser(this.registerForm.value); //error in this line due to circulation of service dependencies: https://angular.io/errors/NG0200
          document.getElementById("failedRegister").style.display = "none";
          document.getElementById("successRegister").style.display = "block";
        } else if (result.isvalid == false) {
          document.getElementById("failedRegister").style.display = "block";
          document.getElementById("successRegister").style.display = "none";
        }

      })
    }
  }

  onSubmitLogin(): void {
    console.log(this.loginForm.value);
    console.log('login fn');
    this.loginAttempt = true;
    if (this.loginForm.valid) {
      this.loginAttempt = false;
      this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).then((result) => {
        if (result == null) {
          document.getElementById("failedLogin").style.display = "none";
          this.router.navigate(["home"]);
        }
        else if (result.isValid == false) {
          document.getElementById("failedLogin").style.display = "block";
        }
      })
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
