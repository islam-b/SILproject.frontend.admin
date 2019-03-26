import { BrowserModule } from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule} from './material';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { AuthentificationService} from './services/authentifaction.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuard} from './services/guards/authentificationGuard';
import {AdministrationModule} from './pages/administration/administration.module';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdministrationModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [AuthentificationService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
