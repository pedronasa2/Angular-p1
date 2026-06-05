import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


export class Cidade{
    id!: number
    nome!: string
    microrregiao!:string
    "regiao-intermediaria"!:string


}

@Injectable({
  providedIn: 'root',
})
export class CidadeService {
  private urlCidades:string = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/"

  constructor(private http:HttpClient) {
  }
  listarCidadesPorUf(uf:string):Observable<Cidade[]>{
    return this.http.get<Cidade[]>(this.urlCidades + uf + "/municipios")
  }
}



