import { Animal } from './animal.model';
import { Observable } from 'rxjs';
import { Categoria } from './categoria.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  baseUrl = 'http://localhost:8080/categorias';

  constructor(private http: HttpClient) { }

  readCategoria(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.baseUrl}`);
  }
}
