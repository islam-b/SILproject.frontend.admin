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
import { NouvelleMarqueComponent } from './nouvelle-marque/nouvelle-marque.component';
import {MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';
import {TableMarquesComponent} from '../../components/table-marques/table-marques.component';
import { ModifierMarqueComponent } from './modifier-marque/modifier-marque.component';
import { SupprimerMarqueComponent } from './supprimer-marque/supprimer-marque.component';

@NgModule({
  declarations: [AdminUtilfabComponent, AdminMarquesComponent, AdminComponent,
    HeaderComponent, FooterComponent, SidenavComponent, NouvelleMarqueComponent,  TableMarquesComponent, ModifierMarqueComponent, SupprimerMarqueComponent],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  entryComponents: [NouvelleMarqueComponent, SupprimerMarqueComponent],
  providers: [AuthentificationService, AuthGuard],

})
export class AdministrationModule { }
