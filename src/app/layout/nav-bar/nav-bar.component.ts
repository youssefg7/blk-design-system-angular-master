import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) {
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.afAuth.signOut();
  }
}
