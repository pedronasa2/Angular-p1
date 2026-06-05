import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';





export class Estado {
  id!: number;
  sigla!: string;
  nome!: string;
  regiao!: Array<any>;

}

@Injectable({
  providedIn: 'root',
})
export class EstadoService {

  constructor(private http:HttpClient) {
  }
 private urlEstado:string = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";
  listaEstados(): Observable<Estado[]>{
    return this.http.get<Estado[]>(this.urlEstado)
  }


}
