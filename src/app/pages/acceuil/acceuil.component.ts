import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from '../../services/authentifaction.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.scss']
})
export class AcceuilComponent implements OnInit {

  constructor(private authentificationService: AuthentificationService) { }

  ngOnInit() {
    //this.authentificationService.signout(); //this is just a test (remove it lateer)
  }

}
