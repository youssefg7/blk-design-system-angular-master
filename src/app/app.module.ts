import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { PagesModule } from "./pages/pages.module";
import { LayoutModule } from "./layout/layout.module";
import { UserService } from "./services/user.service";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { MatGridListModule} from '@angular/material/grid-list';
import { AngularFireModule } from  '@angular/fire/compat';
import { AngularFirestoreModule } from  '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import {
  collection,
  doc,
  docData,
  DocumentReference,
  CollectionReference,
  Firestore,
  onSnapshot,
  query,
  where,
  Unsubscribe,
  Query,
  DocumentData,
  collectionData,
  collectionChanges,
  docSnapshots
} from "@angular/fire/firestore";
import { UsersService } from "./services/users.service";


@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    LayoutModule,
    PagesModule,
    ReactiveFormsModule,
    MatGridListModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    AngularFireDatabaseModule,
  ],
  providers: [UserService, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){}
}
