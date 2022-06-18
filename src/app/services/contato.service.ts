import { Injectable } from '@angular/core';
import { IContato } from 'src/models/contato.model';

@Injectable({
  providedIn: 'root',
})
export class ContatoService {
  constructor() {}

  salvar(contato: IContato) {
    let contatos =
      (JSON.parse(localStorage.getItem('tbContatos')) as IContato[]) || [];
    let index = contatos.map((c) => c.id).indexOf(contato.id);
    if (index != -1) {
      contatos[index] = contato;
    } else {
      contatos.push(contato);
    }
    localStorage.setItem('tbContatos', JSON.stringify(contatos));
  }

  excluir(contato: IContato) {
    let contatos =
      (JSON.parse(localStorage.getItem('tbContatos')) as IContato[]) || [];
    contatos = contatos.filter((c) => c.id != contato.id);
    localStorage.setItem('tbContatos', JSON.stringify(contatos));
    return contatos;
  }

  listar() {
    let contatos =
      (JSON.parse(localStorage.getItem('tbContatos')) as IContato[]) || [];
    if (contatos.length == 0) {
      localStorage.setItem('tbContatos', JSON.stringify(contatos));
    }
    return contatos;
  }

  buscarPorId(id: number) {
    let contatos =
      (JSON.parse(localStorage.getItem('tbContatos')) as IContato[]) || [];
    let contato = contatos.find((c) => c.id == id);
    return contato;
  }
}
