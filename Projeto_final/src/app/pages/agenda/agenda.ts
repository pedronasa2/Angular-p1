import { Component, OnInit} from '@angular/core';
import {CabecalhoComponent} from '../../shared/components/cabecalho/cabecalho.component';
import {ContainerComponent} from '../../shared/components/container/container.component';
import {DxButtonComponent, DxListComponent, DxTextBoxComponent, DxTextBoxModule} from 'devextreme-angular';
import { HttpClient } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';
import {routes} from '../../app.routes';
import {Router, RouterLink} from '@angular/router';
import {AgendaService} from '../../shared/services/agenda.service';
import DevExpress from 'devextreme';
import {ArrayStore} from 'devextreme/common/data';




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
  imports: [CabecalhoComponent, ContainerComponent, DxTextBoxModule, DxListComponent, DxButtonComponent, RouterLink],
  templateUrl: './agenda.html',
  styleUrl: './agenda.scss',
})


export class Agenda {
  textoBusca: string = '';
  alfabeto: string = 'abcdefghijklmnopqrstuvwxyz';
  contatos: Contato[] =[];
  listaPreparada: any;


  constructor(private http:HttpClient, private service:AgendaService, private router:Router) {
  }

  ngOnInit() {
    this.listaTodosContatos();

  }

  mostraLista(){
    console.log(this.contatos)
    console.log(this.listaPreparada);
    console.log(new ArrayStore({
      data: this.contatos,
      key: 'Id',
    }));
  }

  mostrarNoCossole(elemento :any){
    console.log(elemento);
  }

  listaTodosContatos(){
    this.service.pegarLista().subscribe({
      next: dados => {
        this.contatos = dados.sort((a, b) => a.nome.localeCompare(b.nome));

        this.listaPreparada = new DataSource({ // serve para fazer agrupamento
          store: this.contatos,
          sort: 'nome',
          group: function(e){
            console.log(e.nome[0])
            return e.nome[0];
          }
        });
      }
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
