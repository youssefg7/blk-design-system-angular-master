import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule} from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";


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

import { PagesModule } from "./pages/pages.module";
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { MatGridListModule } from '@angular/material/grid-list';
import { IndexComponent } from "./pages/index/index.component";
import { ProfilepageComponent } from "./pages/profilepage/profilepage.component";
import { RegisterpageComponent } from "./pages/registerpage/registerpage.component";
import { LandingpageComponent } from "./pages/examples/landingpage/landingpage.component";
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent
    // IndexComponent,
    // ProfilepageComponent,
    // RegisterpageComponent,
    // LandingpageComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TooltipModule,
    RouterModule,
    AppRoutingModule,
    AngularFireAuthModule,
    PagesModule,
    MatGridListModule,
    // BsDropdownModule.forRoot(),
    // ProgressbarModule.forRoot(),
    // TooltipModule.forRoot(),
    // CollapseModule.forRoot(),
    // TabsModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    // PaginationModule.forRoot(),
    // AlertModule.forRoot(),
    // BsDatepickerModule.forRoot(),
    // CarouselModule.forRoot(),
    // ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
