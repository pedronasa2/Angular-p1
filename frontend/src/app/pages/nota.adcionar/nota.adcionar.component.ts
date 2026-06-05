import {Component} from '@angular/core';
import {
  DxButtonComponent,
  DxDataGridComponent, DxNumberBoxComponent,
  DxSelectBoxComponent,
  DxValidationGroupComponent,
  DxValidatorComponent
} from 'devextreme-angular';
import {NotaService} from '../../shared/services/loja/nota.service';
import {ItemNota, Produto, ProdutoService} from '../../shared/services/loja/produto.service';
import {Cliente, ClienteService} from '../../shared/services/loja/cliente.service';
import {
  DxiDataGridColumnComponent,
  DxoDataGridEditingComponent,
  DxoDataGridPagingComponent
} from 'devextreme-angular/ui/data-grid';
import {DxiValidationRuleComponent} from 'devextreme-angular/ui/nested';
import {Router, RouterLink} from '@angular/router';


@Component({
  selector: 'app-nota.adcionar.component',
  imports: [
    DxSelectBoxComponent,
    DxoDataGridPagingComponent,
    DxoDataGridEditingComponent,
    DxDataGridComponent,
    DxiDataGridColumnComponent,
    DxValidatorComponent,
    DxButtonComponent,
    DxiValidationRuleComponent,
    DxValidationGroupComponent,
    DxNumberBoxComponent,
    RouterLink
  ],
  templateUrl: './nota.adcionar.component.html',
  styleUrl: './nota.adcionar.component.scss',
})
export class NotaAdcionarComponent {

  listaCliente: Cliente[] = [];
  listaProduto: Produto[] = [];
  idClienteSelecionado: number = 0;
  listaProdutoSelecionados: ItemNota[] = [];
  idProdutoSelecionado: number = 0;
  quantidade: number = 0;
  valorTotal: number = 0;

  constructor(private notaService: NotaService,
              private produtoService: ProdutoService,
              private clienteService: ClienteService,
              private router: Router) {
  }

  public ngOnInit() {
    this.produtoService.listarProdutos().subscribe({
      next: (produtos: Produto[]) => {
        this.listaProduto = produtos
      }, error: (erro: any) => {
        console.error("Erro ao buscar produtos", erro)
      }
    });

    this.clienteService.listarClientes().subscribe({
      next: (clientes: Cliente[]) => {
        this.listaCliente = clientes
      }, error: (erro: any) => {
        console.error("Erro ao buscar Clientes", erro)
      }
    });
  }

  public dxSelectCliente(evento: any) {
    this.idClienteSelecionado = evento.value
  }


  protected readonly console = console;

  public formatar(produto: any): string {
    if (produto) {
      return " " + produto.nome + "              R$ " + produto.valorUnitario.toFixed(2)
    }
    return ""
  }


  public adicionarProduto(event: any) {

    if (this.quantidade > 0) {
      this.listaProduto.forEach(produto => {
        if (produto.id == this.idProdutoSelecionado) {
          produto.quantidade = Number(this.quantidade);
          produto.valorTotal = produto.valorUnitario * produto.quantidade;

          this.listaProdutoSelecionados.push(new ItemNota(produto));
          this.valorTotal = 0;
          this.listaProdutoSelecionados.forEach(item => this.valorTotal += item.valorTotal)
        }
      });
    }
  }

  public finalizarNota(event: any) {
    let itensBackend = this.listaProdutoSelecionados.map(item => {
      return {
        nome: item.nome,
        codigoProduto: item.codigo,
        valorTotal: item.valorTotal,
        descricao: item.descricao,
        quantidade: item.quantidade
      };
    });
    this.notaService.criarNota(this.idClienteSelecionado, itensBackend).subscribe({
      next: () => {
        console.log(this.listaProdutoSelecionados);
        this.router.navigate(['/inicioloja/nota']);
      },
      error: () => {
        console.log("Erro ao adcionar produtos a nota")
      }
    })
  }

  public onRowRemoved(event: any) {
    this.valorTotal = 0;
    this.listaProdutoSelecionados.forEach(item => this.valorTotal += item.valorTotal)
  }
}
