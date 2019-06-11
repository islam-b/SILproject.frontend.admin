import { Injectable } from '@angular/core';
import {MarqueService} from './marque.service';
import {Subject} from 'rxjs';
import {Marque} from '../entities/Marque';
import {UtilisateurfabricantService} from './utilisateurfabricant.service';

@Injectable({
  providedIn: 'root'
})
export class ViewUpdateService {

 selectedItemSubject = new Subject<number>();
 selectedItem = 1;

 usersStates;
  constructor(private marqueService: MarqueService, private utilfabService: UtilisateurfabricantService) { }

  emitSelectedItem() {
    this.selectedItemSubject.next(this.selectedItem);
  }
  setSelectedItem(number) {
    this.selectedItem = number;
  }
  showAllmarque() {
    this.marqueService.getAllMarques().subscribe(marques => {
      this.marqueService.marques = marques;
      this.marqueService.emitMarques();
    });
  }
  showNewMarque(code) {
    this.marqueService.getMarque(code).subscribe(marque => {
      this.marqueService.marques.unshift(marque);
      this.marqueService.emitMarques();
    });
  }
  showModifiedMarque(code) {
    this.marqueService.getMarque(code).subscribe(marque => {
      const i = this.marqueService.marques.findIndex(m => m.CodeMarque === code);
      this.marqueService.marques[i] = marque;
      this.marqueService.emitMarques();
    });
  }
  hideDeletedMarque(code) {
    this.marqueService.marques = this.marqueService.marques.filter(m => {
      if (m.CodeMarque === code) {
        return false;
      }
      return true;
    });
    this.marqueService.emitMarques();
  }
  filter(filterValue) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase();
    console.log(filterValue);
    let code: string;
    let nom: string;
    let data = this.marqueService.marques.filter(m => {
      code = m.CodeMarque.toString().toLowerCase();
      nom = m.NomMarque.toString().toLowerCase();
      return nom.includes(filterValue) || code.includes(filterValue);
    });
    this.marqueService.marquesStates = new Array(data.length);
    this.marqueService.marquesSubject.next(data);
  }

  showAllUsers() {
    this.utilfabService.getAllUsers().subscribe(users => {
      this.utilfabService.utilisateurs = users;
      this.usersStates = new Array(users.length);
      this.utilfabService.emitUtilisateurs();
    });
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  async notifyTabUsers(rowIndex) {
    this.usersStates[rowIndex] = !this.usersStates[rowIndex];
    await this.delay(500);
    this.usersStates[rowIndex] = !this.usersStates[rowIndex];
  }
  showNewUser(id) {
    this.utilfabService.getUser(id).subscribe(utilisateur => {
      this.utilfabService.utilisateurs.unshift(utilisateur);
      this.usersStates = new Array(this.utilfabService.utilisateurs.length);
      this.utilfabService.emitUtilisateurs();
    });
  }
  showModifiedUser(id) {
    this.utilfabService.getUser(id).subscribe(user => {
      const i = this.utilfabService.utilisateurs.findIndex(u => u.IdUserF === id);
      this.utilfabService.utilisateurs[i] = user;
      this.usersStates = new Array(this.utilfabService.utilisateurs.length);
      this.utilfabService.emitUtilisateurs();
    });
  }
  hideDeletedUser(id) {
    this.utilfabService.utilisateurs = this.utilfabService.utilisateurs.filter(u => {
      if (u.IdUserF === id) {
        return false;
      }
      return true;
    });
    this.usersStates = new Array(this.utilfabService.utilisateurs.length);
    this.utilfabService.emitUtilisateurs();
  }
  filterUsers(filterValue) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase();
    console.log(filterValue);
    let id: string;
    let nom: string;
    let prenom: string;
    let fabricant: string;
    let data = this.utilfabService.utilisateurs.filter(u => {
      id = u.IdUserF.toString().toLowerCase();
      nom = u.Nom.toString().toLowerCase();
      prenom = u.Prenom.toString().toLowerCase();
      fabricant = u.marque.NomMarque.toString().toLowerCase();
      return nom.includes(filterValue) || prenom.includes(filterValue) || id.includes(filterValue) || fabricant.includes(filterValue);
    });
    this.usersStates = new Array(data.length);
    this.utilfabService.utilisateursSubject.next(data);
  }
}
