import { Component } from '@angular/core';
import {EstadoService, Estado} from '../../shared/services/estado.service';
import {DxButtonComponent, DxListComponent, DxTemplateDirective} from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import {Cidade, CidadeService} from '../../shared/services/cidade.service';

@Component({
  selector: 'app-cidade.component',
  imports: [
    DxListComponent,
    DxTemplateDirective
  ],
  templateUrl: './cidade.component.html',
  styleUrl: './cidade.component.scss',
})
export class CidadeComponent {

  public listaEstados:Estado[]=[]
  public dataSourceEstado: any;
  public estadoSelecionado: any;
  public listaCidades:Cidade[]=[]
  public dataSourceCidade: any;
  public cidadeSelecionada:any;

  constructor(private estadoService:EstadoService, private cidadeServece:CidadeService) {
  }


  ngOnInit() {
    this.listarEstados();

  }


  listarEstados(){
    this.estadoService.listaEstados().subscribe(dados => {
      this.listaEstados = dados;
      this.dataSourceEstado = new DataSource({
        store: this.listaEstados,
        sort: 'nome',
        group: function(e){
          return e.regiao.nome;
        }
      });
      this.estadoSelecionado=this.listaEstados[0];
      this.listarCidades(this.estadoSelecionado.sigla);
    });
    console.log(this.listaEstados)
  }

  listarCidades(uf:string){
    this.cidadeServece.listarCidadesPorUf(uf).subscribe(dados => {
      this.listaCidades=dados;
      console.log(this.listaCidades);
      this.dataSourceCidade = new DataSource({

        store: this.listaCidades,
        sort: 'nome',
        group: function(e){
          return e.nome[0].normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        }

      });
      this.cidadeSelecionada = this.listaCidades[0]
    })
  }


  protected readonly console = console;
}
