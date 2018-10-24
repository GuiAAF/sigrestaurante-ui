export class Edital {
  codigo: number;
  numero: string;
  dataInicio: Date;
  dataTermino: Date;
  ativo = true;
}

export class Aluno {
  codigo: number;
  nome: string;
  login: string;
  senha = '123456';
  ativo = true;
  creditos = 20;
  edital = new  Edital();
}


export interface CredenciaisDTO {
  login: string;
  senha: string;
}
