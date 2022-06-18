import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  public appPages = [
    { title: 'Contatos', url: '../contato', icon: 'people', color: 'primary' },
  ];

  constructor() {}

  ngOnInit() {}
}
