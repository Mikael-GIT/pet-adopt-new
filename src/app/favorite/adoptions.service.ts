import { Adocao } from './adocao.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdoptionService {

  baseUrl = 'http://localhost:8080/adocao';

  constructor(private http: HttpClient) { }

  getAdoptions(id_usuario: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id_usuario}/adoptions`);
  }
}
