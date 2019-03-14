import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MarqueDataSource} from '../../../dataSources/marqueDataSource';
import {MarqueService} from '../../../services/marque.service';


@Component({
  selector: 'app-admin-marques',
  templateUrl: './admin-marques.component.html',
  styleUrls: ['./admin-marques.component.scss']
})
export class AdminMarquesComponent implements OnInit {


  displayedColumns: string[] = ['CodeMarque', 'NomMarque', 'Logo'];
  private dataSource: MarqueDataSource;

  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private marqueService: MarqueService) { }

  ngOnInit() {
    this.dataSource = new MarqueDataSource(this.marqueService);
    this.searchForm = this.formBuilder.group({
      recherche: ''
    });
  }

}
