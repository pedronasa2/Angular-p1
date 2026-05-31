import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  DxButtonComponent,
  DxDataGridComponent,
} from 'devextreme-angular';
import {Cliente, ClienteService} from '../../shared/services/loja/cliente.service';
import {Produto, ProdutoService} from '../../shared/services/loja/produto.service';
import {
  DxiDataGridColumnComponent,
  DxoDataGridSelectionComponent
} from 'devextreme-angular/ui/data-grid';
import {Nota, NotaService} from '../../shared/services/loja/nota.service';

@Component({
  selector: 'app-nota.component',
  imports: [
    DxDataGridComponent,
    DxoDataGridSelectionComponent,
    DxiDataGridColumnComponent,
    DxButtonComponent
  ],
  templateUrl: './nota.component.html',
  styleUrl: './nota.component.scss',
})
export class NotaComponent {
  cliente:Cliente = new Cliente();
  idCliente:number = -1;
  listaDeProdutos:Produto[] = [];
  linhasSelecionadas: number[]=[];
  valorTota: number = 0;
  notaCriada: Nota = new Nota();

  constructor(private clienteService:ClienteService,
              private rota: ActivatedRoute,
              private produtoService: ProdutoService,
              private notaService: NotaService,
              private router: Router) {
  }

  ngOnInit(){
    this.idCliente = Number(this.rota.snapshot.paramMap.get("id"));
    this.clienteService.buscarPorId(this.idCliente).subscribe({
      next: (dado) => {
        this.cliente = dado;
      }, error: (erro) =>{
        console.error("Erro ao buscar o cliente")
        console.error(erro)
      }
    });

    this.produtoService.listarProdutos().subscribe({
      next: (dados) => {
        this.listaDeProdutos = dados;
      },
      error: (erro) => {
        console.error("Erro ao buscar a lista de produtos");
        console.error(erro)
      }
    })

  }

  public calcularValorTotal(){
    this.valorTota = 0;
    this.linhasSelecionadas.forEach(id => {
        this.listaDeProdutos.forEach(produto =>{
          if (id == produto.id){
            this.valorTota += produto.valorUnitario;
          }
        })
      })
  }

  protected readonly Cliente = Cliente;

  public criarNota() {

    if (this.linhasSelecionadas.length > 0){
      this.notaService.criarNota(this.idCliente, this.linhasSelecionadas).subscribe({
        next: (nota: Nota) => {
          this.notaCriada = nota;
          this.router.navigate(['/inicioloja/clientes']);
        },
        error: () => {
          console.error("Erro ao criar a nota")
        }
      });
    }

  }
}
