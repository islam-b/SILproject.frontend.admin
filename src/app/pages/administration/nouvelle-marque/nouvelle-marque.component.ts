import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
  complete = false;
  nouvelleMarqueForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<NouvelleMarqueComponent>, private formBuilder: FormBuilder,
              private marqueService: MarqueService) {}

  onNoClick() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.nouvelleMarqueForm = this.formBuilder.group({
      CodeMarque: ['', [Validators.required]],
      NomMarque: ['', [Validators.required]],
      imageMarque: ''
    });
  }

  private formIsValid(): boolean {
    if (this.nouvelleMarqueForm.get('CodeMarque').hasError('required') || this.nouvelleMarqueForm.get('NomMarque').hasError('required')) {
      this.errorMsg = 'Veuillez remplir les champs nécéssaires';
      return false;
    } else { return true; }
  }


  onSubmit() {
    if (this.formIsValid()) {
      this.isLoading = true;
      const marque = this.nouvelleMarqueForm.value;
      this.marqueService.newMarque({
        CodeMarque: marque.CodeMarque, NomMarque: marque.NomMarque}).subscribe( async data1 => {
        if (this.logoFile !== null) {
          this.marqueService.uploadLogoMarque(this.logoFile, marque.CodeMarque).subscribe(async data2 => {
            this.marqueService.showNewMarque(marque.CodeMarque);
            this.isLoading = false;
            this.complete = true;
            await this.delay(750);
            await this.marqueService.notify(0);
            this.onNoClick();
          }, error => {
            this.isLoading = false;
            this.errorMsg = error;
          });
        } else {
          this.marqueService.showNewMarque(marque.CodeMarque);
          this.isLoading = false;
          this.complete = true;
          await this.delay(750);
          await this.marqueService.notify(0);
          this.onNoClick();
        }
      }, error => {
        this.isLoading = false;
        this.errorMsg = error;
      });
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
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
