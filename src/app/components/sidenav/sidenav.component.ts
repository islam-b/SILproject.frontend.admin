import { Component, OnInit } from '@angular/core';
import {ViewUpdateService} from '../../services/view-update.service';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material';
import {NouvelleMarqueComponent} from '../../pages/administration/nouvelle-marque/nouvelle-marque.component';
import {NouvelUtilisateurComponent} from '../../pages/administration/nouvel-utilisateur/nouvel-utilisateur.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  selectedItem: number;
  subscription: Subscription;
  constructor(private view: ViewUpdateService, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.subscription = this.view.selectedItemSubject.subscribe(item => {
      this.selectedItem = item;
    });
    this.view.emitSelectedItem();
  }

  nouvelleMarque() {
    this.dialog.open(NouvelleMarqueComponent, {
      width: '35%'
    });
  }

  nouvelUtilisateur() {
    this.dialog.open(NouvelUtilisateurComponent, {
      width: '50%'
    });
  }
  navigateToGestionMarques() {
    this.selectedItem = 1;
    this.router.navigate(['/admin/admin-marques']);
  }
  navigateToGestionUtilisateurs() {
    this.selectedItem = 3;
    this.router.navigate(['/admin/admin-utilfab']);
  }
  navigateToUtilisateursBloques() {
    this.selectedItem = 5;
    this.router.navigate(['/admin/utilfab-bloques']);
  }

}
