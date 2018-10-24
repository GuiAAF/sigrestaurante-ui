import { Title } from '@angular/platform-browser';
import { EditalService } from './../edital.service';
import { FormControl } from '@angular/forms';
import { Edital } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';

@Component({
  selector: 'app-edital-cadastro',
  templateUrl: './edital-cadastro.component.html',
  styleUrls: ['./edital-cadastro.component.css']
})
export class EditalCadastroComponent implements OnInit {

  edital = new Edital();


  constructor(
    private editalService: EditalService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private title: Title
  ) {}

  ngOnInit() {

    this.title.setTitle('Novo edital');

    const codigoEdital = this.route.snapshot.params['codigo'];

    if (codigoEdital) {
      this.carregarEdital(codigoEdital);
    }

  }

  get editando() {
    return Boolean(this.edital.codigo);
  }

  carregarEdital(codigo: number) {
    this.editalService.buscarPorCodigo(codigo)
      .then(edital => {
        this.edital = edital;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarEdital(form);
    } else {
      this.adicionarEdital(form);
    }
  }


  adicionarEdital(form: FormControl) {
    this.editalService.adicionar(this.edital)
      .then(() => {
        this.toasty.success('Edital salvo com sucesso!');

        form.reset();
        this.edital = new Edital();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarEdital(form: FormControl) {
    this.editalService.atualizar(this.edital)
      .then(edital => {
        this.title.setTitle(`Edição de edital: ${this.edital.numero}`);
        this.edital = edital;

        this.toasty.success('Edital alterado com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de edital: ${this.edital.numero}`);
  }

}
