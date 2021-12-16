import { Injectable } from '@angular/core';
import { Tournament } from '../models/tournament.model';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  private tournamentsCollection: AngularFirestoreCollection<Tournament>;
  tournaments$: Observable<Tournament[]>;

  constructor(private afs: AngularFirestore) {
    this.tournamentsCollection = afs.collection<Tournament>('tournaments');
    this.tournaments$ = this.tournamentsCollection.valueChanges({idField:'id'});
   }

   addTournament(id:string, tournament:Tournament)/*:Observable<DocumentReference>*/{
    //return from(this.tournamentsCollection.add(tournament));
    this.tournamentsCollection.doc(id).set(tournament);
  }

}
