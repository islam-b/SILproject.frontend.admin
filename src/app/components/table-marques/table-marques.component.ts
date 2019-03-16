import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MatPaginator, MatSort} from '@angular/material';
import { TableMarquesDataSource } from '../../dataSources/table-marques-datasource';
import {MarqueService} from '../../services/marque.service';
import {SupprimerMarqueComponent} from '../../pages/administration/supprimer-marque/supprimer-marque.component';

@Component({
  selector: 'app-table-marques',
  templateUrl: './table-marques.component.html',
  styleUrls: ['./table-marques.component.css']
})
export class TableMarquesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TableMarquesDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['Nom', 'Code', 'Logo', 'Gestion'];

  constructor(private marqueService: MarqueService, public dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource = new TableMarquesDataSource(this.marqueService, this.paginator, this.sort);
  }

  supprimerMarque(code) {
    let dialogRef: MatDialogRef<SupprimerMarqueComponent> = this.dialog.open(SupprimerMarqueComponent, {
      width: '35%'
    });
    dialogRef.componentInstance.CodeMarque = code;
  }
}
