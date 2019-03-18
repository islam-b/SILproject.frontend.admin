import { Component, OnInit } from '@angular/core';
import {ViewUpdateService} from '../../services/view-update.service';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material';
import {NouvelleMarqueComponent} from '../../pages/administration/nouvelle-marque/nouvelle-marque.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  selectedItem: number;
  subscription: Subscription;
  constructor(private view: ViewUpdateService, public dialog: MatDialog) { }

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

}
