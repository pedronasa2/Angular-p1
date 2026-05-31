import { Component } from '@angular/core';
import {DxButtonComponent, DxFormComponent, DxListComponent, DxTemplateDirective} from 'devextreme-angular';
import {Cliente, ClienteService} from '../../shared/services/loja/cliente.service';
import {Nota} from '../../shared/services/loja/nota.service';
import {DxiFormItemComponent, DxiFormValidationRuleComponent} from 'devextreme-angular/ui/form';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-cliente.component',
  imports: [
    DxListComponent,
    DxButtonComponent,
    DxTemplateDirective,
    DxFormComponent,
    DxiFormItemComponent,
    DxiFormValidationRuleComponent,
    RouterLink,
  ],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss',
})
export class ClienteComponent {
  public listaDeClientes: Cliente[] = [];
  public clienteAtual!: Cliente;
  public modoEdicao: boolean = false;
  public notasAtuais: Nota[] = [];


  constructor(private clienteService:ClienteService) {
  }

  ngOnInit(){
    this.atualizarListaDeClientes();

  }
    public selecionarCliente(cliente:Cliente){
      this.clienteAtual = cliente;
      this.clienteService.notasDoCliente(this.clienteAtual.id).subscribe({
          next: (dados) =>{
            this.notasAtuais = dados;
          }
        }
      )
    }

  public atualizarListaDeClientes():void{
    this.clienteService.listarClientes().subscribe({
      next:(dados) => {
           this.listaDeClientes = dados;
           this.clienteAtual = dados[0];

      },
      error:() => {
        console.error("Erro ao buscar lista de clientes");
    }
    });
  }


  public deletarCliente(item:Cliente) {
    this.clienteService.deletarPorId(item.id).subscribe({
      next:() => {
        this.atualizarListaDeClientes();
      },
      error: () => {
        console.error("Erro ao deletar cliente");
      }
    });
  }


  protected readonly console = console;


  public editarOuAdcionarCliente(evento: SubmitEvent) {
    evento.preventDefault();
    if (this.clienteAtual.id > 0){
      console.log(this.clienteAtual);
    this.clienteService.editarCliente(this.clienteAtual).subscribe({

      next: () =>{
        this.atualizarListaDeClientes();
        this.modoEdicao = false;
      },error: () => {console.error("Erro ao atualizar o cliente " + this.clienteAtual.id)}

    })} else {
      this.clienteService.adcionarCliente(this.clienteAtual).subscribe({
      next: (dados:Cliente) => {
        this.atualizarListaDeClientes();
        this.modoEdicao = false;
        this.clienteAtual = dados
      }, error: () => {
        console.error("Erro ao adcionar o cliente")
        }
    })}
  }

  public adcionarCliente() {
    this.clienteAtual = new Cliente();
    this.clienteAtual.id = -1;
    this.modoEdicao = true;

  }

  protected adcionarNota(cliente:Cliente) {

  }
}
