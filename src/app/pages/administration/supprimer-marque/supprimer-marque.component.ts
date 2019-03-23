import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormBuilder} from '@angular/forms';
import {MarqueService} from '../../../services/marque.service';
import {ViewUpdateService} from '../../../services/view-update.service';

@Component({
  selector: 'app-supprimer-marque',
  templateUrl: './supprimer-marque.component.html',
  styleUrls: ['./supprimer-marque.component.scss']
})
export class SupprimerMarqueComponent implements OnInit {

  CodeMarque ;
  errorMsg = '';
  isLoading = false;
  constructor(public dialogRef: MatDialogRef<SupprimerMarqueComponent>, private marqueService: MarqueService,
             private view: ViewUpdateService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}

  onConfirm() {
    this.isLoading = true;
    this.marqueService.deleteMarque(this.CodeMarque).subscribe( data => {
        this.view.hideDeletedMarque(this.CodeMarque);
        this.isLoading = false;
        this.onNoClick();
    }, error => {
      this.errorMsg = error;
      this.isLoading = false;
    });
  }

}
