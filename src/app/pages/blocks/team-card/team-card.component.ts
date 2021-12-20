import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Team } from 'src/app/models/team.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Player } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/services/player.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent implements OnInit {
  users$: Observable<Array<User>> = this.userService.users$;
  userList: User[];
  players$: Observable<Array<Player>> = this.playerService.players$;
  playerList: Player[];

  additionText: string;
  modalRef?: BsModalRef;
  addedPlayers: string[] = [""];
  playerNameEmpty: boolean;
  @Output() teamAddedId: EventEmitter<string> = new EventEmitter<string>();
  @Input() tsteam: Team;
  @Input() showUser: boolean;
  @Input() added: boolean;


  constructor(private userService: UserService, private modalService: BsModalService, private playerService: PlayerService, private teamService: TeamService) { }

  ngOnInit(): void {
    this.playerNameEmpty = false;
    this.users$.subscribe(queriedItems => {
      this.userList = queriedItems;
      return queriedItems;
    });

    this.players$.subscribe(queriedItems => {
      this.playerList = queriedItems;
      return queriedItems;
    });

    this.addedPlayers = this.tsteam.playersId;
  }

  filterFunction(player: Player): string {
    return player.id;
  }

  getUser(user: string): User {
    return this.userList.find(x => x.id == user);
  }

  addPlayer() {
    if ((document.getElementById("playerName") as HTMLInputElement).value == "") {
      this.playerNameEmpty = true;
    } else {
      this.playerNameEmpty = false;
      const playerId = this.makeid(10);
      this.addedPlayers.push(playerId);
      this.playerService.addPlayer(playerId, {
        name: (document.getElementById("playerName") as HTMLInputElement).value,
        teamId: this.tsteam.id,
        totalScore: 0,
      });
    }

  }

  removePlayer(player: string) {
    this.addedPlayers = this.addedPlayers.filter(x => x != player);
  }

  getPlayer(player: string) {
    return this.playerList.find(x => x.id == player);
  }

  addTeam() {
    this.teamAddedId.emit(this.tsteam.id);
  }

  openEditMenu(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'modal-lg' }));
  }

  editTeam() {
    this.teamService.updateTeam(this.tsteam.id, {
      name: this.tsteam.name,
      pictureUrl: this.tsteam.pictureUrl,
      userId: this.tsteam.userId,
      playersId: this.addedPlayers
    });
    this.modalRef.hide();
  }

  makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

}
