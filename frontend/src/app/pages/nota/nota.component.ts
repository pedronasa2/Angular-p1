import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {
  DxButtonComponent,
  DxDataGridComponent, DxPopupComponent, DxSelectBoxComponent, DxTemplateDirective, DxTileViewComponent,
} from 'devextreme-angular';
import {ClienteService} from '../../shared/services/loja/cliente.service';
import {
  DxiDataGridColumnComponent,
  DxiDataGridItemComponent, DxoDataGridEditingComponent,
  DxoDataGridFilterRowComponent, DxoDataGridFormComponent, DxoDataGridHeaderFilterComponent,
  DxoDataGridLookupComponent, DxoDataGridPopupComponent,
  DxoDataGridSearchPanelComponent,
} from 'devextreme-angular/ui/data-grid';
import {Nota, NotaService} from '../../shared/services/loja/nota.service';
import {DxiValidationRuleComponent} from 'devextreme-angular/ui/nested';
import {NgIf} from '@angular/common';
import {Cliente} from '../../shared/class/cliente';
import {ItenNota} from '../../shared/class/iten-nota';
import {Produto} from '../../shared/class/produto';
import {ProdutoService} from '../../shared/services/loja/produto.service';

@Component({
  selector: 'app-nota.component',
  imports: [
    DxDataGridComponent,
    DxiDataGridColumnComponent,
    DxButtonComponent,
    DxoDataGridEditingComponent,
    DxoDataGridFormComponent,
    DxoDataGridPopupComponent,
    DxiDataGridItemComponent,
    DxiValidationRuleComponent,
    RouterLink,
    DxoDataGridSearchPanelComponent,
    DxoDataGridHeaderFilterComponent,
    DxTemplateDirective,
    DxoDataGridLookupComponent,
  ],
  templateUrl: './nota.component.html',
  styleUrl: './nota.component.scss',
})
export class NotaComponent {

  listaDeNotas: Nota[] = [];

  listaDeClientes: Cliente[] = [];

  listaDeItens: ItenNota[] = [];

  listaDeProdutos: Produto[] = [];

  notaSelecionada: Nota = new Nota();

  edicao: boolean = false;

  constructor(private clienteService:ClienteService,
              private notaService: NotaService,
              private produtoService: ProdutoService) {
  }

  ngOnInit(){

    this.atualizarNota();

    this.clienteService.listarClientes().subscribe({

      next: (clientes: Cliente[])=>{
        this.listaDeClientes = clientes;
      }, error: (erro: any)=>{
        console.error("Erro ao buscar os clientes", erro)
      }

    });

    this.produtoService.listarProdutos().subscribe({
      next: (produtos: Produto[]) =>{
        this.listaDeProdutos = produtos;
      }, error: (erro) => {
        console.error("Erro ao buscar a lista de produtos" , erro)
    }
    })


  }
  public atualizarNota(){
    this.notaService.listarNotas().subscribe({
      next: (notas)=> {
        this.listaDeNotas = notas;
        this.notaSelecionada = notas[0];
      },error: (erro)=> {
        console.error("Erro ao buscar as notas");
      }
    });
  }
  public onRowRemoved(event: any) {
    this.notaService.deletarPorId(event.key).subscribe({
      next: () => {},
      error: (erro) => {console.error(erro, "Erro ao deletar nota")}
    })
  }


  protected readonly console = console;

  public onRowUpdated(event: any) {

  }

  calcularTotalItem(linha: any): number {
    if (linha && linha.produto && linha.quantidade) {
      const preco = linha.produto.valorUnitario;
      const qtd = Number(linha.quantidade);
      return preco * qtd;
    }
    return 0;
  }

  protected onRowSaved(event: any) {

  }



  public onRowInsertedItem(event: any) {
    const idDoProdutoSelecionado = event.data.produto?.id;
    const produtoCompleto = this.listaDeProdutos.find(p => p.id == idDoProdutoSelecionado);
    if (produtoCompleto) {
      event.data.idProduto = produtoCompleto.id;
      event.data.valorTotal = Number(event.data.quantidade) * produtoCompleto.valorUnitario;
    }

    console.log("Item inserido", event.data);
  }

  public onRowInserted(event: any) {
    const clienteSelecionado = this.listaDeClientes.find(c => c.id == event.data.cliente.id);

    const notaCompleta = {
      cliente: clienteSelecionado,
      data: event.data.data,
      listaItens: this.listaDeItens
    };

    console.log(notaCompleta);

    this.notaService.criarNota(notaCompleta).subscribe({
      next: () => {
        this.listaDeItens = [];
        this.atualizarNota();
      },
      error: (erro) => {
        console.error("Erro ao criar nota", erro);
      }
    });
  }

  public onEditingStart(event: any) {
    this.edicao = true;
    this.notaSelecionada = event.data;
    let nota = this.listaDeNotas.find(n => n.id == event.data.id);
    this.listaDeItens = nota?.listaItens ? [...nota.listaItens] : [];
  }

  public onSaved(event: any) {
    console.log(event);
    if (this.edicao) {
      if (event.changes.length > 0) {
        const change = event.changes[0];
        const notaOriginal = this.listaDeNotas.find(n => n.id == change.key);

        const notaAtualizada = {
          id: change.key,
          cliente: { id: notaOriginal?.cliente?.id },
          data: change.data?.data ?? notaOriginal?.data,
          listaItens: this.listaDeItens.map(item => ({
            idProduto: item.produto.id,
            quantidade: item.quantidade,
            valorTotal: item.valorTotal
          }))
        };

        this.notaService.atualizarNota(notaAtualizada).subscribe({
          next: () => {
            this.edicao = false;
            this.listaDeItens = [];
            this.atualizarNota();
            this.edicao = false;
            this.listaDeItens = [];
          },
          error: (erro) => console.error("Erro ao atualizar nota", erro)
        });

      } else {
              if (this.edicao){
                  const notaOriginal = this.listaDeNotas.find(n => n.id == this.notaSelecionada.id);

                  const notaAtualizada = {
                    id: notaOriginal?.id,
                    cliente: { id: notaOriginal?.cliente?.id },
                    data: null,
                    listaItens: this.listaDeItens.map(item => ({
                      idProduto: item.produto.id,
                      quantidade: item.quantidade,
                      valorTotal: item.valorTotal
                    }))
                  };

                  this.notaService.atualizarNota(notaAtualizada).subscribe({
                    next: () => {
                      this.edicao = false;
                      this.listaDeItens = [];
                      this.atualizarNota();
                      this.edicao = false;
                      this.listaDeItens = [];
                    },
                    error: (erro) => console.error("Erro ao atualizar nota", erro)
                  });
              }
      }

    }
  }

  public onEditCanceled(event: any) {
    this.edicao = false;
    console.log(this.edicao)
    this.listaDeItens = [];
  }

  public onRowUpdatingItem(event: any) {
    const dadosAtuais = Object.assign({}, event.oldData, event.newData);
    const idProduto = dadosAtuais.produto?.id ;
    const produtoCompleto = this.listaDeProdutos.find(p => p.id == idProduto);
    if (produtoCompleto) {
      event.newData.valorTotal = Number(dadosAtuais.quantidade) * produtoCompleto.valorUnitario;
    }
  }

  public onRowValidating(event: any) {
    if (this.listaDeItens.length == 0){
      event.isValid = false;
      event.errorText = "Adcione um item na nota"
    }
  }
}
