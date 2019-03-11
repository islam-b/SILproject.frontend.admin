import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConnexionComponent} from './pages/connexion/connexion.component';
import {AuthGuard} from './services/guards/authentificationGuard';
import {AcceuilComponent} from './pages/acceuil/acceuil.component';

const routes: Routes = [
  {path: 'connexion', component: ConnexionComponent},
  {path: 'acceuil', canActivate: [AuthGuard], component: AcceuilComponent},
  {path: '', redirectTo: 'acceuil', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
