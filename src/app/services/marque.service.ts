import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Marque} from '../entities/Marque';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {AuthentificationService} from './authentifaction.service';

@Injectable({
  providedIn: 'root'
})
export class MarqueService {

  baseUrl: string = localStorage.getItem('baseUrl');
  constructor(private authService: AuthentificationService, private http: HttpClient) { }

  getAllMarques() {
    return this.http.get<Marque[]>(`${this.baseUrl}marques`);
  }

  newMarque(marque) {
    const header = this.authService.createAuthorizationHeader();
    return this.http.post(`${this.baseUrl}marques`, marque, {headers: header}).pipe(
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
        e = 'Une errur s\'est produite, réessayer ulterieurement';
      }
    }
    return throwError(e);
  }
}