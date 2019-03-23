import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Marque} from '../../../entities/Marque';
import {MatDialogRef} from '@angular/material';
import {UtilisateurfabricantService} from '../../../services/utilisateurfabricant.service';
import {MarqueService} from '../../../services/marque.service';
import {ViewUpdateService} from '../../../services/view-update.service';
import {UtilisateurFabricant} from '../../../entities/UtilisateurFabricant';

@Component({
  selector: 'app-modifier-utilisateur',
  templateUrl: './modifier-utilisateur.component.html',
  styleUrls: ['./modifier-utilisateur.component.scss']
})
export class ModifierUtilisateurComponent implements OnInit {

  @ViewChild('file') private fileInput;
  @ViewChild('selectF') private select;
  idUtilisateur;
  // @ts-ignore
  utilisateurFabricant: UtilisateurFabricant = {};
  errorMsg = '';
  profilePicFile: File = null;
  picURL = '../../../../assets/images/users.png';
  isLoading = false;
  complete = false;
  modifierUtilisateurForm: FormGroup;
  marques: Marque[];
  selectedFab = 0;
  rowIndex;
  constructor(public dialogRef: MatDialogRef<ModifierUtilisateurComponent>, private formBuilder: FormBuilder,
              private utilfabService: UtilisateurfabricantService, private marqueService: MarqueService,
              private view: ViewUpdateService) {}

  onNoClick() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.marques = this.marqueService.marques;
    this.modifierUtilisateurForm = this.formBuilder.group({
      Nom: ['', [Validators.required]],
      Prenom: ['', [Validators.required]],
      Mail: ['', [Validators.required, Validators.email]],
      NumTel: '',
      imageUtilFab: ''
    });
    this.utilfabService.getUser(this.idUtilisateur).subscribe(user => {
      this.utilisateurFabricant = user;
      this.selectedFab = this.utilisateurFabricant.Fabricant;
      if (this.utilisateurFabricant.images[0] !== undefined) {
        this.picURL = this.utilisateurFabricant.images[0].CheminImage;
      }
    }, error => {
      this.errorMsg = error;
    });
  }

  private formIsValid(): boolean {
    if (this.modifierUtilisateurForm.get('Nom').hasError('required') ||
      this.modifierUtilisateurForm.get('Prenom').hasError('required') ||
      this.modifierUtilisateurForm.get('Mail').hasError('required')) {
      this.errorMsg = 'Veuillez remplir les champs nécéssaires';
      return false;
    } else if (this.selectedFab === 0) {
      this.errorMsg = 'Veuillez selectionnez un fabricant';
      return false;
    } else if (this.modifierUtilisateurForm.get('Mail').hasError('email')) {
      this.errorMsg = 'Veuillez saissir un mail valide';
      return false;
    } else { return true; }
  }

  onSubmit() {
    if (this.formIsValid()) {
      this.isLoading = true;
      const utilisateur = this.modifierUtilisateurForm.value;
      this.utilfabService.updateUser(this.idUtilisateur, {
        Nom: utilisateur.Nom,
        Prenom: utilisateur.Prenom,
        NumTel: utilisateur.NumTel,
        Mail: utilisateur.Mail,
        Fabricant: this.selectedFab}).subscribe( async data1 => {
        if (this.profilePicFile !== null) {
          this.utilfabService.uploadPhotoProfile(this.profilePicFile, this.idUtilisateur).subscribe(async data2 => {
            this.view.showModifiedUser(this.idUtilisateur);
            this.isLoading = false;
            this.complete = true;
            await this.delay(750);
            await this.view.notifyTabUsers(this.rowIndex);
            this.onNoClick();
          }, error => {
            this.isLoading = false;
            this.errorMsg = error;
          });
        } else {
          this.view.showModifiedUser(this.idUtilisateur);
          this.isLoading = false;
          this.complete = true;
          await this.delay(750);
          await this.view.notifyTabUsers(this.rowIndex);
          this.onNoClick();
        }
      }, error => {
        this.isLoading = false;
        this.errorMsg = error;
      });
    }
  }

  openFileDialog() {
    const event = new MouseEvent('click', {bubbles: false});
    this.fileInput.nativeElement.dispatchEvent(event);
  }

  setFile(files) {
    this.profilePicFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.profilePicFile);
    reader.onload = (event) => {
      // @ts-ignore
      this.picURL = reader.result;
    };
  }

  selectOption(code) {
    this.selectedFab = code;
    console.log(code);
  }


  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
