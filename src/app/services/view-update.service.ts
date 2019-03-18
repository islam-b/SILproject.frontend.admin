import { Injectable } from '@angular/core';
import {MarqueService} from './marque.service';
import {Subject} from 'rxjs';
import {Marque} from '../entities/Marque';

@Injectable({
  providedIn: 'root'
})
export class ViewUpdateService {

 selectedItemSubject = new Subject<number>();
 selectedItem = 1;
  marquesStates;
  constructor(private marqueService: MarqueService) { }

  emitSelectedItem() {
    this.selectedItemSubject.next(this.selectedItem);
  }
  setSelectedItem(number) {
    this.selectedItem = number;
  }
  showAllmarque() {
    this.marqueService.getAllMarques().subscribe(marques => {
      this.marqueService.marques = marques;
      this.marquesStates = new Array(marques.length);
      this.marqueService.emitMarques();
    });
  }
  showNewMarque(code) {
    this.marqueService.getMarque(code).subscribe(marque => {
      this.marqueService.marques.unshift(marque);
      this.marquesStates = new Array(this.marqueService.marques.length);
      this.marqueService.emitMarques();
    });
  }
  showModifiedMarque(code) {
    this.marqueService.getMarque(code).subscribe(marque => {
      const i = this.marqueService.marques.findIndex(m => m.CodeMarque === code);
      this.marqueService.marques[i] = marque;
      this.marquesStates = new Array(this.marqueService.marques.length);
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
    this.marquesStates = new Array(this.marqueService.marques.length);
    this.marqueService.emitMarques();
  }

  async notify(rowIndex) {
    this.marquesStates[rowIndex] = !this.marquesStates[rowIndex];
    await this.delay(500);
    this.marquesStates[rowIndex] = !this.marquesStates[rowIndex];
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
    this.marquesStates = new Array(data.length);
    this.marqueService.marquesSubject.next(data);
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
