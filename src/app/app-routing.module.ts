import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { IndexComponent } from "./pages/index/index.component";
import { ProfilepageComponent } from "./pages/examples/profilepage/profilepage.component";
import { RegisterpageComponent } from "./pages/registerpage/registerpage.component";
import { LandingpageComponent } from "./pages/examples/landingpage/landingpage.component";
import { HomeComponent } from "./pages/home/home.component";
import { MatchCardComponent } from "./pages/match-card/match-card.component";
import { MatchesComponent } from "./pages/matches/matches.component";

const routes: Routes = [
  { path: "nazamly", component: HomeComponent },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "profile", component: ProfilepageComponent },
  { path: "register", component: RegisterpageComponent },
  { path: "login", component: RegisterpageComponent },
  { path: "matches", component: MatchesComponent },
  { path: "landing", component: LandingpageComponent },
  { path: "test", component: HomeComponent },
  { path: "index" , component:IndexComponent }
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
export class AppRoutingModule { }
