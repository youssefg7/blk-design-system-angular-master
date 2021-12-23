import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule} from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MatGridListModule } from '@angular/material/grid-list';
import { ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { TabsModule } from "ngx-bootstrap/tabs";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { AlertModule } from "ngx-bootstrap/alert";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { ModalModule } from "ngx-bootstrap/modal";
import { JwBootstrapSwitchNg2Module } from "jw-bootstrap-switch-ng2";
import { PopoverModule } from "ngx-bootstrap/popover";

import { IndexComponent } from "./index/index.component";
import { ProfilepageComponent } from "./profilepage/profilepage.component";
import { RegisterpageComponent } from "./registerpage/registerpage.component";
import { LandingpageComponent } from "./examples/landingpage/landingpage.component";
import { MatchesComponent } from './matches/matches.component';
import { MatchCardComponent } from './blocks/match-card/match-card.component';
import { TeamCardComponent } from './blocks/team-card/team-card.component';
import { ManagepageComponent } from './managepage/managepage.component';
import { ManageTeamsComponent } from './blocks/manage-teams/manage-teams.component';
import { TeamCreateComponent } from './blocks/team-create/team-create.component';
import { ManageTournamentsComponent } from './blocks/manage-tournaments/manage-tournaments.component';
import { TournamentCreateComponent } from './blocks/tournament-create/tournament-create.component';
import { BuyCardComponent } from './blocks/buy-card/buy-card.component';
import { MatchManageComponent } from './blocks/match-manage/match-manage.component';
import { TicketComponent } from './blocks/ticket/ticket.component';
import { StatspageComponent } from './statspage/statspage.component';
import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    MatGridListModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      maxOpened:4,
      autoDismiss:true,
    }),
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    CollapseModule.forRoot(),
    JwBootstrapSwitchNg2Module,
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [
    IndexComponent,
    ProfilepageComponent,
    RegisterpageComponent,
    LandingpageComponent,
    MatchesComponent,
    MatchCardComponent,
    TeamCardComponent,
    ManagepageComponent,
    ManageTeamsComponent,
    TeamCreateComponent,
    ManageTournamentsComponent,
    TournamentCreateComponent,
    BuyCardComponent,
    MatchManageComponent,
    TicketComponent,
    StatspageComponent,
    HomepageComponent
  ],
  exports: [
    IndexComponent,
    ProfilepageComponent,
    RegisterpageComponent,
    LandingpageComponent,
  ],
  providers: []
})
export class PagesModule {}
