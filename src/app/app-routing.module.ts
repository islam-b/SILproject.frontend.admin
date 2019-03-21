import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConnexionComponent} from './pages/connexion/connexion.component';
import {ConfirmationCompteComponent} from './pages/confirmation-compte/confirmation-compte.component';

const routes: Routes = [
  {path: 'connexion', component: ConnexionComponent},
  {path: 'confirmation/:id/:token', component: ConfirmationCompteComponent},
  {path: '', redirectTo: 'admin/admin-marques', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
