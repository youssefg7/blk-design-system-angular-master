import { Injectable,OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  registeredUserid:any;
  userLoggedIn:boolean;
  isPaused:boolean;
  



  constructor(private router: Router, private afAuth: AngularFireAuth, private cookieService:CookieService) { 
    this.userLoggedIn = false;
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.userLoggedIn = true;
        this.cookieService.set('Uid',user.uid);
      } else {
        this.userLoggedIn = false;
        this.cookieService.delete('Uid');
      }
    })
  }

  loginUser(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Auth Service: loginUser: success');
        this.router.navigate(['home']);
      })
      .catch(error => {
        console.log('Auth Service: login error...');
        console.log('error code', error.code);
        console.log('error', error);
        if (error.code)
          return { isValid: false, message: error.message };
      });
  }

  signupUser(user: any): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        let emailLower = user.email.toLowerCase();
        this.registeredUserid = result.user.uid;
      })
      .catch(error => {
        console.log('Auth Service: signup error', error);
        if (error.code)
          return { isValid: false, message: error.message };
      });
  }

  resetPassword(email: string): Promise<any> {
    return this.afAuth.sendPasswordResetEmail(email)
      .then(() => {
        console.log('Auth Service: reset password success');
        // this.router.navigate(['/amount']);
      })
      .catch(error => {
        console.log('Auth Service: reset password error...');
        console.log(error.code);
        console.log(error)
        if (error.code)
          return error;
      });
  }


  logoutUser(): Promise<void> {
    return this.afAuth.signOut()
      .then(() => {
        this.router.navigate(['/home']);                    // when we log the user out, navigate them to home
      })
      .catch(error => {
        console.log('Auth Service: logout error...');
        console.log('error code', error.code);
        console.log('error', error);
        if (error.code)
          return error;
      });
  }

  authUpdatePassword(pass:string){
    this.afAuth.authState.subscribe( item => {return item.updatePassword(pass);});
  }

    
}


