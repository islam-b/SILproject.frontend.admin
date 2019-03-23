import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {MarqueService} from '../../../services/marque.service';
import {ViewUpdateService} from '../../../services/view-update.service';
import {UtilisateurfabricantService} from '../../../services/utilisateurfabricant.service';

@Component({
  selector: 'app-supprimer-utilisateur',
  templateUrl: './supprimer-utilisateur.component.html',
  styleUrls: ['./supprimer-utilisateur.component.scss']
})
export class SupprimerUtilisateurComponent implements OnInit {

  idUtilisateur ;
  errorMsg = '';
  isLoading = false;
  constructor(public dialogRef: MatDialogRef<SupprimerUtilisateurComponent>, private utilfabService: UtilisateurfabricantService,
              private view: ViewUpdateService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}

  onConfirm() {
    this.isLoading = true;
    this.utilfabService.deleteUser(this.idUtilisateur).subscribe( data => {
      this.view.hideDeletedUser(this.idUtilisateur);
      this.isLoading = false;
      this.onNoClick();
    }, error => {
      this.errorMsg = error;
      this.isLoading = false;
    });
  }

}
