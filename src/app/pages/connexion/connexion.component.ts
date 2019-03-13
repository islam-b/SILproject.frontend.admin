import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from '../../services/authentifaction.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  signinform: FormGroup;
  private errorMsg: string
  constructor(private authentifcationService: AuthentificationService, private formBuilder: FormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.signinform = this.formBuilder.group({
      Mail: ['', [Validators.required, Validators.email]],
      Mdp: ['', [Validators.required]]
    });
  }

  private formIsValid(): boolean {
    if (this.signinform.get('Mail').hasError('required') || this.signinform.get('Mdp').hasError('required')) {
      this.errorMsg = 'Remplissez les champs nécéssaires';
      return false;
    } else if (this.signinform.get('Mail').hasError('email')) {
      this.errorMsg = 'Saisissez un email valide';
      return false;
    } else {return true; }
  }

  onSubmit() {
   if (this.formIsValid()) {
      const value = this.signinform.value;
      this.authentifcationService.signin(value['Mail'], value['Mdp']).subscribe(data => {
        this.authentifcationService.setAuthentified(data);
        console.log(data);
        this.router.navigate(['/acceuil']);
      }, error => {
        this.errorMsg = error;
      });
    }
  }

}
