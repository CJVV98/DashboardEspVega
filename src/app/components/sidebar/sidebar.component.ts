import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Perfil',  icon: 'person', class: '' },
    { path: '/notifications', title: 'Noticias',  icon:'notifications', class: '' },
    { path: '/maps', title: 'Puntos de pago',  icon:'location_on', class: '' },
    { path: '/list-user', title: 'Usuarios',  icon:'person', class: '' },
    { path: '/list-pqr', title: 'PQRs',  icon:'assignment', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
