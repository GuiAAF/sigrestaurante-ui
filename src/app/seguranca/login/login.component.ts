import { CredenciaisDTO } from './../../core/model';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  creds: CredenciaisDTO = {
    login: '',
    senha: ''
  };

  constructor(private auth: AuthService) { }

  login(login: string, senha: string) {
    this.creds.login = login;
    this.creds.senha = senha;
    this.auth.login(login, senha);
  }

}
