import { Injectable } from '@angular/core';
import { Team } from '../models/team.model';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private teamsCollection: AngularFirestoreCollection<Team>;
  teams$: Observable<Team[]>;

  constructor(private afs: AngularFirestore) {
    this.teamsCollection = afs.collection<Team>('teams');
    this.teams$ = this.teamsCollection.valueChanges({idField:'id'});
   }

   addTeam(team:Team):Observable<DocumentReference>{
    return from(this.teamsCollection.add(team));
  }
  updateTeam(id:string, team : Team){
    this.teamsCollection.doc(id).update(team);
}

}
