import { Component, OnInit} from '@angular/core';
import {Cabecalho} from './cabecalho/cabecalho';
import {Container} from './container/container';
import {DxButtonComponent, DxListComponent, DxTextBoxComponent, DxTextBoxModule} from 'devextreme-angular';
import { HttpClient } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';
import {routes} from '../../app.routes';
import {Router, RouterLink} from '@angular/router';
import {Service} from './service/service';
import DevExpress from 'devextreme';




export interface Contato {
  id?: number
  nome: string
  telefone: string
  email?: string
  aniversario?: string
  redes?: string
  observacoes?: string
}

@Component({
  selector: 'app-agenda',
  imports: [Cabecalho, Container, DxTextBoxModule, DxListComponent, DxButtonComponent, RouterLink],
  templateUrl: './agenda.html',
  styleUrl: './agenda.scss',
})


export class Agenda {
  textoBusca: string = '';
  alfabeto: string = 'abcdefghijklmnopqrstuvwxyz';
  contatos: Contato[] =[];
  listaPreparada: any;


  constructor(private http:HttpClient, private service:Service, private router:Router) {
  }

  ngOnInit() {
    this.listaTodosContatos();
  }

  mostrarNoCossole(elemento :any){
    console.log(elemento);
  }

  listaTodosContatos(){
    this.service.pegarLista().subscribe(dados => this.contatos = dados.sort((a, b) => a.nome.localeCompare(b.nome)));

    this.listaPreparada = new DataSource({ // serve para fazer agrupamento
      store: this.contatos,
      sort: 'nome',
      group: (contato: any) => contato.nome.charAt(0).toUpperCase()
    });

    this.mostrarNoCossole(this.contatos);
  }


  excluir(id: number){
    this.service.excluir(id).subscribe({
      next: () => {
        this.listaTodosContatos()
      },
      error: (erro) => {
        console.error('erro', erro)
      }
    });


  }

  editarContato(id: number, event:Event){
    event.stopPropagation()
    this.router.navigate(['/agenda/formulario', id])
  }

}
