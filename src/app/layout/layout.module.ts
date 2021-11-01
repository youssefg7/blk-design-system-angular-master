import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MasterComponentComponent } from './master-component/master-component.component';
import { PagesModule } from '../pages/pages.module';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [NavBarComponent, MasterComponentComponent],
  imports: [
    CommonModule,
    PagesModule,
    AppRoutingModule,
    RouterModule
  ],
  exports: [
    NavBarComponent,
    MasterComponentComponent
  ]
})
export class LayoutModule { }
