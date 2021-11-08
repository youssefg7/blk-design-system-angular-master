import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import { collection, doc, getDoc, getDocs, getFirestore } from "@angular/fire/firestore";
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from "@angular/forms";
import { map } from "rxjs/operators";
import { User, userConverter } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service"; //see line 60 for more info

@Component({
  selector: "app-registerpage",
  templateUrl: "registerpage.component.html"
})

export class RegisterpageComponent implements OnInit, OnDestroy {
  users: User[];
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
  db = getFirestore();

  onclick(){
    console.log("clicked");
    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("profileBtn").style.display = "block";
  }

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
  constructor(private fb: FormBuilder, private userService : UserService) { }


  async ngOnInit() {
  
    this.registerAttempt = false;
    this.loginAttempt = false;
    console.log(this.userService.getUserList());
    /*const docSnap = await getDoc( doc(this.db, "users", "pwci3ewPUZI8ltzfkS8C").withConverter(userConverter) );
    const user = docSnap.data();
    console.log(user.toString);
    
    const querySnapshot = await getDoc(collection(this.db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id}`);
    });
    //this.userService.fetchUsers();
    //this.users=this.userService.users;
    //this.users.forEach( (user) =>{
    //  console.log(`${user.id} => ${user.data()}`);
    //});*/
  }



  onSubmitRegister(): void {
    this.userService.addUser(this.registerForm.value); //error in this line due to circulation of service dependencies: https://angular.io/errors/NG0200
    console.log(this.registerForm.value.name + ' successfully added');
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
