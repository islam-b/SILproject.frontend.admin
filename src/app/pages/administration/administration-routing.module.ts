import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './admin/admin.component';
import {AdminMarquesComponent} from './admin-marques/admin-marques.component';
import {AdminUtilfabComponent} from './admin-utilfab/admin-utilfab.component';
import {AuthGuard} from '../../services/guards/authentificationGuard';
import {UtilisateursBloquesComponent} from './utilisateurs-bloques/utilisateurs-bloques.component';


const routes: Routes = [

  {path: 'admin', canActivate: [AuthGuard],  component: AdminComponent, children: [
      {path: 'admin-marques', component: AdminMarquesComponent},
      {path: 'admin-utilfab', component: AdminUtilfabComponent},
      {path: 'utilfab-bloques', component: UtilisateursBloquesComponent}
    ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
