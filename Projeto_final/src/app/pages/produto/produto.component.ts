import { Component } from '@angular/core';
import {Produto, ProdutoService} from '../../shared/services/loja/produto.service';
import {
  DxButtonComponent, DxFormComponent,
  DxListComponent,
  DxTemplateDirective,
} from 'devextreme-angular';
import {RouterLink} from '@angular/router';
import {DxiFormItemComponent, DxiFormValidationRuleComponent} from 'devextreme-angular/ui/form';


@Component({
  selector: 'app-produto.component',
  imports: [
    DxButtonComponent,
    DxListComponent,
    DxTemplateDirective,
    DxFormComponent,
    DxiFormItemComponent,
    DxiFormValidationRuleComponent,
    RouterLink
  ],
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.scss',
})
export class ProdutoComponent {
  public listaDeProdutos:Produto[] = []
  public produtoAtual: Produto = new Produto();
  public modoEdicao: boolean = false;
  public novoProduto: boolean = false;

  constructor(private produtoService:ProdutoService) {
  }
  ngOnInit(){
    this.produtoService.listarProdutos().subscribe(dados => {
      this.listaDeProdutos = dados;
      this.produtoAtual = this.listaDeProdutos[0];
    })
  }

  protected readonly console = console;


  public atualizarLista(){
    this.produtoService.listarProdutos().subscribe(dados => {
      this.listaDeProdutos = dados;
      this.produtoAtual = this.listaDeProdutos[0];
    })
  }

  public deletarProduto(item:Produto) {
    this.produtoService.deletarPorId(item.id).subscribe(
      {
        next: () =>{this.atualizarLista()},
        error: () => {console.error("Erro ao deletar")}
      }
    );
  }

  public editarProduto(evento: SubmitEvent) {
    evento.preventDefault();
    if (!this.novoProduto){
    this.produtoService.atualizarProduto(this.produtoAtual).subscribe({
      next:() => {
        this.atualizarLista();
        this.modoEdicao = false;
      },
      error: () => {
        console.error("Erro ao atualizar o produto")
      }
    });} else {
      this.produtoService.adcionar(this.produtoAtual).subscribe({
        next:() => {
          this.atualizarLista();
          this.modoEdicao = false;
          this.novoProduto = false;
        },
        error: () => {
          console.error("Erro ao adicionar o produto")
        }
      });
    }
    console.log(this.produtoAtual);
  }

  public adcionarProduto() {
    this.modoEdicao = true;
    this.produtoAtual = new Produto();
    this.novoProduto = true;
  }
}
