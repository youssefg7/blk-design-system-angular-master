import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersCollection: AngularFirestoreCollection<User>;
  users$: Observable<User[]>;

  constructor(private afs: AngularFirestore) {
    this.usersCollection = afs.collection<User>('users');
    this.users$ = this.usersCollection.valueChanges({idField:'id'})
   }

   addUser(user:User):Observable<DocumentReference>{
    return from(this.usersCollection.add(user));
  }
}
