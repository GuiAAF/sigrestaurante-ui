import { AuthService } from './../seguranca/auth.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtHelper } from 'angular2-jwt';

import { ConfirmationService } from 'primeng/components/common/api';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { MenubarModule } from 'primeng/menubar';
import { SplitButtonModule } from 'primeng/splitbutton';
import {SidebarModule} from 'primeng/sidebar';

import { ToastyModule } from 'ng2-toasty';

import { ErrorHandlerService } from './error-handler.service';

import { AlunoService } from '../alunos/aluno.service';
import { EditalService } from '../editais/edital.service';
import { NavbarComponent } from './navbar/navbar.component';

import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    ToastyModule.forRoot(),
    ConfirmDialogModule,
    MenubarModule,
    RouterModule,
    SplitButtonModule,
    SidebarModule
    
  ],
  declarations: [NavbarComponent, PaginaNaoEncontradaComponent],
  exports: [NavbarComponent,
    ToastyModule,
    ConfirmDialogModule,
    HttpClientModule],
    providers: [
      AlunoService,
      EditalService,
      ErrorHandlerService,
      AuthService,

      ConfirmationService,
      Title,
      JwtHelper
    ]
})
export class CoreModule { }
