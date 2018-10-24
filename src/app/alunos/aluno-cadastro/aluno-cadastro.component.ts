import { ActivatedRoute } from '@angular/router';
import { AlunoService } from './../aluno.service';
import { ToastyService } from 'ng2-toasty';
import { FormControl } from '@angular/forms';
import { Aluno, Edital } from './../../core/model';
import { EditalService } from './../../editais/edital.service';
import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-aluno-cadastro',
  templateUrl: './aluno-cadastro.component.html',
  styleUrls: ['./aluno-cadastro.component.css']
})
export class AlunoCadastroComponent implements OnInit {

  editais: Array<Edital>;

  aluno = new Aluno();

  constructor(
    private editalService: EditalService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private alunoService: AlunoService,
    private route: ActivatedRoute,
    private title: Title
  ) { }

  ngOnInit() {
    this.carregarEditais();

    this.title.setTitle('Novo aluno');

    const codigoAluno = this.route.snapshot.params['codigo'];

    if (codigoAluno) {
      this.carregarAluno(codigoAluno);
    }
  }

  get editando() {
    return Boolean(this.aluno.codigo);
  }

  carregarAluno(codigo: number) {
    this.alunoService.buscarPorCodigo(codigo)
      .then(aluno => {
        this.aluno = aluno;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarEditais() {
    return this.editalService.listarTodos()
      .then(editais => {
        this.editais = editais;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarAluno(form);
    } else {
      this.adicionarAluno(form);
    }
  }

  adicionarAluno(form: FormControl) {
    this.alunoService.adicionar(this.aluno)
      .then(() => {
        this.toasty.success('Aluno salvo com sucesso!');

        form.reset();
        this.aluno = new Aluno();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarAluno(form: FormControl) {
    this.alunoService.atualizar(this.aluno)
      .then(aluno => {
        this.aluno = aluno;

        this.toasty.success('Aluno alterado com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de aluno: ${this.aluno.nome}`);
  }

}
