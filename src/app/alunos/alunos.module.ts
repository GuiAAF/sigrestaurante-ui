import { AlunoRoutingModule } from './aluno-routing.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule} from 'primeng/selectbutton';

import { AlunosPesquisaComponent } from './alunos-pesquisa/alunos-pesquisa.component';
import { AlunoCadastroComponent } from './aluno-cadastro/aluno-cadastro.component';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    TriStateCheckboxModule,
    ButtonModule,
    DataTableModule,
    TooltipModule,
    DropdownModule,
    CalendarModule,
    SelectButtonModule,

    SharedModule,
    AlunoRoutingModule
  ],
  declarations: [
    AlunoCadastroComponent,
    AlunosPesquisaComponent
  ],
  exports: []
})
export class AlunosModule { }
