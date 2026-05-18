import { Injectable } from '@angular/core';
import {Contato} from '../agenda';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Service {
  contatos: Contato[] =[];
  api: string = "http://localhost:8080/contato"

  constructor(private http:HttpClient) {
  }

  pegarLista(): Observable<Contato[]> {
    return this.http.get<Contato[]>(this.api);

  }

  pegarPorId(id: String): Observable<Contato>{
    return this.http.get<Contato>(this.api + '/' + id)

  }

  excluir(id: number): Observable<any>{
    return this.http.delete(this.api + "/" + id);
  }

  salvar(contato: Contato): Observable<Contato>{
    return this.http.post<Contato>(this.api, contato);

  }

  atualizar(id: String, contato: Contato):Observable<Contato>{
    return this.http.put<Contato>(this.api  + "/" +  id, contato);
  }

  private mostrarNoCossole(dado :any) {console.log(dado)}
}
