import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './admin/admin.component';
import {AdminMarquesComponent} from './admin-marques/admin-marques.component';
import {AdminUtilfabComponent} from './admin-utilfab/admin-utilfab.component';
import {AuthGuard} from '../../services/guards/authentificationGuard';


const routes: Routes = [

  {path: 'admin', canActivate: [AuthGuard],  component: AdminComponent, children: [
      {path: 'admin-marques', component: AdminMarquesComponent},
      {path: 'admin-utilfab', component: AdminUtilfabComponent}
    ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
