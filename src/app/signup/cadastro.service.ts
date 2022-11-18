import { Endereco } from './endereco.model';
import { Cadastro } from './cadastro.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  baseUrl = 'http://localhost:8080/usuarios';

  consultaCepUrl = 'https://brasilapi.com.br/api/cep/v2';

constructor(private http: HttpClient) { }

  create(cadastro: Cadastro): Observable<any> {
    return this.http.post<Cadastro>(this.baseUrl, cadastro);
  }


  findCep(cep: string){
    console.log(cep);
    return this.http.get<Endereco>(`${this.consultaCepUrl}/${cep}`);
  }
}
