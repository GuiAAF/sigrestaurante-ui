import { Title } from '@angular/platform-browser';
import { EditalService, EditalFiltro } from './../edital.service';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-editais-pesquisa',
  templateUrl: './editais-pesquisa.component.html',
  styleUrls: ['./editais-pesquisa.component.css']
})
export class EditaisPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new EditalFiltro();
  editais = [];
  @ViewChild('tabela') grid;

  constructor(
    private editalService: EditalService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit() {

    this.title.setTitle('Pesquisar edital');

  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.editalService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.editais = resultado.editais;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarInatividade(edital: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja inativar este edital?',
      accept: () => {
        this.inativarEdital(edital);
      }
    });
  }

  inativarEdital(edital: any) {
    this.editalService.inativarEdital(edital.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {

          this.grid.first = 0;
        }

        this.toasty.success('Edital inativado com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  reativarEdital(edital: any): void {
    const novoStatus = !edital.ativo;

    this.editalService.reativarEdital(edital.codigo, novoStatus)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {

          this.grid.first = 0;
        }
        const acao = novoStatus ? 'reativado' : 'inativado';



        this.toasty.success(`Edital ${acao} com sucesso!`);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
