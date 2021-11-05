import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private angularFirestore:AngularFirestore) { }

  getMatchDoc(id) {
    return this.angularFirestore
    .collection('matches-collection')
    .doc(id)
    .valueChanges()
  }

  getMatchesList() { 
    return this.angularFirestore
    .collection("matches-collection")
    .snapshotChanges();
  }

  addMatch(match: any) { //Modify any to Match
    return new Promise<any>((resolve, reject) =>{
      this.angularFirestore
        .collection("matches-collection")
        .add(match)
        .then(response => { console.log(response) }, error => reject(error));
    });
  }

  deleteMatch(match) {
    return this.angularFirestore
      .collection("matches-collection")
      .doc(match.id)
      .delete();
  }
  
  updateMatch(match: any, id) {   //Modify any to Match
    return this.angularFirestore
      .collection("matches-collection")
      .doc(id)
      .update({
        /*name: user.name,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin*/
      });
  }


}
