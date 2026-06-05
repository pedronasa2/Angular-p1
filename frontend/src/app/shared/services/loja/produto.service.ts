import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export class Produto{
  id!: number;

  nome!: string;

  codigo!: string;

  valorUnitario!: number;

  descricao!: string;

  quantidade!: number;

  valorTotal!: number;

}

export class ItemNota{

  id!: number;

  nome!: string;

  codigo!: string;

  valorUnitario!: number;

  descricao!: string;

  quantidade!: number;

  valorTotal!: number;


  constructor(private  produto:Produto) {
    this.id = produto.id;
    this.nome = produto.nome;
    this.codigo = produto.codigo;
    this.valorUnitario = produto.valorUnitario;
    this.descricao = produto.descricao;
    this.quantidade = produto.quantidade;
    this.valorTotal = produto.valorTotal;
  }

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


  atualizarProduto(produtoAtual: any):Observable<any> {
    return this.http.put(this.urlProduto + "/" + produtoAtual.id, produtoAtual)
  }

  adcionar(produtoAtual: any): Observable<Produto> {
    return this.http.post<Produto>(this.urlProduto, produtoAtual);

  }
}
