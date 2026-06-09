import {Component} from '@angular/core';
import {ProdutoService} from '../../shared/services/loja/produto.service';
import {DxButtonComponent, DxDataGridComponent} from 'devextreme-angular';
import {
  DxiDataGridColumnComponent,
  DxiDataGridItemComponent,
  DxoDataGridEditingComponent, DxoDataGridFormComponent, DxoDataGridPagingComponent, DxoDataGridPopupComponent
} from 'devextreme-angular/ui/data-grid';
import {DxiValidationRuleComponent, DxoSearchPanelComponent} from 'devextreme-angular/ui/nested';
import {Produto} from '../../shared/class/produto';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-produto.component',
  imports: [
    DxDataGridComponent,
    DxiDataGridColumnComponent,
    DxiDataGridItemComponent,
    DxoDataGridEditingComponent,
    DxoDataGridFormComponent,
    DxoDataGridPagingComponent,
    DxoDataGridPopupComponent,
    DxoSearchPanelComponent,
    DxiValidationRuleComponent,
    DxButtonComponent,
    RouterLink
  ],
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.scss',
})
export class ProdutoComponent {
  public listaDeProdutos: Produto[] = []


  constructor(private produtoService: ProdutoService) {
  }

  ngOnInit() {
    this.produtoService.listarProdutos().subscribe(dados => {
      this.listaDeProdutos = dados;
    })
  }


  public atualizarLista() {
    this.produtoService.listarProdutos().subscribe(dados => {
      this.listaDeProdutos = dados;
    })
  }


  public onRowRemoved(event: any) {
    this.produtoService.deletarPorId(event.data.id).subscribe(
      {
        next: () => {
          this.atualizarLista()
        },
        error: () => {
          console.error("Erro ao deletar")
        }
      }
    );

  }

  public onRowUpdated(event: any) {


    this.produtoService.atualizarProduto(event.data).subscribe({
      next: () => {
        this.atualizarLista();
      },
      error: (erro: any) => {
        console.error("Erro ao atualizar o produto", erro)
      }
    });
  }

  public onRowInserted(event: any) {

    const produtoModelo = {
      nome: event.data.nome,
      valorUnitario: event.data.valorUnitario,
      codigo: event.data.codigo,
      descricao: event.data.descricao
    }
    this.produtoService.adcionar(produtoModelo).subscribe({
      next: () => {
        this.atualizarLista();
      },
      error: (erro: any) => {
        console.error("Erro ao adcionar o produto", erro)
      }
    });

  }
}
