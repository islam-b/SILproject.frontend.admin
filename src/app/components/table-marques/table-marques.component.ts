import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MatPaginator, MatSort} from '@angular/material';
import { TableMarquesDataSource } from '../../dataSources/table-marques-datasource';
import {MarqueService} from '../../services/marque.service';
import {SupprimerMarqueComponent} from '../../pages/administration/supprimer-marque/supprimer-marque.component';
import {ModifierMarqueComponent} from '../../pages/administration/modifier-marque/modifier-marque.component';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {NouvelleMarqueComponent} from '../../pages/administration/nouvelle-marque/nouvelle-marque.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ViewUpdateService} from '../../services/view-update.service';
import {NouvelUtilisateurComponent} from '../../pages/administration/nouvel-utilisateur/nouvel-utilisateur.component';

@Component({
  selector: 'app-table-marques',
  templateUrl: './table-marques.component.html',
  styleUrls: ['./table-marques.component.css'],
  animations: [
      trigger('popOverState', [
      state('not', style({backgroundColor: 'transparent'})),
      state('changed', style({backgroundColor: '#68ffe1'})),
        transition('not => changed', animate('500ms ease-out')),
        transition('changed => not', animate('1000ms ease-in'))
      ])
  ]
})
export class TableMarquesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TableMarquesDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['Nom', 'Code', 'Logo', 'Gestion'];

  searchForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private marqueService: MarqueService,
              private view: ViewUpdateService, public dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource = new TableMarquesDataSource(this.view, this.marqueService, this.paginator, this.sort);
    this.searchForm = this.formBuilder.group({
      filter: ''
    });
  }

  nouvelUtilisateur(codeMarque) {
    let dialogRef: MatDialogRef<NouvelUtilisateurComponent> = this.dialog.open(NouvelUtilisateurComponent, {
      width: '50%'
    });
    dialogRef.componentInstance.selectedFab = codeMarque;
  }

  nouvelleMarque() {
    this.dialog.open(NouvelleMarqueComponent, {
      width: '35%'
    });
  }

  supprimerMarque(code) {
    let dialogRef: MatDialogRef<SupprimerMarqueComponent> = this.dialog.open(SupprimerMarqueComponent, {
      width: '35%'
    });
    dialogRef.componentInstance.CodeMarque = code;
  }

  modifierMarque(code, rowIndex) {
    let dialogRef: MatDialogRef<ModifierMarqueComponent> = this.dialog.open(ModifierMarqueComponent, {
      width: '35%'
    });
    dialogRef.componentInstance.CodeMarque = code;
    dialogRef.componentInstance.rowIndex = rowIndex;
    console.log(rowIndex);
  }

  applyFilter(filterValue: string) {
    this.view.filter(filterValue);
  }


  getStateName(index) {
    return this.view.marquesStates[index] ? 'changed' : 'not';
  }
}
