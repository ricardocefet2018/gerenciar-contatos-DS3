export interface IContato {
  id: number | null;
  nome: string | null;
  dataNascimento: string | null;
  cpf: string | null;
  celular: string | null;
  email: string | null;
  cep: string | number | null;
  rua: string | null;
  bairro: string | null;
  cidade: string | null;
  estado: string | null;
}

export class Contato implements IContato {
  id: number;
  nome: string;
  dataNascimento: string;
  cpf: string;
  celular: string;
  email: string;
  cep: string | number;
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;

  constructor(
    id: number,
    nome: string,
    dataNascimento: string,
    cpf: string,
    celular: string,
    email: string,
    cep: string | number,
    rua: string,
    bairro: string,
    cidade: string,
    estado: string
  ) {
    this.celular = celular;
    this.cpf = cpf;
    this.dataNascimento = dataNascimento;
    this.email = email;
    this.id = id;
    this.nome = nome;
    this.cep = cep;
    this.rua = rua;
    this.bairro = bairro;
    this.cidade = cidade;
    this.estado = estado;
  }
}
