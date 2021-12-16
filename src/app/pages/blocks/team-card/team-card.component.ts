import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Team } from 'src/app/models/team.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent implements OnInit {
  users$: Observable<Array<User>> = this.userService.users$;
  userList:User[];
  additionText:string;


  @Output() teamAddedId: EventEmitter<string> = new EventEmitter<string>();
  @Input() tsteam:Team;
  @Input() showUser:boolean;
  @Input() added:boolean;


  constructor(private userService : UserService) { }

  ngOnInit(): void {

    this.users$.subscribe( queriedItems => {
      console.log(queriedItems);
      this.userList = queriedItems;
      return queriedItems;
    });
    

  }

  getUser(user:string):User{
    return this.userList.find(x => x.id == user);
  }

  addTeam(){
    this.teamAddedId.emit(this.tsteam.id);
  }

}
