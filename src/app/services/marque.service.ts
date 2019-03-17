import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Marque} from '../entities/Marque';
import {catchError, map} from 'rxjs/operators';
import {Subject, throwError} from 'rxjs';
import {AuthentificationService} from './authentifaction.service';

@Injectable({
  providedIn: 'root'
})
export class MarqueService {

  baseUrl: string = localStorage.getItem('baseUrl');
  marquesSubject = new Subject<Marque[]>();
  marques: Marque[];
  states;

  constructor(private authService: AuthentificationService, private http: HttpClient) { }

  getAllMarques() {
    return this.http.get<Marque[]>(`${this.baseUrl}marques`);
  }


  getMarque(code) {
    return this.http.get<Marque>(`${this.baseUrl}marques/${code}`);
  }

  emitMarques() {
    this.states = new Array(this.marques.length);
    this.marquesSubject.next(this.marques);
  }

  newMarque(marque) {
    const header = this.authService.createAuthorizationHeader();
    return this.http.post(`${this.baseUrl}marques`, marque, {headers: header}).pipe(
      catchError(this.handleError)
    );
  }
  editMarque(marque) {
    const header = this.authService.createAuthorizationHeader();
    return this.http.put(`${this.baseUrl}marques/${marque.CodeMarque}`, marque, {headers: header}).pipe(
      catchError(this.handleError)
    );
  }

  uploadLogoMarque(file, code) {
    const imgData = new FormData();
    imgData.append('imageMarque', file, file.name);
    const header = this.authService.createAuthorizationHeader();
    return this.http.post(`${this.baseUrl}images/marques/${code}`, imgData, {headers: header}).pipe(
      catchError(this.handleError)
    );
  }

  deleteMarque(code) {
    const header = this.authService.createAuthorizationHeader();
    return this.http.delete(`${this.baseUrl}marques/${code}`, {headers: header}).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    let e: string;
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      e = 'Une erreur s\'est produite, réessayer ulterieurement';
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}`);
      if (error.status === 401) {
        e = 'Vous n\'ètes pas autorisé a effectué cette action';
      } else if (error.status === 409) {
        e = 'Cette marque existe déja';
      } else if (error.status === 404) {
        e = 'Cette marque n\'existe pas';
      } else {
        e = 'Une erreur s\'est produite, réessayer ulterieurement';
      }
    }
    return throwError(e);
  }

  showAllmarque() {
    this.getAllMarques().subscribe(marques => {
      this.marques = marques;
      this.emitMarques();
    });
  }
  showNewMarque(code) {
    this.getMarque(code).subscribe(marque => {
      this.marques.unshift(marque);
      this.emitMarques();
    });
  }
  showModifiedMarque(code) {
    this.getMarque(code).subscribe(marque => {
      const i = this.marques.findIndex(m => m.CodeMarque === code);
      this.marques[i] = marque;
      this.emitMarques();
    });
  }
  hideDeletedMarque(code) {
    this.marques = this.marques.filter(m => {
      if (m.CodeMarque === code) {
        return false;
      }
      return true;
    });
    this.emitMarques();
  }

  async notify(rowIndex) {
    this.states[rowIndex] = !this.states[rowIndex];
    await this.delay(500);
    this.states[rowIndex] = !this.states[rowIndex];
  }
  filter(filterValue) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase();
    console.log(filterValue);
    let code: string;
    let nom: string;
    let data = this.marques.filter(m => {
      code = m.CodeMarque.toString().toLowerCase();
      nom = m.NomMarque.toString().toLowerCase();
      return nom.includes(filterValue) || code.includes(filterValue);
    });
    this.states = new Array(data.length);
    this.marquesSubject.next(data);
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
