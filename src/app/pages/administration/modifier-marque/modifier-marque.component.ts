import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {MarqueService} from '../../../services/marque.service';

@Component({
  selector: 'app-modifier-marque',
  templateUrl: './modifier-marque.component.html',
  styleUrls: ['./modifier-marque.component.scss']
})
export class ModifierMarqueComponent implements OnInit {

  CodeMarque;
  NomMarque;
  errorMsg = '';
  logoFile: File = null;
  fileName = 'Choisir une autre image...';
  imgURL = '../../../../assets/images/no-photo.png';
  isLoading = false;
  complete = false;
  rowIndex;
  modifierMarqueForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<ModifierMarqueComponent>, private formBuilder: FormBuilder,
              private marqueService: MarqueService) {}

  onNoClick() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.modifierMarqueForm = this.formBuilder.group({
      CodeMarque: ['', [Validators.required]],
      NomMarque: ['', [Validators.required]],
      imageMarque: ''
    });
    this.marqueService.getMarque(this.CodeMarque).subscribe(marque => {
      this.NomMarque = marque.NomMarque;
      if (marque.images[0] !== undefined) {
        this.imgURL = marque.images[0].CheminImage;
      }
    }, error => {this.errorMsg = error; });
  }

  private formIsValid(): boolean {
    if (this.modifierMarqueForm.get('CodeMarque').hasError('required') || this.modifierMarqueForm.get('NomMarque').hasError('required')) {
      this.errorMsg = 'Veuillez remplir les champs nécéssaires';
      return false;
    } else { return true; }
  }


  onSubmit() {
    if (this.formIsValid()) {
      this.isLoading = true;
      const marque = this.modifierMarqueForm.value;
      this.marqueService.editMarque({
        CodeMarque: marque.CodeMarque, NomMarque: marque.NomMarque}).subscribe( async data1 => {
        if (this.logoFile !== null) {
          //delete old logo
          this.marqueService.uploadLogoMarque(this.logoFile, marque.CodeMarque).subscribe(async data2 => {
            this.marqueService.showModifiedMarque(marque.CodeMarque);
            this.isLoading = false;
            this.complete = true;
            await this.delay(750);
            await this.marqueService.notify(this.rowIndex);
            this.onNoClick();
          }, error => {
            this.isLoading = false;
            this.errorMsg = error;
          });
        } else {
          this.marqueService.showModifiedMarque(marque.CodeMarque);
          this.isLoading = false;
          this.complete = true;
          await this.delay(750);
          await this.marqueService.notify(this.rowIndex);
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
