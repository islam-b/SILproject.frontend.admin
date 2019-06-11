import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { TableUtilisateursBloquesDataSource } from '../../dataSources/table-utilisateurs-bloques-datasource';
import {FormBuilder} from '@angular/forms';
import {UtilisateurfabricantService} from '../../services/utilisateurfabricant.service';
import {ViewUpdateService} from '../../services/view-update.service';

@Component({
  selector: 'app-table-utilisateurs-bloques',
  templateUrl: './table-utilisateurs-bloques.component.html',
  styleUrls: ['./table-utilisateurs-bloques.component.css']
})
export class TableUtilisateursBloquesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TableUtilisateursBloquesDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['Id', 'Photo', 'Nom', 'Prénom', 'Fabricant', 'Compte' ];

  constructor(private utilfabService: UtilisateurfabricantService, private view: ViewUpdateService) {}

  ngOnInit() {
    this.dataSource = new TableUtilisateursBloquesDataSource(this.view, this.utilfabService, this.paginator, this.sort);
  }
  toggleblock(id, value) {

    this.utilfabService.setBlock(id, {Bloque: !value.checked}).subscribe( () => {}, error => {});
  }
}
