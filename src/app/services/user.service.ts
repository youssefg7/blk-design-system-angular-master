import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users = [];

  constructor(private angularFirestore:AngularFirestore) { }

  getUserDoc(id) {
    return this.angularFirestore
    .collection('users-collection')
    .doc(id)
    .valueChanges()
  }

  getUserList() { 
    return this.angularFirestore
    .collection("users-collection")
    .snapshotChanges();
  }

  addUser(user: User) {
    return new Promise<any>((resolve, reject) =>{
      this.angularFirestore
        .collection("users-collection")
        .add(user)
        .then(response => { console.log(response) }, error => reject(error));
    });
  }

  deleteUser(user) {
    return this.angularFirestore
      .collection("users-collection")
      .doc(user.id)
      .delete();
  }
  
  updateUser(user: User, id) {
    return this.angularFirestore
      .collection("users-collection")
      .doc(id)
      .update({
        name: user.name,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin
      });
  }
}
