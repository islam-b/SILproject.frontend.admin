import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from '../../services/authentifaction.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  private signinform: FormGroup;
  private errorMsg: string
  constructor(private authentifcationService: AuthentificationService, private formBuilder: FormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.signinform = this.formBuilder.group({
      Mail: '',
      Mdp: ''
    });
  }

  onSubmit() {
    const value = this.signinform.value;
    this.authentifcationService.signin(value['Mail'], value['Mdp']).subscribe( data => {
        this.authentifcationService.setAuthentified(data);
        console.log(data);
        this.router.navigate(['/acceuil']);
    }, error => {
        this.errorMsg = error;
    });
  }

}
