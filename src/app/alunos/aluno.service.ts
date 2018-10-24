import { Aluno, Edital } from './../core/model';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

export class AlunoFiltro {
  nome: string;
  matricula: string;
  edital: Edital;
  pagina = 0;
  itensPorPagina = 4;
}

@Injectable()
export class AlunoService {

  alunosUrl = 'http://localhost:8080/alunos';

  constructor(private http: Http) { }

  pesquisar(filtro: AlunoFiltro): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers();

    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    if (filtro.matricula) {
      params.set('login', filtro.matricula);
    }

    if (filtro.edital) {
      params.set('edital', filtro.edital.codigo.toString());
    }

    return this.http.get(`${this.alunosUrl}?resumir`,
        { headers, search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const alunos = responseJson.content;

        const resultado = {
          alunos,
          total: responseJson.totalElements
        };

        return resultado;
      });
  }

  inativarAluno(codigo: number): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    return this.http.delete(`${this.alunosUrl}/${codigo}`, { headers })
      .toPromise()
      .then(() => null);
  }

  reativarAluno(codigo: number, ativo: boolean): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.alunosUrl}/${codigo}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
  }

  adicionar(aluno: Aluno): Promise<Aluno> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.alunosUrl,
        JSON.stringify(aluno), { headers })
      .toPromise()
      .then(response => response.json());
  }

  atualizar(aluno: Aluno): Promise<Aluno> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.alunosUrl}/${aluno.codigo}`,
      JSON.stringify(aluno), { headers })
      .toPromise()
      .then(response => {
        const alunoAlterado = response.json() as Aluno;

        return alunoAlterado;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Aluno> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    return this.http.get(`${this.alunosUrl}/${codigo}`, { headers })
      .toPromise()
      .then(response => {
        const aluno = response.json() as Aluno;

        return aluno;
      });
  }

}
