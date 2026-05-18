import { Component } from '@angular/core';
import {DxButtonComponent, DxCardViewComponent, DxFormComponent} from 'devextreme-angular';

import {DxiItemComponent, DxiValidationRuleComponent} from 'devextreme-angular/ui/nested';

import DevExpress from 'devextreme';
import ClickEvent = DevExpress.ui.dxButton.ClickEvent;
import {Service} from '../agenda/service/service';
import {Agenda, Contato} from '../agenda/agenda';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Cabecalho} from '../agenda/cabecalho/cabecalho';
import {Container} from '../agenda/container/container';

@Component({
  selector: 'app-formulario',
  imports: [
    DxFormComponent,
    DxiItemComponent,
    DxiValidationRuleComponent,
    DxButtonComponent,
    RouterLink,
    Cabecalho,
    Container
  ],
  templateUrl: './formulario.html',
  styleUrl: './formulario.scss',
})
export class Formulario {

  constructor(private service:Service, private router:Router, private route:ActivatedRoute) {
  }
  private id: String | null = null;

  contato: Contato = {
    nome: '',
    telefone: '',
    email: '',
    aniversario: '',
    redes: '',
    observacoes: ''
  };

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    if (this.id != null) {
      this.service.pegarPorId(this.id).subscribe(dado => this.contato = dado)
    }
  }

  salvarNoBanco = (e: any) => {
    console.log(e);
    if(this.id == null){
    if (e.validationGroup.validate()){
      this.service.salvar(this.contato).subscribe({
        next:() =>{

        },
        error:(erro) =>{
          console.error('erro:' , erro)
        }
      });
      this.router.navigate(['/agenda']);
    }}else{
      if (e.validationGroup.validate()){
        this.service.atualizar(this.id, this.contato).subscribe({
          next:() =>{

          },
          error:(erro) =>{
            console.error('erro:' , erro)
          }
        });
        this.router.navigate(['/agenda']);
      }

    }



  }



}

