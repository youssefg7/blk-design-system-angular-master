import { Injectable } from '@angular/core';
import { Match } from '../models/match.model';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private matchesCollection: AngularFirestoreCollection<Match>;
  matches$: Observable<Match[]>;

  constructor(private afs: AngularFirestore) {
    this.matchesCollection = afs.collection<Match>('matches');
    this.matches$ = this.matchesCollection.valueChanges({idField:'id'})
   }

   addMatch(match:Match):Observable<DocumentReference>{
    return from(this.matchesCollection.add(match));
  }

//to be tested
  updateMatch(match:Match):Observable<void>{
    return from(
      this.afs.doc<Match>('matches/${match.id}').update({
        aId: match.aId,
        bId: match.bId,
        aScore: match.aScore,
        bScore: match.bScore, 
        tournamentId: match.tournamentId,
        date: match.date,
      }),
    );
  }

}
