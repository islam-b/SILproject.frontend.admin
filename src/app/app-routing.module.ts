import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConnexionComponent} from './pages/connexion/connexion.component';
import {AuthGuard} from './services/guards/authentificationGuard';
import {AcceuilComponent} from './pages/acceuil/acceuil.component';
import {AdminComponent} from './pages/administration/admin/admin.component';

const routes: Routes = [
  {path: 'connexion', component: ConnexionComponent},
  {path: '', redirectTo: 'admin/admin-marques', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
