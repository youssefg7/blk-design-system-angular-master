import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
import { collection, collectionData, DocumentSnapshot, Firestore, getDocs, getFirestore } from '@angular/fire/firestore';
import { DocumentData } from 'rxfire/firestore/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dbPath = '/users';

  tutorialsRef: AngularFirestoreCollection<User>;

  public users : User[];
  db = getFirestore();


  constructor(private angularFirestore:AngularFirestore) {
    this.tutorialsRef = angularFirestore.collection(this.dbPath);
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
<<<<<<< HEAD
=======

  checkLoginInfo(email:string, password: string){
    /*this.angularFirestore.collection("user-collection").get().then(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
      this.users.push(doc.data());
    });
  });
    
    this.getUserList().subscribe(res => {
      this.users = res.map( e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as User;
      })
    });*/
  }


>>>>>>> 360edd490139cf592cef5533050c402d88f31562
}
