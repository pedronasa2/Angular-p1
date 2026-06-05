import { Injectable } from '@angular/core';
import {Cliente} from './cliente.service';
import {ItemNota, Produto} from './produto.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


export class Nota{
  public id!: number;
  public cliente!: Cliente;
  public data!:string;
  public valorTotal!: number;
  public listaItens!: Produto[];


}
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


  criarNota(idCliente: number, listaProdutos: any):Observable<Nota> {

    return this.http.post<Nota>(this.urlCliente + "/" + idCliente + "/produtos", listaProdutos);
  }

  adcionarProduto(idNota: number, idProduto: number):Observable<Nota>{
    return this.http.put<Nota>(this.urlCliente +"/" +idNota + "/adcionar/" + idProduto, {});
  }

  deletarPorId(id: number):Observable<any> {
    return  this.http.delete(this.urlCliente + "/" + id)

  }
}
