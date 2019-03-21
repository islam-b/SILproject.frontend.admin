import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-confirmation-compte',
  templateUrl: './confirmation-compte.component.html',
  styleUrls: ['./confirmation-compte.component.scss']
})
export class ConfirmationCompteComponent implements OnInit {

  passwordForm: FormGroup;
  IdUtilisateurF: number;
  mdpError = '';
  confirmError = '';
  isLoading = false;
  complete = false;
  token;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    const token = this.route.snapshot.params['token'];
    console.log("encrypted"+id +"    "+ token);
    this.IdUtilisateurF = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(id));
    this.token = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(token));
    console.log("decrypted"+this.IdUtilisateurF +"    "+ this.token);

    this.passwordForm = this.formBuilder.group({
      Mdp: ['', Validators.required, Validators.minLength(8)],
      ConfirmMdp: ['', Validators.required]
    });
  }
  private formIsValid(): boolean {
    if (this.passwordForm.get('Mdp').hasError('required')) {
        this.confirmError = '';
        this.mdpError = 'Champs obligatoire.';
        return false;
    } else if (this.passwordForm.get('Mdp').value.toString().length<8) {
      this.confirmError = '';
      this.mdpError = 'Ce champs doit contenir au moins 8 caractères.';
      return false;
    } else if (this.passwordForm.get('ConfirmMdp').hasError('required')) {
      this.mdpError = '';
      this.confirmError = 'Champs obligatoire.';
      return false;
    } else if (this.passwordForm.get('ConfirmMdp').value !== this.passwordForm.get('Mdp').value ) {
      this.mdpError = '';
      this.confirmError = 'Les mots de passes ne correspondent pas.';
      return false;
    } else {return true;}
  }
  onSubmit() {
    if (this.formIsValid()) {
      this.isLoading = true;
      this.complete = true;
    }
  }
}
