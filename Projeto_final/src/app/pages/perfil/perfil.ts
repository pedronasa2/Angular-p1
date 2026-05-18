import { Component } from '@angular/core';
import {Container} from '../agenda/container/container';
import {DxButtonComponent, DxTextAreaComponent, DxTextBoxComponent} from 'devextreme-angular';
import {Contato} from '../agenda/agenda';
import {Service} from '../agenda/service/service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Cabecalho} from '../agenda/cabecalho/cabecalho';

@Component({
  selector: 'app-perfil',
  imports: [
    Container,
    DxTextAreaComponent,
    DxTextBoxComponent,
    Cabecalho,
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

  constructor(private service:Service, private router:Router, private route:ActivatedRoute) {
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


