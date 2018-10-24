import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  items: MenuItem[];

  constructor() { }

  ngOnInit() {

    this.items = [
      { label: 'Editais', icon: 'fa fa-fw fa-bar-chart', routerLink: ['/editais']},
      { label: 'Alunos', icon: 'fa fa-fw fa-calendar', routerLink: ['/alunos']},
      { label: 'Refeições', icon: 'fa fa-fw fa-book' },
      { label: 'Funcionarios', icon: 'fa fa-fw fa-support' }
    ];
  }

}
