import { Injectable } from '@angular/core';
import { Ticket } from '../models/ticket.model';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private ticketsCollection: AngularFirestoreCollection<Ticket>;
  tickets$: Observable<Ticket[]>;

  constructor(private afs: AngularFirestore) {
    this.ticketsCollection = afs.collection<Ticket>('tickets');
    this.tickets$ = this.ticketsCollection.valueChanges({idField:'id'});
   }

   addTicket(id:string,ticket:Ticket){
    this.ticketsCollection.doc(id).set(ticket);
  }
}
