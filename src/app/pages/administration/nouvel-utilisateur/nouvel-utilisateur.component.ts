import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {MarqueService} from '../../../services/marque.service';
import {ViewUpdateService} from '../../../services/view-update.service';
import {UtilisateurfabricantService} from '../../../services/utilisateurfabricant.service';
import {Marque} from '../../../entities/Marque';

@Component({
  selector: 'app-nouvel-utilisateur',
  templateUrl: './nouvel-utilisateur.component.html',
  styleUrls: ['./nouvel-utilisateur.component.scss']
})
export class NouvelUtilisateurComponent implements OnInit {

  @ViewChild('file') private fileInput;
  @ViewChild('selectF') private select;
  errorMsg = '';
  profilePicFile: File = null;
  picURL = '../../../../assets/images/users.png';
  isLoading = false;
  complete = false;
  nouvelUtilisateurForm: FormGroup;
  marques: Marque[];
  selectedFab = 0;
  constructor(public dialogRef: MatDialogRef<NouvelUtilisateurComponent>, private formBuilder: FormBuilder,
              private utilfabService: UtilisateurfabricantService, private marqueService: MarqueService,
              private view: ViewUpdateService) {}

  onNoClick() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.marques = this.marqueService.marques;
    this.nouvelUtilisateurForm = this.formBuilder.group({
      Nom: ['', [Validators.required]],
      Prenom: ['', [Validators.required]],
      Mail: ['', [Validators.required, Validators.email]],
      NumTel: '',
      imageUtilFab: ''
    });
  }

  private formIsValid(): boolean {
    if (this.nouvelUtilisateurForm.get('Nom').hasError('required') ||
      this.nouvelUtilisateurForm.get('Prenom').hasError('required') ||
      this.nouvelUtilisateurForm.get('Mail').hasError('required')) {
      this.errorMsg = 'Veuillez remplir les champs nécéssaires';
      return false;
    } else if (this.selectedFab === 0) {
      this.errorMsg = 'Veuillez selectionnez un fabricant';
      return false;
  } else if (this.nouvelUtilisateurForm.get('Mail').hasError('email')) {
      this.errorMsg = 'Veuillez saissir un mail valide';
      return false;
    } else { return true; }
  }

  onSubmit() {
    if (this.formIsValid()) {
      this.isLoading = true;
      const utilisateur = this.nouvelUtilisateurForm.value;
      this.utilfabService.newUser({
        Nom: utilisateur.Nom,
        Prenom: utilisateur.Prenom,
        Mdp: 'NOPASSWORD',
        NumTel: utilisateur.NumTel,
        Mail: utilisateur.Mail}, this.selectedFab).subscribe( async data1 => {
        if (this.profilePicFile !== null) {
          this.utilfabService.uploadPhotoProfile(this.profilePicFile, data1.IdUserF).subscribe(async data2 => {
            this.view.showNewUser(data1.IdUserF);
            this.isLoading = false;
            this.complete = true;
            await this.delay(750);
            await this.view.notifyTabUsers(0);
            this.onNoClick();
          }, error => {
            this.isLoading = false;
            this.errorMsg = error;
          });
        } else {
          this.view.showNewUser(data1.IdUserF);
          this.isLoading = false;
          this.complete = true;
          await this.delay(750);
          await this.view.notifyTabUsers(0);
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
