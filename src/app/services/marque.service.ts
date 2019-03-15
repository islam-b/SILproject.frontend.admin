import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Marque} from '../entities/Marque';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MarqueService {

  baseUrl: string = localStorage.getItem('baseUrl');
  constructor(private http: HttpClient) { }

  getAllMarques() {
    return this.http.get<Marque[]>(`${this.baseUrl}marques`);
  }
}
