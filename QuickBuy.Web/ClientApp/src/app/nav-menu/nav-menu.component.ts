import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../servicos/usuario/usuario.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  constructor(private router: Router, private usuarioService: UsuarioService){}

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  usuarioLogado(): boolean {
    return this.usuarioService.usuarioAutenticado();
  }
  sair() {
    sessionStorage.removeItem('usuario_autenticado');
    this.router.navigate(['/']);
  }
}
