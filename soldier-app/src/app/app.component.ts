import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/inicio', icon: 'home' },
    { title: 'Acerca de', url: '/acerca-de', icon: 'paper-plane' },
    { title: 'Vivencias', url: '/vivencias', icon: 'heart' },

  ];
  
  constructor() {}
}
