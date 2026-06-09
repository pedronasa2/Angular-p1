import {ItenNota} from './iten-nota';
import {Cliente} from './cliente';

export class Nota{
  public id!: number;
  public cliente!: Cliente;
  public data!: Date;
  public valorTotal!: number;
  public listaItens!: ItenNota[];

  constructor() {
    if (!(this.listaItens == null || this.listaItens.length == 0))
    {
      this.listaItens.forEach(iten => this.valorTotal+=iten.getValorTotal())
    }
  }



}
