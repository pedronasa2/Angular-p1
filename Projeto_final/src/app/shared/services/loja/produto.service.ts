import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export class Produto{
  id!: number;

  nome!: string;

  codigo!: string;

  valorUnitario!: number;

  descricao!: string;

}
@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private urlProduto = "http://localhost:8080/produto"
  constructor(private http:HttpClient) {
  }

  listarProdutos():Observable<Produto[]>{
    return this.http.get<Produto[]>(this.urlProduto)
  }

  deletarPorId(id:number):Observable<any>{
    return this.http.delete(this.urlProduto + "/" + id)
  }


  atualizarProduto(produtoAtual: Produto):Observable<any> {
    return this.http.put(this.urlProduto + "/" + produtoAtual.id, produtoAtual)
  }

  adcionar(produtoAtual: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.urlProduto, produtoAtual);

  }
}
