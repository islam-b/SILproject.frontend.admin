import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MarqueService} from '../../../services/marque.service';

@Component({
  selector: 'app-nouvelle-marque',
  templateUrl: './nouvelle-marque.component.html',
  styleUrls: ['./nouvelle-marque.component.scss']
})
export class NouvelleMarqueComponent implements OnInit {

  errorMsg = '';
  logoFile: File = null;
  fileName = 'Choisir une image';
  imgURL = '../../../../assets/images/no-photo.png';
  isLoading = false;
  nouvelleMarqueForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<NouvelleMarqueComponent>, private formBuilder: FormBuilder,
              private marqueService: MarqueService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.nouvelleMarqueForm = this.formBuilder.group({
      CodeMarque: '',
      NomMarque: '',
      imageMarque: ''
    });
  }

  checkForm(): boolean {
    return true;
  }

  onSubmit() {

    this.isLoading = true;
    if (this.checkForm()) {
      const marque = this.nouvelleMarqueForm.value;
      this.marqueService.newMarque({
        CodeMarque: marque.CodeMarque, NomMarque: marque.NomMarque}).subscribe( data1 => {
        this.marqueService.uploadLogoMarque(this.logoFile, marque.CodeMarque).subscribe( data2 => {
          this.isLoading = false;
        }, error => {
          this.errorMsg = error;
        });
      }, error => {
        this.errorMsg = error;
      });
    }
  }

  setFile(files) {
    this.logoFile = files[0];
    this.fileName = this.logoFile.name;
    const reader = new FileReader();
    reader.readAsDataURL(this.logoFile);
    reader.onload = (event) => {
      // @ts-ignore
      this.imgURL = reader.result;
    };
  }

}
