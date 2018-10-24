import { AlunoCadastroComponent } from './aluno-cadastro/aluno-cadastro.component';
import { AlunosPesquisaComponent } from './alunos-pesquisa/alunos-pesquisa.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';




const routes: Routes = [
  { path: 'alunos', component: AlunosPesquisaComponent },
  { path: 'alunos/novo', component: AlunoCadastroComponent },
  { path: 'alunos/:codigo', component: AlunoCadastroComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AlunoRoutingModule { }
