import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";


import { ProfilepageComponent } from "./pages/profilepage/profilepage.component";
import { RegisterpageComponent } from "./pages/registerpage/registerpage.component";
import { MatchesComponent } from "./pages/matches/matches.component";
import { ManagepageComponent } from "./pages/managepage/managepage.component";
import { StatspageComponent } from "./pages/statspage/statspage.component";
import { HomepageComponent } from "./pages/homepage/homepage.component";
import { StandingsComponent } from "./pages/standings/standings.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomepageComponent },
  { path: "statistics", component: StatspageComponent},
  { path: "matches", component: MatchesComponent },
  { path: "manage", component: ManagepageComponent },
  { path: "profile", component: ProfilepageComponent },
  { path: "register", component: RegisterpageComponent },
  { path: "standings", component: StandingsComponent },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: []
})
export class AppRoutingModule {}
