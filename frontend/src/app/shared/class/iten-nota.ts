import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Produto} from './produto';

export class ItenNota{

  numero!: number;

  produto!: Produto;

  quantidade!: number;

  valorTotal!: number;


getValorTotal():number{
  return this.quantidade * this.produto.valorUnitario
}

}
