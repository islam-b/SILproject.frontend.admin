import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-nouvelle-marque',
  templateUrl: './nouvelle-marque.component.html',
  styleUrls: ['./nouvelle-marque.component.scss']
})
export class NouvelleMarqueComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NouvelleMarqueComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
