import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  isAuth = false;
  baseUrl: string = localStorage.getItem('baseUrl');

  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem('administrateur') !== null) {
      this.isAuth = true;
      this.router.navigate(['/admin/admin-marques']);
    }
  }
  signin(Mail: string, Mdp: string) {
    return this.http.post(`${this.baseUrl}auth/admin`, {Mail, Mdp}).pipe(
      catchError(this.handleError)
    );
  }
  setAuthentified(admin) {
    localStorage.setItem('administrateur', JSON.stringify(admin));
    this.isAuth = true;
  }
  signout() {
    localStorage.removeItem('administrateur');
    this.isAuth = false;
  }
  private handleError(error: HttpErrorResponse) {
    let e: string;
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      e = 'Une errur a été produite, réessayer ulterieurement';
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}`);
      if (error.status === 401) {
        e = 'Adresse mail ou mot de passe incorrect';
      } else {
        e = 'Une errur a été produite, réessayer ulterieurement';
      }
    }
    return throwError(e);
  }
}
