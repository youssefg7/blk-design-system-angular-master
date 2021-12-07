import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';
import User from '../models/user.model';
//import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
//import 'rxjs/add/observable/of';
import { collection, collectionData, DocumentSnapshot, Firestore, getDocs, getFirestore } from '@angular/fire/firestore';
import { DocumentData } from 'rxfire/firestore/interfaces';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dbPath = '/users';

  tutorialsRef: AngularFirestoreCollection<User>;

  users : Observable<User[]>;
  db = getFirestore();




  constructor(private angularFirestore:AngularFirestore, firestore:Firestore) {
    const col = collection(firestore, 'users-collection');
    this.users = collectionData(col);
    //this.tutorialsRef = angularFirestore.collection(this.dbPath);
    //this.users = this.angularFirestore.collection('users').valueChanges();
  }

  getUsers(){
    return this.users;
  }
  
  getAll(): AngularFirestoreCollection<User> {
    return this.tutorialsRef;
  }

  getUserDoc(id) {
    return this.angularFirestore
    .collection('users-collection')
    .doc(id)
    .valueChanges()
  }

  getUserList() { 
    return this.angularFirestore
    .collection("users-collection").get().subscribe(data => {
      console.log(data.docs);
      ;
    });
  }


  /*fetchUser(){

    /*
    this.angularFirestore.collection('/users').snapshotChanges().pipe(
      map(changes => changes.map(c => {
        const data = c.payload.doc.data();
        const id = c.payload.doc.id;
        return {id, ...data} as User;
      }
        )
      )
    ).subscribe(data => {
      this.users = data;
    });
  }*/

  /*async fetchUsers(){
    const querySnapshot = await getDocs(collection(this.db, "users"));
    querySnapshot.forEach((doc) => {
      //console.log(`${doc.id} => ${doc.data()}`);
      this.users.push({doc.data()});
    });
  }*/

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
