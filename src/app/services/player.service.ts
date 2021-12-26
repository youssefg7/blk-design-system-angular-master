import { Injectable } from '@angular/core';
import { Player } from '../models/player.model';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private playersCollection: AngularFirestoreCollection<Player>;
  players$: Observable<Player[]>;

  constructor(private afs: AngularFirestore) {
    this.playersCollection = afs.collection<Player>('players');
    this.players$ = this.playersCollection.valueChanges({idField:'id'})
   }

   addPlayer(id:string,player:Player){
    this.playersCollection.doc(id).set(player);
  }

  deletePlayer(id:string){
    this.playersCollection.doc(id).delete();
  }
}

