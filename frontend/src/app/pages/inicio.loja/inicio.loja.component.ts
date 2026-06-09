import {ChangeDetectorRef, Component} from '@angular/core';
import {Cliente, ClienteService} from '../../shared/services/loja/cliente.service';
import {ProdutoService} from '../../shared/services/loja/produto.service';
import {Nota, NotaService} from '../../shared/services/loja/nota.service';
import {DxButtonComponent} from 'devextreme-angular';
import {RouterLink} from '@angular/router';
import {Produto} from '../../shared/class/produto';



@Component({
  selector: 'app-inicio.loja.component',
  templateUrl: './inicio.loja.component.html',
  styleUrl: './inicio.loja.component.scss',
  imports: [
    DxButtonComponent,
    RouterLink
  ]
})
export class InicioLojaComponent {
  public listaClientes: Cliente[]=[];
  public listaProdutos: Produto[]=[];
  public listaNotas: Nota[]=[];

  constructor(private clienteService:ClienteService,
              private produtoService:ProdutoService,
              private notaService:NotaService) {
  }
  ngOnInit() {
    this.listarClientes();
    this.listarProdutos();
    this.listarNotas();

  }

  private listarClientes() {
    this.clienteService.listarClientes().subscribe({
      next: (dados:Cliente[]) => {
        this.listaClientes = dados;
    },
      error: (erro) =>{
        console.error("Erro Cliente");
      }
    });
  }

  private listarProdutos() {
    this.produtoService.listarProdutos().subscribe({
      next: (dados: Produto[]) => {
        this.listaProdutos = dados;

      },
      error: (erro) => {
        console.error("Erro Produto");
      }
    });
  }
  private listarNotas() {
    this.notaService.listarNotas().subscribe({
      next: (dados: Nota[]) => {
        this.listaNotas = dados;
      },
      error: (erro) => {
        console.error("Erro Nota");
      }
    });
  }

  protected readonly console = console;
}
