import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/inicio', icon: 'home' },
    { title: 'Contatos', url: '/contato', icon: 'mail' },
    { title: 'Add contato', url: '/add-contato', icon: 'add' },
  ];
  constructor() {}
}
