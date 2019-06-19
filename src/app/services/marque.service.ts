import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Marque} from '../entities/Marque';
import {catchError, map} from 'rxjs/operators';
import {Observable, Subject, throwError} from 'rxjs';
import {AuthentificationService} from './authentifaction.service';
import {PusherService} from './pusher.service';
import {ViewUpdateService} from './view-update.service';

@Injectable({
  providedIn: 'root'
})
export class MarqueService {

  baseUrl: string = localStorage.getItem('baseUrl');
  marquesSubject = new Subject<Marque[]>();
  marques: Marque[];
  marquesStates;
  filterMarqueValueSubject = new Subject<string>();


  constructor(private authService: AuthentificationService, private http: HttpClient,
              private pushService: PusherService) {
    this.pushService.marqueChannel.bind('newMark', data => {
      this.marques.unshift(data);
      this.emitFilterValue('');
      this.emitMarques();
      this.notify(0);
    });
  }
  emitFilterValue(value: string) {
    this.filterMarqueValueSubject.next(value);
  }



  getAllMarques() {
    return this.http.get<Marque[]>(`${this.baseUrl}marques`);
  }


  getMarque(code) {
    return this.http.get<Marque>(`${this.baseUrl}marques/${code}`);
  }

  emitMarques() {
    this.marquesStates = new Array(this.marques.length);
    this.marquesSubject.next(this.marques);
  }
  async notify(rowIndex) {
    this.marquesStates[rowIndex] = !this.marquesStates[rowIndex];
    await this.delay(500);
    this.marquesStates[rowIndex] = !this.marquesStates[rowIndex];
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
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

  deleteMarque(code): Observable<any> {
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
}
