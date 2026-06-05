import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {
  DxButtonComponent,
  DxDataGridComponent, DxPopupComponent, DxTemplateDirective, DxTileViewComponent,
} from 'devextreme-angular';
import {Cliente, ClienteService} from '../../shared/services/loja/cliente.service';
import {Produto, ProdutoService} from '../../shared/services/loja/produto.service';
import {
  DxiDataGridColumnComponent,
  DxiDataGridItemComponent, DxoDataGridEditingComponent,
  DxoDataGridFilterRowComponent, DxoDataGridFormComponent, DxoDataGridHeaderFilterComponent, DxoDataGridPopupComponent,
  DxoDataGridSearchPanelComponent,
  DxoDataGridSelectionComponent
} from 'devextreme-angular/ui/data-grid';
import {Nota, NotaService} from '../../shared/services/loja/nota.service';
import {DxiValidationRuleComponent, DxoLookupComponent} from 'devextreme-angular/ui/nested';
import {NgIf} from '@angular/common';

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
    DxoDataGridFilterRowComponent,
    DxoDataGridHeaderFilterComponent,
    DxPopupComponent,
    DxTemplateDirective,
    NgIf,
  ],
  templateUrl: './nota.component.html',
  styleUrl: './nota.component.scss',
})
export class NotaComponent {

  listaDeNotas: Nota[] = [];

  listaDeClientes: Cliente[] = [];

  popupDetalhes:boolean = true;

  notaSelecionada: Nota = new Nota();

  constructor(private clienteService:ClienteService,
              private notaService: NotaService) {
  }

  ngOnInit(){
    this.notaService.listarNotas().subscribe({
      next: (notas)=> {
        this.listaDeNotas = notas;
        this.notaSelecionada = notas[0];
    },error: (erro)=> {
        console.error("Erro ao buscar as notas");
    }
    });

    this.clienteService.listarClientes().subscribe({

      next: (clientes: Cliente[])=>{
        this.listaDeClientes = clientes;
      }, error: (erro: any)=>{
        console.error("Erro ao buscar os clientes", erro)
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
}
