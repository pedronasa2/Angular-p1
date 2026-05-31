import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Nota} from './nota.service';

export class Cliente{

  public id!:number;
  public codigo!:string;
  public nome!:string;
  public nota!:Nota[];
}
@Injectable({
  providedIn: 'root',
})
export class ClienteService {

  private urlCliente:string = "http://localhost:8080/cliente"
  constructor(private http:HttpClient) {
  }

  listarClientes():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.urlCliente);
  }

  deletarPorId(id:number):Observable<any> {
    return this.http.delete(this.urlCliente + "/" + id);
  }

  notasDoCliente(id:number): Observable<Nota[]>{
    return this.http.get<Nota[]>(this.urlCliente + "/notas/" + id)
  }

  editarCliente(cliente: Cliente): Observable<any> {
    return  this.http.put(this.urlCliente + "/" + cliente.id, cliente);

  }

  adcionarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlCliente, cliente);

  }

  buscarPorId(idCliente: Number): Observable<Cliente> {
    return this.http.get<Cliente>(this.urlCliente + "/bucarid/" + idCliente);

  }
}
