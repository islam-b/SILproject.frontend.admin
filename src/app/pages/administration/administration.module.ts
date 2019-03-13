import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUtilfabComponent } from './admin-utilfab/admin-utilfab.component';
import { AdminMarquesComponent } from './admin-marques/admin-marques.component';
import { AdminComponent } from './admin/admin.component';
import {AdministrationRoutingModule} from './administration-routing.module';
import {HeaderComponent} from '../../components/header/header.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {SidenavComponent} from '../../components/sidenav/sidenav.component';
import {BrowserModule} from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '../../material';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthentificationService} from '../../services/authentifaction.service';
import {AuthGuard} from '../../services/guards/authentificationGuard';

@NgModule({
  declarations: [AdminUtilfabComponent, AdminMarquesComponent, AdminComponent, HeaderComponent, FooterComponent, SidenavComponent],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthentificationService, AuthGuard],

})
export class AdministrationModule { }
