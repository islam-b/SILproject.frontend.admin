import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule} from './material';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { AuthentificationService} from './services/authentifaction.service';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AcceuilComponent } from './pages/acceuil/acceuil.component';
import {AuthGuard} from './services/guards/authentificationGuard';


@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    AcceuilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthentificationService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
