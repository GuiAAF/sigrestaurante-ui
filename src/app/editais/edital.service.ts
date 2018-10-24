import { Edital } from './../core/model';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

export class EditalFiltro {
  numero: string;
  dataInicio: Date;
  dataTermino: Date;
  vigente: Boolean;
  pagina = 0;
  itensPorPagina = 4;
}

@Injectable()
export class EditalService {

  editaisUrl = 'http://localhost:8080/editais';

  constructor(private http: Http) { }

  pesquisar(filtro: EditalFiltro): Promise<any> {

    const params = new URLSearchParams();
    const headers = new Headers();

    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.numero) {
      params.set('numero', filtro.numero);
    }

    if (filtro.dataInicio) {
      params.set('dataInicio',
        moment(filtro.dataInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataTermino) {
      params.set('dataTermino',
        moment(filtro.dataTermino).format('YYYY-MM-DD'));
    }

    return this.http.get(`${this.editaisUrl}`,
      { headers, search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const editais = responseJson.content;

        const resultado = {
          editais,
          total: responseJson.totalElements
        };

        return resultado;
      });
  }

  inativarEdital(codigo: number): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    return this.http.delete(`${this.editaisUrl}/${codigo}`, { headers })
      .toPromise()
      .then(() => null);
  }

  reativarEdital(codigo: number, ativo: boolean): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.editaisUrl}/${codigo}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
  }

  listarTodos(): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    return this.http.get(this.editaisUrl, { headers })
      .toPromise()
      .then(response => response.json());
  }

  adicionar(edital: Edital): Promise<Edital> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.editaisUrl,
      JSON.stringify(edital), { headers })
      .toPromise()
      .then(response => response.json());
  }

  atualizar(edital: Edital): Promise<Edital> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.editaisUrl}/${edital.codigo}`,
      JSON.stringify(edital), { headers })
      .toPromise()
      .then(response => {
        const editalAlterado = response.json() as Edital;

        this.converterStringsParaDatas([editalAlterado]);

        return editalAlterado;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Edital> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    return this.http.get(`${this.editaisUrl}/${codigo}`, { headers })
      .toPromise()
      .then(response => {
        const edital = response.json() as Edital;

        this.converterStringsParaDatas([edital]);

        return edital;
      });
  }

  private converterStringsParaDatas(editais: Edital[]) {
    for (const edital of editais) {
      edital.dataInicio = moment(edital.dataInicio,
        'YYYY-MM-DD').toDate();

      edital.dataTermino = moment(edital.dataTermino,
        'YYYY-MM-DD').toDate();
    }
  }

}
