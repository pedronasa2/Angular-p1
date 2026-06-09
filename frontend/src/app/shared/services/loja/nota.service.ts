import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Nota} from '../../class/nota';
import {ItenNota} from '../../class/iten-nota';
export { Nota } from '../../class/nota';




@Injectable({
  providedIn: 'root',
})
export class NotaService {

  private urlCliente:string = "http://localhost:8080/notafiscal"
  public  notaRetorno!:any;

  constructor(private http:HttpClient) {
  }

  listarNotas():Observable<Nota[]>{
    return this.http.get<Nota[]>(this.urlCliente);
  }


  criarNota(nota: any):Observable<Nota> {

    return this.http.post<Nota>(this.urlCliente, nota);
  }

  atualizarNota(nota: any):Observable<Nota>{
    return this.http.put<Nota>(this.urlCliente, nota);
  }

  deletarPorId(id: number):Observable<any> {
    return  this.http.delete(this.urlCliente + "/" + id)

  }
}
