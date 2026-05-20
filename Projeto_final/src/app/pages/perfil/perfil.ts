import { Component } from '@angular/core';
import {ContainerComponent} from '../../shared/components/container/container.component';
import {DxButtonComponent, DxTextAreaComponent, DxTextBoxComponent} from 'devextreme-angular';
import {Contato} from '../agenda/agenda';
import {AgendaService} from '../../shared/services/agenda.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CabecalhoComponent} from '../../shared/components/cabecalho/cabecalho.component';

@Component({
  selector: 'app-perfil',
  imports: [
    ContainerComponent,
    DxTextAreaComponent,
    DxTextBoxComponent,
    CabecalhoComponent,
    DxButtonComponent,
    RouterLink
  ],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
})
export class Perfil {

  contato: Contato = {
    nome: '',
    telefone: '',
    email: '',
    aniversario: '',
    redes: '',
    observacoes: ''
  };

  id: String|null = null

  constructor(private service:AgendaService, private router:Router, private route:ActivatedRoute) {
  }
  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id != null){
    this.service.pegarPorId(this.id).subscribe(dado => this.contato = dado);
  }}

  dataDiaAno(dataString: String | undefined | null){
    if (!dataString){
      return "erro"
    }
    const ano = dataString.substring(0, 4);
    const mes = dataString.substring(5, 7);
    const dia = dataString.substring(8, 10);
    return `${dia}/${mes}/${ano}`;
  }
}


