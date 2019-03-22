import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConnexionComponent} from './pages/connexion/connexion.component';


const routes: Routes = [
  {path: 'connexion', component: ConnexionComponent},
  {path: '', redirectTo: 'admin/admin-marques', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
