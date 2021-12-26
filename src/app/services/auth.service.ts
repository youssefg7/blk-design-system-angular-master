import { Injectable,OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Observable, from, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  registeredUserid:any;
  userLoggedIn:boolean;
  isPaused:boolean;
  cred;
  



  constructor(private toastr:ToastrService, private userService:UserService,private router: Router, private afAuth: AngularFireAuth, private cookieService:CookieService, private afs:AngularFirestore) { 
    this.userLoggedIn = false;
    this.cred = this.afAuth.onAuthStateChanged((user) => {
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
        this.cookieService.set('Uid',result.user.uid);
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

  async authUpdatePassword(pass:string){
    
    this.afAuth.authState.subscribe( item => item.updatePassword(pass).then(() => {
      this.toastr.success('Success!', 'Password Changed', {
        timeOut: 3000,
      });
      this.afs.collection<User>('users').doc(this.cookieService.get('Uid')).update({password:pass});
    }).catch((error) => {
      if(pass.length < 6){
        this.toastr.error('has to be more than 6 char','New Password invalid' , {
          timeOut: 3000,
        });
      }else{
        console.log(error);
        this.toastr.error('Please Logout and back in again before changing password', 'Security Check!', {
          timeOut: 3000,
        });
      }
    }));
   
  }

    
}


