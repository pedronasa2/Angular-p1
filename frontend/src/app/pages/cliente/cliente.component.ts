import {Component, ViewChild} from '@angular/core';
import {
  DxButtonComponent,
  DxDataGridComponent,
  DxFormComponent,
  DxListComponent,
  DxTemplateDirective
} from 'devextreme-angular';
import {Cliente, ClienteService} from '../../shared/services/loja/cliente.service';
import {Nota} from '../../shared/services/loja/nota.service';
import {DxiFormItemComponent, DxiFormValidationRuleComponent} from 'devextreme-angular/ui/form';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {
  DxiDataGridColumnComponent,
  DxiDataGridItemComponent, DxoDataGridEditingComponent,
  DxoDataGridFormComponent,
  DxoDataGridPagingComponent,
  DxoDataGridPopupComponent
} from 'devextreme-angular/ui/data-grid';
import DevExpress from 'devextreme';
import RowRemovingEvent = DevExpress.ui.dxDataGrid.RowRemovingEvent;
import {DxoSearchPanelComponent} from 'devextreme-angular/ui/nested';

@Component({
  selector: 'app-cliente.component',
  imports: [
    DxButtonComponent,
    RouterLink,
    DxDataGridComponent,
    DxoDataGridPagingComponent,
    DxoDataGridPopupComponent,
    DxoDataGridFormComponent,
    DxiDataGridItemComponent,
    DxiDataGridColumnComponent,
    DxoDataGridEditingComponent,
    DxoSearchPanelComponent,
  ],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss',
})
export class ClienteComponent {
  public listaDeClientes: Cliente[] = [];
  public clienteAtual!: Cliente;
  public modoEdicao: boolean = false;


  constructor(private clienteService: ClienteService) {
  }

  ngOnInit() {
    this.atualizarListaDeClientes();

  }


  public atualizarListaDeClientes(): void {


    this.clienteService.listarClientes().subscribe({
      next: (dados) => {
        this.listaDeClientes = dados;
        this.clienteAtual = dados[0];

      },
      error: () => {
        console.error("Erro ao buscar lista de clientes");
      }
    });
  }


  onRowInserted(event: any) {
    const dadosCadastro = {
      nome: event.data.nome,
      codigo: event.data.codigo,

    };
    this.clienteService.adcionarCliente(dadosCadastro).subscribe({
      next: (dados: Cliente) => {

        this.atualizarListaDeClientes();
      }, error: (erro) => {
        console.error("Erro ao adcionar o cliente", erro)
      }
    })
  }

  public onRowRemoved(event: any) {

    this.clienteService.deletarPorId(event.data.id).subscribe({
      next: () => {
        this.atualizarListaDeClientes();
      },
      error: () => {
        console.error("Erro ao deletar cliente");
      }
    });

  }

  public onRowUpdated(event: any) {
    this.clienteService.editarCliente(event.data).subscribe({

      next: () => {
        this.atualizarListaDeClientes();
        this.modoEdicao = false;
      }, error: () => {
        console.error("Erro ao atualizar o cliente " + this.clienteAtual.id)
      }
    })

  }
}
