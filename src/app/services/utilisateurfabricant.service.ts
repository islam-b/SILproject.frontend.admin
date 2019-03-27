import { Injectable } from '@angular/core';
import {Observable, Subject, throwError} from 'rxjs';
import {Marque} from '../entities/Marque';
import {AuthentificationService} from './authentifaction.service';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {UtilisateurFabricant} from '../entities/UtilisateurFabricant';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurfabricantService {

  baseUrl: string = localStorage.getItem('baseUrl');
  utilisateursSubject = new Subject<UtilisateurFabricant[]>();
  utilisateurs: UtilisateurFabricant[];

  constructor(private authService: AuthentificationService, private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<UtilisateurFabricant[]>(`${this.baseUrl}utilfab`);
  }

  getUser(id) {
    return this.http.get<UtilisateurFabricant>(`${this.baseUrl}marques/utilfab/${id}`);
  }

  newUser(user, codeMarque): Observable<UtilisateurFabricant> {
    const header = this.authService.createAuthorizationHeader();
    return this.http.post<UtilisateurFabricant>(`${this.baseUrl}marques/${codeMarque}/utilfab`, user, {headers: header}).pipe(
      catchError(this.handleError)
    );
  }
  updateUser(id, user): Observable<UtilisateurFabricant> {
    const header = this.authService.createAuthorizationHeader();
    return this.http.put<UtilisateurFabricant>(`${this.baseUrl}utilfab/${id}`, user, {headers: header}).pipe(
      catchError(this.handleError)
    );
  }
  deleteUser(id): Observable<any> {
    const header = this.authService.createAuthorizationHeader();
    return this.http.delete(`${this.baseUrl}marques/utilfab/${id}`, {headers: header}).pipe(
      catchError(this.handleError)
    );
  }

  uploadPhotoProfile(file, code) {
    const imgData = new FormData();
    imgData.append('imageUtilisateur', file, file.name);
    const header = this.authService.createAuthorizationHeader();
    return this.http.post(`${this.baseUrl}images/utilfab/${code}`, imgData, {headers: header}).pipe(
      catchError(this.handleError)
    );
  }

  setBlock(id, value) {
    const header = this.authService.createAuthorizationHeader();
    return this.http.put<UtilisateurFabricant>(`${this.baseUrl}marques/utilfab/${id}/bloquer`, value, {headers: header}).pipe(
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
        e = 'Cet utilisateur existe déja';
      } else if (error.status === 404) {
        e = 'Cet utilisateur n\'existe pas';
      } else {
        e = 'Une erreur s\'est produite, réessayer ulterieurement';
      }
    }
    return throwError(e);
  }

  emitUtilisateurs() {
    this.utilisateursSubject.next(this.utilisateurs);
  }
}
