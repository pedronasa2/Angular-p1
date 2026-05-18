import {Component, Input} from '@angular/core';
import {DxButtonComponent} from 'devextreme-angular';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-cabecalho',
  imports: [
    DxButtonComponent,
    RouterLink
  ],
  templateUrl: './cabecalho.html',
  styleUrl: './cabecalho.scss',
})
export class Cabecalho {
  @Input() nomeImagem: string = '';
}
