import { EditalRoutingModule } from './edital-routing.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { ButtonModule } from 'primeng/components/button/button';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';

import { EditalCadastroComponent } from './edital-cadastro/edital-cadastro.component';
import { EditaisPesquisaComponent } from './editais-pesquisa/editais-pesquisa.component';
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
    RouterModule,

    SharedModule,
    EditalRoutingModule
  ],
  declarations: [
    EditaisPesquisaComponent,
    EditalCadastroComponent
  ],

  exports: []
})
export class EditaisModule { }
