import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthentificationService} from '../../services/authentifaction.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  profilepic = '../../../assets/images/logo.png';
  searchForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthentificationService, private router: Router) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      recherche: ''
    });
  }
  deconnexion() {
    this.authService.signout();
    this.router.navigate(['/connexion']);
  }

}
