import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SegurancaModule } from './seguranca/seguranca.module';
import { EditaisModule } from './editais/editais.module';
import { AlunosModule } from './alunos/alunos.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [

    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,

    CoreModule,
    AlunosModule,
    EditaisModule,
    SegurancaModule,
    AppRoutingModule

  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
