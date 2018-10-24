import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';

import { SegurancaRoutingModule } from './seguranca-routing/seguranca-routing.module';

import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    SegurancaRoutingModule,
    FormsModule,

    InputTextModule,
    ButtonModule
  ],
  declarations: [LoginComponent]
})
export class SegurancaModule { }
