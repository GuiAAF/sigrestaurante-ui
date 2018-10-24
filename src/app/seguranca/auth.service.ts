import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from './../core/model';
import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

    url = 'http://localhost:8080';
    jwtPayload: any;

    constructor(private http: HttpClient, private jwtHelper: JwtHelper) {
        this.carregarToken();
    }


    login(creds: CredenciaisDTO): Promise<void> {
        return this.http.post(
            `${this.url}/login`,
            creds,
            {
                observe: 'response',
                responseType: 'text'
            }).toPromise()
            .then(response => {
              console.log(response);
              this.armazenarToken(response.headers.get('Authorization'));
            })
            .catch(response => {
              console.log(response);
            });
    }

    private armazenarToken(token: string) {
      this.jwtPayload = this.jwtHelper.decodeToken(token);
      localStorage.setItem('token', token);
    }

    private carregarToken() {
      const token = localStorage.getItem('token');

      if (token) {
        this.armazenarToken(token);
      }
    }
}
