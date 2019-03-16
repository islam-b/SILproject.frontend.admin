import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {MatDialog} from '@angular/material';
import {NouvelleMarqueComponent} from '../nouvelle-marque/nouvelle-marque.component';
import {SupprimerMarqueComponent} from '../supprimer-marque/supprimer-marque.component';


@Component({
  selector: 'app-admin-marques',
  templateUrl: './admin-marques.component.html',
  styleUrls: ['./admin-marques.component.scss']
})
export class AdminMarquesComponent implements OnInit {
  searchForm: FormGroup;
  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) {}

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      recherche: ''
    });
  }
  nouvelleMarque() {
    this.dialog.open(NouvelleMarqueComponent, {
      width: '35%'
    });
  }
}
