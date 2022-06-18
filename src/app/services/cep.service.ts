import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CepService {
  constructor(private httpClient: HttpClient) {}

  getCep(cep: string) {
    let url = `https://viacep.com.br/ws/${cep}/json`;
    return this.httpClient.get(url).toPromise();
  }
}
