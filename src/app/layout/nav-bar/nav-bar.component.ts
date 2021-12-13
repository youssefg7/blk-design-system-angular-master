import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private authService: AuthService) { }

  ngOnInit(): void {
   // this.authService.getCurrentUser();
  }

  logout(): void {
    this.afAuth.signOut();
  }

}
