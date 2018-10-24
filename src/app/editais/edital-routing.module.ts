import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { EditalCadastroComponent } from './edital-cadastro/edital-cadastro.component';
import { EditaisPesquisaComponent } from './editais-pesquisa/editais-pesquisa.component';



const routes: Routes = [
  { path: 'editais', component: EditaisPesquisaComponent },
  { path: 'editais/novo', component: EditalCadastroComponent },
  { path: 'editais/:codigo', component: EditalCadastroComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EditalRoutingModule { }
