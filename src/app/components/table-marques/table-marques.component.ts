import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { TableMarquesDataSource } from './table-marques-datasource';
import {MarqueService} from '../../services/marque.service';

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

  constructor(private marqueService: MarqueService) {}

  ngOnInit() {
    this.dataSource = new TableMarquesDataSource(this.marqueService, this.paginator, this.sort);
  }
  onClick(Code) {
    console.log(Code);
  }
}
