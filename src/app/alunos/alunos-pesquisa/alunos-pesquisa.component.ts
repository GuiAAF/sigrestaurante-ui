import { Title } from '@angular/platform-browser';
import { Edital } from './../../core/model';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';

import { AlunoService, AlunoFiltro } from './../aluno.service';
import { EditalService } from './../../editais/edital.service';

@Component({
  selector: 'app-alunos-pesquisa',
  templateUrl: './alunos-pesquisa.component.html',
  styleUrls: ['./alunos-pesquisa.component.css']
})
export class AlunosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new AlunoFiltro();
  alunos = [];
  editais: Array<Edital>;
  @ViewChild('tabela') grid;

  constructor(
    private editalService: EditalService,
    private alunoService: AlunoService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title
    ) { }

  ngOnInit() {
    this.carregarEditais();
    this.title.setTitle('Pesquisar aluno');
  }

  carregarEditais() {
    return this.editalService.listarTodos()
      .then(editais => {
        this.editais = editais;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.alunoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.alunos = resultado.alunos;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(aluno: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja inativar esta conta?',
      accept: () => {
        this.inativar(aluno);
      }
    });
  }

  inativar(aluno: any) {
    this.alunoService.inativarAluno(aluno.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {

          this.grid.first = 0;
        }

        this.toasty.success('Conta inativada com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  reativarAluno(aluno: any): void {
    const novoStatus = !aluno.ativo;

    this.alunoService.reativarAluno(aluno.codigo, novoStatus)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {

          this.grid.first = 0;
        }
        const acao = novoStatus ? 'reativada' : 'inativada';



        this.toasty.success(`Conta ${acao} com sucesso!`);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
