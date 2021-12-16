import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, public userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCurrentUser();
  }

  logout(): void {
    this.afAuth.signOut();
  }

}
