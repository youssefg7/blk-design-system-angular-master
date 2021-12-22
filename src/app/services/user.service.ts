import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersCollection: AngularFirestoreCollection<User>;
  users$: Observable<User[]>;
  currentUser: User;

  constructor(private afs: AngularFirestore, private authService:AuthService, private cookieService:CookieService) {
    this.usersCollection = afs.collection<User>('users');
    this.users$ = this.usersCollection.valueChanges({idField:'id'})
   }

   addUser(id:string,user:User){
    this.usersCollection.doc(id).set(user);
  }

  getCurrentUser(){
    this.usersCollection.doc(this.cookieService.get('Uid')).valueChanges({idField:'id'}).subscribe( item => {this.currentUser = item;});
  }
}
